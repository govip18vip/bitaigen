---
author: Bitaigen Research
pubDatetime: 2026-04-11T10:00:00Z
modDatetime: 2026-04-11T10:00:00Z
title: "Crypto Deposit Not Showing? Here's How to Fix It"
slug: crypto-deposit-not-showing-fix-en
featured: false
draft: false
lang: en
translationKey: crypto-deposit-not-showing-fix
type: howto
tags:
  - troubleshooting
  - deposit
  - exchange
description: "Troubleshooting guide for missing crypto deposits. Learn what to check and how to recover funds."
faqs:
  - q: "How long should I wait before worrying?"
    a: "Bitcoin: Wait 30-60 minutes (6+ confirmations). Ethereum: 5-15 minutes (12+ confirmations). TRON: 30 seconds to 1 minute. Wait these times before investigating."
  - q: "Did I lose my crypto?"
    a: "Probably not. It's likely on-chain waiting for confirmation, or the exchange hasn't reflected it yet. Check the blockchain before panicking."
  - q: "Can the exchange help if deposit is stuck?"
    a: "Yes, usually. Provide them with transaction ID (TXID). They can investigate whether it ever arrived. Don't panic, just contact support."
  - q: "How do I find my transaction ID (TXID)?"
    a: "Look in the wallet you sent from. Your sending wallet shows the TXID. You can then check it on the blockchain (block explorer) to verify the status."
---

Your deposit hasn't shown up and you're panicking. Before you worry, know that most deposits just take time. Let me walk you through the checklist so you can figure out what's actually happening.

## The First Rule: Wait

Don't panic immediately. Different cryptocurrencies have different speeds:

**Bitcoin**: Wait 30-60 minutes (can take up to 2+ hours if network is congested)

**Ethereum**: Wait 5-15 minutes (up to 30 min if congested)

**TRON**: Wait 30-90 seconds (usually instant)

**Other coins**: Varies by blockchain

If you're within these timeframes, your deposit is probably just confirming on-chain.

## Step 1: Check the Exchange

Log into the exchange you're depositing to:

1. Go to Wallet → Deposit History (or Transaction History)
2. Look for your deposit
3. Check the status:
   - **Confirming**: On-chain, waiting for final confirmation
   - **Completed**: Money is in your account (should show in balance)
   - **Pending**: Exchange is processing
   - **Failed**: Something went wrong, ask support

If it says "Completed" but your balance didn't update, refresh the page (browser cache issue).

## Step 2: Check Your Sending Wallet

Go back to the wallet you sent from:

1. Find the transaction in your sending wallet's history
2. Look for the Transaction ID (TXID) or Hash
3. Copy the TXID

The TXID proves your transaction was sent. It looks like:
0x1234567890abcdef... (long string)

## Step 3: Check the Blockchain

Use a block explorer to verify the transaction on-chain:

**For Bitcoin**: https://blockchain.com
**For Ethereum**: https://etherscan.io
**For TRON**: https://tronscan.org
**For others**: Search "blockchain explorer [coin name]"

1. Paste your TXID into the search
2. See transaction details
3. Look for "Confirmations":
   - **0-5 confirmations**: Still confirming (wait)
   - **6+ confirmations** (Bitcoin): Confirmed, should be on exchange
   - **12+ confirmations** (Ethereum): Confirmed, should be on exchange
   - **1+ confirmations** (TRON): Confirmed, should be on exchange

If TXID shows "Confirmed" (enough confirmations), the money reached the exchange. It's their system issue, not a lost transaction.

## Common Causes and Fixes

### Cause 1: Wrong Receiving Address (Loss Scenario)

You pasted the wrong address when sending.

**Check**: Look at your sending wallet transaction. Does it show the address you intended?

**If wrong address**: 
- Crypto is on wrong blockchain or person's account
- You may be able to recover it if it went to a known exchange
- If sent to random address, it's lost

**Prevention**: Always copy addresses, never type. Double-check before sending.

### Cause 2: Wrong Network (Loss Scenario)

You sent BTC on Ethereum network, or ETH on TRON, etc.

**Example**: You had USDT on Ethereum, but sent it to a TRON address on the Ethereum network. Transaction executed but USDT is on wrong chain—unreachable.

**Check**: Block explorer shows the transaction. You can see which network it's on.

**If wrong network**:
- Crypto exists but on wrong chain
- Sometimes recoverable with bridge if you have access to sending wallet
- Often lost unless you have technical skills

