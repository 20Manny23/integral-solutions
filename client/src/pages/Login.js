import React from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/Login/LoginForm";

import Container from "react-bootstrap/Container";
import "../styles/button-home.css";

import littleFella from "../assets/images-avif/logo-no-slogan.avif";

const Login = ({ renderPanel, loginButtonIsActive }) => {
  let navigate = useNavigate();

  return (
    <Container style={{ marginTop: "85px" }}>
      <div className="d-flex flex-column align-items-center mt-3">
        <div
          style={{
            height: "600px",
            minHeight: "600px",
            width: "330px",
            boxShadow: "5px 5px 5px 5px gray",
            overflowY: "scroll",
          }}
        >
          <div className="mx-4 mt-4 mb-4" style={{ height: "150px" }}>
            <div className="d-flex justify-content-center align-content-center align-item-center">
              <div>
                <img
                  src={littleFella}
                  alt="Integral Solutions logo"
                  style={{
                    marginTop: "15px",
                    maxHeight: "120px",
                    maxWidth: "120px",
                    backgroundColor: "black",
                    borderRadius: "50%",
                  }}
                ></img>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", flex: "auto", width: "100%" }}>
            <button
              disabled={Auth.loggedIn()}
              className={`baseline ${loginButtonIsActive && "isActive"}`}
              style={{fontSize:'35px', border:'none', marginBottom:'-20px', marginTop:'-10px', color:'black'}}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login 
            </button>
           
          </div>
        
          <LoginForm/>
        </div>
      </div>
    </Container>
  );
};

export default Login;
