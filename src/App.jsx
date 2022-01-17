import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AlbumPage from "./pages/AlbumPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

const App = () => {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>

        <Route path="/login">
          <LoginPage />
        </Route>

        <Route path="/dashboard">
          <DashboardPage />
        </Route>

        <Route path="/albums/:id">
          <AlbumPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
