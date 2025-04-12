import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; // Adjust the import path as necessary
import { useContext } from "react"; // Import useContext to access UserContext
const MyRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
const { user } = useContext(UserContext); // Access user context
  useEffect(() => {

    const fetchRequests = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/requests/user/${user.id}`);
        setRequests(res.data);
      } catch (error) {
        console.error("❌ Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  // حذف الطلب
  const handleDelete = async (requestId) => {
    try {
      await axios.delete(`http://localhost:5000/api/requests/${requestId}`);
      setRequests(requests.filter(request => request._id !== requestId));
    } catch (error) {
      console.error("❌ Error deleting request:", error);
    }
  };

  // تعديل الطلب
  const handleEdit = (requestId) => {
    navigate(`/account/edit-request/${requestId}`);
  };

  // عرض العروض الخاصة بالطلب
  const handleViewOffers = (requestId) => {
    navigate(`/account/offers/${requestId}`);
  };

  return (
    <section >
    <div >
        <H2>طلباتي</H2>
        <div className="d-flex flex-wrap justify-content-center gap-2">
        {requests.length === 0 ? (
          <NoOffersMessage>لا توجد طلبات متاحة.</NoOffersMessage>
        ) : (
      
          requests.map(request => (
            <RequestCard key={request._id} className="col-12 col-sm-6  col-lg-4">
              <Divm><Headp>العنوان:</Headp>  {request.title}</Divm>
              <Divm><Headp>الوصف :</Headp> {request.description}</Divm>
              <Divm><Headp> رقم الموبايل :</Headp> {request.phone} </Divm>
              <Divm><Headp> الحالة :</Headp> {request.status}</Divm>
              <ButtonGroup>
                <Button className="btn btn-success" onClick={() => handleViewOffers(request._id)}> العروض</Button>
                <Button className="btn btn-primary mx-2" onClick={() => handleEdit(request._id)}>تعديل</Button>
                <Button className="btn btn-danger"   onClick={() => handleDelete(request._id)}> حذف</Button>
              </ButtonGroup>
            </RequestCard>
          ))
        )}
        </div>
      </div>
    </section>
  );
};

export default MyRequests;



const H2 = styled.h2`
  text-align: center;
  font-weight: bold;
  color: var(--main-color);
  margin-bottom: 30px;
`;

// const NoRequests = styled.p`
//   text-align: center;
//   color: #7f8c8d;
//   font-size: 18px;
// `;



const RequestCard = styled.div`
  background: rgb(255, 255, 255); /* Light gray background */
  padding: 20px;
  margin: 20px 0;
  border-radius: 12px; /* Rounded corners */
  border: 1px solid #ddd; /* Subtle border */
  border-bottom: 4px solid var(--main-color); /* Added bottom border */
  text-align: left; /* Align text to the left */
  color: #333; /* Darker text color */
`;

const Divm = styled.div`
  display: flex; /* Use flexbox for alignment */
  justify-content: space-between; /* Space between label and value */
  align-items: center; /* Align items vertically */
  background: rgba(250, 249, 249, 0.56); /* Keep the light background */
  border-radius: 8px;
  padding: 15px;
  font-weight: bold;
  box-shadow: none; /* Removed shadow */
  margin-bottom: 10px; /* Add spacing between rows */
`;

const Headp = styled.p`
  text-align:right;
  font-size:18px;
  // font-weight:bold;

`
const ButtonGroup = styled.div`
  display: flex;
  justify-content:center;
  margin-top: 15px;
`;

const Button = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
  font-size: 14px;
`;

// const EditButton = styled(Button)`
//   background:var(--color-dark);
//   color: #fff;
//   &:hover {
//     background: rgb(51, 87, 179);
//   }
//   margin-left:40px; 
//   margin-right:40px; 
// `;

// const DeleteButton = styled(Button)`
//   background:rgb(157, 45, 33);
//   color: #fff;
//   &:hover {
//     background: #c0392b;
//   }

// `;

// const OfferButton = styled(Button)`
//   background:rgb(18, 84, 46);
//   color: #fff;
//   &:hover {
//     background: #27ae60;
//   }
    
// `;
const NoOffersMessage = styled.p`
  text-align: center;
  font-size: 1.5rem;
  color: #6b7280;
  padding: 2rem;
  background: #f8f9fa;
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
`;
