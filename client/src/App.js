

import './App.css';
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/home";
import Demo from "./pages/demo/demo";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import Properties from "./pages/properties/properties";


function App() {
  return (
    <div className="App">

  
  <Routes>
 
  <Route path="/demo" element={<Demo />}></Route>
  <Route path="/login" element={<Login />}></Route>
  <Route path="/about" element={<About />}></Route>
  <Route path="/properties" element={<Properties />}></Route>
  <Route path="/" element={<Home />}></Route>
  
</Routes>
</div>
);

}

export default App;
