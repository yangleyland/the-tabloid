import React from 'react';
import { Link } from "react-router-dom";

function Navbar () {
    return (
    <nav>
        <h1><Link to="/">Tabloid</Link></h1>
        <ul>
            <li><Link to="/art">Art</Link></li>
            <li><Link to="/fashion">Fashion</Link></li>
            <li><Link to="/literature">Literature</Link></li>
            <li><Link to="/music">Music</Link></li>
        </ul>
        <h2><li><Link to="/login">Create Blog Entry</Link></li></h2>
    </nav>
  
    );
}

export default Navbar;