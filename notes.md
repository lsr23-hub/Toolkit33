# Notes: Card detail URL actions

## Findings
- `src/main.jsx` renders the detail modal in `ToolModal`.
- The source URL now displays the full `tool.url`, keeps the underline, uses the `Copy` icon, copies through the Clipboard API with an `execCommand` fallback, and shows an accessible success/error toast for 1.8 seconds.
- The lower action is now an external anchor labeled `点击跳转` with the `ExternalLink` icon.
- `src/styles.css` adds the source-link hover state, constrained mobile URL sizing, and theme-safe modal toast styling.

## 2026-09-07 Comfy-Org Card Research

- URL: `https://github.com/Comfy-Org`
- Official organization API: `https://api.github.com/orgs/Comfy-Org` identifies Comfy Org and links to `https://comfy.org`.
- Official project README: `https://raw.githubusercontent.com/Comfy-Org/ComfyUI/master/README.md` describes ComfyUI as a modular AI content-creation engine with a visual node graph for image, video, audio, 3D and text workflows, local installation options, cloud access and API integration.
- Added as `Comfy-Org` in category `视频创作`, sort order `73`, not featured.
