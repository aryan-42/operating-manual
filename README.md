# Operating Manual

A ten-year personal system across nine domains: body, mind, craft, money, presence, people, character, competence and base. Started 14 November 2026.

The manual itself is one self-contained page, `index.html`, assembled from the files in `src/`. This repository is where it is maintained: every change to the content is a commit, and every research claim is tracked in `research/`.

## What is here

| Path | What it is |
|---|---|
| `index.html` | The built manual. This is the file that gets published. Do not edit it by hand. |
| `src/sections/` | One file per section. Edit these. |
| `src/head.html`, `src/script.js` | Styles and behaviour. |
| `build.py` | Assembles `index.html`, numbers the sections and builds the index. Section order and version live here. |
| `docs/v2-plan.md` | The audit of version 1 and the full content plan, with the release schedule. Completed with 2.0.0. |
| `CHANGELOG.md` | What changed in each version and why. |
| `research/evidence-log.md` | Every research claim in the manual, its rating, its source and when it was last checked. |
| `research/inbox.md` | New findings and ideas waiting to be evaluated before they go into the manual. |

## What is not here

Your own entries (scores, snapshots, workbook answers) are not in this repository. They are stored with the published page under your Claude account, with the browser as a fallback. Use "Copy backup" in the Rhythm section of the manual if you want a copy of them.

## How an update works

1. **Capture.** A new study, book or idea goes into `research/inbox.md` with a link and one line on why it might matter.
2. **Evaluate.** It has to pass the intake test at the top of the inbox: is it a meta-analysis, a replication or a consensus statement, and would it change something you actually do?
3. **Change the manual.** Edit the section file in `src/sections/`, then run `python3 build.py`. If a claim is added or changed, update `research/evidence-log.md` in the same commit.
4. **Record it.** Add a line to `CHANGELOG.md` and bump the version.
5. **Republish.** Publish the new `index.html` to the same Claude artifact so the live page matches the repository.

A reasonable cadence is a research sweep once a quarter, timed with the quarterly review in section 13, plus ad hoc additions whenever something comes up.

## Versioning

- **Major** (2.0): the structure changes, for example a domain is added or the tiers are redefined.
- **Minor** (1.1): a protocol, standard or evidence rating changes.
- **Patch** (1.0.1): wording, links and fixes.

## Rules for editing

- Standards change slowly. A standard should only move if the evidence moved or you outgrew it, never because it felt hard that week.
- Every research claim cites a source in the Sources section and has a row in the evidence log.
- Benchmarks that are judgement rather than research stay labelled as judgement.
- One focus per quarter still applies. Adding content is not progress on the standards.

## Published page

The live manual is a private Claude artifact titled "Aryan Operating Manual".
