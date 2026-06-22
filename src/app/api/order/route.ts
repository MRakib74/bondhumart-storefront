import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Forward order to Command Center webhook (server-to-server, no CORS issue)
    const webhookRes = await fetch('https://home.bondhumart.xyz/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer super_secret_bondhu_key_2024'
      },
      body: JSON.stringify({
        event: 'order.created',
        data: body
      })
    })

    const result = await webhookRes.json().catch(() => ({}))
    return NextResponse.json({ success: true, result })
  } catch (e: any) {
    console.error('Order webhook error:', e.message)
    // Still return success so the customer sees confirmation
    return NextResponse.json({ success: true, error: e.message })
  }
}
