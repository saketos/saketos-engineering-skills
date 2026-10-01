---
name: natural-writing
description: >
  Enforces natural, human-sounding writing by eliminating common AI tells.
  Use this skill whenever generating any text content that will be read by humans:
  emails, documents, reports, blog posts, marketing copy, product descriptions,
  LinkedIn posts, Slack messages, client communications, presentations, social media,
  memos, proposals, newsletters, articles, guides, and any other written output.
  Also trigger when the user asks to "write naturally", "sound human", "avoid AI tone",
  "make it sound less robotic", "edit for naturalness", "check for AI tells",
  "rewrite to sound like a person", or any variation. Trigger even when the user
  doesn't explicitly ask - if the output is text meant for human readers, apply these rules.
  Does NOT trigger for: code, SQL, JSON, YAML, XML, technical configs, data exports,
  structured data formats, or internal tool outputs.
---

# Natural Writing - Jak nie brzmieć jak AI

This skill eliminates the most common AI writing patterns that make text sound robotic, generic, or machine-generated. Apply these rules to ALL text output meant for human readers.

## Core principle

If a sentence could have been written by anyone, it sounds like AI. Good text sounds like it was written by a specific person who has something to say.

---

## RULES (apply in order of priority)

### 1. No significance inflation

Never connect topics to "broader trends", "pivotal moments", "fundamental shifts", or "transformative changes" unless the text contains specific evidence for that claim.

**Kill on sight:**
- "stanowi przełomowy krok w..."
- "wpisuje się w szerszy trend..."
- "podkreśla rosnące znaczenie..."
- "represents a pivotal moment in..."
- "reflects the growing importance of..."
- "marks a significant shift toward..."

**Instead:** State what happened and why it matters - with specifics. If you can't say why it matters without generalities, it probably doesn't need saying.

### 2. No negative parallelisms

Avoid "It's not X - it's Y" constructions. Say what it IS, directly.

**Kill on sight:**
- "To nie jest koszt - to inwestycja"
- "Nie chodzi o technologię - chodzi o ludzi"
- "It's not just a tool - it's a paradigm shift"

**Instead:** Make the positive case directly. "The tool cut response time by 80%" beats "It's not just a tool - it's a new way of thinking about customer service."

### 3. Contaminated vocabulary - restrict or avoid

These words/phrases have become so associated with AI that their density instantly flags text as machine-generated.

**Polish - use sparingly (max 1 per page):**
kluczowy/kluczowe znaczenie, fundamentalny, holistyczny, innowacyjny, transformacyjny, wzmacniać (abstract), podkreślać znaczenie, odzwierciedlać rosnący trend, w dynamicznie zmieniającym się środowisku, stanowi świadectwo, nie do przecenienia, warto podkreślić

**English - use sparingly (max 1 per page):**
delve, tapestry, landscape (abstract), foster, pivotal, underscore, nuanced, intricate, testament, multifaceted, leverage (verb), streamline, spearhead, navigate (abstract: "navigate challenges"), robust (solution/framework), cutting-edge, game-changer, elevate

**Rule:** One occurrence is human. Three on the same page is AI.

### 4. Break the rule of threes

Do not default to three-item lists, three adjectives, three examples. Vary quantities: sometimes 2, sometimes 4, sometimes 1 strong word instead of 3 mediocre ones.

**Bad:** "innowacyjne, skalowalne i przyszłościowe"
**Better:** "skalowalne - testowaliśmy na 10x obecnego wolumenu"

### 5. Minimal formatting

- Use paragraphs as the default unit. Lists only for actual enumerations (steps, attendees, requirements).
- Bold max 1 phrase per paragraph. If everything is bold, nothing is.
- No emoji in professional text.
- No headers like "Why This Matters", "Key Takeaways", "In Summary" unless specifically requested.
- Bullet points with bolded lead phrases followed by restating the same thing = instant AI tell. Avoid.

### 6. No compulsive summaries

Do not end sections or texts with "Podsumowując...", "Ogólnie rzecz biorąc...", "Overall...", "In summary...". End when the content ends. The reader is not amnesiac.

Exception: Documents longer than 5 pages may have an executive summary at the TOP (not bottom).

### 7. Write asymmetrically

- Mix sentence lengths. Short sentences create rhythm. Longer ones carry nuance and detail that needs room to breathe.
- Paragraphs should vary in length.
- Not every list item needs equal weight or word count.
- Avoid the "smooth" AI rhythm where every element is perfectly balanced.

### 8. Kill false ranges

Do not use "from X to Y" constructions that fake a spectrum.

**Bad:** "od małych firm po globalne korporacje"
**Better:** "sprawdza się przy 50 sztukach tak samo jak przy 50 000"

### 9. Specifics or silence

Every claim must contain a concrete detail: a number, an example, a comparison, a name. If you can't make it specific, cut it.

**Test:** After writing a sentence, ask: "Does the reader know something new?" If no - delete.

**Bad:** "Firma konsekwentnie podnosi jakość obsługi."
**Good:** "Czas odpowiedzi spadł z 48 do 6 godzin. Reklamacji było 11, rok temu 34."

### 10. Have a point of view

Do not hedge everything with "potencjalnie", "w pewnym sensie", "do pewnego stopnia", "it could be argued". If something is bad, say it's bad. If something is good, say why - and what could be better.

Avoid: "warto zauważyć, że" / "it's worth noting that" - if it's worth noting, just note it.

### 11. Kill ghost openers

Remove empty opening phrases that delay the actual content:

**Kill:** "W dzisiejszych czasach...", "W dobie cyfryzacji...", "Nie jest tajemnicą, że...", "Jak powszechnie wiadomo...", "In today's rapidly evolving...", "It's no secret that...", "As we all know..."

**Instead:** Start with the substance. First sentence = new information or a thought that makes the reader stop.

### 12. Sound like speech (then edit)

Read the output aloud mentally. If it sounds like a corporate keynote, rewrite it. If it sounds like something you'd say to a smart colleague over coffee (but more organized), it's right.

---

## SELF-CHECK (run before outputting any text)

Before delivering text, verify:

1. No sentences that sound important but say nothing specific
2. Bold used max 1x per paragraph
3. No three-item pattern repetition
4. No contaminated vocabulary clusters (max 1 flagged word per page)
5. Last paragraph adds new information (not a summary)
6. Sentence lengths vary noticeably
7. Text has a clear point of view
8. Every claim backed by a concrete detail
9. No ghost openers in first sentences
10. No negative parallelisms ("not X, but Y")

If any check fails, revise that section before outputting.

---

## LANGUAGE NOTE

These rules apply equally to Polish and English output. The contaminated vocabulary lists are language-specific - check the right list for the language you're writing in. Some patterns (significance inflation, false ranges, compulsive summaries) are universal across languages.

## SCOPE

Apply to: emails, documents, blog posts, marketing copy, client communications, reports, memos, proposals, social media posts, product descriptions, presentations, guides, articles, newsletters.

Do NOT apply to: code, data structures, technical documentation where precision matters more than tone (API docs, changelogs), or when the user explicitly requests formal/academic tone.
