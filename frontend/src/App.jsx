import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/themeprovider";
import Layout from "./layout/Layout";
import React from "react";
import {
  RouteAbout,
  RouteIndex,
  RouteInterview,
  RouteInterviewId,
  RouteMyPage,
  RouteOpportunity,
  RouteProfile,
  RouteSignIn,
  RouteSignUp,
  RouteSubmit,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import Interviews from "./pages/Interviews";
import SubmitForm from "./pages/SubmitForm";
import Opportunities from "./pages/Opportunities";
import { SignUp } from "./pages/SignUp";
import { Signin } from "./pages/Signin";
import Profile from "./pages/Profile";
import MyPage from "./pages/MyPage";
import InterviewDetails from "./pages/InterviewDetails";
import About from "./pages/About";
import ScrollToTop from "./layout/ScrollTop";
import AuthRouteProtection from "./components/AuthRouteProtection";
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path={RouteIndex} element={<Layout />}>
            <Route index element={<Index />} />
            <Route path={RouteOpportunity} element={<Opportunities />} />
            <Route path={RouteInterview} element={<Interviews />} />
            <Route path={RouteAbout} element={<About />} />
            <Route element={<AuthRouteProtection />}>
              <Route path={RouteProfile} element={<Profile />} />
              <Route path={RouteMyPage} element={<MyPage />} />
              <Route path={RouteSubmit} element={<SubmitForm />} />
              <Route path={RouteInterviewId} element={<InterviewDetails />} />
            </Route>
          </Route>
          <Route path={RouteSignIn} element={<Signin />} />
          <Route path={RouteSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
