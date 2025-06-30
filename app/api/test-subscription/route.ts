import { NextResponse } from 'next/server';

export async function GET() {
  const envVars = {
    storeId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID,
    premiumVariantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID,
    basicVariantId: process.env.NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID,
  };

  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value)
    .map(([key]) => key);

  // Create test checkout URLs
  const testUrls = {
    premium: envVars.storeId && envVars.premiumVariantId 
      ? `https://checkout.lemonsqueezy.com/checkout/buy/${envVars.premiumVariantId}?store=${envVars.storeId}`
      : null,
    basic: envVars.storeId && envVars.basicVariantId
      ? `https://checkout.lemonsqueezy.com/checkout/buy/${envVars.basicVariantId}?store=${envVars.storeId}`
      : null,
  };

  return NextResponse.json({
    status: missingVars.length === 0 ? 'configured' : 'missing_variables',
    environment: envVars,
    missing: missingVars,
    testUrls,
    message: missingVars.length === 0 
      ? 'Environment variables are set! Check if products exist in Lemon Squeezy.' 
      : `Missing variables: ${missingVars.join(', ')}`
  });
} 