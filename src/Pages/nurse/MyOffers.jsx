import Slider from "../../Componants/Slider";
import  { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { Edit2, Trash2 } from "lucide-react"
import { useContext } from "react";
import { UserContext } from "../../context/UserContext"; // Adjust the import path as necessary
import { MdDeleteForever } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const ModalContent = styled.div`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    min-width: 300px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
`;



const Button = styled.button`
    background: var(--color-dark);
    color: #fff;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 5px;
    display: inline-block;
`;


const MyOffers = () => {
    const [offers, setOffers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [price, setPrice] = useState("");
    const [message, setMessage] = useState("");
const { user } = useContext(UserContext); // Assuming you have a UserContext to get user info
    useEffect(() => {
        fetchOffers();
    }, []);

    const fetchOffers = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/acceptRequests/nurse/${user.id}`
            );
            console.log("📌 بيانات العروض:", response.data); // ← طباعة البيانات القادمة من API
            setOffers(response.data);
        } catch (error) {
            console.error("Error fetching offers:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (offerId) => {
        try {
            await axios.delete(`http://localhost:5000/api/acceptRequests/${offerId}`);
            setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== offerId));
            console.log("Offer deleted successfully");
            setError(null);
        } catch (error) {
            console.error("Error deleting offer:", error);
            setError(error.message);
        }
    };

    const handleEdit = (offer) => {
        setSelectedRequest(offer);
        setPrice(offer.price);
        setMessage(offer.message);
    };

    const submitAcceptRequest = async () => {
        try {
            const offerId = selectedRequest._id;
            console.log("🚀 إرسال التعديل:", { offerId, price, message });
            const response = await axios.put(`http://localhost:5000/api/acceptRequests/${offerId}/accept`,
                { price, message }
            );
            console.log("✅ تحديث العرض:", response.data);
            // تحديث حالة العروض بشكل صحيح
            setOffers((prevOffers) =>
                prevOffers.map((offer) =>
                    offer._id === offerId ? { ...offer, price, message } : offer
                )
            );
            
            setSelectedRequest(null); // إخفاء ال overlay
            fetchOffers();
            console.log("Offer updated successfully");
            setError(null);
        } catch (error) {
            console.error("Error updating offer:", error);
            setError(error.response?.data?.message || error.message);
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

return (
  <>
   
      <OffersSection>
        <SectionHeader>
          <Title>عروضي</Title>
        </SectionHeader>
        <OffersContainer>
          {offers.length === 0 ? (
            <NoOffersMessage>لا توجد عروض متاحة حتى الآن.</NoOffersMessage>
          ) : (
            offers.map((offer) => (
              <OfferCard key={offer._id}>
                <OfferInfo>
                  <OfferTitle>{offer.request_id?.description || "لا يوجد وصف"}</OfferTitle>
                  <OfferPrice>السعر المقدم : {offer?.price ||"لا يوجد سعر" }</OfferPrice>
                  <OfferDescription>العرض المقدم :<div>{offer?.message || "لا يوجد رسالة"}</div></OfferDescription>
                </OfferInfo>
                <ButtonGroup>
                
                  <button className="btn btn-outline-primary btn-sm me-1" onClick={() => handleEdit(offer)}><  FaRegEdit className="fs-4"/>
                  </button>
              
                  <button className="btn btn-outline-danger btn-sm me-1" onClick={() => handleDelete(offer._id)}><  MdDeleteForever className="fs-4"/>
                  </button>
                </ButtonGroup>
              </OfferCard>
            ))
          )}
        </OffersContainer>
      </OffersSection>
  
    {selectedRequest && (
                  <ModalOverlay>
                    <ModalContent>
  <h2>أدخل التفاصيل</h2>
  <form onSubmit={submitAcceptRequest}>
    <Input
      type="number"
      placeholder="السعر"
      value={price}
      onChange={(e) => setPrice(e.target.value)}
      required
    />
    <Input
      type="text"
      placeholder="الرسالة"
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      required
    />
    <div style={{ marginTop: "10px" }}>
      <Button type="button" onClick={() => setSelectedRequest(null)}>إلغاء</Button>
      <Button type="submit" style={{ marginRight: "10px" }}>
        إرسال
      </Button>
    </div>
  </form>
</ModalContent>
                  </ModalOverlay>
              )}
  </>
);
};

export default MyOffers;

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


const OffersSection = styled.section`
  padding: 4rem 2rem;
  // background: white;
`

const SectionHeader = styled.div`
  max-width: 1200px;
  margin: 0 auto 2rem;
`

const Title = styled.h2`
  font-size: 2rem;
  color: var(--color-dark);
  margin-bottom: 1rem;
  text-align:center;
`

const OffersContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  gap: 1.5rem;
`

const OfferCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`

const OfferInfo = styled.div`
  flex: 1;
`

const OfferTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--color-dark);
  margin-bottom: 1.5rem;
  text-align:center;

`

const OfferPrice = styled.p`
  font-size: 1.125rem;
  color: var(--primary-color);
  font-weight: 600;
`

const OfferDescription = styled.p`
  color: #6b7280;
  margin-top: 0.5rem;
  text-wrap: wrap;
`

const ButtonGroup = styled.div`
  display: flex;
  gap: 3px;
  margin-top:20px;
`

const ActionButton = styled.button`
  padding: 0.5rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;

  &:hover {
    transform: scale(1.05);
  }
`

const EditButton = styled(ActionButton)`
  background: #f3f4f6;
  color: var(--color-dark);

  &:hover {
    background: #e5e7eb;
  }
`


const DeleteButton = styled(ActionButton)`
  background: #fee2e2;
  color: #dc2626;

  &:hover {
    background: #fecaca;
  }
`
