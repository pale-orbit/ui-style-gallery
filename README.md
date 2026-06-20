<div align="center">
  <h1>🎨 UI 风格橱窗 · Style Gallery</h1>
  <p>沉浸式感受 20 种主流前端 UI 设计风格 · 真实组件渲染 · 支持并排对比</p>
  <p>
    <a href="#features">✨ 功能</a> ·
    <a href="#demo">🖼️ 预览</a> ·
    <a href="#quick-start">🚀 快速开始</a> ·
    <a href="#styles">🎯 20 种风格</a> ·
    <a href="#tech-stack">🛠️ 技术栈</a> ·
    <a href="#docs">📚 文档</a>
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-18-61dafb?logo=react" alt="React 18">
    <img src="https://img.shields.io/badge/TypeScript-5-blue?logo=typescript" alt="TypeScript">
    <img src="https://img.shields.io/badge/Vite-6-646CFF?logo=vite" alt="Vite 6">
    <img src="https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss" alt="Tailwind 3">
    <img src="https://img.shields.io/badge/Status-Stable-brightgreen" alt="Status">
  </p>
</div>

---

## ✨ Features · 功能清单

### 🏠 风格橱窗（首页）

- **20 种风格卡片网格**：每张卡片用对应风格**真实渲染**按钮、开关、输入框等组件，所见即所得
- **6 大分类筛选**：扁平极简 / 拟物类 / 玻璃材质 / 手绘插画 / 像素复古 / 其他
- **关键字搜索**：支持名称、描述、特征多字段模糊匹配
- **多种排序**：按名称 A-Z / Z-A / 按分类
- **加入对比**：每张卡片带勾选框，选中 2~4 个即可进入对比页

### 📖 风格详情页

- **风格介绍**：中英文名称、一句话描述、核心特征标签
- **核心参数面板**：直观展示圆角、阴影、主色、模糊等 4 个关键参数的**实际值**
- **三组件组切换**：
  - 🎛️ **基础控件组**：4 种按钮（主/次/轮廓/幽灵）+ 禁用 + 开关 + 进度条 + Tabs + 导航栏 + 弹窗
  - 📝 **表单组**：4 种输入框（文本/邮箱/密码/搜索）+ 3 个开关 + 提交 / 重置按钮
  - 📊 **数据展示组**：2 张数据卡片 + 列表数据
- **一键加入对比**：详情页顶部按钮快速加入对比池

### 🆚 风格对比页

- **2~4 列分屏**：根据选中数量自动切换 2 / 3 / 4 列栅格
- **三组件组联动**：切换后所有列同步切换
- **差异高亮**：一键高亮各风格在圆角、阴影、主色、模糊上的**不同值**（黄色背景标注）
- **灵活编辑**：每列可单独**替换**或**移除**风格；顶部可**添加**风格
- **持久化状态**：所有对比选择通过 localStorage 持久化，刷新不丢失
- **一键清空**：随时重置对比池

### 🔧 工程级可靠性

- **TypeScript 全量类型安全**：`npm run check` 零错误
- **深色/玻璃风格适配层**：半透明/深色风格自动添加定制背景，不会出现空白按钮
- **响应式布局**：移动端 / 平板 / 桌面端自适应

---

## 🖼️ Preview · 预览

| 页面 | 说明 |
|------|------|
| 🏠 首页橱窗 | 20 张风格卡片，每张真实渲染组件 |
| 📖 风格详情 | 完整展示三大组件组 + 参数面板 |
| 🆚 并排对比 | 4 种玻璃类风格对比，差异高亮 |

> 启动项目后访问 `http://localhost:5173` 即可体验。

---

## 🚀 Quick Start · 快速开始

### 环境要求

- Node.js **≥ 18**
- npm **≥ 9**（或 pnpm / yarn）

### 安装与运行

```bash
# 1. 克隆项目
git clone <your-repo-url>
cd ui-style-gallery

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
# 👉 浏览器访问 http://localhost:5173
```

### 常用脚本

