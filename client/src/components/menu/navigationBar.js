import { Link, useNavigate } from 'react-router-dom';
import './navigationBar.css';

const Navbar = () => {
  const isBrokerSignedIn = !!localStorage.getItem('token');
  const navigate = useNavigate();

  // Deletes token created during successful sign in.
  // Used for logging out.
  const handleSignout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }

  // Available navbar links for both logged-in and non-logged-in users.
  const navigation = (
    <>
      <div>
        <Link to="/" className='navItem'>Home</Link>
      </div>
      <div className='navItem'>
        <Link to="/about" className='navItem'>About</Link>
      </div>
    </>
  );

  // Available navbar links only if isBrokerSignedIn is true
  const brokerNavigation = isBrokerSignedIn ? (
    <>
      <div className='navItem'>
        <Link to="/create-property-listing" className='navItem'>Create Property Listing</Link>
      </div>
      <div className='navItem'>
        <Link to="/properties" className='navItem'>My Properties</Link>
      </div>
      <div>
        <Link to="/" onClick={handleSignout} className='navItem'>Sign out</Link>
      </div>

    </>
  ) : (
    //Available navbar links only if isBrokerSignedIn is false
    <>
      <div>
        <Link to="/login" className='navItem'>Login</Link>
      </div>
      <div>
        <Link to="/register" className='navItem'>Register</Link>
      </div>
      <div>
        <Link to="/passwordReset" className='navItem'>Reset Password</Link>
      </div>
    </>
  );

  return (
    <div className='navBar'>
      {navigation}
      {brokerNavigation}
    </div>
  );
}

export default Navbar;
