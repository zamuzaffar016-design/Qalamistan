import { Link } from "react-router-dom";


function Navbar() {

  return (

    <nav className="navbar">


      <Link to="/" className="logo">
        قلمستان
      </Link>


      <div className="nav-links">

        <Link to="/">
          Home
        </Link>


        <Link to="/explore">
  Explore
</Link>


        <Link to="/profile">
          Writers
        </Link>


        <Link to="/">
          Categories
        </Link>
<Link to="/writer-dashboard">
  Dashboard
</Link>

      </div>

<div className="nav-buttons">


<Link to="/login">
  <button>Login</button>
</Link>

<Link to="/signup">
  <button>Sign Up</button>
</Link>

<Link to="/publish">
  <button>Become a Writer</button>
</Link>


</div>


    </nav>

  );

}


export default Navbar;