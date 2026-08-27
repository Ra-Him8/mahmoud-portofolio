# Mahmoud Mohamed — Portfolio

Video editor portfolio. No build step, no framework, no monthly cost.
Open `index.html` and it runs.

---

# English

## 1. Look at your site

Double-click **`index.html`**.

The before/after videos need a real web server to play (browsers block local video
files opened directly). To start one, open a terminal in this folder and run:

```bash
python -m http.server 4321
```

Then open <http://localhost:4321> in your browser. Press `Ctrl+C` in the terminal to stop it.

## 2. Change anything on the site

Open **`admin.html`** in your browser. That is your control panel.

* Every change saves **instantly** and shows up in the preview tab right away.
* When you're happy, press **Download data.js**.
* Put that downloaded file into `assets/js/` and let it replace the old `data.js`.

That last step is what makes the change permanent for visitors. Until you do it,
the changes only exist in your own browser.

> **Backup:** the downloaded `data.js` *is* your backup. Keep a copy somewhere safe.
> The **Import** button loads one back if you ever break something.

## 3. Your videos: two folders, and why

Your six videos are on the site. But there are now **two** video folders, and the
difference matters:

| Folder | What's in it | Goes online? |
|---|---|---|
| `videos/` | your masters — 382 MB | **No. Never.** |
| `videos/web/` | the compressed copies — 22 MB | **Yes. This is what you upload.** |

Masters and deliverables. Same idea you already use.

`reel1.mp4` was 293 MB — 4K, 60fps, 18 seconds. On Egyptian mobile data that file
would not have finished loading before the client closed the tab. It is now 4.8 MB
and looks the same on a phone.

### Adding a new video

1. Drag your export **onto** `videos/COMPRESS-FOR-WEB.bat`.
2. A black window opens, works, and says DONE.
3. Open `admin.html` → **Projects** → Add, and pick the new file from `videos/web/`.

You never have to think about bitrates. If you'd rather export it yourself:
H.264 MP4, 30fps, 2.5–3 Mbps, AAC audio 128k, under 8 MB — then put it in `videos/web/`.

**Keep the audio.** Your sound design is half the edit; the site plays it when a
client opens a video.

### The before/after section is currently switched off

It compares a raw shot against your graded one, side by side with a draggable
handle. It needs **pairs**, and you gave me finished edits — so rather than fake it
with a desaturated copy of your own work, I hid the section.

To switch it on, export the same shot twice:

```
videos/web/ba1-before.mp4    straight from camera, no grade
videos/web/ba1-after.mp4     your finished version
```

Same shot, same length, same first frame, 5–10 seconds. Then open
`assets/js/data.js`, find `beforeAfter`, and delete the `//` in front of the block
that's already written there. The section reappears on its own.

## 4. Add a normal project

`admin.html` → **Projects** → Add.

The video can be a file in `videos/web/`, **or** you can just paste a YouTube or
Vimeo link — the site works out which one you gave it.

Set **Length** (e.g. `0:19`) so the badge on the card is right. Clients check how
long something is before they watch it.

Pick the **Shape** to match your video, or it will look stretched:
`16/9` wide · `9/16` reels · `1/1` square · `4/5` Instagram feed.

## 5. Hide a section you don't want

Delete every item inside it. An empty section disappears from the page **and**
from the menu automatically. Nothing is left half-broken.

Example: delete all three packages and the whole Pricing section vanishes.

## 6. Put it online (free)

1. Go to <https://app.netlify.com/drop>
2. Drag this entire folder onto the page.
3. Done — you get a live link in about 20 seconds.

> **Before you drag:** move the `brand/` folder somewhere else on your computer
> first. It's 21 MB of logo files — a ProRes master and 90 animation frames —
> that your visitors never need. The website itself is only about 380 KB.
> Put `brand/` back afterwards; nothing links to it.

To use your own domain later, buy one and point it there in Netlify's settings.

> **One thing to know:** `admin.html` gets uploaded too, so anyone who guesses the
> address can open your panel. They **cannot** change your real site — the panel only
> edits their own browser, and publishing needs file access. But if you'd rather it
> not be public at all, just delete `admin.html` from the uploaded copy and keep it
> on your computer.

---

# ✅ Publish checklist

Work down this list. The first section is **required** — the site will go live
without it, but you'll be advertising placeholder content.

## Before you publish

- [ ] **Replace the fake testimonials.** `admin.html → Client reviews`. Four
      invented reviews ship with the site. A client who checks and finds a fake
      one is gone for good.
- [ ] **Fix the numbers.** `admin.html → Numbers`. It currently claims 320 videos,
      65 clients, 18M views. Make them true.
