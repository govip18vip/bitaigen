---
author: Equipe Bitaigen
pubDatetime: 2026-04-11T14:40:00Z
modDatetime: 2026-04-11T14:40:00Z
title: "Ordem de mercado vs ordem limitada: diferenças"
slug: ordem-limite-vs-mercado-pt
featured: false
draft: false
lang: pt
translationKey: ordem-limite-vs-mercado
type: guide
tags:
  - trading
  - exchange
  - education
description: "Entenda a diferença entre ordem de mercado e ordem limitada. Qual usar em cada situação."
faqs:
  - q: "Qual é mais barata: ordem limitada ou de mercado?"
    a: "Ambas têm spread similar. Limitada permite economizar se tiver paciência."
  - q: "Qual é mais rápida?"
    a: "Ordem de mercado é instantânea. Limitada pode demorar horas/dias."
  - q: "Quando usar cada uma?"
    a: "Mercado: urgência. Limitada: economizar uns trocados."
  - q: "Posso cancelar uma ordem limitada?"
    a: "Sim, qualquer momento. Sem penalidade."
  - q: "Qual principiante deve usar?"
    a: "Inicialmente, ordem de mercado é mais simples. Depois aprende limitada."
---

## Ordem de mercado

Você compra/vende **agora**, no preço atual.

**Exemplo:**
- Bitcoin tá R$ 100.000
- Você coloca ordem de compra de R$ 10.000
- Você compra Bitcoin na cotação atual
- Em segundos você tem Bitcoin

Vantagem: instantâneo.

Desvantagem: você paga o preço que tá agora (pode estar caro).

## Ordem limitada

Você coloca um preço que você quer comprar/vender.

Só executa se atingir aquele preço.

**Exemplo:**
- Bitcoin tá R$ 100.000
- Você coloca ordem limitada pra comprar a R$ 99.000
- Você espera Bitcoin cair pra R$ 99.000
- Quando cai, ordem é executada
- Você compra automaticamente

Vantagem: você escolhe o preço.

Desvantagem: pode não executar nunca (Bitcoin nunca cai até R$ 99.000).

## Comparação prática

**Cenário: Bitcoin a R$ 100.000**

**Ordem de mercado:**
- Você compra R$ 10.000 agora
- Você recebe ~0,1 Bitcoin
- Pronto em segundos

**Ordem limitada a R$ 99.000:**
- Você coloca ordem
- Aguarda Bitcoin cair
- Se cair pra R$ 99.000, compra automaticamente
- Economiza R$ 100
- Mas pode esperar dias/semanas

Nesse caso, você economiza R$ 100 mas pode esperar muito.

## Quando usar ordem de mercado?

- **Urgência:** Você quer entrar/sair rápido
- **FOMO:** Todo mundo tá comprando, você quer junto
- **News importante:** Você quer se proteger
- **Quantidade pequena:** Spread é pequeno mesmo (poucos reais de diferença)

Se você tem pressa ou tem medo de perder oportunidade: ordem de mercado.

## Quando usar ordem limitada?

- **Paciência:** Você consegue esperar
- **Quantidade grande:** Com R$ 100.000, economizar uns R$ 500 é 0,5%
- **Preço específico:** Você quer entrar em um nível exato
- **Sem urgência:** Você tá fazendo compra de longo prazo

Se você quer economizar e tem tempo: ordem limitada.

## Spread — o custo oculto

Spread é diferença entre preço de compra e venda.

**Ordem de mercado:** Você paga o spread

**Ordem limitada:** Se executar, você pagou spread menor (ou nenhum, dependendo)

Exemplo:
- Preço de mercado: R$ 100.000
- Bid (quem quer comprar): R$ 99.900
- Ask (quem quer vender): R$ 100.100
- Spread: R$ 200

Com ordem de mercado, você compra por R$ 100.100 (ask).

Com ordem limitada a R$ 100.000, você espera alguém vender por esse preço.

## Taxa maker vs taker

