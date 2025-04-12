import styled from "styled-components";

const Container = styled.div`
  width: 50%;
  margin: 10px 50px auto;
  padding-bottom: 20px;
  background: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  text-align: center;
  overflow: hidden;
  @media (max-width: 768px) {
    width: 100%;
    margin: 10px auto;
  }
`;

export default Container;