- [ ] **Add your real photo.** `admin.html → About you → Your photo`. Right now
      it's the "MM" monogram where your face should be.
- [x] ~~Put your videos in~~ — done. Six videos are live and compressed.
- [ ] **Check the titles I gave your videos.** `admin.html → Projects`. I named
      them from what's visible on screen ("Crover", "Me & You Café"). If a client
      name is wrong, or that job was spec work, fix it before anyone sees it.
- [ ] **Upload `videos/web/` only.** Not `videos/`. That's 382 MB of masters the
      site never touches.
- [ ] **Fix your social links.** `admin.html → Social links` — they all point at
      the homepages of Instagram, TikTok etc., not at your profiles.
- [ ] **Check the prices.** `admin.html → Pricing`. They're based on real market
      research, but they're my numbers, not yours.
- [ ] **Download data.js** and put it in `assets/js/`, replacing the old one.

## After you buy a domain

Three files hard-code the address. Change all three:

- [ ] `assets/js/data.js` → `seo.url` → `"https://yourdomain.com"`
- [ ] `robots.txt` → the `Sitemap:` line
- [ ] `sitemap.xml` → every `REPLACE-WITH-YOUR-DOMAIN.com`

Until you do this the site still works — it just works out its own address,
which is fine for a Netlify link but weaker for Google.

## Tell Google you exist

- [ ] Go to <https://search.google.com/search-console>, add your domain, verify it.
- [ ] Submit `https://yourdomain.com/sitemap.xml`.
- [ ] Paste your URL into <https://search.google.com/test/rich-results> — it should
      find **FAQPage**, **Person** and **ProfessionalService**.
- [ ] Paste your URL into <https://www.opengraph.xyz> to see exactly what a client
      sees when you send the link on WhatsApp.

Indexing takes a few days to a couple of weeks. That's normal.

## What's already done for you

- Page title, description and keywords — **and Arabic versions**, which swap
  automatically when a visitor switches language.
- Open Graph and Twitter cards, with a proper **1200×630 PNG** preview image
  (`assets/img/og.png`). Social platforms do not display SVG previews, which is
  why this is a PNG.
- Structured data (JSON-LD): `Person`, `ProfessionalService` with your prices and
  service list, `WebSite`, and a **`FAQPage`** — that last one can make your
  answers appear as an expandable list directly in Google results.
- `robots.txt`, `sitemap.xml` with `hreflang` for English and Arabic.
- `site.webmanifest` — clients can add your site to their phone home screen.
- Favicons in every format Google and Apple ask for (`.svg`, `.ico`, `.png`).
- A branded `404.html`.
- Security headers and caching rules (`netlify.toml` and `_headers`).
- `admin.html` blocked from search engines, in the page, in `robots.txt`, and by
  an HTTP header.

---

# Your logo

The `brand/` folder has your logo in every format — static and animated,
transparent, colour, white and black, plus a **ProRes 4444 file with a real
alpha channel** you can drop straight onto a timeline in Premiere.

Open `brand/README.md` for what to use where, and `brand/preview-on-dark.png`
to see everything at a glance.

---

# بالعربي

## ١. تشوف الموقع

دوس دبل كليك على **`index.html`**.

فيديوهات قبل/بعد محتاجة سيرفر عشان تشتغل. افتح terminal في الفولدر ده واكتب:

```bash
python -m http.server 4321
```

وبعدين افتح <http://localhost:4321>. اضغط `Ctrl+C` عشان توقفه.

## ٢. تغيّر أي حاجة

افتح **`admin.html`** — دي لوحة التحكم بتاعتك.

* أي تعديل بيتحفظ **فوراً** وبيظهر في التاب المفتوح على طول.
* لما تخلص اضغط **Download data.js**.
* حط الملف اللي نزل في فولدر `assets/js/` مكان الملف القديم.

الخطوة الأخيرة دي هي اللي بتخلي التعديل دائم للزوار. من غيرها التعديلات
موجودة في المتصفح بتاعك بس.

> **نسخة احتياطية:** ملف `data.js` اللي بينزل هو النسخة الاحتياطية بتاعتك.
> خليك محتفظ بنسخة منه. وزرار **Import** بيرجّعه لو حصلت أي مشكلة.

## ٣. تضيف فيديوهات قبل وبعد

دي أهم حاجة في الموقع، فاعملها صح.

**خطوة ١ — صدّر مقطعين لنفس اللقطة.** واحد خام وواحد بعد المونتاج. نفس الطول
ونفس بداية الفريم. من ٥ لـ ١٠ ثواني، ويكون لوب نضيف.

