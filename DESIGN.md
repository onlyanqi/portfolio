# Portfolio design direction

## Brief
Restore Anqi's original pastel palette and Playfair Display / JetBrains Mono typography, repair icon alignment, and incorporate the September 2026 résumé. Retain the working site structure, creative concepts, and GitHub Pages deployment.

## Design tokens
- Blush `#f8edf2`: base.
- Pink `#f4dfe9`, lavender `#e5dff2`, mist `#e1edf0`: soft ambient color.
- Ink `#292b32`: primary text.
- Plum `#685474`: links and focus outlines.
- Playfair Display: display and section headings.
- Inter: readable body text, as in the original portfolio.
- JetBrains Mono: navigation, dates, and brief labels.

## Layout
A large DIGITAL masthead recalls the supplied screenshot. Beneath it, left-aligned professional introduction and the original connected-systems cube illustration in lavender and muted teal balance the technical and creative sides. Existing biography, career, explorations, skills, certifications, and contact remain; complete education is added from the new résumé.

Desktop: [name | navigation | resume + theme] / [small introduction | DIGITAL] / [intro + CTA | systems diagram] / [existing sections]
Mobile: [name | resume + theme + menu] / [DIGITAL] / [intro] / [systems diagram] / [stacked content]

## Review against the brief
The prior dark amber palette, Arial display, font-dependent symbols did not match the user's preferred identity. Keep the original systems illustration and its backend, cloud, reliability, design, and build labels, recolored for both palettes. Restore the requested colors and families; use one shared 24-unit SVG icon system, 44px control targets, and explicit flex alignment. Keyboard focus remains visible but uses a restrained 2px outline. The light palette is the default for this version; an intentional night palette is still available.

## Applied skills
- [Personal Site Skill](https://github.com/Tufeiii/Personal-Site-Skill/blob/main/SKILL.md): Mode C enhancement, grounded résumé content, preserved sections, SVG icons, responsive checks at 375/768/1440. Existing separate CSS/JS assets are retained for maintainability. Style discovery is already resolved by the user's screenshot.
- [Anthropic frontend-design](https://github.com/anthropics/skills/blob/main/skills/frontend-design/SKILL.md): brief-specific palette and typography, restrained motion, alignment discipline, visual critique.
