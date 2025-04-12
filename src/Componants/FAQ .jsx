
import styled from "styled-components";
import { useState } from "react";

const FAQSection = styled.section`
  padding: 50px 20px;
  background: #f9f9f9;
  text-align: center;
  color:var(--primary-color);
`;

const FAQContainer = styled.div`
  max-width: 800px;
  margin: auto;
`;

const FAQItem = styled.div`
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  overflow: hidden;
  transition: all 0.3s ease;
`;

const Question = styled.div`
  background:var(--primary-color);
  color: #fff;
  padding: 15px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Answer = styled.div`
  padding: 15px;
  font-size: 14px;
  color: #333;
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease-in-out;
`;


const FAQs = [
  {
    question: "كيف يمكنني طلب خدمة تمريض منزلية؟",
    answer: "يمكنك طلب الخدمة عبر التطبيق واختيار الممرض المناسب لمتطلباتك.",
  },
  {
    question: "ما هي طرق الدفع المتاحة؟",
    answer: "حاليًا، يتم الدفع كاش عند زيارة الممرض.",
  },
  {
    question: "هل يمكنني إلغاء الطلب بعد إرساله؟",
    answer: "نعم، يمكنك إلغاء الطلب قبل تأكيد الممرض له.",
  },
  {
    question: "ما هي خدمات التمريض المنزلي المتاحة؟؟",
    answer: "تشمل خدمات التمريض المنزلي مجموعة واسعة من الرعاية الصحية المقدمة في المنزل، مثلرعاية ما بعد العمليات الجراحية: تشمل تغيير الضمادات، متابعة الجروح، وإدارة الألم.رعاية المرضى المسنين: تتضمن المساعدة في الأنشطة اليومية، مثل الاستحمام، التغذية، وإدارة الأدوية.التمريض المتخصص: مثل رعاية مرضى السكري، مرضى الضغط، أو المرضى الذين يحتاجون إلى جلسات علاج طبيعي.العناية بالجروح والتقرحات: يتم توفير رعاية متخصصة للجروح المزمنة، التقرحات الجلدية، والعناية بالمصابين بالحروق.العج الوريدي والحقن: يشمل إعطاء الأدوية عن طريق الحقن الوريدي أو العضلي حسب توصيات الطبيب",
  },
  {
    question: "ما هي ساعات العمل المتاحة؟",
    answer: "نحن نوفر خدماتنا على مدار 24 ساعة طوال أيام الأسبوع.",
  },
  {
    question: "ما هي ساعات العمل المتاحة؟",
    answer: "نحن نوفر خدماتنا على مدار 24 ساعة طوال أيام الأسبوع.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <FAQSection>
      <h2>الأسئلة المتكررة</h2>
      <br/>
      <FAQContainer>
        {FAQs.map((faq, index) => (
          <FAQItem key={index}>
            <Question onClick={() => toggleFAQ(index)}>
              {faq.question} <span>{openIndex === index ? "−" : "+"}</span>
            </Question>
            {/* <Answer isOpen={openIndex === index}>{faq.answer}</Answer> */}
            <Answer $isOpen={openIndex === index}>{faq.answer}</Answer>
          </FAQItem>
        ))}
      </FAQContainer>
    </FAQSection>
  );
};

export default FAQ;
