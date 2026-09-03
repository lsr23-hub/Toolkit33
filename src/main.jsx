import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowUpRight,
  Bookmark,
  ExternalLink,
  Menu,
  Moon,
  Search,
  Sun,
  X,
} from 'lucide-react';
import tools from './data/tools.json';
import './styles.css';

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
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('san-san-theme') === 'dark');
  const [savedOnly, setSavedOnly] = useState(false);
  const [saved, setSaved] = useState(() => {
    try { return new Set(JSON.parse(localStorage.getItem('san-san-saved') || '[]')); } catch { return new Set(); }
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const searchRef = useRef(null);
  const directoryHeadingRef = useRef(null);
  const lastFocusedRef = useRef(null);
  const activeOriginRef = useRef(null);
  const openAnimationRef = useRef(null);
  const closeAnimationRef = useRef(null);
  const categoryRefs = useRef({});
  const categoryButtonRefs = useRef({});
  const categoryListRef = useRef(null);
  const pendingCategoryRef = useRef(null);
  const categoryJumpCleanupRef = useRef(null);

  const filteredTools = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return tools.filter((tool) => {
      const savedMatch = !savedOnly || saved.has(tool.id);
      const queryMatch = !normalized || [tool.name, tool.category, tool.description, ...tool.keywords].join(' ').toLowerCase().includes(normalized);
      return savedMatch && queryMatch;
    });
  }, [query, saved, savedOnly]);

  const groupedTools = useMemo(() => categoryOrder.map((category) => ({
    category,
    items: filteredTools.filter((tool) => tool.category === category),
  })).filter((group) => group.items.length), [filteredTools]);

  useEffect(() => {
    const sections = categoryOrder.map((category) => categoryRefs.current[category]).filter(Boolean);
    if (!sections.length) return undefined;
    const showAllAboveDirectory = () => {
      if (!pendingCategoryRef.current && document.getElementById('tools')?.getBoundingClientRect().top > 112) setActiveCategory('全部');
    };
    const observer = new IntersectionObserver((entries) => {
      const pendingCategory = pendingCategoryRef.current;
      if (pendingCategory) {
        const reachedTarget = entries.some((entry) => entry.isIntersecting && entry.target.dataset.category === pendingCategory);
        if (reachedTarget) {
          pendingCategoryRef.current = null;
          categoryJumpCleanupRef.current?.();
          categoryJumpCleanupRef.current = null;
          setActiveCategory(pendingCategory);
        }
        return;
      }
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActiveCategory(visible[0].target.dataset.category);
    }, { rootMargin: '-112px 0px -68% 0px', threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener('scroll', showAllAboveDirectory, { passive: true });
    showAllAboveDirectory();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', showAllAboveDirectory);
    };
  }, [groupedTools]);

  useEffect(() => () => categoryJumpCleanupRef.current?.(), []);

  useEffect(() => () => {
    openAnimationRef.current?.cancel();
    openAnimationRef.current = null;
    const closing = closeAnimationRef.current;
    if (closing) {
      closeAnimationRef.current = null;
      closing.cardAnimation.cancel();
      closing.layerAnimation.cancel();
      window.clearTimeout(closing.timerId);
    }
  }, []);

  useEffect(() => {
    if (!window.matchMedia('(max-width: 900px)').matches) return;
    const list = categoryListRef.current;
    const button = categoryButtonRefs.current[activeCategory];
    if (!list || !button) return;
    const listRect = list.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    if (buttonRect.left < listRect.left) {
      list.scrollTo({ left: list.scrollLeft + buttonRect.left - listRect.left - 8, behavior: 'smooth' });
    } else if (buttonRect.right > listRect.right) {
      list.scrollTo({ left: list.scrollLeft + buttonRect.right - listRect.right + 8, behavior: 'smooth' });
    }
  }, [activeCategory]);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('san-san-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('san-san-saved', JSON.stringify([...saved]));
  }, [saved]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (!activeTool && (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === 'Escape') {
        closeTool();
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = activeTool ? 'hidden' : '';
    if (!activeTool && lastFocusedRef.current) {
      (lastFocusedRef.current.isConnected ? lastFocusedRef.current : directoryHeadingRef.current)?.focus?.();
    }
    return () => { window.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [activeTool]);

  const toggleSaved = (id) => setSaved((current) => {
    const next = new Set(current);
    next.has(id) ? next.delete(id) : next.add(id);
    return next;
  });

  const openRandomTool = () => {
    const pool = filteredTools.length ? filteredTools : tools;
    const item = pool[Math.floor(Math.random() * pool.length)];
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const openTool = (tool, trigger) => {
    lastFocusedRef.current = trigger;
    const source = trigger.closest('.tool-row') || trigger;
    const rect = source.getBoundingClientRect();
    activeOriginRef.current = { top: rect.top, left: rect.left, width: rect.width, height: rect.height };
    setActiveTool(tool);
  };

  const closeTool = () => {
    if (!activeTool || closeAnimationRef.current) return;
    const destination = document.querySelector(`[data-tool-id="${activeTool.id}"]`);
    const card = document.querySelector('.expanded-card');
    const layer = document.querySelector('.modal-layer');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!destination || !card?.animate || !layer?.animate || reduceMotion) {
      setActiveTool(null);
      return;
    }

    openAnimationRef.current?.cancel();
    openAnimationRef.current = null;
    const from = card.getBoundingClientRect();
    const to = destination.getBoundingClientRect();
    const translateX = to.left + to.width / 2 - (from.left + from.width / 2);
    const translateY = to.top + to.height / 2 - (from.top + from.height / 2);
    card.style.pointerEvents = 'none';
    const cardAnimation = card.animate([
      { transform: 'none', opacity: 1, borderRadius: '16px', boxShadow: '0 28px 80px rgba(0, 0, 0, .3)' },
      { transform: `translate(${translateX}px, ${translateY}px) scale(${to.width / from.width}, ${to.height / from.height})`, opacity: .85, borderRadius: '0px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0)' },
    ], { duration: 260, easing: 'cubic-bezier(.7, 0, .84, 0)', fill: 'forwards' });
    const layerAnimation = layer.animate([
      { backgroundColor: 'rgba(11, 13, 12, .62)', backdropFilter: 'blur(8px)' },
      { backgroundColor: 'rgba(11, 13, 12, 0)', backdropFilter: 'blur(0)' },
    ], { duration: 220, easing: 'ease-in', fill: 'forwards' });
    const token = {};
    const finish = () => {
      const closing = closeAnimationRef.current;
      if (closing?.token !== token) return;
      window.clearTimeout(closing.timerId);
      closeAnimationRef.current = null;
      setActiveTool(null);
    };
    const closing = { token, cardAnimation, layerAnimation, timerId: 0 };
    closeAnimationRef.current = closing;
    closing.timerId = window.setTimeout(finish, 360);
    Promise.allSettled([cardAnimation.finished, layerAnimation.finished]).then(finish);
  };

  const selectCategory = (category) => {
    categoryJumpCleanupRef.current?.();
    categoryJumpCleanupRef.current = null;
    pendingCategoryRef.current = category === '全部' ? null : category;
    setActiveCategory(category);
    setQuery('');
    setSavedOnly(false);
    setMobileMenuOpen(false);
    requestAnimationFrame(() => requestAnimationFrame(() => {
      const target = category === '全部' ? document.getElementById('tools') : categoryRefs.current[category];
      if (!target) {
        if (pendingCategoryRef.current === category) pendingCategoryRef.current = null;
        return;
      }
      const targetRect = target.getBoundingClientRect();
      const alreadyObserved = targetRect.bottom > 112 && targetRect.top < window.innerHeight * 0.32;
      if (alreadyObserved && pendingCategoryRef.current === category) pendingCategoryRef.current = null;

      if (pendingCategoryRef.current === category) {
        let fallbackId;
        const cleanup = () => {
          window.removeEventListener('scrollend', release);
          window.clearTimeout(fallbackId);
          if (categoryJumpCleanupRef.current === cleanup) categoryJumpCleanupRef.current = null;
        };
        const release = () => {
          if (pendingCategoryRef.current === category) pendingCategoryRef.current = null;
          cleanup();
        };
        window.addEventListener('scrollend', release, { once: true });
        fallbackId = window.setTimeout(release, 1200);
        categoryJumpCleanupRef.current = cleanup;
      }
      target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }));
  };

  return (
    <div className="app-shell">
      <header className="site-nav">
        <a className="brand" href="#top" aria-label="返回顶部"><span className="brand-wordmark">叁叁</span><span>的实用工具集</span></a>
        <nav className={`nav-links ${mobileMenuOpen ? 'is-open' : ''}`} aria-label="主导航">
          <a className="active" href="#tools" onClick={() => setMobileMenuOpen(false)}>浏览工具</a>
          <a href="#categories" onClick={() => setMobileMenuOpen(false)}>分类</a>
          <button className={savedOnly ? 'nav-saved active' : 'nav-saved'} onClick={() => { setSavedOnly((value) => !value); setMobileMenuOpen(false); }}><Bookmark size={14} /> 已收藏 <span>{saved.size}</span></button>
        </nav>
        <div className="nav-actions">
          <button className="icon-button" onClick={() => searchRef.current?.focus()} aria-label="搜索工具"><Search size={17} /></button>
          <button className="icon-button theme-toggle" onClick={() => setDarkMode((value) => !value)} aria-label={darkMode ? '切换浅色模式' : '切换深色模式'}>{darkMode ? <Sun size={17} /> : <Moon size={17} />}</button>
          <button className="icon-button menu-toggle" onClick={() => setMobileMenuOpen((value) => !value)} aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}>{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        </div>
      </header>

      <main id="top">
        <section className="editorial-masthead">
          <div className="masthead-inner">
            <div className="masthead-copy"><p>CURATED TOOL INDEX / 2026</p><h1>把值得留下的工具，<br /><em>放在手边。</em></h1><span>一份持续更新的个人工具目录，按真正的使用场景整理。</span></div>
            <div className="masthead-side">
              <div className="masthead-search"><Search size={18} /><input ref={searchRef} value={query} onChange={(event) => setQuery(event.target.value)} placeholder="搜索工具、关键词或用途" aria-label="搜索工具、关键词或用途" /><kbd>⌘ K</kbd>{query && <button onClick={() => setQuery('')} aria-label="清除搜索"><X size={15} /></button>}</div>
              <div className="masthead-meta"><span>共 <strong>{tools.length}</strong> 个工具 · <strong>{categoryOrder.length}</strong> 个分类</span><button onClick={openRandomTool}>随机打开 <ArrowUpRight size={15} /></button></div>
            </div>
          </div>
        </section>

        <div className="directory-layout">
          <aside id="categories" className="category-sidebar" aria-label="工具分类">
            <div className="sidebar-list" ref={categoryListRef}>{['全部', ...categoryOrder].map((category) => <button key={category} ref={(node) => { categoryButtonRefs.current[category] = node; }} className={activeCategory === category && !savedOnly ? 'active' : ''} aria-current={activeCategory === category && !savedOnly ? 'location' : undefined} onClick={() => selectCategory(category)}>{category}<span>{category === '全部' ? tools.length : tools.filter((tool) => tool.category === category).length}</span></button>)}</div>
          </aside>
          <section id="tools" className="editorial-main">
            <div className="directory-toolbar"><div><p>当前目录</p><h2 ref={directoryHeadingRef} tabIndex="-1">{savedOnly ? '已收藏' : '全部工具'}</h2></div><div className="toolbar-result"><span>显示 {filteredTools.length} / {tools.length}</span><button className={savedOnly ? 'saved-filter active' : 'saved-filter'} onClick={() => setSavedOnly((value) => !value)}><Bookmark size={14} fill={savedOnly ? 'currentColor' : 'none'} /> {savedOnly ? '查看全部' : '只看收藏'}</button></div></div>
            {groupedTools.map(({ category, items }) => <section className="category-group" data-category={category} ref={(node) => { categoryRefs.current[category] = node; }} key={category}><div className="category-heading"><div><span>SECTION / {String(categoryOrder.indexOf(category) + 1).padStart(2, '0')}</span><h3>{category}</h3><p>{categoryNotes[category]}</p></div><strong>{String(items.length).padStart(2, '0')}</strong></div><div className="editorial-grid">{items.map((tool) => <ToolCard key={tool.id} tool={tool} isSaved={saved.has(tool.id)} onSave={() => toggleSaved(tool.id)} onOpen={(event) => openTool(tool, event.currentTarget)} />)}</div></section>)}
            {!groupedTools.length && <div className="empty-state"><Search size={22} /><h3>没有找到匹配的工具</h3><p>试试更短的关键词，或切换到“全部工具”。</p></div>}
          </section>
        </div>

        <section className="closing-band"><div><p>叁叁的工具目录</p><h2>下次需要时，<br /><em>这里已经准备好了。</em></h2></div><button className="dark-button" onClick={openRandomTool}>打开一个工具 <ExternalLink size={16} /></button></section>
      </main>
      <footer className="site-footer"><span>叁叁的实用工具集</span><span>用心收集，保持更新</span><span>{saved.size ? `${saved.size} 个已保存` : '个人工作台'}</span></footer>
      {activeTool && <ToolModal tool={activeTool} originRect={activeOriginRef.current} openAnimationRef={openAnimationRef} isSaved={saved.has(activeTool.id)} onSave={() => toggleSaved(activeTool.id)} onClose={closeTool} />}
    </div>
  );
}

function ToolCard({ tool, isSaved, onSave, onOpen }) {
  return <article className="tool-row" data-tool-id={tool.id}>
    <button className="tool-open" onClick={onOpen} aria-label={`查看 ${tool.name} 的详情`}>
      <ToolIcon tool={tool} />
      <div className="row-copy"><h3>{tool.name}</h3><div className="tag-list">{tool.keywords.slice(0, 3).map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div>
    </button>
    <div className="row-meta"><span className="row-category">{tool.category}</span><button className={`bookmark-small ${isSaved ? 'saved' : ''}`} onClick={onSave} aria-label={isSaved ? `取消保存 ${tool.name}` : `保存 ${tool.name}`}><Bookmark size={15} fill={isSaved ? 'currentColor' : 'none'} /></button></div>
  </article>;
}

function ToolIcon({ tool, large = false }) {
  const [sourceIndex, setSourceIndex] = useState(0);
  const mark = tool.name.replace(/[^a-zA-Z0-9]/g, '').slice(0, 2).toUpperCase() || '叁';
  const originIcon = (() => {
    try { return new URL('/favicon.ico', tool.url).href; } catch { return ''; }
  })();
  const sources = [...new Set([tool.icon_url, originIcon].filter(Boolean))];
  const source = sources[sourceIndex];

  return <div className={`tool-logo ${large ? 'is-large' : ''}`} aria-hidden="true">
    {source ? <img src={source} alt="" loading={large ? 'eager' : 'lazy'} referrerPolicy="no-referrer" onError={() => setSourceIndex((index) => index + 1)} /> : <span>{mark}</span>}
  </div>;
}

function ToolModal({ tool, originRect, openAnimationRef, isSaved, onSave, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasSharedMotion = Boolean(originRect && Element.prototype.animate && !reduceMotion);
  useLayoutEffect(() => {
    const card = dialogRef.current;
    if (!card || !hasSharedMotion) return undefined;
    const destination = card.getBoundingClientRect();
    const translateX = originRect.left + originRect.width / 2 - (destination.left + destination.width / 2);
    const translateY = originRect.top + originRect.height / 2 - (destination.top + destination.height / 2);
    const animation = card.animate([
      { transform: `translate(${translateX}px, ${translateY}px) scale(${originRect.width / destination.width}, ${originRect.height / destination.height})`, opacity: .85, borderRadius: '0px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0)' },
      { transform: 'none', opacity: 1, borderRadius: '16px', boxShadow: '0 28px 80px rgba(0, 0, 0, .3)' },
    ], { duration: 380, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'both' });
    openAnimationRef.current = animation;
    animation.finished.then(() => {
      if (openAnimationRef.current === animation) {
        animation.cancel();
        openAnimationRef.current = null;
      }
    }).catch(() => {});
    return () => {
      animation.cancel();
      if (openAnimationRef.current === animation) openAnimationRef.current = null;
    };
  }, [hasSharedMotion, openAnimationRef, originRect]);
  useEffect(() => { closeRef.current?.focus(); const onKeyDown = (event) => { if (event.key === 'Tab' && dialogRef.current) { const focusable = dialogRef.current.querySelectorAll('button, a[href]'); if (!focusable.length) return; const first = focusable[0]; const last = focusable[focusable.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } } }; document.addEventListener('keydown', onKeyDown); return () => document.removeEventListener('keydown', onKeyDown); }, []);
  return <div className="modal-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><article className={`expanded-card ${hasSharedMotion ? 'has-shared-motion' : ''}`} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="expanded-title" aria-describedby="expanded-description"><button className="modal-close" ref={closeRef} onClick={onClose} aria-label="关闭详情"><X size={18} /></button><div className="expanded-summary"><ToolIcon tool={tool} large /><div className="expanded-heading"><p>{tool.category}</p><h2 id="expanded-title">{tool.name}</h2><div className="tag-list modal-tags">{tool.keywords.map((keyword) => <span key={keyword}>{keyword}</span>)}</div></div><button className={`save-detail ${isSaved ? 'saved' : ''}`} onClick={onSave} aria-label={isSaved ? '取消保存' : '保存工具'}><Bookmark size={18} fill={isSaved ? 'currentColor' : 'none'} /></button></div><div className="expanded-content"><h3>项目介绍</h3><p className="expanded-description" id="expanded-description">{tool.description}</p><div className="source-line"><span>项目网址</span><a href={tool.url} target="_blank" rel="noreferrer">{tool.url.replace(/^https?:\/\//, '')}<ExternalLink size={14} /></a></div><a className="visit-button" href={tool.url} target="_blank" rel="noreferrer">访问项目 <ArrowUpRight size={16} /></a></div></article></div>;
}

createRoot(document.getElementById('root')).render(<App />);