**خطوة ٢ — استخدم الإعدادات دي.** الملفات الكبيرة بتبطّأ الموقع والعميل بيمشي.

| الإعداد | القيمة |
|---|---|
| الصيغة | H.264 MP4 |
| الأبعاد | 1920×1080 (أو 1080×1920 للطولي) |
| البِت ريت | 4–6 Mbps |
| الفريم ريت | 30 fps |
| الصوت | **بدون** — المقاطع دي مكتومة أصلاً، فالصوت حجم زيادة |
| الحجم المستهدف | من ٢ لـ ٥ ميجا لكل واحد |

**خطوة ٣ — حط الملفين في فولدر `videos/`.**

**خطوة ٤ — افتح `admin.html` ← "Before / After" ← Add.** اكتب أسماء الملفات في
خانة BEFORE و AFTER، مثلاً `videos/coffee-before.mp4` و `videos/coffee-after.mp4`.

لو اسم الملف غلط، الموقع هيقولك بالظبط الملف اللي مالقاهوش بدل ما يبقى مربع أسود.
مفيش حاجة بتتكسر.

## ٤. تضيف مشروع عادي

`admin.html` ← **Projects** ← Add.

الفيديو ممكن يكون ملف في `videos/`، **أو** تحط لينك يوتيوب أو فيميو عادي —
الموقع هيعرف لوحده.

اختار **Shape** المناسب للفيديو، وإلا هيبان مشدود:
`16/9` عرضي · `9/16` ريلز · `1/1` مربع · `4/5` انستجرام.

## ٥. تخفي قسم مش عايزه

امسح كل العناصر اللي جواه. القسم الفاضي بيختفي من الصفحة **ومن القائمة** لوحده.
مفيش حاجة بتفضل ناقصة.

مثال: امسح الباقات التلاتة وقسم الأسعار كله هيختفي.

## ٦. تنشر الموقع (مجاناً)

١. ادخل على <https://app.netlify.com/drop>
٢. اسحب الفولدر ده كله على الصفحة.
٣. خلاص — هتاخد لينك شغال في حوالي ٢٠ ثانية.

لو عايز دومين باسمك، اشتريه ووصّله من إعدادات Netlify.

> **حاجة مهمة تعرفها:** ملف `admin.html` بيترفع هو كمان، فأي حد يخمّن اللينك
> يقدر يفتح اللوحة. هو **مش** هيقدر يغيّر موقعك الحقيقي — اللوحة بتعدّل في
> المتصفح بتاعه هو بس. بس لو مش عايزها تكون متاحة أصلاً، امسح `admin.html`
> من النسخة المرفوعة وخليه على جهازك.

---

# Brand reference

Keep these consistent everywhere — business cards, invoices, thumbnails, Instagram.

## Logo

The mark is an **M** next to a play triangle, split by a vertical line with a grab
handle. That line is a before/after slider — cool cyan on the left (raw), warm
ember on the right (graded). Your logo is your pitch.

Files: `assets/img/favicon.svg` (icon) · `assets/img/og.svg` (link preview card)

## Colours

| Swatch | Hex | Use |
|---|---|---|
| Ink | `#07070B` | page background, letterbox black |
| Aqua | `#14E0C8` | "before" / raw / cool accent |
| Ember | `#FF6A2B` | "after" / graded / main call-to-action |
| Gold | `#FFB020` | highlights, star ratings |
| Text | `#F2F3F7` | body text |
| Muted | `#8C90A6` | secondary text |

Signature gradient: `135°` from Aqua → Gold → Ember. This is the teal-and-orange
cinematic grade — the thing you actually sell — used as your identity.

## Type

* **Sora** — headings (700/800, tight letter-spacing)
* **Inter** — body text
* **Cairo** — all Arabic

All three are free Google Fonts.

---

# File map

```
index.html            the website
admin.html            your control panel  ← edit everything here
README.md             this guide

assets/js/data.js     ALL your content lives here (the only file that matters)
assets/js/app.js      builds the site from data.js — don't edit
assets/js/admin.js    the control panel — don't edit
assets/css/style.css  site design
assets/css/admin.css  panel design
assets/img/           logo, favicon, placeholder thumbnails

videos/               ← your masters. Never upload these.
videos/web/           ← the compressed copies the site actually uses
videos/COMPRESS-FOR-WEB.bat   ← drag a video onto this to make a web copy
```

## If something breaks

Open `admin.html` and press **Reset**. That throws away browser edits and goes back
to whatever is in `data.js`. If `data.js` itself is broken, press **Import** and load
a `data.js` backup you downloaded earlier.
