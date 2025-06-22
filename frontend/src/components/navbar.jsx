import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const checklogin = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/checklogin`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.ok) {
        return setIsLoggedIn(true);
      } else {
        return setIsLoggedIn(false);
      }
    } catch (error) {
      return setIsLoggedIn(false);
    }
  };
  useEffect(() => {
    checklogin();
  }, []);
  const handlelogout = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.ok) {
        setIsLoggedIn(false);
        navigate("/login"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  return (
    <nav className="bg-[#2E5077] p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Logo */}
        <Link to={"/"}>
        <div className="text-4xl font-bold font-mono text-white">
          <span className="text-[#79D7BE]">&lt;</span>
          Pass
          <span className="text-[#79D7BE]">Op/&gt;</span>
        </div>
        </Link>
        {/* Hamburger Button */}
        <button
          className="text-white md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {menuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Menu Items */}
        <ul
          className={`flex-col md:flex-row md:flex gap-8 items-center text-white font-mono text-xl absolute md:static bg-[#2E5077] md:bg-transparent left-0 w-full md:w-auto transition-all duration-300 ease-in-out ${
            menuOpen ? 'flex top-20' : 'hidden'
          }`}
        >
          { isLoggedIn ? <li className="bg-[#85e3ca7e] p-3 rounded-full">
            <button onClick={handlelogout} rel="noopener noreferrer" >
              Logout
            </button>
          </li>:<li className="bg-[#85e3ca7e] p-3 rounded-full">
            <Link rel="noopener noreferrer" to={"/login"}>
              Login
            </Link>
          </li>}
          <li className="flex gap-4 items-center bg-[#85e3ca7e] p-3 rounded-full">
            <a
              href="https://github.com/CharanCodeCraft"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <img width={30} src="/icons/github.svg" alt="GitHub" className="invert" />
              Github
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default navbar;
