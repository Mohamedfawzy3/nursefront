import { useState } from "react";
import styled from "styled-components";
import Footer from "../Componants/Footer";

const AskUs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const questions = [
    "ما هي الخدمات المتوفرة في OnNurse؟",
    "ماذا يشمل طلب الخدمة؟",
    "هل يمكنني تجربة الخدمة قبل الاشتراك؟",
    "إلى أي مدى يكون الطلب متاحًا؟",
    "هل الزيارات تتم وفق جدول محدد أم حسب الحاجة؟"
  ];

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <Container>
        <Title>اسألنا</Title>
        <br/>
        <Content>
          <Form>
            <h3>اسألنا</h3>
            <br/>
            <Input type="text" placeholder="اسمك الكامل" />
            <Input type="email" placeholder="بريدك الإلكتروني" />
            <Textarea placeholder="اكتب سؤالك"></Textarea>
            <Button>إرسال</Button>
          </Form>
          <FAQ>
            {questions.map((question, index) => (
              <Question key={index}>
                <QuestionTitle onClick={() => toggleAnswer(index)}>
                  <span>{question}</span>
                  <span>{openIndex === index ? "-" : "+"}</span>
                </QuestionTitle>
                {openIndex === index && <Answer>هذا هو النص التجريبي للإجابة عن السؤال.</Answer>}
              </Question>
            ))}
          </FAQ>
        </Content>
      </Container>
    </>
  );
};

export default AskUs;

const Container = styled.div`
  padding: 50px;
  max-width: 1100px;
  margin: 50px auto;
  background: #f9f9f9;
  border-radius: 10px;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
`;

const Content = styled.div`
  display: flex;
  gap: 40px;
  
  @media (max-width: 768px) {
 flex-direction: column;
  }
`;
const Form = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  height: 80px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background: #2395f8;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const FAQ = styled.div`
  flex: 2;
`;

const Question = styled.div`
  margin-bottom: 10px;
  background: white;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

const QuestionTitle = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  font-weight: bold;
`;

const Answer = styled.p`
  margin-top: 10px;
  color: #555;
  line-height: 1.6;
`;
