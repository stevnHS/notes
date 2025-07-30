import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "開發筆記",
  description: "前端與後端開發學習筆記",
  lang: "zh-TW",

  // GitHub Pages 部署設定 - 重要！
  base: "/notes/",

  // 確保中文路徑能被正確處理
  cleanUrls: true,

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config

    // 搜尋功能
    search: {
      provider: "local",
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: "搜尋文檔",
                buttonAriaLabel: "搜尋文檔",
              },
              modal: {
                noResultsText: "無法找到相關結果",
                resetButtonTitle: "清除查詢條件",
                footer: {
                  selectText: "選擇",
                  navigateText: "切換",
                },
              },
            },
          },
        },
      },
    },

    nav: [
      // { text: '首頁', link: '/' },
      { text: "未整理", link: "/未整理/aaa" },
      { text: "前端", link: "/前端/aaa" },
      { text: "後端", link: "/後端/aaa" },
    ],

    sidebar: {
      "/未整理/": [
        {
          text: "未整理筆記",
          items: [{ text: "AAA 筆記", link: "/未整理/aaa" }],
        },
      ],
      "/前端/": [
        {
          text: "前端開發",
          items: [
            { text: "AAA 筆記", link: "/前端/aaa" },
            { text: "建立專案模板", link: "/前端/建立專案模板" },
          ],
        },
      ],
      "/後端/": [
        {
          text: "後端開發",
          items: [{ text: "AAA 筆記", link: "/後端/aaa" }],
        },
      ],
    },

    // 編輯連結
    editLink: {
      pattern: "https://github.com/stevnHS/notes/edit/main/docs/:path",
      text: "在 GitHub 上編輯此頁",
    },

    lastUpdated: {
      text: "最後更新時間",
    },

    // 文檔頁腳
    docFooter: {
      prev: "上一頁",
      next: "下一頁",
    },

    // 大綱標題
    outline: {
      label: "頁面導航",
    },

    // 返回頂部
    returnToTopLabel: "回到頂部",

    // 側邊欄菜單標籤
    sidebarMenuLabel: "菜單",

    // 深色模式切換標籤
    darkModeSwitchLabel: "主題",
    lightModeSwitchTitle: "切換到淺色模式",
    darkModeSwitchTitle: "切換到深色模式",

    socialLinks: [{ icon: "github", link: "https://github.com/stevnHS/notes" }],
  },
});
