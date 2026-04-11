---
author: Bitaigen 研究團隊
pubDatetime: 2026-04-11T13:15:00Z
modDatetime: 2026-04-11T13:15:00Z
title: "MetaMask新手安裝與使用教學"
slug: metamask-guide-zh-tw
featured: false
draft: false
lang: zh-TW
translationKey: metamask-guide
type: howto
tags:
  - wallet
  - defi
  - beginner
description: "MetaMask怎麼安裝？怎麼用？本文詳細教學Chrome擴充安裝、創建帳戶、添加網路、轉帳等所有步驟，適合DeFi新手。"
faqs:
  - q: "MetaMask安全嗎？"
    a: "MetaMask是非託管錢包，你持有私鑰，安全性不錯。但風險在於瀏覽器本身被駭。長期大額資產建議用硬體錢包。"
  - q: "MetaMask要付費嗎？"
    a: "MetaMask本身完全免費。但使用時要付Gas費（以太坊網路的交易費），這是區塊鏈本身收的，不是MetaMask的。"
  - q: "忘記MetaMask密碼怎麼辦？"
    a: "用Recovery Phrase（12個單詞）就能恢復。所以Recovery Phrase一定要妥善保管。只要有Phrase，就能在任何設備上恢復所有資產。"
---

## MetaMask是什麼？

MetaMask是全球最受歡迎的加密貨幣錢包，超過3000萬用戶。它是個瀏覽器擴充程式，讓你可以：

- 安全保管加密貨幣
- 和DeFi應用互動（借貸、交換、質押等）
- 連接NFT市場
- 完全掌控自己的資產

簡單說，MetaMask就是你的加密銀行。不像交易所，交易所幫你保管資產。MetaMask讓你自己保管，風險在你，自由也在你。

## 第一步：安裝MetaMask

MetaMask支援多種瀏覽器：Chrome、Firefox、Edge、Brave等。我用Chrome示範。

**安裝步驟：**

1. 打開Chrome瀏覽器
2. 進入Chrome應用商店（點chrome右上角三點 → 更多工具 → 擴充功能）
3. 搜尋「MetaMask」
4. 點第一個結果（小狐狸圖標的MetaMask）
5. 點「加到Chrome」
6. 系統會要求確認，點「新增擴充功能」
7. 等候安裝完成

安裝完後，瀏覽器右上角會出現一個橙色小狐狸圖標。點它就能打開MetaMask。

## 第二步：創建帳戶

第一次打開MetaMask，系統會引導你創建新帳戶。

**步驟：**

1. 點「開始」
2. 選「創建新錢包」（如果你有舊錢包就選「導入」）
3. 同意服務條款
4. 設定一個強密碼（至少8個字元，要大小寫+數字+符號）
5. 確認密碼
6. **最重要：備份Recovery Phrase**

Recovery Phrase是12個英文單詞。這些詞能恢復你的整個錢包。你一定要：

- **寫下來**（用筆寫在紙上，不要打在電腦裡）
- **存放在安全地方**（保險箱、家裡某個隱密角落）
- **不要告訴任何人**（包括MetaMask官方）
- **不要拍照上傳雲端**

記錄完Recovery Phrase後，系統會要求你再輸入一遍，確認你確實保存了。

## 第三步：認識MetaMask介面

打開MetaMask，你會看到：

**上方：**
- 當前網路（預設是以太坊主網）
- 帳戶名稱和地址

**中間：**
- 你的餘額（顯示ETH和代幣價值）
- 資產列表

**下方：**
- 「接收」：生成地址接收幣
- 「發送」：轉帳給別人
- 「交換」：在MetaMask裡換幣（用Uniswap等）

**額外功能：**
- 點左上角三條線，可以看交易歷史
- 點設定（齒輪圖標），可以修改密碼、添加網路等

## 第四步：添加其他區塊鏈網路

MetaMask預設只有以太坊，但現在有很多區塊鏈。如果你要用Polygon、BSC（幣安鏈）等，需要手動添加。

