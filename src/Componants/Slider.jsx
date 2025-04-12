import { FaUser, FaSignOutAlt, FaInbox, FaInfoCircle, FaCommentDots, FaTasks, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import path as necessary
const SidebarContainer = styled.div`
  width: fit-content;
  flex-shrink: 0;
  position: sticky;
  left: 0; // Adjusted to left for better UX
  top: 76px;
  height: calc(100vh - 76px);
  background: #3b3b3bcc;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  @media (max-width: 768px) {
padding: 0px;
    }
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  margin:0px
`;

const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const MenuItem = styled.li`
  margin: 10px 0;
`;

const MenuLink = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px;
  padding: 12px 20px;
  border-radius: 8px;
  transition: 0.3s;
font-weight: 600;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
    font-weight: bold;
  }
`;

const IconWrapper = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;

const Slider = () => {
  const navigate = useNavigate();
const { logout,user } = useContext(UserContext); // Access user context
  const logout_fun = () => {
logout(); // Call logout function from context

    // Redirect to login page and clear navigation stack
    navigate('/login', { replace: true });
  };

  const nursemenuItems = [
    { text: 'البيانات الشخصية', path: '/account/profile', icon: <FaUser /> },
    { text: 'الطلبات الجديده', path: '/account/RequestNew', icon: <FaInbox /> },
    { text: 'معلومات الطلب', path: '/account/MyOffers', icon: <FaInfoCircle /> },
    { text: 'التقيمات', path: '/account/RequestReviwes/:nurseId', icon: <FaCommentDots /> },
    { text: 'تسجيل الخروج', path: '#', icon: <FaSignOutAlt />, action: logout_fun },
  ];

  const patientmenuItems = [
    { text: 'البيانات الشخصية', path: '/account/profile', icon: <FaUser /> },
    { text: 'طلباتي', path: '/account/my-requests', icon: <FaTasks /> },
    { text: 'طلب جديد', path: '/account/requsts', icon: <FaPlus /> },
    { text: 'تسجيل الخروج', path: '#', icon: <FaSignOutAlt />, action: logout_fun },
  ];

  const [choosenitems, setChoosenitems] = useState([]);

  useEffect(() => {
    if (user?.is_nurse) {
      setChoosenitems(nursemenuItems);
    } else {
      setChoosenitems(patientmenuItems);
    }
  }, []);

  return (
    <SidebarContainer>
      <MenuList>
        {choosenitems.map(({ text, path, icon, action }) => (
          <MenuItem key={text}>
            {action ? (
              <MenuLink as="button" onClick={action} style={{ background: 'none', border: 'none', padding: 0 }}>
                <IconWrapper>{icon}</IconWrapper>
                <span className="d-none d-md-block">{text}</span>
              </MenuLink>
            ) : (
              <MenuLink to={path}>
                <IconWrapper>{icon}</IconWrapper>
                <span className="d-none d-md-block">{text}</span>
              </MenuLink>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Slider;