import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Footer, Navbar } from './components/Index';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exect path="/Moxie" element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
