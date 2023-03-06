import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { Footer, Navbar } from "./components/Index";
import {
  Home,
  SignUp,
  SignIn,
  Profile,
  CreateItems,
  Dashboard,
} from "./pages/Index";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exect path="/Moxie" element={<Home />} />
        <Route exect path="Home/SignUp" element={<SignUp />} />
        <Route exect path="Home/SignIn" element={<SignIn />} />
        <Route exect path="Home/Profile" element={<Profile />} />
        <Route exect path="Home/Add-Items" element={<CreateItems />} />
        <Route exect path="Home/Dashboard" element={<Dashboard />} />
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
