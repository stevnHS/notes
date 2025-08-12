# 紀錄搭建Cesium步驟

> 目標：從零到可以顯示地球、套用地形、初始化相機並能載入資料/3D Tiles 的最小實作與排錯清單。

---

## 前置需求
- Node.js 18+、現代瀏覽器（需支援 WebGL2）
- 擁有 Cesium ion 帳號與 Access Token（免費層可）

## 安裝 Cesium
- 使用套件管理器安裝（擇一）
  - pnpm: `pnpm add cesium`
  - npm: `npm i cesium`
  - yarn: `yarn add cesium`

## 準備靜態資源與 CSS（很重要）
Cesium 需要能取用靜態資源（Workers、Assets、Widgets 等）。有兩種常見做法：

- 做法 A：從套件複製到公開目錄
  1) 將 `node_modules/cesium/Build/Cesium` 整個資料夾複製到專案的公開路徑，例如：`public/cesium`。
  2) 於程式啟動前設定 Base URL：
     ```js
     // 需在 new Viewer 之前：
     window.CESIUM_BASE_URL = '/cesium';
     ```
  3) 匯入小工具樣式：
     ```js
     import 'cesium/Build/Cesium/Widgets/widgets.css';
     ```

- 做法 B：使用建置工具（Vite/Webpack）設定常數
  - 在建置設定中加入：`define: { CESIUM_BASE_URL: JSON.stringify('/cesium') }`
  - 仍需確保部署時 `/cesium` 路徑下有 Cesium 的 Build 資源（可在 CI/打包流程複製）。

> 若載入失敗常見徵兆：Console 出現 Workers 或資產 404，畫面只見灰色背景。請檢查 CESIUM_BASE_URL 與實際資源目錄對應是否正確。

## 設定 Cesium ion Access Token
```js
import { Ion } from 'cesium';
Ion.defaultAccessToken = '<你的 ion token>'; // 放在 new Viewer 之前
```

## 最小 HTML 容器
```html
<div id="cesiumContainer" style="position:fixed; inset:0;"> </div>
```

## 乾淨的 Viewer 實例（精簡 UI）
```js
import 'cesium/Build/Cesium/Widgets/widgets.css';
import { Ion, Viewer } from 'cesium';

window.CESIUM_BASE_URL = '/cesium';
Ion.defaultAccessToken = '<你的 ion token>';

const viewer = new Viewer('cesiumContainer', {
  // 傳統 API：
  // terrainProvider: Cesium.createWorldTerrain(),
  // 新 API（若版本支援）：
  // terrain: Cesium.Terrain.fromWorldTerrain(),

  animation: false,
  timeline: false,
  geocoder: false,
  homeButton: false,
  sceneModePicker: false,
  baseLayerPicker: false,
  navigationHelpButton: false,
  fullscreenButton: false,
  infoBox: false,
  selectionIndicator: false,

  // 降低資源消耗：僅在互動或資料變動時重繪
  requestRenderMode: true,
  maximumRenderTimeChange: Infinity,
});
```

## 初始化 Camera
- 常用兩種方式：
  - setView：立即定位
  - flyTo：動畫飛行至目標

```js
import { Cartesian3, Math as CesiumMath } from 'cesium';

// 1) 直接設定視角（台北 121.5654, 25.0330，高度 1200m）
viewer.camera.setView({
  destination: Cartesian3.fromDegrees(121.5654, 25.0330, 1200),
  orientation: {
    heading: CesiumMath.toRadians(0),    // 0° 朝北
    pitch: CesiumMath.toRadians(-35),    // 俯視 35°
    roll: 0.0,
  },
});

// 2) 飛行至座標（巴黎）
viewer.camera.flyTo({
  destination: Cartesian3.fromDegrees(2.2945, 48.8584, 1200),
  duration: 2.0,
});
```

## 加入地形與底圖
```js
// 地形（傳統寫法）
viewer.terrainProvider = Cesium.createWorldTerrain();

// 內建底圖會隨 token 取得（ion 預設），也可自定 ImageryProvider：
// viewer.imageryLayers.addImageryProvider(new Cesium.IonImageryProvider({ assetId: <id> }));
```

## 載入常見資料
- GeoJSON
```js
const ds = await Cesium.GeoJsonDataSource.load('/data/demo.geojson', {
  clampToGround: true,
});
viewer.dataSources.add(ds);
viewer.flyTo(ds);
```

- 3D Tiles
```js
const tileset = new Cesium.Cesium3DTileset({ url: 'https://assets.cesium.com/<assetId>/tileset.json' });
viewer.scene.primitives.add(tileset);
await tileset.readyPromise;
viewer.flyTo(tileset);
```

## 事件與拾取（Picking）
```js
const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((click) => {
  const picked = viewer.scene.pick(click.position);
  if (Cesium.defined(picked)) {
    console.log('Picked:', picked);
  }
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
```

## 座標與單位速查
- 角度→弧度：`Cesium.Math.toRadians(deg)`；弧度→角度：`Cesium.Math.toDegrees(rad)`
- 經緯度轉 Cartesian3：`Cartesian3.fromDegrees(lon, lat, height)`
- 高度解釋：height 預設相對椭球（Ellipsoid），若要貼地可搭配 `clampToGround` 或使用地形取樣（`sampleTerrainMostDetailed`）

## 效能與體驗建議
- requestRenderMode: true（靜態畫面省電）
- 合理控制 Entity/Primitive 數量，合併樣式、避免過度更新
- 3D Tiles：調整屏幕空間誤差 SSE、優先載入使用者視野內資源
- 關閉不必要的陰影、光照、抗鋸齒

## 常見錯誤排查
- 只見灰色背景：多半為 CESIUM_BASE_URL 錯路徑或靜態資源未部署
- Token 相關錯誤：確認 `Ion.defaultAccessToken` 是否設定於 Viewer 建立前、Token 沒過期
- CORS 問題：自行架設之資料來源需允許跨域
- 3D Tiles 無法顯示：檢查 tileset.json URL、瀏覽器 Network 是否 200、Console 是否出現版本或格式錯誤

## 簡易專案結構建議（以 Vite 為例）
```
project/
├─ public/
│  └─ cesium/            # 從 node_modules 複製的 Build/Cesium
├─ src/
│  └─ main.ts            # 匯入 widgets.css、設定 Token、建立 Viewer
└─ index.html            # 放置 #cesiumContainer
```

## 參考連結
- CesiumJS 官方文件：https://cesium.com/learn/cesiumjs/ref-doc/
- Cesium ion：https://cesium.com/ion/
- 入門指南（官方 Learn）：https://cesium.com/learn/