import React from "react";
import '../styles/navbar.css';

export default function Footer2() {
  return (
    <div>
      <footer className="bg-red-500  text-white py-8 px-4"  foot__color>
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col space-y-4">
            {/* <img src="your-logo.png" alt="Blood Donation Website Logo" className="w-20 h-20 mb-2"> */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 8l4 4L19 6"
                />
              </svg>
              <span>+(91) 6282627046</span>
            </div>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M3 16l4-4L19 14"
                />
              </svg>
              <span>contact@website.com</span>
            </div>
          </div>

          <div className="flex space-x-4">
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 12h-4l4 -4v12zM16 12h4l-4 4v-12zM3 8l4-4v12l4-4"
                />
              </svg>
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-gray-200"
            >
            </a>
            <span>&copy; 2024 S6 CSE</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