```bash
npm run dev       # 启动开发服务器（Vite + HMR）
npm run build     # 生产构建（输出到 dist/）
npm run preview   # 本地预览生产构建
npm run check     # TypeScript 类型检查（零错误目标）
npm run lint      # ESLint 代码检查
```

---

## 🎯 20 Styles · 六大分类 20 种风格

| 分类 | 风格 | 英文名 | 核心特点 |
|------|------|--------|----------|
| 🟦 **扁平与极简** | 扁平化 | Flat Design | 无阴影渐变，纯色块，清晰边界 |
| 🟦 **扁平与极简** | 质感设计 | Material Design | 谷歌纸张质感，双层阴影系统，4px 圆角 |
| 🟦 **扁平与极简** | 极简 | Minimal | 极致留白，单色克制，优雅排版 |
| 🟫 **拟物类** | 拟物 | Skeuomorphism | 真实纹理，高光阴影垂直渐变，浮雕文字 |
| 🟫 **拟物类** | 新拟态 | Neumorphism | 双向阴影，同色系，浮雕凹凸感 |
| 🟫 **拟物类** | 黏土拟态 | Claymorphism | 24px 大圆角，内阴影高光，低饱和马卡龙 |
| 🟫 **拟物类** | 轻拟物 | Soft UI | 轻阴影 + 1px 细边，现代实用风 |
| 💎 **玻璃与材质** | 毛玻璃 | Glassmorphism | 16px 模糊 + 半透明白，磨砂质感 |
| 💎 **玻璃与材质** | 亚克力 | Acrylic | 微软材质，厚模糊高透明度，浅灰底 |
| 💎 **玻璃与材质** | 液态玻璃 | Liquid Glass | 折射内阴影，水面流动感，渐变透明 |
| 💎 **玻璃与材质** | 极光金属 | Aurora | 5 色彩虹渐变，深黑夜底，高级奢华 |
| 🖌️ **手绘与插画** | 手绘风 | Hand-drawn | 不对称圆角，硬偏移阴影，手写字体 |
| 🖌️ **手绘与插画** | 孔版印刷 | Risograph | 套色偏移，青品红双色，复古印刷 |
| 🖌️ **手绘与插画** | 拼贴 | Collage | 撕纸边，多层堆叠阴影，暖棕复古 |
| 👾 **像素与复古** | 像素风 | Pixel Art | 4px 粗黑边，荧光绿，FC 游戏感 |
| 👾 **像素与复古** | 蒸汽波 | Vaporwave | 粉紫日落渐变，双色霓虹发光，80 年代 |
| 👾 **像素与复古** | 粗野主义 | Brutalism | 纯黑 4px 粗边，黑白极端，无装饰 |
| 👾 **像素与复古** | 赛博朋克 | Cyberpunk | 青品红霓虹，内阴影发光，CRT 扫描线 |
| 🧩 **其他** | 新粗野 | Neobrutalism | 偏移硬阴影，鲜艳撞色，3px 黑边 |
| 🧩 **其他** | 等距 3D | 3D Isometric | 大斜角阴影，紫青撞色，2.5D 立体感 |

> 📚 **每种风格的视觉重点、核心参数与实现原理**详见 [docs/STYLES.md](docs/STYLES.md) 完整文档。

---

## 🛠️ Tech Stack · 技术栈

| 技术 | 版本 | 作用 |
|------|------|------|
| **React** | 18 | 组件化 UI 框架 |
| **TypeScript** | 5 | 静态类型检查 |
| **Vite** | 6 | 极速构建 + HMR |
| **Tailwind CSS** | 3 | 原子类样式系统 |
| **React Router** | 7 | 三页路由（Gallery / Detail / Compare） |
| **Zustand** | 5 | 轻量状态管理，配合 `persist` 中间件实现 localStorage 持久化 |
| **Lucide React** | 最新 | 高质量 SVG 矢量图标 |
| **ESLint** | 9 | 代码规范检查 |

---

## 📂 Project Structure · 项目结构

