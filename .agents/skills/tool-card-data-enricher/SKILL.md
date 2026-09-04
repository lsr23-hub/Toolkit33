---
name: tool-card-data-enricher
description: Research a named website or project from its URL and complete a schema-compatible tool card with category, keywords, Chinese description, icon URL, and ordering. Use when adding or enriching entries in this project's tool directory.
---

# 新卡片数据补充

根据用户提供的项目名称和网址，联网核实项目内容，生成或写入一条符合本项目数据契约的工具卡片记录。此技能面向当前仓库；不要把它用于无关项目的数据建模或泛泛的网站摘要。

## 输入边界

- 需要同时获得项目名称和公开网址。缺少任一项时先询问，不要猜测网址。
- “研究/给我字段建议”只输出候选记录，不修改仓库。
- “添加/收录/补充到工具集”明确授权写入时，研究完成后更新数据源；不要等待重复确认。
- 只做公开页面的读取。不要登录、提交表单、上传文件或向第三方发送数据。

## 工作流程

1. 先读取 [references/data-contract.md](references/data-contract.md)，再检查 `sql/tools.sql` 和 `src/data/tools.json` 中是否已有相同 URL 或同名条目。`sql/tools.sql` 是源文件，`src/data/tools.json` 是生成物。
2. 打开用户给出的 URL。优先读取官网首页、官方文档、GitHub 仓库 README 或项目自己的说明页；必要时用同一项目的第二个一手页面交叉核实。记录实际访问过的来源 URL，不要把搜索摘要当作项目事实。
3. 从页面标题、首屏说明、功能列表和仓库说明中确认：项目是什么、核心能力是什么、适合什么使用场景。无法确认的内容不要写进简介。
4. 按现有分类选择一个最贴切的 `category`。只能使用契约中已有分类；若项目明显不适合现有分类，说明冲突并请求用户决定，不要擅自新建分类。
5. 生成字段候选。关键词应为 3 个互不重复、便于搜索的中文短语；简介使用简洁、事实性中文，说明“是什么 + 主要能力 + 适用场景”，避免夸大、空泛的“强大/领先/一站式”等营销词。
6. 从 URL 的解析后 hostname 生成 `icon_url`：`https://icons.duckduckgo.com/ip3/<hostname>.ico`。保留实际项目子域名；不要把路径、查询参数或片段放入图标地址。
7. `sort_order` 使用现有最大值加 1；`is_featured` 默认 `0`，只有用户明确要求推荐/精选时才设为 `1`。已有 URL 时不要插入重复行：按用户意图更新现有记录或先报告重复。
8. 输出候选记录和来源。若用户要求写入，使用最小补丁更新 `sql/tools.sql`，不要手改 `src/data/tools.json`，然后运行 `npm run data` 生成它。
9. 写入后核对 URL 唯一性、字段非空、关键词为合法 JSON 数组和记录总数；至少运行 `npm run data` 与 `npm test`，涉及构建时再运行 `npm run build`。报告改动文件和未触碰的用户文件。

## 输出格式

研究结果先给出事实依据，再给出以下记录。`keywords` 在 SQL 中是 JSON 字符串，在报告中可先用 JSON 数组展示：

```text
名称：...
网址：...
类别：...
关键词：["...", "...", "..."]
简介：...
图标：...
排序：...
精选：否

核实来源：
- ...
```

写入 SQL 时遵循 `INSERT OR IGNORE` 的现有格式，并正确转义单引号。若来源无法访问、内容互相矛盾或分类需要新建，明确标记不确定性并停止写入该条目。
