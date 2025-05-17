import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function CheckoutForm({ totalAmount, onSuccess }) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setErrorMessage(null);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin,
        },
        redirect: 'if_required',
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent && paymentIntent.status === 'succeeded') {
        if (onSuccess) onSuccess();
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred.');
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const regResponse = await fetch('http://localhost:3001/api/save-registration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          parentInfo,
          campers,
          campData,
          participants,
          timestamp: new Date().toISOString(),
        }),
      });
      const regResult = await regResponse.json();

      if (regResult.success) {
        alert('Registration and payment successful!');
        setShowPayment(false);
      } else {
        alert('Payment succeeded, but there was a problem saving your registration.');
      }
    } catch (error) {
      alert('Payment succeeded, but there was a problem saving your registration.');
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-500 text-sm mt-2">{errorMessage}</div>
      )}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="mt-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-md transition w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay $${totalAmount} Now`}
      </button>
    </form>
  );
}
