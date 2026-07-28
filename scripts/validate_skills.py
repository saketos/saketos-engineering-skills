#!/usr/bin/env python3
from __future__ import annotations

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "skill-manifest.json"
REQUIRED_FRONTMATTER = {
    "name", "description", "saketos-version", "upstream-repository",
    "upstream-commit", "upstream-path", "upstream-blob",
    "default-mode", "mutation-policy"
}
REQUIRED_GOVERNANCE_PHRASES = [
    "## Saketos governance",
    "Task Packet",
    "Allowed-Paths",
    "active lease",
    "independent Quality Gate"
]
PROHIBITED_COMMANDS = [
    "npx skills@latest add",
    "claude plugins install",
    "gh pr merge",
    "git push --force",
    "git reset --hard",
    "supabase db push"
]


def parse_frontmatter(text: str) -> dict[str, str]:
    if not text.startswith("---\n"):
        raise ValueError("missing YAML frontmatter")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("unterminated YAML frontmatter")
    data: dict[str, str] = {}
    for raw in text[4:end].splitlines():
        if not raw.strip() or raw.lstrip().startswith("#"):
            continue
        if ":" not in raw:
            raise ValueError(f"invalid frontmatter line: {raw}")
        key, value = raw.split(":", 1)
        data[key.strip()] = value.strip()
    return data


def validate() -> list[str]:
    errors: list[str] = []
    try:
        manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    except Exception as exc:
        return [f"manifest unreadable: {exc}"]

    commit = manifest.get("upstream", {}).get("commit", "")
    if not re.fullmatch(r"[0-9a-f]{40}", commit):
        errors.append("upstream commit must be an exact 40-character SHA")

    active = manifest.get("active_skills", [])
    disabled = manifest.get("disabled_skills", [])
    if len(active) != len(set(active)):
        errors.append("active_skills contains duplicates")
    if set(active) & set(disabled):
        errors.append("a skill cannot be both active and disabled")
    if len(active) != 7:
        errors.append("v1 must contain exactly seven active skills")
    if len(disabled) != 6:
        errors.append("v1 must contain exactly six explicitly disabled skills")

    governance = manifest.get("governance", {})
    expected_flags = {
        "task_packet_required_for_mutation": True,
        "active_lease_required_for_mutation": True,
        "independent_quality_gates_required": True,
        "parallel_queue_forbidden": True,
        "automatic_upstream_updates": False,
    }
    for key, expected in expected_flags.items():
        if governance.get(key) is not expected:
            errors.append(f"governance flag {key} must be {expected}")

    for skill in active:
        path = ROOT / "skills" / skill / "SKILL.md"
        if not path.exists():
            errors.append(f"missing active skill file: {path.relative_to(ROOT)}")
            continue
        text = path.read_text(encoding="utf-8")
        try:
            fm = parse_frontmatter(text)
        except ValueError as exc:
            errors.append(f"{skill}: {exc}")
            continue
        missing = REQUIRED_FRONTMATTER - fm.keys()
        if missing:
            errors.append(f"{skill}: missing frontmatter keys {sorted(missing)}")
        if fm.get("name") != skill:
            errors.append(f"{skill}: frontmatter name mismatch")
        if fm.get("upstream-commit") != commit:
            errors.append(f"{skill}: upstream commit differs from manifest")
        if fm.get("mutation-policy") != "task-packet-and-active-lease-required":
            errors.append(f"{skill}: invalid mutation policy")
        for phrase in REQUIRED_GOVERNANCE_PHRASES:
            if phrase not in text:
                errors.append(f"{skill}: missing governance phrase {phrase!r}")
        lowered = text.lower()
        for command in PROHIBITED_COMMANDS:
            if command.lower() in lowered:
                errors.append(f"{skill}: prohibited command {command!r}")

    extra = sorted(
        p.parent.name for p in (ROOT / "skills").glob("*/SKILL.md")
        if p.parent.name not in active
    )
    if extra:
        errors.append(f"unmanifested skill directories: {extra}")

    return errors


def main() -> int:
    errors = validate()
    if errors:
        for error in errors:
            print(f"FAIL: {error}")
        return 1
    print("PASS: Saketos Engineering Skills manifest and governance are consistent")
    return 0


if __name__ == "__main__":
    sys.exit(main())
