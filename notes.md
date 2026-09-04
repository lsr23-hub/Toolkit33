# Notes: 工具集 SQL 数据整理

## Source

- 输入文件：`raw/实用工具收录.md`
- 工具记录数：48（原始文件 44 条，后续新增 4 条）
- 已发现一条异常标签文本（GSAP 条目中的 `wwwawswawd`），按要求不写入数据库。

## Schema Notes

- `id` 使用 SQLite `INTEGER PRIMARY KEY`。
- `url` 使用 `UNIQUE` 约束，防止同一网址重复收录。
- `keywords` 使用 JSON 数组文本，例如 `["AI代理","工程"]`。
- `is_featured` 使用 `INTEGER NOT NULL DEFAULT 0`，兼容 SQLite 的布尔表达。
- 时间字段使用 ISO-8601 文本默认值 `strftime('%Y-%m-%dT%H:%M:%fZ','now')`。

## Category Mapping

- AI 编程：编码代理、AI 编程课程、AI Agent、AI 技能、AI 绘图提示词
- 部署运维：自托管、PaaS、服务器部署
- 前端设计：组件、动画、设计系统、浏览器自动化与前端工程
- 视频创作：代码视频、生成式视频、剪辑与镜头模板
- 素材资源：图片、视频、笔刷、纹理、样机、设计模板
- 科研成长：科研自动化、论文写作、求职面试、个人成长

## Impeccable UI Review

- `npm run build` passes and regenerates 48 tools from `sql/tools.sql`.
- Impeccable detector reports no generic implementation violations.
- Mobile viewport check at 375px has no horizontal overflow; cards are 343px wide.
- Saved filtering, reload persistence, modal focus return, and category arrow-key navigation passed in the local browser.
- Console verification returned no warnings or errors.

## Scope Boundary

- The UI refinement pass does not change SQL or tool records.

## 2026-09-04 New Card Data Skill

- The source of truth for tool records is `sql/tools.sql`; `scripts/build-tools.mjs` regenerates `src/data/tools.json` from it.
- Existing cards use the fields `name`, `url`, `category`, `keywords`, `description`, `icon_url`, `sort_order`, and `is_featured`.
- A project-level skill will research authoritative public sources and return or write a schema-compliant candidate record only when the user requests the relevant action.

## 2026-09-04 Requested Card Research

The user requested 18 new URLs. Duplicate check against `sql/tools.sql` and `src/data/tools.json` found no matching URL or name. Existing maximum `sort_order` is 48; new records are assigned 49-66 in the user's order.

### First-party evidence

- `https://github.com/alchaincyf/huashu-design` README: HTML-native design skill for agents; creates prototypes, slides, animations and infographics, with video export.
- `https://github.com/nexu-io/open-design` README: open-source Claude Design alternative; local-first desktop app for prototypes, landing pages, dashboards, slides, images and video, with HTML/PDF/PPTX/MP4 export.
- `https://blog.openbeetles.com/` and `https://blog.openbeetles.com/feed/`: Chinese Vibe Coding blog/solution site with practical front-end and AI coding terminology articles.
- `https://github.com/shengjidaguai-china/BossHunter` README: local job-search agent for job collection, AI scoring, human-confirmed applications, reply monitoring and tailored resumes.
- `https://github.com/headroomlabs-ai/headroom` README: compresses tool outputs, logs, files, RAG chunks and conversation context before they reach an LLM; library, proxy and MCP server.
- `https://www.futurepedia.io/`: AI tool and software discovery directory; homepage describes finding tools for more efficient work and life.
- `https://raw.githubusercontent.com/uiverse-io/galaxy/main/README.md`: official Uiverse organization repository describing Uiverse as a platform for browsing, searching and interacting with community-submitted UI elements.
- `https://yila.ai/zh/playbooks`: research agents covering topic validation, literature search, reading, review, analysis, writing, charts, posters and slides.
- `https://github.com/isjiamu/gzh-design-skill` README: Markdown to WeChat-ready inline HTML, themes, content formatting and validation.
- `https://raw.githubusercontent.com/JimLiu/baoyu-skills/main/README.md`: 20+ skills for AI agents including Claude Code and Codex, with WeChat article workflow modules.
- `https://github.com/sansan0/TrendRadar` README (master): multi-platform hot-topic aggregation, RSS, keyword filtering, AI translation/analysis, MCP and notifications.
- `https://github.com/imraywang/wewrite` README: WeChat content skill covering topic selection, sourcing, writing, review, optional images, formatting, drafts and multi-platform rewriting.
- `https://seneasy.cloud/`: WeChat article layout, AI illustrations and Markdown editing.
- `https://tophub.today/`: aggregates hot lists from WeChat, Toutiao, Baidu, Zhihu, V2EX, Weibo, Tieba, Douban, GitHub, Douyin and more.
- `https://www.canva.cn/`: official Canva China homepage; title/branding and the page's online-design purpose were verified, while the bot-facing response did not expose a detailed product description.
- `https://www.lingkechaci.com/`: sensitive/violation word detection for Xiaohongshu, Douyin, Kuaishou and Bilibili content.
- `https://bloub.vercel.app/`: animated SVG avatar morphing among 14 states, based on the x.ai bot avatar.
- `https://ant.design/index-cn`: Ant Design enterprise UI language and React component library.

