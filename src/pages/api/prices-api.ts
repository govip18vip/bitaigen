// src/pages/api/prices.json.ts
// 实时行情 API 端点
// 支持多币种、多语言、缓存

import type { APIRoute } from "astro";
import { priceService, MAJOR_COINS } from "@/utils/priceService";

export const GET: APIRoute = async ({ url }) => {
  try {
    const coinIds = url.searchParams.get("ids")?.split(",") || 
      MAJOR_COINS.slice(0, 20).map(c => c.id);
    const limit = parseInt(url.searchParams.get("limit") || "50");

    // 获取价格
    const prices = await priceService.getMultiplePrices(
      coinIds.slice(0, limit),
      true // 启用备用 API
    );

    return new Response(
      JSON.stringify({
        success: true,
        timestamp: new Date().toISOString(),
        count: Object.keys(prices).length,
        data: prices,
      }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
