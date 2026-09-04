const tools = [
  {
    name: 'mattpocock/skills',
    short: 'Matt Pocock 公开的实战型 agents 技能集合，适合扩展编码代理。',
    description: 'Matt Pocock 公开的实战型 agents 技能集合，提供可直接复用的编码规范、工程流程和领域工作方法，适合扩展 Claude Code、Codex 等编码代理。',
    tags: ['AI代理', '工程', '技能'],
    category: 'AI 编程',
    mark: 'M',
    url: 'github.com/mattpocock/skills',
  },
  {
    name: 'ai-coding-academy',
    short: '中文交互式 AI 编程课程，系统讲解提示词、生成与调试。',
    description: '中文交互式 AI 编程课程，按章节讲解提示词、代码生成、调试和协作等基础概念，适合系统入门 AI 辅助开发。',
    tags: ['AI编程', '课程', '入门'],
    category: 'AI 编程',
    mark: 'A',
    url: 'github.com/ai-coding-academy',
  },
  {
    name: 'ponytail',
    short: '约束 AI 代理行为的轻量技能，鼓励简单方案和清晰实现。',
    description: '用于约束 AI 代理行为的轻量技能，鼓励优先采用简单方案、减少不必要代码和过度设计，适合纳入日常编码代理工作流。',
    tags: ['AI代理', '工程', '简化'],
    category: 'AI 编程',
    mark: 'P',
    url: 'github.com/obra/ponytail',
  },
  {
    name: 'awesome-llm-apps',
    short: '收集开源 AI Agent、Agent Skill 和 RAG 应用案例。',
    description: '收集 100 多个开源 AI Agent、Agent Skill 和 RAG 应用，适合查找可运行示例、技术组合和项目灵感。',
    tags: ['AI应用', '案例', 'RAG'],
    category: 'AI 编程',
    mark: 'L',
    url: 'github.com/Shubhamsaboo/awesome-llm-apps',
  },
  {
    name: 'vibehub',
    short: '用大白话解释前端、后端和 AI 开发术语的知识图鉴。',
    description: '用大白话解释前端、后端和 AI 开发术语的知识图鉴，帮助快速理解 Vibe Coding 生态中的概念和工具名称。',
    tags: ['AI编程', '学习', '术语'],
    category: 'AI 编程',
    mark: 'V',
    url: 'vibehub.dev',
  },
  {
    name: 'Awesome-gpt-image-2',
    short: 'GPT-Image-2 的提示词引擎、案例与工业级模板库。',
    description: 'GPT-Image-2 的 Prompt as Code 提示词引擎与模板库，收集大量案例和工业级模板，并提炼为可复用的图像生成技能。',
    tags: ['AI绘图', '提示词', '模板'],
    category: 'AI 编程',
    mark: 'G',
    url: 'github.com/Awesome-gpt-image-2',
  },
  {
    name: 'GSAP',
    short: '高性能 JavaScript 动画平台，提供时间线和丰富插件。',
    description: 'GreenSock Animation Platform 提供高性能 JavaScript 动画 API、时间线和插件，适合复杂网页动效与产品微交互。',
    tags: ['前端', '动画', 'JavaScript'],
    category: '前端设计',
    mark: 'G',
    url: 'gsap.com',
  },
  {
    name: 'playwright-mcp',
    short: '让 AI 代理通过结构化操作访问和验证真实网页。',
    description: '微软提供的 Playwright MCP 服务，让 AI 代理通过结构化浏览器操作访问网页、填写表单、执行交互和验证页面行为。',
    tags: ['浏览器自动化', '测试', 'MCP'],
    category: '前端设计',
    mark: 'PW',
    url: 'github.com/microsoft/playwright-mcp',
  },
];

const categories = [
  ['全部', '48'],
  ['AI 编程', '07'],
  ['前端设计', '14'],
  ['部署运维', '03'],
  ['视频创作', '05'],
  ['素材资源', '08'],
  ['科研成长', '04'],
  ['效率工具', '03'],
  ['数据与文档', '03'],
  ['安全测试', '01'],
];

