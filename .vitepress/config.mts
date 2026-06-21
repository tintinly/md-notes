import { defineConfig } from 'vitepress'
import markdownItFootnote from "markdown-it-footnote"
import markdownItTocDoneRight from 'markdown-it-toc-done-right'
import markdownItSub from 'markdown-it-sub'
import markdownItSup from 'markdown-it-sup'
import markdownItTaskLists from 'markdown-it-task-lists'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import { generateSidebar } from 'vitepress-sidebar';

const cur_year = new Date().getFullYear()

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "",
  
  
  title: '丁丁书屋',
  description: "记录个人学习笔记",

  // 添加站点图标
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    // ['script', { src: './utils/copyToClip.js', type: 'module' }]
  ], 

  // 配置 Markdown 插件
  markdown: {
    math: true,
    config: (md) => {
      // 脚注
      md.use(markdownItFootnote)
      // 目录生成
      md.use(markdownItTocDoneRight, {
        listType : 'ul'
      })
      // 下标
      md.use(markdownItSub)
      // 上标
      md.use(markdownItSup)
      // 任务列表
      md.use(markdownItTaskLists)
      // Mermaid 图
      md.use(MermaidMarkdown);
    },
  },

  // 配置 Vite 插件
  vite: {
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

  // 构建时忽略死链接
  ignoreDeadLinks: [
    // 忽略精确网址
    //'/playground',
    // 忽略所有 localhost 链接
    /^https?:\/\/localhost/,
    // 忽略所有包含 "/repl/" 的链接
    // /\/repl\//,
    // 自定义函数，忽略所有包含 "ignore "的链接
    /*(url) => {
      return url.toLowerCase().includes('ignore')
    }*/
  ],

  // 主题配置
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/logo.png',
    nav: [
      { text: '学习笔记', link: '/学习笔记/' },
      { text: 'Markdown', link: '/Markdown/Markdown基础' },
      { text: '关于', link: '/about' }
    ],

    // 侧边栏配置
    sidebar: generateSidebar([
      {
        // 侧边栏根目录
        documentRootPath: '/',
        // 排除目录
        excludeByGlobPattern: ['assets/**'],
        // 指定一个指向文件夹的链接，导航文件夹中的 index.md
        useFolderLinkFromIndexFile: true,
        // 根据md文件的order进行排序
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 99,
        // 排序之后将不是文件夹的放后面
        sortFolderTo: "top",
        // 菜单展开功能
        collapsed: false,
      },{
        documentRootPath: '/',
        excludeByGlobPattern: ['assets/**'],
        scanStartPath: '学习笔记',
        basePath: '/学习笔记/',
        resolvePath: '/学习笔记/',
        useFolderLinkFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 99,
        sortFolderTo: "top",
        collapsed: true,
      },{
        documentRootPath: '/',
        excludeByGlobPattern: ['assets/**'],
        scanStartPath: 'Markdown',
        basePath: '/Markdown/',
        resolvePath: '/Markdown/',
        useFolderLinkFromIndexFile: true,
        sortMenusByFrontmatterOrder: true,
        frontmatterOrderDefaultValue: 99,
        sortFolderTo: "top",
        collapsed: false,
      }
    ]),

    // 滚动目录配置
    outline: {
      level: [2, 3], // 设置想要显示的标题级别范围 默认[2, 3]
      label: '目录' // 可选：自定义右侧目录的标题文字
    },

    search: {
      provider: 'local'
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/tintinly' }
    ],

    footer: {
      // message: 'Copyright © 2020 ~ present tintinly',
      copyright: `<div style="display: flex; justify-content: space-between "><p>Copyright © 2025-${cur_year} <a href="https://tintinly.top" style="margin: 0 2px;">tintinly</a></p><p>Released under <a href="https://github.com/tintinly/md-notes/blob/main/LICENSE" style="margin: 0 2px;">MIT</a> <a href="https://creativecommons.org/licenses/by-sa/4.0/" style="margin: 0 2px;">CC BY-SA 4.0</a></p></div>`
    },

    
  },

  lastUpdated: true
});