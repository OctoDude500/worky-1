import './App.css';
import Nav from "./components/nav/Nav";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import SignUp from "./components/signup/SignUp";
import { useSelector } from "react-redux";

function App() {

    const isUser = useSelector((stores) => stores.lucia.user)

  return (
      <div>
        <Nav />
          <Routes>
              <Route
                  path="/"
                  element={isUser.length > 0 ? <Home /> : <Navigate to="/login" />} />
              <Route
                  path="/login"
                  element={isUser.length === 0 ? <Login /> : <Navigate to="/" />} />
              <Route
                  path="/signup"
                  element={isUser.length === 0 ? <SignUp /> : <Navigate to="/" />} />
          </Routes>

      </div>
  );
}

export default App;
