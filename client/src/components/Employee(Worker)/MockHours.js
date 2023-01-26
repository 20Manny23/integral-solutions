import React from "react";

import { thisWeek } from "../../utils/hoursDates";

import { Row, Container, Form, Button } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function MockHours() {

  const handleInput = async (event) => {
    event.preventDefault();
    console.log("input = ", event.target.value)
  }

  const handleHoursSubmit = async (event) => {
    event.preventDefault();
    console.log("submit = ", event);
  }

  return (
    <Container>
      <Row className="d-flex flex-colunm">
        {thisWeek?.map((thisWeek, index) => (
          <div id="accordion" key={index} style={{ width: "100%" }}>
            <div className="card p-2 mb-1">
                <Form
                  className="d-flex justify-content-between align-content-center align-items-center"
                  onChange={handleInput}
                  onSubmit={handleHoursSubmit}
                >
                  <p>{thisWeek.date}</p>
                  <Form.Group controlId="formBasicEmail">
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        Start Time
                      </Form.Label>
                    </div>
                    <Form.Control
                      // className="custom-border"
                      type="time"
                      name="startTime"
                      // value={startTime}
                      // onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      //required
                    />
                  </Form.Group>
                  <Form.Group controlId="formBasicEmail">
                    <div className="form-label">
                      <Form.Label style={{ fontWeight: "bolder" }}>
                        End Time
                      </Form.Label>
                    </div>
                    <Form.Control
                      className="custom-border"
                      type="time"
                      name="endTime"
                      // value={startTime}
                      // onChange={handleInputChange}
                      // onBlur={handleBlurChange}
                      //required
                    />
                  </Form.Group>
                  <Button
                    className="primary"
                    variant="primary"
                    type="submit"
                    title="Submit to schedule job."
                    // disabled={areAllFieldsFilled}
                  >
                    Submit
                  </Button>
                </Form>
            </div>
          </div>
        ))}
      </Row>
    </Container>
  );
}
export default MockHours;
