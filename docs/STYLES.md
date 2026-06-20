# UI 风格橱窗 · 风格实现原理与设计文档

> 版本 1.0 · 2025
> 本文档详细阐述 20 种主流 UI 设计风格的视觉重点、实现原理与核心代码。

---

## 目录

- [一、项目架构总览](#一项目架构总览)
- [二、核心渲染机制](#二核心渲染机制)
- [三、六大分类 · 20 种风格详解](#三六大分类--20-种风格详解)
  - [3.1 扁平与极简类](#31-扁平与极简类)
  - [3.2 拟物类](#32-拟物类)
  - [3.3 玻璃与材质类](#33-玻璃与材质类)
  - [3.4 手绘与插画类](#34-手绘与插画类)
  - [3.5 像素与复古类](#35-像素与复古类)
  - [3.6 其他类](#36-其他类)
- [四、扩展指南](#四扩展指南)

---

## 一、项目架构总览

### 1.1 技术栈

| 层次 | 技术 | 用途 |
|------|------|------|
| 框架 | React 18 + TypeScript | 组件化开发 |
| 构建 | Vite 6 | HMR 热更新 |
| 样式 | Tailwind CSS 3 | 原子类 + CSS 变量 |
| 路由 | React Router 7 | 三页路由（橱窗/详情/对比） |
| 状态 | Zustand 5 + persist | 对比选择持久化 |
| 图标 | Lucide React | 矢量图标库 |

### 1.2 核心文件结构

```
src/
├── types/index.ts          # StyleParams / UIStyle 等核心类型
├── data/styles.ts          # 20 种风格完整参数数据
├── store/                  # Zustand 状态管理
│   ├── useCompareStore.ts  # 对比选择（localStorage 持久化）
│   └── useFilterStore.ts   # 筛选与搜索
├── components/styles/      # ★ 渲染核心（9 个文件）
│   ├── StyleRenderer.tsx   # 风格渲染器入口（CSS 变量注入）
│   ├── StyledButton.tsx    # 按钮
│   ├── StyledInput.tsx     # 输入框
│   ├── StyledSwitch.tsx    # 开关
│   ├── StyledProgress.tsx  # 进度条
│   ├── StyledCard.tsx      # 卡片
│   ├── StyledNav.tsx       # 导航栏
│   ├── StyledTabs.tsx      # 标签页
│   ├── StyledModal.tsx     # 弹窗
│   └── StyleComponentShowcase.tsx  # 三组件组编排
├── components/gallery/     # 首页橱窗卡片、过滤栏、对比浮层
├── components/layout/      # 顶部导航、底部
└── pages/                  # Gallery / StyleDetail / Compare
```

---

## 二、核心渲染机制

### 2.1 CSS 变量注入系统

核心是 `StyleRenderer` 组件。它接收一个 `UIStyle` 对象，将 `style.params` 中的每个字段映射为 CSS 自定义属性（`--style-*`），注入到 DOM 子树的根节点：

```typescript
// StyleRenderer.tsx 核心逻辑
const cssVars = {
  '--style-radius':         style.params.borderRadius,
  '--style-shadow':         style.params.shadow,
  '--style-primary-color':  extractSolidColor(style.params.primaryColor),
  '--style-primary-gradient': style.params.primaryColor,  // ★ 双轨变量
  '--style-text-color':     style.params.textColor,
  // ... 等 16 个变量
};
```

所有 `Styled*` 组件用 `var(--style-*)` 读取这些变量：

```typescript
// StyledButton.tsx
const style: CSSProperties = {
  background: isGradient ? 'var(--style-primary-gradient)' : undefined,
  backgroundColor: !isGradient ? 'var(--style-primary-color)' : undefined,
  borderRadius: 'var(--style-radius)',
  boxShadow: 'var(--style-shadow)',
  color: 'var(--style-text-color)',
  backdropFilter: 'var(--style-backdrop-filter)',
  textShadow: 'var(--style-text-shadow)',
};
```

### 2.2 渐变与纯色 · 双轨处理

**问题**：`linear-gradient()` 只能赋值给简写属性 `background`，不能赋值给 `background-color`；纯色则相反。  
**方案**：每个风格同时维护 2 个变量，组件按需选择：

| 变量 | 内容 | 用途 |
|------|------|------|
| `--style-primary-color` | 纯色（若原定义是渐变，则 `extractSolidColor()` 提取第一个色标） | `background-color` / `border-color` |
| `--style-primary-gradient` | 原始完整定义（可能是纯色，也可能是 `linear-gradient(...)`） | `background` 简写属性 |

```typescript
export function extractSolidColor(value: string): string {
  const gradientMatch = value.match(/#[0-9A-Fa-f]{6}|rgba?\([^)]+\)/);
  return gradientMatch ? gradientMatch[0] : value;
}
```

### 2.3 风格背景适配层（关键！解决玻璃/深色风格空白问题）

**根因**：半透明按钮（如毛玻璃 `rgba(255,255,255,0.25)`）在白色页面上完全看不见；深色风格的白色文字在白容器上也看不见。  
**方案**：`StyleRenderer` 根据 `style.id` 为特殊风格提供定制化展示背景 + 纹理光晕：

```typescript
// StyleRenderer.tsx 背景适配逻辑
if (isGlass) {
  // 蓝→紫→粉 渐变底 + 左上/右下 两个 radial 光晕
  displayBackground = 'linear-gradient(135deg, #1e3a8a 0%, #6d28d9 50%, #831843 100%)';
  // 渲染两个 <div> 作为光晕（绝对定位，z-index 子层级）
} else if (style.id === 'aurora') {
  displayBackground = 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)';
  // 极光特调：深蓝 + 双椭圆径向渐变
} else if (style.id === 'vaporwave') {
  displayBackground = 'linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #1a0a2e 100%)';
  // 蒸汽波特调：深紫渐变 + 网格纹理（background-image）
} else if (style.id === 'cyberpunk') {
  displayBackground = 'linear-gradient(135deg, #0d0221 0%, #1a0533 50%, #0d0221 100%)';
  // 赛博朋克特调：深紫黑 + 扫描线纹理
}
```

### 2.4 差异检测算法（对比页）

对比页遍历所有选中风格的 4 个核心参数（圆角 / 阴影 / 主色 / 模糊），当某一参数在 ≥2 个风格中值不同时，高亮单元格：

```typescript
const hasDifference = (key: StyleParamKey) =>
  new Set(selectedStyles.map((s) => s.params[key])).size > 1;

// 渲染时给 <td> 加条件类名
className={hasDifference(key) ? 'bg-amber-50 font-semibold' : ''}
```

---

## 三、六大分类 · 20 种风格详解

---

### 3.1 扁平与极简类

代表：扁平化 Flat Design、质感设计 Material Design、极简 Minimal

---

#### 1️⃣ 扁平化 Flat Design

| 项目 | 说明 |
|------|------|
| **视觉重点** | 极致去除装饰：无阴影、无渐变、无圆角；纯色块 + 清晰硬边；极高文字对比度 |
| **设计哲学** | iOS 7 时代兴起，把用户注意力从"装饰"拉回"内容"本身 |
| **典型应用** | Windows Metro、早期 iOS 7-8、Google Material 之前的 Android Holo |

**核心参数**：

```typescript
{
  borderRadius: '0px',            // 直角
  shadow: 'none',                 // 无阴影
  primaryColor: '#3B82F6',        // 纯蓝
  backgroundColor: '#FFFFFF',
  textColor: '#1E293B',
  borderWidth: '2px',             // 2px 粗描边
  borderColor: '#1E293B',
}
```

**实现要点**：
- 所有组件强制 `borderRadius: 0`，禁用 Tailwind 默认圆角
- 按钮 hover 状态用颜色加深（`filter: brightness(0.9)`）而非阴影
- 输入框用硬边框而非轮廓线

---

#### 2️⃣ 质感设计 Material Design

| 项目 | 说明 |
|------|------|
| **视觉重点** | "数字纸张"隐喻：每张组件是一层纸，阴影表达 Z 轴高度；4px 小圆角；波纹点击反馈 |
| **设计哲学** | 由 Google 2014 年提出，目标是跨手机/平板/桌面的统一语言 |
| **典型应用** | Gmail、Google Drive、Flutter 默认主题 |

**核心参数**：

```typescript
{
  borderRadius: '4px',
  shadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',  // 双层阴影：高度 1
  hoverShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)', // 高度 2
  primaryColor: '#1976D2',   // Google Blue 700
  secondaryColor: '#FF4081', // Material Pink A200（强调色）
}
```

**实现要点**：
- **双层阴影**是关键：浅层（`0 1px 3px`）+ 深层（`0 1px 2px`），模拟纸边漫反射
- 按钮按下时切换到更高层级的 `hoverShadow`
- 禁用描边，用阴影替代边界感

---

#### 3️⃣ 极简 Minimal

| 项目 | 说明 |
|------|------|
| **视觉重点** | 极致留白 + 单色系统（黑/灰/白为主）；细线 1px 边框；大字号优雅排版 |
| **设计哲学** | "Less but better"—— Dieter Rams 式设计，去除一切不必要元素 |
| **典型应用** | 苹果官网、Awwwards 级作品集、高端时尚品牌站 |

**核心参数**：

```typescript
{
  borderRadius: '2px',              // 几乎直角的微圆角
  shadow: 'none',                   // 无阴影
  primaryColor: '#111111',          // 近纯黑（不是纯 #000，更柔和）
  secondaryColor: '#888888',
  backgroundColor: '#FFFFFF',
  borderWidth: '1px',
  borderColor: '#E5E5E5',           // 极淡的灰边框
}
```

**实现要点**：
- **克制**是关键词：不要加渐变、不要加深色阴影
- 使用 Playfair Display / Noto Serif SC 等衬线字体提升高级感
- 输入框 focus 时用 1px 黑色实边而非蓝色光环

---

### 3.2 拟物类

代表：拟物 Skeuomorphism、新拟态 Neumorphism、黏土拟态 Claymorphism、轻拟物 Soft UI

> **核心共性**：用阴影和渐变模拟真实物理材质的光影关系

---

#### 4️⃣ 拟物 Skeuomorphism

| 项目 | 说明 |
|------|------|
| **视觉重点** | 复刻真实物体：高光顶边 + 厚重投影 + 内阴影凹槽 + 文字浮雕 |
| **设计哲学** | iOS 6 及以前苹果的核心语言，让数字界面"看起来像真实东西"以降低学习成本 |
| **典型应用** | iOS 6 的 Game Center、iCal、早期拟物化 App |

**核心参数**：

```typescript
{
  borderRadius: '8px',
  // 外部投影（厚）+ 顶部高光（inset 内阴影）
  shadow: '0 10px 25px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.4)',
  // ★ 垂直渐变：上亮下暗，模拟被上方光源照射
  primaryColor: 'linear-gradient(180deg, #6BB6FF 0%, #2D7DD2 100%)',
  innerShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)',  // 底边内凹
  textShadow: '0 1px 0 rgba(255,255,255,0.5)',     // 文字下方浮雕感
}
```

**实现要点**：
- **光源在正上方**：所有渐变是 180°（top→bottom），高光在 top，阴影在 bottom
- `textShadow` 给文字加"凸"感：白色阴影在下方 1px
- `innerShadow` 给按钮加"凹"感，模拟按钮嵌入面板

---

#### 5️⃣ 新拟态 Neumorphism

| 项目 | 说明 |
|------|------|
| **视觉重点** | 同色系 **双向阴影**（右下深色 + 左上白色）形成"浮/凹"浮雕效果；背景=按钮色 |
| **设计哲学** | 2019 年末由 Alexander Plyuto 提出，试图在扁平与拟物间找到第三条路 |
| **典型应用** | Dribbble 上的概念设计、健康类 App、冥想类 App |

**核心参数**：

```typescript
{
  borderRadius: '16px',
  // ★ 关键：右下暗阴影 + 左上亮阴影，背景色与按钮色完全相同
  shadow:      '8px 8px 16px #BEBEBE, -8px -8px 16px #FFFFFF',
  innerShadow: 'inset 4px 4px 8px #BEBEBE, inset -4px -4px 8px #FFFFFF', // 按下态
  primaryColor: '#E0E5EC',      // 浅灰蓝：必须与背景色完全一致！
  backgroundColor: '#E0E5EC',   // ★★★ 核心：背景 = 按钮色
  textColor: '#4A5568',
}
```

**实现要点**：
1. **三同原则**：背景色 = 按钮色 = 次级色，三者必须是同一个值
2. **阴影方向**：按钮**凸起**用 `+X +Y 暗, -X -Y 亮`；按钮**凹陷**（pressed/active）用反向内阴影
3. **背景适配**：`StyleRenderer` 强制把新拟态的展示背景设为 `#E0E5EC`，否则效果消失
4. 缺点：**对比度极低**，不适合核心 CTA 按钮，仅适合装饰性控件

---

#### 6️⃣ 黏土拟态 Claymorphism

| 项目 | 说明 |
|------|------|
| **视觉重点** | 大圆角（24px+）+ "黏在地面上"的底部厚阴影 + 顶部高光内阴影；低饱和马卡龙色 |
| **设计哲学** | 2022 年兴起，灵感来自软陶/橡皮泥手工，传递"可爱、安全、无压力"情绪 |
| **典型应用** | 儿童教育 App、宠物类 App、手工艺品电商 |

**核心参数**：

```typescript
{
  borderRadius: '24px',               // 超大圆角
  // 两层阴影：薄投影（y=8px 贴地）+ 漫反射柔光
  shadow: '0 8px 0 rgba(0,0,0,0.1), 0 12px 20px rgba(0,0,0,0.08)',
  // ★ 关键：顶部 2px 白色高光 + 底部 6px 内凹暗影，模拟"橡皮泥"被按扁的边
  innerShadow: 'inset 0 -6px 0 rgba(0,0,0,0.08), inset 0 2px 0 rgba(255,255,255,0.5)',
  primaryColor: '#FFB5C2',   // 樱花粉（低饱和）
  secondaryColor: '#B5D8FF', // 婴儿蓝（低饱和）
  backgroundColor: '#FFF5F5',
}
```

**实现要点**：
- `hoverShadow` 的 y 位移增大（`0 12px 0`），模拟橡皮泥"浮起来"
- 颜色必须**低饱和**：#FFB5C2 而不是 #FF69B4；饱和度高会变成"糖果风"而非"黏土风"

---

#### 7️⃣ 轻拟物 Soft UI

| 项目 | 说明 |
|------|------|
| **视觉重点** | 微妙的轻阴影 + 1px 细描边 + 微渐变；现代扁平但不冰冷 |
| **设计哲学** | "新拟态太极端，扁平太冷漠"——两者的实用折中，2023-2025 年主流选择 |
| **典型应用** | Linear、Notion、Vercel、现代 SaaS 产品 |

**核心参数**：

```typescript
{
  borderRadius: '12px',
  shadow: '0 4px 12px rgba(0,0,0,0.06)',   // 极低 alpha 阴影
  primaryColor: '#F8F9FC',                  // 近白的微冷灰
  borderWidth: '1px',
  borderColor: '#E2E8F0',                   // 1px 细描边（色阶 200）
}
```

**实现要点**：
- 阴影的 alpha **必须 ≤ 0.08**，否则变拟物
- 用描边而非阴影表达组件边界，这是与拟物类的核心区别

---

### 3.3 玻璃与材质类

代表：毛玻璃、亚克力、液态玻璃、极光金属

> **核心共性**：半透明 + `backdrop-filter: blur()` 背景虚化

---

#### 8️⃣ 毛玻璃 Glassmorphism

| 项目 | 说明 |
|------|------|
| **视觉重点** | 高饱和彩色渐变背景上，悬浮一层**半透明白色磨砂**；模糊半径大（16px+）；1px 白色高光边 |
| **设计哲学** | 2020 年苹果 macOS Big Sur 推出，借背景虚化在多窗口下保持空间层次感 |
| **典型应用** | macOS  Dock、iOS 14 控制中心、Fluent Design |

**核心参数**：

```typescript
{
  borderRadius: '16px',
  // ★ 核心：backdrop-filter 让组件"看到"并模糊它背后的内容
  backdropFilter: 'blur(16px) saturate(180%)',
  // ★ 核心：半透明白色（而不是纯色）
  primaryColor: 'rgba(255,255,255,0.25)',
  secondaryColor: 'rgba(255,255,255,0.1)',
  backgroundColor: 'transparent',  // 本身透明，底色由 StyleRenderer 提供
  borderWidth: '1px',
  borderColor: 'rgba(255,255,255,0.18)',  // 1px 微白边 = 玻璃高光
  shadow: '0 8px 32px rgba(0,0,0,0.1)',
}
```

**实现要点（最易出 Bug 的风格）**：
1. **背景必须彩色**：在白页面上 `rgba(255,255,255,0.25)` 是完全看不见的！`StyleRenderer` 会给毛玻璃风格加上蓝→紫→粉渐变底 + 两个 radial 光晕
2. **saturate(180%)**：不能只写 `blur()`，加饱和度让虚化后的颜色更鲜艳，这是苹果和微软的标准做法
3. **文字色 = #FFFFFF**：深色背景上必须用白字，`StyleComponentShowcase` 强制所有文本元素应用 `color: var(--style-text-color)`

---

#### 9️⃣ 亚克力 Acrylic

| 项目 | 说明 |
|------|------|
| **视觉重点** | 微软 Fluent Design 的材质：**更高透明度 + 更厚模糊 + 低对比文字**；更"白"、更"实" |
| **与毛玻璃区别** | 毛玻璃透明度 25%，亚克力 60%；毛玻璃深彩底，亚克力浅灰底；亚克力饱和度更低 |
| **典型应用** | Windows 11 设置面板、Office 365 标题栏 |

**核心参数**：

```typescript
{
  borderRadius: '8px',          // 比毛玻璃小（微软风格严谨）
  backdropFilter: 'blur(20px) saturate(160%)',
  primaryColor: 'rgba(255,255,255,0.6)',   // 更高透明度（更"实"）
  secondaryColor: 'rgba(243,243,243,0.7)',
  backgroundColor: '#F3F3F3',   // 浅灰底（微软风格的底色）
  textColor: '#1B1B1B',         // 深灰文字，不是白
}
```

---

#### 🔟 液态玻璃 Liquid Glass

| 项目 | 说明 |
|------|------|
| **视觉重点** | 液体般的流动感：**高光顶边（内阴影白）+ 暗底边（内阴影黑）** 形成"水面折射" |
| **与毛玻璃区别** | 毛玻璃是"磨砂"，液态玻璃是"透明水面"；液态玻璃加了 innerShadow |
| **典型应用** | 苹果 iPhone 15 Pro 的灵动岛周边、iOS 小组件 |

**核心参数**：

```typescript
{
  borderRadius: '20px',
  backdropFilter: 'blur(8px)',    // 模糊半径更小（因为是透明的水，不是磨砂）
  // ★ 渐变：从更透明到更不透明（上→下），模拟水表面的折射
  primaryColor: 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 100%)',
  // ★ 关键：顶部高光（inset 0 1px 0 白）+ 底部暗影（inset 0 -1px 0 半透明白）
  innerShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(255,255,255,0.1)',
}
```

---

#### 1️⃣1️⃣ 极光金属 Aurora

| 项目 | 说明 |
|------|------|
| **视觉重点** | **5 色流动彩虹渐变**（紫→粉→青→蓝）+ 深色暗夜底；文字带光晕；投影是紫色 |
| **设计哲学** | 高端奢侈感，常用于会员/付费/Premium 功能入口 |
| **典型应用** | Apple Fitness+、Notion AI、高级 SaaS 的付费按钮 |

**核心参数**：

```typescript
{
  borderRadius: '12px',
  // ★ 5 段彩虹渐变：蓝紫→紫红→粉→蓝→青
  primaryColor: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)',
  backgroundColor: '#0F172A',   // slate-900 深暗夜底，让极光渐变更亮
  textColor: '#FFFFFF',
  shadow: '0 10px 30px rgba(139,92,246,0.25)',     // 紫色投影
  textShadow: '0 0 20px rgba(255,255,255,0.3)',    // 白色文字光晕
}
```

**实现要点**：
- `extractSolidColor()` 会把这个超长渐变提取为 `#667eea`（第一个色标），用于 `border-color` 等只能用纯色的场景
- `StyleRenderer` 给极光风格加上双椭圆径向渐变：左上紫 + 右下落日橙

---

### 3.4 手绘与插画类

代表：手绘风、孔版印刷 Risograph、拼贴 Collage

---

#### 1️⃣2️⃣ 手绘风 Hand-drawn

| 项目 | 说明 |
|------|------|
| **视觉重点** | **不对称圆角**（每个角不同值）+ 偏移硬阴影 + 手写字体 + 牛皮纸底色 |
| **设计哲学** | 温度感、人文气息，对抗科技产品的冰冷 |
| **典型应用** | 笔记本类 App（GoodNotes）、儿童教育、手工艺品品牌 |

**核心参数**：

```typescript
{
  // ★ 核心：4 个角值都不同，模拟手绘的"不完美"
  borderRadius: '6px 18px 12px 20px',
  // 硬阴影（无 blur）+ 2~3px 偏移，模拟马克笔在纸面的投影
  shadow: '2px 3px 0 rgba(0,0,0,0.1)',
  hoverShadow: '3px 5px 0 rgba(0,0,0,0.15)',  // hover 偏移增大
  primaryColor: '#FFE4C4',  // 牛皮纸米色
  backgroundColor: '#FFFAF0',
  textColor: '#5C4033',     // 深棕 = 墨水色
  fontFamily: 'Comic Sans MS, cursive',  // 手写字体（生产环境可用 Caveat）
}
```

**实现要点**：
- `borderRadius` 的 4 值写法：`左上 右上 右下 左下`，故意制造"不规整"
- 阴影必须**无 blur**（硬边），偏移量小但可见

---

#### 1️⃣3️⃣ 孔版印刷 Risograph

| 项目 | 说明 |
|------|------|
| **视觉重点** | **套色偏移**（C+M 双色错位）+ 硬阴影是彩色的（不是黑色）；复古印刷机质感 |
| **设计哲学** | Riso 是日本的孔版印刷机，因机器本身的套色不准而形成独特美学 |
| **典型应用** | 独立杂志（Zine）、音乐海报、独立音乐节 |

**核心参数**：

```typescript
{
  borderRadius: '0px',           // 直角（纸张）
  // ★ 核心：阴影是红色（不是黑色！），4px 硬偏移，模拟青色套在红色上的错位
  shadow: '4px 4px 0 #FF6B6B',
  hoverShadow: '6px 6px 0 #FF6B6B',
  primaryColor: '#4ECDC4',       // 青色（Riso 印出来的 C）
  secondaryColor: '#FF6B6B',     // 品红（Riso 印出来的 M）
  backgroundColor: '#F7F3E9',    // 米黄（牛皮纸色）
  borderWidth: '3px',
  borderColor: '#2D3436',
  // ★ 文字阴影是红色（2px 偏移），模拟套色不准
  textShadow: '2px 2px 0 #FF6B6B',
}
```

**实现要点**：
- **颜色三原色**：青 #4ECDC4（主）+ 品红 #FF6B6B（次）+ 深墨黑 #2D3436（描边）
- `textShadow` 让文字看起来是双层印刷套偏了——这是 Risograph 的灵魂

---

#### 1️⃣4️⃣ 拼贴 Collage

| 项目 | 说明 |
|------|------|
| **视觉重点** | 撕纸边缘感 + **多层不同角度阴影** + 暖棕复古色调；模拟手工拼贴 |
| **设计哲学** | 达达主义 / 立体主义的数字延续，手工质感的艺术表达 |
| **典型应用** | 艺术展览网站、作品集、文化类自媒体 |

**核心参数**：

```typescript
{
  borderRadius: '0px 0px 0px 0px',
  shadow: '5px 5px 15px rgba(0,0,0,0.2)',   // 多层漫反射
  primaryColor: '#FFECD2',      // 旧纸张米
  secondaryColor: '#FCB69F',    // 旧胶带橙
  backgroundColor: '#FFF8E7',   // 相册底
  textColor: '#2C1810',         // 深棕墨色
  borderColor: '#D4A574',       // 棕褐色胶带边
}
```

---

### 3.5 像素与复古类

代表：像素风 Pixel Art、蒸汽波 Vaporwave、粗野主义 Brutalism、赛博朋克 Cyberpunk

---

#### 1️⃣5️⃣ 像素风 Pixel Art

| 项目 | 说明 |
|------|------|
| **视觉重点** | 直角 + **4px 粗黑边** + 4px 硬黑阴影 + 等宽字体 + 8-bit 配色（荧光绿/品红） |
| **设计哲学** | 怀旧 FC/NES 游戏美学，8/16 位机时代的视觉记忆 |
| **典型应用** | 复古游戏网站、Indie 游戏宣传页、程序员极客风 |

**核心参数**：

```typescript
{
  borderRadius: '0px',            // 绝对直角
  shadow: '4px 4px 0 #000000',    // ★ 4px 硬黑边投影（无 blur）
  hoverShadow: '6px 6px 0 #000000',
  primaryColor: '#00FF00',        // 荧光绿（Game Boy 绿）
  secondaryColor: '#FF00FF',      // 品红（FC 洋红）
  backgroundColor: '#1A1A2E',     // 深蓝底（深夜空）
  textColor: '#FFFFFF',
  borderWidth: '4px',             // ★ 4px 粗黑边
  borderColor: '#000000',
  fontFamily: 'monospace',        // 等宽字体（Courier / JetBrains Mono）
}
```

---

#### 1️⃣6️⃣ 蒸汽波 Vaporwave

| 项目 | 说明 |
|------|------|
| **视觉重点** | **粉→紫→蓝 垂直霓虹渐变** + 青/粉双色发光阴影 + 文字粉光；80 年代复古未来主义 |
| **设计哲学** | 2010 年代初兴起的音乐/视觉亚文化，消费主义 + 赛博怀旧的结合 |
| **典型应用** | Synthwave 音乐人主页、复古电子活动、未来主义概念站 |

**核心参数**：

```typescript
{
  borderRadius: '6px',
  // ★ 双色霓虹阴影：粉 + 青，叠加形成深度
  shadow: '0 0 30px rgba(255,20,147,0.5), 0 0 60px rgba(0,255,255,0.3)',
  hoverShadow: '0 0 40px rgba(255,20,147,0.7), 0 0 80px rgba(0,255,255,0.5)',
  // ★ 三段垂直渐变：粉→紫→蓝（模拟日落）
  primaryColor: 'linear-gradient(180deg, #FF6AD5 0%, #C774E8 50%, #AD8CFF 100%)',
  secondaryColor: 'linear-gradient(180deg, #01CDFE 0%, #00FFA3 100%)',
  backgroundColor: '#1A0A2E',    // 深紫底（夜空）
  // ★ 文字光晕：粉→紫 双层
  textShadow: '0 0 10px #FF6AD5, 0 0 20px #C774E8',
  borderColor: '#FF6AD5',        // 霓虹粉描边
}
```

**背景适配**：`StyleRenderer` 给蒸汽波加**等距网格纹理**（`linear-gradient` 45° 交叉线），增强 80 年代合成波的日落感。

---

#### 1️⃣7️⃣ 粗野主义 Brutalism

| 项目 | 说明 |
|------|------|
| **视觉重点** | **4px 纯黑粗边 + 纯黑/纯白**；无阴影无渐变无圆角；故意"丑" |
| **设计哲学** | 借用建筑粗野主义（Brutalism = "raw concrete" 裸混凝土），在 Web 上故意反美学以获关注 |
| **典型应用** | 彭博社商业专题、VICE、独立艺术项目 |

**核心参数**：

```typescript
{
  borderRadius: '0px',
  shadow: 'none',
  primaryColor: '#000000',      // 纯黑按钮
  secondaryColor: '#FFFFFF',
  backgroundColor: '#F5F5F5',
  textColor: '#000000',
  borderWidth: '4px',           // ★ 4px 粗黑边
  borderColor: '#000000',
  fontFamily: 'monospace',      // 等宽字体，强化"信息终端"感
}
```

**实现要点**：
- 反模式：故意不加 hover 动效、不加阴影、不加颜色变化——"我就是原始的"

---

#### 1️⃣8️⃣ 赛博朋克 Cyberpunk

| 项目 | 说明 |
|------|------|
| **视觉重点** | 青+品红 **双色霓虹** + 内阴影发光 + 文字双色光晕；深紫黑底；高科技感暗黑 |
| **设计哲学** | 威廉吉布森《神经漫游者》式的未来：高科技低生活（High tech, low life） |
| **典型应用** | Cyberpunk 2077 官网、区块链/Web3 项目、黑客松活动 |

**核心参数**：

```typescript
{
  borderRadius: '2px',
  // ★ 外层青光 + 内层品红光（内阴影），形成"能量罩"感
  shadow: '0 0 20px rgba(0,255,255,0.4), inset 0 0 20px rgba(255,0,255,0.1)',
  innerShadow: 'inset 0 0 15px rgba(0,255,255,0.1)',
  primaryColor: '#00FFFF',     // 青色 Neon Cyan
  secondaryColor: '#FF00FF',   // 品红 Neon Magenta
  backgroundColor: '#0D0221',  // 极深紫黑
  borderWidth: '2px',
  borderColor: '#00FFFF',      // 青色描边
  // ★ 文字光晕：青→品红 双层，营造"故障艺术"
  textShadow: '0 0 10px #00FFFF, 0 0 20px #FF00FF',
}
```

**背景适配**：`StyleRenderer` 给赛博朋克加**水平扫描线**（`repeating-linear-gradient` 1px 亮/暗交替），模拟 CRT 显示器。

---

### 3.6 其他类

代表：新粗野 Neobrutalism、等距 3D Isometric

---

#### 1️⃣9️⃣ 新粗野 Neobrutalism

| 项目 | 说明 |
|------|------|
| **视觉重点** | **偏移硬黑阴影**（但颜色鲜艳！）+ 3px 黑边 + 直角；把粗野主义的"丑"变得可爱 |
| **与粗野区别** | 粗野 = 黑白；新粗野 = 鲜艳撞色 + 偏移阴影 |
| **典型应用** | 2022 年后的 Notion、Figma 社区插件、Cron 日历 |

**核心参数**：

```typescript
{
  borderRadius: '0px',
  shadow: '4px 4px 0 #000000',    // ★ 纯黑硬阴影（4px 偏移）
  hoverShadow: '6px 6px 0 #000000',
  primaryColor: '#FF5154',        // 高饱和红
  secondaryColor: '#3EC300',      // 高饱和绿（对比色）
  backgroundColor: '#FFF8F0',     // 暖米白（加温暖色）
  textColor: '#000000',
  borderWidth: '3px',
  borderColor: '#000000',         // 3px 纯黑边
}
```

**实现要点**：
- 阴影必须是**纯黑**，不能是半透明——透明就不是新粗野了
- 但**背景必须是暖米白**（`#FFF8F0`），纯白太冷，暖米白让鲜艳色更协调

---

#### 2️⃣0️⃣ 等距 3D Isometric

| 项目 | 说明 |
|------|------|
| **视觉重点** | 大斜角阴影（偏移 6×10px，模拟 30° 等距光源）+ 紫/青撞色；"游戏化"视觉语言 |
| **设计哲学** | 模拟 2.5D 等距视角（SimCity / 模拟人生的视角），强调透视立体感 |
| **典型应用** | 开发工具落地页（如 Linear、Vercel 早期）、区块链游戏、AI Agent 界面 |

**核心参数**：

```typescript
{
  borderRadius: '8px',
  // ★ 阴影不是对称的，y 偏移 > x 偏移，模拟 30° 斜上方光源
  shadow: '6px 10px 20px rgba(0,0,0,0.25)',
  hoverShadow: '8px 14px 28px rgba(0,0,0,0.3)',
  primaryColor: '#8B5CF6',     // 紫（高饱和）
  secondaryColor: '#06B6D4',   // 青（对比色）
  backgroundColor: '#F0F4F8',  // 冷蓝底（科技感）
  borderWidth: '0px',          // 无边（立体感靠阴影）
}
```

---

## 四、扩展指南

### 4.1 新增一种风格

只需 3 步：

**Step 1**：在 `src/data/styles.ts` 中添加：

```typescript
{
  id: 'my-new-style',
  name: '我的新风格',
  nameEn: 'My New Style',
  category: 'flat-minimal',   // 六大分类之一
  categoryName: categoryNames['flat-minimal'],
  description: '一句话描述',
  features: ['关键词1', '关键词2'],
  params: {
    borderRadius: '12px',
    shadow: '...', primaryColor: '...', backgroundColor: '...', textColor: '...',
    // 按需要补全：borderWidth, borderColor, backdropFilter, innerShadow, textShadow, fontFamily
  },
}
```

**Step 2**（可选）：如果新风格是**深色背景**或**半透明**，在 `StyleRenderer.tsx` 的 `darkStyleIds` / `glassStyleIds` 数组和 `displayBackground` 分支中添加 `id`，定制展示背景。

**Step 3**：`npm run dev` 刷新首页，自动出现新卡片！

### 4.2 新增一种组件

在 `src/components/styles/` 下新建 `StyledXxx.tsx`，按如下模板：

```typescript
import React from 'react';

export const StyledXxx: React.FC<Props> = ({ ... }) => {
  return (
    <div style={{
      // ★ 所有样式通过 var(--style-*) 读取
      background: 'var(--style-primary-gradient)',
      borderRadius: 'var(--style-radius)',
      boxShadow: 'var(--style-shadow)',
      color: 'var(--style-text-color)',
    }}>
      ...
    </div>
  );
};
```

然后在 `StyleComponentShowcase.tsx` 的三个组件组（`renderBasic/renderForm/renderData`）中加入即可。

---

> 📄 本文档为 UI 风格橱窗项目的设计与实现说明，版本 v1.0。如需更新请提交 PR。
