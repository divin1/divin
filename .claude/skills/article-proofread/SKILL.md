---
name: article-proofread
description: >
  Proofread and improve a hand-written article in content/thoughts or content/projects
  (MDX). Fixes grammar, clarity, redundancy, awkward phrasing, and consistency, while
  preserving the author's voice and argument. Use when user says "proofread this
  article", "review my draft", "clean up this post", "check grammar/tone", or points
  at a file under content/thoughts or content/projects for editing feedback.
---

Proofread hand-written MDX articles in this blog. Preserve author's voice — do not rewrite into generic copy. Fix what's broken, flag what's debatable.

## Scope

Target files: `content/thoughts/*.mdx`, `content/projects/*.mdx`. Body is prose (sometimes with `###` sections, bold subheads, footnote-style markers like ¹²³, `&mdash;`). Frontmatter fields: `date`, `updated`, `draft`, `hidden`, `title`, `excerpt`, `tags`, `keywords`, `cover`.

## Pass 1 — mechanical

- Grammar, punctuation, subject-verb agreement, tense consistency.
- Typos, doubled words, missing/duplicate spaces.
- Sentence-level clarity: split run-ons, cut filler ("basically", "in order to", "the fact that"), kill redundant clauses that repeat a point already made.
- Consistent terminology (don't let a term flip spelling/casing mid-article, e.g. "T-shaped" vs "t shaped").
- Markdown/MDX validity: heading hierarchy, bold/italic markers closed, footnote markers matching if used.

## Pass 2 — structural

- Paragraph flow: does each paragraph advance one idea? Flag paragraphs that restate the previous one without adding anything.
- Section balance: a `###` section that's one line next to others running 5+ lines is a flag, not an auto-fix.
- Opening: does the first paragraph earn the read, or is it throat-clearing that could be cut?
- Closing: does the piece land on a point, or trail off?
- Claims without support: statements presented as fact that would benefit from a concrete example, number, or citation marker (this blog uses ¹²³ footnote style in places).

## Frontmatter check

- `excerpt` empty or missing while `draft: false` — flag, this is what readers see in listings.
- `tags`/`keywords` present but generic/duplicated across unrelated posts — check other files in the same directory for the established vocabulary before suggesting new tags.
- `title` present but excerpt doesn't match the article's actual angle.

## Output

For each finding: quote the exact line/sentence, state the problem in one line, give the concrete fix (rewritten sentence, not "consider rephrasing"). Group by pass (mechanical / structural / frontmatter). Do not rewrite the whole article unless asked — surface findings first, apply edits only once the user confirms which ones to take.

## Boundaries

Don't inject the writer's opinions or add new arguments — that's the `article-draft` skill's job. Don't flatten distinctive voice (long sentences, rhetorical questions, first-person asides) into generic "clean" prose — flag only when it hurts clarity, not when it's just unconventional.
