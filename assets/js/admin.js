/* ============================================================================
   admin.js — the no-code control panel
   Edits live in your browser instantly, then you export a fresh data.js.
   ========================================================================== */
(function () {
  'use strict';

  var KEY = 'mm_portfolio_data';
  var DATA;

  /* ---------- boot data ---------- */
  try {
    var saved = localStorage.getItem(KEY);
    DATA = saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(window.PORTFOLIO_DATA || {}));
  } catch (e) {
    DATA = JSON.parse(JSON.stringify(window.PORTFOLIO_DATA || {}));
  }

  /* ---------- tiny dom helpers ---------- */
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html !== undefined) n.innerHTML = html;
    return n;
  }
  function $(s) { return document.querySelector(s); }

  var SVG = {
    up:   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M19 12l-7 7-7-7"/></svg>',
    del:  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    x:    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9.5"/><path d="M12 11v5M12 7.5v.01" stroke-linecap="round"/></svg>'
  };

  /* ==========================================================================
     SCHEMA — describes every editable section.
     Add a field here and it appears in the panel automatically.
     ========================================================================== */
  var ICON_OPTS = ['instagram','tiktok','youtube','behance','linkedin','facebook','x','vimeo','whatsapp','email','link'];
  var SVC_ICONS = ['reel','play','film','heart','spark','mic','wand','clock'];

  var SCHEMA = [
    {
      key: 'profile', label: 'About you', type: 'object',
      hint: 'Your name, title and the two big lines on the homepage.',
      fields: [
        { key: 'name',      label: 'Full name',            type: 'i18n' },
        { key: 'role',      label: 'Job title',            type: 'i18n' },
        { key: 'heroLine1', label: 'Big headline — line 1', type: 'i18n' },
        { key: 'heroLine2', label: 'Big headline — line 2 (coloured)', type: 'i18n' },
        { key: 'tagline',   label: 'One-line pitch',       type: 'i18n-area' },
        { key: 'bio',       label: 'Short bio (footer)',   type: 'i18n-area' },
        { key: 'location',  label: 'Location',             type: 'i18n' },
        { key: 'photo',     label: 'Your photo (About section)', type: 'media', folder: 'assets/img',
          hint: 'A real photo of your face. Square or portrait, about 800px.' },
        { key: 'available', label: 'Show the green "available" badge', type: 'bool' },
        { key: 'availableText', label: 'Badge text',       type: 'i18n' }
      ]
    },
    {
      key: 'contact', label: 'Contact', type: 'object',
      hint: 'The WhatsApp number powers every button on the site. Digits only, with country code, no + and no spaces.',
      fields: [
        { key: 'whatsapp',        label: 'WhatsApp number', type: 'text',
          hint: 'Example: 201280407731  (20 = Egypt, then your number without the leading 0)' },
        { key: 'phoneDisplay',    label: 'Number as shown on screen', type: 'text' },
        { key: 'whatsappMessage', label: 'Message pre-typed for the client', type: 'i18n-area' },
        { key: 'email',           label: 'Email (leave empty to hide)', type: 'text' },
        { key: 'responseTime',    label: 'Reply-speed line', type: 'i18n' }
      ]
    },
    {
      key: 'socials', label: 'Social links', type: 'list', titleFrom: 'label',
      hint: 'Each one becomes an icon button. Delete any you do not use.',
      newItem: { label: 'Instagram', icon: 'instagram', url: 'https://instagram.com/' },
      fields: [
        { key: 'label', label: 'Name',    type: 'text' },
        { key: 'icon',  label: 'Icon',    type: 'select', options: ICON_OPTS },
        { key: 'url',   label: 'Full link', type: 'text', hint: 'Must start with https://' }
      ]
    },
    {
      key: 'stats', label: 'Numbers', type: 'list', titleFrom: 'value',
      hint: 'The counting numbers under the homepage. Keep them honest.',
      newItem: { value: 100, suffix: '+', label: { en: 'Projects', ar: 'مشروع' } },
      fields: [
        { key: 'value',  label: 'Number',  type: 'number' },
        { key: 'suffix', label: 'Suffix',  type: 'text', hint: 'e.g. +  or  M+  or  yrs' },
        { key: 'label',  label: 'Caption', type: 'i18n' }
      ]
    },
    {
      key: 'clients', label: 'Client names', type: 'chips',
      hint: 'Scrolling strip of names. Press Enter to add.'
    },
    {
      key: 'showreel', label: 'Showreel', type: 'object',
      hint: 'Your single most important video. Clear the file field to hide this section.',
      note: 'Keep it under 90 seconds and put your best 3 shots in the first 10.',
      fields: [
        { key: 'src',      label: 'Video file or YouTube/Vimeo link', type: 'media', folder: 'videos' },
        { key: 'poster',   label: 'Thumbnail image', type: 'media', folder: 'assets/img' },
        { key: 'title',    label: 'Heading',  type: 'i18n' },
        { key: 'sub',      label: 'Sub-line', type: 'i18n-area' },
        { key: 'duration', label: 'Length shown on the thumbnail', type: 'text', hint: 'e.g. 1:30' }
      ]
    },
    {
      key: 'about', label: 'About you', type: 'object',
      hint: 'Your photo and your story. Clients hire people — use a real photo of your face here, not the logo.',
      fields: [
        { key: 'show',       label: 'Show this section', type: 'bool' },
        { key: 'heading',    label: 'Heading', type: 'i18n' },
        { key: 'body',       label: 'Your story', type: 'i18n-area',
          hint: 'Leave a blank line between paragraphs.' },
        { key: 'highlights', label: 'Quick credibility points', type: 'list-i18n' }
      ]
    },
    {
      key: 'leadForm', label: 'Enquiry form', type: 'object',
      hint: 'The form does not email anyone. It builds a tidy WhatsApp message so a stranger’s first message already tells you the project type, budget and deadline.',
      fields: [
        { key: 'show',      label: 'Show the form', type: 'bool' },
        { key: 'title',     label: 'Form heading',  type: 'i18n' },
        { key: 'sub',       label: 'Form sub-line', type: 'i18n-area' },
        { key: 'budgets',   label: 'Budget options',   type: 'list-i18n' },
        { key: 'timelines', label: 'Deadline options', type: 'list-i18n' }
      ]
    },
    {
      key: 'categories', label: 'Filter buttons', type: 'list', titleFrom: 'id',
      hint: 'These are the filter pills. Keep "all" first. The id must match the category you pick on each project.',
      newItem: { id: 'newcat', label: { en: 'New', ar: 'جديد' } },
      fields: [
        { key: 'id',    label: 'ID (lowercase, no spaces)', type: 'text' },
        { key: 'label', label: 'Button text', type: 'i18n' }
      ]
    },
    {
      key: 'beforeAfter', label: 'Before / After', type: 'list', titleFrom: 'title',
      hint: 'The main feature. Each needs TWO short clips of the same shot — the raw one and your edited one. Put both files in the videos folder first.',
      note: 'Export both clips the same length, 5-10 seconds, H.264 MP4, 1920x1080, about 2-5 MB each, no audio.',
      newItem: {
        id: 'ba' + Date.now(), type: 'video', category: 'commercial',
        title: { en: 'New comparison', ar: 'مقارنة جديدة' }, note: { en: '', ar: '' },
        before: '', after: '', poster: 'assets/img/poster-1.svg', vertical: false
      },
      fields: [
        { key: 'title',    label: 'Project title', type: 'i18n' },
        { key: 'category', label: 'Category',      type: 'select', options: 'categories' },
        { key: 'note',     label: 'What you did to it', type: 'i18n-area' },
        { key: 'before',   label: 'BEFORE file (raw)',   type: 'media', folder: 'videos' },
        { key: 'after',    label: 'AFTER file (edited)', type: 'media', folder: 'videos' },
        { key: 'poster',   label: 'Thumbnail image',     type: 'media', folder: 'assets/img' },
        { key: 'vertical', label: 'Vertical / 9:16 clip', type: 'bool' },
        { key: 'type',     label: 'Media type', type: 'select', options: ['video', 'image'] }
      ]
    },
    {
      key: 'work', label: 'Projects', type: 'list', titleFrom: 'title',
      hint: 'The grid of finished work. A file in videos/web/, or paste a YouTube or Vimeo link.',
      newItem: {
        id: 'w' + Date.now(), title: { en: 'New project', ar: 'مشروع جديد' },
        category: 'shortform', ratio: '9/16', src: '', poster: '', duration: '', tags: []
      },
      fields: [
        { key: 'title',    label: 'Title',    type: 'i18n' },
        { key: 'category', label: 'Category', type: 'select', options: 'categories' },
        { key: 'ratio',    label: 'Shape',    type: 'select', options: ['9/16', '16/9', '1/1', '4/5'] },
        { key: 'src',      label: 'Video file or link', type: 'media', folder: 'videos/web' },
        { key: 'poster',   label: 'Thumbnail image',    type: 'media', folder: 'assets/img' },
        { key: 'duration', label: 'Length (e.g. 0:19)',  type: 'text' },
        { key: 'tags',     label: 'Small tags',         type: 'chips' }
      ]
    },
    {
      key: 'services', label: 'Services', type: 'list', titleFrom: 'title',
      hint: 'What you sell.',
      newItem: { icon: 'spark', title: { en: 'New service', ar: 'خدمة جديدة' },
                 desc: { en: '', ar: '' }, points: [] },
      fields: [
        { key: 'icon',   label: 'Icon',        type: 'select', options: SVC_ICONS },
        { key: 'title',  label: 'Title',       type: 'i18n' },
        { key: 'desc',   label: 'Description', type: 'i18n-area' },
        { key: 'points', label: 'Bullet points', type: 'list-i18n' }
      ]
    },
    {
      key: 'process', label: 'How you work', type: 'list', titleFrom: 'title',
      hint: 'The numbered steps. Numbers are added automatically.',
      newItem: { title: { en: 'New step', ar: 'خطوة جديدة' }, desc: { en: '', ar: '' } },
      fields: [
        { key: 'title', label: 'Step name',   type: 'i18n' },
        { key: 'desc',  label: 'Explanation', type: 'i18n-area' }
      ]
    },
    {
      key: 'tools', label: 'Software you use', type: 'chips',
      hint: 'Second scrolling strip. Press Enter to add.'
    },
    {
      key: 'testimonials', label: 'Client reviews', type: 'list', titleFrom: 'name',
      hint: 'Only use real ones. Fake reviews are the fastest way to lose a client who checks.',
      newItem: { name: 'Client name', role: { en: '', ar: '' }, rating: 5, text: { en: '', ar: '' } },
      fields: [
        { key: 'name',   label: 'Client name', type: 'text' },
        { key: 'role',   label: 'Their role / company', type: 'i18n' },
        { key: 'rating', label: 'Stars (1-5)', type: 'number' },
        { key: 'text',   label: 'What they said', type: 'i18n-area' }
      ]
    },
    {
      key: 'packages', label: 'Pricing', type: 'list', titleFrom: 'name',
      hint: 'Delete every package to hide the pricing section completely.',
      newItem: { name: { en: 'New package', ar: 'باقة جديدة' }, price: { en: '$0', ar: '$0' },
                 period: { en: 'per video', ar: 'للفيديو' }, popular: false, features: [] },
      fields: [
        { key: 'name',     label: 'Package name', type: 'i18n' },
        { key: 'price',    label: 'Price',        type: 'i18n' },
        { key: 'period',   label: 'Per what',     type: 'i18n' },
        { key: 'popular',  label: 'Highlight this one as "Most popular"', type: 'bool' },
        { key: 'features', label: 'What is included', type: 'list-i18n' }
      ]
    },
    {
      key: 'faq', label: 'FAQ', type: 'list', titleFrom: 'q',
      hint: 'Answer the questions clients actually ask you on WhatsApp.',
      newItem: { q: { en: 'New question?', ar: 'سؤال جديد؟' }, a: { en: '', ar: '' } },
      fields: [
        { key: 'q', label: 'Question', type: 'i18n' },
        { key: 'a', label: 'Answer',   type: 'i18n-area' }
      ]
    },
    {
      key: 'beforeAfterIntro', label: 'Before/After intro line', type: 'i18n-root',
      hint: 'The sentence under the "Before & after" heading.'
    },
    {
      key: 'cta', label: 'Final call to action', type: 'object',
      hint: 'The big box at the bottom of the page.',
      fields: [
        { key: 'title',  label: 'Headline',    type: 'i18n' },
        { key: 'sub',    label: 'Sub-line',    type: 'i18n-area' },
        { key: 'button', label: 'Button text', type: 'i18n' }
      ]
    },
    {
      key: 'seo', label: 'Google / sharing', type: 'object',
      hint: 'What shows up in Google results and when someone shares your link.',
      fields: [
        { key: 'title',       label: 'Page title',  type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'keywords',    label: 'Keywords',    type: 'text' }
      ]
    }
  ];

  /* ==========================================================================
     FIELD BUILDERS — each returns a DOM node bound to obj[def.key]
     ========================================================================== */
  function norm18n(v) {
    if (v && typeof v === 'object') return { en: v.en || '', ar: v.ar || '' };
    return { en: v === undefined || v === null ? '' : String(v), ar: '' };
  }

  function buildI18n(obj, def, area) {
    var val = norm18n(obj[def.key]);
    obj[def.key] = val;
    var box = el('div', 'i18n');

    [['EN', 'en', ''], ['ع', 'ar', ' i18n__row--ar']].forEach(function (row) {
      var r = el('div', 'i18n__row' + row[2]);
      r.appendChild(el('span', 'i18n__tag', row[0]));
      var input = el(area ? 'textarea' : 'input');
      if (!area) input.type = 'text';
      input.value = val[row[1]] || '';
      input.addEventListener('input', function () { val[row[1]] = input.value; save(); });
      r.appendChild(input);
      box.appendChild(r);
    });
    return box;
  }

  function buildChips(obj, def) {
    if (!Array.isArray(obj[def.key])) obj[def.key] = [];
    var arr = obj[def.key];
    var wrap = el('div');
    var list = el('div', 'chips');

    function paint() {
      list.innerHTML = '';
      arr.forEach(function (item, i) {
        var c = el('span', 'chip');
        c.appendChild(document.createTextNode(item));
        var x = el('button', '', SVG.x);
        x.type = 'button';
        x.setAttribute('aria-label', 'Remove ' + item);
        x.addEventListener('click', function () { arr.splice(i, 1); paint(); save(); });
        c.appendChild(x);
        list.appendChild(c);
      });
      if (!arr.length) list.appendChild(el('span', '', '<small style="color:var(--muted-dim)">Nothing yet</small>'));
    }
    paint();

    var add = el('div', 'chip-add');
    var input = el('input'); input.type = 'text'; input.placeholder = 'Type and press Enter';
    var btn = el('button', 'btn btn--sm', 'Add'); btn.type = 'button';
    function push() {
      var v = input.value.trim();
      if (!v) return;
      arr.push(v); input.value = ''; paint(); save();
    }
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); push(); }
    });
    btn.addEventListener('click', push);
    add.appendChild(input); add.appendChild(btn);

    wrap.appendChild(list); wrap.appendChild(add);
    return wrap;
  }

  /* array of {en,ar} — service bullet points, package features */
  function buildI18nList(obj, def) {
    if (!Array.isArray(obj[def.key])) obj[def.key] = [];
    var arr = obj[def.key];
    var wrap = el('div', 'grid');

    function paint() {
      wrap.innerHTML = '';
      arr.forEach(function (item, i) {
        arr[i] = norm18n(item);
        var row = el('div', 'card');
        row.style.padding = '.85rem';
        row.style.marginBottom = '0';
        var bar = el('div', 'card__bar');
        bar.style.marginBottom = '.75rem';
        bar.style.paddingBottom = '.6rem';
        bar.appendChild(el('b', '', 'Item ' + (i + 1)));
        bar.appendChild(mkIconBtn(SVG.up, 'Move up', function () { move(arr, i, -1); paint(); save(); }));
        bar.appendChild(mkIconBtn(SVG.down, 'Move down', function () { move(arr, i, 1); paint(); save(); }));
        bar.appendChild(mkIconBtn(SVG.del, 'Delete', function () { arr.splice(i, 1); paint(); save(); }, 'iconbtn--del'));
        row.appendChild(bar);
        row.appendChild(buildI18n(arr, { key: i }, false));
        wrap.appendChild(row);
      });
      var add = el('button', 'addbtn', SVG.plus + ' Add item');
      add.type = 'button';
      add.addEventListener('click', function () { arr.push({ en: '', ar: '' }); paint(); save(); });
      wrap.appendChild(add);
    }
    paint();
    return wrap;
  }

  function buildMedia(obj, def) {
    var wrap = el('div', 'media');
    var input = el('input'); input.type = 'text';
    input.value = obj[def.key] || '';
    input.placeholder = def.folder + '/your-file';
    input.addEventListener('input', function () { obj[def.key] = input.value; save(); });

    var picker = el('input'); picker.type = 'file'; picker.hidden = true;
    picker.accept = def.folder === 'videos' ? 'video/*,image/*' : 'image/*';
    var btn = el('button', 'btn btn--sm', 'Browse'); btn.type = 'button';

    btn.addEventListener('click', function () { picker.click(); });
    picker.addEventListener('change', function () {
      var f = picker.files && picker.files[0];
      if (!f) return;
      /* We only take the file NAME — the browser cannot copy the file for us.
         You still drop the actual file into the folder yourself. */
      input.value = def.folder + '/' + f.name;
      obj[def.key] = input.value;
      save();
      toast('Path set. Now copy ' + f.name + ' into your ' + def.folder + ' folder.');
    });

    wrap.appendChild(input); wrap.appendChild(btn); wrap.appendChild(picker);
    return wrap;
  }

  function buildField(obj, def) {
    var f = el('div', 'f');
    var lab = el('label', '', def.label);
    f.appendChild(lab);

    var node;
    switch (def.type) {
      case 'i18n':      node = buildI18n(obj, def, false); break;
      case 'i18n-area': node = buildI18n(obj, def, true);  break;
      case 'chips':     node = buildChips(obj, def);       break;
      case 'list-i18n': node = buildI18nList(obj, def);    break;
      case 'media':     node = buildMedia(obj, def);       break;

      case 'bool':
        node = el('label', 'switch');
        var cb = el('input'); cb.type = 'checkbox'; cb.checked = !!obj[def.key];
        cb.addEventListener('change', function () { obj[def.key] = cb.checked; save(); });
        node.appendChild(cb); node.appendChild(el('i'));
        node.appendChild(el('span', '', obj[def.key] ? 'On' : 'Off'));
        cb.addEventListener('change', function () {
          node.lastChild.textContent = cb.checked ? 'On' : 'Off';
        });
        f.removeChild(lab); f.appendChild(el('label', '', def.label)); f.appendChild(node);
        if (def.hint) f.appendChild(el('small', '', def.hint));
        return f;

      case 'select':
        node = el('select');
        var opts = def.options === 'categories'
          ? (DATA.categories || []).map(function (c) { return c.id; })
          : def.options;
        opts.forEach(function (o) {
          var op = el('option'); op.value = o; op.textContent = o;
          if (obj[def.key] === o) op.selected = true;
          node.appendChild(op);
        });
        node.addEventListener('change', function () { obj[def.key] = node.value; save(); });
        break;

      case 'number':
        node = el('input'); node.type = 'number';
        node.value = obj[def.key] === undefined ? '' : obj[def.key];
        node.addEventListener('input', function () { obj[def.key] = Number(node.value) || 0; save(); });
        break;

      case 'textarea':
        node = el('textarea'); node.value = obj[def.key] || '';
        node.addEventListener('input', function () { obj[def.key] = node.value; save(); });
        break;

      default:
        node = el('input'); node.type = 'text'; node.value = obj[def.key] || '';
        node.addEventListener('input', function () { obj[def.key] = node.value; save(); });
    }

    f.appendChild(node);
    if (def.hint) f.appendChild(el('small', '', def.hint));
    return f;
  }

  function mkIconBtn(svg, title, fn, extra) {
    var b = el('button', 'iconbtn ' + (extra || ''), svg);
    b.type = 'button'; b.title = title; b.setAttribute('aria-label', title);
    b.addEventListener('click', fn);
    return b;
  }

  function move(arr, i, dir) {
    var j = i + dir;
    if (j < 0 || j >= arr.length) return;
    var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
  }

  function titleOf(item, key) {
    var v = item[key];
    if (v && typeof v === 'object') return v.en || v.ar || '(untitled)';
    return v !== undefined && v !== '' ? String(v) : '(untitled)';
  }

  /* ==========================================================================
     PANEL RENDERING
     ========================================================================== */
  function renderPanel(sec) {
    var panel = el('section', 'panel');
    panel.id = 'p-' + sec.key;

    var head = el('div', 'panel__head');
    head.appendChild(el('h2', '', sec.label));
    panel.appendChild(head);
    if (sec.hint) panel.appendChild(el('p', 'panel__hint', sec.hint));
    if (sec.note) {
      panel.appendChild(el('div', 'note', SVG.info + '<span><b>Export settings:</b> ' + sec.note + '</span>'));
    }

    if (sec.type === 'object') {
      if (!DATA[sec.key] || typeof DATA[sec.key] !== 'object') DATA[sec.key] = {};
      var card = el('div', 'card');
      var grid = el('div', 'grid grid--2');
      sec.fields.forEach(function (d) { grid.appendChild(buildField(DATA[sec.key], d)); });
      card.appendChild(grid);
      panel.appendChild(card);

    } else if (sec.type === 'i18n-root') {
      var c2 = el('div', 'card');
      c2.appendChild(buildI18n(DATA, { key: sec.key }, true));
      panel.appendChild(c2);

    } else if (sec.type === 'chips') {
      var c3 = el('div', 'card');
      c3.appendChild(buildChips(DATA, { key: sec.key }));
      panel.appendChild(c3);

    } else if (sec.type === 'list') {
      if (!Array.isArray(DATA[sec.key])) DATA[sec.key] = [];
      var arr = DATA[sec.key];
      var host = el('div');

      function paint() {
        host.innerHTML = '';
        if (!arr.length) host.appendChild(el('div', 'empty', 'Nothing here yet — this section is hidden on the site.'));

        arr.forEach(function (item, i) {
          var card = el('div', 'card card--item');
          var bar = el('div', 'card__bar');
          var heading = el('b');
          /* textContent, not innerHTML — a title may legitimately contain < or & */
          heading.textContent = (i + 1) + '. ' + titleOf(item, sec.titleFrom);
          bar.appendChild(heading);
          bar.appendChild(mkIconBtn(SVG.up, 'Move up', function () { move(arr, i, -1); paint(); save(); }));
          bar.appendChild(mkIconBtn(SVG.down, 'Move down', function () { move(arr, i, 1); paint(); save(); }));
          bar.appendChild(mkIconBtn(SVG.del, 'Delete', function () {
            if (confirm('Delete "' + titleOf(item, sec.titleFrom) + '"?')) { arr.splice(i, 1); paint(); save(); }
          }, 'iconbtn--del'));
          card.appendChild(bar);

          var grid = el('div', 'grid grid--2');
          sec.fields.forEach(function (d) {
            var wide = d.type === 'i18n-area' || d.type === 'list-i18n' || d.type === 'chips';
            var f = buildField(item, d);
            if (wide) f.style.gridColumn = '1 / -1';
            grid.appendChild(f);
          });
          card.appendChild(grid);
          host.appendChild(card);
        });

        var add = el('button', 'addbtn', SVG.plus + ' Add ' + sec.label.toLowerCase().replace(/s$/, ''));
        add.type = 'button';
        add.addEventListener('click', function () {
          arr.push(JSON.parse(JSON.stringify(sec.newItem)));
          paint(); save(); rebuildSide();
        });
        host.appendChild(add);
      }
      paint();
      panel.appendChild(host);
    }

    return panel;
  }

  function rebuildSide() {
    var side = $('#side');
    side.innerHTML = '';
    SCHEMA.forEach(function (sec) {
      var a = el('a');
      a.href = '#p-' + sec.key;
      a.appendChild(document.createTextNode(sec.label));
      if (sec.type === 'list' || sec.type === 'chips') {
        var n = (DATA[sec.key] || []).length;
        a.appendChild(el('span', 'n', String(n)));
      }
      side.appendChild(a);
    });
  }

  function renderAll() {
    var main = $('#main');
    main.innerHTML = '';
    main.appendChild(el('div', 'note', SVG.info +
      '<span><b>Everything saves automatically</b> as you type, and your open preview tab updates live. ' +
      'When you are happy, press <b>Download data.js</b> and replace the file at ' +
      '<code>assets/js/data.js</code> — that makes it permanent for visitors.</span>'));
    SCHEMA.forEach(function (sec) { main.appendChild(renderPanel(sec)); });
    rebuildSide();
  }

  /* ==========================================================================
     SAVE / EXPORT / IMPORT
     ========================================================================== */
  var saveTimer;
  function save() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(function () {
      try {
        localStorage.setItem(KEY, JSON.stringify(DATA));
        flashSaved();
      } catch (e) {
        toast('Could not save — browser storage is full.');
      }
    }, 250);
  }

  function flashSaved() {
    var s = $('#saved');
    s.classList.add('on');
    clearTimeout(s._t);
    s._t = setTimeout(function () { s.classList.remove('on'); }, 1600);
  }

  function toast(msg) {
    var t = $('#toast');
    $('#toastMsg').textContent = msg;
    t.classList.add('on');
    clearTimeout(t._t);
    t._t = setTimeout(function () { t.classList.remove('on'); }, 3200);
  }

  function download() {
    var header =
      '/* ============================================================================\n' +
      '   YOUR CONTENT FILE — generated by the control panel\n' +
      '   Replace assets/js/data.js with this file to publish your changes.\n' +
      '   Generated: ' + new Date().toISOString().slice(0, 10) + '\n' +
      '   ========================================================================== */\n\n';
    var body = 'window.PORTFOLIO_DATA = ' + JSON.stringify(DATA, null, 2) + ';\n';
    var blob = new Blob([header + body], { type: 'text/javascript;charset=utf-8' });
    var url = URL.createObjectURL(blob);
    var a = el('a');
    a.href = url; a.download = 'data.js';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    toast('Downloaded. Put it in assets/js/ replacing the old data.js');
  }

  function importFile(file) {
    var reader = new FileReader();
    reader.onload = function () {
      var src = String(reader.result);
      var obj = null;
      try {
        obj = JSON.parse(src);
      } catch (e) {
        try {
          /* A data.js file has comments, so it needs evaluating rather than parsing.
             This only ever runs on a file you picked yourself. */
          obj = new Function('window', src + '\nreturn window.PORTFOLIO_DATA;')({});
        } catch (e2) {
          toast('That file could not be read. Pick a data.js or .json backup.');
          return;
        }
      }
      if (!obj || typeof obj !== 'object') { toast('That file has no portfolio data in it.'); return; }
      DATA = obj;
      save(); renderAll();
      toast('Imported.');
    };
    reader.readAsText(file);
  }

  /* ---------- wire up ---------- */
  $('#downloadBtn').addEventListener('click', download);
  $('#importBtn').addEventListener('click', function () { $('#importFile').click(); });
  $('#importFile').addEventListener('change', function (e) {
    if (e.target.files[0]) importFile(e.target.files[0]);
    e.target.value = '';
  });
  $('#resetBtn').addEventListener('click', function () {
    if (!confirm('Throw away every change you made here and go back to the saved data.js file?')) return;
    localStorage.removeItem(KEY);
    location.reload();
  });

  /* highlight the section you are looking at */
  addEventListener('scroll', function () {
    var cur = '';
    SCHEMA.forEach(function (sec) {
      var p = document.getElementById('p-' + sec.key);
      if (p && p.getBoundingClientRect().top <= 120) cur = sec.key;
    });
    Array.prototype.forEach.call(document.querySelectorAll('.side a'), function (a) {
      a.classList.toggle('on', a.getAttribute('href') === '#p-' + cur);
    });
  }, { passive: true });

  renderAll();
})();
