/**
 * ASAR Sheets Layout JS
 * Managing the footer reveal, dynamic heights, overlapping shadows, and header color inversion.
 */

(function () {
    'use strict';

    function initSheets() {
        if (!document.body.classList.contains('sheets-enabled')) return;

        const main = document.querySelector('main');
        const sections = document.querySelectorAll('section');
        const header = document.querySelector('.site-header');
        const footer = document.querySelector('.site-footer') ||
            document.querySelector('.global-footer') ||
            document.querySelector('footer');
        const supportsZoom = typeof CSS !== 'undefined' &&
            typeof CSS.supports === 'function' &&
            CSS.supports('zoom', '1');

        if (!main || !footer || !header) return;

        // 0. Static Stacking (Prevents Z-index switching jitter)
        

        // 1. Footer Reveal Setup
        footer.style.position = 'fixed';
        footer.style.bottom = '0';
        footer.style.left = '0';
        footer.style.width = '100%';
        footer.style.zIndex = '1';
        footer.style.visibility = 'hidden';
        main.style.position = 'relative';
        main.style.zIndex = '2';

        function updateFooterSpace() {
            main.style.marginBottom = footer.offsetHeight + 'px';
        }

        function updateSectionContentFit() {
            sections.forEach((section) => {
                const content = section.querySelector(':scope > .container');
                if (!content) return;

                content.style.zoom = '';
                content.style.transform = 'none';
                content.style.width = '';
                content.style.marginLeft = '';
                content.style.marginRight = '';

                const sectionStyles = window.getComputedStyle(section);
                const paddingTop = parseFloat(sectionStyles.paddingTop) || 0;
                const paddingBottom = parseFloat(sectionStyles.paddingBottom) || 0;
                const availableHeight = Math.max(section.clientHeight - paddingTop - paddingBottom, 1);
                const availableWidth = Math.max(section.clientWidth, 1);
                const naturalHeight = Math.max(content.scrollHeight, 1);
                const naturalWidth = Math.max(content.scrollWidth, 1);
                const baseScale = parseFloat(window.getComputedStyle(document.body)
                    .getPropertyValue('--sheet-device-scale')) || 1;
                const fitByHeight = availableHeight / naturalHeight;
                const fitByWidth = availableWidth / naturalWidth;
                const fitScale = Math.min(1, fitByHeight, fitByWidth);

                // Stabilization: round to 3 decimals to prevent micro-jitter from 0.0001 changes
                let finalScale = Math.min(baseScale, fitScale);
                finalScale = Math.round(finalScale * 1000) / 1000;

                section.style.setProperty('--sheet-content-scale', String(finalScale));

                if (supportsZoom) {
                    content.style.zoom = String(finalScale);
                } else {
                    content.style.transform = `scale(${finalScale})`;
                    content.style.transformOrigin = 'top center';
                    if (finalScale < 1) {
                        content.style.width = `calc(100% / ${finalScale})`;
                        content.style.marginLeft = 'auto';
                        content.style.marginRight = 'auto';
                    }
                }
            });
        }

        // 2. Optimized scroll updates using requestAnimationFrame
        let ticking = false;

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    updateVisuals();
                    ticking = false;
                });
                ticking = true;
            }
        }

        const sectionData = new Map();
        const observerOptions = {
            root: null,
            threshold: [0, 0.25, 0.5, 0.75, 1]
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const rect = entry.boundingClientRect;
                const section = entry.target;

                // Track intersection ratio and position
                sectionData.set(section, {
                    ratio: entry.intersectionRatio,
                    top: rect.top,
                    bottom: rect.bottom
                });
            });
            // Removed direct updateVisuals() call from observer to prevent layout thrashing
        }, observerOptions);

        sections.forEach(sec => observer.observe(sec));

        // Ensure visuals are updated on every scroll for sub-pixel precision in stationary sheets
        

        function updateVisuals() {
            const scrollY = window.scrollY;
            const viewportHeight = window.innerHeight;
            let currentActiveSection = null;
            let currentBtnSection = null;

            // Threshold for mobile menu button (roughly 80px from bottom viewport)
            const mobileBtnThreshold = viewportHeight - 80;

            

            // Apply active section and button tracking for other potential logic
            // (Removed color-switching logic as it's now handled by CSS mix-blend-mode)

            // Footer visibility and Shadow
            const documentHeight = document.documentElement.scrollHeight;
            const revealActivationLine = documentHeight - footer.offsetHeight * 1.5;

            if (scrollY + viewportHeight > revealActivationLine) {
                footer.style.visibility = 'visible';
                footer.style.opacity = '1';
                main.classList.add('is-revealing-footer');
            } else {
                footer.style.visibility = 'hidden';
                footer.style.opacity = '0';
                main.classList.remove('is-revealing-footer');
            }
        }

        // Helper to determine if color is dark or light
        function isColorDark(color) {
            let r, g, b;
            if (color.startsWith('rgb')) {
                const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
                r = parseInt(match[1]);
                g = parseInt(match[2]);
                b = parseInt(match[3]);
            } else {
                return false; // Default to light
            }
            // HSP color model brightness formula
            const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
            return hsp < 150;
        }

        window.addEventListener('scroll', onScroll, { passive: true });

        let lastWindowWidth = window.innerWidth;
        let lastWindowHeight = window.innerHeight;
        let resizeTimeout;

        function handleResize() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                const currentWidth = window.innerWidth;
                const currentHeight = window.innerHeight;

                // Only update scale if width changed OR height changed significantly (> 100px)
                // This prevents jitter from mobile URL bar toggling.
                const widthChanged = currentWidth !== lastWindowWidth;
                const heightChangedSignificant = Math.abs(currentHeight - lastWindowHeight) > 100;

                if (widthChanged || heightChangedSignificant) {
                    updateFooterSpace();
                    updateSectionContentFit();
                    updateVisuals();

                    lastWindowWidth = currentWidth;
                    lastWindowHeight = currentHeight;
                }
            }, 150); // Small debounce
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener('load', () => {
            // Force first run
            updateFooterSpace();
            updateSectionContentFit();
            updateVisuals();
        });
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                updateFooterSpace();
                updateSectionContentFit();
                updateVisuals();
            }).catch(() => { });
        }

        // Initial setup
        updateFooterSpace();
        updateSectionContentFit();
        updateVisuals();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSheets);
    } else {
        initSheets();
    }
})();


