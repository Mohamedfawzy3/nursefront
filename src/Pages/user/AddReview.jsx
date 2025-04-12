
import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import {  useLocation } from "react-router-dom";

const AddReview = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  // const { offerId } = useParams();
  const location = useLocation();
  const { requestId, nurseId } = location.state || {};

  // console.log("Request ID:", requestId);
  // console.log("Nurse ID:", nurseId);
  // console.log("Location:", location);

  const handleStarClick = (starRating) => {
    setRating(starRating);
  };

  const handleSubmit = async () => {
    if (!requestId || !nurseId) {
      alert("من فضلك تأكد من وجود جميع البيانات المطلوبة!");
      return;
    }
    if (rating === 0) {
      alert("من فضلك اختر تقييم النجوم!");
      return;
    }
    if (!comment) {
      alert("من فضلك اكتب تعليقك!");
      return;
    }

    const reviewData = {
      requestId,
      nurseId,
      rating,
      comment,
    };
    console.log("Sending review data:", reviewData);

    try {
      await axios.post("http://localhost:5000/api/reviews/", reviewData);
      setSuccessMessage("تم إرسال التقييم بنجاح!");
    } catch (error) {
      console.error("Error adding review:", error);
      alert("حدث خطأ أثناء إرسال التقييم!");
    }
  };

  return (
    <Back>
      <div style={styles.container}>
        <h3>إضافة مراجعة</h3>
        <div style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={rating >= star ? styles.filledStar : styles.emptyStar}
              onClick={() => handleStarClick(star)}
            >
              &#9733;
            </span>
          ))}
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="اكتب تعليقك هنا..."
          rows="5"
          style={styles.textarea}
        />
        <button onClick={handleSubmit} style={styles.submitButton}>
          إرسال المراجعة
        </button>
        {successMessage && <p style={styles.successMessage}>{successMessage}</p>}
      </div>
    </Back>
  );
};



const Back = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 250px;
  background-color: #f8f9fa;
  height:100vh;

// `;
const styles = {
  container: {
    maxWidth: "600px",
    margin: "150px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  },
  starsContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px",
  },
  filledStar: {
    color: "#f39c12",
    fontSize: "30px",
    cursor: "pointer",
  },
  emptyStar: {
    color: "#ccc",
    fontSize: "30px",
    cursor: "pointer",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    fontSize: "16px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  submitButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#27ae60",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  successMessage: {
    color: "#2ecc71",
    fontSize: "16px",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default AddReview;
