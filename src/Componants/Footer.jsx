import styled from "styled-components";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import style from '../styles/footer.module.css';
const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
 gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
text-align: right;
`;

const Title = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 10px;
  font-weight: bold;
`;

const Text = styled.p`
  font-size: 0.9rem;
  color: #b0b0b0;
`;

const Links = styled.ul`
  list-style: none;
  padding: 0;
`;

const LinkItem = styled.li`
  margin-bottom: 8px;
  transition: transform 0.3s ease, color 0.3s ease; // Smooth transition for transform
  &:hover {
    transform: translateX(-7px); // Move the entire li element smoothly
  }

  a {
    text-decoration: none;
    color:  #b0b0b0;
    transition: color 0.3s ease;

    &:hover {
      color: var(--main-color); // Change color smoothly
    }
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 15px;
  font-size: 1.5rem;

  a {
    color: #b0b0b0;
    transition: color 0.3s ease, transform 0.3s ease; // Added transform to transition

    &:hover {
      color: var(--main-color);
      transform: scale(1.2); // Smoothly scale the icon on hover
    }
  }

  @media (max-width: 768px) {
    gap: 10px; // Reduce spacing between icons
    font-size: 1.2rem; // Reduce icon size
  }
`;


const Copyright = styled.div`
  text-align: center;
  font-size: 0.8rem;
  color: #b0b0b0;
  margin-top: 20px;
  border-top: 1px solid #333;
  padding-top: 10px;
`;

const Footer = () => {
  return (
    <>
    <footer>
      <FooterContent>
        <div className={`${style.layout}`}></div>
        <FooterSection>
          <Title>عن التطبيق</Title>
          <Text>نحن في ONURSE نوفر خدمات التمريض المنزلي لضمان راحتكم ورفاهيتكم. يقدم فريقنا من الممرضين والممرضات المتخصصين رعاية طبية مهنية تلبي احتياجتكم الصحيه في منزلكم بكل أمان وراحة</Text>
        </FooterSection>

        <FooterSection>
          <Title>روابط سريعة</Title>
          <Links>
            <LinkItem><a href="/">الرئيسيه</a></LinkItem>
            <LinkItem><a href="/serivcepage">الخدمات</a></LinkItem>
            <LinkItem><a href="/FQAPAGE">الأسئلة المتكررة</a></LinkItem>
            <LinkItem><a href="/askus">اتصل بنا</a></LinkItem>
          </Links>
        </FooterSection>

        <FooterSection>
          {/* <img src={vectorr}/> */}
          <Title>تابعنا</Title>
          <SocialIcons>
            <a href="#" className={style.socialIcon}><FaFacebook /></a>
            <a href="#" className={style.socialIcon}><FaTwitter /></a>
            <a href="#" className={style.socialIcon}><FaInstagram /></a>
            <a href="#" className={style.socialIcon}><FaLinkedin /></a>
          </SocialIcons>
        </FooterSection>
      </FooterContent>
      {/* الحقوق */}
      <Copyright>© 2025 جميع الحقوق محفوظة | تطبيق التمريض المنزلي</Copyright>
    </footer>
    </>
  );
};

export default Footer;
