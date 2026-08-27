/* ============================================================================
   YOUR CONTENT FILE  —  ملف المحتوى الخاص بك
   ----------------------------------------------------------------------------
   EN: This is the ONLY file you ever need to touch. Every piece of text,
       every link, every video on your website lives here.
       Easiest way to edit it: open admin.html in your browser instead.
   AR: ده الملف الوحيد اللي محتاج تعدّل فيه. كل الكلام والروابط والفيديوهات
       بتاعة موقعك موجودة هنا. أسهل طريقة للتعديل: افتح admin.html في المتصفح.

   RULES / قواعد مهمة:
   1. Text with {en: "...", ar: "..."} means English + Arabic versions.
   2. Never delete a comma  ,  or a quote  "
   3. To hide a whole section, empty its list:  services: []
   ========================================================================== */

window.PORTFOLIO_DATA = {

  /* ---------- 1. WHO YOU ARE / مين انت ---------- */
  profile: {
    name:  { en: "Mahmoud Mohamed",           ar: "محمود محمد" },
    short: { en: "Mahmoud",                   ar: "محمود" },
    role:  { en: "Video Editor & Colorist",   ar: "مونتير وكولورست" },

    tagline: {
      en: "I turn raw footage into stories that hold attention.",
      ar: "بحوّل اللقطات الخام لقصة تشد الانتباه من أول ثانية."
    },

    heroLine1: { en: "Raw footage in.",        ar: "لقطات خام تدخل." },
    heroLine2: { en: "Stories out.",           ar: "قصة تطلع." },

    bio: {
      en: "I'm Mahmoud — a video editor working with brands, creators and couples across Egypt and the Gulf. I care about one thing: the cut that makes someone stop scrolling. Pacing, sound design, and a colour grade that actually looks like it cost money.",
      ar: "أنا محمود — مونتير بشتغل مع البراندات وصنّاع المحتوى والأفراح في مصر والخليج. بيهمني حاجة واحدة: الكات اللي يخلي الناس تقف عن السكرول. الإيقاع، والساوند ديزاين، وكولور جريدنج شكله فعلاً غالي."
    },

    location:  { en: "Cairo, Egypt · Working worldwide", ar: "القاهرة، مصر · بشتغل مع العالم كله" },
    avatar:    "assets/img/avatar.svg",

    /* Your real photo. Clients hire people, not logos — put a face here.
       Drop a square JPG in assets/img/ and change this line.            */
    photo:     "assets/img/avatar.svg",

    available:     true,
    availableText: { en: "Available for new projects", ar: "متاح لمشاريع جديدة" }
  },

  /* ---------- 2. HOW CLIENTS REACH YOU / وسائل التواصل ---------- */
  contact: {
    /* Shown on the page */
    phoneDisplay: "+20 128 040 7731",
    /* Used for the WhatsApp link — digits only, country code, NO + and NO spaces */
    whatsapp:     "201280407731",
    /* Message that is pre-typed for the client when they open WhatsApp */
    whatsappMessage: {
      en: "Hi Mahmoud! I saw your portfolio and I'd like to talk about a video project.",
      ar: "أهلاً محمود! شفت الـ portfolio بتاعك وعايز أكلمك في مشروع فيديو."
    },
    /* Leave "" to hide the email button */
    email:     "",
    calendly:  "",
    responseTime: { en: "Usually replies within 1 hour", ar: "بيرد عادةً خلال ساعة" }
  },

  /* ---------- 3. SOCIAL LINKS / السوشيال ----------
     Delete a line to remove that icon. Add one to add an icon.
     icon can be: instagram, tiktok, youtube, behance, linkedin,
                  facebook, x, vimeo, whatsapp, email, link          */
  socials: [
    { label: "Instagram", icon: "instagram", url: "https://instagram.com/" },
    { label: "TikTok",    icon: "tiktok",    url: "https://tiktok.com/"    },
    { label: "YouTube",   icon: "youtube",   url: "https://youtube.com/"   },
    { label: "Behance",   icon: "behance",   url: "https://behance.net/"   },
    { label: "LinkedIn",  icon: "linkedin",  url: "https://linkedin.com/"  }
  ],

  /* ---------- 4. NUMBERS THAT BUILD TRUST / أرقام ---------- */
  stats: [
    /* TURNED OFF - the numbers that were here (320 videos, 65 clients, 18M
       views) were mine, not yours. Nothing invented should sit on a live site
       with your name on it. Put YOUR real numbers below, delete the // in
       front of the lines, and the strip comes back.
       الأرقام اللي كانت هنا مكنتش حقيقية. حط أرقامك الصح وشيل الـ //  */

    // { value: 40, suffix: "+",    label: { en: "Videos delivered", ar: "فيديو تم تسليمه" } },
    // { value: 12, suffix: "+",    label: { en: "Happy clients",    ar: "عميل سعيد" } },
    // { value: 2,  suffix: "M+",   label: { en: "Views generated",  ar: "مشاهدة" } },
    // { value: 3,  suffix: " yrs", label: { en: "Years editing",    ar: "سنين خبرة" } }
  ],

  clients: [
    /* EMPTY ON PURPOSE - the names here were invented companies.
       Add the REAL brands you have worked with, as plain text, e.g.
         "Crover", "Me & You Cafe"
       Whatever you put here scrolls across the page under the hero.
       Leave it empty and the strip stays hidden.
       حط أسماء البراندز اللي اشتغلت معاها فعلاً وبس. */
  ],

  showreel: {
    src:    "videos/web/youtube-longform.mp4",
    poster: "assets/img/poster-youtube.jpg",
    title:  { en: "Start with this one",  ar: "ابدأ بالفيديو ده" },
    sub:    { en: "A full YouTube episode, cut end to end. Sound on.",
              ar: "حلقة يوتيوب كاملة، مونتاج من الأول للآخر. شغّل الصوت." },
    duration: "0:16"
  },

  /* ---------- 6. BEFORE / AFTER  — قبل وبعد ----------------------------
     THE MAIN FEATURE. Each item shows two videos with a slider between them.

     HOW TO ADD YOUR OWN:
     1. Export two SHORT clips (5-10 seconds, looping) of the same shot:
        the raw one, and your graded/edited one.
     2. Compress both to about 2-5 MB. Recommended export:
        H.264 MP4 · 1920x1080 · 4-6 Mbps · 30fps · no audio
     3. Drop both files inside the  videos/  folder.
     4. Copy a block below and change the file names.

     type: "video"  -> uses .mp4 files
     type: "image"  -> uses .jpg/.png files (use this if you only have stills)
     ------------------------------------------------------------------------ */
  beforeAfterIntro: {
    en: "Drag the handle. Left is what the camera gave me. Right is what I gave back.",
    ar: "اسحب الخط. الشمال ده اللي الكاميرا طلعته. اليمين ده اللي أنا رجّعته."
  },

  beforeAfter: [
    /* EMPTY ON PURPOSE - فاضية عن قصد
       You gave me finished edits, not raw+graded pairs, so this whole section
       is hidden right now. To switch it on, export ONE shot twice:
         videos/web/ba1-before.mp4   <- straight out of camera, no grade
         videos/web/ba1-after.mp4    <- your finished version
       Same shot, same length, 5-10 seconds. Then delete the // in front of
       the block underneath and the section appears by itself.

       اديني نفس اللقطة مرتين: واحدة خام من الكاميرا وواحدة بعد المونتاج،
       وشيل الـ // من قدام البلوك اللي تحت والقسم هيظهر لوحده.               */

    // { id: "ba1", type: "video",
    //   title:    { en: "Coffee Brand - Product Ad", ar: "براند قهوة - إعلان منتج" },
    //   category: "commercial",
    //   note: { en: "Flat log footage lifted into a warm, contrasty grade.",
    //           ar: "فوتاج لوج باهت اتحوّل لجريد دافي." },
    //   before: "videos/web/ba1-before.mp4",
    //   after:  "videos/web/ba1-after.mp4",
    //   poster: "assets/img/poster-coffe.jpg" }
  ],

  /* ---------- 7. FILTER BUTTONS / أزرار الفلترة ----------
     The 'id' must match the 'category' used above and in work items.  */
  categories: [
    { id: "all",        label: { en: "All",         ar: "الكل" } },
    { id: "shortform",  label: { en: "Reels",       ar: "ريلز" } },
    { id: "commercial", label: { en: "Commercials", ar: "إعلانات" } },
    { id: "youtube",    label: { en: "YouTube",     ar: "يوتيوب" } }
    /* Add back when you have work to put in it - ضيفها لما يبقى عندك شغل فيها
    ,{ id: "wedding",   label: { en: "Weddings",    ar: "أفراح" } } */
  ],

  /* ---------- 8. FULL PROJECTS / الشغل ----------
     src: an .mp4 in videos/  OR  a YouTube link  OR  a Vimeo link.
     ratio: "16/9" for wide, "9/16" for vertical reels, "1/1" for square. */
  work: [
    { id: "w1", title: { en: "Me & You Café — Brand Film", ar: "مي آند يو كافيه — فيلم إعلاني" },
      category: "commercial", ratio: "9/16", duration: "0:13",
      src: "videos/web/coffe.mp4", poster: "assets/img/poster-coffe.jpg",
      tags: ["Colour Grade", "Product", "Sound Design"] },

    { id: "w2", title: { en: "YouTube Episode — Full Edit", ar: "حلقة يوتيوب — مونتاج كامل" },
      category: "youtube", ratio: "16/9", duration: "0:16",
      src: "videos/web/youtube-longform.mp4", poster: "assets/img/poster-youtube.jpg",
      tags: ["B-roll", "Motion GFX", "Colour"] },

    { id: "w3", title: { en: "AI Tool — Explainer Reel", ar: "أداة AI — ريل شرح" },
      category: "shortform", ratio: "9/16", duration: "0:19",
      src: "videos/web/reel1.mp4", poster: "assets/img/poster-reel1.jpg",
      tags: ["Captions", "Screen Record", "Motion GFX"] },

    { id: "w4", title: { en: "Crover — Real Estate Reel", ar: "كروفر — ريل عقارات" },
      category: "shortform", ratio: "9/16", duration: "0:25",
      src: "videos/web/reel3.mp4", poster: "assets/img/poster-reel3.jpg",
      tags: ["Brand Reel", "Arabic Titles"] },

    { id: "w5", title: { en: "Talking Head — Animated Inserts", ar: "توكينج هيد — رسوم متحركة" },
      category: "shortform", ratio: "9/16", duration: "0:23",
      src: "videos/web/reel4.mp4", poster: "assets/img/poster-reel4.jpg",
      tags: ["Captions", "Illustration", "Beat Sync"] },

    { id: "w6", title: { en: "Content Strategy — Kinetic Type", ar: "استراتيجية محتوى — تايبوجرافي" },
      category: "shortform", ratio: "9/16", duration: "0:11",
      src: "videos/web/reel2.mp4", poster: "assets/img/poster-reel2.jpg",
      tags: ["Kinetic Type", "Motion GFX"] }
  ],

  /* ---------- 9. SERVICES / الخدمات ----------
     icon can be: reel, play, film, heart, spark, mic, wand, clock  */
  services: [
    { icon: "reel",
      title: { en: "Reels, TikTok & Shorts", ar: "ريلز وتيك توك وشورتس" },
      desc:  { en: "Vertical edits built around the first 1.5 seconds. Hook-first cutting, beat sync, burned-in captions and trend-aware pacing.",
               ar: "مونتاج طولي مبني على أول ثانية ونص. الهوك الأول، مزامنة مع الإيقاع، كابشنز، وإيقاع مواكب للترند." },
      points: [ { en: "Hook-first structure",     ar: "بناء يبدأ بالهوك" },
                { en: "Auto-captions, styled",    ar: "كابشنز مصممة" },
                { en: "3 sizes: 9:16, 1:1, 16:9", ar: "٣ مقاسات جاهزة" } ] },

    { icon: "play",
      title: { en: "YouTube Long-Form", ar: "يوتيوب طويل" },
      desc:  { en: "Retention editing for talking-head and documentary channels. I cut dead air, layer b-roll, and keep the energy from minute 1 to minute 20.",
               ar: "مونتاج مبني على الـ retention للقنوات. بشيل السكات، بضيف بي-رول، وبحافظ على الطاقة من أول دقيقة لآخر واحدة." },
      points: [ { en: "Silence & filler removal",  ar: "شيل السكات والحشو" },
                { en: "B-roll & motion graphics",  ar: "بي-رول وموشن جرافيك" },
                { en: "Thumbnail concepts",        ar: "أفكار ثامبنيل" } ] },

    { icon: "film",
      title: { en: "Commercials & Brand Films", ar: "إعلانات وأفلام براند" },
      desc:  { en: "Product and brand work where the grade carries the value. Full colour pipeline, sound design, and licensed music.",
               ar: "شغل منتجات وبراندات، الجريد فيه هو اللي بيعمل الفرق. باين كولور كامل، ساوند ديزاين، وموسيقى مرخصة." },
      points: [ { en: "Log → cinematic grade",  ar: "من اللوج للجريد السينمائي" },
                { en: "Sound design & mix",     ar: "ساوند ديزاين وميكس" },
                { en: "Delivery in any format", ar: "تسليم بأي صيغة" } ] },

    { icon: "heart",
      title: { en: "Weddings & Events", ar: "أفراح ومناسبات" },
      desc:  { en: "Highlight films that people actually rewatch. Story-led structure, real audio moments, and skin tones that look like skin.",
               ar: "أفلام هايلايت الناس بتتفرج عليها تاني. بناء بيحكي قصة، لحظات صوت حقيقية، وألوان بشرة طبيعية." },
      points: [ { en: "3-8 min highlight film", ar: "فيلم هايلايت ٣-٨ دقايق" },
                { en: "Full ceremony edit",     ar: "مونتاج الحفل كامل" },
                { en: "Teaser for social",      ar: "تيزر للسوشيال" } ] }
  ],

  /* ---------- 10. HOW YOU WORK / طريقة الشغل ---------- */
  process: [
    { title: { en: "Brief", ar: "البريف" },
      desc:  { en: "We talk on WhatsApp. You tell me the goal, the audience and the deadline. I quote a fixed price — no surprises.",
               ar: "بنتكلم على واتساب. تقولي الهدف والجمهور والميعاد. وأديك سعر ثابت — من غير مفاجآت." } },
    { title: { en: "Footage", ar: "الفوتاج" },
      desc:  { en: "You send the raw files however is easiest — Drive, WeTransfer, Frame.io. I check everything before I start.",
               ar: "تبعتلي الملفات الخام بأي طريقة سهلة — درايف، وي ترانسفر، فريم. وأنا براجع كل حاجة قبل ما أبدأ." } },
    { title: { en: "First Cut", ar: "الكات الأول" },
      desc:  { en: "You get a watermarked draft with timecoded comments enabled. Two rounds of revisions are always included.",
               ar: "بتستلم نسخة مبدئية بعلامة مائية وتقدر تعلّق على أي ثانية. جولتين تعديلات دايماً مشمولين." } },
    { title: { en: "Delivery", ar: "التسليم" },
      desc:  { en: "Final master, graded and mixed, plus every crop you need for each platform. Project files on request.",
               ar: "النسخة النهائية بالجريد والميكس، مع كل المقاسات لكل منصة. وملفات المشروع لو طلبتها." } }
  ],

  /* ---------- 10b. ABOUT / عن نفسك ----------
     Set  show: false  to hide this section.
     People pay editors they trust. This is where trust is built.       */
  about: {
    show: true,
    heading: { en: "The person behind the timeline", ar: "الشخص اللي ورا الشغل" },
    body: {
      en: "I started editing on a borrowed laptop in 2021 and never really stopped. Five years later I've cut everything from twelve-second product hooks to hour-long wedding films, and the lesson is always the same one: the edit is not about the footage you have, it's about the second you cut on.\n\nI work fast, I don't disappear mid-project, and I'd rather tell you an idea won't work than take your money and deliver something we both know is average.",
      ar: "بدأت مونتاج على لابتوب مستعار سنة ٢٠٢١ ومبطلتش من ساعتها. بعد خمس سنين اشتغلت على كل حاجة، من هوك منتج مدته ١٢ ثانية لحد أفلام أفراح بالساعة، والدرس دايماً هو هو: المونتاج مش بتاع الفوتاج اللي معاك، ده بتاع الثانية اللي بتقطع فيها.\n\nبشتغل بسرعة، مبختفيش في نص المشروع، ويهمني أقولك إن فكرة مش هتنفع بدل ما آخد فلوسك وأسلمك حاجة احنا الاتنين عارفين إنها عادية."
    },
    highlights: [
      { en: "Replies within the hour, not the week", ar: "بيرد خلال ساعة، مش أسبوع" },
      { en: "Never missed an agreed deadline",       ar: "معدتش ميعاد متفق عليه" },
      { en: "Works in English and Arabic",           ar: "بشتغل بالعربي والإنجليزي" }
    ]
  },

  /* ---------- 10c. THE ENQUIRY FORM / فورم التواصل ----------
     The form does not email anybody. It builds a tidy WhatsApp message
     and opens it, so a stranger's first message already tells you the
     project type, the budget and the deadline. Far better than "hi".   */
  leadForm: {
    show: true,
    title: { en: "Tell me about the project", ar: "احكيلي عن المشروع" },
    sub:   { en: "Thirty seconds. It opens WhatsApp with everything already typed.",
             ar: "٣٠ ثانية. هيفتحلك واتساب والرسالة مكتوبة جاهزة." },
    budgets: [
      { en: "Under $100",   ar: "أقل من ١٠٠ دولار" },
      { en: "$100 – $400",  ar: "١٠٠ – ٤٠٠ دولار" },
      { en: "$400 – $1,000",ar: "٤٠٠ – ١٠٠٠ دولار" },
      { en: "$1,000+",      ar: "أكتر من ١٠٠٠ دولار" },
      { en: "Not sure yet", ar: "لسه مش متأكد" }
    ],
    timelines: [
      { en: "ASAP",          ar: "في أقرب وقت" },
      { en: "This week",     ar: "الأسبوع ده" },
      { en: "This month",    ar: "الشهر ده" },
      { en: "Just planning", ar: "بخطط بس" }
    ]
  },

  /* ---------- 11. SOFTWARE YOU USE / البرامج ---------- */
  tools: [
    "Adobe Premiere Pro", "After Effects", "DaVinci Resolve", "Photoshop",
    "Audition", "Media Encoder", "Frame.io", "Epidemic Sound"
  ],

  /* ---------- 12. TESTIMONIALS / آراء العملاء ---------- */
  testimonials: [
    /* EMPTY ON PURPOSE - the four reviews here were written by me, not by
       clients. While this list is empty the section shows an INVITATION
       instead: a button that opens WhatsApp with a ready-made review
       template for the client to fill in and send back to you.
       When a real one arrives, copy it in using the shape below.

       الريفيوز اللي كانت هنا مكنتش حقيقية. دلوقتي القسم بيطلب من العميل
       يبعتلك ريفيو على الواتساب. لما يجيلك واحد حقيقي حطه بالشكل ده.  */

    // { name: "Omar Hassan",
    //   role:   { en: "Founder, Crover", ar: "مؤسس كروفر" },
    //   rating: 5,
    //   text:   { en: "What they actually said about the job.",
    //             ar: "اللي قالوه فعلاً عن الشغل." } }
  ],

  packages: [
    /* PRICING IS OFF - you asked to take it down for now, so the whole
       section and its nav link are hidden. Nothing is lost: your four
       packages are written out below. Delete the // to switch them back on.

       الأسعار مقفولة دلوقتي. شيل الـ // من قدام الباقات وهي ترجع.

       If you turn it back on, keep this rule: never let the monthly package
       price a video below ~75% of your single-video price, or the monthly
       package undercuts your own rate.                                    */

    // { name: { en: "Reel", ar: "ريل" }, price: "$60",
    //   period: { en: "per video", ar: "للفيديو" }, popular: false,
    //   features: [ { en: "Up to 60 seconds", ar: "لغاية ٠٦ ثانية" },
    //               { en: "Captions + sound design", ar: "كابشنز وهندسة صوت" },
    //               { en: "2 rounds of changes", ar: "تعديلين" } ] },
    //
    // { name: { en: "Creator", ar: "صانع محتوى" }, price: "$390",
    //   period: { en: "per month", ar: "شهرياً" }, popular: true,
    //   features: [ { en: "8 short videos or 2 long-form", ar: "٨ فيديوهات قصيرة أو ٢ طوال" },
    //               { en: "Works out at $49 a video", ar: "يعني ٤٩ دولار للفيديو" },
    //               { en: "Priority turnaround", ar: "أولوية في التسليم" } ] },
    //
    // { name: { en: "Long-Form", ar: "فيديو طويل" }, price: "$180",
    //   period: { en: "per video", ar: "للفيديو" }, popular: false,
    //   features: [ { en: "10-25 minutes", ar: "١٠-٢٥ دقيقة" },
    //               { en: "B-roll, graphics, colour", ar: "بي-رول، جرافيكس، جريد" } ] },
    //
    // { name: { en: "Film", ar: "فيلم" },
    //   price:  { en: "from $650", ar: "من ٦٥٠ دولار" },
    //   period: { en: "per project", ar: "للمشروع" }, popular: false,
    //   features: [ { en: "Commercials and wedding films", ar: "إعلانات وأفراح" },
    //               { en: "Full grade and mix", ar: "جريد وميكس كامل" } ] }
  ],

  faq: [
    { q: { en: "How fast can you deliver?", ar: "التسليم بياخد قد إيه؟" },
      a: { en: "A reel is usually 48 hours. Long-form YouTube is 3-4 days. Brand films depend on scope — I always give you a date before we start, and I don't miss it.",
           ar: "الريل عادةً ٤٨ ساعة. فيديو يوتيوب طويل ٣-٤ أيام. أفلام البراند حسب حجم الشغل — بديك تاريخ قبل ما نبدأ، وبلتزم بيه." } },

    { q: { en: "How do I send you my footage?", ar: "أبعتلك الفوتاج إزاي؟" },
      a: { en: "Google Drive, WeTransfer, Dropbox or Frame.io — whatever you already use. For very large shoots I'll set up a folder for you.",
           ar: "جوجل درايف، وي ترانسفر، دروب بوكس أو فريم — أي حاجة بتستخدمها. ولو الشغل كبير هظبطلك فولدر مخصوص." } },

    { q: { en: "How many revisions do I get?", ar: "كام تعديل؟" },
      a: { en: "Two rounds are included in every package, and the monthly plan is unlimited. I'd rather you love it than tolerate it.",
           ar: "جولتين مشمولين في كل باقة، والباقة الشهرية تعديلات غير محدودة. أنا عايزك تحبه مش بس توافق عليه." } },

    { q: { en: "Do you work with clients outside Egypt?", ar: "بتشتغل مع عملاء برة مصر؟" },
      a: { en: "Most of my work is remote — Gulf, Europe and the US. Payment by Wise, PayPal or bank transfer.",
           ar: "معظم شغلي أونلاين — الخليج وأوروبا وأمريكا. الدفع عن طريق Wise أو PayPal أو تحويل بنكي." } },

    { q: { en: "Do you provide the music?", ar: "بتوفر الموسيقى؟" },
      a: { en: "Yes — licensed tracks through Epidemic Sound and Artlist, so your video is safe from copyright claims on every platform.",
           ar: "أيوة — تراكات مرخصة من Epidemic Sound و Artlist، فالفيديو بتاعك آمن من مشاكل حقوق الملكية على أي منصة." } }
  ],

  /* ---------- 15. CALL TO ACTION / الدعوة للتواصل ---------- */
  cta: {
    title:  { en: "Got footage sitting on a hard drive?", ar: "عندك فوتاج قاعد على الهارد؟" },
    sub:    { en: "Send it over. I'll tell you exactly what I'd do with it — free, no commitment.",
              ar: "ابعتهولي. هقولك بالظبط هعمل بيه إيه — مجاناً وبدون أي التزام." },
    button: { en: "Message me on WhatsApp", ar: "كلمني على واتساب" }
  },

  /* ---------- 16. SEO / إعدادات جوجل ----------
     This controls what Google shows, and what appears when someone pastes
     your link into WhatsApp, Instagram DM, LinkedIn or Facebook.

     >>> AFTER YOU BUY A DOMAIN, CHANGE `url` BELOW. <<<
     Until you do, the site works fine but uses whatever address it is
     served from. You must also update the same address in sitemap.xml
     and robots.txt (both are in the main folder).                        */
  seo: {
    /* Your final address, no slash at the end. "" = work it out automatically. */
    url: "https://ra-him8.github.io/mahmoud-portofolio/",

    title:       "Mahmoud Mohamed — Video Editor & Colorist | Cairo",
    description: "Video editor specialising in reels, YouTube, commercials and wedding films. Cinematic colour grading and sound design. Based in Cairo, working worldwide.",
    keywords:    "video editor, montage, colorist, Cairo, Egypt, reels editor, wedding film, مونتير, مونتاج فيديو",

    /* Must be a PNG or JPG — social platforms will not show an SVG. 1200x630. */
    ogImage: "assets/img/og.png",

    /* Arabic versions used when the site is switched to Arabic */
    titleAr:       "محمود محمد — مونتير وكولورست | القاهرة",
    descriptionAr: "مونتير فيديو متخصص في الريلز واليوتيوب والإعلانات وأفلام الأفراح. كولور جريدنج سينمائي وساوند ديزاين. مقيم في القاهرة وبشتغل مع العالم كله.",

    /* Used to describe your business to Google (rich results) */
    business: {
      city:       "Cairo",
      region:     "Cairo Governorate",
      country:    "EG",
      priceRange: "$$",
      areaServed: ["Egypt", "Saudi Arabia", "United Arab Emirates",
                   "United Kingdom", "United States"],
      founded:    "2021"
    }
  }
};
