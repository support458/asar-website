
## 🎨 UI/UX Design Guide: asar.consulting

### 1. Цветовая палитра (Color Palette)

Основана на сочетании глубокого темно-синего («Midnight Blue») и теплых песочно-бежевых оттенков для создания ощущения премиальности и спокойствия.

| Элемент | HEX Код | Роль в дизайне |
| --- | --- | --- |
| **Accent (Deep Navy)** | `#0F0054` | Логотип, иконки, статус-баджи, акценты. |
| **Background Base** | `#FCF6EF` | Основной фоновый цвет (теплое молоко). |
| **Sand Shade** | `#E6DFD3` | Вспомогательный цвет для градиентов/слоев. |
| **Text Main** | `#1A1A1A` | Заголовки, основной текст. |
| **Text Muted** | `#6B7280` | Подзаголовки, пояснения, копирайт. |
| **Glass Stroke** | `rgba(255,255,255, 0.5)` | Границы карточек и разделители. |

---

### 2. Типографика (Typography)

Основной шрифт: **Manrope** (современный геометрический гротеск).

* **Logo Text:**
* `asar` — Weight: **800 (ExtraBold)**.
* `.consulting` — Weight: **400 (Regular)**.

* **Main Subtitle:**
* Size: `14px` (Desktop) / `10px` (Mobile).
* Transform: **UPPERCASE**, Letter-spacing: `0.1em`.

* **Section Titles:**
* Size: `24px` (Desktop) / `20px` (Mobile).
* Weight: **700 (Bold)**.

* **Body Text:**
* Size: `16px` (Desktop) / `14px` (Mobile).
* Line-height: `1.625`.

* **Labels (Contact/Status):**
* Size: `12px` / `10px`.
* Weight: **600 (SemiBold)**.


---

### 3. Формы и Визуальные элементы

Дизайн строится на концепции **Glassmorphism** (стеклянный эффект) и динамических геометрических примитивов.

* **Центральная карточка:**
* Background: `rgba(255, 255, 255, 0.3)` с эффектом `backdrop-filter: blur(25px)`.
* Border-radius: `24px (1.5rem)`.
* Shadow: Мягкая тень с оттенком акцентного синего.


* **Геометрия фона:**
* Использование **гигантских треугольников** с низкой прозрачностью (`2%`).
* Плавная анимация вращения и перемещения (Wandering shapes).


* **Декоративные элементы:**
* `deco-line`: Тонкая линия (4px) акцентного цвета в верхней части карточки.
* `noise-overlay`: Тонкий слой процедурного шума (opacity 5%) для прибавления «текстурности» фону.
* `Canvas Particles`: Интерактивная сетка мелких черточек, реагирующих на движение мыши.



---

### 4. Интерактивные состояния (Micro-interactions)

1. **Status Badge:** Пульсирующая белая точка (Pulse animation) рядом с текстом «Сайт находится в разработке».
2. **Contact Cards:** При наведении (hover) фон плашки становится чисто белым, иконка меняет цвет с синего на белый, а круг вокруг неё заливается синим.

### Рекомендация для дизайнера:

При разработке полной версии сайта придерживайтесь **сетки с большими отступами (white space)**. Используйте Manrope как единственный шрифт, играя только с его насыщенностью (Weight) от 300 до 800. Избегайте острых углов у кнопок — используйте скругление `12px` или `full (pill-shaped)`.


### ВАЖНО! возможно использовать как вдохновение для дизайн правил:

Apple.com Design Analysis and Best Practices
Overview of Apple’s Web‑Design Philosophy

Apple’s corporate site has evolved through minimalism since the early 2010s.
The current design prioritises simplicity, clear typography and spacious layouts.
Product pages are built around hero sections featuring large photographic content, short marketing headlines and a few call‑to‑action buttons.
This gives users a linear journey from the top of the page to the bottom.
The colour palette is predominantly black text on white backgrounds with accent colours appearing only on buttons (blue) or banners – a strategy that emphasises clarity and avoids distracting users.

