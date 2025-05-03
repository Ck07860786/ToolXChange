// components/rent/RentModal.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/modal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { CheckCircle2 } from 'lucide-react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);

export default function RentModal({ tool, onClose }) {
  const [address, setAddress] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // 1) create a PaymentIntent on mount
    fetch('/api/rent/create-payment-intent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        toolId: tool._id,
        amount: Math.round(tool.rentalRate * 100),
      }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setError('Failed to initialize payment.');
      })
      .catch(() => setError('Network error.'));
  }, [tool]);

  return (
    <Modal open={true} onClose={onClose} title={`Rent “${tool.name}”`}>
      <div className="space-y-4">
        <p><strong>Rate:</strong> ${tool.rentalRate} / day</p>
        <Input
          placeholder="Delivery address"
          value={address}
          onChange={e => setAddress(e.target.value)}
        />
        {error && <p className="text-red-600">{error}</p>}

        {clientSecret
          ? <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm
                address={address}
                tool={tool}
                onClose={onClose}
                setError={setError}
              />
            </Elements>
          : !error && <p>Loading payment form…</p>
        }
      </div>
    </Modal>
  );
}

function CheckoutForm({ address, tool, onClose, setError }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    if (!stripe || !elements) return;
    if (!address.trim()) {
      setError('Please enter your address.');
      return;
    }
    setLoading(true);
    setError('');

    // 2) confirmPayment without redirect
    const { error: stripeError, paymentIntent: intent } = await stripe.confirmPayment({
      elements,
      confirmParams: {},
      redirect: 'if_required'
    });

    if (stripeError) {
      setError(stripeError.message);
      setLoading(false);
      return;
    }

    // 3) record rental in your backend
    await fetch('/api/rent/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        paymentIntentId: intent.id,
        toolId: tool._id,
        address,
      }),
    });

    // 4) show confirmation UI
    setPaymentIntent(intent);
    setLoading(false);
  };

  // If payment succeeded, show confirmation
  if (paymentIntent?.status === 'succeeded') {
    return (
      <div className="text-center space-y-4">
        <CheckCircle2 size={48} className="mx-auto text-green-600" />
        <h3 className="text-xl font-semibold">Payment Confirmed!</h3>
        <p>Your rental of <strong>{tool.name}</strong> is all set.</p>
        <p>We’ll deliver it to:</p>
        <p className="italic">{address}</p>
        <Button onClick={onClose}>Close</Button>
      </div>
    );
  }

  // Otherwise, show the payment form
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      <Button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full"
      >
        {loading ? 'Processing…' : 'Pay & Rent'}
      </Button>
    </form>
  );
}
