
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Adjust the import path as necessary
const Container = styled.div`
  max-width: 700px;
  margin:auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  background:#6d9df2 ;
  // margin-top:-30px;
`;

const Back = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 250px;
  background-color: #f8f9fa;
  min-height:100vh;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  margin-top:5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  display:inline;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  margin:0;
`;

const H2 = styled.h2`
  text-align: center;
  color:white;
  margin-bottom: 40px;
`;

const Button = styled.button`
  width: 50%;
  padding: 10px;
  margin-right:25%;
  margin-top:20px;
  background:var(--color-dark);
  font-weight:bold;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background:rgb(59, 88, 160);
  }
`;

const Message = styled.div`
  text-align: center;
  color: ${(props) => (props.error ? "red" : "green")};
  width:300px;
  margin-right:39%;
  font-weight:bold;
  background:white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  border-radius: 5px;
  padding:10px;
`;

const UpdateProfile = () => {
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
  const { user } = useContext(UserContext); // Assuming you have a UserContext to get the user ID

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user.id}`)
      .then((response) => {
        setFormData(response.data); 
      })
      .catch((error) => {
        console.error("حدث خطأ أثناء جلب البيانات:", error);
        setMessage("حدث خطأ أثناء تحميل البيانات.");
      });
  }, [user.id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put("http://localhost:5000/api/users/", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setMessage("تم تحديث البيانات بنجاح!");
    } catch (error) {
      console.error("خطأ أثناء التحديث:", error);
      setMessage("حدث خطأ أثناء تحديث البيانات.");
    }
  };

  return (
    <Back>
      <div style={{height:"100px"}}></div>
      {message && <Message>{message}</Message>}
    <Container>
      <H2>تحديث الملف الشخصي</H2>
      <form onSubmit={handleSubmit}>  
        <Row>
          <div style={{ width: "48%" }}>
            <label htmlFor="first_name" style={{ fontWeight: "bold", color:"white"}}>الاسم الاول</label>
            <Input type="text" name="first_name" id="first_name" placeholder="الاسم الأول" value={formData.first_name} onChange={handleChange} required />
          </div>
          <div style={{ width: "48%" }}>
            <label htmlFor="last_name" style={{ fontWeight: "bold", color:"white"}}>الاسم التاني</label>
            <Input type="text" id="last_name" name="last_name" placeholder="الاسم الأخير" value={formData.last_name} onChange={handleChange} required />
          </div>
        </Row>
        <Row>
          <div style={{ width: "48%" }}>
            <label htmlFor="city" style={{ fontWeight: "bold", color:"white"}}>المدينة</label>
            <Input type="text" name="city" placeholder="المدينة" value={formData.city} onChange={handleChange} required />
          </div>
          <div style={{ width: "48%" }}>
            <label htmlFor="country" style={{ fontWeight: "bold", color:"white"}}>الدولة</label>
            <Input type="text" name="country" placeholder="الدولة" value={formData.country} onChange={handleChange} required />
          </div>
        </Row>
        
        <label htmlFor="email" style={{ fontWeight: "bold", color:"white"}}>الايميل</label>
        <Input type="email" name="email" placeholder="البريد الإلكتروني" value={formData.email} onChange={handleChange} required />

        <label htmlFor="mobile_number" style={{ fontWeight: "bold", color:"white"}}>رقم الهاتف</label>
        <Input type="text" name="mobile_number" placeholder="رقم الهاتف" value={formData.mobile_number} onChange={handleChange} required />

        <label htmlFor="user_name" style={{ fontWeight: "bold", color:"white"}}>اسم المستخدم</label>
        <Input type="text" name="user_name" placeholder="اسم المستخدم" value={formData.user_name} onChange={handleChange} required />

      

        <Button type="submit">تحديث</Button>
      </form>
    </Container>
    </Back>
  );
};

export default UpdateProfile;
