// import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Container, Nav } from "react-bootstrap";
import "../styles/Forms.css";
import Footer from "../components/Home/Footer";

function ContactForm() {
  return (
    <>
      <div
        className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary "
        style={{ margin: "30px 30px 30px 50%", textAlign: "center" }}
      >
        <Row>
          <Col>
            <Form
              className="py-3 overflow-auto custom-about"
              style={{ width: "80vw" }}
              action="mailto:bhoff1980@gmail.com"
            >
              <h2 className="display-6 custom-text heading">
                Tell Us How We Can Help
              </h2>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Company Name
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Company Name"
                  name="company"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Contact Name
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Contact Name"
                  name="name"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Phone Number
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="tel"
                  placeholder="Enter phone 123-456-7890"
                  name="telNo"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                  required
                />
              </Form.Group>
              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Email Address
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  required
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Address
                  </Form.Label>
                  <Form.Label></Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  placeholder="Enter Address"
                  name="address"
                />
              </Form.Group>

              <Row className="addy">
                <Col xs={7}>
                  <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                  <Form.Control className="custom-border" placeholder="City" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    State
                  </Form.Label>
                  <Form.Control
                    className="custom-border"
                    placeholder="State"
                  />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Zipcode
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="Zip" />
                </Col>
              </Row>

              <Row className="addy">
                <Col xs={6}>
                  <Form.Label style={{ fontWeight: "bolder" }}>Office Sqft</Form.Label>
                  <Form.Control className="custom-border" placeholder="8000 Sqft" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder", display:'flex', justifyContent:'center' }}>
                   Number of Employees
                  </Form.Label>
                  <Form.Check
                    inline
                    label="Home Office"
                  />
                   <Form.Check
                    inline
                    label="Less than 50"
                  />
                    <Form.Check
                    inline
                    label="50-100"
                  />
                    <Form.Check
                    inline
                    label="More than 100"
                  />
                </Col>
             
              </Row>

              <div className="d-flex justify-content-between">
                <Form.Group className="form-length" controlId="formBasicEmail">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Estimated Date for Work to be Scheduled
                    </Form.Label>
                  </div>
                  <Form.Control className="custom-border" type="date" />
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    fontWeight: "bolder",
                  }}
                >
                  Services Needed
                </Form.Label>
                {["checkbox"].map((type) => (
                  <div key={`inline-${type}`} className="mb-3">
                    <Form.Check
                      inline
                      label="Delivery "
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Furniture Installation "
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <Form.Check
                      inline
                      label="Moving an Office "
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <Form.Check
                      inline
                      label="Office Reconfiguration "
                      name="group1"
                      type={type}
                      id={`inline-${type}-3`}
                    />
                    <Form.Check
                      inline
                      label="Cleaning after Installation "
                      type={type}
                      id={`inline-${type}-4`}
                    />
                  </div>
                ))}
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Message
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  as="textarea"
                  rows={4}
                  type="textarea"
                  placeholder="Enter additional information here."
                  name="body"
                  required
                />
              </Form.Group>

              <Button
                className="button-custom submit-button-style"
                variant="primary"
                type="submit"
                title="Enter all fields to send email"
              >
                Send Email
              </Button>
            </Form>
          </Col>
        </Row>
      </div>

      <Footer />
    </>
  );
}

export default ContactForm;
