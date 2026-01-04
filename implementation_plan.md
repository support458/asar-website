# Implementation Plan - ASAR Website

Create a modern, one-page website with GSAP-powered scroll animations, featuring a transforming header and stacking card layout.

## User Requirements
- Large blue header (full height) transforms into a standard header on scroll.
- Stacking card effect (panels) where each card "pins" and the next one slides over or reveals.
- Navigation/pagination indicator (e.g., 1/8).
- Modern aesthetics inspired by provided screenshots.
- Technology: HTML5, Vanilla CSS, JavaScript, GSAP + ScrollTrigger.

## Proposed Architecture

### 1. HTML Structure
- `header`: Sticky/Fixed container for the transforming navigation.
- `main.container`: Wrapper for the scrollable panels.
- `section.panel`: Individual cards with content.
- `footer`: Fixed or relative footer as shown in screenshots.

### 2. Styling (CSS)
- Use a dark/premium color palette (Deep Blue/Purple gradients).
- "Card" look for sections: white background, rounded corners, subtle shadows.
- Fixed positioning for the header to handle height transition smoothly.
- Responsive design (handling 100vh vs 100dvh).

### 3. Animations (GSAP)
- `ScrollTrigger` for header: Scale down height from `100vh` to `80px` (or similar).
- `ScrollTrigger` for panels: Pin each panel as it hits the top, allowing the next to stack.
- Text animations: Entrance animations for card content.

## Steps

### Phase 1: Setup & Assets
- [ ] Create `index.html`, `style.css`, and `main.js`.
- [ ] Import GSAP and ScrollTrigger via CDN.
- [ ] Setup Google Fonts (Inter).

### Phase 2: Core Layout
- [ ] Implement the full-screen header structure.
- [ ] Create multiple content "cards" with placeholder text from screenshots.
- [ ] Style the cards to match the design (radius, shadow, alignment).

### Phase 3: Header Transformation
- [ ] Add GSAP animation to transition header height and background.
- [ ] Ensure content inside header scales/fades out appropriately.

### Phase 4: Card Stacking Effect
- [ ] Implement the pinning logic using `ScrollTrigger`.
- [ ] Add `snap` functionality for smooth transitions between cards.

### Phase 5: Polish & Content
- [ ] Replicate text content from images exactly.
- [ ] Add pagination numbers (1/8, 2/8, etc.).
- [ ] Add the floating bubbles/elements seen in Image 1.
- [ ] Finalize responsive adjustments.
