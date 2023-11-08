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
      <li>
        <Link to="/" className='navItem'>Home</Link>
      </li>
      <li className='navItem'>
        <Link to="/about" className='navItem'>About</Link>
      </li>
      <li>
        <Link to="/properties" className='navItem'>Properties</Link>
      </li>
        <li>
            <Link to="/brokers" className='navItem'>Search Brokers</Link>
        </li>
    </>
  );

  // Available navbar links only if isBrokerSignedIn is true
  const brokerNavigation = isBrokerSignedIn ? (
    <>
      {/* <li>
        <Link to="/create" className='navItem'>Create Property Listing</Link>
      </li>
      <li>
        <Link to="/my-properties" className='navItem'>My Properties</Link>
      </li> */}
      <li>

        <Link to="/" onClick={handleSignout} className='navItem'>Sign out</Link>
      </li>
      <li>
        <Link to="/users/user/:id" className='navItem'>Profile</Link>
      </li>


    </>
  ) : (
    //Available navbar links only if isBrokerSignedIn is false
    <>
      <li>
        <Link to="/login" className='navItem'>Login</Link>
      </li>
      <li>
        <Link to="/register" className='navItem'>Register</Link>
      </li>
    </>
  );

  return (

    <nav className="navbar">
      <div className="container">
        <div className="nav-elements">
          <ul>
            <li>
              <img className="logo-realestate" alt="Logo Real Estate" src={require('../../assets/images/placeholder_logo.png')} />
            </li>
            {navigation}
            {brokerNavigation}

          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
