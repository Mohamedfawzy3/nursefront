
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaUser, FaTasks, FaPlus, FaSignOutAlt } from 'react-icons/fa';

const SidebarContainer = styled.div`
  width: 250px;
  flex-shrink: 0;
  position: fixed;
  right: 0;
  top: 0;
  height: 100vh;
  background: linear-gradient(135deg, #3b5998, #6d9df2);
  color: white;
  display: flex;
  flex-direction: column;
  padding: 20px;
  border-radius: 0.5rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
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

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: rgba(255, 255, 255, 0.3);
    // font-weight: bold;
  }
`;

const IconWrapper = styled.span`
  margin-left: 10px;
  font-size: 20px;
`;

const Sidebar = () => {
  const menuItems = [
    { text: 'البيانات الشخصية', path: 'UpdateProfile', icon: <FaUser /> },
    { text: 'طلباتي', path: 'my-requests', icon: <FaTasks /> },
    { text: 'طلب جديد', path: 'requsts', icon: <FaPlus /> },
    { text: 'تسجيل الخروج', path: '/', icon: <FaSignOutAlt /> },
  ];

  return (
    <SidebarContainer>
      <div  style={{height:"90px"}}></div>
      <MenuList>
        {menuItems.map(({ text, path, icon }) => (
          <MenuItem key={text}>
            <MenuLink to={path}>
              <IconWrapper>{icon}</IconWrapper>
              {text}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
    </SidebarContainer>
  );
};

export default Sidebar;
