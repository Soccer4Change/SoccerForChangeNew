import { useEffect, useState } from "react";


export default function About() {
  const [team, setTeam] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Static team data for now instead of fetching from API
    setTeam({
      members: [
        {
          name: "Vedanth Rao",
          position: "Head Coach",
          bio: "Vedanth is a soccer player with 6 years of premier soccer experience, 2 years of select soccer experience and current player at Interlake High School. He has an ever-growing passion for the sport of soccer and loves sharing his skills with others.",
          image: "vedanth.jpg", // Replace with actual image path or URL
        },
        {
          name: "Adel Dekhani",
          position: "Class Coordinator",
          bio: "Adel is a high schooler with a passion for fitness, with over 3 years of teaching experience with Bellevue Ski School. He has extensive experience working with kids and understands how to create an environment where their skills can flourish.",
          image: "adel.png", // Replace with actual image path or URL
        },
         {
          name: "Matthew Bronowski",
          position: "Coach",
          bio: "Matthew has 6 years of competitive soccer experience, including 3 years at the premier level and 3 at the select level. He focuses on creating a positive environment on the field while developing skills and growing as player.",
          image: "matthew.png", // Replace with actual image path or URL
        },
        {
          name: "Harshith Gande",
          position: "Software Lead",
          bio: "Harshith is a high schooler with a passion for software development and web design, with over 2 years of experience with nuemerous projects. He has a strong passion for sports and technology, seeking ways to use both fields to create change in the world.",
          image: "harshith.jpg", // Replace with actual image path or URL
        },
      ],
    });

    const handleScroll = () => {
      const teamSection = document.getElementById("team-section");
      const rect = teamSection.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const arrow = (
    <svg
      className="w-8 h-8 transition-transform group-hover:translate-x-2"
      viewBox="0 0 24 24"
    >
      <path
        className="fill-emerald-600"
        d="M14.59 13H7a1 1 0 0 1 0-2h7.59l-2.3-2.3a1 1 0 1 1 1.42-1.4l4 4a1 1 0 0 1 0 1.4l-4 4a1 1 0 0 1-1.42-1.4l2.3-2.3z"
      ></path>
    </svg>
  );

  return (
    <>
      <div className="flex flex-col gap-16 animate-fade-in">
        {/* Our Story Section */}
        <div className="md:px-24 sm:px-16 px-8 py-12 flex flex-col items-start gap-10">
          <div className="flex flex-col gap-2">
            <h4 className="uppercase tracking-wider font-bold text-emerald-600 text-sm">
              Our Story
            </h4>
            <h1 className="text-4xl font-semibold text-gray-800">
              About Soccer for Change
            </h1>
          </div>

          <div className="flex lg:flex-row flex-col justify-center gap-10">
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-xl font-semibold text-emerald-600">Who we are</h2>
              <p className="transition-opacity duration-700 opacity-80 hover:opacity-100">
                Soccer For Change is a 501(c)(3) nonprofit organization founded by high school
                students Vedanth Rao and Adel Dekhani looking to encourage the development of soccer
                in youth, along with all the positive benefits the sport promotes. We believe that we
                can not only boost skills, but also build important values such as confidence,
                teamwork, and leadership.
              </p>
            </div>
            <div className="h-auto w-0.5 rounded-full bg-gray-200 hidden lg:block" />
            <div className="flex flex-col gap-4 flex-1">
              <h2 className="text-xl font-semibold text-emerald-600">What we do</h2>
              <p className="transition-opacity duration-700 opacity-80 hover:opacity-100">
                At Soccer For Change, we believe that sports can be a powerful tool for personal
                growth and development. Our nonprofit organization provides accessible coaching through
                reduced costs. Our high school coaching staff has experience going through the young
                player pathway and knows what it takes to thrive as an elite soccer player. Your child
                will learn the skills they need to advance as a young player and build confidence all
                while gaining a newfound passion for the sport.
              </p>
            </div>
          </div>
        </div>

        {/* Mission Banner */}
        <div
          className="relative h-[400px] bg-cover bg-center"
          style={{
            backgroundImage: "url('aboutbanner.png')",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="absolute inset-0 bg-emerald-600 opacity-50 mix-blend-multiply z-0"></div>

          <div className="relative h-full w-full flex flex-col justify-center items-center text-center text-white px-6">
            <h1 className="text-4xl font-bold">Our mission is to:</h1>
            <h1 className="text-amber-500 font-bold text-5xl">
              Empower youth through soccer
            </h1>
          </div>
        </div>

        {/* Meet the Team Section */}
        <div
          id="team-section"
          className="min-h-screen md:px-24 sm:px-16 px-8 flex flex-col gap-10 bg-gray-100 -mt-16 pt-24 pb-32"
        >
          <div className="flex flex-col gap-2 text-center">
            <h4 className="uppercase tracking-wider font-bold text-emerald-600 text-sm">
              Leadership
            </h4>
            <h1 className="text-4xl font-semibold text-gray-800">Meet the Team</h1>
          </div>

          <div
            className={`grid gap-10 auto-cols-fr z-30 transition-all duration-1000 ${
              isVisible ? "translate-x-0 opacity-100" : "translate-x-20 opacity-0"
            }`}
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            }}
          >
            {!team || team["members"].length === 0 ? (
              <p className="text-center text-gray-500">No data found.</p>
            ) : (
              team["members"].map((person, index) => (
                <AboutCard key={index} {...person} />
              ))
            )}
          </div>
        </div>

        {/* Join the Team Section */}
        <div className="bg-white py-16 px-8 sm:px-24 text-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-4xl font-semibold text-gray-800">Interested in Joining?</h2>
            <hr className="border-4 w-12 border-emerald-600 mx-auto" />
            <p className="max-w-3xl mx-auto text-gray-600">
              We are always looking for passionate and dedicated coaches to join our team.
              If you love soccer and want to make a difference in the lives of young people,
              we want to hear from you! Check out our current job openings and submit your
              application today.
            </p>
          </div>

          <a
            href="/apply"
            className="mt-6 inline-flex items-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-md hover:bg-emerald-600 hover:text-white transition-colors"
          >
            Apply Now {arrow}
          </a>
        </div>
      </div>
    </>
  );
}

function AboutCard({ name, position, bio, image }) {
  return (
    <div className="flex flex-col p-8 bg-white shadow-md rounded-lg gap-2 max-w-80 h-fit transition-transform hover:scale-105">
      <img
        className="object-cover object-top h-64 rounded-t-lg"
        src={image} // No API prefix needed if you use a static path
        alt={name}
      />
      <div>
        <h2 className="font-semibold text-2xl">{name}</h2>
        <h3 className="text-amber-500 uppercase font-semibold text-xs tracking-wider">
          {position}
        </h3>
      </div>
      <p className="w-auto">{bio}</p>
    </div>
  );
}