**Prevention**: Always verify network before sending. It's the most common cause of loss.

### Cause 3: Exchange Hasn't Processed Yet

You sent correctly, but the exchange is slow to process.

**Happens when**: 
- Exchange is receiving huge volume
- Their wallet address is overloaded
- Network is congested

**Check**: Block explorer shows "Confirmed." Exchange shows "Pending."

**Fix**: Wait 24 hours. Usually processes within hours. Contact support if still pending after 24 hours.

### Cause 4: Minimum Deposit Not Met

Some exchanges have minimum deposit amounts.

**Example**: Exchange requires minimum $50, you sent $10.

**Happens with**: Some altcoins, sometimes on smaller exchanges.

**Check**: Your exchange's deposit page shows minimum amount.

**Fix**: Send the remaining amount to reach minimum, or contact support for exception.

### Cause 5: Account Not Verified

You haven't completed KYC on the exchange.

**Happens when**: Basic registration only, no identity verified.

**Check**: Account → Verification shows "Not Verified."

**Fix**: Complete verification (10-15 minutes). Deposit usually processes after.

### Cause 6: Stale Address

Some exchanges rotate deposit addresses.

**Happens when**: You're using an old deposit address from months ago.

**Check**: Get a fresh deposit address from the exchange.

**Fix**: For future deposits, always generate a new address. Old transactions usually still arrive (most exchanges keep old addresses active).

## Detailed Troubleshooting Process

**Step 1**: Wait the appropriate time for that coin

**Step 2**: Check exchange deposit status ("Confirming," "Completed," etc.)

**Step 3**: Check block explorer for your TXID

**Step 4**: Look at confirmation count
- If 0-2 confirmations: Wait more
- If 6+ confirmations: Contact exchange support

**Step 5**: If confirmed but not on exchange, contact support with:
- TXID
- Amount sent
- Receiving address
- Date/time sent

## What to Tell Support

If contacting exchange support:

"My crypto deposit hasn't arrived. Here are the details:
- TXID: 0x123...
- Sending address: 0xabc...
- Receiving address: 0xdef... (your exchange address)
- Amount: X coins
- Network: [Bitcoin/Ethereum/TRON]
- Date sent: [date/time]
- Block explorer shows [X] confirmations"

Provide this info first. Don't make them ask. Support will investigate.

## Recovery Options (By Scenario)

**If sent to wrong address**: 
- Contact that address owner (if identifiable)
- Check if it went to another exchange (might be recoverable)
- If lost to random address, probably unrecoverable

**If wrong network**:
- Have technical skills? Bridge to correct network
- No skills? Usually lost unless it was exchange's address

**If on exchange but not showing**:
- Contact exchange support
- They may be able to manually credit
- Usually recoverable within 24-48 hours

**If network fee too low and stuck**:
- Bitcoin only: Might be able to bump fee
- Others: Can't do much, wait for mempool to clear

## Prevention Tips

**Always**:
- Copy-paste addresses, never type
- Use QR codes when available
- Verify first transaction with small amount
- Check network before sending
- Generate fresh address before each deposit

**Never**:
- Send without double-checking recipient
- Use old addresses from months ago
- Assume you got it right without verification
- Send large amounts on first try

## Support Response Times

Most exchanges:
- **Binance**: 24-48 hours
- **OKX**: 24-48 hours
- **Bybit**: 12-24 hours
- **Kraken**: 24-48 hours

Small deposits ($<100) usually lower priority than large ones.

## If It's Actually Lost

Crypto is final. You can't reverse transactions. If you've confirmed:
- Correct address was used
- Wrong network was used
- Transaction is confirmed on-chain

Then the crypto is where the network says it is. Crypto doesn't disappear, but it might not be accessible to you.

## Lessons for Next Time

After you recover (or determine it's lost):

1. **Buy small amount first**: Always test wallets and addresses with minimal amounts
2. **Use hardware wallet for large amounts**: Reduces mistakes on your side
3. **Enable 2FA on exchange**: Prevents unauthorized deposits by attackers
4. **Keep TXID records**: Save for taxes and troubleshooting

## Emotional Management

Deposits taking a while is stressful. But:

- Most deposits eventually arrive
- Most delays are just timing
- Support can help if truly stuck

Panicking doesn't help. Systematic troubleshooting does.

> **Risk Disclaimer**: Crypto transactions are irreversible. Wrong addresses or networks = lost funds. Always verify before sending. This is educational content, not financial advice.
