import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));

  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      console.log("logging in");
      const response = await fetch("http://localhost:5555/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (data.user.token) {
        console.log("setting token");

        localStorage.setItem("token", data.user.token);
        setToken(data.user.token);
        setUser(data.user);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }

    return user;
  };

  const signup = async (name, email, password) => {
    try {
      const response = await fetch("http://localhost:5555/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUser(data.user);
      }
    } catch (error) {
      console.error(error);
    }

    return user;
  };

  const verify = async () => {
    try {
      const response = await fetch("http://localhost:5555/api/user/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
    return user;
  };

  return (
    <UserContext.Provider value={{ user, token, login, signup, verify }}>
      {props.children}
    </UserContext.Provider>
  );
};
