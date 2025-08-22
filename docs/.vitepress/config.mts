import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";

// https://vitepress.dev/reference/site-config
export default withMermaid(
  defineConfig({
    title: "開發筆記",
    description: "前端與後端開發學習筆記",
    lang: "zh-TW",
    // GitHub Pages 部署設定 - 重要！
    base: "/notes/",
    cleanUrls: true,
    // https://vitepress.dev/reference/default-theme-config
    themeConfig: {
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
      nav: nav(),
      sidebar: sidebarAll(),
      editLink: {
        pattern: "https://github.com/stevnHS/notes/edit/main/docs/:path",
        text: "在 GitHub 上編輯此頁",
      },
      lastUpdated: {
        text: "最後更新時間",
      },
      docFooter: {
        prev: "上一頁",
        next: "下一頁",
      },
      outline: {
        label: "頁面導航",
      },
      returnToTopLabel: "回到頂部",
      sidebarMenuLabel: "菜單",
      darkModeSwitchLabel: "主題",
      lightModeSwitchTitle: "切換到淺色模式",
      darkModeSwitchTitle: "切換到深色模式",
      socialLinks: [
        { icon: "github", link: "https://github.com/stevnHS/notes" },
      ],
    },
  })
);

// 導航配置
function nav() {
  return [
    // { text: '首頁', link: '/' },
    { text: "未整理", link: "/未整理/筆記說明" },
    { text: "前端", link: "/前端/aaa" },
    { text: "後端", link: "/後端/aaa" },
  ];
}

// 側邊欄主配置
function sidebarAll() {
  return {
    "/未整理/": getUncategorizedSidebar(),
    "/前端/": getFrontendSidebar(),
    "/後端/": getBackendSidebar(),
  };
}

//#region 側邊攔配置
// 未整理區塊
function getUncategorizedSidebar() {
  return [
    {
      text: "介紹",
      items: [{ text: "筆記說明", link: "/未整理/筆記說明" }],
    },
    {
      text: "前端",
      items: [],
    },
    {
      text: "後端",
      items: [
        {
          text: "開發WebAPI的前置作業",
          link: "/未整理/開發WebAPI的前置作業",
        },
        {
          text: "設計資料表注意事項",
          link: "/未整理/設計資料表注意事項",
        },
        { text: "如何存取檔案", link: "/未整理/如何存取檔案" },
      ],
    },
  ];
}

// 前端區塊
function getFrontendSidebar() {
  return [
    {
      text: "前端開發",
      items: [
        { text: "AAA 筆記", link: "/前端/aaa" },
        { text: "建立專案模板", link: "/前端/建立專案模板" },
      ],
    },
  ];
}

// 後端區塊
function getBackendSidebar() {
  return [
    {
      text: "後端開發",
      items: [{ text: "AAA 筆記", link: "/後端/aaa" }],
    },
  ];
}
//#endregion
