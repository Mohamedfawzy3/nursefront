
import welcomeimg from "../../../../assets/welcome img.png";
import styled from "styled-components";

const WelcomeImage = styled.img`
  position: absolute;
  top: 300px;
  left: 0px;
  right: 300px;
  z-index: -1;
`;
const Welcome = () => {
  return (
    <>
      <WelcomeImage src={welcomeimg} alt="" />
      <div style={{ position: "absolute", zIndex: -1 , left: "50px", top: "160px" }}>
      <h1
        style={{
          textAlign: "center",
          marginTop: "80px",
          fontSize: "clamp(2rem, 5vw, 3rem)", // متجاوب مع الشاشات المختلفة
          fontWeight: "bold",
          background: "linear-gradient(90deg, #1E3A8A, #007bff)",
          WebkitBackgroundClip: "text",
          color: "transparent",
          fontFamily: '"IBM Plex Arabic", sans-serif',
          textShadow: "2px 2px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        مرحبا بكم في ONurse
      </h1>
      <div style={{width:"700px"}}>
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",  
          color: "var(--secondary-color)",
          fontSize:"20px",
          fontWeight:"bold",
          lineHeight:"40px",
        }}
      >
        Onurse – لأن راحتك تهمنا! احصل على خدمات التمريض والرعاية الصحية التي تحتاجها بكل سهولة وسرعة.  
      </p>
      </div>
      </div>
      
    </>
  );
}

export default Welcome;
