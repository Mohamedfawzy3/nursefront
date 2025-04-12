import React from "react";
import styled from "styled-components";
import Slider from "./Componants/Slider";
import { Outlet } from "react-router-dom";

const Main = styled.main`
direction: ltr;
  flex-grow: 1;
  overflow-y: auto;
  
  padding: 0px 10px;
  
&::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

&::-webkit-scrollbar
{
	width: 10px;
	background-color:rgb(255, 255, 255);
}

&::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color:var(--main-color);
}
`;

const NurseDashboard = () => {
  return (
    <div className="" style={{height:"100vh",display:"flex"}}>
      <Slider />
      <Main>
        <Outlet/>
      </Main>
    </div >
  );
};

export default NurseDashboard;



