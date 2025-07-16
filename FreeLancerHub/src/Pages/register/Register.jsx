import React from "react";
import "./Register.scss";
import { useState } from "react";
import newRequest from "../../utils/newRequest";
import { useNavigate } from 'react-router-dom';
import upload from "../../utils/upload";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    country: "",
    phone: "",
    desc: "",
  });
  const [file, setFile] = useState(null);
  const navigate=useNavigate();

  const handelChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
    console.log(user);
  };
  const handelToggle = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handelFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      const url=await upload(file);
      const res = await newRequest.post("/auth/register", {
        ...user,img:url
      });
      if(res) navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register">
      <div className="container">
        <div className="left">
          <h2>Create a new account</h2>
          <form onSubmit={handelSubmit}>
            <div className="registerForm">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="username"
                onChange={handelChange}
              />
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                onChange={handelChange}
              />
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="passwrod"
                onChange={handelChange}
              />
              <label htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                name="file"
                id="profilePicture"
                placeholder=""
                onChange={handelFile}
              />
              <label htmlFor="country">Country</label>
              <input
                type="text"
                name="country"
                id="country"
                placeholder="country"
                onChange={handelChange}
              />
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
        <div className="right">
          <h2>I want to become a seller</h2>

          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" onChange={handelToggle} />
              <span className="slider round"></span>
            </label>
          </div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="text"
            id="phone"
            name="phone"
            placeholder="8318047590"
            onChange={handelChange}
          />
          <label htmlFor="description">Description</label>
          <textarea
            rows="13"
            name="desc"
            id="desc"
            onChange={handelChange}
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default Register;
