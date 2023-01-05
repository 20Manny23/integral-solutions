import { Data } from "@react-google-maps/api";
import React, { useState } from "react";
import { Row, Col, Button, Form, } from "react-bootstrap";
import "../styles/Forms.css";




function WorkOrder() {

// const [employeeChoice, setEmployeeChoice] = useState("");
let employeeChoice = '';
const demoEmployee = ["Steve", "Rod", "Bryan", "George", "Kirtley"]
const [demoChoice, setDemoChoice] = useState([]);

function addEmployee(event) {
    
   setDemoChoice( demoChoice =>[...demoChoice, event.target.value])

}
function removeEmployee(event) {
    const name = event.target.value
    for (let i = 0; i < demoChoice.length; i++) {
        if (demoChoice[i] === name) {
            demoChoice.splice(i, 1)
        }
    
   }
    setDemoChoice(demoChoice)
    
}

  return (
    <>
    
      <div
        className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
        style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
      >
        <Row>
          <Col>
            <Form
              className="py-3 overflow-auto custom-about"
              style={{ width: "80vw" }}
            >
              <h2 className="display-6 custom-text heading">Work Order</h2>

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
                  name="name"
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
                  placeholder="Client Phone"
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
                    Email
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="email"
                  placeholder="Client Email"
                  name="email"
                  
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

               <Row className="addy"
               
              > 
                <Col xs={7}>
                  <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                  <Form.Control className="custom-border" placeholder="City" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    State
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="State" />
                </Col>
                <Col>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Zipcode
                  </Form.Label>
                  <Form.Control className="custom-border" placeholder="Zip" />
                </Col>
              </Row>

                <Row className="addy">
                    <Col>
                <Form.Group
                //   className="form-length"
                  controlId="formBasicEmail">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Job Date
                    </Form.Label>
                  </div>
                  <Form.Control className="custom-border" type="date" />
                </Form.Group>
                </Col>

                <Col>
                <Form.Group
                //   className="form-length"
                  controlId="formBasicEmail">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Start Time 
                    </Form.Label>
                  </div>
                  <Form.Control className="custom-border" type="time" />
                </Form.Group> 
                </Col>
            </Row>
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
                    placeholder="State (CO)"
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
                   Employees
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

            <Form.Group className="form-length">
            <Form.Label style={{ fontWeight: "bolder" }}>
                      Select Employees for Job 
                    </Form.Label>
              <Form.Control 
              as="select" 
              className="custom-border"
              type="text"
              value={employeeChoice} 
              name="employeeChoice"
              onChange={addEmployee}
              >
                <option>Select</option>
                {demoEmployee.map((emp) =>
                <option value = {emp}>{emp}</option>,
                )}
               
                </Form.Control>
            </Form.Group>

          {/* Creates button when adding employee to job  */}
            {demoChoice.map((emp) =>
            <Button 
            style={{marginRight:'15px'}} 
            onClick= {removeEmployee}
            value = {emp}
            variant="secondary">{emp}  </Button>)}

            

              <Form.Group className="mb-3" controlId="formBasicMessage">
                <div className="form-label form-length">
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Message
                  </Form.Label>
                </div>
                <Form.Control
                style={{width:'60%', marginRight:'auto', marginLeft:'auto'}}
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
                Schedule Job
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default WorkOrder;
