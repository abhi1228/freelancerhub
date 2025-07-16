import React from "react";
import "./Login.scss";
import { useState } from "react";
import newRequest from "../../utils/newRequest";
import {Link, useNavigate} from 'react-router-dom';
import { userContext } from "../../context/UserContext";
import { useContext } from "react";


const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const {setUser,user}=useContext(userContext);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await newRequest.post("/auth/login", {
        username: username,
        password: password,
      });
      localStorage.setItem("currentUser",JSON.stringify(res));
      await setUser(res.data);
      console.log("user after login",user);

      navigate('/')
      //console.log(res);
    } catch (error) {
      setError(error.response.data);
       
      //console.log(error.response.data);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="container">
        <h2>Sign in</h2>

        <form onSubmit={handelSubmit}>
          <div className="loginForm">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              onChange={(e) => setUserName(e.target.value)}
              placeholder="username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="passwrod"
            />
            <button type="submit">{loading ? "Signing In.." : "Login"}</button>
            {error && error}

            <p>Don't have an account?<Link className="" to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
