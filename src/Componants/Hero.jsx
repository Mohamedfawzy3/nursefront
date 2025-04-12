import React, { useContext } from "react";
import styled from "styled-components";
import headerimg1 from "../assets/header1.png";
import Button from "./Button";
import heroimg2 from "../assets/care.jpg";
import arrow from "../assets/Arrow.png";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Hero = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(UserContext);

  return (
    <>
      <HeroImg1 src={headerimg1} alt="" />
      <HeroSection>
        <HeroContent>
          <h1>NURSE ON</h1>
          <br />
          <pre className="fw-bold ">بحث-نقرة-شفاء</pre>
          <br />
          <p>خطوة واحدة تفصلك عن الانضمام</p>
          <Button
            onClick={() =>
              isAuthenticated ? navigate(`/account/Profile`) : navigate("/intro")
            }
          >
            ابدأ الآن
          </Button>
        </HeroContent>
        <NurseImg2 className="d-none d-md-block" src={heroimg2} />
      </HeroSection>
      <br />
    </>
  );
};

export default Hero;

const HeroSection = styled.section`
  height: calc(100vh - 90px);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeroContent = styled.div`
  align-items: center;
  @media (min-width: 1025px) {
    margin-right: 150px;
  }
  z-index: 5;
  color: var(--secondary-color);
  h1 {
    font-size: 2.5rem;
  }
  pre {
    color: #1d84b5;
    font-size: 40px;
  }
`;

const HeroImg1 = styled.img`
  position: absolute;
  right: 0;
  top: 0;
  z-index: -5;
  width: 100%;
  height: 100vh;
`;

const NurseImg2 = styled.img`
  margin-top: 20px;
  position: absolute;
  left: 170px;
  top: 70px;
  width: 500px;
  max-width: 80%;

  @media (max-width: 768px) {
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    top: 100px;
  }
`;
