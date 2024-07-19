import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";
import { auth } from "../firebase/config";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      console.error(
        "Login timed out due to network issues or server not responding."
      );
      setIsLoading(false); // Stop loading
      navigate("/login");
    }, 5000); // Adjust the timeout duration as needed

    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        clearTimeout(timeoutId); // Clear the timeout upon successful loading
        if (user) {
          const { displayName, email, uid, photoUrl } = user;
          setUser({
            displayName,
            email,
            uid,
            photoUrl,
          });
          setIsLoading(false);
          navigate("/");
        } else {
          console.error(
            "Failed to login. Please check your credentials or network connection."
          );
          setIsLoading(false); // Stop loading
          navigate("/login");
        }
      },
      (error) => {
        console.error("Authentication error:", error.message);
        setIsLoading(false); // Stop loading
        navigate("/login");
      }
    );

    return () => {
      unsubscribe();
      clearTimeout(timeoutId); // Ensure to clear the timeout when the component unmounts
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user }}>
      {" "}
      {isLoading ? <Spin /> : children}{" "}
    </AuthContext.Provider>
  );
}
