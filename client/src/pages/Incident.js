import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_INCIDENT } from "../utils/mutations";
import { Row, Col, Button, Form } from "react-bootstrap/";
import "../styles/Contact.css";
import "../styles/button-style.css";
import "../styles/heading-style.css";

function Incident() {
  const [name, setName] = useState("");
  const [locationName, setlocationName] = useState("");
  const [subject, setSubject] = useState("");
  const [telNo, setTelNo] = useState("");
  const [body, setBody] = useState("");
  const [isUrgent, setIsUrgent] = useState("Not Urgent");
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);

  const [showNameValidation, setShowNameValidation] = useState(false);
  const [showlocationNameValidation, setShowlocationNameValidation] =
    useState(false);
  const [showTelNoValidation, setShowTelNoValidation] = useState(false);
  const [showSubjectValidation, setShowSubjectValidation] = useState(false);
  const [showBodyValidation, setShowBodyValidation] = useState(false);

  // Getting the value or name of input triggering change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    name === "name"
      ? setName(value)
      : name === "telNo"
      ? setTelNo(value)
      : name === "subject"
      ? setSubject(value)
      : name === "urgent"
      ? setIsUrgent(value)
      : name === "urgent"
      ? setSubject(value)
      : name === "locationName"
      ? setlocationName(value)
      : setBody(value);

    return name;
  };

  // If all fields are populated then enable the submit button
  useEffect(() => {
    setAreAllFieldsFilled(
      name.trim() !== "" &&
        locationName.trim() !== "" &&
        telNo.trim() !== "" &&
        subject.trim() !== "" &&
        isUrgent.trim() !== "" &&
        body.trim() !== ""
    );
  }, [name, locationName, telNo, subject, isUrgent, body]);

  const [addIncident] = useMutation(ADD_INCIDENT);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    launchEmailPlatform();
    resetForm();
    try {
      // eslint-disable-next-line
      const { data } = addIncident({
        variables: {
          employeeName: name,
          locationName,
          employeePhone: telNo,
          subject,
          urgent: isUrgent,
          incidentDetails: body,
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  // Open preferred email provide and proppulate
  const launchEmailPlatform = () => {
    window.open(
      `mailto:colinmichael89@gmail.com?name=${name}&telNo=${telNo}&subject=${isUrgent}: ${subject}&body=Status: ${isUrgent}%0D%0A%0D%0AEmployee Name: ${name}%0D%0A%0D%0AEmployee Phone: ${telNo}%0D%0A%0D%0ALocation Name: ${locationName}%0D%0A%0D%0AIncident Information: ${body}`
    );
    return false;
  };

  // Reset form fields with blank entries
  const resetForm = () => {
    setName("");
    setlocationName("");
    setSubject("");
    setTelNo("");
    setBody("");
  };

  // If user clicks off an input field without entering text, then validation message "is required" displays
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "name" && value.trim() === ""
      ? setShowNameValidation(true)
      : setShowNameValidation(false);
    name === "locationName" && value.trim() === ""
      ? setShowlocationNameValidation(true)
      : setShowlocationNameValidation(false);
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
            <h2 className="display-5 custom-text heading">Incident Form</h2>

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

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label>Location Name</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showlocationNameValidation ? "show" : "hide"
                  }`}
                >
                  * field is required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                type="text"
                placeholder="Enter Location Name"
                value={locationName}
                name="locationName"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

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

            <Form.Group className="mb-3" controlId="formBasicName">
              <div className="form-label">
                <Form.Label>Urgent</Form.Label>
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
                placeholder="Urgent / Not Urgent"
                value={isUrgent}
                name="urgent"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <div className="form-label">
                <Form.Label>Incident Details</Form.Label>
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
                placeholder="Enter incident details such as date, time, importance, client interaction, and details"
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

export default Incident;
