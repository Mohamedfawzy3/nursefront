import styled from "styled-components";
const Input = styled.input`
  width: ${props => props.width ? props.width : "100%"};
  padding: 8px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export default Input;