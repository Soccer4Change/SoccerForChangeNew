import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

// ✅ NavItem component
function NavItem({ to, name }) {
  const location = useLocation();
  const [isTopOfPage, setIsTopOfPage] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY === 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <NavLink to={to} end>
      {({ isActive }) => (
        <div className="w-fit">
          <span
            className={`transition-colors duration-300 ${
              isActive
                ? "text-emerald-500 font-bold"
                : isTopOfPage && location.pathname === "/"
                ? "text-gray-200 hover:text-white font-medium"
                : "text-gray-800 hover:text-emerald-600 font-semibold"
            }`}
          >
            {name}
          </span>
          {isActive && (
            <div className="bg-emerald-500 w-auto h-0.5 rounded-full" />
          )}
        </div>
      )}
    </NavLink>
  );
}

export default function Header() {
  const [isTopOfPage, setIsTopOfPage] = useState(true);
  const location = useLocation();
  const [expand, setExpand] = useState(false);

  // ✅ SVG icons with correct JSX attributes
  const menu = (
    <path
      className="secondary"
      fillRule="evenodd"
      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
    />
  );

  const x = (
    <path
      className="secondary"
      fillRule="evenodd"
      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
    />
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsTopOfPage(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Dynamically determine logo paths (use absolute URLs or import for Vite if necessary)
  const grayLogo = "/graysoccer4change.png";
  const greenLogo = "/greensoccer4change.png";

  return (
    <div className="sticky top-0 h-24 transition-all duration-500 flex flex-col items-end z-50">
      <div
        className={`flex ${
          isTopOfPage && location.pathname === "/" && !expand
            ? "bg-transparent"
            : "bg-white shadow-md"
        } min-h-24 px-8 sm:px-12 w-screen sticky top-0 z-50 items-center justify-between transition-all duration-500`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-4">
          <img
            className="h-10"
            src={
              isTopOfPage && location.pathname === "/" && !expand
                ? grayLogo
                : greenLogo
            }
            alt="Soccer for Change Logo"
          />

          <h2
            className={`uppercase tracking-wider text-lg sm:text-xl transition-colors duration-300 ${
              isTopOfPage && location.pathname === "/" && !expand
                ? "text-gray-200 font-semibold"
                : "text-emerald-800 font-extrabold"
            }`}
          >
            Soccer for Change
          </h2>
        </div>

        {/* Navigation */}
        <nav className="sm:flex gap-12 text-lg font-semibold hidden">
          <NavItem to="/" name="Home" />
          <NavItem to="/register" name="Register" />
          <NavItem to="/about" name="About" />
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden block"
          onClick={() => setExpand((prev) => !prev)}
        >
          <svg
            className={`${
              expand ? "w-8 h-8" : "w-6 h-6"
            } transition-all duration-300 ${
              isTopOfPage && location.pathname === "/" && !expand
                ? "fill-gray-200"
                : "fill-emerald-600"
            }`}
            viewBox="0 0 24 24"
          >
            {expand ? x : menu}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation Panel */}
      {expand && (
        <>
          <div className="flex flex-col items-start w-fit bg-white border-separate rounded-bl-xl z-20">
            <MobileNav
              to="/"
              name="Home"
              disableClick={() => setExpand(false)}
              icon={houseIcon()}
            />
            <MobileNav
              to="/register"
              name="Register"
              disableClick={() => setExpand(false)}
              icon={registerIcon()}
            />
            <MobileNav
              to="/about"
              name="About"
              disableClick={() => setExpand(false)}
              icon={aboutIcon()}
            />
          </div>
          <div className="w-screen h-screen fixed top-0 bg-black bg-opacity-45 z-10"></div>
        </>
      )}
    </div>
  );
}

// ✅ MobileNav Component
function MobileNav({ to, name, disableClick, icon }) {
  return (
    <NavLink to={to} onClick={disableClick}>
      <div className="flex items-center py-6 w-56 pl-6 gap-3">
        <svg className="w-6 h-6 fill-emerald-600" viewBox="0 0 24 24">
          {icon}
        </svg>
        <h3 className="font-semibold">{name}</h3>
      </div>
    </NavLink>
  );
}

// ✅ SVG Icon Functions
function houseIcon() {
  return (
    <>
      <path
        className="primary"
        d="M9 22H5a1 1 0 0 1-1-1V11l8-8 8 8v10a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v4a1 1 0 0 1-1 1zm3-9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
      />
      <path
        className="secondary"
        d="M12.01 4.42l-8.3 8.3a1 1 0 1 1-1.42-1.41l9.02-9.02a1 1 0 0 1 1.41 0l8.99 9.02a1 1 0 0 1-1.42 1.41l-8.28-8.3z"
      />
    </>
  );
}

function registerIcon() {
  return (
    <>
      <path
        className="primary"
        d="M4 14a1 1 0 0 1 .3-.7l11-11a1 1 0 0 1 1.4 0l3 3a1 1 0 0 1 0 1.4l-11 11a1 1 0 0 1-.7.3H5a1 1 0 0 1-1-1v-3z"
      />
      <rect width="20" height="2" x="2" y="20" className="secondary" rx="1" />
    </>
  );
}

function aboutIcon() {
  return (
    <>
      <path className="primary" d="M12 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10z" />
      <path
        className="secondary"
        d="M21 20v-1a5 5 0 0 0-5-5H8a5 5 0 0 0-5 5v1c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2z"
      />
    </>
  );
}
