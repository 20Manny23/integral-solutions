import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../styles/Forms.css";


function AddEmployee() {
  const demoEmployee = ["Bryan", "Steve", "Rod", "George", "Kirtley"];
  return (
    <>
      <div
        className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
        style={{ margin: "30px 30px 30px 50%", textAlign: "center" }}
      >
        <Row>
          <Col>
            <Form
              className="py-3 overflow-auto custom-about"
              style={{ width: "80vw" }}
            >
              <h2 className="display-6 custom-text heading">Add Employee</h2>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Employee Name
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="text"
                  placeholder="Enter Employee Name"
                  name="name"
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
                  placeholder="ex 555-555-5555"
                  name="telNo"
                  pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
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
                  type="text"
                  placeholder="Enter Email Address"
                  name="name"
                />
              </Form.Group>

              <Form.Group
                className="mb-3 form-length"
                controlId="formBasicEmail"
              
              >
                <div className="form-label">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Password
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="email"
                  placeholder="Setup Employee Password"
                  name="email"
                />
              </Form.Group>
              <Button
                className="button-custom submit-button-style"
                variant="primary"
                type="submit"
                title="Enter all fields to send email"
              >
                Add Employee
              </Button>
            </Form>
          </Col>
        </Row>
        </div>
      <div
        className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
        style={{ margin: "30px 30px 30px 50%", textAlign: "center" }}
      >
        
            <Form
              className="py-3 overflow-auto custom-about"
              style={{ width: "80vw" }}
            > 
               <h2 className="display-6 custom-text heading">Employee Status</h2>

              {demoEmployee.map((emp) => 
              <Form.Check
                type="switch"
                id=""
                inline= "true"
                label={emp}>
                    </Form.Check>
                    )} 
            </Form>
        </div>
    
      
      
    </>
  );
}

export default AddEmployee;