Exchanges cobram taxas diferentes:

**Maker:** Você coloca uma ordem (limitada) que outros pegam. Taxa menor.

**Taker:** Você pega uma ordem existente (mercado). Taxa maior.

Exemplo Binance:
- Maker: 0,1%
- Taker: 0,1%

(Binance é barata. Outras exchanges cobram mais diferença.)

Se você faz ordem limitada muito, você é "maker", taxa é menor.

Se sempre faz mercado, você é "taker", taxa é maior.

## Ordem limitada stop loss

Stop loss é tipo "se preço cair pra R$ 95.000, venda meu Bitcoin".

Você coloca ordem limitada + stop loss.

Se preço cai pra R$ 95.000, ordem é executada e você sai.

Protege você de perdas grandes.

Altamente recomendado se você faz trading.

## Ordem limitada take profit

Inverso do stop loss.

"Se preço subir pra R$ 105.000, venda meu Bitcoin".

Você coloca ordem limitada acima do preço atual.

Se sobe, você vende automaticamente.

Lucra sem precisar ficar de olho o tempo todo.

## Ordem OCO (One Cancels Other)

Você coloca 2 ordens:
1. Stop loss (vender se cair)
2. Take profit (vender se subir)

Apenas uma executa (a que atingir primeiro).

A outra é cancelada automaticamente.

Útil pra proteger ganho E limitar perda.

## Exemplo de trading com ordens

Você quer comprar Bitcoin:

1. Coloca ordem limitada pra comprar a R$ 99.500
2. Ao mesmo tempo, coloca ordem limitada pra vender a R$ 105.000 (take profit)
3. E coloca ordem stop a R$ 95.000 (stop loss)

Agora você tá protegido:
- Se sobe, você vende em R$ 105.000
- Se cai, você sai em R$ 95.000
- Se não faz nada, você pode voltar a cancelar

É como jogar xadrez: você prevê os cenários.

## Qual iniciante deve usar?

**Ordem de mercado** é mais simples.

Se você tem pouca experiência:
1. Aprende com ordem de mercado
2. Vê como funciona
3. Depois explora ordem limitada
4. Depois adiciona stop loss/take profit

Não tenta ser smart demais no começo. Ordem de mercado funciona bem.

## Risco de ordem limitada

Se você coloca ordem limitada a R$ 99.000 mas Bitcoin só desce até R$ 99.100, sua ordem não executa.

Você fica esperando, acha que vai entrar, mas não entra.

Frustração.

Por isso: coloca ordem limitada perto do preço (tipo R$ 99.800 em vez de R$ 99.000).

Aumenta chance de executar.

## Imposto de renda

Não importa qual tipo de ordem.

Se você ganhar dinheiro, você paga 15% de IR.

Ordem de mercado ou limitada não altera.

## Dica profissional

Traders experientes:
- Usam ordens limitadas (economizam spread)
- Colocam stop loss sempre
- Rebalanceiam conforme mercado

Iniciantes:
- Usam ordem de mercado (mais fácil)
- Não usam alavancagem
- Aprendem aos poucos

Depois de 3-6 meses com mercado, você consegue passar pra limitada.

## Resumindo

|  | Ordem Mercado | Ordem Limitada |
|---|---|---|
| **Velocidade** | Instantâneo | Lento (até executar) |
| **Preço** | Preço atual | Seu preço escolhido |
| **Certeza** | 100% executa | Pode não executar |
| **Taxa** | Taker (maior) | Maker (menor) |
| **Facilidade** | Fácil | Um pouco mais complicada |

Ambas são legítimas. Escolhe conforme sua necessidade.

Se tá começando: ordem de mercado.

Se tem experiência: mistura os dois.

> **Aviso:** Nunca coloca ordem limitada muito longe do preço esperando economizar muito. Bitcoin não vai cair 50% só porque você quer. Coloca ordem limitada realista (1-3% de diferença).

Ordens são ferramenta. Aprenda bem.