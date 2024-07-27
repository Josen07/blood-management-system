"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function ModeratorLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "christy@moderator" && password === "password") {
      console.log("Moderator logged in successfully");
      router.push("/moderator/profile"); // Redirect to profile page
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-lg shadow-md overflow-hidden bg-white py-4 px-8">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Moderator Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 mb-2">
            Username:
          </label>
          <input
            id="username"
            type="text"
            name="username"
            className="w-full rounded shadow-md p-2 focus:outline-none focus-ring-1 focus:ring-blue-500"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">
            Password:
          </label>
          <input
            id="password"
            type="password"
            name="password"
            className="w-full rounded shadow-md p-2 focus:outline-none focus-ring-1 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Login
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}

export default ModeratorLogin;
