import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Forward draft order to Command Center webhook
    const webhookRes = await fetch('https://home.bondhumart.xyz/api/webhook', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.WEBHOOK_SECRET || 'super_secret_bondhu_key_2024'}`
      },
      body: JSON.stringify({
        event: 'order.draft',
        data: body
      })
    })

    const result = await webhookRes.json().catch(() => ({}))
    return NextResponse.json({ success: true, result })
  } catch (e: any) {
    console.error('Draft webhook error:', e.message)
    return NextResponse.json({ success: false, error: e.message })
  }
}
