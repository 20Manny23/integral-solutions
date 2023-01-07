import React from "react";
import Auth from "../utils/auth";
import { useNavigate } from "react-router-dom";
import Message from "../components/Login/Message";
import LoginForm from "../components/Login/LoginForm";
import SignupForm from "../components/Login/SignupForm";
import Container from "react-bootstrap/Container";
import "../styles/button-home.css";

const Login = ({
  renderPanel,
  messageButtonIsActive,
  loginButtonIsActive,
  signupButtonIsActive,
}) => {
  
  let navigate = useNavigate();

  return (
    <Container style={{ marginTop: "85px" }}>
      <div className="d-flex flex-column align-items-center mt-3">
        <div
          style={{
            height: "600px",
            minHeight: "600px",
            width: "330px",
            // margin: "10px",
            boxShadow: "5px 5px 5px 5px gray",
            overflowY: "scroll",
          }}
        >
          <div className="mx-4 mt-4 mb-4" style={{ height: "150px" }}>
            <div className="d-flex justify-content-center align-content-center align-item-center">
              {/* <CleanAsset /> */}
              <div style={{ height: "150px", width: "150px", backgroundColor: "black", borderRadius: "50%"}}></div>
            </div>
          </div>
          <div style={{ display: "flex", flex: "auto", width: "100%" }}>
            <button
              className={`baseline ${messageButtonIsActive && "isActive"}`}
              onClick={() => {
                navigate("/messages");
              }}
            >
              Messages
            </button>
            <button
              disabled={Auth.loggedIn()}
              className={`baseline ${loginButtonIsActive && "isActive"}`}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              disabled={Auth.loggedIn()}
              className={`baseline ${signupButtonIsActive ? "isActive" : ""}`}
              onClick={() => {
                navigate("/signup");
              }}
            >
              Sign Up
            </button>
          </div>

          {renderPanel === "messages" ? (
            <Message />
          ) : renderPanel === "login" ? (
            <LoginForm />
          ) : (
            <SignupForm />
          )}
        </div>
      </div>
    </Container>
  );
};

export default Login;
