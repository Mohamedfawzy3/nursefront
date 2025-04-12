import React, { useRef, useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import styles from "../styles/Nav.module.css"; // Corrected path
import logo from "../assets/logoes.jpg"; // Corrected path
import { IoPerson } from "react-icons/io5";
import "../styles/toggle.css"; // Corrected path
import { useLocation } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function Nav() {
  const toggler = useRef(null);
  const { user, isAuthenticated, logout } = useContext(UserContext); // Access context

  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/about", label: "من نحن" },
    { path: "/serivcepage", label: "الخدمات" },
    { path: "/askus", label: "تواصل معنا" },
    { path: "/FQAPAGE", label: "الأسئلة الشائعة" },
  ];

  const handleClick = () => {
    if (toggler.current) toggler.current.click();
  };

  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleUser = () => {
    navigate("/account/Profile");
  };

  console.log("Nav context state:", { user, isAuthenticated }); // Debugging log

  return (
    <div className={`container-fluid ${styles.navContainer}`}>
      <nav className={`navbar navbar-expand-lg bg-white px-4 shadow shadow-sm ${styles.navStyle}`}>
        <NavLink className="navbar-brand m-0" to="/">
          <img className={`${styles.logo}`} src={logo} alt="logo" />
        </NavLink>

        {/* toggle menu */}
        <div
          className={`togle-menu d-block d-lg-none text-danger `}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          <button
            className={`menu ${isOpen ? "opened" : ""}`}
            ref={toggler}
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg width="50" height="50" viewBox="0 0 100 100">
              <path
                className="line line1"
                d="M 20,29.000046 H 80.000231 C 80.000231,29.000046 94.498839,28.817352 94.532987,66.711331 94.543142,77.980673 90.966081,81.670246 85.259173,81.668997 79.552261,81.667751 75.000211,74.999942 75.000211,74.999942 L 25.000021,25.000058"
              />
              <path className="line line2" d="M 20,50 H 80" />
              <path
                className="line line3"
                d="M 20,70.999954 H 80.000231 C 80.000231,70.999954 94.498839,71.182648 94.532987,33.288669 94.543142,22.019327 90.966081,18.329754 85.259173,18.331003 79.552261,18.332249 75.000211,25.000058 75.000211,25.000058 L 25.000021,74.999942"
              />
            </svg>
          </button>
        </div>
        <div className={`collapse navbar-collapse w-100 navCollapse`} id="navbarSupportedContent">
          <ul className={`navbar-nav me-auto mb-2 mb-lg-0 navList`}>
            {navLinks.map(({ path, label }) => (
              <li className={`nav-item ${styles.navItem}`} key={path}>
                <NavLink
                  onClick={handleClick}
                  className={({ isActive }) =>
                    `nav-link fw-semibold fs-6 me-4 navLink ${isActive ? styles.active : ""}`
                  }
                  to={path}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
          <span className="fw-bold text-muted me-sm-1 me-md-3 mt-2 ms-1">

            {isAuthenticated ? user.first_name : "Guest"}
            <PersonIcon onClick={handleUser}/>
          </span>
        
        </div>
      </nav>
    </div>
  );
}

const PersonIcon = styled(IoPerson)`
  font-size: 24px;
  cursor: pointer;
  color: rgb(110, 113, 122);
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;