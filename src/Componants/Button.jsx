import styled from "styled-components";

const Button = styled.button`
  background: var(--primary-color);
  color: var(--on-primary);
  border: none;
  outline: none;
  padding: 5px;
  border-radius: 5px;
  width: ${props => props.width ? props.width : "150px"};
  cursor: pointer;
  transition: opacity 0.2s;
  margin-top: 20px;
  margin-bottom: 10px;
  &:hover {
    opacity: 0.9;
  }
`;

export default Button;