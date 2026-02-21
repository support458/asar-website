(() => {
  const SUPPORTED_LANGS = new Set(["ru", "uz", "en", "zh"]);
  const LANG_LABELS = { ru: "RU", uz: "UZ", en: "EN", zh: "中文" };

  const I18N = {
    en: {
      "common.skip": "Skip to content",
      "common.language": "Language",
      "nav.home": "Home",
      "nav.solutions": "Solutions",
      "nav.resources": "Resources",
      "nav.company": "Company",
      "footer.copy": "Financial infrastructure for stable and manageable business growth.",
      "footer.rights": "© 2026 ASAR. All rights reserved.",
      "home.hero.kicker": "Financial growth architecture",
      "home.hero.title": "Make decisions based on numbers, not assumptions",
      "home.hero.lead": "We build management finance systems: transparent cash flow, KPI control, and predictable profitability.",
      "home.hero.ctaPrimary": "View solutions",
      "home.hero.ctaSecondary": "Get consultation",
      "home.card6.ctaPrimary": "Choose service model",
      "home.card6.ctaSecondary": "Send request",
      "solutions.hero.kicker": "Financial management solutions",
      "solutions.hero.title": "Financial support and consulting for your business goals",
      "solutions.hero.lead": "Choose ongoing support or project consulting and gain clarity, predictability, and profit control.",
      "solutions.cta.title": "Ready to build a financial operating system for your business?",
      "solutions.cta.button": "Discuss project",
      "resources.hero.kicker": "Resource center",
      "resources.hero.title": "Guidelines, templates, articles, and blog in one hub",
      "resources.hero.lead": "Useful materials for clients and teams building systematic finance management.",
      "resources.search.placeholder": "Search resources",
      "resources.search.button": "Search",
      "resources.filter.all": "All",
      "resources.filter.guideline": "Guidelines",
      "resources.filter.template": "Templates",
      "resources.filter.article": "Articles",
      "resources.filter.blog": "Blog",
      "resources.list.title": "Materials",
      "resources.auto.title": "Blog automation via Google Drive and Google Docs",
      "resources.auto.lead": "Authors write in Google Docs, and the website syncs text, images, and metadata automatically.",
      "resources.cta.title": "Need templates tailored to your business?",
      "resources.cta.button": "Request materials",
      "company.hero.kicker": "About company",
      "company.hero.title": "We build a financial culture where data enables strong decisions",
      "company.hero.lead": "We act as a delivery partner: not only recommendations, but implementation.",
      "company.values.title": "Our values",
      "company.approach.title": "How we work",
      "company.jobs.title": "Careers",
      "company.contact.title": "Contacts and feedback",
      "company.contact.copy": "Send your task and we will propose the right collaboration model.",
      "company.contact.name": "Name",
      "company.contact.email": "Email",
      "company.contact.message": "Message",
      "company.contact.send": "Send request"
    },
    uz: {
      "common.skip": "Kontentga o'tish",
      "common.language": "Til",
      "nav.home": "Asosiy",
      "nav.solutions": "Yechimlar",
      "nav.resources": "Resurslar",
      "nav.company": "Kompaniya",
      "footer.copy": "Barqaror va boshqariladigan biznes o'sishi uchun moliyaviy infratuzilma.",
      "footer.rights": "© 2026 ASAR. Barcha huquqlar himoyalangan.",
      "home.hero.kicker": "O'sish uchun moliyaviy arxitektura",
      "home.hero.title": "Qarorlarni taxmin bilan emas, raqamlar asosida qabul qiling",
      "home.hero.lead": "Shaffof cash flow, KPI nazorati va rentabellik uchun boshqaruv moliya tizimini quramiz.",
      "home.hero.ctaPrimary": "Yechimlarni ko'rish",
      "home.hero.ctaSecondary": "Konsultatsiya olish",
      "home.card6.ctaPrimary": "Xizmat formatini tanlash",
      "home.card6.ctaSecondary": "So'rov qoldirish",
      "solutions.hero.kicker": "Moliyaviy boshqaruv yechimlari",
      "solutions.hero.title": "Biznes maqsadlari uchun moliyaviy hamrohlik va konsalting",
      "solutions.hero.lead": "Doimiy hamrohlik yoki loyiha konsaltingini tanlang va natijalarni nazorat qiling.",
      "solutions.cta.title": "Biznesingiz uchun moliyaviy tizimni qurishga tayyormisiz?",
      "solutions.cta.button": "Loyihani muhokama qilish",
      "resources.hero.kicker": "Resurs markazi",
      "resources.hero.title": "Qo'llanmalar, shablonlar, maqolalar va blog bitta markazda",
      "resources.hero.lead": "Mijozlar va jamoalar uchun foydali moliyaviy materiallar.",
      "resources.search.placeholder": "Materiallardan qidirish",
      "resources.search.button": "Qidirish",
      "resources.filter.all": "Barchasi",
      "resources.filter.guideline": "Qo'llanmalar",
      "resources.filter.template": "Shablonlar",
      "resources.filter.article": "Maqolalar",
      "resources.filter.blog": "Blog",
      "resources.list.title": "Materiallar",
      "resources.auto.title": "Google Drive va Google Docs orqali blogni avtomatlashtirish",
      "resources.auto.lead": "Muallif Google Docs'da yozadi, sayt esa matn, rasm va meta ma'lumotlarni avtomatik yuklaydi.",
      "resources.cta.title": "Biznesingizga mos shablonlar kerakmi?",
      "resources.cta.button": "Materiallarni so'rash",
      "company.hero.kicker": "Kompaniya haqida",
      "company.hero.title": "Raqamlar kuchli qarorlar qabul qilishga yordam beradigan moliyaviy madaniyatni quramiz",
      "company.hero.lead": "Faqat tavsiya emas, amaliy joriy etish bilan ishlaymiz.",
      "company.values.title": "Bizning qadriyatlar",
      "company.approach.title": "Ishga yondashuvimiz",
      "company.jobs.title": "Vakansiyalar",
      "company.contact.title": "Kontaktlar va qayta aloqa",
      "company.contact.copy": "Vazifangizni yozing, sizga mos hamkorlik formatini taklif qilamiz.",
      "company.contact.name": "Ism",
      "company.contact.email": "Email",
      "company.contact.message": "Xabar",
      "company.contact.send": "So'rov yuborish"
    },
    zh: {
      "common.skip": "跳到内容",
      "common.language": "语言",
      "nav.home": "首页",
      "nav.solutions": "解决方案",
      "nav.resources": "资源",
      "nav.company": "公司",
      "footer.copy": "为企业稳定增长提供财务基础设施。",
      "footer.rights": "© 2026 ASAR。保留所有权利。",
      "home.hero.kicker": "增长型财务架构",
      "home.hero.title": "基于数据而非直觉做决策",
      "home.hero.lead": "我们搭建管理型财务体系：透明现金流、KPI控制和可预测盈利。",
      "home.hero.ctaPrimary": "查看方案",
      "home.hero.ctaSecondary": "获取咨询",
      "home.card6.ctaPrimary": "选择服务模式",
      "home.card6.ctaSecondary": "提交需求",
      "solutions.hero.kicker": "财务管理解决方案",
      "solutions.hero.title": "面向企业目标的财务陪跑与咨询",
      "solutions.hero.lead": "可选择长期支持或项目咨询，获得更清晰、更可控的财务管理。",
      "solutions.cta.title": "准备好为你的企业搭建财务操作系统了吗？",
      "solutions.cta.button": "讨论项目",
      "resources.hero.kicker": "资源中心",
      "resources.hero.title": "指南、模板、文章与博客一体化平台",
      "resources.hero.lead": "为客户和团队提供实用的财务管理资料。",
      "resources.search.placeholder": "搜索资源",
      "resources.search.button": "搜索",
      "resources.filter.all": "全部",
      "resources.filter.guideline": "指南",
      "resources.filter.template": "模板",
      "resources.filter.article": "文章",
      "resources.filter.blog": "博客",
      "resources.list.title": "资料列表",
      "resources.auto.title": "通过 Google Drive 与 Google Docs 自动化博客发布",
      "resources.auto.lead": "作者在 Google Docs 写作，网站自动同步正文、图片和元数据。",
      "resources.cta.title": "需要适配你业务的模板吗？",
      "resources.cta.button": "申请资料",
      "company.hero.kicker": "关于公司",
      "company.hero.title": "我们打造让数据驱动强决策的财务文化",
      "company.hero.lead": "我们不仅给建议，更和客户团队一起落地执行。",
      "company.values.title": "我们的价值观",
      "company.approach.title": "我们的工作方式",
      "company.jobs.title": "招聘岗位",
      "company.contact.title": "联系方式与反馈",
      "company.contact.copy": "告诉我们你的任务，我们会给出合适的合作方式。",
      "company.contact.name": "姓名",
      "company.contact.email": "邮箱",
      "company.contact.message": "留言",
      "company.contact.send": "提交"
    }
  };

  const PAGE_META = {
    home: {
      en: { title: "ASAR Consulting | Data-driven financial solutions", description: "Financial support and consulting for business growth." },
      uz: { title: "ASAR Consulting | Raqamlarga asoslangan moliyaviy yechimlar", description: "Biznes uchun moliyaviy hamrohlik va konsalting." },
      zh: { title: "ASAR Consulting | 数据驱动的财务解决方案", description: "企业财务陪跑与咨询服务。" }
    },
    solutions: {
      en: { title: "ASAR Consulting | Solutions", description: "Financial support and consulting services." },
      uz: { title: "ASAR Consulting | Yechimlar", description: "Moliyaviy hamrohlik va konsalting xizmatlari." },
      zh: { title: "ASAR Consulting | 解决方案", description: "财务陪跑与咨询服务。" }
    },
    resources: {
      en: { title: "ASAR Consulting | Resources", description: "Guidelines, templates, articles and automated blog workflow." },
      uz: { title: "ASAR Consulting | Resurslar", description: "Qo'llanmalar, shablonlar va avtomatlashtirilgan blog nashri." },
      zh: { title: "ASAR Consulting | 资源中心", description: "指南、模板、文章与自动化博客发布。" }
    },
    company: {
      en: { title: "ASAR Consulting | Company", description: "Values, jobs, contacts and feedback form." },
      uz: { title: "ASAR Consulting | Kompaniya", description: "Qadriyatlar, vakansiyalar, kontaktlar va forma." },
      zh: { title: "ASAR Consulting | 公司", description: "公司价值观、招聘、联系方式与反馈表单。" }
    }
  };

  const page = document.body.dataset.page || "home";

  function getInitialLang() {
    const params = new URLSearchParams(window.location.search);
    const queryLang = params.get("lang");
    if (queryLang && SUPPORTED_LANGS.has(queryLang)) return queryLang;
    const savedLang = localStorage.getItem("asar_lang");
    if (savedLang && SUPPORTED_LANGS.has(savedLang)) return savedLang;
    return "ru";
  }

  function getDictionaryValue(lang, key) {
    const dict = I18N[lang];
    if (!dict) return null;
    return dict[key] ?? null;
  }

  function applyTranslations(lang) {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.getAttribute("data-i18n");
      const value = getDictionaryValue(lang, key);
      if (value !== null) node.textContent = value;
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((node) => {
      const key = node.getAttribute("data-i18n-placeholder");
      const value = getDictionaryValue(lang, key);
      if (value !== null) node.setAttribute("placeholder", value);
    });
  }

  function applyMeta(lang) {
    const pagePack = PAGE_META[page];
    const pack = pagePack && pagePack[lang];
    if (!pack) return;
    if (pack.title) document.title = pack.title;
    if (pack.description) {
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", pack.description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute("content", pack.description);
      const twDesc = document.querySelector('meta[name="twitter:description"]');
      if (twDesc) twDesc.setAttribute("content", pack.description);
    }
  }

  function updateLanguageIndicator(lang) {
    const indicator = document.getElementById("activeLang");
    if (indicator) indicator.textContent = LANG_LABELS[lang] || "RU";
    document.documentElement.lang = lang === "zh" ? "zh-Hans" : lang;
  }

  function updateInternalLinks(lang) {
    document.querySelectorAll("a[href]").forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http://") || href.startsWith("https://")) return;
      const target = new URL(href, window.location.href);
      if (target.origin !== window.location.origin) return;
      target.searchParams.set("lang", lang);
      link.setAttribute("href", `${target.pathname.split("/").pop()}${target.search}${target.hash}`);
    });
  }

  function highlightCurrentNav() {
    document.querySelectorAll(".main-nav a").forEach((link) => link.classList.remove("active"));
    const current = document.querySelector(`.main-nav a[data-nav="${page}"]`);
    if (current) current.classList.add("active");
  }

  function initMenus() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    if (menuToggle && mainNav) {
      menuToggle.addEventListener("click", () => {
        const expanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!expanded));
        mainNav.classList.toggle("open", !expanded);
      });
    }

    const languageToggle = document.getElementById("languageToggle");
    const languageMenu = document.getElementById("languageMenu");
    if (languageToggle && languageMenu) {
      languageToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = languageToggle.getAttribute("aria-expanded") === "true";
        languageToggle.setAttribute("aria-expanded", String(!expanded));
        languageMenu.classList.toggle("open", !expanded);
      });

      document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (!languageMenu.contains(target) && !languageToggle.contains(target)) {
          languageMenu.classList.remove("open");
          languageToggle.setAttribute("aria-expanded", "false");
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          languageMenu.classList.remove("open");
          languageToggle.setAttribute("aria-expanded", "false");
        }
      });
    }
  }

  function initLanguageSwitcher(currentLang) {
    const languageMenu = document.getElementById("languageMenu");
    if (!languageMenu) return;

    languageMenu.querySelectorAll("button[data-lang]").forEach((button) => {
      button.addEventListener("click", () => {
        const nextLang = button.getAttribute("data-lang");
        if (!nextLang || !SUPPORTED_LANGS.has(nextLang)) return;

        localStorage.setItem("asar_lang", nextLang);
        if (nextLang === currentLang) return;

        const nextUrl = new URL(window.location.href);
        nextUrl.searchParams.set("lang", nextLang);
        window.location.href = nextUrl.toString();
      });
    });
  }

  function initResourceFilters() {
    const list = document.getElementById("resourceList");
    if (!list) return;

    const rows = Array.from(list.querySelectorAll(".resource-row"));
    const filterButtons = Array.from(document.querySelectorAll(".filter-btn[data-resource-filter]"));
    const searchInput = document.getElementById("resourceSearch");

    let activeFilter = "all";
    let searchTerm = "";

    function applyFilter() {
      rows.forEach((row) => {
        const type = row.getAttribute("data-resource-type");
        const content = (row.textContent || "").toLowerCase();
        const filterMatch = activeFilter === "all" || activeFilter === type;
        const searchMatch = !searchTerm || content.includes(searchTerm);
        row.hidden = !(filterMatch && searchMatch);
      });
    }

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        activeFilter = button.getAttribute("data-resource-filter") || "all";
        filterButtons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        applyFilter();
      });
    });

    if (searchInput) {
      searchInput.addEventListener("input", () => {
        searchTerm = searchInput.value.trim().toLowerCase();
        applyFilter();
      });
    }

    applyFilter();
  }

  function initHomeCardMotion() {
    const cards = Array.from(document.querySelectorAll(".stack-card"));
    if (!cards.length) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const revealTrigger = document.getElementById("homeFooterRevealTrigger");
    const isHomePage = document.body.dataset.page === "home";

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const viewport = window.innerHeight || 1;
      let revealLift = 0;

      if (isHomePage && revealTrigger) {
        const triggerRect = revealTrigger.getBoundingClientRect();
        const start = viewport * 0.98;
        const end = viewport * 0.32;
        const raw = (start - triggerRect.top) / (start - end);
        const progress = Math.max(0, Math.min(1, raw));
        revealLift = progress * viewport * 0.36;
      }

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const offset = (rect.top - viewport * 0.26) / viewport;
        const clamped = Math.max(-1.3, Math.min(1.3, offset));
        const translateY = clamped * -16 - revealLift;
        const rotateX = clamped * 1.8;
        const scale = 1 - Math.min(Math.abs(clamped) * 0.028, 0.028);
        card.style.transform = `translateY(${translateY}px) rotateX(${rotateX}deg) scale(${scale})`;
      });
    };

    const requestTick = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
    requestTick();
  }

  const lang = getInitialLang();
  localStorage.setItem("asar_lang", lang);

  updateLanguageIndicator(lang);
  highlightCurrentNav();
  applyTranslations(lang);
  applyMeta(lang);
  updateInternalLinks(lang);
  initMenus();
  initLanguageSwitcher(lang);
  initResourceFilters();
  initHomeCardMotion();
})();