**以BSC（幣安智慧鏈）為例：**

1. 打開MetaMask
2. 點上方「以太坊主網」下拉選單
3. 點「添加網路」
4. 手動填入以下資訊：

   - **網路名稱**：Binance Smart Chain
   - **RPC URL**：https://bsc-dataseed1.bnbchain.org:443
   - **Chain ID**：56
   - **貨幣符號**：BNB
   - **區塊瀏覽器URL**：https://bscscan.com

5. 點「保存」

完成後，你就能在MetaMask裡切換到BSC，使用上面的應用和資產。

## 第五步：接收加密貨幣

**在交易所把幣轉出到MetaMask：**

1. 打開MetaMask，點「接收」
2. 複製你的地址（長長的「0x...」開頭的字符）
3. 進入幣安或其他交易所
4. 點「提幣」（withdraw）
5. 選擇幣種（比如USDT）和網路（比如以太坊）
6. 貼上你的MetaMask地址
7. 輸入金額
8. 確認提幣

**重要：網路要匹配！** 如果你在MetaMask上是以太坊網路，交易所也要選以太坊。如果選錯成了Polygon或BSC，幣會直接丟失。

## 第六步：轉帳給別人

假設你要轉1000個USDT給朋友：

1. 打開MetaMask，點「發送」
2. 輸入朋友的地址（他給你的「0x...」地址）
3. 選擇幣種（USDT）
4. 輸入數量（1000）
5. 點「下一步」
6. 確認詳情，包括Gas費
7. 點「確認」
8. 交易被廣播到區塊鏈

幾秒到幾分鐘內，幣就到朋友帳戶了。

**要注意Gas費：** 以太坊上的Gas費有時很貴。如果Gas費超過500元，可以考慮用便宜的網路（比如Polygon或Arbitrum）。

## 第七步：和DeFi應用互動

MetaMask最強大的功能是連接DeFi應用。比如你要在Uniswap交換幣：

1. 進入Uniswap.org
2. 點「連接錢包」
3. 選「MetaMask」
4. MetaMask會彈出確認視窗，點「連接」
5. 現在你就可以在Uniswap上交易了

Uniswap會從你的MetaMask讀取餘額，你批准交易，MetaMask會簽名確認。整個過程中，Uniswap看不到你的私鑰，非常安全。

## 常見問題

**「MetaMask會不會偷我的幣？」**
不會。MetaMask是開源的，所有代碼都在GitHub上可以查看。而且MetaMask本身看不到你的私鑰，也無法偷幣。風險來自釣魚網站或惡意APP，不是MetaMask。

**「Gas費怎麼省？」**
1. 在非高峰時段交易（晚上或周末）
2. 用便宜的網路（Polygon、Arbitrum、Optimism）
3. 等不同的時段自動重試低Gas價格

**「轉帳轉錯地址怎麼辦？」**
區塊鏈是不可逆的，錯誤的地址基本找不回來。所以一定要確認地址是對的。可以對比朋友的地址前5位和後5位是否相同。

**「MetaMask可以存多少錢？」**
沒有上限。理論上無限。但建議小額（幾千到幾萬元）存MetaMask方便交易。大額資產存硬體錢包更安全。

## 安全建議

1. **Recovery Phrase保管好**：這是進入錢包的唯一鑰匙
2. **不要訪問釣魚網站**：騙子會做假的Uniswap、OpenSea網站
3. **小心授權**：連接應用時會要求授權。不確定的應用就別連
4. **定期檢查帳戶活動**：在MetaMask裡點「活動」，看有沒有可疑交易
5. **不要共享屏幕**：如果遠端協助時不要展示MetaMask

## 重點提醒

> MetaMask是強大的DeFi工具，但也增加了複雜性和風險。初學者建議先用交易所熟悉加密貨幣，再進階到MetaMask和DeFi。一旦進入DeFi，要特別警惕詐騙和高風險協議。所有DeFi都有風險，包括資金被凍結、智能合約漏洞等。不要投入超過承受範圍的資金。
