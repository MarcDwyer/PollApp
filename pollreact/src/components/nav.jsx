import React from 'react'
import { Link } from 'react-router-dom'
const Nav = () => (
    <div className="navbar-fixed">
    <nav>
    <div className="nav-wrapper purple accent-1">
      <Link to='/' className="brand-logo">Poll App</Link>
    </div>
  </nav>
  </div>
)

export default Nav