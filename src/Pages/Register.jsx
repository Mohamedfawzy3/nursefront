import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Button from '../Componants/Button';
import Input from '../Componants/Input';
import { FaAngleRight } from "react-icons/fa";
import HeaderIntro from "../assets/Header.png";
import '../styles/register.css';
import logo from "../assets/Vector.png";
import { useNavigate } from "react-router-dom"; 
import AuthFooter from '../Componants/AuthFooter'

const CheckboxLabel = styled.label`
  color : var(--primary-color);
  margin-right: 10px;
`;

const Message = styled.p`
  color: red;
  font-size: 14px;
  margin-bottom: 10px;
`;

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    email: "",
    password: "",
    mobile_number: "",
    is_nurse: false,
  });

  const [message, setMessage] = useState("");
  // const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        setMessage("يرجي كتابه الايميل صحيحا");
      }
      else if(!/^[A-Za-z]+(?:\s[A-Za-z]+)?$/.test(formData.first_name) || !/^[A-Za-z]+(?:\s[A-Za-z]+)?$/.test(formData.last_name)) {
        setMessage("الاسم يجب ان يحتوي علي حروف فقط ");
      }
      else if ( !/^[0-9]+$/.test(formData.mobile_number)){
        setMessage("رقم الهاتف يجب ان يحتوي علي ارقام فقط")
      }
      else if ( formData.first_name.length < 3  ||  formData.last_name.length < 3  ){
        setMessage("الاسم يجب ان يحتوي ع الاقل ع تلات احرف ")
      }
      else {

        const res = await axios.post("http://localhost:5000/api/users/register", formData);
        setMessage(res.data.message || "Registration successful");
        navigate("/login");
      }
    } catch (error) {
      setMessage(error.response?.data?.error || "Registration failed");
    }
  };

  return (

    <div className="col-11 col-md-8 col-lg-8 mx-auto bg-white rounded-3 overflow-hidden pb-3 m-4" id="register-container">
      <div id="intro-header-container" >
        <img src={HeaderIntro} alt="" id="intro-header" />
        <div className="flex-item"><FaAngleRight className='icon' onClick={() => navigate(-1)}/></div>
        <div className="flex-item fs-3 fw-bold"><h2 className="abda">ابدا مع  ONurse</h2></div>
        <div className="flex-item"></div> 
      </div>
      <img src={logo} alt="" className="logo-login m-auto d-block"/>
      <h2 className="title-login text-center fs-1 fw-bold">انشاء حساب </h2>
      {message && <Message>{message}</Message>}
      <div className="padding">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="first_name"
                placeholder="الاسم الاول"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="last_name"
                placeholder="اسم العائله"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="country"
                placeholder="الدوله"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="city"
                placeholder="المدينه"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="email"
                name="email"
                placeholder="ادحل الايميل "
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="mobile_number"
                placeholder="ادخل رقم الهاتف "
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="address"
                placeholder="العنوان"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="date"
                name="bod"
                placeholder="تاريخ الميلاد"
                value={formData.bod}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="text"
                name="user_name"
                placeholder="Username"
                value={formData.user_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-12 col-md-6">
              <input
                className="mb-3 form-control"
                type="password"
                name="password"
                placeholder="ادخل الباسورد"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <input
              className=""
              width={"fit-content"}
              type="checkbox"
              name="is_nurse"
              checked={formData.is_nurse}
              onChange={handleChange}
            />
            <CheckboxLabel>هل انت ممرض؟</CheckboxLabel>
          </div>
          <br />
          <Button className="m-auto d-block" type="submit">انشاء حساب </Button>
        </form>
        <AuthFooter  text="هل لديك حساب بالفعل؟" linkText="تسجيل الدخول" to="/login" />
      </div>
    </div>

  );
};

export default Register;
