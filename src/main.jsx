import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  ArrowUpRight,
  Bookmark,
  Check,
  ChevronRight,
  Command,
  ExternalLink,
  Moon,
  Search,
  Sparkles,
  Sun,
  X,
} from 'lucide-react';
import tools from './data/tools.json';
import './styles.css';

gsap.registerPlugin(ScrollTrigger);

const categoryOrder = ['AI 编程', '前端设计', '部署运维', '视频创作', '素材资源', '科研成长', '效率工具', '数据与文档', '安全测试'];
const categoryNotes = {
  'AI 编程': '把想法变成可运行的东西',
  '前端设计': '组件、动效与界面灵感',
  '部署运维': '让项目稳定地上线',
  '视频创作': '用代码和模型讲故事',
  '素材资源': '随手可用的视觉素材',
  '科研成长': '学习、研究与长期积累',
  '效率工具': '减少重复劳动的日常工具',
  '数据与文档': '让信息变得更干净',
  '安全测试': '在发布前多看一眼',
};

function App() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [query, setQuery] = useState('');
  const [activeTool, setActiveTool] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [saved, setSaved] = useState(() => new Set());
  const toolsSectionRef = useRef(null);
  const pinnedTitleRef = useRef(null);

  const filteredTools = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const categoryMatch = activeCategory === '全部' || tool.category === activeCategory;
      const queryMatch = !normalizedQuery || [tool.name, tool.category, tool.description, ...tool.keywords]
        .join(' ')
        .toLowerCase()
        .includes(normalizedQuery);
      return categoryMatch && queryMatch;
    });
  }, [activeCategory, query]);

  const groupedTools = useMemo(() => categoryOrder
    .map((category) => ({ category, items: filteredTools.filter((tool) => tool.category === category) }))
    .filter((group) => group.items.length > 0), [filteredTools]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (pinnedTitleRef.current && window.matchMedia('(min-width: 920px)').matches) {
        ScrollTrigger.create({
          trigger: toolsSectionRef.current,
          start: 'top top+=96',
          end: 'bottom bottom-=80',
          pin: pinnedTitleRef.current,
          pinSpacing: false,
        });
      }

      gsap.utils.toArray('.tool-card').forEach((card) => {
        const media = card.querySelector('.tool-card-media');
        gsap.fromTo(media, { scale: 0.82, opacity: 0.38 }, {
          scale: 1,
          opacity: 1,
          ease: 'power2.out',
          duration: 0.9,
          scrollTrigger: {
            trigger: card,
            start: 'top 90%',
            end: 'bottom 18%',
            scrub: 0.8,
            onLeave: () => gsap.to(media, { opacity: 0.26, duration: 0.45 }),
            onEnterBack: () => gsap.to(media, { opacity: 1, duration: 0.45 }),
          },
        });
      });

      gsap.fromTo('.hero-copy > *', { y: 26, opacity: 0 }, {
        y: 0,
        opacity: 1,
        duration: 0.85,
        stagger: 0.09,
        ease: 'power3.out',
        delay: 0.12,
      });
    });
    return () => ctx.revert();
  }, [groupedTools.length]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setActiveTool(null);
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = activeTool ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeTool]);

  const openRandomTool = () => {
    const pool = filteredTools.length ? filteredTools : tools;
    const randomTool = pool[Math.floor(Math.random() * pool.length)];
    window.open(randomTool.url, '_blank', 'noopener,noreferrer');
  };

  const toggleSaved = (id) => {
    setSaved((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="app-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回顶部">
          <span className="brand-mark">叁</span>
          <span>叁叁的实用工具集</span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <a href="#tools">工具库</a>
          <a href="#about">关于</a>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? '切换浅色模式' : '切换深色模式'}>
            {darkMode ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a className="nav-cta" href="#tools">开始使用 <ArrowUpRight size={16} /></a>
        </div>
      </header>

      <main id="top" className="overflow-safe">
        <section className="hero-section">
          <div className="hero-backdrop" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-kicker"><Sparkles size={15} /> 个人收藏 · 持续更新</p>
            <h1>把常用工具，<span className="inline-image" aria-hidden="true" />整理成一页可用的工作台。</h1>
            <p className="hero-lede">从 AI 编程到素材搜索，叁叁把每天会打开的网址放在这里。少一点寻找，多一点专注。</p>
            <div className="hero-actions">
              <a className="button button-light" href="#tools">浏览工具库 <ChevronRight size={17} /></a>
              <button className="button button-ghost" onClick={openRandomTool}>随机打开一个 <Command size={16} /></button>
            </div>
          </div>
          <div className="hero-footnote"><span>Scroll to explore</span><span className="hero-line" /></div>
        </section>

        <section className="marquee-section" aria-label="工具类别">
          <div className="marquee-track">
            {[...categoryOrder, ...categoryOrder].map((category, index) => <span key={`${category}-${index}`}><i />{category}</span>)}
          </div>
        </section>

        <section id="tools" className="tools-section" ref={toolsSectionRef}>
          <div className="section-rail" ref={pinnedTitleRef}>
            <p className="eyebrow">工具库</p>
            <h2>每个链接，<br /><em>都有它的用处。</em></h2>
            <p className="rail-note">按类别浏览，或直接搜索名称、关键词和介绍。</p>
            <div className="rail-count"><strong>{filteredTools.length}</strong><span>/ {tools.length} 个工具</span></div>
          </div>

          <div className="tools-content">
            <div className="toolbar">
              <div className="search-wrap">
                <Search size={17} />
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索工具、关键词或用途" aria-label="搜索工具" />
                {query && <button className="clear-search" onClick={() => setQuery('')} aria-label="清除搜索"><X size={15} /></button>}
              </div>
              <span className="result-label">{query ? `找到 ${filteredTools.length} 个结果` : '全部收藏'}</span>
            </div>

            <div className="category-tabs" role="tablist" aria-label="工具类别筛选">
              {['全部', ...categoryOrder].map((category) => (
                <button key={category} className={activeCategory === category ? 'active' : ''} onClick={() => setActiveCategory(category)} role="tab" aria-selected={activeCategory === category}>{category}</button>
              ))}
            </div>

            <div className="category-groups">
              {groupedTools.map(({ category, items }) => (
                <section className="category-group" key={category}>
                  <div className="category-heading">
                    <div><h3>{category}</h3><p>{categoryNotes[category]}</p></div>
                    <span>{String(items.length).padStart(2, '0')}</span>
                  </div>
                  <div className="tool-grid">
                    {items.map((tool) => <ToolCard key={tool.id} tool={tool} isSaved={saved.has(tool.id)} onSave={() => toggleSaved(tool.id)} onOpen={() => setActiveTool(tool)} />)}
                  </div>
                </section>
              ))}
              {!groupedTools.length && <div className="empty-state"><Search size={22} /><h3>没有找到匹配的工具</h3><p>试试更短的关键词，或切换到“全部”。</p></div>}
            </div>
          </div>
        </section>

        <section id="about" className="action-section">
          <div>
            <p className="eyebrow">保持好奇</p>
            <h2>下次需要时，<br /><span>这里已经准备好了。</span></h2>
          </div>
          <button className="button button-dark" onClick={openRandomTool}>打开一个工具 <ExternalLink size={17} /></button>
        </section>
      </main>

      <footer className="site-footer"><span>叁叁的实用工具集</span><span>用心收集，保持更新</span><span>{saved.size ? `${saved.size} 个已保存` : '个人工作台'}</span></footer>

      {activeTool && <ToolModal tool={activeTool} isSaved={saved.has(activeTool.id)} onSave={() => toggleSaved(activeTool.id)} onClose={() => setActiveTool(null)} />}
    </div>
  );
}

function ToolCard({ tool, isSaved, onSave, onOpen }) {
  return (
    <article className="tool-card" onClick={onOpen} tabIndex="0" onKeyDown={(event) => event.key === 'Enter' && onOpen()}>
      <div className="tool-card-top">
        <div className="tool-icon-wrap"><img className="tool-icon" src={tool.icon_url} alt="" loading="lazy" /></div>
        <button className={`save-button ${isSaved ? 'saved' : ''}`} onClick={(event) => { event.stopPropagation(); onSave(); }} aria-label={isSaved ? `取消保存 ${tool.name}` : `保存 ${tool.name}`}><Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} /></button>
      </div>
      <div className="tool-card-media" style={{ backgroundImage: `url(https://picsum.photos/seed/${encodeURIComponent(tool.name)}/640/420)` }} />
      <div className="tool-card-body">
        <div className="tool-title-row"><h4>{tool.name}</h4><ArrowUpRight size={16} /></div>
        <div className="keyword-row">{tool.keywords.slice(0, 3).map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
        <p>{tool.description}</p>
      </div>
      <div className="card-open-line"><span>查看详情</span><ChevronRight size={15} /></div>
    </article>
  );
}

function ToolModal({ tool, isSaved, onSave, onClose }) {
  const modalRef = useRef(null);
  useEffect(() => {
    gsap.fromTo(modalRef.current, { y: 28, opacity: 0, scale: 0.98 }, { y: 0, opacity: 1, scale: 1, duration: 0.42, ease: 'power3.out' });
  }, []);
  return (
    <div className="modal-layer" role="dialog" aria-modal="true" aria-label={`${tool.name} 详情`} onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-card" ref={modalRef}>
        <button className="modal-close" onClick={onClose} aria-label="关闭详情"><X size={18} /></button>
        <div className="modal-visual" style={{ backgroundImage: `url(https://picsum.photos/seed/${encodeURIComponent(tool.name)}-detail/1200/720)` }}><span>{tool.category}</span></div>
        <div className="modal-content">
          <div className="modal-heading"><div><p className="modal-category">{tool.category}</p><h2>{tool.name}</h2></div><button className={`save-button large ${isSaved ? 'saved' : ''}`} onClick={onSave} aria-label={isSaved ? '取消保存' : '保存工具'}><Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} /></button></div>
          <div className="keyword-row modal-keywords">{tool.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div>
          <p className="modal-description">{tool.description}</p>
          <div className="modal-url"><span>源网址</span><a href={tool.url} target="_blank" rel="noreferrer">{tool.url.replace(/^https?:\/\//, '')}<ExternalLink size={15} /></a></div>
          <a className="button button-dark modal-cta" href={tool.url} target="_blank" rel="noreferrer">访问网站 <ArrowUpRight size={17} /></a>
        </div>
      </div>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
