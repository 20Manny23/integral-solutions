import React, { useEffect, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../styles/Contact.css";
import "../styles/button-style.css";
import "../styles/heading-style.css";

function Timeoff() {
  var dt = new Date();
  var mm = dt.getMonth() + 1;
  var dd = dt.getDate();
  var yyyy = dt.getFullYear();
  let yyyyMax = dt.getFullYear() + 1;
  let calendarMinDate = `${yyyy}-${mm}-${dd}`;
  let calendarMaxDate = `${yyyyMax}-12-31`;

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [subject, setSubject] = useState("");
  const [telNo, setTelNo] = useState("");
  const [body, setBody] = useState("");

  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);

  const [showNameValidation, setShowNameValidation] = useState(false);
  const [showTelNoValidation, setShowTelNoValidation] = useState(false);
  const [showSubjectValidation, setShowSubjectValidation] = useState(false);
  const [showBodyValidation, setShowBodyValidation] = useState(false);
  const [showStartDateValidation, setShowStartDateValidation] = useState(false);
  const [showEndDateValidation, setShowEndDateValidation] = useState(false);

  // Getting the value or name of input triggering change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ternary statement that will call either the value of the input upon change
    name === "name"
      ? setName(value)
      : name === "telNo"
      ? setTelNo(value)
      : name === "startDate"
      ? setStartDate(value)
      : name === "endDate"
      ? setEndDate(value)
      : name === "subject"
      ? setSubject(value)
      : name === "urgent"
      ? setSubject(value)
      : setBody(value);
    return name;
  };

  // If all fields are populated then enable the submit button
  useEffect(() => {
    setAreAllFieldsFilled(
      name.trim() !== "" &&
        startDate.trim() !== "" &&
        endDate.trim() !== "" &&
        telNo.trim() !== "" &&
        subject.trim() !== "" &&
        body.trim() !== ""
    );
  }, [name, startDate, endDate, telNo, subject, body]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    launchEmailPlatform();
    resetForm();
  };

  // Open preferred email provide and preppulate
  const launchEmailPlatform = () => {
    console.log(startDate, endDate);
    window.open(
      `mailto:colinmichael89@gmail.com?name=${name}&telNo=${telNo}&subject=TimeOff Request: ${subject}&body=Employee Name: ${name}%0D%0A%0D%0AEmployee Phone: ${telNo}%0D%0A%0D%0AStartDate: ${startDate}%0D%0A%0D%0AEnd Date: ${endDate}%0D%0A%0D%0AMessage: ${body}`
    );
    return false;
  };

  // Reset form fields with blank entries
  const resetForm = () => {
    setName("");
    setStartDate("");
    setEndDate("");
    setTelNo("");
    setSubject("");
    setBody("");
  };

  // If user clicks off an input field without entering text, then validation message "is required" displays
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "name" && value.trim() === ""
      ? setShowNameValidation(true)
      : setShowNameValidation(false);
    name === "startDate" && value.trim() === ""
      ? setShowStartDateValidation(true)
      : setShowStartDateValidation(false);
    name === "endDate" && value.trim() === ""
      ? setShowEndDateValidation(true)
      : setShowEndDateValidation(false);
    name === "telNo" && value.trim() === ""
      ? setShowTelNoValidation(true)
      : setShowTelNoValidation(false);
    name === "subject" && value.trim() === ""
      ? setShowSubjectValidation(true)
      : setShowSubjectValidation(false);
    name === "body" && value.trim() === ""
      ? setShowBodyValidation(true)
      : setShowBodyValidation(false);
  };

  return (
    <div
      className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary"
      style={{ marginTop: "85px" }}
    >
      <Row>
        <Col>
          <Form
            className="py-3 overflow-auto custom-about"
            onSubmit={handleFormSubmit}
            style={{ width: "80vw" }}
          >
            <h2 className="display-6 custom-text heading">Time Off Request</h2>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label>Employee Name</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showNameValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="text"
                placeholder="Enter Employee Name"
                value={name}
                name="name"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <div className="d-flex justify-content-between">
              <Form.Group
                className=""
                controlId="formBasicEmail"
                style={{ width: "50%" }}
              >
                <div className="form-label">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Label
                    className={`validation-color ${
                      showStartDateValidation ? "show" : "hide"
                    }`}
                  >
                    * field is required
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="date"
                  value={startDate}
                  name="startDate"
                  min={calendarMinDate}
                  max={calendarMaxDate}
                  onChange={handleInputChange}
                  onBlur={handleBlurChange}
                  required
                  style={{ width: "98%" }}
                />
              </Form.Group>

              <Form.Group
                className=""
                controlId="formBasicEmail"
                style={{ width: "50%" }}
              >
                <div className="form-label">
                  <Form.Label>End Date</Form.Label>
                  <Form.Label
                    className={`validation-color ${
                      showEndDateValidation ? "show" : "hide"
                    }`}
                  >
                    * field is required
                  </Form.Label>
                </div>
                <Form.Control
                  className="custom-border"
                  type="date"
                  value={endDate}
                  name="endDate"
                  min={startDate}
                  max={calendarMaxDate}
                  onChange={handleInputChange}
                  onBlur={handleBlurChange}
                  required
                  style={{ width: "100%" }}
                />
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label>Employee Phone</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showTelNoValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="tel"
                placeholder="Enter phone 123-456-7890"
                value={telNo}
                name="telNo"
                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicName">
              <div className="form-label">
                <Form.Label>Subject</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showSubjectValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="text"
                placeholder="Enter subject"
                value={subject}
                name="subject"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <div className="form-label">
                <Form.Label>Message</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showBodyValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                as="textarea"
                rows={4}
                type="textarea"
                placeholder="Enter additional information such as urgency or coverage."
                value={body}
                name="body"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Button
              className="button-custom submit-button-style"
              variant="primary"
              type="submit"
              disabled={!areAllFieldsFilled}
              title="Enter all fields to send email"
            >
              Send Email
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
}

export default Timeoff;
