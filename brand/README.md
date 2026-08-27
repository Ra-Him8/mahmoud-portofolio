# Brand Pack — Mahmoud Mohamed

Your logo, in every format you'll actually need.
دليل استخدام اللوجو بكل الصيغ اللي هتحتاجها.

---

## The idea behind the mark

An **M** beside a **play triangle**, split by a vertical line with a grab handle.

That line is a **before/after slider** — the thing you do for a living. Cool
cyan on the left is the raw footage, warm ember on the right is your grade.
The colours are the teal-and-orange cinematic grade, which is the craft you
sell, used as your identity.

So the logo isn't decoration. It's your pitch, compressed into 64 pixels.

---

# Which file do I use?

## Putting it on a video

| What you want | Use this |
|---|---|
| Logo over your footage, transparent | `animated/logo-reveal_ProRes4444_alpha.mov` |
| Same, if your software won't take ProRes | `animated/logo-reveal-frames/` (PNG sequence) |
| Static watermark in the corner | `static/png/logo-mark-white-512.png` |
| End card on a dark background | `static/png/logo-stacked-2400.png` |
| End card on a light background | `static/png/logo-horizontal-black-2400.png` |

### Dropping the animation into Premiere Pro
1. `File → Import` → pick `logo-reveal_ProRes4444_alpha.mov`
2. Drag it onto a video track **above** your footage.
3. The transparency is already there — you don't need to key anything or set
   any blend mode. If you see a black box instead, you imported the `_black.mp4`
   by mistake.

### Dropping it into After Effects
Same import. In the Project panel it will already say **Millions of Colors+**
— the `+` is the alpha channel. If AE asks how to interpret the alpha, choose
**Premultiplied (matted with black)**.

### If your software refuses ProRes
Import the folder `logo-reveal-frames/` as an **image sequence** instead
(in Premiere: tick "Image Sequence" when importing the first PNG). It's 90
frames at 30fps = exactly 3 seconds, and every frame already has transparency.

---

## Putting it online

| Where | Use this |
|---|---|
| Website header | `static/logo-horizontal.svg` |
| Animated on a web page | `animated/logo-reveal.svg` (loops, no code needed) |
| Transparent video on a site | `animated/logo-reveal_alpha.webm` |
| Email signature / chat | `animated/logo-reveal.gif` |
| Instagram or WhatsApp post | `animated/logo-reveal_black.mp4` |

---

## Profile pictures

Use `static/png/logo-mark-tile-512.png` — the mark on your dark tile.
Square, and it stays readable when a platform crops it into a circle.

---

# Rules that keep it looking professional

### Clear space
Leave empty space around the logo equal to **the height of the play triangle**
on every side. Nothing else goes in that space — no text, no edge of frame.

### Minimum size
- Mark on its own: never below **24 px** tall on screen, or **8 mm** in print.
- Horizontal lockup: never below **120 px** wide, or the role line turns to mush.
  Below that, use the mark on its own instead.

### Which colour version
- **Full colour** (`logo-horizontal.svg`, `logo-mark.png`) — on dark or black.
  The name is near-white, so it disappears on a light background.
- **White** (`-white`) — on photos, footage, or any busy background.
- **Black** (`-black`) — on white or light backgrounds, printed documents,
  invoices, contracts.

### Don't
- Don't stretch it. Hold Shift when you scale.
- Don't recolour it. There are already white and black versions for that.
- Don't put the full-colour version on a light background — use the black one.
- Don't add a drop shadow, outline, or glow.
- Don't rebuild the wordmark in another font.
- Don't crowd it against the edge of the frame.

---

# Colours

| | Hex | RGB | Use |
|---|---|---|---|
| Ink | `#07070B` | 7, 7, 11 | backgrounds, the tile |
| Aqua | `#14E0C8` | 20, 224, 200 | "before" / cool end of the gradient |
| Gold | `#FFB020` | 255, 176, 32 | gradient middle |
| Ember | `#FF6A2B` | 255, 106, 43 | "after" / warm end, main call-to-action |
| Text | `#F2F3F7` | 242, 243, 247 | the name |
| Muted | `#8C90A6` | 140, 144, 166 | the role line |

Gradient: **135°, Aqua → Gold → Ember.**

In Premiere or After Effects, type the hex straight into the colour picker —
don't eyedrop it off a screenshot, you'll pick up compression artefacts.

---

# Type

**Sora** — the name, headings. Weight 800 (ExtraBold).
**Inter** — body text.
**Cairo** — all Arabic.

All three are free from Google Fonts. Install Sora on your machine so the
`.svg` files show the correct font — otherwise they fall back to Arial Black,
which is close but not the same. **The PNG files already have the correct font
baked in**, so use those when it matters.

Download: <https://fonts.google.com/specimen/Sora>

---

# What's in this folder

```
brand/
  preview-on-dark.png          all versions, on your brand black
  preview-on-light.png         mono versions, on white

  static/
    logo-mark.svg              mark only, full colour
    logo-mark-tile.svg         mark on the dark tile (profile pictures)
    logo-mark-white.svg        mark, single white
    logo-mark-black.svg        mark, single black
    logo-horizontal.svg        mark + name, side by side
    logo-horizontal-white.svg
    logo-horizontal-black.svg
    logo-stacked.svg           mark above name
    png/                       every version above as transparent PNG,
                               512 / 1024 / 2048 / 2400 / 4000 px wide

  animated/
    logo-reveal_ProRes4444_alpha.mov   3s, transparent  <- for video editing
    logo-reveal-frames/                90 transparent PNGs (same animation)
    logo-reveal_alpha.webm             3s, transparent, for websites
    logo-reveal_black.mp4              3s on brand black, for social
    logo-reveal.gif                    3s, small, for email and chat
    logo-reveal.svg                    loops forever, for web pages
```

The `.mov` is 13 MB because ProRes 4444 is nearly lossless and keeps a real
alpha channel. That's normal and correct — don't replace it with the small
`.mp4`, that one has a black background baked in.
