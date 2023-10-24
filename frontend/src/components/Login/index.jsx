import background from '../../image/background-image.jpg';
import logo from '../../image/logo.png'; 

import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:8080/api/auth";
      const { data: res } = await axios.post(url, data);
      localStorage.setItem("token", res.data);

      if (data.email === "admin@gmail.com") {
        window.location = "/songhome"; 
      } else {
        window.location = "/playlisthome"; 
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  const backgroundImageStyle = {
    backgroundImage: `url(${background}), linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))`, 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
  };

  const logoStyle = {
    position: "absolute",
    top: "100px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "200px",
    zIndex: 1,
  };

  const loginBoxStyle = {
    background: "rgba(0, 0, 0, 0.7)", 
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
  };

  const buttonStyle = {
    width: "50%", 
    margin: "5px", 
  };

  return (
    <div style={backgroundImageStyle} className="container mx-auto flex justify-center items-center h-screen relative">
      <img src={logo} alt="Logo" style={logoStyle} />

      <div className="w-full md:w-1/2 lg:w-1/3 px-4" style={loginBoxStyle}>
        <h1 className="text-2xl font-bold mb-4 text-center text-white">Login to Your Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={data.email}
              required
              className="w-full p-2 border rounded bg-gray-100"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              value={data.password}
              required
              className="w-full p-2 border rounded bg-gray-100"
              style={{ borderColor: "#E5E7EB" }}
            />
          </div>
          {error && <div className="text-red-500 mb-4 text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-red-600 text-white p-2 rounded hover-bg-red-700"
            style={buttonStyle} 
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <Link to="/signup">
            <button
              type="button"
              className="w-full bg-green-500 border text-white p-2 rounded hover-bg-green-600"
              style={buttonStyle} 
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
