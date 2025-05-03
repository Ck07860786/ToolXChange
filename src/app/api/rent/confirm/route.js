// src/app/api/rent/confirm/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import dbConnect from '@/lib/dbConnect';
import Rental from '@/models/Rental';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY.trim(), {
  apiVersion: '2022-11-15'
});

export async function POST(request) {
  // ensure DB is connected
  await dbConnect();

  const { paymentIntentId, toolId, address } = await request.json();
  // retrieve PaymentIntent to verify
  const intent = await stripe.paymentIntents.retrieve(paymentIntentId);
  if (intent.status !== 'succeeded') {
    return NextResponse.json({ error: 'Payment not completed.' }, { status: 400 });
  }

  // TODO: pull `userId` from your auth/session (e.g. JWT or NextAuth)
  const userId = request.headers.get('x-user-id'); 
  if (!userId) {
    return NextResponse.json({ error: 'Unauthenticated.' }, { status: 401 });
  }

  // create rental record
  const rental = await Rental.create({
    toolId,
    userId,
    address,
    amount: intent.amount,
    status: 'active',
    rentedAt: new Date()
  });

  return NextResponse.json({ ok: true, rental }, { status: 200 });
}
