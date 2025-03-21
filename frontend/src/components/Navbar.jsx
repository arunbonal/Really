import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../index.css";
import { useApiData } from "../contexts/ApiContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { setCurrentMenu } = useApiData();
  const [user, setUser] = useState(null);

  const handleLogin = () => {
    window.location.href = "http://localhost:8080/auth/google";
  };

  const handleLogout = () => {
    // Call your logout endpoint
    fetch("http://localhost:8080/auth/logout", {
      method: "GET",
      credentials: "include", // Include cookies for session
    })
      .then(() => {
        setUser(null); // Clear user state
        navigate("/"); // Redirect to home
      })
      .catch((error) => console.error("Logout error:", error));
  };

  useEffect(() => {
    // Fetch current user data
    fetch("http://localhost:8080/auth/user", {
      method: "GET",
      credentials: "include", // Include cookies for session
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("User not authenticated");
      })
      .then((data) => {
        console.log("User data fetched:", data); // Debugging line
        setUser(data); // Set user data
      })
      .catch((error) => {
        console.error("Fetch user error:", error);
        setUser(null); // User is not logged in
      });
  }, []);

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-10">
      {/* Logo on the left */}
      <img
        src=""
        className="w-44 cursor-pointer"
        alt="logo"
        onClick={() => navigate("/")}
      />

      {/* Centered Navigation Links */}
      <ul className="flex items-center gap-8 font-medium">
        {["food", "beauty", "meds"].map((category) => (
          <NavLink
            key={category}
            to={`/product/${category}`}
            className={({ isActive }) =>
              `flex flex-col items-center ${
                isActive ? "text-primary font-bold" : "text-black"
              }`
            }
            onClick={() => setCurrentMenu(category)}
          >
            <li className="py-1 uppercase">{category}</li>
            {window.location.pathname === `/product/${category}` && (
              <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto" />
            )}
          </NavLink>
        ))}
      </ul>

      {/* Conditional Rendering of Login/Profile Button */}
      {user ? (
        <div className="flex items-center">
          <span className="mr-4">{user.displayName}</span>
          <button
            className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 cursor-pointer"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-200 cursor-pointer"
          onClick={handleLogin}
        >
          Sign In with Google
        </button>
      )}
    </div>
  );
};

export default Navbar;
