# 弱點掃描

## 理論

### 黑箱

DAST (Dynamic Application Security Testing)

### 白箱

SAST (Static Application Security Testing)

### 灰箱

IAST (Interactive Application Security Testing)

## 工具使用

### OWASP ZAP

弱點掃描-黑箱測試

## 修補紀錄

### [ZAP] Content Security Policy (CSP) Header Not Set

主要防止瀏覽器端遭受 XSS 攻擊，我們會在 http 回應標頭給 CSP Header
按照標準應該讓每次回應都隨機產生，但前後端分離架構只能暫時先用 vite 的固定 `html.cspNonce`頂著。

### [ZAP] HSTS

IIS 10.0 可直接做設定

### [ZAP] 不透漏 Server 資訊

在 web.config 加入 security
