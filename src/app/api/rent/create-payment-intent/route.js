// src/app/api/rent/create-payment-intent/route.js
import Stripe from 'stripe'
import { NextResponse } from 'next/server'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export async function POST(request) {
  try {
    const { toolId, amount } = await request.json()

    // create a PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,               // in cents
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
      metadata: { toolId },
    })

    return NextResponse.json(
      { clientSecret: paymentIntent.client_secret },
      { status: 200 }
    )
  } catch (err) {
    console.error('Stripe Error:', err)
    return NextResponse.json(
      { error: 'PaymentIntent creation failed.' },
      { status: 500 }
    )
  }
}
