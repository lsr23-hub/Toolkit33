# Task Plan: 叁叁的实用工具集

## Goal
创建并持续维护一份 SQL 驱动的实用工具集网页，同时保持数据源、视觉设计和交互行为可验证。

## Phases
- [x] Phase 1: 确认数据库方言与字段设计
- [x] Phase 2: 整理源文件中的工具数据并重新分类
- [x] Phase 3: 生成 SQLite schema 与种子数据
- [x] Phase 4: 执行 SQL 并验证记录数、唯一性和字段完整性
- [x] Phase 5: 完成 Notion/Claude 风格 UI 重绘
- [x] Phase 6: 完成 Impeccable 视觉、响应式与无障碍复核
- [x] Phase 7: 审查现有前端与参考站点，生成 3 个 UI 视觉方向
- [x] Phase 8: 等待用户选择视觉方向并固化设计系统（用户选择方案 3）
- [x] Phase 9: 按选定方向实现 Futurepedia 式目录布局与 Standard 可扩展卡片
- [x] Phase 10: 完成桌面/移动端浏览器回归、交互验证与视觉对比
- [x] Phase 11: 参考 VibeHub 将分类导航改为桌面吸附侧栏与移动横向分类条
- [x] Phase 12: 修复移动端分类条纵向滚动干扰并完成最终浏览器回归
- [x] Phase 13: 按参考代码重构工具卡片的共享元素展开动效与站点图标
- [x] Phase 14: 验证桌面端、移动端、键盘、图标回退和减少动效路径
- [x] Phase 15: 创建项目级新卡片数据补充 skill，并校验其数据契约与调用说明

## Decisions Made
- 数据库：SQLite
- 工具来源：`raw/实用工具收录.md` 中的 44 条工具记录（另有 1 行总标题；工具标题格式不统一），并追加 4 条用户指定工具
- 忽略源文件的“标签”字段，重新生成 `category` 与 `keywords`
- `keywords` 使用 JSON 数组文本保存
- `icon_url` 使用网站域名生成 DuckDuckGo favicon 地址
- UI 保留可展开卡片、搜索、分类标签、已保存筛选、深色模式与 GSAP 动效
- 卡片媒体使用稳定的类别视觉块，避免远程随机图片造成加载与语义不确定性
- 新一轮 UI 参考 Futurepedia 的工具目录信息架构，并采用 Aceternity Standard expandable card 的卡片展开模式
- Product Design 工作流要求先生成 3 个视觉方向，用户选定后再修改应用代码
- 内置图片生成未返回可见或可保存结果；经用户确认后，改用本地 HTML/CSS 概念页并导出 PNG 供选择

## Errors Encountered
- 当前构建、检测器和浏览器回归均无错误。
- 2026-09-03：内置浏览器不提供 `document.getAnimations()` 诊断接口；改为读取卡片元素自身的动画状态与最终几何尺寸。
- 2026-09-03：Impeccable 检测器报告 4 条项目既有 Inter 字体警告；本轮不改全站字体，避免超出卡片动效范围。
- 2026-09-03：移动端活动分类使用 `scrollIntoView` 时会同时改变页面纵向位置；改为只更新 `.sidebar-list.scrollLeft`，分类跳转与活动项跟随均恢复正常。
- 2026-09-03：Browser helper 不支持 `networkidle` 等待状态；改用受支持的 `load` + 短暂渲染等待，不影响页面验证。
- 2026-09-03：内置 Image Gen 三次未生成可见或本地可恢复文件；用户确认使用本地 HTML/CSS 概念截图作为替代。
- 2026-09-03：Browser locator 不能向非输入型 `h2` 节点直接发送 `Escape`；改用页面级键盘事件验证关闭行为。

## Status
**Completed** - 项目级 `tool-card-data-enricher` skill 已创建并通过官方校验，可根据项目名称和网址联网补充工具卡片字段。

## 2026-09-04 User-Requested Card Additions

- [x] Phase 1: Read the card data contract and check duplicate URLs/names
- [x] Phase 2: Research the 18 requested public pages and first-party READMEs
- [x] Phase 3: Append verified records to `sql/tools.sql`
- [x] Phase 4: Regenerate `src/data/tools.json` and run data, test, and SQL integrity checks

### Status
**Completed** - All 18 requested records were added; `uiverse.io` was verified through the official `uiverse-io/galaxy` README because the supplied page returned Cloudflare 403.

### Research limitation
- `https://uiverse.io/` returned a Cloudflare challenge. Its description was verified through the official `uiverse-io/galaxy` repository README.
