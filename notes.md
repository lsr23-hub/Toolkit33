# Notes: Card detail URL actions

## Findings
- `src/main.jsx` renders the detail modal in `ToolModal`.
- The source URL now displays the full `tool.url`, keeps the underline, uses the `Copy` icon, copies through the Clipboard API with an `execCommand` fallback, and shows an accessible success/error toast for 1.8 seconds.
- The lower action is now an external anchor labeled `点击跳转` with the `ExternalLink` icon.
- `src/styles.css` adds the source-link hover state, constrained mobile URL sizing, and theme-safe modal toast styling.