```
ui-style-gallery/
├── docs/
│   └── STYLES.md                # ★ 20 种风格实现原理完整文档
├── src/
│   ├── types/index.ts           # StyleParams / UIStyle 核心类型
│   ├── data/styles.ts           # ★ 20 种风格参数数据源
│   ├── store/
│   │   ├── useCompareStore.ts   # 对比选择（Zustand + persist）
│   │   └── useFilterStore.ts    # 筛选与搜索状态
│   ├── components/
│   │   ├── styles/              # ★★★ 渲染引擎（CSS 变量系统）
│   │   │   ├── StyleRenderer.tsx          # CSS 变量注入 + 背景适配层
│   │   │   ├── StyledButton.tsx           # 4 种 Variant 按钮
│   │   │   ├── StyledInput.tsx            # 输入框
│   │   │   ├── StyledSwitch.tsx           # 开关
│   │   │   ├── StyledProgress.tsx         # 进度条
│   │   │   ├── StyledCard.tsx             # 卡片
│   │   │   ├── StyledNav.tsx              # 导航栏
│   │   │   ├── StyledTabs.tsx             # 标签页
│   │   │   ├── StyledModal.tsx            # 弹窗
│   │   │   └── StyleComponentShowcase.tsx # 三组件组编排
│   │   ├── gallery/             # 首页橱窗：卡片 / 过滤栏 / 对比浮层
│   │   └── layout/              # 顶部导航 / 底部
│   ├── pages/
│   │   ├── Gallery.tsx          # 🏠 橱窗首页
│   │   ├── StyleDetail.tsx      # 📖 风格详情
│   │   └── Compare.tsx          # 🆚 并排对比
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
├── tsconfig.json
└── README.md
```

---

## 📚 Docs · 延伸阅读

| 文档 | 说明 |
|------|------|
| 📖 **[docs/STYLES.md](docs/STYLES.md)** | 本项目的核心文档 —— 每种风格的**视觉重点、设计哲学、典型应用、完整参数代码、实现要点**，共 20 篇详解 + 扩展指南 |

在 `docs/STYLES.md` 中你将看到：

1. **项目架构总览** — 技术栈与文件结构
2. **核心渲染机制** — CSS 变量注入、渐变/纯色双轨处理、玻璃/深色背景适配层、差异检测算法
3. **20 种风格详解** — 每种风格一张表 + 参数代码 + 实现要点
4. **扩展指南** — 如何新增一种风格 / 新增一种组件

---

## 🧪 Testing · 测试验证

本项目已通过以下测试场景：

| 场景 | 验证项 | 状态 |
|------|--------|------|
| 首页橱窗 | 20 张风格卡片 + 76 交互元素全部正确渲染 | ✅ 通过 |
| 详情页 | 毛玻璃 / 蒸汽波 / 赛博朋克 / 像素 / 新拟态 / 新粗野 / 手绘风 等 7 种风格 × 3 组件组 | ✅ 通过 |
| 对比页 2 列 | 亚克力 + 毛玻璃（玻璃类高风险）× 3 组件组 | ✅ 通过 |
| 对比页 4 列 | 亚克力 + 毛玻璃 + 极光金属 + 液态玻璃（极限）× 基础控件组 | ✅ 通过 |
| 差异高亮 | 不同风格参数不同时黄色高亮 | ✅ 通过 |
| 核心 Bug | 毛玻璃类在白背景上的"空白按钮"问题 | ✅ 已修复 |
| 类型检查 | `npm run check` | ✅ 0 errors |

---

## 🤝 Contributing · 贡献

欢迎通过 Issue / PR 贡献更多风格、组件或修复 Bug！

**新增风格只需 3 步**（详见 `docs/STYLES.md` 第 4 章）：
1. `src/data/styles.ts` 中添加参数定义
2. （可选）`StyleRenderer.tsx` 中为深色/玻璃类定制背景
3. `npm run dev` 刷新，自动出现！

---

## 📄 License · 许可证

MIT License © 2025

---

<div align="center">
  <p>Made with ❤️ for designers & developers</p>
  <p>UI 风格橱窗 · Style Gallery</p>
</div>
