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
- 效率工具：任务管理、项目管理、网页数据处理
