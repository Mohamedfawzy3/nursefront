import { useState } from "react";
import styled from "styled-components";

const faqData = [
  { question: "ما هي الخدمات المتوفرة في OnNurse؟", answer: "نحن نقدم خدمات التمريض المنزلي، الرعاية الطبية، والاستشارات الصحية." },
  { question: "ماذا يشمل طلب الخدمة؟", answer: "يشمل زيارة الممرض، تقديم الرعاية، وشرح التعليمات الطبية." },
  { question: "هل يمكن تجربة الخدمة قبل الاشتراك؟", answer: "نعم، يمكنك طلب زيارة تجريبية للتأكد من جودة الخدمة." },
  { question: "إلى متى يكون الطلب متاحًا لي؟", answer: "يمكنك حجز الخدمة في أي وقت يناسبك وفقًا لتوافر الممرضين." },
  { question: "هل الزيارات تتم وفق جدول محدد أم حسب الحاجة؟", answer: "يمكنك تحديد الجدول المناسب لك أو طلب الخدمة عند الحاجة." },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Container>
        <Title>الأسئلة الشائعة</Title>
        {faqData.map((item, index) => (
          <QuestionBox key={index} onClick={() => toggleFAQ(index)}>
            <Question>
              {item.question}
              <span>{openIndex === index ? "➖" : "➕"}</span>
            </Question>
            {openIndex === index && <Answer>{item.answer}</Answer>}
          </QuestionBox>
        ))}
      </Container>
    </>
  );
};

export default FAQ;

const Container = styled.div`
  padding: 50px;
  max-width: 800px;
  margin: 50px auto;
  background: #f9f9f9;
  border-radius: 10px;
  
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 20px;
`;

const QuestionBox = styled.div`
  background: white;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #eef7ff;
  }
`;

const Question = styled.div`
  font-size: 18px;
  display: flex;
  justify-content: space-between;
  font-weight: bold;
`;

const Answer = styled.p`
  margin-top: 10px;
  font-size: 16px;
  color: #555;
  line-height: 1.6;
`;
