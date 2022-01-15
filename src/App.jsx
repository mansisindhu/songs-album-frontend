import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AlbumPage from "./pages/AlbumPage";
import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import { fetchAlbums } from "./store/actions";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAlbums());
  }, []);
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>

        <Route path="/login" exact>
          <LoginPage />
        </Route>

        <Route path="/dashboard" exact>
          <DashboardPage />
        </Route>

        <Route path="/albums/:id" exact>
          <AlbumPage />
        </Route>
      </Switch>
    </div>
  );
};

export default App;
