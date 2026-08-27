/* ============================================================================
   app.js — renders the whole site from data.js
   You should never need to edit this file. Edit data.js or use admin.html.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------- state ---------- */
  var DATA = {};
  var lang = 'en';
  var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Merge saved admin edits over the file defaults. */
  function loadData() {
    var base = window.PORTFOLIO_DATA || {};
    try {
      var saved = localStorage.getItem('mm_portfolio_data');
      if (saved) return JSON.parse(saved);
    } catch (e) { /* corrupt save — fall back to the file */ }
    return base;
  }

  /* ---------- helpers ---------- */
  function $(s, c) { return (c || document).querySelector(s); }
  function $$(s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); }

  /* Resolve {en,ar} objects, plain strings, and numbers alike. */
  function t(v) {
    if (v === null || v === undefined) return '';
    if (typeof v === 'object' && !Array.isArray(v)) return v[lang] || v.en || v.ar || '';
    return String(v);
  }

  /* "profile.name" -> DATA.profile.name */
  function get(path) {
    return path.split('.').reduce(function (o, k) {
      return (o && o[k] !== undefined) ? o[k] : undefined;
    }, DATA);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function waLink() {
    var c = DATA.contact || {};
    var num = String(c.whatsapp || '').replace(/\D/g, '');
    if (!num) return '#contact';
    var msg = t(c.whatsappMessage);
    return 'https://wa.me/' + num + (msg ? '?text=' + encodeURIComponent(msg) : '');
  }

  /* Single source of truth — these two checks used to be separate and drifted apart. */
  var IMG_RE = /\.(jpe?g|png|webp|avif|gif|svg)$/i;
  function isImage(src) { return IMG_RE.test(src || ''); }

  /* Real YouTube/Vimeo links only. This used to be /youtu|vimeo/i, which also
     matched the local file videos/web/youtube-longform.mp4 and rendered it as
     a dead thumbnail instead of a playable video. Both the card renderer and
     the lightbox go through here so they cannot drift apart again. */
  var EMBED_RE = /(?:youtube\.com|youtu\.be|vimeo\.com)\//i;
  function isEmbedURL(src) { return EMBED_RE.test(src || ''); }

  /* ---------- icons ---------- */
  var ICONS = {
    instagram: '<rect x="2" y="2" width="20" height="20" rx="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor"/>',
    tiktok:    '<path d="M16.5 2h-3v13.2a2.9 2.9 0 1 1-2.4-2.85V9.3A6 6 0 1 0 16.5 15V8.6a7 7 0 0 0 4 1.25V6.8A4.3 4.3 0 0 1 16.5 2z" fill="currentColor"/>',
    youtube:   '<path d="M22 12s0-3.4-.4-5a2.6 2.6 0 0 0-1.8-1.8C18.1 4.8 12 4.8 12 4.8s-6.1 0-7.8.4A2.6 2.6 0 0 0 2.4 7C2 8.6 2 12 2 12s0 3.4.4 5a2.6 2.6 0 0 0 1.8 1.8c1.7.4 7.8.4 7.8.4s6.1 0 7.8-.4A2.6 2.6 0 0 0 21.6 17c.4-1.6.4-5 .4-5z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 15V9l5 3-5 3z" fill="currentColor"/>',
    behance:   '<path d="M2 6h6.2c2.1 0 3.4 1 3.4 2.7 0 1.2-.6 2-1.7 2.4 1.4.4 2.2 1.4 2.2 2.9 0 2-1.5 3.3-4 3.3H2V6zm3 4.3h2.6c.9 0 1.4-.4 1.4-1.1 0-.7-.5-1.1-1.4-1.1H5v2.2zm0 4.6h2.9c1 0 1.6-.5 1.6-1.3s-.6-1.3-1.6-1.3H5v2.6zM15 7h5v1.6h-5V7zm2.6 3.2c2.3 0 3.9 1.6 3.9 4v.6h-5.8c.2 1 .9 1.6 2 1.6.8 0 1.4-.3 1.7-.9h2c-.4 1.6-1.9 2.6-3.8 2.6-2.4 0-4-1.6-4-4s1.6-3.9 4-3.9zm-1.9 3.2h3.7c-.2-1-.9-1.6-1.8-1.6s-1.7.6-1.9 1.6z" fill="currentColor"/>',
    linkedin:  '<rect x="2" y="2" width="20" height="20" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 10v7M7 7v.01M11.5 17v-4a2 2 0 0 1 4 0v4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    facebook:  '<path d="M14 9V7.5c0-.8.4-1.5 1.6-1.5H17V3h-2.4C11.9 3 11 4.7 11 6.9V9H9v3h2v9h3v-9h2.3l.4-3H14z" fill="currentColor"/>',
    x:         '<path d="M17.5 3h3.2l-7 8 8.3 10h-6.5l-5-6.2L4.6 21H1.4l7.5-8.6L1 3h6.6l4.6 5.7L17.5 3z" fill="currentColor"/>',
    vimeo:     '<path d="M22 8.1c-.1 2.1-1.6 5-4.4 8.7-2.9 3.9-5.3 5.8-7.3 5.8-1.2 0-2.3-1.2-3.1-3.5L5.5 13c-.6-2.3-1.3-3.5-2-3.5-.2 0-.7.3-1.5.9L1 9.2c1-.8 1.9-1.7 2.8-2.6C5.1 5.5 6 5 6.6 4.9c1.5-.1 2.4.9 2.7 3 .4 2.3.7 3.7.8 4.3.4 2 .9 3 1.4 3 .4 0 1-.6 1.8-1.9.8-1.3 1.2-2.2 1.3-2.9.1-1-.3-1.5-1.3-1.5-.4 0-.9.1-1.4.3 1-3.1 2.8-4.6 5.5-4.5 2 .1 2.9 1.4 2.8 3.9z" fill="currentColor"/>',
    whatsapp:  '<path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4zM12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2z" fill="currentColor"/>',
    email:     '<rect x="2" y="4" width="20" height="16" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M3 7l9 6 9-6" fill="none" stroke="currentColor" stroke-width="1.8"/>',
    link:      '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7L12.2 19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',

    reel:  '<rect x="2.5" y="2.5" width="19" height="19" rx="4" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M2.5 8.5h19M8.5 2.5L6 8.5M15 2.5l-2.5 6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10.5 12.5l5 2.7-5 2.8v-5.5z" fill="currentColor"/>',
    play:  '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M10 8.5l6 3.5-6 3.5v-7z" fill="currentColor"/>',
    film:  '<rect x="2.5" y="4.5" width="19" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M7 4.5v15M17 4.5v15M2.5 12h19M2.5 8.2h4.5M2.5 15.8h4.5M17 8.2h4.5M17 15.8h4.5" fill="none" stroke="currentColor" stroke-width="1.5"/>',
    heart: '<path d="M12 20s-7.5-4.6-7.5-9.6A4.4 4.4 0 0 1 12 7.7a4.4 4.4 0 0 1 7.5 2.7C19.5 15.4 12 20 12 20z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    spark: '<path d="M12 2l2.2 6.3L20.5 10l-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-1.7L12 2z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    mic:   '<rect x="9" y="2.5" width="6" height="11" rx="3" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',
    wand:  '<path d="M4 20L16 8M14 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2zM19.5 12l.7 1.4 1.4.6-1.4.7-.7 1.3-.7-1.3-1.3-.7 1.3-.6.7-1.4z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
    clock: '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M12 6.5V12l3.5 2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>',

    check: '<path d="M4 12.5l5 5 11-11" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>',
    star:  '<path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6 6.1 20.7l1.2-6.6L2.5 9.5l6.6-.9L12 2.5z" fill="currentColor"/>',
    arrows:'<path d="M9 7l-5 5 5 5M15 7l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    expand:'<path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>',
    up:    '<path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
    tri:   '<path d="M8 5l11 7-11 7V5z" fill="currentColor"/>'
  };

  function icon(name, cls) {
    var p = ICONS[name] || ICONS.link;
    return '<svg viewBox="0 0 24 24" class="' + (cls || '') + '" aria-hidden="true">' + p + '</svg>';
  }

  /* ---------- static UI strings ---------- */
  var I18N = {
    en: {
      'nav.showcase': 'Before / After', 'nav.work': 'Work', 'nav.services': 'Services',
      'nav.process': 'Process', 'nav.pricing': 'Pricing', 'nav.contact': 'Contact', 'nav.hire': 'Hire me',
      'hero.cta': 'Start a project', 'hero.cta2': 'See before &amp; after', 'hero.scroll': 'Scroll',
      'ba.eyebrow': 'The difference', 'ba.title': 'Before <span class="grad-text">&amp;</span> after',
      'ba.before': 'Before', 'ba.after': 'After', 'ba.hint': 'Drag to compare',
      'ba.legendBefore': 'Raw camera file', 'ba.legendAfter': 'Edited &amp; graded',
      'work.eyebrow': 'Selected work', 'work.title': 'Recent <span class="grad-text">projects</span>',
      'svc.eyebrow': 'What I do', 'svc.title': 'Services built around <span class="grad-text">attention</span>',
      'proc.eyebrow': 'How it works', 'proc.title': 'Four steps, <span class="grad-text">no surprises</span>',
      'quo.eyebrow': 'Kind words', 'quo.title': 'What clients <span class="grad-text">say</span>',
      'pkg.eyebrow': 'Packages', 'pkg.title': 'Simple, <span class="grad-text">fixed pricing</span>',
      'pkg.lead': 'No hourly billing. You know the price before I open the timeline. Prices in USD — Egyptian clients can pay in EGP at the day’s rate.',
      'pkg.cta': 'Choose this', 'pkg.popular': 'Most popular',
      'faq.eyebrow': 'Questions', 'faq.title': 'Things clients <span class="grad-text">ask</span>',
      'cta.eyebrow': "Let's talk",
      'missing.title': 'Video not added yet',
      'missing.body': 'Drop this file into your videos folder:',
      'nav.showreel': 'Showreel', 'nav.about': 'About',
      'reel.eyebrow': 'Start here',
      'hero.cta2alt': 'See the work',
      'rev.none': 'No reviews here yet — I would rather show none than write my own.',
      'rev.title': 'Be the first one.',
      'rev.body': 'If we have worked together, one honest line from you carries more weight than anything I could write about myself. It takes a minute.',
      'rev.cta': 'Write a review on WhatsApp',
      'rev.more': 'Worked with me too? Add yours.',
      'rev.msg': 'Hi Mahmoud — here is my review for your portfolio:\n\nName:\nCompany / role:\nWhat I would say about the work:',
      'lb.muted': 'Your browser muted this — tap the speaker to hear the edit',
      'about.eyebrow': 'Who you are hiring',
      'form.name': 'Your name', 'form.namePh': 'e.g. Omar',
      'form.type': 'Project type', 'form.budget': 'Budget', 'form.when': 'Needed by',
      'form.details': 'Anything else', 'form.detailsPh': 'Length, platform, deadline, a reference you like…',
      'form.send': 'Send on WhatsApp',
      'form.note': 'Nothing is stored here. This opens WhatsApp with the message ready — you press send.',
      'form.msgHi': 'Hi Mahmoud, this is',
      'empty.filter': 'Nothing in this category yet.',
      'compare.expand': 'Fullscreen', 'top': 'Back to top'
    },
    ar: {
      'nav.showcase': 'قبل وبعد', 'nav.work': 'الشغل', 'nav.services': 'الخدمات',
      'nav.process': 'طريقة الشغل', 'nav.pricing': 'الأسعار', 'nav.contact': 'تواصل', 'nav.hire': 'كلمني',
      'hero.cta': 'ابدأ مشروع', 'hero.cta2': 'شوف قبل وبعد', 'hero.scroll': 'انزل',
      'ba.eyebrow': 'الفرق', 'ba.title': 'قبل <span class="grad-text">و</span> بعد',
      'ba.before': 'قبل', 'ba.after': 'بعد', 'ba.hint': 'اسحب للمقارنة',
      'ba.legendBefore': 'ملف الكاميرا الخام', 'ba.legendAfter': 'بعد المونتاج والجريد',
      'work.eyebrow': 'مختارات', 'work.title': 'أحدث <span class="grad-text">المشاريع</span>',
      'svc.eyebrow': 'بعمل إيه', 'svc.title': 'خدمات مبنية على <span class="grad-text">جذب الانتباه</span>',
      'proc.eyebrow': 'إزاي بنشتغل', 'proc.title': 'أربع خطوات، <span class="grad-text">بدون مفاجآت</span>',
      'quo.eyebrow': 'كلام حلو', 'quo.title': 'العملاء <span class="grad-text">بيقولوا إيه</span>',
      'pkg.eyebrow': 'الباقات', 'pkg.title': 'أسعار <span class="grad-text">واضحة وثابتة</span>',
      'pkg.lead': 'مفيش حساب بالساعة. بتعرف السعر قبل ما أفتح البرنامج. الأسعار بالدولار — والعملاء في مصر يقدروا يدفعوا بالجنيه بسعر اليوم.',
      'pkg.cta': 'اختار دي', 'pkg.popular': 'الأكثر طلباً',
      'faq.eyebrow': 'أسئلة', 'faq.title': 'أسئلة العملاء <span class="grad-text">الشائعة</span>',
      'cta.eyebrow': 'يلا نتكلم',
      'missing.title': 'الفيديو لسه مااتضافش',
      'missing.body': 'حط الملف ده في فولدر videos:',
      'nav.showreel': 'الشوريل', 'nav.about': 'عني',
      'reel.eyebrow': 'ابدأ من هنا',
      'hero.cta2alt': 'شوف الشغل',
      'rev.none': 'مفيش ريفيوز لسه — ومفضل أسيبها فاضية على إني أكتبها بنفسي.',
      'rev.title': 'كون أول واحد.',
      'rev.body': 'لو اشتغلنا مع بعض، سطر واحد منك بيعمل شغل أكتر من أي كلام أقوله أنا عن نفسي. مش هياخد دقيقة.',
      'rev.cta': 'اكتب ريفيو على الواتساب',
      'rev.more': 'اشتغلنا مع بعض برضه؟ ضيف ريفيوك.',
      'rev.msg': 'أهلاً محمود — ده الريفيو بتاعي عشان تحطه في البورتفوليو:\n\nالاسم:\nالشركة / المنصب:\nرأيي في الشغل:',
      'lb.muted': 'المتصفّح قفل الصوت — دوس على السمّاعة عشان تسمع المونتاج',
      'about.eyebrow': 'مين اللي هتشتغل معاه',
      'form.name': 'اسمك', 'form.namePh': 'مثلاً عمر',
      'form.type': 'نوع المشروع', 'form.budget': 'الميزانية', 'form.when': 'محتاجه امتى',
      'form.details': 'أي تفاصيل تانية', 'form.detailsPh': 'المدة، المنصة، الميعاد، أو مثال عاجبك…',
      'form.send': 'ابعت على واتساب',
      'form.note': 'مفيش حاجة بتتخزن هنا. ده بيفتح واتساب والرسالة جاهزة — وانت اللي بتضغط إرسال.',
      'form.msgHi': 'أهلاً محمود، أنا',
      'empty.filter': 'مفيش حاجة في القسم ده لسه.',
      'compare.expand': 'ملء الشاشة', 'top': 'للأعلى'
    }
  };
  function s(key) { return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key; }

  /* ==========================================================================
     BEFORE / AFTER COMPARE
     ========================================================================== */
  var compareObserver = null;

  function mediaTag(src, poster, role) {
    if (!src) return '';
    if (isImage(src)) {
      return '<img class="compare__media" data-role="' + role + '" src="' + esc(src) +
             '" alt="" loading="lazy" decoding="async">';
    }
    return '<video class="compare__media" data-role="' + role + '" src="' + esc(src) + '"' +
           (poster ? ' poster="' + esc(poster) + '"' : '') +
           ' muted loop playsinline preload="metadata" disablepictureinpicture></video>';
  }

  function compareHTML(item) {
    var vert = item.vertical ? ' compare--vertical' : '';
    return '' +
      '<div class="compare' + vert + '" style="--pos:50%" data-compare>' +
        mediaTag(item.before, item.poster, 'before') +
        '<div class="compare__layer">' + mediaTag(item.after, item.poster, 'after') + '</div>' +
        '<span class="compare__tag compare__tag--before">' + s('ba.before') + '</span>' +
        '<span class="compare__tag compare__tag--after">' + s('ba.after') + '</span>' +
        '<div class="compare__handle">' +
          '<button type="button" class="compare__grip" role="slider" tabindex="0"' +
          ' aria-label="' + s('ba.hint') + '" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50">' +
          icon('arrows') + '</button>' +
        '</div>' +
        '<span class="compare__hint">' + icon('arrows') + s('ba.hint') + '</span>' +
        '<button type="button" class="compare__full" aria-label="' + s('compare.expand') +
        '" title="' + s('compare.expand') + '">' + icon('expand') + '</button>' +
      '</div>';
  }

  function mountCompare(el) {
    var before = $('[data-role="before"]', el);
    var after  = $('[data-role="after"]', el);
    var grip   = $('.compare__grip', el);
    var pos = 50;
    var dragging = false;

    function set(p, silent) {
      pos = Math.max(0, Math.min(100, p));
      el.style.setProperty('--pos', pos + '%');
      grip.setAttribute('aria-valuenow', Math.round(pos));
      if (!silent) el.classList.add('is-touched');
    }

    function fromEvent(e) {
      var r = el.getBoundingClientRect();
      if (!r.width) return;
      set(((e.clientX - r.left) / r.width) * 100);
    }

    el.addEventListener('pointerdown', function (e) {
      dragging = true;
      el.classList.remove('is-animating');
      el.setPointerCapture(e.pointerId);
      fromEvent(e);
    });
    el.addEventListener('pointermove', function (e) { if (dragging) fromEvent(e); });
    ['pointerup', 'pointercancel'].forEach(function (ev) {
      el.addEventListener(ev, function (e) {
        dragging = false;
        try { el.releasePointerCapture(e.pointerId); } catch (_) {}
      });
    });

    var full = $('.compare__full', el);
    if (full) {
      full.addEventListener('click', function (e) {
        e.stopPropagation();
        if (document.fullscreenElement) { document.exitFullscreen(); return; }
        if (el.requestFullscreen) el.requestFullscreen().catch(function () {});
      });
      /* the container is the drag surface — don't start a wipe from the button */
      full.addEventListener('pointerdown', function (e) { e.stopPropagation(); });
    }

    grip.addEventListener('keydown', function (e) {
      var step = e.shiftKey ? 10 : 3;
      if (e.key === 'ArrowLeft')  { set(pos - step); e.preventDefault(); }
      if (e.key === 'ArrowRight') { set(pos + step); e.preventDefault(); }
      if (e.key === 'Home')       { set(0);   e.preventDefault(); }
      if (e.key === 'End')        { set(100); e.preventDefault(); }
    });

    /* Missing-file guard: show a helpful placeholder instead of a black box. */
    [before, after].forEach(function (m) {
      if (!m) return;
      m.addEventListener('error', function () {
        if ($('.compare__missing', el)) return;
        /* nothing to compare — hide the wipe controls so they don't sit on the message */
        el.classList.add('is-missing');
        var file = m.getAttribute('src') || '';
        var box = document.createElement('div');
        box.className = 'compare__missing';
        box.innerHTML = '<strong>' + s('missing.title') + '</strong><span>' + s('missing.body') +
                        '</span><code>' + esc(file) + '</code>';
        el.appendChild(box);
      }, true);
    });

    /* Keep the two clips locked together. */
    if (before && after && before.tagName === 'VIDEO' && after.tagName === 'VIDEO') {
      before.addEventListener('timeupdate', function () {
        if (Math.abs(after.currentTime - before.currentTime) > 0.2) {
          after.currentTime = before.currentTime;
        }
      });
    }

    /* Play only while on screen — saves the visitor's data. */
    if (!compareObserver) {
      compareObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          $$('video', en.target).forEach(function (v) {
            if (en.isIntersecting) { var p = v.play(); if (p) p.catch(function () {}); }
            else v.pause();
          });
          if (en.isIntersecting && !en.target.dataset.demoed && !reduced) {
            en.target.dataset.demoed = '1';
            demo(en.target);
          }
        });
      }, { threshold: 0.25 });
    }
    compareObserver.observe(el);

    /* One-time sweep so people learn the interaction without being told. */
    function demo(node) {
      setTimeout(function () {
        if (node.classList.contains('is-touched')) return;
        node.classList.add('is-animating');
        set(80, true);
        setTimeout(function () { if (!node.classList.contains('is-touched')) set(22, true); }, 950);
        setTimeout(function () { if (!node.classList.contains('is-touched')) set(50, true); }, 1900);
        setTimeout(function () { node.classList.remove('is-animating'); }, 2900);
      }, 700);
    }
  }

  /* ==========================================================================
     RENDERERS
     ========================================================================== */
  var R = {};

  R.socials = function (el) {
    var list = DATA.socials || [];
    el.innerHTML = list.map(function (x) {
      if (!x.url) return '';
      return '<a class="social-btn" href="' + esc(x.url) + '" target="_blank" rel="noopener noreferrer"' +
             ' aria-label="' + esc(x.label || x.icon) + '" title="' + esc(x.label || x.icon) + '">' +
             icon(x.icon) + '</a>';
    }).join('');
  };

  R.stats = function (el) {
    /* no numbers -> hide it, or the empty grid leaves a hairline sliver */
    if (!(DATA.stats || []).length) { hideSection(el); return; }
    el.innerHTML = (DATA.stats || []).map(function (x, i) {
      return '<div class="stat" data-reveal style="--d:' + (i * 80) + 'ms">' +
             '<div class="stat__num" data-count="' + Number(x.value || 0) + '" data-suffix="' +
             esc(x.suffix || '') + '">0</div>' +
             '<div class="stat__label">' + esc(t(x.label)) + '</div></div>';
    }).join('');
  };

  function marquee(el, items) {
    if (!items.length) { el.style.display = 'none'; return; }
    var row = items.map(function (x) { return '<span class="marquee__item">' + esc(x) + '</span>'; }).join('');
    el.innerHTML = '<div class="marquee__track">' + row + row + '</div>';
  }
  R.clients = function (el) { marquee(el, DATA.clients || []); };
  R.tools   = function (el) { marquee(el, DATA.tools   || []); };

  R.filters = function (el) {
    var cats = DATA.categories || [];
    if (cats.length < 2) { el.style.display = 'none'; return; }
    el.innerHTML = cats.map(function (c, i) {
      return '<button type="button" class="filter' + (i === 0 ? ' is-on' : '') +
             '" data-cat="' + esc(c.id) + '">' + esc(t(c.label)) + '</button>';
    }).join('');

    var target = el.dataset.target;
    el.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter');
      if (!btn) return;
      $$('.filter', el).forEach(function (b) { b.classList.toggle('is-on', b === btn); });
      var cat = btn.dataset.cat;
      var scope = target === 'ba' ? $('[data-render="beforeAfter"]') : $('[data-render="work"]');
      if (!scope) return;

      var shown = 0;
      $$('[data-cat-item]', scope).forEach(function (item) {
        var show = cat === 'all' || item.dataset.catItem === cat;
        item.style.display = show ? '' : 'none';
        if (show) shown++;
      });

      /* an empty filter used to leave a blank void with no explanation */
      var msg = $('.filter-empty', scope);
      if (!shown) {
        if (!msg) {
          msg = document.createElement('p');
          msg.className = 'filter-empty';
          scope.appendChild(msg);
        }
        msg.textContent = s('empty.filter');
        msg.style.display = '';
      } else if (msg) {
        msg.style.display = 'none';
      }
    });
  };

  R.beforeAfter = function (el) {
    var list = DATA.beforeAfter || [];
    if (!list.length) { hideSection(el); return; }

    el.innerHTML = list.map(function (x) {
      return '<article class="ba' + (x.vertical ? ' ba--vertical' : '') + '"' +
             ' data-cat-item="' + esc(x.category || 'all') + '" data-reveal>' +
               compareHTML(x) +
               '<div class="ba__info">' +
                 '<span class="ba__cat">' + esc(catLabel(x.category)) + '</span>' +
                 '<h3 class="ba__title">' + esc(t(x.title)) + '</h3>' +
                 '<p class="ba__note">' + esc(t(x.note)) + '</p>' +
                 '<div class="ba__legend">' +
                   '<span><i style="background:var(--aqua)"></i>' + s('ba.legendBefore') + '</span>' +
                   '<span><i style="background:var(--ember)"></i>' + s('ba.legendAfter') + '</span>' +
                 '</div>' +
               '</div>' +
             '</article>';
    }).join('');

    $$('[data-compare]', el).forEach(mountCompare);
  };

  function catLabel(id) {
    var c = (DATA.categories || []).filter(function (x) { return x.id === id; })[0];
    return c ? t(c.label) : (id || '');
  }

  R.work = function (el) {
    var list = DATA.work || [];
    if (!list.length) { hideSection(el); return; }

    el.innerHTML = list.map(function (x, i) {
      var ratio = x.ratio || '16/9';
      var isEmbed = isEmbedURL(x.src);
      var media;

      if (isEmbed || isImage(x.src) || !x.src) {
        media = '<img src="' + esc(x.poster || 'assets/img/poster-1.svg') + '" alt="' +
                esc(t(x.title)) + '" loading="lazy" decoding="async">';
      } else {
        media = '<video src="' + esc(x.src) + '" poster="' + esc(x.poster || '') +
                '" muted loop playsinline preload="none"></video>';
      }

      /* 16:9 pieces get two columns — a long-form edit shown at reel width
         sells it short. Verticals stay one column. */
      var wide = ratio === '16/9' ? ' work-card--wide' : '';

      return '<article class="work-card' + wide + '" data-cat-item="' + esc(x.category || 'all') +
             '" data-reveal style="--d:' + (i % 3 * 90) + 'ms">' +
               '<button type="button" class="work-card__media" style="aspect-ratio:' + esc(ratio) +
               '" data-play="' + esc(x.src || '') + '" data-ratio="' + esc(ratio) +
               '" data-cursor="Play" aria-label="' + esc(t(x.title)) + '">' +
                 media +
                 '<span class="work-card__play"><i>' + icon('tri') + '</i></span>' +
                 (x.duration ? '<span class="work-card__dur">' + esc(x.duration) + '</span>' : '') +
               '</button>' +
               '<div class="work-card__body">' +
                 '<h3 class="work-card__title">' + esc(t(x.title)) + '</h3>' +
                 '<div class="work-card__tags">' +
                   (x.tags || []).map(function (tg) { return '<span class="tag">' + esc(tg) + '</span>'; }).join('') +
                 '</div>' +
               '</div>' +
             '</article>';
    }).join('');

    /* preview on hover, pause on leave */
    $$('.work-card', el).forEach(function (card) {
      var v = $('video', card);
      if (!v) return;
      card.addEventListener('mouseenter', function () {
        if (!v.src) return;
        v.preload = 'auto';
        v.muted = true;               /* browsers refuse to autoplay with sound */
        var p = v.play(); if (p) p.catch(function () {});
      });
      /* rewind, so the next hover starts on the hook rather than mid-clip */
      card.addEventListener('mouseleave', function () {
        v.pause();
        try { v.currentTime = 0; } catch (e) {}
      });
    });
  };

  R.showreel = function (el) {
    var r = DATA.showreel || {};
    if (!r.src) { hideSection(el); return; }
    el.innerHTML =
      '<div class="reel" data-reveal>' +
        '<button type="button" class="reel__stage" data-play="' + esc(r.src) + '" data-ratio="16/9"' +
        ' data-cursor="Play" aria-label="' + esc(t(r.title)) + '">' +
          '<img src="' + esc(r.poster || 'assets/img/poster-3.svg') + '" alt="" loading="lazy" decoding="async">' +
          '<span class="reel__scrim"></span>' +
          '<span class="reel__play">' + icon('tri') + '</span>' +
          (r.duration ? '<span class="reel__time">' + esc(r.duration) + '</span>' : '') +
        '</button>' +
        '<div class="reel__meta">' +
          '<span class="eyebrow">' + s('reel.eyebrow') + '</span>' +
          '<h2 class="reel__title">' + esc(t(r.title)) + '</h2>' +
          '<p class="reel__sub">' + esc(t(r.sub)) + '</p>' +
        '</div>' +
      '</div>';
  };

  R.about = function (el) {
    var a = DATA.about || {};
    if (a.show === false) { hideSection(el); return; }
    var p = DATA.profile || {};
    var paras = t(a.body).split('\n').filter(Boolean)
      .map(function (x) { return '<p>' + esc(x) + '</p>'; }).join('');

    el.innerHTML =
      '<div class="about" data-reveal>' +
        '<div class="about__media">' +
          '<img src="' + esc(p.photo || p.avatar || 'assets/img/avatar.svg') + '" alt="' +
            esc(t(p.name)) + '" loading="lazy" decoding="async">' +
          '<span class="about__badge">' + icon('spark') + esc(t(p.role)) + '</span>' +
        '</div>' +
        '<div class="about__text">' +
          '<span class="eyebrow">' + s('about.eyebrow') + '</span>' +
          '<h2 class="section-title">' + esc(t(a.heading)) + '</h2>' +
          '<div class="about__body">' + paras + '</div>' +
          '<ul class="about__points">' +
            (a.highlights || []).map(function (h) {
              return '<li>' + icon('check') + '<span>' + esc(t(h)) + '</span></li>';
            }).join('') +
          '</ul>' +
        '</div>' +
      '</div>';
  };

  /* The form sends no email. It assembles a tidy WhatsApp message so the
     first thing a stranger says already contains the brief. */
  R.leadForm = function (el) {
    var f = DATA.leadForm || {};
    if (f.show === false) { el.style.display = 'none'; return; }
    var cats = (DATA.categories || []).filter(function (c) { return c.id !== 'all'; });

    function opts(list) {
      return list.map(function (o) {
        var v = esc(t(o.label !== undefined ? o.label : o));
        return '<option value="' + v + '">' + v + '</option>';
      }).join('');
    }

    el.innerHTML =
      '<form class="lead" id="leadForm" data-reveal novalidate>' +
        '<div class="lead__head">' +
          '<h3 class="lead__title">' + esc(t(f.title)) + '</h3>' +
          '<p class="lead__sub">' + esc(t(f.sub)) + '</p>' +
        '</div>' +
        '<div class="lead__grid">' +
          '<label class="lead__f"><span>' + s('form.name') + '</span>' +
            '<input type="text" name="name" required autocomplete="name" placeholder="' + s('form.namePh') + '"></label>' +
          '<label class="lead__f"><span>' + s('form.type') + '</span>' +
            '<select name="type">' + opts(cats) + '</select></label>' +
          '<label class="lead__f"><span>' + s('form.budget') + '</span>' +
            '<select name="budget">' + opts(f.budgets || []) + '</select></label>' +
          '<label class="lead__f"><span>' + s('form.when') + '</span>' +
            '<select name="when">' + opts(f.timelines || []) + '</select></label>' +
          '<label class="lead__f lead__f--wide"><span>' + s('form.details') + '</span>' +
            '<textarea name="details" rows="3" placeholder="' + s('form.detailsPh') + '"></textarea></label>' +
        '</div>' +
        '<button type="submit" class="btn btn--wa btn--lg lead__send">' +
          icon('whatsapp') + '<span>' + s('form.send') + '</span></button>' +
        '<p class="lead__note">' + s('form.note') + '</p>' +
      '</form>';

    $('#leadForm', el).addEventListener('submit', function (e) {
      e.preventDefault();
      var fd = new FormData(e.target);
      var name = String(fd.get('name') || '').trim();
      var nameField = e.target.querySelector('[name=name]');
      if (!name) { nameField.focus(); nameField.classList.add('is-bad'); return; }
      nameField.classList.remove('is-bad');

      var lines = [
        s('form.msgHi') + ' ' + name + '.',
        '',
        s('form.type') + ': ' + fd.get('type'),
        s('form.budget') + ': ' + fd.get('budget'),
        s('form.when') + ': ' + fd.get('when')
      ];
      var d = String(fd.get('details') || '').trim();
      if (d) { lines.push('', s('form.details') + ': ' + d); }

      var num = String((DATA.contact || {}).whatsapp || '').replace(/\D/g, '');
      window.open('https://wa.me/' + num + '?text=' + encodeURIComponent(lines.join('\n')),
                  '_blank', 'noopener');
    });
  };

  R.services = function (el) {
    var list = DATA.services || [];
    if (!list.length) { hideSection(el); return; }
    el.innerHTML = list.map(function (x, i) {
      return '<article class="svc" data-reveal style="--d:' + (i * 90) + 'ms">' +
               '<span class="svc__icon">' + icon(x.icon || 'spark') + '</span>' +
               '<h3 class="svc__title">' + esc(t(x.title)) + '</h3>' +
               '<p class="svc__desc">' + esc(t(x.desc)) + '</p>' +
               '<ul class="svc__points">' +
                 (x.points || []).map(function (p) {
                   return '<li>' + icon('check') + '<span>' + esc(t(p)) + '</span></li>';
                 }).join('') +
               '</ul>' +
             '</article>';
    }).join('');
  };

  R.process = function (el) {
    var list = DATA.process || [];
    if (!list.length) { hideSection(el); return; }
    el.innerHTML = list.map(function (x, i) {
      return '<div class="step" data-reveal style="--d:' + (i * 90) + 'ms">' +
               '<span class="step__n">0' + (i + 1) + '</span>' +
               '<h3 class="step__title">' + esc(t(x.title)) + '</h3>' +
               '<p class="step__desc">' + esc(t(x.desc)) + '</p>' +
             '</div>';
    }).join('');
  };

  /* WhatsApp link carrying a fill-in-the-blanks review template, so the client
     does not have to work out what to write. */
  function reviewLink() {
    var num = String((DATA.contact || {}).whatsapp || '').replace(/\D/g, '');
    if (!num) return '#contact';
    return 'https://wa.me/' + num + '?text=' + encodeURIComponent(s('rev.msg'));
  }

  function reviewCTA(compact) {
    var stars = '';
    for (var n = 0; n < 5; n++) stars += icon('star');
    return '<div class="rev-invite' + (compact ? ' rev-invite--compact' : '') + '" data-reveal>' +
             (compact ? '' :
               '<div class="rev-invite__stars">' + stars + '</div>' +
               '<p class="rev-invite__none">' + s('rev.none') + '</p>' +
               '<h3 class="rev-invite__title">' + s('rev.title') + '</h3>' +
               '<p class="rev-invite__body">' + s('rev.body') + '</p>') +
             (compact ? '<p class="rev-invite__body">' + s('rev.more') + '</p>' : '') +
             '<a class="btn btn--wa btn--lg" href="' + esc(reviewLink()) + '"' +
             ' target="_blank" rel="noopener noreferrer">' + s('rev.cta') + '</a>' +
           '</div>';
  }

  R.testimonials = function (el) {
    var list = DATA.testimonials || [];
    /* No reviews yet? Show the invitation rather than hiding the section -
       an empty slot that asks for a review is worth more than no slot. */
    if (!list.length) { el.classList.add('quotes--empty'); el.innerHTML = reviewCTA(false); return; }
    el.classList.remove('quotes--empty');
    el.innerHTML = list.map(function (x, i) {
      var stars = '';
      for (var n = 0; n < (x.rating || 5); n++) stars += icon('star');
      var initials = String(x.name || '?').trim().split(/\s+/).slice(0, 2)
        .map(function (w) { return w[0]; }).join('').toUpperCase();
      return '<article class="quote" data-reveal style="--d:' + (i % 3 * 90) + 'ms">' +
               '<div class="stars">' + stars + '</div>' +
               '<p class="quote__text">' + esc(t(x.text)) + '</p>' +
               '<div class="quote__who">' +
                 '<span class="avatar">' + esc(initials) + '</span>' +
                 '<span><span class="quote__name">' + esc(x.name) + '</span><br>' +
                 '<span class="quote__role">' + esc(t(x.role)) + '</span></span>' +
               '</div>' +
             '</article>';
    }).join('') + reviewCTA(true);
  };

  R.packages = function (el) {
    var list = DATA.packages || [];
    if (!list.length) { hideSection(el); return; }
    el.innerHTML = list.map(function (x, i) {
      return '<article class="pkg' + (x.popular ? ' pkg--popular' : '') +
             '" data-reveal style="--d:' + (i * 90) + 'ms">' +
               (x.popular ? '<span class="pkg__flag">' + s('pkg.popular') + '</span>' : '') +
               '<h3 class="pkg__name">' + esc(t(x.name)) + '</h3>' +
               '<div><div class="pkg__price">' + esc(t(x.price)) + '</div>' +
               '<div class="pkg__period">' + esc(t(x.period)) + '</div></div>' +
               '<ul class="pkg__feats">' +
                 (x.features || []).map(function (f) {
                   return '<li>' + icon('check') + '<span>' + esc(t(f)) + '</span></li>';
                 }).join('') +
               '</ul>' +
               '<a class="btn ' + (x.popular ? 'btn--primary' : '') + '" data-wa href="#">' +
                 s('pkg.cta') + '</a>' +
             '</article>';
    }).join('');
  };

  R.faq = function (el) {
    var list = DATA.faq || [];
    if (!list.length) { hideSection(el); return; }
    el.innerHTML = list.map(function (x, i) {
      return '<details class="faq__item" data-reveal style="--d:' + (i * 60) + 'ms">' +
               '<summary class="faq__q"><span>' + esc(t(x.q)) + '</span><i></i></summary>' +
               '<div class="faq__a">' + esc(t(x.a)) + '</div>' +
             '</details>';
    }).join('');
  };

  function hideSection(el) {
    var sec = el.closest('.section') || el;
    sec.style.display = 'none';
    var id = sec.id;
    if (id) { var link = $('.nav__link[href="#' + id + '"]'); if (link) link.style.display = 'none'; }
  }

  /* ==========================================================================
     BINDINGS + LANGUAGE
     ========================================================================== */
  function applyBindings() {
    $$('[data-bind]').forEach(function (el) {
      el.textContent = t(get(el.dataset.bind));
    });
    $$('[data-i18n]').forEach(function (el) {
      el.innerHTML = s(el.dataset.i18n);
    });
    $$('[data-wa]').forEach(function (el) {
      el.setAttribute('href', waLink());
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
    });

    var av = $('[data-avail]');
    if (av) av.style.display = (DATA.profile && DATA.profile.available) ? '' : 'none';

    applySEO();

    var y = $('#year'); if (y) y.textContent = new Date().getFullYear();
  }

  /* ==========================================================================
     SEO — meta tags + structured data, both driven by data.js
     ========================================================================== */
  function siteURL() {
    var u = (DATA.seo || {}).url;
    if (u) return String(u).replace(/\/+$/, '');
    /* no domain set yet — use wherever the page is actually served from */
    return location.origin + location.pathname.replace(/\/index\.html$/, '/');
  }

  function absURL(path) {
    if (!path) return '';
    if (/^https?:\/\//i.test(path)) return path;
    return siteURL().replace(/\/$/, '') + '/' + String(path).replace(/^\//, '');
  }

  function meta(sel, val) {
    if (!val) return;
    var el = $(sel);
    if (el) el.setAttribute('content', val);
  }

  function applySEO() {
    var seo = DATA.seo || {};
    var ar = lang === 'ar';

    var title = (ar && seo.titleAr) ? seo.titleAr : seo.title;
    var desc  = (ar && seo.descriptionAr) ? seo.descriptionAr : seo.description;
    var img   = absURL(seo.ogImage || 'assets/img/og.png');
    var url   = siteURL();

    if (title) document.title = title;
    meta('meta[name="description"]', desc);
    meta('meta[name="keywords"]', seo.keywords);
    meta('meta[property="og:title"]', title);
    meta('meta[property="og:description"]', desc);
    meta('meta[property="og:image"]', img);
    meta('meta[property="og:url"]', url);
    meta('meta[property="og:locale"]', ar ? 'ar_EG' : 'en_US');
    meta('meta[property="og:locale:alternate"]', ar ? 'en_US' : 'ar_EG');
    meta('meta[name="twitter:title"]', title);
    meta('meta[name="twitter:description"]', desc);
    meta('meta[name="twitter:image"]', img);

    var can = $('#canonical');
    /* trailing slash: siteURL() strips it, but the sitemap lists the root WITH
       one. A canonical that disagrees with the sitemap (and redirects) is a
       needless SEO wobble, so put it back for the home page. */
    if (can) can.setAttribute('href', url + '/');

    injectSchema(url, img, desc);
  }

  /* Structured data. The FAQ block is the valuable one — Google can show
     your answers as an expandable list directly in the results page. */
  function injectSchema(url, img, desc) {
    var p = DATA.profile || {};
    var c = DATA.contact || {};
    var b = (DATA.seo || {}).business || {};

    var sameAs = (DATA.socials || [])
      .map(function (x) { return x.url; })
      .filter(function (u) { return u && /^https?:\/\//i.test(u) && !/\/$/.test(new URL(u).pathname); });

    var person = {
      '@type': 'Person',
      '@id': url + '#person',
      name: t(p.name),
      jobTitle: t(p.role),
      description: t(p.bio),
      image: absURL(p.photo || p.avatar),
      url: url,
      telephone: '+' + String(c.whatsapp || '').replace(/\D/g, ''),
      address: { '@type': 'PostalAddress', addressLocality: b.city, addressRegion: b.region, addressCountry: b.country },
      knowsLanguage: ['en', 'ar']
    };
    if (sameAs.length) person.sameAs = sameAs;

    var offers = (DATA.packages || []).map(function (pk) {
      return {
        '@type': 'Offer',
        name: t(pk.name),
        price: String(t(pk.price)).replace(/[^0-9.]/g, '') || undefined,
        priceCurrency: 'USD',
        description: (pk.features || []).map(function (f) { return t(f); }).join(', ')
      };
    });

    var business = {
      '@type': 'ProfessionalService',
      '@id': url + '#business',
      name: t(p.name) + ' — ' + t(p.role),
      description: desc,
      image: img,
      url: url,
      telephone: person.telephone,
      priceRange: b.priceRange || '$$',
      foundingDate: b.founded,
      address: person.address,
      areaServed: (b.areaServed || []).map(function (a) { return { '@type': 'Country', name: a }; }),
      founder: { '@id': url + '#person' },
      makesOffer: offers,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Video editing services',
        itemListElement: (DATA.services || []).map(function (s2) {
          return { '@type': 'Offer', itemOffered: { '@type': 'Service', name: t(s2.title), description: t(s2.desc) } };
        })
      }
    };

    var graph = [
      { '@type': 'WebSite', '@id': url + '#site', url: url, name: t(p.name),
        inLanguage: lang === 'ar' ? 'ar-EG' : 'en', publisher: { '@id': url + '#person' } },
      person,
      business
    ];

    var faq = (DATA.faq || []);
    if (faq.length) {
      graph.push({
        '@type': 'FAQPage',
        '@id': url + '#faq',
        mainEntity: faq.map(function (q) {
          return {
            '@type': 'Question',
            name: t(q.q),
            acceptedAnswer: { '@type': 'Answer', text: t(q.a) }
          };
        })
      });
    }

    var node = $('#schema');
    if (!node) {
      node = document.createElement('script');
      node.type = 'application/ld+json';
      node.id = 'schema';
      document.head.appendChild(node);
    }
    node.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  }

  function renderAll() {
    $$('[data-render]').forEach(function (el) {
      var fn = R[el.dataset.render];
      if (fn) fn(el);
    });
    applyBindings();
    fixHeroCTA();
    observeReveals();
  }

  /* The hero's second button points at the before/after section, but that
     section hides itself when there are no raw+graded pairs - so the button
     would scroll nowhere. Send it to the work grid and relabel it. Swapping
     the data-i18n key (not just the text) keeps it right after a language
     switch, because applyBindings re-reads the key. */
  function fixHeroCTA() {
    var a = $('.hero a[href="#showcase"]');
    if (!a) return;
    var sec = $('#showcase');
    if (sec && getComputedStyle(sec).display !== 'none') return;
    a.setAttribute('href', '#work');
    var label = $('[data-i18n]', a);
    if (label) {
      label.setAttribute('data-i18n', 'hero.cta2alt');
      label.textContent = s('hero.cta2alt');
    }
  }

  function setLang(next) {
    lang = next;
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'ar' ? 'rtl' : 'ltr';
    document.body.dir = next === 'ar' ? 'rtl' : 'ltr';
    try { localStorage.setItem('mm_lang', next); } catch (e) {}
    $$('.lang-toggle button').forEach(function (b) {
      b.classList.toggle('is-on', b.dataset.lang === next);
    });
    if (compareObserver) { compareObserver.disconnect(); compareObserver = null; }
    renderAll();
  }

  /* ==========================================================================
     ANIMATION + CHROME
     ========================================================================== */
  var revealObserver;
  function observeReveals() {
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          en.target.classList.add('is-in');
          revealObserver.unobserve(en.target);
          var num = en.target.matches('[data-count]') ? en.target : $('[data-count]', en.target);
          if (num) countUp(num);
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    }
    $$('[data-reveal]:not(.is-in)').forEach(function (el) { revealObserver.observe(el); });
  }

  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    var target = Number(el.dataset.count) || 0;
    var suffix = el.dataset.suffix || '';
    if (reduced) { el.textContent = target + suffix; return; }
    var start = performance.now(), dur = 1500;
    (function tick(now) {
      var p = Math.min((now - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    })(start);
  }

  function chrome() {
    var nav = $('#nav'), progress = $('#progress'), fab = $('#fab');

    var contactSec = $('#contact');

    function onScroll() {
      var y = scrollY;
      nav.classList.toggle('is-stuck', y > 40);
      /* Hide the floating button once the contact section is on screen — it
         would otherwise sit on top of the form's own send button, and it is
         redundant when the real call to action is already visible. */
      if (fab) {
        var atContact = contactSec &&
          contactSec.getBoundingClientRect().top < innerHeight * 0.85;
        fab.classList.toggle('is-in', y > 600 && !atContact);
      }
      var h = document.documentElement.scrollHeight - innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + '%';

      var current = '';
      $$('main section[id]').forEach(function (sec) {
        if (sec.getBoundingClientRect().top <= 140) current = sec.id;
      });
      $$('.nav__link').forEach(function (l) {
        l.classList.toggle('is-active', l.getAttribute('href') === '#' + current);
      });
    }
    addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    /* burger */
    var burger = $('#burger'), links = $('#navLinks');
    burger.addEventListener('click', function () {
      var open = links.classList.toggle('is-open');
      burger.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
    });
    links.addEventListener('click', function (e) {
      if (e.target.closest('.nav__link')) {
        links.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });

    /* language */
    $$('.lang-toggle button').forEach(function (b) {
      b.addEventListener('click', function () { setLang(b.dataset.lang); });
    });

    /* cursor */
    var cur = $('#cursor'), curLabel = $('#cursorLabel');
    if (cur && matchMedia('(hover:hover) and (pointer:fine)').matches && !reduced) {
      var cx = 0, cy = 0, tx = 0, ty = 0;
      addEventListener('mousemove', function (e) {
        tx = e.clientX; ty = e.clientY;
        cur.classList.add('is-active');
      }, { passive: true });
      (function loop() {
        cx += (tx - cx) * 0.18; cy += (ty - cy) * 0.18;
        cur.style.transform = 'translate(' + cx + 'px,' + cy + 'px) translate(-50%,-50%)';
        requestAnimationFrame(loop);
      })();
      document.addEventListener('mouseover', function (e) {
        var hot = e.target.closest('a,button,[data-cursor],.compare');
        cur.classList.toggle('is-hover', !!hot);
        curLabel.textContent = hot && hot.dataset.cursor ? hot.dataset.cursor : '';
      });
    }

    /* magnetic buttons */
    if (!reduced && matchMedia('(hover:hover)').matches) {
      $$('.btn').forEach(function (b) {
        b.addEventListener('mousemove', function (e) {
          var r = b.getBoundingClientRect();
          b.style.transform = 'translate(' + (e.clientX - r.left - r.width / 2) * 0.16 + 'px,' +
                              ((e.clientY - r.top - r.height / 2) * 0.22 - 2) + 'px)';
        });
        b.addEventListener('mouseleave', function () { b.style.transform = ''; });
      });
    }
  }

  /* ---------- lightbox ---------- */
  function lightbox() {
    var lb = $('#lightbox'), inner = $('#lbInner'), close = $('#lbClose');

    function embedURL(src) {
      if (!isEmbedURL(src)) return null;
      var yt = src.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([A-Za-z0-9_-]{6,})/);
      if (yt) return 'https://www.youtube-nocookie.com/embed/' + yt[1] + '?autoplay=1&rel=0';
      var vm = src.match(/vimeo\.com\/(?:video\/)?(\d+)/);
      if (vm) return 'https://player.vimeo.com/video/' + vm[1] + '?autoplay=1';
      return null;
    }

    var lastFocus = null;

    function open(src, ratio, opener) {
      if (!src) return;
      lastFocus = opener || document.activeElement;
      var embed = embedURL(src);
      inner.classList.toggle('is-vertical', ratio === '9/16');
      inner.innerHTML = embed
        ? '<iframe src="' + esc(embed) + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>'
        : '<video src="' + esc(src) + '" controls autoplay playsinline></video>';

      /* The click IS a user gesture, so sound-on autoplay usually works — but
         some browsers still refuse it. Falling back to muted keeps the video
         playing instead of showing a dead frame; the flag tells them why. */
      var vid = $('video', inner);
      if (vid) {
        var p = vid.play();
        if (p) p.catch(function () {
          vid.muted = true;
          vid.play().catch(function () {});
          inner.setAttribute('data-muted-hint', s('lb.muted'));
          inner.classList.add('is-muted');
        });
        vid.addEventListener('volumechange', function () {
          if (!vid.muted) inner.classList.remove('is-muted');
        });
      }
      lb.classList.add('is-open');
      document.body.style.overflow = 'hidden';
      /* the dialog is still visibility:hidden this frame, and hidden elements
         cannot take focus — wait one frame or the keyboard stays outside. */
      requestAnimationFrame(function () { close.focus(); });
    }

    function shut() {
      if (!lb.classList.contains('is-open')) return;
      lb.classList.remove('is-open');
      inner.classList.remove('is-muted');
      document.body.style.overflow = '';
      setTimeout(function () { inner.innerHTML = ''; }, 400);
      /* send the keyboard back where it came from, not to the top of the page */
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      lastFocus = null;
    }

    document.addEventListener('click', function (e) {
      var btn = e.target.closest('[data-play]');
      if (btn) { open(btn.dataset.play, btn.dataset.ratio, btn); return; }
      if (e.target === lb) shut();
    });
    close.addEventListener('click', shut);

    addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') { shut(); return; }
      /* keep Tab inside the dialog while it is open */
      if (e.key !== 'Tab') return;
      var focusables = $$('button, [href], video, iframe, input, select, textarea', lb)
        .filter(function (n) { return n.offsetParent !== null || n === close; });
      if (!focusables.length) return;
      var first = focusables[0], last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
  }

  /* ---------- preloader ---------- */
  function preload() {
    var pre = $('#preloader'), bar = $('#preBar'), pct = $('#prePct');
    var n = 0;
    var timer = setInterval(function () {
      n = Math.min(n + Math.random() * 18, 100);
      bar.style.width = n + '%';
      pct.textContent = Math.round(n) + '%';
      if (n >= 100) {
        clearInterval(timer);
        setTimeout(function () { pre.classList.add('is-done'); }, 260);
      }
    }, 110);
    /* never trap the visitor if something stalls */
    setTimeout(function () { clearInterval(timer); pre.classList.add('is-done'); }, 4000);
  }

  /* ==========================================================================
     BOOT
     ========================================================================== */
  function init() {
    DATA = loadData();
    var saved;
    try { saved = localStorage.getItem('mm_lang'); } catch (e) {}
    lang = saved || (DATA.meta && DATA.meta.defaultLang) || 'en';

    setLang(lang);
    chrome();
    lightbox();
    preload();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else { init(); }

  /* Let admin.html push live updates into an open preview tab. */
  addEventListener('storage', function (e) {
    if (e.key === 'mm_portfolio_data') { DATA = loadData(); renderAll(); }
  });
})();
