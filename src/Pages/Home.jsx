import HeroSection from "../Componants/Hero";
import styled from "styled-components";
import What from "../Componants/What";
import Services from "../Componants/Services";
import Reviews from "../Componants/Reviews";
import FAQ from "../Componants/FAQ ";


const HomePage = () => {
  return (
    <>
      
      <Container>
        <HeroSection />
        <What />
        <Services />
        <Reviews />
        <FAQ />
      </Container>
    </>
  );
};

export default HomePage;

const Container = styled.div`
  width: 100%;
  font-family: Arial, sans-serif;
  direction: rtl;
  text-align: center;
`;