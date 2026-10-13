"""Assemble the portfolio's editable HTML files into index.html."""

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parent
INCLUDE = re.compile(r"<!-- include: (sections/[a-z-]+\.html) -->")


def include_section(match):
    section = ROOT / match.group(1)
    return section.read_text(encoding="utf-8").rstrip()


def build():
    template = (ROOT / "main.html").read_text(encoding="utf-8")
    page = INCLUDE.sub(include_section, template)
    if "<!-- include:" in page:
        raise ValueError("An unrecognized section include remains in main.html")
    (ROOT / "index.html").write_text(page, encoding="utf-8")
    print("Portfolio rebuilt. Open or refresh index.html.")


if __name__ == "__main__":
    build()
