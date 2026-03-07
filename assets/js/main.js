(() => {
  /* =========================================================================
     ASAR Consulting - Main JavaScript
     Handles animations, smooth scrolling, mobile nav, and language routing.
     ========================================================================= */

  let globalLenis = null;

  // 1. Initialize Lenis for Smooth Scrolling
  function initLenis() {
    if (typeof Lenis !== "undefined") {
      globalLenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        wheelMultiplier: 1,
        infinite: false,
      });

      function raf(time) {
        globalLenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }
  }

  // 2. Global Header Scroll Effect
  function initHeader() {
    const header = document.querySelector('.global-nav');
    if (!header) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // 3. Scroll Reveal Animations (Apple-like fade up)
  function initReveal() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1
    });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }

  // 4. Language Switcher Routing
  function initLangSwitcher() {
    const dropdownLinks = document.querySelectorAll('.lang-dropdown a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = link.getAttribute('data-lang');
        const currentPath = window.location.pathname; // e.g., /ru/solutions.html

        // Remove the current language prefix and append the new one
        const pathSegments = currentPath.split('/').filter(p => p);
        if (pathSegments.length > 0) {
          // Remove the first segment (which is the lang code)
          pathSegments.shift();
        }

        const newPath = '/' + targetLang + '/' + pathSegments.join('/');
        window.location.href = newPath;
      });
    });
  }

  // 5. Active Nav Highlighting
  function initActiveNav() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      // Simple match: if current path contains the href (e.g., 'solutions.html')
      if (href && currentPath.includes(href)) {
        link.classList.add('active');
      } else if (href === 'index.html' && (currentPath.endsWith('/ru/') || currentPath.endsWith('/en/') || currentPath.endsWith('/uz/') || currentPath.endsWith('/zh/'))) {
        link.classList.add('active');
      }
    });
  }

  // 6. Mobile Menu Toggle
  function initMobileNav() {
    const navToggle = document.querySelector('.mobile-nav-toggle');

    if (navToggle) {
      navToggle.addEventListener('click', (e) => {
        // Stop propagation in case there is another click handler on the body blocking it
        e.stopPropagation();

        document.body.classList.toggle('menu-open');
        navToggle.classList.toggle('menu-open'); // To trigger the X animation

        // Prevent scrolling using Lenis to avoid ScrollTrigger layout shifts
        if (document.body.classList.contains('menu-open')) {
          if (globalLenis) globalLenis.stop();
        } else {
          if (globalLenis) globalLenis.start();
        }
      });

      // Close menu when clicking on links
      const mobileLinks = document.querySelectorAll('.mobile-link');
      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          document.body.classList.remove('menu-open');
          navToggle.classList.remove('menu-open');
          if (globalLenis) globalLenis.start();
        });
      });
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLenis();
    initHeader();
    initReveal();
    initLangSwitcher();
    initActiveNav();
    initMobileNav();
  });
})();
