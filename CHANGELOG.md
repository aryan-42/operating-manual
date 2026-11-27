# Changelog

All notable changes to the manual. Newest first.

## 2.0.2 · 2026-11-27

- The live manual moved to GitHub Pages: https://aryan-42.github.io/operating-manual/. Each version is also a GitHub release with `index.html` attached.
- Rhythm: the backup note now says entries save in the browser, one copy per device. It still said they saved to a Claude account.
- Scorecard: with some domains unscored, the lowest-domain field said "score all 7". It now counts the nine domains.
- Source 2 (WHO 2020): the link was missing the `PMC` prefix. Fixed in Sources and the evidence log.

## 2.0.1 · 2026-11-15

- Myth file: three new rows. Dopamine detox and testosterone-boosting supplements are now sourced (60, 61). Waking at 5 a.m. is tied to the existing sleep sources. One item remains unsourced.
- The live manual was republished at 2.0. It had been left on 1.2.

## 2.0.0 · 2026-11-14

Third and last staged release from `docs/v2-plan.md`. A major version because two domains were added.

**New domains**
- Competence: practical skills in three tiers, run as one skill per quarter. Playbooks for road habits, first response, cooking, running a home, swimming, driving, repairs, solo travel, hosting and self-defence.
- Base: documents, digital security, living space, tools, rest and play. A setup weekend, a monthly admin hour and a yearly audit. Playbooks for documents, digital security, the room, relocation, tools, and rest and adventure.

**Rewritten to full depth**
- People: summary, staged protocol and playbooks for the inner five and contact log, making friends in a new city, conversation, distance, family, mentors and network, choosing a partner, being a good partner, conflict and repair, boundaries and endings, and loneliness.
- Character: summary, staged protocol and playbooks for the code, honesty, the promise ledger, the courage ladder, anger and ego, vices and compulsions, integrity at work, power, service, meaning, and what to do after breaking the code.

**New sections**
- Seasons: what to hold and what to drop in exam weeks, joining a job, a move, travel, illness, festivals, a work crunch, heartbreak and a family emergency.
- Accountability: what works and how to set it up.
- Risk register: ten risks with early signs, defences and first responses, plus tripwires.
- Milestone log: every ticked standard with its date, built automatically.
- Curriculum: one main subject a year for five years.
- Glossary.

**Changed**
- Nine domains throughout: the standard, the scorecard, snapshots, trends, the roadmap and year one. Snapshots saved before 2.0 show a dash for the two new domains.
- 37 new standards (143 in total): 17 in Competence, 16 in Base, 2 each in People and Character. Existing standards keep their ids, so ticks and dates carry over. Several gained a check.
- Myth file: six new rows (venting anger, multitasking, the 93% rule, alpha hierarchy, predicting which couples last, the right type of partner). Three items remain unsourced.
- Baseline tests for Competence and Base. Start here, Rhythm, Ideal week, Library and When it breaks updated to point at the new sections.

**Page**
- Search across the whole manual, in the index. A hit inside a closed playbook opens it.

**Evidence**
- 23 new sources (37 to 59).
- Eleven sources that pointed to summaries now point to the paper or its record (8, 10, 13, 14, 17, 20, 24, 25, 27, 29, 34).
- The evidence log lists which figures still need a line-by-line read against the paper.

**Not done**
- The Myth file's last three items have no source yet.
- Account saving is still unconfirmed in live use.
- Year one still counts work months from the joining date, which is not yet known.

## 1.2.0 · 2026-11-14

Second staged release: Craft, Money, Presence and the long game.

**Rewritten to full depth**
- Craft: staged protocol from before joining to ownership, and playbooks for the first 90 days, the prep file, the skill tree, visibility and sponsors, negotiating pay, office politics, leading people, and gates for the side project and founder path.
- Money: staged protocol from before the first salary, and playbooks for the salary-day split, emergency fund and insurance, instruments compared, tax basics, credit and debt, big purchases, the second income, scams, and parents. Tax sections and rates are left out on purpose.
- Presence: staged protocol and playbooks for speaking, presenting, writing, listening, grooming, wardrobe at three budgets, body language, etiquette, and staying composed when challenged.

**New sections**
- Year one: month by month from November 2026 to joining, then twelve work months numbered from the joining date.
- Decisions: frameworks for changing jobs, starting a company, moving city, a big purchase, and committing to a partner.

**Changed**
- Roadmap: every phase now has an exit test.
- Five new standards (106 in total).

**Evidence**
- Five new sources (32 to 36): SPIVA India, SEBI on derivatives losses, salary negotiation, first impressions, weak ties.

## 1.1.0 · 2026-11-14

First of three staged releases from `docs/v2-plan.md`: foundations, self-knowledge, Body and Mind.

**New sections**
- Myth file: ten tested claims with verdicts, plus a list still to be sourced.
- How change works: lead and lag measures, the shape of a new habit, why plans fail.
- Baseline tests: objective starting numbers for all seven domains, with waist-to-height and protein target calculated automatically.
- Personality: Big Five, what conscientiousness predicts, scaffolding by trait.
- Time audit: the 168-hour budget with running totals.
- Assets and constraints.
- Ideal week: hour budgets and timetables for the student phase and the working phase.
- Sprint board: one focus, three lead measures, twelve weeks of ticks, hit rate, archive.

**Rewritten**
- Body, to full depth and tailored to the starting point: no training history, home kit (dumbbells, curl rod, bands, pull-up bar, push-up board), diet of vegetables, fish and eggs. Twelve-week Stage 1 programme, pull-up ladder, cardio progression, Stages 2 and 3, and playbooks for nutrition, sleep, mobility, injury, preventive health, supplements and busy days.
- Mind, to full depth: staged protocol and playbooks for the deep-work session, reading and notes, the thought record, pressure, stillness practice, phone setup, decisions and when to get help.
- Start here, for the new structure.

**Page**
- Sections grouped into six parts. Each domain shows standards met in the index.
- Every standard records the date it was first ticked.
- Snapshot trends as small charts per domain.
- Playbooks collapse, with an open-all control.
- Source is now split into `src/` and assembled by `build.py`.

**Evidence**
- Ten new sources (22 to 31). Cross-references use section names in place of numbers.

## 1.0.0 · 2026-11-14

First version.

- Seventeen sections: start here, the standard, principles, scorecard, direction, seven domains, roadmap, rhythm, failure plan, library, sources.
- 98 tickable standards across Body, Mind, Craft, Money, Presence, People and Character, in three tiers: Floor, Strong, Elite.
- Ten operating principles, each rated solid, useful or contested against the research.
- Quarterly scorecard with dated snapshot history.
- 21 sources, logged in `research/evidence-log.md`.
- Entries save to the Claude account, with browser storage as fallback and a copy and restore backup.
