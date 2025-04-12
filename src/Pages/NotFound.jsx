import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import notFoundImage from "../assets/image.png"; // Ensure this image exists in the assets folder

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  text-align: center;

`;

const Image = styled.img`
  max-width: 400px;
  width: 100%;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: var(--main-color);
  margin-bottom: 10px;
`;

const Message = styled.p`
  font-size: 1.5rem;
  color: #6b7280;
  margin-bottom: 20px;
`;

const BackButton = styled(Link)`
  display: inline-block;
  padding: 10px 20px;
  font-size: 1rem;
  color: white;
  background-color: var(--main-color);
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--main-color-heavy);
  }
`;

const NotFound = () => {
  return (
    <NotFoundContainer>
      <Image src={notFoundImage} alt="Page Not Found" />
      <Title>404 - الصفحة غير موجودة</Title>
      <Message>عذرًا، الصفحة التي تبحث عنها غير موجودة.</Message>
      <BackButton to="/">العودة إلى الصفحة الرئيسية</BackButton>
    </NotFoundContainer>
  );
};

export default NotFound;
