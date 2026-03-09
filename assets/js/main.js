/**
 * ASAR Website - Bundled Logic 2026
 * Contains: Hero Gradient, Sheets Layout, and Main Interactive Elements
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. HERO GRADIENT (from hero-gradient.js)
     ========================================================================== */
  const initHeroGradient = () => {
    const canvas = document.getElementById('heroCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;
    let animationFrame;

    // Configuration
    const config = {
      colors: ['#0F0054', '#1A008F', '#2E00FF', '#080032'],
      speed: 0.0008,
      complexity: 0.45,
      density: 1.2
    };

    // Geometry nodes
    let nodes = [];
    const nodeCount = 6;

    class Node {
      constructor() {
        this.init();
      }
      init() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.radius = Math.random() * (width * 0.5) + (width * 0.2);
        this.color = config.colors[Math.floor(Math.random() * config.colors.length)];
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < -this.radius) this.x = width + this.radius;
        if (this.x > width + this.radius) this.x = -this.radius;
        if (this.y < -this.radius) this.y = height + this.radius;
        if (this.y > height + this.radius) this.y = -this.radius;
      }
    }

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      nodes = [];
      for (let i = 0; i < nodeCount; i++) nodes.push(new Node());
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'screen';
      ctx.filter = 'blur(80px)';

      nodes.forEach(node => {
        node.update();
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius);
        grad.addColorStop(0, node.color);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = requestAnimationFrame(render);
    };

    window.addEventListener('resize', resize);
    resize();
    render();
  };

  /* ==========================================================================
     2. SHEETS LAYOUT (from sheets.js)
     ========================================================================== */
  const initSheetsLayout = () => {
    if (!document.body.classList.contains('sheets-enabled')) return;

    // Initialize Lenis for Smooth Scroll globally if not exists
    if (typeof Lenis !== 'undefined' && !window.lenis) {
      window.lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
      });

      function raf(time) {
        window.lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    const sections = document.querySelectorAll('section');
    const header = document.querySelector('.site-header');

    const updateSheets = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const container = section.querySelector('.container');
        if (!container) return;

        // Simple stacking logic
        if (rect.top <= 0 && rect.bottom > 0) {
          const progress = Math.abs(rect.top) / viewportHeight;
          const scale = 1 - (progress * 0.05);
          const opacity = 1 - (progress * 0.3);
          container.style.transform = `scale(${scale})`;
          container.style.opacity = opacity;
        } else {
          container.style.transform = 'scale(1)';
          container.style.opacity = '1';
        }
      });

      // Header Color Switch check
      const heroRect = document.querySelector('.hero')?.getBoundingClientRect();
      if (heroRect && heroRect.bottom < 60) {
        document.body.classList.add('header-dark');
        document.body.classList.remove('header-light');
      } else {
        document.body.classList.add('header-light');
        document.body.classList.remove('header-dark');
      }
    };

    window.addEventListener('scroll', updateSheets);
    updateSheets();
  };

  /* ==========================================================================
     3. MAIN INTERACTIVE ELEMENTS (from original main.js)
     ========================================================================== */
  const initMain = () => {
    // Mobile Menu
    const menuToggle = document.querySelector('.mobile-nav-toggle');
    if (menuToggle) {
      menuToggle.addEventListener('click', () => {
        document.body.classList.toggle('menu-open');
        if (window.lenis) {
          if (document.body.classList.contains('menu-open')) {
            window.lenis.stop();
          } else {
            window.lenis.start();
          }
        }
      });
    }

    // Close menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('menu-open');
        if (window.lenis) window.lenis.start();
      });
    });

    // Language Switcher (Circular version logic)
    const langSwitcher = document.querySelector('.lang-switcher');
    if (langSwitcher) {
      // Logic handled by CSS mostly, but could add active state tracking here
    }

    // Reveal on Scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  };

  /* Initialize everything on DOM Loaded */
  document.addEventListener('DOMContentLoaded', () => {
    initHeroGradient();
    initSheetsLayout();
    initMain();
  });

})();
