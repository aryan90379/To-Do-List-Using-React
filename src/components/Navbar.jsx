import React, { useState } from 'react';
import "./Navbar.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="">
      <nav className="navbar flex justify-between bg-violet-600 text-white py-4">
        <div className="logo">
          <span className='font-bold text-xl mx-7'>Task-Master</span>
        </div>
        <div className="nav-links1">
          <ul className={`flex gap-8 mx-9 md:flex`}>
            <li className='cursor-pointer hover:font-bold hover:text-emerald-300 transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold hover:text-emerald-300 transition-all'>Your Tasks</li>
          </ul>
        </div>

        <div className="hamburger md:hidden cursor-pointer mr-3" onClick={toggleMenu}>
          {isMenuOpen ? <ImCross />
            : <GiHamburgerMenu />
          }

        </div>
      </nav>

      <div className={`nav-links2 ${isMenuOpen ? 'open ' : ''}`}>
        <ul className={`flex justify-end gap-8 bg-violet-600 p-2`}>
          <li className='cursor-pointer hover:font-bold text-white font-bold hover:text-emerald-300 transition-all'>Home</li>
          <li className='cursor-pointer hover:font-bold text-white font-bold hover:text-emerald-300 transition-all'>Your Tasks</li>
        </ul>
      </div>
    </div>
  )
}

export default Navbar;
