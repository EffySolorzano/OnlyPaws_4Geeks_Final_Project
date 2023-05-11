import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import Aboutus from "./component/aboutus.jsx";
import How from "./component/how.jsx";
import Terms from "./component/terms.jsx";
import Privacy from "./component/privacy.jsx";
import Services from "./component/services.jsx";
import Team from "./component/team.jsx";
import Search from "./component/search.jsx";
import Housesit from "./component/housesit.jsx";
import AddPetSitter from "./pages/addPetSitter.jsx";
import ContactUs from "./pages/contactUs.jsx";
import SignInPetSitter from "./pages/signInPetSitter.jsx";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Aboutus />} path="/about" />
            <Route element={<How />} path="/how-it-works" />
            <Route element={<Terms />} path="/terms-of-use" />
            <Route element={<Privacy />} path="/privacy-policy" />
            <Route element={<Services />} path="/services" />
            <Route element={<Team />} path="/team" />
            <Route element={<Search />} path="/providers" />
            <Route element={<Housesit />} path="/users" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/signup" />
            <Route element={<AddPetSitter />} path="/add-petsitter" />
            <Route element={<ContactUs />} path="/contact" />
            <Route element={<h1>Not found!</h1>} />
          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
