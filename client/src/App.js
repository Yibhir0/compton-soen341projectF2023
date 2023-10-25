import './App.css';
import { Routes, Route } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';

import Home from "./pages/home/home";
import Demo from "./pages/demo/demo";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import Properties from "./pages/properties/properties";
import Navbar from './components/menu/navigationBar';

function App() {
  return (
    
  <div className="App">
  
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/demo" element={<Demo />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route path="/properties" element={<Properties />}></Route>

    </Routes>
  </div>

);

}

export default App;
