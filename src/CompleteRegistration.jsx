import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './Pay';

// Make sure to use your actual publishable key
const stripePromise = loadStripe("pk_live_51PqMxlP7WdKeFflaD5CcGaOMKNKi0qLQrea4YKPCBzYQUlR5u1gzRUZNNcwBB14mcko3EBuAbIe8m7CiaV8HZuEe00NqzMGX4J");

const PORT = 3001;

const CompleteRegistration = () => {
  const location = useLocation();

  const participants = location.state?.participants || 1;
  const campData = {
    campName: location.state?.campName || '',
    campDate: location.state?.campDate || '',
    campLocation: location.state?.campLocation || '',
    campPrice: location.state?.campPrice || 10, // fallback to match Register.jsx
    mapCoordinates: location.state?.mapCoordinates || {},
  };

  const [parentInfo, setParentInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const [campers, setCampers] = useState([]);
  const [showPayment, setShowPayment] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  useEffect(() => {
    const newCampers = Array.from({ length: participants }, () => ({
      firstName: '',
      lastName: '',
      dob: '',
      gender: '',
      medicalConditions: '',
      medications: '',
      allergies: '',
      emergencyFirstName: '',
      emergencyLastName: '',
      emergencyPhone: '',
    }));
    setCampers(newCampers);
  }, [participants]);

  const handleParentChange = (e) => {
    setParentInfo({ ...parentInfo, [e.target.name]: e.target.value });
  };

  const handleCamperChange = (index, e) => {
    const updatedCampers = [...campers];
    updatedCampers[index][e.target.name] = e.target.value;
    setCampers(updatedCampers);
  };

  const totalPrice = participants * campData.campPrice;
  console.log('participants:', participants, 'campPrice:', campData.campPrice, 'totalPrice:', totalPrice);

  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Create payment intent
      const paymentResponse = await fetch('http://localhost:3001/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // cents
          currency: 'usd',
        }),
      });
      const paymentData = await paymentResponse.json();

      if (!paymentData.clientSecret) {
        alert('There was a problem creating the payment. Please try again.');
        return;
      }

      setClientSecret(paymentData.clientSecret);
      setShowPayment(true);
    } catch (error) {
      alert('There was a problem processing your registration. Please try again.');
      console.error(error);
    }
  };

  const handleProceedToPayment = async (e) => {
    e.preventDefault();
    
    try {
      console.log('Starting payment process...');
      console.log('Total price:', totalPrice);
      
      const response = await fetch('http://localhost:3001/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: Math.round(totalPrice * 100), // Convert to cents
          currency: 'usd',
        }),
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (data.error) {
        throw new Error(data.error);
      }

      if (!data.clientSecret) {
        throw new Error('No client secret received from server');
      }

      setClientSecret(data.clientSecret);
      setShowPayment(true);
    } catch (error) {
      console.error('Detailed error:', error);
      alert(`Payment Error: ${error.message}`);
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

  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#059669',
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Complete Your Registration</h1>

      <form onSubmit={handleRegistrationSubmit} className="space-y-6">
        {/* Parent/Guardian Info */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-emerald-600">Parent/Guardian Information</h2>
          <input type="text" name="firstName" placeholder="First Name" value={parentInfo.firstName} onChange={handleParentChange} className="border p-2 w-full" required />
          <input type="text" name="lastName" placeholder="Last Name" value={parentInfo.lastName} onChange={handleParentChange} className="border p-2 w-full" required />
          <input type="email" name="email" placeholder="Email Address" value={parentInfo.email} onChange={handleParentChange} className="border p-2 w-full" required />
          <input type="tel" name="phone" placeholder="Phone Number" value={parentInfo.phone} onChange={handleParentChange} className="border p-2 w-full" required />
        </div>

        {/* Camper Info */}
        {campers.map((camper, index) => (
          <div key={index} className="space-y-4 border p-4 rounded bg-gray-50 mt-8">
            <h2 className="text-lg font-semibold text-gray-700">Camper {index + 1}</h2>
            <input type="text" name="firstName" placeholder="Camper First Name" value={camper.firstName} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
            <input type="text" name="lastName" placeholder="Camper Last Name" value={camper.lastName} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
            <input type="text" name="dob" placeholder="Date of Birth (MM/DD/YYYY)" value={camper.dob} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
            <input type="text" name="gender" placeholder="Gender" value={camper.gender} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
            <input type="text" name="medicalConditions" placeholder="Medical Conditions" value={camper.medicalConditions} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" />
            <input type="text" name="medications" placeholder="Medications" value={camper.medications} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" />
            <input type="text" name="allergies" placeholder="Allergies" value={camper.allergies} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" />
            <input type="text" name="emergencyFirstName" placeholder="Emergency Contact First Name" value={camper.emergencyFirstName} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
            <input type="text" name="emergencyLastName" placeholder="Emergency Contact Last Name" value={camper.emergencyLastName} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
            <input type="tel" name="emergencyPhone" placeholder="Emergency Contact Phone Number" value={camper.emergencyPhone} onChange={(e) => handleCamperChange(index, e)} className="border p-2 w-full" required />
          </div>
        ))}

        <button
          type="submit"
          className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 rounded w-full"
        >
          Proceed to Payment
        </button>
      </form>

      {showPayment && clientSecret && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowPayment(false)}
        >
          <div
            className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowPayment(false)}
              aria-label="Close payment window"
              type="button"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Secure Payment</h2>
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance,
              }}
            >
              <CheckoutForm
                totalAmount={totalPrice}
                onSuccess={handlePaymentSuccess}
              />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompleteRegistration;
