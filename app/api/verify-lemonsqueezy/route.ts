import { NextResponse } from 'next/server';

export async function GET() {
  const storeId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID;
  const premiumVariantId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_PREMIUM_VARIANT_ID;
  const basicVariantId = process.env.NEXT_PUBLIC_LEMON_SQUEEZY_BASIC_VARIANT_ID;
  const apiKey = process.env.LEMON_SQUEEZY_API_KEY;

  // Check if we have the API key to verify products
  if (!apiKey) {
    return NextResponse.json({
      error: 'Missing LEMON_SQUEEZY_API_KEY environment variable',
      instructions: [
        '1. Go to your Lemon Squeezy dashboard',
        '2. Go to Settings > API',
        '3. Copy your API key',
        '4. Add LEMON_SQUEEZY_API_KEY=your_api_key to your .env.local file'
      ]
    });
  }

  try {
    // Try to fetch store information
    const storeResponse = await fetch(`https://api.lemonsqueezy.com/v1/stores/${storeId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    const storeData = await storeResponse.json();

    // Try to fetch variant information
    const variantResponse = await fetch(`https://api.lemonsqueezy.com/v1/variants/${premiumVariantId}`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Accept': 'application/json'
      }
    });

    const variantData = await variantResponse.json();

    return NextResponse.json({
      store: {
        id: storeId,
        exists: storeResponse.ok,
        data: storeData
      },
      variant: {
        id: premiumVariantId,
        exists: variantResponse.ok,
        data: variantData
      },
      checkoutUrl: `https://checkout.lemonsqueezy.com/checkout/buy/${premiumVariantId}?store=${storeId}`,
      recommendations: [
        'If store or variant doesn\'t exist, check your Lemon Squeezy dashboard',
        'Make sure products are published (not in draft mode)',
        'Verify you\'re using the correct Store ID and Variant IDs',
        'Check that you\'re logged into the correct Lemon Squeezy account'
      ]
    });

  } catch (error) {
    return NextResponse.json({
      error: 'Failed to verify Lemon Squeezy configuration',
      details: error instanceof Error ? error.message : 'Unknown error',
      manualCheck: [
        '1. Go to https://app.lemonsqueezy.com',
        '2. Check your Store ID in Settings > General',
        '3. Go to Products and check your Variant IDs',
        '4. Make sure products are published (green "Published" status)'
      ]
    });
  }
} 