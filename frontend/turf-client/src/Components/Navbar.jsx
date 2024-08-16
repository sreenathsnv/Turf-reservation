import React from 'react'
import {Link} from 'react-router-dom'
import '../CSS/nav.css'

const Navbar = () => {
  return (
    <header>
    <div class="container">
      <h1>4play</h1>
      <nav>
        <ul>
          <li><button><Link to ="/" exact ></Link>Home</button></li>
          <li><button><Link to = "/login"></Link>Login</button></li>
          <li><button><Link to ="/signup"></Link>Signup</button></li>
        </ul>
      </nav>
    </div>
  </header>
  )
}

export default Navbar