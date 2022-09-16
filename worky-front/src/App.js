import './App.css';
import Nav from "./components/Nav";
import {Route, Routes, Navigate} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
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
