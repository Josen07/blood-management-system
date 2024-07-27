"use client";
import React, { useContext } from "react";
import { useRouter } from "next/router";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "./AuthContext"; // Import AuthContext

const withAuthRender = (Component) => {
  const WrapperComponent = (props) => {
    const { user, loading } = useContext(AuthContext);
    //const router = useRouter();

    if (loading) {
      return (
        <div>
          <p>Loading...</p>
          <Link href="/">return to home page</Link>
        </div>
      ); // Handle loading state (optional)
    }

    if (!user) {
      redirect("/login");
      return null;
    }

    return <Component {...props} />; // Render the component if authenticated
  };
  WrapperComponent.displayName = `withAuthRender(${
    Component.displayName || Component.name
  })`;
  return WrapperComponent;
};

export default withAuthRender;
