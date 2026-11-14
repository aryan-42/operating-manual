# Operating Manual

A ten-year personal system for body, mind, craft, money, presence, people and character. Started 14 November 2026.

The manual itself is one self-contained page, `index.html`. This repository is where it is maintained: every change to the content is a commit, and every research claim is tracked in `research/`.

## What is here

| Path | What it is |
|---|---|
| `index.html` | The manual. The single source of truth for the published page. |
| `CHANGELOG.md` | What changed in each version and why. |
| `research/evidence-log.md` | Every research claim in the manual, its rating, its source and when it was last checked. |
| `research/inbox.md` | New findings and ideas waiting to be evaluated before they go into the manual. |

## What is not here

Your own entries (scores, snapshots, workbook answers) are not in this repository. They are stored with the published page under your Claude account, with the browser as a fallback. Use "Copy backup" in section 13 of the manual if you want a copy of them.

## How an update works

1. **Capture.** A new study, book or idea goes into `research/inbox.md` with a link and one line on why it might matter.
2. **Evaluate.** It has to pass the intake test at the top of the inbox: is it a meta-analysis, a replication or a consensus statement, and would it change something you actually do?
3. **Change the manual.** Edit `index.html`. If a claim is added or changed, update `research/evidence-log.md` in the same commit.
4. **Record it.** Add a line to `CHANGELOG.md` and bump the version.
5. **Republish.** Publish the new `index.html` to the same Claude artifact so the live page matches the repository.

A reasonable cadence is a research sweep once a quarter, timed with the quarterly review in section 13, plus ad hoc additions whenever something comes up.

## Versioning

- **Major** (2.0): the structure changes, for example a domain is added or the tiers are redefined.
- **Minor** (1.1): a protocol, standard or evidence rating changes.
- **Patch** (1.0.1): wording, links and fixes.

## Rules for editing

- Standards change slowly. A standard should only move if the evidence moved or you outgrew it, never because it felt hard that week.
- Every research claim cites a source in section 16 and has a row in the evidence log.
- Benchmarks that are judgement rather than research stay labelled as judgement.
- One focus per quarter still applies. Adding content is not progress on the standards.

## Published page

The live manual is a private Claude artifact titled "Aryan Operating Manual".
