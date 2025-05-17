import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // ✅ Use Link for routing!

// ✅ Import images so Vite handles them properly
import mainHomepageImage from "/public/Main Homepage Image.jpg";
import whyChooseUsImage from "/public/Why Choose Us.jpg";

export default function Home() {
  const arrow = (
    <svg className="w-8 h-8" viewBox="0 0 24 24">
      <path
        className="fill-[#FFA726]"
        d="M14.59 13H7a1 1 0 0 1 0-2h7.59l-2.3-2.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l2.3-2.3z"
      ></path>
    </svg>
  );

  const whyChooseRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (whyChooseRef.current) {
      observer.observe(whyChooseRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-x-hidden -mt-24">
      {/* Hero Section */}
      <div
        className="relative bg-center bg-cover h-screen sm:bg-fixed"
        style={{
          backgroundImage: `url(${mainHomepageImage})`,
        }}
      >
        <div className="bg-black bg-opacity-55 w-full h-full flex flex-col items-center justify-center gap-6">
          <h1 className="font-bold text-4xl md:text-6xl sm:text-5xl uppercase tracking-wider text-white text-center">
            Soccer for Change
          </h1>
          <h2 className="text-lg md:text-2xl sm:text-xl text-white max-w-[30ch] md:max-w-[65ch] sm:max-w-[45ch] text-center font-thin">
            Empowering the youth through soccer programs that foster teamwork,
            leadership, and personal growth
          </h2>
          
          {/* ✅ Link instead of <a href> */}
          <Link
            to="/register"
            className="flex items-center px-6 py-2.5 bg-emerald-600 rounded-full mt-4 group cursor-pointer"
          >
            <h3 className="font-semibold uppercase tracking-wide text-[#FFA726]">
              Register Now
            </h3>
            <div className="group-hover:translate-x-1 transition-transform">
              {arrow}
            </div>
          </Link>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div
        ref={whyChooseRef}
        className={`transition-opacity transition-transform ease-out duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } will-change-transform will-change-opacity`}
      >
        <div className="bg-white h-fit w-screen flex overflow-hidden px-8 sm:px-24 py-16 sm:py-32 items-center">
          <div className="flex flex-wrap gap-x-24 gap-y-8 items-center">
            {/* Text Section */}
            <div className="flex flex-col gap-4 flex-1 min-w-[300px]">
              <div className="flex flex-col gap-3">
                <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
                <hr className="border-4 w-12 border-emerald-600" />
              </div>

              <p className="max-w-[75ch]">
                Our team of hardworking coaches are all current high school
                players who have experienced development at the youth level. With
                their knowledge, they can guide players and help them build
                well-grounded skills, taking them to the next level on their
                soccer journey.
                <br />
                Visit the{" "}
                {/* ✅ Use Link */}
                <Link to="/about" className="text-blue-600 underline">
                  About
                </Link>{" "}
                page or get started on the{" "}
                <Link to="/register" className="text-blue-600 underline">
                  Registration
                </Link>{" "}
                page!
              </p>
            </div>

            {/* Image Panel */}
            <div className="flex-1 min-w-72 bg-gray-100 p-6 rounded-xl shadow-lg border border-gray-300">
              <img
                className="rounded-lg"
                src={whyChooseUsImage}
                alt="Soccer for Change"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
