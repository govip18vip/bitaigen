---
author: Bitaigen 研究团队
pubDatetime: 2026-04-11T12:55:00Z
modDatetime: 2026-04-11T12:55:00Z
title: "Gas费是什么？为什么以太坊手续费那么贵"
slug: what-is-gas-fee-zh-cn
featured: false
draft: false
lang: zh-CN
translationKey: what-is-gas-fee
type: guide
tags:
  - gas
  - eth
  - beginner
description: "Gas费是区块链交易的成本。本文解释Gas费的原理、如何计算、为什么以太坊这么贵，以及如何省Gas费。"
faqs:
  - q: "Gas费什么时候最便宜？"
    a: "以太坊用户少的时候，通常是半夜或周末凌晨。这时候可能只要1-2块钱。"
  - q: "Gas费能退吗？"
    a: "不能。交易完成后费用就已经花出去了。只能下次选择便宜的时段交易。"
  - q: "怎样快速知道当前Gas费？"
    a: "进etherscan.io，首页就显示当前标准Gas费。或者在钱包软件里也能看到。"
---

## Gas费的原理

Gas是以太坊上的燃料。每个操作（转账、调用合约等）都要消耗Gas。

Gas费 = Gas数量 × Gas价格

Gas数量取决于操作的复杂度（固定的）。
Gas价格取决于网络拥堵（变动的）。

举例：
- 简单转账需要21000 Gas
- 当前Gas价格是50 Gwei
- 费用 = 21000 × 50 = 1050000 Gwei = 0.00105 ETH ≈ 3块钱

## 为什么以太坊这么贵？

1. **网络拥堵**：以太坊应用太多，用户太多，竞争激烈

2. **设计**：以太坊的Gas模型就是这样设计的

3. **没有扩容**：虽然有Layer2，但主网交易仍然贵

其他链（Polygon、Solana等）为什么便宜？

- 用户少
- 设计不同（Solana的费用模型就便宜）
- 有更好的扩容

## 怎样省Gas费？

**1. 选便宜时段**：半夜或周末交易，Gas费便宜3-5倍

**2. 用Layer2**：用Polygon或Arbitrum，费用便宜100倍

**3. 减少交易次数**：一次完成多个操作，而不是分开

**4. 选低Gas费币**：用Solana、Polygon等而不是以太坊主网

> ⚠️ 提示：Gas费虽然贵，但是必要成本。不要为了省费用去用不安全的方式。选择信誉好的L2方案（如Polygon、Arbitrum）可以两全其美。
