import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components/Index";
import {
  Home,
  SignUp,
  SignIn,
  Profile,
  Dashboard,
} from "./pages/Index";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exect path="/Moxie" element={<Home />} />
        <Route exect path="Home/SignUp" element={<SignUp />} />
        <Route exect path="Home/SignIn" element={<SignIn />} />
        <Route exect path="Home/Profile" element={<Profile />} />
        <Route exect path="Home/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
