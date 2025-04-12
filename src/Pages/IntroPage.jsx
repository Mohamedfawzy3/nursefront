import { useNavigate } from "react-router-dom";
import "../styles/styleintro.css";
import HeaderIntro from "../assets/Header.png";
import Header from "../Componants/Header";
import QuoteUp from "../assets/quote-up.png";
import logo from "../assets/Vector.png";
import { FaAngleRight } from "react-icons/fa";
import Button from "../Componants/Button";
import styled from "styled-components";

const SpacedButton = styled(Button)`
  margin-top: 20px;
`;
const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <div id="intro-header-container">
        <img src={HeaderIntro} alt="" id="intro-header" />
        <div className="flex-item">
          <FaAngleRight className="icon" onClick={() => navigate(-1)} />
        </div>
        <div className="flex-item">
          <h2>ابدا مع ONurse</h2>
        </div>
        <div className="flex-item"></div>
      </div>

      <div className="container">
        <img src={QuoteUp} className="quote-up" />
        <img src={logo} className="logo" />
        <div className="intro-section">
          <h2>نبذة عن منصة ONurse</h2>
          <p>
            منصتنا هي بوابة رقمية متكاملة تهدف إلى ربط المرضى وكبار السن وكافة
            من يحتاجون إلى رعاية طبية مع مقدمي خدمات التمريض المنزلي المحترفين.
            نقدم حلولًا ذكيةً لتوفير الرعاية الصحية في منازل المرضى بكل سهولة
            وأمان، مع الحفاظ على أعلى معايير الجودة والخصوصية.
          </p>
        </div>
        <div className="intro-section">
          <h2>رؤية المنصة</h2>
          <p>
            أن نكون الوجهة الأولى في الشرق الأوسط لتقديم خدمات التمريض المنزلي
            المبتكرة، التي تعيد تعريف مفهوم الرعاية الصحية وتجعلها في متناول
            الجميع
          </p>
        </div>
        <div className="intro-section">
          <h2>رسالة المنصة</h2>
          <p>
            تقديم رعاية طبية وإنسانية متميزة في المنزل عبر كوادر تمريضية مؤهلة
          </p>
        </div>
        <div className="intro-section">
          <h2>أهداف منصة ONurse</h2>
          <ol>
            <li>
              توفير خدمات تمريضية متخصصة (مثل تغذية وريدية، تغيير الضمادات،
              إدارة الأمراض المزمنة)
            </li>
            <li>
              تمكين الأسر من متابعة حالة المريض إلكترونيًا عبر تقارير يومية
            </li>
            <li>التوسع الجغرافي لتغطية أكبر عدد من المدن والمناطق النائية</li>
            <li>لشراكات الاستراتيجية مع المستشفيات وشركات التأمين.</li>
            <li>التركيز على احتياجات الطلاب الصحية في السعودية.</li>
          </ol>
        </div>
        <p className="p-intro">
          منصة Onurse تعتبر شريكًا مثاليًا لتحقيق التفوق الأكاديمي في التعليم
          الصحي ودعم بناء مستقبل مهني متميز.
        </p>
        <SpacedButton onClick={() => navigate("/login")}>انضمام</SpacedButton>
      </div>
    </>
  );
};

export default IntroPage;
