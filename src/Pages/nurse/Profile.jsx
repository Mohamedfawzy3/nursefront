import styled from "styled-components";
import style from "../../styles/NurseProfile.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Adjust the import path as necessary
const Container = styled.div`
  max-width: 700px;
  margin: 0px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background: white;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  margin-top: 5px;
  border: 1px solid #d5d5d5;
  outline-color: var(--main-color);
  border-radius: 5px;
  font-size: 16px;
  display: inline;
`;

const H2 = styled.h2`
  text-align: center;
  color: var(--main-color);
  margin-bottom: 40px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 140px;
  padding: 6px;
  margin: auto;
  margin-top: 20px;
  background: var(--main-color);
  font-weight: bold;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: var(--main-color-heavy);
  }
`;

const Message = styled.div`
  text-align: center;
  color: ${(props) => (props.error ? "red" : "rgb(20, 50, 120)")};
  width: 300px;
  margin-left: 20px;
  font-weight: bold;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding: 10px;
`;

const Profile = () => {
  const{user,setUser}=useContext(UserContext)
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    mobile_number: "",
    user_name: "",
    city: "",
    country: "",
  });
  const [message, setMessage] = useState("");
  const userId = user?.id 
  useEffect(() => {
    console.log("user",user);
    setFormData(user)
    // if (!userId) {
    //   // console.error("User ID غير موجود في localStorage");
    //   setMessage("خطأ: لم يتم العثور على المستخدم.");
    //   return;
    // }

    // axios
    //   .get(`http://localhost:5000/api/users/${userId}`)
    //   .then((response) => {
    //     setFormData(response.data);
    //   })
    //   .catch((error) => {
    //     console.error("حدث خطأ أثناء جلب البيانات:", error);
    //     setMessage("حدث خطأ أثناء تحميل البيانات.");
    //   });
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
     const response= await axios.put("http://localhost:5000/api/users/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
setUser((prev) => ({
        ...prev,
        ...response.data,
      }));
      setMessage("تم تحديث البيانات بنجاح!");
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      console.error("خطأ أثناء التحديث:", error);
      setMessage("حدث خطأ أثناء تحديث البيانات.");
    }
  };

  return (
    <>
      {message && <Message>{message}</Message>}
      <Container>
        <H2>تحديث الملف الشخصي</H2>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className=" col-12 col-sm-6 ">
              <label htmlFor="first_name">الاسم الاول</label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                placeholder="الاسم الأول"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
            </div>

            <div className=" col-12 col-sm-6">
              <label htmlFor="last_name">الاسم التاني</label>
              <Input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="الاسم الأخير"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className=" col-12 col-sm-6 ">
              <label htmlFor="city">المدينة</label>
              <Input
                type="text"
                name="city"
                placeholder="المدينة"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className=" col-12 col-sm-6">
              <label htmlFor="country">الدولة</label>
              <Input
                type="text"
                name="country"
                placeholder="الدولة"
                value={formData.country}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <label htmlFor="email">الايميل</label>
          <Input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="mobile_number">رقم الهاتف</label>
          <Input
            type="text"
            name="mobile_number"
            placeholder="رقم الهاتف"
            value={formData.mobile_number}
            onChange={handleChange}
            required
          />

          <label htmlFor="user_name">اسم المستخدم</label>
          <Input
            type="text"
            name="user_name"
            placeholder="اسم المستخدم"
            value={formData.user_name}
            onChange={handleChange}
            
            readOnly
            disabled
          />

          <Button type="submit">تحديث</Button>
        </form>
      </Container>
    </>
  );
};

export default Profile;
