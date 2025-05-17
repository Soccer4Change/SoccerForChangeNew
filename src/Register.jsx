  import { useNavigate } from "react-router-dom";

  export default function Register() {
    const navigate = useNavigate();

    // Single Camp Data (Instead of fetching from API)
    const camp = {
      name: "Soccer Training Camp",
      description: "Sign up your child for a 2-day soccer camp! They will advance their skills and bond with their peers as they complete several practice activities meant for kids of all skill levels! All classes are taught by current high school soccer players with coaching experience.",
      date: "April 7th-8th (Monday and Tuesday)",
      location: "Clyde Hill Elementary School, Clyde Hill",
      price: 10,
      mapCoordinates: { lat: 47.63138208436928, lng: -122.21158220380752 }, 
    };

    // Function to handle "Register Now" button click
    const handleRegister = () => {
      navigate("/pay", {
        state: {
          campName: camp.name,
          campDate: camp.date,
          campLocation: camp.location,
          campPrice: camp.price,
          mapCoordinates: camp.mapCoordinates,
        },
      });
    };

    return (
      <div className="bg-gray-100 min-h-screen py-16 px-8 sm:px-24">
        <h1 className="text-4xl font-semibold text-center text-emerald-600 mb-12">
          Camp Registration
        </h1>

        {/* Single Camp Card */}
        <div className="bg-white shadow-lg rounded-xl flex flex-col md:flex-row overflow-hidden transition-transform hover:scale-105">
          {/* Left Side - Image */}
          <img
            className="w-full md:w-64 h-56 object-cover"
            src="Purchase Camp.jpg"
            alt={camp.name}
          />

          {/* Right Side - Details */}
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{camp.name}</h2>
              <p className="text-gray-600 mt-2">{camp.description}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-700">
                <div className="flex items-center">
                  📅 <span className="ml-1 font-semibold">{camp.date}</span>
                </div>
                <div className="flex items-center">
                  📍 <span className="ml-1 font-semibold">{camp.location}</span>
                </div>
                <div className="flex items-center">
                  💰 <span className="ml-1 font-semibold">${camp.price} per participant</span>
                </div>
              </div>
            </div>

            {/* ✅ Fully Functional Register Button */}
            <button
              onClick={handleRegister}
              className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-md transition"
            >
              Register Now
            </button>
          </div>
        </div>
      </div>
    );
  }
