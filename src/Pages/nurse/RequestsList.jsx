import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const RequestsList = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [expanded, setExpanded] = useState({});

  // ✅ تحميل البيانات مع التحقق من الطلبات المحفوظة في localStorage
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/requests", {
        "headers": {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }})
      .then((response) => {
        console.log(response.data);
        const updatedRequests = response.data.map((req) => ({
          ...req,
          status: req.status || "pending",
        }));
        setRequests(updatedRequests);
      })
      .catch((error) => console.error("Error fetching requests:", error));
  }, []);

  const handleAcceptClick = (request) => {
    if (request.status !== "open") return;
    setSelectedRequest(request);
    setPrice("");
    setMessage("");
  };

  const submitAcceptRequest = () => {
    if (!price || !message) {
      alert("يرجى إدخال السعر والرسالة!");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to accept requests.");
      return;
    }

    axios
      .post(
        "http://localhost:5000/api/acceptRequests",
        { request_id: selectedRequest._id, price, message },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setRequests((prev) => {
          const updatedRequests = prev.map((req) =>
            req._id === selectedRequest._id ? { ...req, accepted: true } : req
          );

          // ✅ حفظ الطلبات المقبولة في localStorage
          const acceptedRequests = updatedRequests
            .filter((req) => req.accepted)
            .map((req) => req._id);

          localStorage.setItem("acceptedRequests", JSON.stringify(acceptedRequests));

          return updatedRequests;
        });

        setSelectedRequest(null); // ✅ إخفاء المودال بعد الإرسال
      })
      .catch((error) => console.error("Error accepting request:", error));
  };

  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Container>
      {requests.length > 0 ? (
        <CardsContainer>
        {requests.map((req, index) => (
          <Card key={req.id || req._id || index}>
            <IconWrapper $approved={req.approved}>{req.approved ? "تم الموافقه" : "انتظار"}</IconWrapper>
            <CardTitle>العنوان : {req.title || "No Title"}</CardTitle>
            <Price>رقم الهاتف : {req.phone ? `${req.phone}` : " لم يتم ارساله"}</Price>
            <CardText> <strong>وصف الطلب :</strong>  
                  {expanded[req._id] || (req.description || "").length <= 50
                    ? req.description || "No Description"
                    : `${req.description.substring(0, 50)}... `}
  
                    {(req.description || "").length > 50 && (
                <span 
                    onClick={() => toggleExpand(req._id)} 
                      style={{ color: "var(--primary-color)", cursor: "pointer", fontWeight: "bold" }}
                >
                {expanded[req._id] ? "عرض أقل" : "عرض المزيد"}
                </span>
                )}
            </CardText>
            <Divp>
            <Item $status={req.status === "open" ? "مفتوح" : req.status === "في حاله التنفيذ" ? "في حاله التنفيذ" : "مغلق"}>
                    حاله الطلب : { req.status === "open" ? "مفتوح" : req.status === "في حاله التنفيذ" ? "في حاله التنفيذ" : "مغلق"}
            </Item>
            <Button   onClick={() => handleAcceptClick(req)}
                          disabled={req.status !== "open" || req.accepted}
                          $accepted={req.accepted}
                          >
                      {req.status === "open" ? (req.accepted ? "تم اضافه العرض " : "اضافه عرض ") : "غير متاح "}</Button></Divp>
          </Card>
        ))}
      </CardsContainer>
      ) : (
        <NoOffersMessage>لا يوجد طلبات متاحه </NoOffersMessage>
      )}
      {selectedRequest && (
        <ModalOverlay>
          <ModalContent>
            <h2>أدخل التفاصيل</h2>
            <Input
              type="number"
              placeholder="السعر"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              type="text"
              placeholder="الرسالة"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div style={{ marginTop: "10px" }}>
              <Putton Putton onClick={() => setSelectedRequest(null)}>إلغاء</Putton>
              <Putton onClick={submitAcceptRequest} style={{ marginRight: "30px" }}>
                إرسال
              </Putton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default RequestsList;

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

const Price = styled.p`
  font-weight: bold;
  color: rgb(137, 135, 135) ;
  margin: 5px 0;
`;

const Container = styled.div`
  margin-top:60px;
ider
`;

const Item = styled.p`
  color: ${(props) =>
    props.$status === "مفتوح" ? "blue" :
    props.$status === "في حاله التنفيذ" ? "orange" : "red"};
  font-weight: bold;
  margin: 20px 0;
`;

const Putton = styled.button`
  color: white;
  padding: 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  background : var(--primary-color);
  width:20%
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom:60px;
  position:relative;
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  color: ${(props) => (props.$approved ? "green" : "#D3D3D3")};
  background:white;
  border-radius: 50%;
  box-shadow: 0 4px 4px rgba(0, 0, 0, 0.1);
  font-weight:bold;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  margin-top:-85px;
`;

const CardTitle = styled.h2`
  font-size: 1.25rem;
  color: var(--color-dark);
  margin-bottom: 1rem;
`;

const CardText = styled.p`
  color: #6b7280;
  margin-bottom: 6rem;
  line-height: 1.5;
`;

const Button = styled.button`
  background: transparent;
  border: 2px solid  ${(props) => (props.$accepted ? "green" : "#007BFF")};
  color:  ${(props) => (props.$accepted ? "green" : "#007BFF")};
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background:  ${(props) => (props.$accepted ? "green" : "#007BFF")};
    color: white;
  }
`;

const Divp = styled.div`
  position:absolute;
  bottom:15px;
`;