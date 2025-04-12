import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="container text-center mt-5 h-100vh d-flex flex-column justify-content-center align-items-center" style={{height:"500px"}}>
      <h1>Unauthorized</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/">Go to Home</Link>
    </div>
  );
};

export default Unauthorized;
