# 叁叁的实用工具集

一个把常用网站整理成工作台的工具导航项目，方便快速搜索、浏览和收藏日常使用的工具。

在线访问：<https://lsr23-hub.github.io/Toolkit33/>

## 功能

- 按分类浏览工具
- 关键词搜索工具名称、简介和标签
- 收藏常用工具，并保存在本地浏览器
- 支持浅色 / 深色模式
- 查看工具详情并复制网址或直接访问
- 响应式布局，适配桌面和移动端

## 技术栈

- React
- Vite
- SQLite（工具数据源）
- Lucide React
- GitHub Actions + GitHub Pages

## 本地运行

```bash
npm install
npm run dev
```

项目构建前会根据 `sql/tools.sql` 自动生成 `src/data/tools.json`。生产构建和测试命令：

```bash
npm test
npm run build
```

本地预览构建结果：

```bash
npm run preview
```

## 项目结构

```text
sql/tools.sql          工具数据源
scripts/build-tools.mjs 数据生成脚本
src/main.jsx           React 应用入口
src/styles.css         页面样式
.github/workflows/     GitHub Pages 自动部署配置
```

推送到 `main` 分支后，GitHub Actions 会自动构建并发布到 GitHub Pages。
