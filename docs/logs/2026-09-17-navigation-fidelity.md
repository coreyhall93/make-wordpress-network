# Navigation fidelity pass

This pass updates the local prototypes only. No WordPress.org repository or production code was changed.

## Upstream source map

- Global header rendering: `WordPress/wporg-mu-plugins/mu-plugins/blocks/global-header-footer/header.php`
- Global menu data: `WordPress/wporg-mu-plugins/mu-plugins/blocks/global-header-footer/blocks.php`
- Global header layout: `WordPress/wporg-mu-plugins/mu-plugins/blocks/global-header-footer/postcss/header/`
- Local navigation rendering and behavior: `WordPress/wporg-mu-plugins/mu-plugins/blocks/local-navigation-bar/`
- Make blog integration and team-title treatment: `WordPress/wordpress.org/wordpress.org/public_html/wp-content/themes/pub/wporg-breathe-2024/`
- Shared typography, colors, layout, and spacing: `WordPress/wporg-parent-2021`

## Details incorporated

- Official WordPress.org W-mark SVG.
- Global menu labels and ordering, including Swag.
- Desktop global-header height of 70px, with the upstream short-screen 60px behavior.
- Local-navigation height of 60px.
- Inter at 14px for both navigation systems.
- Charcoal 2 (`#23282d`) header background and Blueberry (`#3858e9`) Get WordPress button.
- Responsive edge spacing based on `clamp(24px, 100vw / 18, 80px)`.
- Upstream-style focus rings, hover states, submenu carets, and mobile breakpoint at 890px.
- Make team icons in the current-team control.

## Product changes retained

The prototypes still propose a separate `Make WordPress` home destination and current-team switcher. Those are intentional information-architecture changes, styled inside the real local-navigation shell.
