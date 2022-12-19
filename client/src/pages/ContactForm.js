// import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form, Container, Nav,} from "react-bootstrap";
import logo from "../assets/images/integral-logo.png";

function ContactForm() {


    return (
<>
    <div
          className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
          style={{ margin: "30px 30px 30px 50%", textAlign:'center'}}
        >
          <Row>
            <Col>
              <Form
                className="py-3 overflow-auto custom-about"
                style={{ width: "80vw" }}
              >
                <h2 className="display-6 custom-text heading">Tell Us How We Can Help</h2>

            
                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "50%", marginLeft:'auto', marginRight:'auto'}}>
                  <div className="form-label">
                    <Form.Label style={{fontWeight:'bolder'}}>Company Name</Form.Label>
                    <Form.Label
                    //   className={`validation-color ${
                    //     showNameValidation ? "show" : "hide"
                    //   }`}
                    >
                      * field is required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="text"
                    placeholder="Enter Company Name"
                    name="name"
                    
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "50%" , marginLeft:'auto', marginRight:'auto'}}>
                  <div className="form-label">
                    <Form.Label style={{fontWeight:'bolder'}}>Contact Name</Form.Label>
                    <Form.Label
                    //   className={`validation-color ${
                    //     showNameValidation ? "show" : "hide"
                    //   }`}
                    >
                      * field is required
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
            
            
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "50%" , marginLeft:'auto', marginRight:'auto'}}>
                  <div className="form-label">
                    <Form.Label style={{fontWeight:'bolder'}}>Phone Number</Form.Label>
                    <Form.Label>
                      * field is required
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

                <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "50%", marginLeft:'auto', marginRight:'auto' }}>
                  <div className="form-label">
                    <Form.Label style={{fontWeight:'bolder'}}>Address</Form.Label>
                    <Form.Label>
                      
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    placeholder="Enter Address"
                    name="address"
                  
                  />
                </Form.Group>

                <Row style={{ width: "52%", marginLeft:'auto', marginRight:'auto', paddingBottom:'15px'}}>
                  <Col xs={7}>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    City
                  </Form.Label>
                    <Form.Control className="custom-border" placeholder="City" />
                  </Col>
                  <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    State
                  </Form.Label>
                    <Form.Control className="custom-border"placeholder="State (CO)" />
                  </Col>
                  <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Zipcode
                  </Form.Label>
                    <Form.Control className="custom-border" placeholder="Zip" />
                  </Col>
                </Row>

                
                <div className="d-flex justify-content-between">
                  <Form.Group
                    className=""
                    controlId="formBasicEmail"
                    style={{ width: "50%" , marginLeft:'auto', marginRight:'auto'}}
                  >
                    <div className="form-label">
                      <Form.Label style={{fontWeight:'bolder'}}>Estimated Date for Work to be Scheduled</Form.Label>
                      <Form.Label
                        // className={`validation-color ${
                        //   showStartDateValidation ? "show" : "hide"
                        // }`}
                      >
                        
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="date"
                    
                    />
                  </Form.Group>
                </div>
    
                <Form.Group className="mb-3" controlId="formBasicName">
                 
                    <Form.Label style={{display:'flex', justifyContent:'center', fontWeight:'bolder'}}>Services Needed</Form.Label>
                    {['checkbox'].map((type) => (
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
                            label="Cleaning after Installation "
                            type={type}
                            id={`inline-${type}-3`}
                        />
                        </div>
                    ))}
                   
            
                </Form.Group>
    
                <Form.Group className="mb-3" controlId="formBasicMessage">
                  <div className="form-label">
                    <Form.Label style={{fontWeight:'bolder'}}>Message</Form.Label>
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
          <footer>
        <Container>
        <h3 className="footer-title">
          Serving Greater Denver for Over 20 Years!
        </h3>
          <Row>
            <Col>
              <img src={logo} alt="logo"></img>
            </Col>
            <Col className="footer-phone">
              <p className="">(555)-555-5555</p>
            </Col>
            <Col className="d-flex footer-nav">
              <Nav.Link className="footer-nav" href="#features">
                Shop Furniture
              </Nav.Link>
              <Nav.Link className="footer-nav" href="#pricing">
                About Us{" "}
              </Nav.Link>
              <Nav.Link className="footer-nav" href="#home">
                Make Payment
              </Nav.Link>
            </Col>
          </Row>
          <p className="footer-copy">Copyright &copy;{new Date().getFullYear()} Integral Solutions LLC All Rights Reserved.</p>
        </Container>
      </footer>
        </>
      );
}

export default ContactForm