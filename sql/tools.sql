-- 叁叁的实用工具集：SQLite schema 与初始数据
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS tools (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  keywords TEXT NOT NULL CHECK (json_valid(keywords)),
  description TEXT NOT NULL,
  icon_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  is_featured INTEGER NOT NULL DEFAULT 0 CHECK (is_featured IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_tools_category_sort
  ON tools (category, sort_order, id);

CREATE INDEX IF NOT EXISTS idx_tools_featured
  ON tools (is_featured, sort_order, id);

INSERT OR IGNORE INTO tools
  (name, url, category, keywords, description, icon_url, sort_order, is_featured)
VALUES
  ('mattpocock/skills', 'https://github.com/mattpocock/skills', 'AI 编程', '["AI代理","工程","技能"]', 'Matt Pocock 公开的实战型 agents 技能集合，提供可直接复用的编码规范、工程流程和领域工作方法，适合扩展 Claude Code、Codex 等编码代理。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 1, 1),
  ('ai-coding-academy', 'https://github.com/yan314071-dev/ai-coding-academy', 'AI 编程', '["AI编程","课程","入门"]', '中文交互式 AI 编程课程，按 8 章 29 课讲解提示词、代码生成、调试和协作等基础概念，适合系统入门 AI 辅助开发。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 2, 0),
  ('openship', 'https://github.com/oblien/openship', '部署运维', '["部署","运维","自托管"]', '面向自有服务器的开源部署平台，用于管理应用发布、运行环境和基础设施，适合希望减少第三方 PaaS 依赖的团队。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 3, 0),
  ('coolify', 'https://github.com/coollabsio/coolify', '部署运维', '["部署","运维","PaaS"]', '可自托管的开源 PaaS，支持静态站点、数据库、全栈应用和大量一键服务，定位类似 Vercel、Heroku、Netlify 的自建替代方案。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 4, 1),
  ('dokploy', 'https://github.com/Dokploy/dokploy', '部署运维', '["部署","运维","VPS"]', '开源应用部署平台，提供接近 Vercel、Netlify、Heroku 的项目发布体验，适合在自己的 VPS 或服务器上部署 Web 服务。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 5, 0),
  ('holopixai', 'https://holopix.cn/home', '素材资源', '["AI视觉","游戏美术","生成"]', '面向游戏美术设计的 AI 工具，强调低门槛和可控生成，可用于角色、场景、道具等视觉资产的概念设计与迭代。', 'https://icons.duckduckgo.com/ip3/holopix.cn.ico', 6, 0),
  ('gsap-skills', 'https://github.com/greensock/gsap-skills', '前端设计', '["前端","动画","GSAP"]', 'GSAP 官方 AI 技能集合，帮助编码代理正确使用 GreenSock 动画平台、常见动画模式和插件，减少 API 误用与低质量实现。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 7, 1),
  ('ponytail', 'https://github.com/DietrichGebert/ponytail', 'AI 编程', '["AI代理","工程","简化"]', '用于约束 AI 代理行为的轻量技能，鼓励优先采用简单方案、减少不必要代码和过度设计，适合纳入日常编码代理工作流。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 8, 0),
  ('playwright-mcp', 'https://github.com/microsoft/playwright-mcp', '前端设计', '["浏览器自动化","测试","MCP"]', '微软提供的 Playwright MCP 服务，让 AI 代理通过结构化浏览器操作访问网页、填写表单、执行交互和验证页面行为。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 9, 0),
  ('taste-skill', 'https://github.com/Leonxlnx/taste-skill', '前端设计', '["前端","视觉效果","设计判断"]', '为 AI 编码代理补充设计判断力的技能，针对模板化、单调和缺乏层次的界面输出提供视觉与交互约束。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 10, 0),
  ('impeccable', 'https://github.com/pbakaus/impeccable', '前端设计', '["前端","设计系统","UI"]', '面向 AI 开发工具的设计语言与规则集合，用于改善组件组合、排版、配色和整体界面质量，帮助代理产出更一致的产品 UI。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 11, 0),
  ('strix', 'https://github.com/usestrix/strix', '安全测试', '["安全","测试","渗透"]', '开源 AI 渗透测试工具，可对应用执行安全探测、复现潜在漏洞并辅助修复，适合纳入开发阶段的安全检查流程。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 12, 0),
  ('awesome-llm-apps', 'https://github.com/Shubhamsaboo/awesome-llm-apps', 'AI 编程', '["AI应用","案例","RAG"]', '收集 100 多个开源 AI Agent、Agent Skill 和 RAG 应用，适合查找可运行示例、技术组合和项目灵感。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 13, 1),
  ('vibehub', 'https://vibe-hub.org/', 'AI 编程', '["AI编程","学习","术语"]', '用大白话解释前端、后端和 AI 开发术语的知识图鉴，帮助快速理解 Vibe Coding 生态中的概念和工具名称。', 'https://icons.duckduckgo.com/ip3/vibe-hub.org.ico', 14, 0),
  ('hyperframes', 'https://github.com/heygen-com/hyperframes', '视频创作', '["视频","HTML","生成"]', '面向编码代理的 HTML 到视频工具，通过编写 HTML/CSS/JavaScript 场景并渲染为视频，适合自动生成动态演示和视觉内容。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 15, 0),
  ('seedance2.0', 'https://github.com/Emily2040/seedance-2.0', '视频创作', '["视频","生成","分镜"]', '围绕 Seedance 2.0 的多模态 AI 影视制作流程，覆盖创意、分镜、素材组织和生成式视频制作等环节。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 16, 0),
  ('remotion', 'https://github.com/remotion-dev/remotion', '视频创作', '["视频","React","渲染"]', '使用 React 以代码方式创建视频，支持组件化场景、参数化内容和服务端渲染，适合批量生成产品演示、社交媒体视频和数据动画。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 17, 1),
  ('video-use', 'https://github.com/browser-use/video-use', '视频创作', '["剪辑","视频","自动化"]', '让编码代理参与视频剪辑和处理，通过自然语言或代码完成素材整理、剪辑修改及视频工作流自动化。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 18, 0),
  ('interview-coach-skill', 'https://github.com/noamseg/interview-coach-skill', '科研成长', '["求职","面试","简历"]', '覆盖求职全流程的自适应面试教练，支持职位分析、简历优化、模拟面试、回答评分、故事库管理、复盘和薪资谈判。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 19, 0),
  ('Auto-claude-code-research-in-sleep', 'https://github.com/wanshuiyin/Auto-claude-code-research-in-sleep', '科研成长', '["科研","自动化","机器学习"]', '仅用 Markdown 技能实现的自主机器学习研究工作流，支持跨模型评审、研究想法发现和实验自动化，可用于 Claude Code、Codex 等代理。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 20, 1),
  ('next-ai-draw.io', 'https://github.com/DayuanJiang/next-ai-draw-io', '效率工具', '["绘图","图表","自然语言"]', '基于 Next.js 的 draw.io 增强应用，可用自然语言创建、修改和完善流程图、架构图及其他结构化图示。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 21, 0),
  ('anydoc', 'https://github.com/firecrawl/anydoc', '数据与文档', '["文档","转换","Markdown"]', '将 Word、PowerPoint、Excel、OpenDocument、RTF、EPUB、CSV 和 PDF 转换为干净 Markdown 的工具，并提供 Rust、Node.js、Python 接口。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 22, 0),
  ('GSAP', 'https://gsap.com/docs/v3/Installation/', '前端设计', '["前端","动画","JavaScript"]', 'GreenSock Animation Platform 的安装与使用文档，提供高性能 JavaScript 动画 API、时间线和插件的配置说明。', 'https://icons.duckduckgo.com/ip3/gsap.com.ico', 23, 1),
  ('inspira ui', 'https://inspira-ui.com/', '前端设计', '["前端","Vue","动效"]', '面向 Vue/Nuxt 的动效 UI 组件与视觉效果集合，可直接参考或复用发光、过渡、背景和交互组件来搭建现代网页界面。', 'https://icons.duckduckgo.com/ip3/inspira-ui.com.ico', 24, 0),
  ('motion', 'https://www.usemotion.com/', '效率工具', '["效率","项目管理","AI"]', 'AI 驱动的工作管理 SuperApp，将任务、项目、日历和计划整合在一起，自动安排工作并帮助跟踪团队执行进度。', 'https://icons.duckduckgo.com/ip3/usemotion.com.ico', 25, 1),
  ('lottie', 'https://github.com/airbnb/lottie-web', '前端设计', '["前端","动画","JSON"]', '将 After Effects 动画以 JSON 形式在 Web、Android、iOS 和 React Native 等平台原生渲染，适合轻量交互动效和产品动画。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 26, 0),
  ('anime.js', 'https://animejs.com/', '前端设计', '["前端","动画","SVG"]', '轻量 JavaScript 动画引擎，支持 DOM、CSS、SVG 和 JavaScript 对象动画，可用于网页过渡、微交互和复杂时间线效果。', 'https://icons.duckduckgo.com/ip3/animejs.com.ico', 27, 0),
  ('supervisor-skills', 'https://github.com/HKUSTDial/Supervisor-Skills', '科研成长', '["科研","写作","导师经验"]', '把导师科研经验整理为可调用的 AI 技能，覆盖研究想法、实验设计、论文写作、修改和投稿等阶段，可作为科研代理的流程模板。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 28, 0),
  ('firecrawl', 'https://github.com/firecrawl/firecrawl', '数据与文档', '["网页","数据","抓取"]', '面向大规模网页搜索、抓取和交互的 Context API，把网页内容清洗成适合 LLM 使用的结构化上下文，适合构建检索和研究应用。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 29, 1),
  ('video-shotcraft', 'https://github.com/Vincentwei1021/video-shotcraft', '视频创作', '["视频","剪辑","镜头模板"]', '面向 Claude Code 和 Codex 的 AI 视频技能，基于 Remotion 提供 152 张镜头配方卡、209 个动效预览和可直接使用的产品视频模板。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 30, 0),
  ('shadcn-ui', 'https://github.com/shadcn-ui/ui', '前端设计', '["前端","组件","无障碍"]', '一组设计统一且注重无障碍的 UI 组件，同时提供源码分发方式，开发者可以将组件直接复制到自己的项目并按需修改。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 31, 1),
  ('ui-ux-pro-max-skill', 'https://github.com/nextlevelbuilder/ui-ux-pro-max-skill', '前端设计', '["前端","视觉效果","UI/UX"]', '为 AI 代理提供专业 UI/UX 设计知识和决策规则，覆盖网页、移动端、配色、排版、组件和交互等多个平台与设计环节。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 32, 0),
  ('awesome-design-md', 'https://github.com/voltagent/awesome-design-md', '前端设计', '["前端","设计模式","设计令牌"]', '收集开发者网站的 DESIGN.md 分析，整理真实网站的设计模式、设计令牌和规则，可直接作为 AI 代理生成高一致性 UI 的参考资料。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 33, 0),
  ('UP', 'https://github.com/byoungd/up', '科研成长', '["学习","成长","人生规划"]', '一份个人进阶指南，涵盖人生规划、英语学习和能力提升等内容，适合用作长期自我管理与成长参考。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 34, 1),
  ('Awesome-gpt-image-2', 'https://github.com/freestylefly/awesome-gpt-image-2', 'AI 编程', '["AI绘图","提示词","Prompt as Code"]', 'GPT-Image-2 的 Prompt as Code 提示词引擎与模板库，收集 530 多个案例和 20 多套工业级模板，并提炼为可复用的图像生成技能。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 35, 0),
  ('Pixels', 'https://www.pexels.com/zh-cn/', '素材资源', '["图片","视频","摄影"]', '提供可免费使用的高质量图片和视频素材库，支持按主题搜索、下载和用于设计、内容创作及演示项目。', 'https://icons.duckduckgo.com/ip3/pexels.com.ico', 36, 1),
  ('Pixabay', 'https://pixabay.com/', '素材资源', '["图片","素材","音乐"]', '免费的图片、插画、矢量图、视频和音乐素材平台，适合快速查找可用于网页、海报、视频和社交媒体的视觉资源。', 'https://icons.duckduckgo.com/ip3/pixabay.com.ico', 37, 0),
  ('Unsplash', 'https://unsplash.com/', '素材资源', '["图片","摄影","封面"]', '以高分辨率摄影作品为主的图片平台，适合寻找网站封面、演示背景、品牌视觉和内容创作所需的照片素材。', 'https://icons.duckduckgo.com/ip3/unsplash.com.ico', 38, 1),
  ('brusheezy', 'https://www.brusheezy.com/', '素材资源', '["笔刷","设计素材","Photoshop"]', '面向 Photoshop 和数字绘画的免费笔刷资源库，可查找水彩、纹理、烟雾、光效等笔刷，用于插画和视觉设计。', 'https://icons.duckduckgo.com/ip3/brusheezy.com.ico', 39, 0),
  ('fbrush', 'https://fbrushes.com/', '素材资源', '["笔刷","纹理","Photoshop"]', '提供免费的 Photoshop 笔刷、图案和纹理资源，适合为海报、插画、界面和图片后期添加材质与细节效果。', 'https://icons.duckduckgo.com/ip3/fbrushes.com.ico', 40, 0),
  ('pixdden', 'https://www.pixeden.com/', '素材资源', '["设计素材","模板","PSD"]', '提供网页、平面设计和品牌项目常用的 PSD 素材、模板、图标、字体及展示资源，适合快速搭建设计稿和视觉方案。', 'https://icons.duckduckgo.com/ip3/pixeden.com.ico', 41, 0),
  ('mockups design', 'https://mockups-design.com/', '素材资源', '["样机","设计展示","模板"]', '提供免费和高级产品样机模板，可将海报、包装、界面和品牌设计快速放入真实场景中进行展示与提案。', 'https://icons.duckduckgo.com/ip3/mockups-design.com.ico', 42, 0),
  ('smoothui', 'https://smoothui.dev/', '前端设计', '["前端","React","Motion"]', '提供带有流畅 Motion 动画的 React 组件，兼容 shadcn/ui，可通过 Tailwind CSS 自定义，适合快速构建动效丰富的现代网页界面。', 'https://icons.duckduckgo.com/ip3/smoothui.dev.ico', 43, 0),
  ('Aceternity UI', 'https://ui.aceternity.com/', '前端设计', '["前端","组件","Tailwind CSS"]', 'React 与 Tailwind CSS 组件库，提供 200 多个可复制的组件、页面区块和落地页模板，并结合 Motion 实现高质量交互动效。', 'https://icons.duckduckgo.com/ip3/ui.aceternity.com.ico', 44, 1);

INSERT OR IGNORE INTO tools
  (name, url, category, keywords, description, icon_url, sort_order, is_featured)
VALUES
  ('public-apis', 'https://github.com/public-apis/public-apis', '数据与文档', '["API","开放数据","开发资源"]', '由社区维护的免费 API 汇总清单，按主题整理可直接调用的公共接口，适合快速寻找原型开发、数据实验和自动化项目所需的数据源。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 45, 1),
  ('meetily', 'https://github.com/Zackriya-Solutions/meetily', '效率工具', '["会议记录","语音转写","本地AI"]', '隐私优先的开源 AI 会议助手，支持本地实时转写、说话人识别和 Ollama 摘要，在 macOS 与 Windows 上处理会议内容且无需云端服务。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 46, 0),
  ('ai-website-cloner-template', 'https://github.com/JCodesMore/ai-website-cloner-template', '前端设计', '["AI编程","网站复刻","模板"]', '使用 AI 编码代理一条命令复刻网站的项目模板，适合快速搭建网页原型、研究界面结构和验证前端实现思路。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 47, 0),
  ('skill-zine-summary', 'https://github.com/tluy/skill-zine-summary', 'AI 编程', '["AI技能","艺术杂志","内容总结"]', '艺术杂志主题的技能合集，用于整理和总结视觉文化内容，可作为 AI 代理处理阅读、提炼与内容创作任务的参考。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 48, 0);

INSERT OR IGNORE INTO tools
  (name, url, category, keywords, description, icon_url, sort_order, is_featured)
VALUES
  ('huashu-design', 'https://github.com/alchaincyf/huashu-design', 'AI 编程', '["智能技能","设计自动化","网页原生"]', '面向 Claude Code、Codex 等代理的 HTML 原生设计 skill，可生成交互原型、演示幻灯片、动画和信息图，并支持导出视频，适合快速制作可交付设计稿。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 49, 0),
  ('OpenDesign', 'https://github.com/nexu-io/open-design', '前端设计', '["设计代理","原型制作","多格式导出"]', '开源的 Claude Design 替代方案和本地优先桌面应用，可用编码代理制作原型、落地页、仪表盘、幻灯片、图片与视频，并导出 HTML、PDF、PPTX 和 MP4。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 50, 0),
  ('甲壳虫开源项目', 'https://blog.openbeetles.com/', 'AI 编程', '["氛围编程","前端设计","开发教程"]', '围绕 Vibe Coding 的中文博客与实践站点，持续讲解前端设计、AI 编程术语和界面实现方法，适合学习与改进 AI 生成的网页。', 'https://icons.duckduckgo.com/ip3/blog.openbeetles.com.ico', 51, 0),
  ('BossHunter', 'https://github.com/shengjidaguai-china/BossHunter', '科研成长', '["求职","岗位筛选","智能代理"]', '本地运行的智能求职 Agent，支持岗位采集、AI 评分、人工确认投递、回复跟进和定制简历生成，适合减少重复求职操作并保留人工决策。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 52, 0),
  ('Headroom', 'https://github.com/headroomlabs-ai/headroom', 'AI 编程', '["上下文压缩","智能代理","令牌优化"]', '在内容发送给大语言模型前压缩工具输出、日志、文件、RAG 片段和对话上下文，提供库、代理与 MCP 服务，适合降低代理任务的上下文开销。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 53, 0),
  ('Futurepedia', 'https://www.futurepedia.io/', '效率工具', '["智能工具","工具导航","效率"]', 'AI 工具与软件发现目录，按用途帮助用户查找用于提升工作和生活效率的工具，适合进行 AI 工具选型和快速探索。', 'https://icons.duckduckgo.com/ip3/www.futurepedia.io.ico', 54, 0),
  ('Uiverse', 'https://uiverse.io/', '前端设计', '["界面元素","社区设计","前端组件"]', '由社区设计者分享 UI 元素的平台，支持搜索、交互预览和复用开源组件，适合为网页界面查找按钮、加载器等设计实现。', 'https://icons.duckduckgo.com/ip3/uiverse.io.ico', 55, 0),
  ('Yila AI', 'https://yila.ai/zh/playbooks', '科研成长', '["科研智能体","文献检索","论文写作"]', '面向科研工作的智能体集合，覆盖选题验证、文献检索与精读、综述、数据分析、科研绘图、论文写作、海报和幻灯片制作。', 'https://icons.duckduckgo.com/ip3/yila.ai.ico', 56, 0),
  ('gzh-design-skill', 'https://github.com/isjiamu/gzh-design-skill', 'AI 编程', '["公众号排版","文档转网页","微信写作"]', '将 Markdown 一键转换为可粘贴到微信公众号编辑器的内联 HTML，提供多套主题、图片与代码块处理、章节标记和双关卡质量校验。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 57, 0),
  ('baoyu-skills', 'https://github.com/JimLiu/baoyu-skills', 'AI 编程', '["智能技能","编码代理","内容创作"]', '面向 Claude Code、Codex 等 AI Agent 的技能集合，包含公众号文章配图、排版和发布等可按需安装的工作流模块。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 58, 0),
  ('TrendRadar', 'https://github.com/sansan0/TrendRadar', '数据与文档', '["舆情监控","热点聚合","资讯订阅"]', '聚合多平台热点和 RSS 订阅的舆情监控工具，支持关键词筛选、AI 翻译与分析、MCP 查询以及通过多种渠道推送简报。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 59, 0),
  ('WeWrite', 'https://github.com/imraywang/wewrite', 'AI 编程', '["公众号写作","内容工作流","微信发布"]', '面向 AI Agent 的公众号内容工作流 skill，覆盖选题、素材搜集、写作、编辑审稿，并可按需配图、排版、推送草稿箱和改写到其他平台。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 60, 0),
  ('句方便', 'https://seneasy.cloud/', '效率工具', '["公众号排版","智能配图","文档编辑"]', '公众号内容整理工具，提供智能排版、智能配图和 Markdown 编辑能力，支持多种主题，适合完成文章发布前的编辑准备。', 'https://icons.duckduckgo.com/ip3/seneasy.cloud.ico', 61, 0),
  ('今日热榜', 'https://tophub.today/', '数据与文档', '["热榜聚合","热点资讯","多平台"]', '聚合微信、知乎、微博、GitHub、抖音等多个平台热榜的资讯网站，适合集中追踪全网热点并进行快速阅读。', 'https://icons.duckduckgo.com/ip3/tophub.today.ico', 62, 0),
  ('Canva可画', 'https://www.canva.cn/', '素材资源', '["在线设计","视觉创作","图形编辑"]', 'Canva 的中文在线设计平台入口，提供视觉内容设计与编辑服务，适合日常图形创作。', 'https://icons.duckduckgo.com/ip3/www.canva.cn.ico', 63, 0),
  ('零克查词', 'https://www.lingkechaci.com/', '数据与文档', '["敏感词检测","内容审核","平台合规"]', '面向内容创作者的敏感词和违规词检测工具，支持小红书、抖音、快手和 B 站等平台内容检查，适合发布前进行文字审核。', 'https://icons.duckduckgo.com/ip3/www.lingkechaci.com.ico', 64, 0),
  ('bloub', 'https://bloub.vercel.app/', '前端设计', '["矢量动画","头像动效","形态变形"]', '基于 SVG 的动画头像实验，将参考头像逐帧重建并在 14 种形态之间变形，适合观察无动画库的 SVG 动效实现。', 'https://icons.duckduckgo.com/ip3/bloub.vercel.app.ico', 65, 0),
  ('Ant Design', 'https://ant.design/index-cn', '前端设计', '["前端组件","设计系统","企业界面"]', '基于 Ant Design 设计体系的 React UI 组件库，提供面向企业级中后台产品的组件与设计规范，适合构建一致的 Web 应用界面。', 'https://icons.duckduckgo.com/ip3/ant.design.ico', 66, 0);

INSERT OR IGNORE INTO tools
  (name, url, category, keywords, description, icon_url, sort_order, is_featured)
VALUES
  ('Hallmark', 'https://www.usehallmark.com/', 'AI 编程', '["设计技能","界面规范","反模板化"]', '面向 AI 编程助手的设计 skill，将字体、色彩、布局、动效和交互规则整合为一套反模板化规范，支持页面构建、研究、审查与重设计。', 'https://icons.duckduckgo.com/ip3/www.usehallmark.com.ico', 67, 0),
  ('Cowart', 'https://github.com/zhongerxin/cowart', 'AI 编程', '["无限画布","图片生成","幻灯片制作"]', '面向 Codex 的原生无限画布插件，基于 tldraw 支持构思、标注、AI 图片生成、HTML 页面和幻灯片制作，适合在项目中持续迭代视觉内容。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 68, 0),
  ('Refero Styles', 'https://styles.refero.design/', '前端设计', '["设计系统","界面规范","设计参考"]', '面向 AI Agent 的设计系统参考库，收录产品网站的颜色、字体、间距、组件和 DESIGN.md 规则，适合用真实界面证据辅助网页设计。', 'https://icons.duckduckgo.com/ip3/styles.refero.design.ico', 69, 0),
  ('Motion Sites', 'https://motionsites.ai/', '前端设计', '["网页灵感","设计提示词","落地页"]', '提供 AI 网站设计提示词和可直接参考的页面区块，包含落地页、页脚、背景与视频等视觉案例，适合快速构思和制作网页。', 'https://icons.duckduckgo.com/ip3/motionsites.ai.ico', 70, 0),
  ('React Bits', 'https://reactbits.dev/', '前端设计', '["前端组件","界面动效","网页开发"]', '开源的 React 动效组件集合，提供高质量、可交互且可定制的界面组件，适合构建具有视觉表现力的网页应用。', 'https://icons.duckduckgo.com/ip3/reactbits.dev.ico', 71, 0);

INSERT OR IGNORE INTO tools
  (name, url, category, keywords, description, icon_url, sort_order, is_featured)
VALUES
  ('Landbook', 'https://land-book.com/', '前端设计', '["网站设计","设计灵感","网站画廊"]', '精选网站设计灵感的策展型画廊，每天更新网站案例，适合创意人士寻找网页视觉与交互参考。', 'https://icons.duckduckgo.com/ip3/land-book.com.ico', 72, 0);

INSERT OR IGNORE INTO tools
  (name, url, category, keywords, description, icon_url, sort_order, is_featured)
VALUES
  ('Comfy-Org', 'https://github.com/Comfy-Org', '视频创作', '["节点工作流","生成式创作","本地部署"]', 'Comfy-Org 维护的开源 AI 内容创作生态，以可视化节点图构建和复用图像、视频、音频与 3D 工作流，适合本地生成和接入生产流程。', 'https://icons.duckduckgo.com/ip3/github.com.ico', 73, 0);
