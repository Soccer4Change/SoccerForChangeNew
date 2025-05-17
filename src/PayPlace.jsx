import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function PayPlace() {
  const location = useLocation();
  const navigate = useNavigate();
  const campData = location.state;

  const [participants, setParticipants] = useState(1);

  const campName = campData?.campName || "Unknown Camp";
  const campDate = campData?.campDate || "April 7th-8th (Monday and Tuesday)";
  const campLocation = campData?.campLocation || "123 Soccer Field, Springfield";
  const campPrice = campData?.campPrice || 150;
  const mapCoordinates = campData?.mapCoordinates || { lat: 37.7749, lng: -122.4194 };

  const totalPrice = participants * campPrice;

  const goToCompleteRegistration = () => {
    navigate("/complete-registration", {
      state: {
        participants,
        campName: campData?.campName,
        campDate: campData?.campDate,
        campLocation: campData?.campLocation,
        campPrice: campData?.campPrice,
        mapCoordinates: campData?.mapCoordinates,
      },
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div
        className="relative bg-cover bg-center h-[60vh] flex items-center justify-center text-center text-white"
        style={{ backgroundImage: "url('Purchase Camp.jpg')" }}
      >
        <div className="bg-black bg-opacity-50 absolute inset-0"></div>
        <div className="relative z-10 p-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">{campName}</h1>
          <p className="mt-4 text-lg">
            Train with top high school coaches and take your game to the next level.
          </p>
        </div>
      </div>

      <section className="py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-emerald-600 mb-8">Event Summary</h2>
        <div className="flex flex-wrap justify-center gap-8">
          <div className="max-w-md w-80 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">📅 Date & Time</h3>
            <p className="mt-2 text-gray-600">{campDate}</p>
          </div>
          <div className="max-w-md w-80 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">📍 Location</h3>
            <p className="mt-2 text-gray-600">{campLocation}</p>
          </div>
          <div className="max-w-md w-80 p-6 bg-white shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">💰 Cost per Participant</h3>
            <p className="mt-2 text-gray-600">${campPrice}</p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-emerald-600 text-center">Event Details</h2>
        <div className="mt-8 max-w-3xl mx-auto text-gray-700 text-center">
          <p>
            April 7th-8th (Monday and Tuesday), sign up your child for a 2-day soccer camp!
            They will advance their skills and bond with their peers as they complete
            several practice activities meant for kids of all skill levels! All classes
            are taught by current high school soccer players with coaching experience.
          </p>
        </div>
      </section>

      {/* Registration Redirect Section */}
      <div className="bg-white h-fit w-screen flex flex-col items-center px-8 sm:px-24 py-16 sm:py-32">
        <h2 className="text-3xl font-semibold text-emerald-600">Complete Registration</h2>
        <p className="text-gray-600 mt-2 text-center">
          Choose the number of participants and proceed to registration.
        </p>

        <div className="mt-6 flex flex-col items-center">
          <label className="block text-lg font-semibold text-gray-700 text-center mb-2">
            Number of Participants
          </label>
          <div className="flex items-center">
            <button
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-l-md disabled:opacity-50"
              onClick={() => setParticipants((prev) => Math.max(1, prev - 1))}
              disabled={participants === 1}
            >
              −
            </button>
            <span className="px-6 py-2 bg-gray-200 text-lg font-semibold">
              {participants}
            </span>
            <button
              className="bg-gray-300 text-gray-700 px-3 py-1 rounded-r-md"
              onClick={() => setParticipants((prev) => prev + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* <div className="mt-6 text-lg font-semibold text-gray-800">
          Total Price: <span className="text-emerald-600">${totalPrice.toFixed(2)}</span>
        </div> */}

        <button
          className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-md transition"
          onClick={goToCompleteRegistration}
        >
          Continue to Registration
        </button>
      </div>

      <section className="py-16 px-6 bg-gray-200">
        <h2 className="text-3xl font-bold text-emerald-600 text-center">Event Location</h2>
        <div className="mt-8 flex justify-center">
          <iframe
            title="Event Location"
            src={`https://www.google.com/maps?q=${mapCoordinates.lat},${mapCoordinates.lng}&z=15&output=embed`}
            className="w-full max-w-4xl h-96 border-0 rounded-lg"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>

      <section className="py-16 px-6">
        <h2 className="text-3xl font-bold text-emerald-600 text-center">
          Frequently Asked Questions
        </h2>
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="p-4 bg-white shadow-md rounded-lg mb-4">
            <h3 className="text-xl font-semibold">Who can join the camp?</h3>
            <p className="text-gray-600 mt-2">The camp is open to all players ages 8-12.</p>
          </div>
          <div className="p-4 bg-white shadow-md rounded-lg mb-4">
            <h3 className="text-xl font-semibold">What should I bring?</h3>
            <p className="text-gray-600 mt-2">
              Bring cleats, shin guards, a water bottle, snacks, and a positive attitude!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
