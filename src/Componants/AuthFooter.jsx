import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";

const AuthFooter = ({ text, linkText, to }) => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <span>{text}</span>
      <LinkText onClick={() => navigate(to)}>{linkText}</LinkText>
    </FooterContainer>
  );
};
AuthFooter.propTypes = {
  text: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
// تصميم باستخدام Styled Components
const FooterContainer = styled.div`
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #555;
`;

const LinkText = styled.span`
  color: var(--primary-color);
  cursor: pointer;
  margin-left: 5px;
  font-weight: bold;

  &:hover {
    text-decoration: underline;
  }
`;

export default AuthFooter;
