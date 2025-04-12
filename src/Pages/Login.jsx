import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import Button from '../Componants/Button';
import Input from '../Componants/Input';
import styled from "styled-components";
import '../styles/login.css';
import axios from "axios";
import Container from '../Componants/Container';
import { FaAngleRight } from "react-icons/fa";
import HeaderIntro from "../assets/Header.png";
import loginimg from "../assets/loginimg.png";
import logo from "../assets/Vector.png";
import { useNavigate } from "react-router-dom";
import AuthFooter from '../Componants/AuthFooter';
import { jwtDecode } from "jwt-decode";

const Message = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Login = () => {
  const { login } = useContext(UserContext); // Access login function
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    if (email.trim() === "" || password.trim() === "") {
      return setMessage("Email and password cannot be empty.");
    }

    try {
      console.log("Attempting to log in with credentials:", { email, password }); // Debugging log
      await login({ email, password }); // Call login function from context
      navigate("/"); // Redirect to home page on success
    } catch (error) {
      console.error("Login error:", error); // Debugging log
      setMessage(error.message || "An unexpected error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return setMessage("Invalid email format.");
    }

    try {
      const res = await axios.post("http://localhost:5000/api/users/login", { email, password });

      if (res.status !== 200) {
        throw new Error(res.data.message || "Login failed.");
      }

      const token = res.data.token;
      if (!token) {
        throw new Error("Token not received from the server.");
      }

      localStorage.setItem("token", token);

      const decoded = jwtDecode(token);
      console.log("Decoded token data:", decoded); // Debugging log

      localStorage.setItem("user_id", decoded?.id || "");
      localStorage.setItem("nurse_id", decoded?.is_nurse ? decoded.id : "");

      const userId = decoded?.id;
      const userDetails = await axios.get(`http://localhost:5000/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (userDetails.data?.first_name) {
        const fullName = userDetails.data.first_name.trim();
        localStorage.setItem("username", fullName);
        console.log("User full name stored:", fullName); // Debugging log
      } else {
        console.warn("First name not found in user details.");
      }

      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Error during login:", error.response || error.message); // Debugging log
      setMessage(error.response?.data?.error || "Login failed. Please try again.");
    }
  };

  return (
    <div className="pagelogin-container pb-4">
      <Container className="register-container">
        <div id="intro-header-container">
          <img src={HeaderIntro} alt="" id="intro-header" />
          <div className="flex-item">
            <FaAngleRight className='icon' onClick={() => navigate(-1)} />
          </div>
          <div className="flexitemh3">
            <h3 className='salayty'>سجل الدخول و احصل علي كل الصلاحيات</h3>
          </div>
        </div>
        <img src={logo} alt="" className="logo-login" />
        <h2 className="title-login fs-2 fw-bold">تسجيل الدخول</h2>
        {message && <Message>{message}</Message>}
        <div className="padding">
          <form onSubmit={handleLogin} className='col-10 m-auto'>
            <input className='mb-3 form-control' 
              type="email" 
              name="email" 
              placeholder="الايميل" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
            <input className='mb-3 form-control' 
              type="password" 
              name="password" 
              placeholder="الباسورد" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              autoComplete="off" 
            />
            <Button type="submit">تسجيل</Button>
            <AuthFooter text="ليس لديك حساب؟" linkText="سجّل الآن" to="/register" />
          </form>
        </div>
      </Container>
      <img src={loginimg} alt="" className="logimg" />
    </div>
  );
};

export default Login;
