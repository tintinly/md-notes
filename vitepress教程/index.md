# vitepress 教程

## 站点&主题配置

### 启用自定义主题

创建一个 `.vitepress/theme/index.js` 来作为主题的入口文件，此时 VitePress 将会使用自定义主题而不再是默认主题，请将将主题作为默认导出来导出：

```ts
// 可以直接在主题入口导入 Vue 文件
// VitePress 已预先配置 @vitejs/plugin-vue
import Layout from './Layout.vue'

export default {
  Layout,
  enhanceApp({ app, router, siteData }) {
    // ...
  }
}
```

### 自定义 CSS

可以通过覆盖根级别的 CSS 变量来自定义默认主题的 CSS

```ts
import DefaultTheme from 'vitepress/theme'
import './custom.css'

export default DefaultTheme
```

在 `.vitepress/theme/custom.css` 添加你想要的自定义 CSS

### 搜索

#### minisearch

VitePress 支持 [minisearch](https://github.com/lucaong/minisearch/) 浏览器内索引进行模糊全文搜索

```ts
import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    search: {
      provider: 'local'
    }
  }
})
```

#### vitepress-plugin-search

安装插件 [vitepress-plugin-search](https://github.com/emersonbottero/vitepress-plugin-search)

```bash
npm i vitepress-plugin-search -D --legacy-peer-deps
npm i flexsearch -D
```

增加配置 `config.ts`

```ts
import { SearchPlugin } from "vitepress-plugin-search";
import { defineConfig } from "vitepress";
export default defineConfig({
  vite: { plugins: [SearchPlugin(options)] }
});
```

#### vitepress-plugin-pagefind

安装插件 [vitepress-plugin-pagefind](https://github.com/ATQQ/sugar-blog/tree/master/packages/vitepress-plugin-pagefind)

```bash
npm i vitepress-plugin-pagefind pagefind
```

增加配置 `config.ts`

```ts
import { defineConfig } from 'vitepress'
import { pagefindPlugin } from 'vitepress-plugin-pagefind'

export default defineConfig({
  vite: {
    plugins: [pagefindPlugin()],
  }
})
```

### 自动生成侧边栏

#### 生成侧边栏示例

安装插件 [vitepress-sidebar](https://github.com/jooy2/vitepress-sidebar)

```bash
npm i -D vitepress-sidebar
```

增加配置 `config.ts`

> 官网提供两种自动生成侧边栏的方式：`withSidebar` 和 `generateSidebar`。下面以 `generateSidebar` 方式示例

```ts
import { generateSidebar } from 'vitepress-sidebar';

export default defineConfig({
  themeConfig: {
    // 侧边栏配置
    sidebar: generateSidebar({
        // 侧边栏根目录
        documentRootPath: '/',
        // 使用h1的标题作为侧边栏的标题
        // useTitleFromFileHeading: true,
        // 使用当前文件夹的 index.md 文件中的信息来获取菜单名称
        // useFolderTitleFromIndexFile: true,
        // 指定一个指向文件夹的链接，导航文件夹中的 index.md
        useFolderLinkFromIndexFile: true,
        // 根据md文件的order进行排序
        sortMenusByFrontmatterOrder: true,
        // 排序之后将不是文件夹的放后面
        sortFolderTo: "top",
        // 菜单展开功能
        collapsed: false,
    }),
  }
});
```

#### 侧边栏缩进

Vitepress 默认从第二层开始缩进，为了更容易地看到子内容所在组的第一级层次结构。

在 `custom.css` 文件中添加以下内容：

```css
.group:has([role='button']) .VPSidebarItem.level-0 .items {
  padding-left: 16px !important;
  border-left: 1px solid var(--vp-c-divider);
  border-radius: 2px;
  transition: background-color 0.25s;
}
```



## Markdown 配置

### 增加脚注支持

安装插件 [markdown-it-footnote](https://github.com/markdown-it/markdown-it-footnote)

```bash
npm install -D markdown-it-footnote
```

增加配置 `config.ts`

```ts
import mdFootnote from "markdown-it-footnote"

export default {
  markdown: {
    config: (md) => {
      md.use(mdFootnote)
    },
  },
}
```

### 增加目录生成的支持

vitepress 默认支持解析 `[[TOC]]` 生成带锚点链接的目录

安装插件 [markdown-it-toc-done-right](https://github.com/nagaozen/markdown-it-toc-done-right)，使其能够识别 `[TOC]` 生成目录

```bash
npm install markdown-it-toc-done-right
```

增加配置 `config.ts`

```ts
import markdownItTocDoneRight from 'markdown-it-toc-done-right'

export default {
  markdown: {
    config: (md) => {
      md.use(markdownItTocDoneRight)
    },
  },
}
```

### 数学方程

安装插件 [markdown-it-mathjax3](https://github.com/tani/markdown-it-mathjax3)

```bash
npm add -D markdown-it-mathjax3
```

增加配置 `config.ts`

```ts
export default {
  markdown: {
    math: true
  }
}
```

### 上下角标

安装插件 [markdown-it-sub](https://github.com/markdown-it/markdown-it-sub) [markdown-it-sup](https://github.com/markdown-it/markdown-it-sup)

```bash
npm install markdown-it-sub markdown-it-sup -D
```

增加配置 `config.ts`

```ts
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'

export default {
  markdown: {
    config: (md) => {
      md.use(markdownItSub)
      md.use(markdownItSup)
    },
  },
}
```

### 任务列表

安装插件 [markdown-it-task-lists](https://github.com/revin/markdown-it-task-lists)

```shell
npm install markdown-it-task-lists --D
```

增加配置 `config.ts`

```ts
import markdownItTaskLists from 'markdown-it-task-lists'

export default defineConfig({
  markdown: {
    config: (md) => {
      md.use(markdownItTaskLists)
    }
  }
})
```

### 图表

安装插件 [vitepress-plugin-mermaid](https://github.com/emersonbottero/vitepress-plugin-mermaid)

```bash
npm i vitepress-plugin-mermaid mermaid -D
```

增加配置 `config.ts`

```ts
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
 
export default defineConfig({
  markdown: {
    config(md) {
      md.use(MermaidMarkdown);
    },
  },
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

```

`custom.css` 中添加样式，使图表居中 

```css
.mermaid {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center; 
}
```

## 构建配置

### 忽略死链接

```ts
export default {
  ignoreDeadLinks: [
    // 忽略精确网址 "/playground"
    '/playground',
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
    // 忽略所有包含 "/repl/" 的链接
    /\/repl\//,
    // 自定义函数，忽略所有包含 "ignore "的链接
    (url) => {
      return url.toLowerCase().includes('ignore')
    }
  ]
}
```

> vitepress 构建检测出来存在死链接 `./index` 表示存在形如 `(xxx)[]` 的空链接

## 常见问题

### 解析文章的标签未闭合

问题：Element is missing end tag.

解决方法：使用 正则表达式 `<[a-zA-Z][a-zA-Z0-9]*[^>]*>` 搜索，逐个排查。