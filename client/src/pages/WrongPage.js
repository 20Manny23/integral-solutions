import React, { useEffect } from "react";
import Auth from "../utils/auth";

import { Link, useNavigate } from "react-router-dom";

import { Container, Row, Button } from "react-bootstrap/";
import "../styles/button-style.css";

import wrongPageImg from "../assets/not-found.png";

const WrongPage = ({ renderPanel }) => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!Auth.loggedIn()) {
  //     setTimeout(() => navigate("/login"), 7000);
  //   } else {
  //     setTimeout(() => navigate("/"), 7000);
  //   }
    // eslint-disable-next-line
  // }, []);

  return (
    <Container>
      <Row
        className=" justify-content-center align-items-center "
        // style={{ minHeight: "80vh" }}
      >
        <Button
          as={Link}
          to="/work-order"
          className="rounded-pill wrong-page-button"
          style={{ backgroundColor: "white", border: "none" }}
        >
          <img
            src={wrongPageImg}
            className = 'not-found'
            alt="404 Wrong Page"
           
          />
        </Button>
      </Row>
    </Container>
  );
};

export default WrongPage;
