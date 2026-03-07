# AI Agent Root Rules

These rules are strict guidelines for ANY AI assistant (Cursor, Copilot, Antigravity, Gemini, etc.) working on the **asar.consulting** project.

## 1. Primary Design Source of Truth
**Mandatory Action:** Before modifying any CSS, HTML, components, or UI elements, you MUST read the design rules located at `docs/design/designrules.md`.

## 2. Strict Adherence to Variables (`assets/css/variables.css`)
- **Action:** For ANY styling (colors, margin, padding, shadows, radii, font sizes), you **MUST** use existing CSS custom properties (variables) defined in `assets/css/variables.css`.
- **Forbidden:** Do NOT use hardcoded HEX colors (e.g., `#FFFFFF`), exact pixel values for spacings (e.g., `15px`), or specific `rem`/`em` dimensions unless they are mapped directly to a CSS variable (e.g., `var(--color-bg-base)`, `var(--space-md)`).

## 3. Zero Improvisation
- **If a token is missing:** If the user asks for a design element that lacks an exact match in the `variables.css` file (for example, a new blue shade or a 50px vertical gap), you MUST STOP.
- **Action:** DO NOT make assumptions or write code. You MUST pause and explicitly ask the user for clarification (e.g., *"There is no variable for 50px in variables.css. Should I add a new one, or use the existing `--space-xl`?"*). Proceed only after receiving a direct answer.

## 4. No Inline Styles
- You MUST NOT use `<div style="...">` inside any HTML files. All UI modifications must be executed using CSS classes that rely on variables from `assets/css/variables.css`.

## 5. Localization Consistency
- The project supports multiple languages (`ru/`, `en/`, `uz/`, `zh/`). Changes made to layout should exclusively involve `assets/css/main.css` or the related modular CSS files in `assets/css/`. Never create isolated CSS architectures unlinked to `main.css`.

**WARNING:** Bypassing these rules is considered a critical error. Adhere strictly to this project's design system.
