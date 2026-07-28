from __future__ import annotations

import importlib.util
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPEC = importlib.util.spec_from_file_location("validate_skills", ROOT / "scripts" / "validate_skills.py")
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC.loader is not None
SPEC.loader.exec_module(MODULE)


class ValidateSkillsTests(unittest.TestCase):
    def test_repository_starter_passes(self):
        self.assertEqual(MODULE.validate(), [])

    def test_frontmatter_parser_requires_delimiters(self):
        with self.assertRaises(ValueError):
            MODULE.parse_frontmatter("name: missing-delimiters")

    def test_manifest_disallows_automatic_updates(self):
        data = json.loads((ROOT / "skill-manifest.json").read_text(encoding="utf-8"))
        self.assertFalse(data["governance"]["automatic_upstream_updates"])

    def test_active_and_disabled_sets_do_not_overlap(self):
        data = json.loads((ROOT / "skill-manifest.json").read_text(encoding="utf-8"))
        self.assertFalse(set(data["active_skills"]) & set(data["disabled_skills"]))

    def test_all_active_skills_pin_same_upstream_commit(self):
        data = json.loads((ROOT / "skill-manifest.json").read_text(encoding="utf-8"))
        expected = data["upstream"]["commit"]
        for skill in data["active_skills"]:
            text = (ROOT / "skills" / skill / "SKILL.md").read_text(encoding="utf-8")
            fm = MODULE.parse_frontmatter(text)
            self.assertEqual(fm["upstream-commit"], expected)


if __name__ == "__main__":
    unittest.main()