### Limitation

- `https://uiverse.io/` returned a Cloudflare challenge, so the record was verified against the official `uiverse-io/galaxy` README instead.

## 2026-09-03 Expandable Card Motion

- Input reference: `/Users/threeliu/.codex/attachments/69baa915-6d7d-4ed9-af0c-d33f1250d5ef/pasted-text.txt`.
- Target flow: compact tool card (site icon, name, keywords) -> click or keyboard activation -> centered expanded card with introduction and website action -> close back to the source card.
- Preserve: 48 tool records, category order/sidebar behavior, search, saved filter, theme, and outbound URLs.
- Implementation direction: use FLIP geometry with the Web Animations API for source-to-dialog continuity, keep the existing CSS entrance as a fallback, and provide a reduced-motion path.
- Icon direction: render each record's generated `icon_url`, then fall back to the website origin favicon and finally a text mark if both requests fail.

### Verification

- `npm run build` passed: Vite built 1819 modules and regenerated exactly 48 tool records.
- `git diff --check` passed.
- Desktop 1280 x 720: all 48 compact cards render; the first favicon loaded; collapsed cards contain no introduction text; expanded card measured 620 x 406.66 px and displayed the project name, keywords, introduction, URL, save action, and visit action.
- Mobile 390 x 844: compact card measured 362 x 109 px; expanded card measured 370 x 458.94 px; content stayed inside the viewport with no horizontal overflow.
- Motion evidence: at 70 ms the expanded card had a non-identity transform (`matrix(0.99656, 0, 0, 0.878679, 0, 0.0894999)`) and opacity `0.97136`; after 500 ms it settled at `transform: none` and opacity `1`.
- Interaction evidence: modal focus starts on the close button; `Ctrl+K` cannot move focus to the background search; closing returns focus to the originating detail button; a rapid open -> 50 ms -> close completes without leaving a dialog or locked body.
- Console: no application warnings or errors in desktop, mobile, expanded, or rapid-close checks.
- Impeccable detector: four warnings, all for the incumbent Inter font declaration; no card-motion-specific finding. The global font system was intentionally left unchanged.
- Independent code review: no remaining blockers in `src/main.jsx` or `src/styles.css`.

## 2026-09-03 VibeHub Sidebar QA

- Desktop sidebar is sticky at `top: 96px` once the directory reaches the viewport and does not overlap the masthead at the top of the page.
- The active category exposes `aria-current="location"` and follows section scrolling.
- Mobile QA found that button-level `scrollIntoView` moved both the horizontal category strip and the document, interrupting category jumps.
- Resolution: scroll only the `.sidebar-list` container horizontally and restore `全部` when the directory remains below the active viewport threshold.
- Category jumps lock the requested active item until its section arrives, then release through the Observer, `scrollend`, or a 1200ms fallback so interrupted smooth scrolling cannot disable later scroll tracking.

## 2026-09-03 UI Redesign Brief

- Target: redesign the existing React/Vite frontend as a practical tool directory.
- Primary reference: `https://www.futurepedia.io/` for browse/search hierarchy and directory layout.
- Card interaction reference: `https://ui.aceternity.com/components/expandable-card` using the Standard expandable-card behavior.
- Existing data contract: preserve all 48 records from `src/data/tools.json` and the current search, category, saved-tool, theme, and outbound-link capabilities unless the selected design makes a different presentation necessary.
- Current worktree already contains user-owned changes in `src/main.jsx` and `src/styles.css`; do not overwrite or revert them during ideation.
- Product Design constraint: generate exactly 3 independent visual directions and wait for user selection before implementation.

## Reference Capture Evidence

- The Futurepedia and Aceternity pages were captured and inspected in-browser during ideation; temporary captures were removed after the design concepts were exported.
- Shared interaction finding: compact rows remain visible behind a dimmed backdrop while the selected row expands into a centered detail surface with a larger image/logo, description, close control, and primary action.
- Shared directory finding: search and category navigation must appear before or alongside the first tool rows; the tool list, not a marketing hero, is the primary product surface.
- Three independent 1440 x 1024 visual directions were generated in the conversation; application source files were not edited during ideation.
- Image Gen visibility recovery: built-in generations produced no visible or locally recoverable image files. The user approved local HTML/CSS concept pages and PNG exports as the fallback.

## Local Concept Deliverables

- Option 1 interactive page: `design-options/option-1.html`
- Option 2 interactive page: `design-options/option-2.html`
- Option 3 interactive page: `design-options/option-3.html`
- Shared files: `design-options/concept.css`, `design-options/concept.js`
- Each option has a `1440 x 1024` overview PNG and expanded-state PNG in `design-options/screenshots/`.
- Browser checks: all three options have `scrollWidth === viewportWidth`, no console warnings/errors, visible dialog state, working row-to-detail content changes, close button, outside click, and Escape close behavior.
- Project check: `npm run build` passes and regenerates exactly 48 tools.
- Scope: `src/main.jsx`, `src/styles.css`, SQL, and tool records were not changed by the concept fallback.
