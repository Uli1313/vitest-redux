# React + Vite + Vitest

本專案為 React 應用，使用 Vite 作為開發工具，整合 Redux 進行狀態管理，並以 Vitest 進行單元測試。

## 主要功能

- ⚡️ Vite 開發環境
- ⚛️ React 前端框架
- 🗃️ Redux 狀態管理與測試
- 🧪 Vitest 單元測試

## 常用指令

```bash
npm install      # 安裝依賴
npm run dev      # 啟動開發伺服器
npm run test     # 執行所有測試
```

## 專案結構

```
README.md
package.json
vite.config.js
public/
  vite.svg
src/
  App.css
  App.jsx
  index.css
  main.jsx
  setupTests.js
  assets/
    react.svg
  component/
    UserDisplay/
      UserDisplay.jsx
      UserDisplay.test.jsx
  store/
    hooks.js
    index.js
    store.js
    userSlice.js
  utils/
    test-utils.jsx
```

## 其他

- 本專案著重於 Redux 狀態管理的實作與測試，相關程式碼位於 `src/store` 目錄。
- 建議搭配 TypeScript 與 ESLint 增強型別與程式碼品質（可自行擴充）。

---

如需更詳細設定，請參考各設定檔與原始碼。
