# ASP.NET WebAPI 專案初始配置項目

## 一、專案架構與組態

- **專案結構 (Project Structure)**：規劃解決方案的資料夾與分層，職責分離、易於維護。

  - Clean Architecture
  - Onion Architecture
  - N-Tier

- **組態管理 (Configuration)**：集中且區分環境的設定檔管理，敏感資訊不硬編碼。

  - appsettings.json
  - 環境變數
  - Options Pattern

- **程式碼風格與分析 (Linter & Analyzer)**：設定程式碼規範與靜態分析工具，確保品質一致。
  - .editorconfig
  - Roslyn Analyzers
  - StyleCop

## 二、基礎設施配置

- **日誌記錄 (Logging)**：結構化日誌系統，方便除錯與監控。

  - Serilog
  - NLog
  - Seq
  - Datadog

- **全域錯誤處理 (Error Handling)**：統一例外攔截，回傳一致錯誤訊息。

  - Middleware
  - UseDeveloperExceptionPage

- **相依性注入 (Dependency Injection)**：註冊共用服務與倉儲，低耦合高可測試性。

  - ASP.NET Core DI
  - Scrutor

- **資料庫存取 (Database Access)**：設定 ORM 與資料庫連接，建立初始遷移。

  - EF Core
  - Dapper
  - Repository Pattern

- **物件對應 (Object Mapping)**：DTO 與 Entity 轉換，避免直接暴露資料庫結構。
  - AutoMapper
  - Mapster

## 三、API 安全性與通訊

- **驗證與授權 (AuthN & AuthZ)**：配置驗證與授權框架，開發環境可用假驗證。

  - JWT
  - [Authorize]
  - Fake Handler

- **CORS 策略 (Cross-Origin)**：設定跨來源資源共用策略。
  - AddCors()
  - UseCors()
  - Named Policies

## 四、API 文件與版本管理

- **API 文件 (API Documentation)**：自動產生 API 說明文件。

  - Swagger
  - OpenAPI

- **API 版本控制 (API Versioning)**：導入 API 版本管理機制。
  - Asp.Versioning.Mvc.ApiExplorer
  - URL 版本控制

## 五、監控與測試

- **健康檢查 (Health Checks)**：建立 /health 端點，供外部監控。

  - AddHealthChecks()
  - 檢查資料庫、外部服務

- **單元/整合測試專案 (Test Projects)**：建立測試專案，養成 TDD 習慣。
  - xUnit
  - NUnit
  - Moq
  - WebApplicationFactory
