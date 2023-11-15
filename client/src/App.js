import './App.css';
import { Routes, Route } from "react-router-dom";
import { isBroker, isHomeBuyer, isAdmin, isSignedIn } from './utils/auth';


import Home from "./pages/home/home";
import CreateListing from "./pages/create/create";
import About from "./pages/about/about";
import Login from "./pages/login/login";
import Properties from "./pages/properties/properties";
import Register from "./pages/register/register";
import UserDetail from "./pages/user/userDetails"
import MyProperties from "./pages/properties/my-properties"
import Profile from "./pages/user/profile";
import NavBar from "./components/menu/navigationBar";
// import PropertyDetails from './pages/propertyDetails/propertyDetails'
import PropertyDetails from './pages/properties/propertyDetail'
import Visits from './pages/visit/visits'
import Offers from './pages/offer/offers'

import Verify from './pages/verify/verify'
import BrokerRegister from './pages/register/broker_register';
import Brokers from "./pages/brokers/Brokers";

import PropertyEdit from "./pages/propertyEdit/propertyEdit"
import PropertyPlayer from './components/player/propertyPlayer';

import PasswordReset from "./pages/login/passwordReset"
import BrokerDetails from "./pages/brokers/BrokerDetails";

function App() {

  const isBrokerSignedIn = !!localStorage.getItem('token');
  return (

    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/passwordReset" element={<PasswordReset />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/properties" element={<Properties />}></Route>
        <Route path="/" element={<Home />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/broker_register" element={<BrokerRegister />}></Route>
        <Route path="/brokers" element={<Brokers />}></Route>

        {isBrokerSignedIn && <Route path="/verify" element={<Verify />}></Route>}

        {isBrokerSignedIn && <Route path="/create" element={<CreateListing />}></Route>}

        {isBrokerSignedIn && <Route path="/my-properties" element={<MyProperties />}></Route>}

        {isBrokerSignedIn && <Route path="/users/user/:id" element={<Profile />} />}

        {isBrokerSignedIn && <Route path="/users/user/view/:id" element={<UserDetail />} />}

        {isBrokerSignedIn && <Route path="/edit/:id" element={<PropertyEdit />}></Route>}

        {isBrokerSignedIn && <Route path="/visits" element={<Visits />}></Route>}

        {isBrokerSignedIn && <Route path="/offers" element={<Offers />}></Route>}

        <Route path="/properties/:id" element={<PropertyDetails />}></Route>
        <Route path="/brokers/:id" element={<BrokerDetails />}></Route>


        <Route path="/properties/:id/player" element={<PropertyPlayer />}></Route>

      </Routes>
    </div>
  );

}

export default App;
