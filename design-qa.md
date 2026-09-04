# 方案 3 实现 QA

final result: passed

- accepted concept path: `design-options/screenshots/option-3-overview.png`
- rendered screenshot method: Codex in-app Browser screenshot at desktop and 390×844 mobile viewport
- Browser/IAB verification: app load, search, category filter, saved filter, modal open/close, keyboard Escape, responsive overflow
- copy diff: masthead、目录标题和分类说明沿用方案 3 文案；工具描述直接来自 `src/data/tools.json`
- intentional deviations: 正式应用使用 React 状态和真实 48 条数据；工具条目使用文字缩写标记，避免引入额外图片依赖

视觉对比点：

1. 白色顶部导航 + 黑色 masthead 的纵向层级保持一致。
2. 朱红色 headline emphasis 与分类 active 状态保持一致。
3. 分类 shelf 使用连续矩形按钮和数量标记。
4. 工具目录使用细分隔线、两列编辑式列表和右侧 metadata。
5. 详情使用居中遮罩卡片、深色视觉块、关键词和外链 CTA。
6. 移动端折叠导航、单列条目和横向分类 shelf 均保持可用。
