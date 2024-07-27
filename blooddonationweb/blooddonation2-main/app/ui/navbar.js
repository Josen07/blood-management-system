"use client";
import React from "react";
import { useRouter, redirect } from "next/navigation";
import { useState, useContext } from "react";
import Link from "next/link";
import { AuthProvider, AuthContext } from "../context/AuthContext";
import '../styles/navbar.css';

import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase auth instance

export default function Navbar2() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  //const { user, loading } = useContext(AuthContext); // Access user data from context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, loading, setUserData } = useContext(AuthContext);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  async function handleLogout() {
    try {
      setUserData(null);
      localStorage.removeItem("userData");
      localStorage.removeItem("userSelectedRequest");
      await signOut(auth);

      console.log("User logged out successfully");
      alert("Logging Out");

      router.push("/");
    } catch (err) {
      console.error("Error logging out:", err);
      // Handle logout errors (e.g., display an error message)
    }
  }

  return ( 
    
      <nav className=" bg-red p-4 flex flex-row justify-between items-center">
        <div className="logo-box">
        <img className="logo" src="nss_logo.png" alt="" />
        <p className="unit-num">UNIT NO : 515 </p>
        </div>
      
      <h1 className="text-black pl-2 font-bold text-2xl text1">BLOOD MANAGEMENT</h1>

      <button
        className={`md:hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-red-500 inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 ${
          isMobileMenuOpen ? "bg-gray-100" : ""
        }`}
        aria-controls="mobile-menu"
        aria-expanded={isMobileMenuOpen}
        onClick={toggleMobileMenu}
      >
        <span className="sr-only">Toggle navigation</span>
        {/* Replace with your image source path and desired dimensions */}
        <img
          className="h-6 w-6"
          src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn0.iconfinder.com%2Fdata%2Ficons%2Frounded-basics%2F24%2Frounded__menu-512.png&f=1&nofb=1&ipt=34efb1c86c2c85e13db419522b38228464004bbff6d7b148054e71b8e6eb7c07&ipo=images%22" // Replace with your path
          alt="Menu icon" // Provide a descriptive alt text for accessibility
        />
      </button>

      <ul
        id="mobile-menu"
        className={`md:hidden fixed top-0 left-0 w-1/2 h-screen bg-red z-50 transition duration-200 ease-in-out transform ${
          isMobileMenuOpen ? "-translate-x-0" : "-translate-x-full"
        }`}
        aria-labelledby="mobile-menu-label"
      >
        <div className="p-4 bg-white rounded-md shadow-md">
          {" "}
          {/* Card container */}
          <li className="text-center pt-2 pb-1 pr-4 pl-4 border-b border-gray-200 hover:bg-gray-100 text-black">
            <Link href="/">Home</Link>
          </li>
          <li className="text-center pt-2 pb-1 pr-4 pl-4 rounded-full bg-gray-200 hover:bg-red-500">
            <Link href="/login">Login</Link>
          </li>
        </div>
      </ul>

      <ul className="hidden md:flex flex-row items-center justify-between space-x-4 pr-2">
        <li className="p-3 hover:bg-gray-100">
          <Link className="text-black" href="/">
            Home
          </Link>
        </li>

        {/* loading */}
        {loading ? (
          <li className="p-3 pl-3 pr-3 rounded-full bg-gray-200 hover:bg-red-500">
            <Link className="text-black" href="/login">
              Login
            </Link>
          </li>
        ) : user ? (
          <div className="hidden md:flex flex-row rounded-full bg-gray-200">
            <li className="p-3 pl-3 pr-3 rounded-full bg-gray-200 hover:bg-gray-400">
              <Link className="text-black" href="/profile">
                Profile
              </Link>
            </li>
            <li className="p-3 pl-3 pr-3 rounded-full bg-gray-200 hover:bg-red-500">
              <button className="text-black" onClick={handleLogout}>
                {/* {user.name} */}Logout
              </button>
            </li>
          </div>
        ) : (
          <li className="p-3 pl-3 pr-3 rounded-full bg-gray-200 hover:bg-red-500">
            <Link className="text-black" href="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  
    
  );
}
