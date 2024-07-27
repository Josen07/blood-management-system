"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../firebase";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const auth = getAuth(app);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = formData;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Redirect to register page with the created user ID (consider security)
      const uid = userCredential.user.uid;

      await sendEmailVerification(userCredential.user);
      setIsEmailVerified(false); // Reset email verification state
      setError("A verification email has been sent to your address.");


      router.push(`/registration?uid=${uid}`); // Redirect with query param
    } catch (err) {
      console.error("Registration error:", err);
      setError(err.message);
    }
  };

  return (
    <div className="card max-w-md mx-auto bg-red-500 text-white p-4 rounded shadow-md">
      <h1 className="text-center text-3xl">Sign Up</h1>
      <form className="mt-4">
        <div className="flex flex-col space-y-2">
          <div className="flex flex-wrap items-center">
            <label htmlFor="email" className="w-full md:w-1/3 text-right">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="flex-grow ml-2 bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
          <div className="flex flex-wrap items-center">
            <label htmlFor="password" className="w-full md:w-1/3 text-right">
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="flex-grow ml-2 bg-red-100 text-red-800 border border-red-500 rounded p-2"
            />
          </div>
        </div>
        <button
          onClick={handleSubmit}
          className="btn bg-white text-red-500 hover:bg-red-500 hover:text-white py-2 px-4 rounded mt-4"
        >
          Sign Up
        </button>
        {error && <p className="text-white">{error}</p>}
      </form>
    </div>
  );
};

export default SignUp;
