(() => {
  const SUPPORTED_LANGS = new Set(["ru", "uz", "en", "zh"]);
  const LANG_LABELS = { ru: "RU", uz: "UZ", en: "EN", zh: "ZH" };

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
      "home.hero.kicker": "Finance and operations in one system",
      "home.hero.title": "Finance and operational management without chaos in one system.",
      "home.hero.lead": "asar.consulting helps owners and executives build a manageable company with transparent money, clear numbers, execution discipline, and document order.",
      "home.hero.ctaPrimary": "Discuss your task",
      "home.hero.ctaSecondary": "View solutions",
      "home.card6.ctaPrimary": "Choose service model",
      "home.card6.ctaSecondary": "Send request",
      "solutions.hero.kicker": "asar.consulting solutions",
      "solutions.hero.title": "Stable management support or project transformation",
      "solutions.hero.lead": "Choose the format for your current business challenge: daily operating order or system redesign for measurable growth.",
      "solutions.cta.title": "Discuss your task and get a suitable work format",
      "solutions.cta.button": "Discuss task",
      "resources.hero.kicker": "Management library",
      "resources.hero.title": "asar.consulting management library",
      "resources.hero.lead": "Practical materials for leaders: guides, templates, and tools to bring order.",
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
      "resources.cta.title": "Need templates and methods tailored to your company?",
      "resources.cta.button": "Discuss task",
      "company.hero.kicker": "About us",
      "company.hero.title": "A team of practitioners at the intersection of finance and operations",
      "company.hero.lead": "Our goal is to make your business transparent, resilient, and ready for growth.",
      "company.values.title": "Principles",
      "company.approach.title": "How we work",
      "company.jobs.title": "Careers",
      "company.contact.title": "Get in touch",
      "company.contact.copy": "Describe your task and we will propose the next clear step.",
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
      "home.hero.kicker": "Moliyaviy va operatsion boshqaruv",
      "home.hero.title": "Moliyaviy va operatsion boshqaruvni bitta tizimga birlashtiramiz",
      "home.hero.lead": "asar.consulting biznesni boshqariladigan holatga olib keladi: shaffof pul oqimi, aniq raqamlar va ijro intizomi.",
      "home.hero.ctaPrimary": "Vazifani muhokama qilish",
      "home.hero.ctaSecondary": "Yechimlarni ko'rish",
      "home.card6.ctaPrimary": "Xizmat formatini tanlash",
      "home.card6.ctaSecondary": "So'rov qoldirish",
      "solutions.hero.kicker": "Moliyaviy boshqaruv yechimlari",
      "solutions.hero.title": "Biznes maqsadlari uchun moliyaviy hamrohlik va konsalting",
      "solutions.hero.lead": "Doimiy hamrohlik yoki loyiha konsaltingini tanlang va natijalarni nazorat qiling.",
      "solutions.cta.title": "Vazifangizni muhokama qilamiz va mos formatni tanlaymiz",
      "solutions.cta.button": "Vazifani muhokama qilish",
      "resources.hero.kicker": "Boshqaruv kutubxonasi",
      "resources.hero.title": "asar.consulting boshqaruv kutubxonasi",
      "resources.hero.lead": "Rahbarlar uchun amaliy qo'llanmalar, shablonlar va instrumentlar.",
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
      "resources.cta.title": "Kompaniyangizga mos shablon va metodika kerakmi?",
      "resources.cta.button": "Vazifani muhokama qilish",
      "company.hero.kicker": "Biz haqimizda",
      "company.hero.title": "Moliyaviy va operatsion boshqaruv bo'yicha amaliy ekspertlar jamoasi",
      "company.hero.lead": "Maqsadimiz biznesingizni shaffof, barqaror va o'sishga tayyor qilish.",
      "company.values.title": "Tamoyillar",
      "company.approach.title": "Ishga yondashuvimiz",
      "company.jobs.title": "Vakansiyalar",
      "company.contact.title": "Bog'lanish",
      "company.contact.copy": "Vazifangizni yozing, keyingi aniq qadamni taklif qilamiz.",
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
      "home.hero.kicker": "财务与运营一体化",
      "home.hero.title": "在一个系统中实现无混乱的财务与运营管理",
      "home.hero.lead": "asar.consulting帮助企业建立可控体系：资金透明、数据清晰、执行有纪律、文档有秩序。",
      "home.hero.ctaPrimary": "讨论你的任务",
      "home.hero.ctaSecondary": "查看方案",
      "home.card6.ctaPrimary": "选择服务模式",
      "home.card6.ctaSecondary": "提交需求",
      "solutions.hero.kicker": "asar.consulting 解决方案",
      "solutions.hero.title": "稳定陪跑或项目改造，按你的业务问题选择",
      "solutions.hero.lead": "可选择日常管理支持，或针对关键问题进行系统重构与提升。",
      "solutions.cta.title": "提交你的问题，我们会给出合适的合作方式",
      "solutions.cta.button": "讨论任务",
      "resources.hero.kicker": "管理资料库",
      "resources.hero.title": "asar.consulting 管理资料库",
      "resources.hero.lead": "面向管理者的实用指南、模板与工具，帮助建立秩序。",
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
      "resources.cta.title": "需要适配你公司的模板与方法吗？",
      "resources.cta.button": "讨论任务",
      "company.hero.kicker": "关于我们",
      "company.hero.title": "专注财务与运营管理的实战专家团队",
      "company.hero.lead": "目标是让你的企业更透明、更稳健，并为增长做好准备。",
      "company.values.title": "原则",
      "company.approach.title": "我们的工作方式",
      "company.jobs.title": "招聘岗位",
      "company.contact.title": "联系我们",
      "company.contact.copy": "描述你的任务，我们会给出清晰的下一步建议。",
      "company.contact.name": "姓名",
      "company.contact.email": "邮箱",
      "company.contact.message": "留言",
      "company.contact.send": "提交"
    }
  };

  const PAGE_META = {
    home: {
      en: { title: "ASAR Consulting | Finance and operations in one system", description: "Build transparent finance and disciplined execution without operational chaos." },
      uz: { title: "ASAR Consulting | Moliyaviy va operatsion boshqaruv", description: "Shaffof moliya va ijro intizomi uchun tizimli yechimlar." },
      zh: { title: "ASAR Consulting | 财务与运营一体化", description: "用系统化方法实现资金透明与执行秩序。" }
    },
    solutions: {
      en: { title: "ASAR Consulting | Solutions", description: "Choose ongoing management support or project-based consulting." },
      uz: { title: "ASAR Consulting | Yechimlar", description: "Doimiy hamrohlik yoki loyiha konsaltingi formatlari." },
      zh: { title: "ASAR Consulting | 解决方案", description: "长期陪跑与项目咨询两种合作模式。" }
    },
    resources: {
      en: { title: "ASAR Consulting | Management Library", description: "Guides, templates, and articles for practical financial and operating order." },
      uz: { title: "ASAR Consulting | Boshqaruv kutubxonasi", description: "Moliya va boshqaruv uchun amaliy qo'llanmalar va shablonlar." },
      zh: { title: "ASAR Consulting | 管理资料库", description: "用于财务与运营秩序建设的指南、模板与文章。" }
    },
    company: {
      en: { title: "ASAR Consulting | About Us", description: "Practitioner team, principles, careers, and contacts." },
      uz: { title: "ASAR Consulting | Biz haqimizda", description: "Amaliy ekspertlar jamoasi, tamoyillar, vakansiyalar va aloqa." },
      zh: { title: "ASAR Consulting | 关于我们", description: "实战团队、工作原则、招聘与联系方式。" }
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
    document.querySelectorAll(".main-nav a[data-nav]").forEach((link) => link.classList.remove("active"));
    const current = document.querySelector(`.main-nav a[data-nav="${page}"]`);
    if (current) current.classList.add("active");
  }

  function initMenus() {
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");
    const header = document.getElementById("siteHeader");
    const languageSwitcher = document.querySelector(".language-switcher");
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
      const setLangOpen = (open) => {
        if (header) header.classList.toggle("lang-open", open);
      };

      languageToggle.addEventListener("click", (event) => {
        event.stopPropagation();
        const expanded = languageToggle.getAttribute("aria-expanded") === "true";
        languageToggle.setAttribute("aria-expanded", String(!expanded));
        languageMenu.classList.toggle("open", !expanded);
        setLangOpen(!expanded);
      });

      document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Node)) return;
        if (!languageMenu.contains(target) && !languageToggle.contains(target)) {
          languageMenu.classList.remove("open");
          languageToggle.setAttribute("aria-expanded", "false");
          setLangOpen(false);
        }
      });

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
          languageMenu.classList.remove("open");
          languageToggle.setAttribute("aria-expanded", "false");
          setLangOpen(false);
        }
      });

      if (languageSwitcher) {
        languageSwitcher.addEventListener("mouseenter", () => setLangOpen(true));
        languageSwitcher.addEventListener("mouseleave", () => {
          if (!languageMenu.classList.contains("open")) setLangOpen(false);
        });
        languageSwitcher.addEventListener("focusin", () => setLangOpen(true));
        languageSwitcher.addEventListener("focusout", () => {
          window.setTimeout(() => {
            if (!languageSwitcher.contains(document.activeElement) && !languageMenu.classList.contains("open")) {
              setLangOpen(false);
            }
          }, 0);
        });
      }
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

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const viewport = window.innerHeight || 1;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const offset = (rect.top - viewport * 0.26) / viewport;
        const clamped = Math.max(-1.3, Math.min(1.3, offset));
        const translateY = clamped * -16;
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

  function initHomeHeaderMorph() {
    if (page !== "home") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const header = document.getElementById("siteHeader");
    const hero = document.getElementById("homeHeaderHero");
    if (!header || !hero) return;

    const compactHeight = () => {
      const rootValue = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
      const numeric = Number.parseFloat(rootValue);
      return Number.isFinite(numeric) ? numeric : 80;
    };

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const viewport = Math.max(1, window.innerHeight || 1);
      const scrollY = window.scrollY || 0;
      const progress = Math.max(0, Math.min(1, scrollY / (viewport * 0.9)));
      const compact = compactHeight();
      const currentHeight = viewport - (viewport - compact) * progress;
      const heroOpacity = Math.max(0, 1 - progress * 1.25);
      const heroShift = -46 * progress;

      header.style.setProperty("--home-header-h", `${currentHeight}px`);
      header.style.setProperty("--home-hero-opacity", heroOpacity.toFixed(3));
      header.style.setProperty("--home-hero-shift", `${heroShift.toFixed(2)}px`);
      header.classList.toggle("is-compact", progress > 0.92);
      hero.style.pointerEvents = progress > 0.92 ? "none" : "auto";
    };

    const requestTick = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
    requestTick();
  }

  function initSubpageHeaderMorph() {
    if (page === "home") return;

    const header = document.getElementById("siteHeader");
    const main = document.getElementById("main-content");
    const hero = main ? main.querySelector(".page-hero") : null;
    if (!header || !main || !hero) return;

    document.body.classList.add("subpage-hero-morph");
    hero.classList.add("subpage-header-hero");
    header.appendChild(hero);

    const compactHeight = () => {
      const rootValue = getComputedStyle(document.documentElement).getPropertyValue("--header-h").trim();
      const numeric = Number.parseFloat(rootValue);
      return Number.isFinite(numeric) ? numeric : 48;
    };

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const viewport = Math.max(1, window.innerHeight || 1);
      const scrollY = window.scrollY || 0;
      const heroRatio = window.innerWidth <= 860 ? 0.46 : 0.5;
      const maxHeroHeight = viewport * heroRatio;
      const progress = Math.max(0, Math.min(1, scrollY / (viewport * 0.55)));
      const compact = compactHeight();
      const currentHeight = compact + maxHeroHeight * (1 - progress);
      const heroOpacity = Math.max(0, 1 - progress * 1.2);
      const heroShift = -52 * progress;

      header.style.setProperty("--subpage-header-h", `${currentHeight}px`);
      header.style.setProperty("--subpage-hero-opacity", heroOpacity.toFixed(3));
      header.style.setProperty("--subpage-hero-shift", `${heroShift.toFixed(2)}px`);
      header.classList.toggle("is-compact", progress > 0.9);
      hero.style.pointerEvents = progress > 0.9 ? "none" : "auto";
    };

    const requestTick = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick, { passive: true });
    requestTick();
  }

  function initLenis() {
    if (typeof Lenis === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Optional: connect to anchor links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const href = anchor.getAttribute("href");
        if (href === "#") return;
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenis.scrollTo(target);
        }
      });
    });

    window.asarLenis = lenis; // Make it accessible if needed
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
  initHomeHeaderMorph();
  initSubpageHeaderMorph();
  initHomeCardMotion();
  initLenis();
})();
