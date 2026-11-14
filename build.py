#!/usr/bin/env python3
"""Assemble index.html from src/. Run: python3 build.py"""
import re, pathlib
ROOT = pathlib.Path(__file__).parent
VERSION = "2.0.0"
UPDATED = "14 November 2026"
PARTS = [
    ("A · Foundation", ["start", "standard", "principles", "myths", "change"]),
    ("B · Know yourself", ["baseline", "scorecard", "personality", "time", "direction", "assets"]),
    ("C · Domains", ["body", "mind", "craft", "money", "presence", "people", "character", "competence", "base"]),
    ("D · Run it", ["week", "sprint", "rhythm", "seasons", "account", "breaks"]),
    ("E · The long game", ["roadmap", "yearone", "decisions", "risks", "milestones"]),
    ("F · Reference", ["curriculum", "library", "glossary", "sources"]),
]
DOMAINS = {"body", "mind", "craft", "money", "presence", "people", "character", "competence", "base"}

def main():
    head = (ROOT / "src/head.html").read_text(encoding="utf-8")
    js = (ROOT / "src/script.js").read_text(encoding="utf-8")
    nav, body, n = [], [], 0
    for label, names in PARTS:
        nav.append(f'    <li class="part">{label}</li>')
        for name in names:
            n += 1
            sec = (ROOT / f"src/sections/{name}.html").read_text(encoding="utf-8")
            num = f"{n:02d}"
            sec, c = re.subn(r'(<h2 id="h-%s"><span class="n">)[^<]*(</span>)' % name, r"\g<1>%s\g<2>" % num, sec, count=1)
            assert c == 1, f"{name}: heading not found"
            title = re.search(r'<h2 id="h-%s"><span class="n">[^<]*</span>([^<]+)</h2>' % name, sec).group(1)
            count = f'<em data-count="{name}"></em>' if name in DOMAINS else ""
            nav.append(f'    <li><a href="#{name}"><span>{num}</span>{title}{count}</a></li>')
            body.append(sec)
    page = f"""{head}<body>
<div class="shell">
<nav class="index" aria-label="Sections">
  <div class="brand">Operating Manual<small>Aryan · 24 to 34 · v{VERSION}</small></div>
  <div class="find"><label class="sr" for="q">Search the manual</label><input type="search" id="q" placeholder="Search the manual" autocomplete="off"><div id="qOut" aria-live="polite"></div></div>
  <ol>
{chr(10).join(nav)}
  </ol>
  <div class="sync">
    <div><span class="dot" id="syncDot"></span><b id="syncText">Saving in this browser</b></div>
    <div class="hide-s" id="stdCount">0 of 0 standards met</div>
  </div>
</nav>

<main>
<div class="col">

<header class="top">
  <h1>The Operating Manual</h1>
  <p>One system for body, mind, craft, money, presence, people, character, competence and base. Built to be reopened every quarter for ten years.</p>
  <div class="meta">
    <span>Started <input type="date" id="f-start" data-k value="2026-11-14" aria-label="Start date"></span>
    <span><b id="weekNo">Week 1</b> of 520</span>
    <span>Next review <b id="nextRev">Feb 2027</b></span>
    <span><button type="button" class="ghost sm" id="openAll">Open all playbooks</button></span>
  </div>
</header>

{chr(10).join(body)}
<footer>Version {VERSION}, updated {UPDATED}. Health, legal and financial points here are general information. See a doctor before a major change in training or diet if you have a medical condition, and a registered adviser before financial decisions.</footer>

</div>
</main>
</div>

<script>
{js}</script>
</body>
</html>
"""
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print(f"index.html built: {n} sections, {len(page)//1024} KB")

if __name__ == "__main__":
    main()
