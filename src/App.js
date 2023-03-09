import { Route, Routes } from "react-router-dom";
import { Footer, Navbar } from "./components/Index";
import {
  Home,
  SignUp,
  SignIn,
  Profile,
  Dashboard,
  NotFound,
  Account
} from "./pages/Index";
import "./App.scss";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exect path="/Moxie" element={<Home />} />
        <Route exect path="Home/SignUp" element={<SignUp />} />
        <Route exect path="Home/SignIn" element={<SignIn />} />
        <Route exect path="Home/EditProfile" element={<Profile />} />
        <Route exect path="Home/Dashboard" element={<Dashboard />} />
        <Route exect path="Home/Account" element={<Account />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