const icon = (name) => {
  const paths = {
    search: '<circle cx="11" cy="11" r="7"></circle><path d="m20 20-3.6-3.6"></path>',
    bookmark: '<path d="M6 4.8A1.8 1.8 0 0 1 7.8 3h8.4A1.8 1.8 0 0 1 18 4.8V21l-6-3.6L6 21Z"></path>',
    moon: '<path d="M20.6 15.6A8.5 8.5 0 0 1 8.4 3.4 8.5 8.5 0 1 0 20.6 15.6Z"></path>',
    shuffle: '<path d="m18 4 3 3-3 3"></path><path d="M3 7h3.5c4.5 0 4 10 8.5 10H21"></path><path d="m18 14 3 3-3 3"></path><path d="M3 17h3.5c1.8 0 2.8-1.6 3.7-3.5"></path>',
    arrow: '<path d="M7 17 17 7"></path><path d="M7 7h10v10"></path>',
    close: '<path d="m6 6 12 12"></path><path d="m18 6-12 12"></path>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect>',
    heart: '<path d="M20.8 4.6a5.4 5.4 0 0 0-7.6 0L12 5.8l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.8a5.4 5.4 0 0 0 0-7.6Z"></path>',
  };
  return `<svg viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

const toolLogo = (tool) => `<span class="tool-logo mark-${tool.mark.length > 1 ? 'wide' : 'single'}">${tool.mark}</span>`;
const tags = (tool) => `<span class="tag-list">${tool.tags.map((tag) => `<span>${tag}</span>`).join('')}</span>`;

function toolRow(tool, index, editorial = false) {
  return `
    <button class="tool-row${editorial ? ' editorial-row' : ''}${index === 0 ? ' is-source' : ''}" data-tool="${index}" type="button">
      ${toolLogo(tool)}
      <span class="row-copy">
        <span class="row-title">${tool.name}</span>
        <span class="row-description">${tool.short}</span>
        ${tags(tool)}
      </span>
      <span class="row-meta"><span>${tool.category}</span><span class="bookmark-small">${icon('bookmark')}</span><span class="open-label">打开 ${icon('arrow')}</span></span>
    </button>`;
}

function categoryList(mode = 'vertical') {
  return `<div class="category-list ${mode}">${categories.map(([name, count], index) => `
    <button class="category-item${index === 1 ? ' active' : ''}" type="button">
      <span>${name}</span><b>${count}</b>
    </button>`).join('')}</div>`;
}

function modal() {
  return `
    <div class="modal-layer is-open" aria-hidden="false">
      <article class="expanded-card" role="dialog" aria-modal="true" aria-labelledby="expanded-title">
        <button class="modal-close" type="button" aria-label="关闭">${icon('close')}</button>
        <div class="expanded-cover">
          <span class="cover-mark">/skills</span>
          <span class="cover-category">AI 编程</span>
        </div>
        <div class="expanded-content">
          <div class="expanded-heading">
            <div>${toolLogo(tools[0])}<div><p>AI 编程</p><h2 id="expanded-title">mattpocock/skills</h2></div></div>
            <button class="save-detail" type="button" aria-label="保存工具">${icon('bookmark')}</button>
          </div>
          ${tags(tools[0])}
          <p class="expanded-description">${tools[0].description}</p>
          <div class="source-line"><span>源网址</span><strong>${tools[0].url}</strong></div>
          <a class="visit-button" href="#">访问网站 ${icon('arrow')}</a>
        </div>
      </article>
    </div>`;
}

function brightTemplate() {
  return `
    <div class="concept bright-concept">
      <header class="bright-nav">
        <a class="brand" href="#"><span>叁</span><b>叁叁的实用工具集</b></a>
        <nav><a href="#">工具库</a><a href="#">关于</a></nav>
        <div class="nav-actions"><button aria-label="已收藏">${icon('bookmark')}</button><button aria-label="切换主题">${icon('moon')}</button></div>
      </header>
      <section class="bright-hero">
        <div><p>叁叁精选 · 持续更新</p><h1>找到趁手的工具，<br>马上开始工作。</h1><span>从 AI 编程到素材搜索，把每天会打开的网址放在一处。</span></div>
        <div class="hero-search"><span>${icon('search')}</span><span class="placeholder">搜索工具、关键词或用途</span><kbd>⌘ K</kbd></div>
        <div class="hero-count"><strong>48</strong><span>个精选工具<br>9 个实用分类</span></div>
      </section>
      <main class="directory bright-directory">
        <aside><div class="aside-title">浏览分类</div>${categoryList()}</aside>
        <section class="results">
          <div class="results-head"><div><p>工具库</p><h2>AI 编程</h2></div><div class="result-controls"><button class="active">热门</button><button>最近添加</button></div></div>
          <div class="tool-list">${tools.map((tool, index) => toolRow(tool, index)).join('')}</div>
        </section>
      </main>
      ${modal()}
    </div>`;
}

function workbenchTemplate() {
  return `
    <div class="concept workbench-concept">
      <aside class="workbench-rail">
        <a class="rail-brand" href="#"><span>叁</span><b>叁叁工具集</b></a>
        <div class="rail-primary"><button class="active">${icon('grid')}<span>全部工具</span><b>48</b></button><button>${icon('heart')}<span>已收藏</span><b>06</b></button></div>
        <p>分类</p>${categoryList()}
        <div class="rail-footer"><span>个人工作台</span><button>${icon('moon')}</button></div>
      </aside>
      <main class="workbench-main">
        <header class="workbench-top"><span><b>工具库</b> / AI 编程</span><div><button>${icon('shuffle')} 随机打开</button><button aria-label="切换主题">${icon('moon')}</button></div></header>
        <section class="workbench-search">
          <div><p>48 个工具 · 9 个分类</p><h1>今天需要什么工具？</h1></div>
          <div class="search-stack"><div class="search-box">${icon('search')}<span>搜索名称、关键词或用途</span><kbd>⌘ K</kbd></div><div class="segments"><button class="active">全部</button><button>最近使用</button><button>已收藏</button></div></div>
        </section>
        <section class="workbench-results"><div class="results-head"><div><p>当前分类</p><h2>AI 编程 <span>07</span></h2></div><span>按相关度排序</span></div><div class="tool-list">${tools.map((tool, index) => toolRow(tool, index)).join('')}</div></section>
      </main>
      ${modal()}
    </div>`;
}

function editorialTemplate() {
  return `
    <div class="concept editorial-concept">
      <header class="editorial-nav">
        <a class="editorial-brand" href="#"><span>叁叁</span><b>的实用工具集</b></a>
        <nav><a class="active" href="#">浏览工具</a><a href="#">分类</a><a href="#">已收藏</a></nav>
        <div><button aria-label="搜索">${icon('search')}</button><button aria-label="切换主题">${icon('moon')}</button></div>
      </header>
      <section class="editorial-masthead">
        <div class="masthead-copy"><span>CURATED TOOL INDEX / 2026</span><h1>把值得留下的工具，<br><em>放在手边。</em></h1></div>
        <div class="masthead-search"><span>${icon('search')}</span><span>搜索工具、关键词或用途</span><kbd>⌘ K</kbd></div>
        <p>共 48 个工具 · 9 个分类</p>
      </section>
      <div class="category-shelf">${categoryList('horizontal')}</div>
      <main class="editorial-main">
        <div class="editorial-heading"><div><span>01 / CATEGORY</span><h2>AI 编程</h2></div><p>把想法变成可运行的东西</p><strong>07</strong></div>
        <div class="editorial-grid">${tools.map((tool, index) => toolRow(tool, index, true)).join('')}</div>
      </main>
      ${modal()}
    </div>`;
}

const concept = document.documentElement.dataset.concept;
const root = document.querySelector('#concept-root');
root.innerHTML = concept === 'workbench' ? workbenchTemplate() : concept === 'editorial' ? editorialTemplate() : brightTemplate();

const layer = document.querySelector('.modal-layer');
const expandedTitle = document.querySelector('#expanded-title');
const expandedDescription = document.querySelector('.expanded-description');
const source = document.querySelector('.source-line strong');
const category = document.querySelector('.cover-category');
const coverMark = document.querySelector('.cover-mark');

function openTool(tool) {
  expandedTitle.textContent = tool.name;
  expandedDescription.textContent = tool.description;
  source.textContent = tool.url;
  category.textContent = tool.category;
  coverMark.textContent = tool.name === 'mattpocock/skills' ? '/skills' : tool.mark;
  layer.classList.add('is-open');
  layer.setAttribute('aria-hidden', 'false');
}

document.querySelectorAll('[data-tool]').forEach((row) => row.addEventListener('click', () => openTool(tools[Number(row.dataset.tool)])));
document.querySelector('.modal-close').addEventListener('click', () => {
  layer.classList.remove('is-open');
  layer.setAttribute('aria-hidden', 'true');
});
layer.addEventListener('click', (event) => {
  if (event.target === layer) document.querySelector('.modal-close').click();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') document.querySelector('.modal-close').click();
});