Apple’s design principles follow the company’s own Human‑Interface Guidelines (HIG): they favour clear hierarchy, consistent spacing, alignment and responsive layouts.
The design is adaptive: the same navigation bar scales down to a condensed menu on smaller devices.
The overall experience aims to feel like a native application on Apple devices rather than a typical website.

Global Navigation (Menu) Structure and Code
Layout and sizes

The global navigation bar sits at the top of every page.
It floats over page content and remains visible on scroll.
Historically the menu area was defined in CSS using a fixed width of 982 px and a height of 38 px, with each menu item given a fixed width of 117 px for equal spacing.
The navigation bar uses an image sprite for background states; using one image reduces HTTP requests and improves loading speed.

A simplified version of the historical Apple navigation bar can be recreated with the following HTML and CSS extracted from the design analysis:

<!-- simplified navigation markup -->
<div id="menu">
  <ul id="menu-list">
    <li id="menu-home"><a href="/">Home</a></li>
    <li id="menu-mac"><a href="/mac/">Mac</a></li>
    <li id="menu-ipad"><a href="/ipad/">iPad</a></li>
    <li id="menu-iphone"><a href="/iphone/">iPhone</a></li>
    <li id="menu-support"><a href="/support/">Support</a></li>
  </ul>
</div>

/* simplified CSS based on Apple’s menu */
#menu {
  width: 982px;         /* fixed width similar to Apple’s original nav */
  height: 38px;        /* height of navigation bar */
  margin: 18px auto;
  position: relative;
  z-index: 9998;
}
#menu-list {
  margin: 0;
  padding: 0;
}
#menu-list li {
  display: inline;
}
#menu-list li a {
  float: left;
  width: 117px;       /* fixed width per link */
  height: 0;
  padding-top: 38px;  /* vertical size created via padding */
  overflow: hidden;
  background-image: url('images/menu-background.jpg');
  background-repeat: no-repeat;
}
#menu-home a { background-position: 0 0; }
#menu-home a:hover { background-position: 0 -38px; }
/* similar rules for other links... */


In modern implementations Apple has adopted responsive design with flexible width using flexbox.
However, the logic remains: each menu item is equally spaced, and hover states are achieved through background‑position changes on a single sprite image, ensuring smooth interactions and fewer resource requests.

Styling features

Minimal icons and typography: The menu uses small glyph icons (Apple logo, shopping bag, search icon) and labels set in Apple’s San‑Francisco typeface.

Sub‑menus: Some categories (e.g., Store, Mac, iPad) open mega‑menus that float under the bar. These panels use a grid layout with large headings, icons and descriptive text.

Accessibility: Each link includes aria-label attributes for screen‑reader clarity, and there is sufficient colour contrast between text and background.

Typography and Colour

Apple uses its proprietary San‑Francisco font family across the site, adapting size and weight according to context.
Headings are typically set in large, thin weights while body copy uses regular weights to ensure readability.
The type sizes scale responsively: for example, the hero headline on a Mac product page may appear at 56–64 pt on desktop and automatically shrink to ~32 pt on mobile.

