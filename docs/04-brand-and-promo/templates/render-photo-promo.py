"""Render a Foot+ photo promo (1080 x 1350 Facebook post) as a PNG and an 8-second MP4.

Needs: pip install playwright && playwright install chromium, plus ffmpeg.

Example:
  python docs/04-brand-and-promo/templates/render-photo-promo.py southampton-opening-facebook

Renders templates/<template>.html to examples/foot-plus-<template>.png and .mp4.
Copy and text are edited in the HTML file itself.
"""
import argparse
import pathlib
import subprocess

from playwright.sync_api import sync_playwright

HERE = pathlib.Path(__file__).resolve().parent
OUT = HERE.parent / "examples"
FPS, SECONDS, W, H = 30, 8, 1080, 1350

ap = argparse.ArgumentParser()
ap.add_argument("template", help="template name without .html, e.g. southampton-opening-facebook")
ap.add_argument("--no-video", action="store_true")
args = ap.parse_args()

src = HERE / f"{args.template}.html"
name = f"foot-plus-{args.template}"
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": W, "height": H})
    page.goto(src.as_uri())
    page.wait_for_load_state("networkidle")
    page.evaluate("document.fonts.ready")
    page.evaluate("setT(20)")  # finished frame
    page.screenshot(path=str(OUT / f"{name}.png"))

    if not args.no_video:
        tmp = OUT / f"{name}.tmp.mp4"
        ff = subprocess.Popen(
            ["ffmpeg", "-y", "-loglevel", "error", "-f", "image2pipe", "-framerate", str(FPS),
             "-i", "-", "-c:v", "libx264", "-preset", "veryfast", "-crf", "18",
             "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(tmp)],
            stdin=subprocess.PIPE,
        )
        for f in range(FPS * SECONDS):
            page.evaluate(f"setT({f / FPS})")
            ff.stdin.write(page.screenshot(type="jpeg", quality=92))
        ff.stdin.close()
        if ff.wait() != 0:
            raise SystemExit("ffmpeg failed")
        tmp.rename(OUT / f"{name}.mp4")
    browser.close()

print(f"Saved {OUT / name}.png" + ("" if args.no_video else " and .mp4"))
