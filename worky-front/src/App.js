import './App.css';
import Nav from "./components/Nav";
import {Route, Routes} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  return (
      <div>
        <Nav />
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
          </Routes>

      </div>
  );
}

export default App;
