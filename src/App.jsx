import React, { useState, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import NavBar from "./components/Navbar";
import MyContext from './components/Context';
import Login from './components/Login';
import Network from './components/Network';
import ProfileLayout from './components/Profile';
import OnClick from "./components/OnClick";
import Logout from "./components/Logout";
import UserDetails from "./components/UserDetails";
import NetworkLayout from "./components/NetworkLayout";
import Profile from "./components/Profile";
import SimpleProfile from "./components/SimpleProfile";


function App() {

  // Values for Context
  const iniialLoggedUser = {
    id: -1,
    name: "",
    log: "No"
  }
  const [loggedUser, setLoggedUser] = React.useState(iniialLoggedUser);
  const [users, setUsers] = React.useState([]);

  return (
    <>
      <h1>My React App</h1>

      <BrowserRouter>
        <div>
          <h1>My Router</h1>

          {/* <h4>{loggedUser.name ? `Welcome ${loggedUser.name}!` : ""}</h4> */}

          <NavBar />

          <MyContext.Provider value={{ loggedUser, setLoggedUser, users, setUsers }}>

            <Routes>

              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={loggedUser.name ? <Logout /> : <Login />} />
              <Route path="/network" element={<NetworkLayout />} >
                <Route index element={<Network />} />
                <Route path="userDetails/:id" element={<UserDetails />} />
              </Route>
              <Route path="/profile" element={<Profile />} />
              <Route path="/profile-simple" element={<SimpleProfile />} />

              <Route path="/buttons" element={<OnClick />} />

            </Routes>
          </MyContext.Provider>
        </div>
      </BrowserRouter>

    </>
  )
}

export default App
