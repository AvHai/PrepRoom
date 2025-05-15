import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Layout from "./layout/Layout"
import React from "react"
import { RouteBlog, RouteBlogAdd, RouteBlogEdit, RouteIndex, RouteMyPage, RouteOpportunity, RouteProfile, RouteSignIn, RouteSignUp } from "./helpers/RouteName"
import  Index  from "./pages/Index"
import Interviews from "./pages/Interviews"
import SubmitForm from "./pages/SubmitForm"
import Opportunities from "./pages/Opportunities"
import { SignUp } from "./pages/SignUp"
import { Signin } from "./pages/Signin"
import Profile from "./pages/Profile"
import MyPage from "./pages/MyPage"
function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteBlog} element={<Interviews />} />
          <Route path={RouteBlogAdd} element={<Interviews />} />
          <Route path={RouteBlogEdit()} element={<Interviews />} />

            {/* <Route path="/interviews/:id" element={<InterviewDetail />} /> */}
            <Route path={RouteOpportunity} element={<Opportunities />} />
            <Route path="/submit" element={<SubmitForm />} />
           <Route path={RouteMyPage} element={<MyPage/>} />
           <Route path={RouteProfile} element={<Profile/>} />
        </Route>
        <Route path={RouteSignIn} element ={<Signin/>} />
        <Route path={RouteSignUp} element={<SignUp/>}/>
      </Routes>
    </BrowserRouter>
     </ThemeProvider>
  )
}

export default App
