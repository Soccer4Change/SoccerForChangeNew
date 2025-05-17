import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import App from "./App.jsx";
import About from "./About.jsx";
import Register from "./Register.jsx";
import Apply from "./Apply.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import PayPlace from "./PayPlace.jsx";
import Home from "./Home.jsx";
import CompleteRegistration from "./CompleteRegistration.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* ✅ Add the correct basename */}
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<App />}>
          {/* Nested Routes */}
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="apply" element={<Apply />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          <Route path="pay" element={<PayPlace />} />
          <Route path="complete-registration" element={<CompleteRegistration />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