The colour palette is restrained.
Most text is black or dark gray on white backgrounds, with occasional light gray sections to separate content.
Interactive elements (buttons and links) use a consistent blue (#0071e3 on the 2026 site) reminiscent of Apple’s system blue.
This limited palette enhances visual clarity and supports accessibility.

Page Layout and Major Sections
Hero and product sections

Each product page begins with a hero section featuring a high‑resolution photograph or 3‑D render of the product, accompanied by a succinct headline and two call‑to‑action buttons (e.g., Learn more, Buy).
Spacing around the hero is generous, creating an immersive entry point.
Below the hero, the page is divided into thematic sections separated by white space, each introducing features with short copy and supporting images or videos.

Grid and responsiveness

Apple’s pages rely on a flexible grid.
On large screens, content may be organised in two or three columns, whereas on mobile each section stacks vertically.
Images are served in multiple resolutions via the srcset attribute and sizes to ensure the browser downloads the appropriate asset for the user’s screen, improving load times.

Navigation between major pages

Store pages: Provide product configuration tools. Users can select size, colour and storage options; UI components like dropdowns and steppers are large and tap‑friendly.

Support pages: Organised by product categories with search functionality.

About/Newsroom pages: Use editorial layouts with articles arranged in grids or lists, emphasising readability.

Form Design

Apple emphasises that web forms should feel native on iOS devices.
The Safari Web‑Content Guide notes that designers should consider the available area on mobile when the on‑screen keyboard appears. When the keyboard is visible, the content area shrinks to approximately 320 × 140 px on iPhone, so forms must scroll or resize gracefully.

Key recommendations from the guide include:

Compute available space: Designers should account for the heights of the status bar (20 px), URL field (60 px) and keyboard to determine how much vertical space is available.

Custom control styling: WebKit on iOS allows custom controls such as checkboxes and text fields using the -webkit-border-radius property. A custom checkbox can be styled with width/height and rounded corners, while rounded text fields can be achieved by setting -webkit-border-radius: 10px.

Autocorrect and autocapitalize: Developers can enable or disable automatic correction and set capitalization behaviour using attributes like autocorrect="on" and autocapitalize="words". This ensures forms behave predictably on mobile devices.

Liquid‑Glass (2025) Design Update

In 2025 Apple introduced “Liquid Glass” – a new visual style across its operating systems and website.
A design analysis explained that this style introduces translucency, layered blurs and a physical feel to digital surfaces.
Panels appear to hover over diffused backgrounds, and light bends across the interface, mimicking the way a drop of water focuses light.
The update blends subtle depth and tactility with minimalism, moving away from the stark flat design introduced in 2013.
According to the analysis, designers must balance aesthetic delight with usability; accessibility, contrast and performance still come first.

Guidelines for using Liquid Glass effects include:

Use translucency sparingly: Avoid stacking multiple translucent panels; one layer is usually sufficient to create depth while preserving legibility.

Maintain contrast: Ensure text and icons remain clear against blurred backgrounds. Apple’s design team emphasises that readability must not be compromised.

Performance considerations: CSS blurs and complex overlays can degrade performance on low‑end devices. Designers should provide fallbacks or avoid heavy effects on such devices.

Tools and Techniques for High‑Performance Sites

High‑quality design is only effective when pages load quickly. Google’s Web‑Dev resource emphasises several core performance techniques that apply to Apple‑like websites:

Use a Content Delivery Network (CDN): Serving assets from edge servers reduces the distance data travels and provides fine‑grained caching control. The web.dev guide notes that CDNs can cache HTML documents and static resources, yet many sites underutilise this feature. Caching static HTML even for a few minutes and moving dynamic logic to edge servers improves time‑to‑first‑byte (TTFB).

Reserve space for images and content: Core Web Vitals such as Cumulative Layout Shift (CLS) are improved by specifying width and height for images or using the aspect-ratio property. Without explicit dimensions, images load with an initial height of 0 px and cause layout shifts. Reserving space ensures visual stability.

Minimise long tasks and break up JavaScript: Interaction to Next Paint (INP) is sensitive to long tasks; the article recommends breaking tasks so the browser can respond quickly and yield control.

Avoid animations that trigger layout recalculation: Animating properties like width or margin often causes layout shifts. Pages that animate these properties have worse CLS scores.

By adopting these strategies—CDN distribution, explicit sizing, efficient scripting and careful animation—designers can achieve Apple‑like aesthetics without sacrificing speed or usability.

Conclusion

Apple’s website design combines minimalism, strong typography and high‑resolution imagery with performance‑focused development. The global navigation bar demonstrates an elegant balance of equal spacing and sprite‑based hover states. Forms are designed with mobile constraints in mind, using custom controls and proper attributes. The 2025 Liquid Glass update introduces translucent layers and blur effects to create depth, but Apple emphasises moderation and performance. Performance guidelines from web.dev—use of CDNs, explicit sizing and efficient scripts—complement Apple’s aesthetic principles.

Designers aiming to emulate Apple.com should focus on clear hierarchy, consistent spacing, responsive grids and restrained colour, while also prioritising fast loading, accessibility and cross‑device consistency. The code examples above provide a starting point for building Apple‑style menus and forms, and the cited resources offer further guidance on performance and design best practices.