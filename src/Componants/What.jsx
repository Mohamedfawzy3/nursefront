import what from "../assets/what.png";
import styled from "styled-components";
import "../styles/what.css";
const What = () => {
  return (
    <Div>
      <img src={what} className="img-what"/>
    </Div>
  );
}
const Div = styled.div`
 
`;
export default What;
