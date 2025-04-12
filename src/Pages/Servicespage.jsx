import { Scroll } from "lucide-react";
import styled from "styled-components";


const Servicespage = () => {
  return (
    <>
  
      <Container>
        <Title>خدماتنا</Title>
        <ServiceList>
          <Service>
            <Icon>🏥</Icon>
            <h3>الرعاية الصحية المنزلية</h3>
            <p>نحن نقدم خدمات طبية موثوقة تشمل الرعاية اليومية والتمريض المنزلي.</p>
          </Service>
          <Service>
            <Icon>💉</Icon>
            <h3>إعطاء الحقن في المنزل</h3>
            <p>نوفر ممرضين متخصصين لإعطاء الحقن بأمان دون الحاجة للذهاب إلى المستشفى.</p>
          </Service>
          <Service>
            <Icon>🩸</Icon>
            <h3>سحب العينات والتحاليل</h3>
            <p>إجراء تحاليل الدم وسحب العينات من المنزل وتوصيلها للمختبرات المعتمدة.</p>
          </Service>
          <Service>
            <Icon>🦽</Icon>
            <h3>العلاج الطبيعي وإعادة التأهيل</h3>
            <p>نقدم جلسات علاج طبيعي لمساعدتك على تحسين صحتك الحركية.</p>
          </Service>
        </ServiceList>
      </Container>
    </>
  );
};

export default Servicespage;

// ✅ تصميم باستخدام Styled Components
const Container = styled.div`
  padding: 50px;
  max-width: 1000px;
  margin: 50px auto;
  background: #f9f9f9;
  border-radius: 10px;
  text-align: center;
   
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: bold;
  color: var(--primary-color);
  margin-bottom: 30px;
`;

const ServiceList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const Service = styled.div`
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  &:hover {
    transform: translateY(-5px);
  }
`;

const Icon = styled.div`
  font-size: 40px;
  margin-bottom: 10px;
`;
