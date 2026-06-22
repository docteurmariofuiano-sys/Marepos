#!/usr/bin/env python3
"""Génère les versions autonomes (single-file) des modules.

Inline les <link rel="stylesheet"> et <script src> locaux, puis réécrit les
liens internes vers les variantes *-standalone.html pour une navigation
cohérente hors serveur (file://).
"""
import re
import os

HERE = os.path.dirname(os.path.abspath(__file__))

# page source -> nom du fichier autonome
PAGES = {
    "index.html": "aide-decision-standalone.html",
    "biologie.html": "biologie-standalone.html",
    "catalogue.html": "catalogue-standalone.html",
    "procedures.html": "procedures-standalone.html",
}


def read(path):
    with open(os.path.join(HERE, path), encoding="utf-8") as fh:
        return fh.read()


def inline(html):
    def css_repl(m):
        href = m.group(1)
        return "<style>\n" + read(href) + "\n</style>"

    def js_repl(m):
        src = m.group(1)
        return "<script>\n" + read(src) + "\n</script>"

    html = re.sub(r'<link[^>]*rel="stylesheet"[^>]*href="([^"]+)"[^>]*/?>',
                  css_repl, html)
    html = re.sub(r'<script[^>]*src="([^"]+)"[^>]*></script>', js_repl, html)
    return html


def rewrite_links(html):
    # remplace les noms de pages (attributs href ET littéraux JS) par les
    # variantes autonomes. Pas de chevauchement entre les sous-chaînes.
    for src, out in PAGES.items():
        html = html.replace(src, out)
    return html


def main():
    for src, out in PAGES.items():
        html = read(src)
        html = inline(html)
        html = rewrite_links(html)
        with open(os.path.join(HERE, out), "w", encoding="utf-8") as fh:
            fh.write(html)
        print("écrit", out, "(%d caractères)" % len(html))


if __name__ == "__main__":
    main()
