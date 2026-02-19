import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const response = await fetch('https://gateway.ai.vercel.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.AI_GATEWAY_API_KEY || ''}`
      },
      body: JSON.stringify({
        model: 'anthropic/claude-3-sonnet',
        messages: body.messages || [],
        max_tokens: body.max_tokens || 1000,
      })
    })

    if (!response.ok) {
      throw new Error('AI Gateway request failed')
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process AI request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok',
    message: 'Bridge Remit AI Gateway is running',
    features: [
      'Smart recipient suggestions',
      'Fraud detection (coming soon)',
      'Rate prediction (coming soon)'
    ]
  })
}
