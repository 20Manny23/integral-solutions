import React, { useState } from "react";

import { QUERY_SCHEDULE } from "../../utils/queries";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALL_CLIENTS, QUERY_ALL_EMPLOYEES } from "../../utils/queries";
import { ADD_SCHEDULE, DELETE_SCHEDULE } from "../../utils/mutations";

import { Row, Col, Button, Form, Collapse, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../styles/Contact.css";
import "../../styles/button-style.css";
import "../../styles/Forms.css";

function WorkOrder() {
  const numberOfEmployees = [
    "Home Office",
    "Less Than 50",
    "50-99",
    "More Than 100",
  ];
  const [open, setOpen] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [suite, setSuite] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState(""); //fix double check - currently no endTime field
  const [squareFeet, setSquareFeet] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [numberOfClientEmployees, setNumberOfClientEmployees] = useState("");
  const [client, setClient] = useState(""); //fix double check - ?
  const [employees, setEmployees] = useState("");
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  //SECTION QUERIES / MUTATIONS
  const {
    loading: clientsLoad,
    data: clients,
    error: clientError,
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS);

  const {
    loading: empLoad,
    data: emp,
    error: empError,
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  // SECTION WORKORDER / SCHEDULE
  // eslint-disable-next-line
  const {
    loading: scheduleLoad,
    data: schedule,
    error: scheduleError,
    refetch: scheduleRefetch,
  } = useQuery(QUERY_SCHEDULE);
  // console.log(schedule);
  // SECTION END WORKORDER / SCHEDULE

  const [addSchedule] = useMutation(ADD_SCHEDULE);

  //SECTION CREATE / REMOVE SELECTED EMPLOYEE OBJECT
  const createSelectedEmployees = (event) => {
    let firstName =
      event.target.options[event.target.selectedIndex].dataset.firstname;
    let lastName =
      event.target.options[event.target.selectedIndex].dataset.lastname;
    let employeeId =
      event.target.options[event.target.selectedIndex].dataset.id;

    for (let i = 0; i < selectedEmployees.length; i++) {
      if (selectedEmployees[i].employeeId === employeeId) {
        return;
      }
    }

    setSelectedEmployees((selectedEmployee) => [
      ...selectedEmployees,
      { firstName, lastName, employeeId },
    ]);
  };

  function removeEmployee(event) {
    let keepEmployees = selectedEmployees.filter(
      (item) => item.employeeId !== event.target.value
    );

    setSelectedEmployees(keepEmployees);
  }

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  function businessNameSelect(e) {
    setBusinessName(e.target.value);
  }

  // SECTION VALIDATION
  const [showBusinessNameValidation, setShowBusinessNameValidation] =
    useState(false);
  const [showStreetAddressValidation, setShowStreetAddressValidation] =
    useState(false);
  const [showSuiteValidation, setShowSuiteValidation] = useState(false); // currently no suite field
  const [showCityValidation, setShowCityValidation] = useState(false);
  const [showStateValidation, setShowStateValidation] = useState(false);
  const [showZipValidation, setShowZipValidation] = useState(false);
  const [showStartDateValidation, setStartDateValidation] = useState(false);
  const [showEndDateValidation, setShowEndDateValidation] = useState(false);
  const [showStartTimeValidation, setShowStartTimeValidation] = useState(false);
  const [showEndTimeValidation, setShowEndTimeValidation] = useState(false);
  const [showSquareFeetValidation, setShowSquareFeetValidation] =
    useState(false);
  const [showJobDetailsValidation, setShowJobDetailsValidation] =
    useState(false);
  const [
    showNumberOfClientEmployeesValidation,
    setShowNumberOfClientEmployeesValidation,
  ] = useState(false);
  const [showClientValidation, setShowClientValidation] = useState(false);
  const [showSelectedEmployeesValidation, setShowSelectedEmployeesValidation] =
    useState(false);

  // Getting the value or name of input triggering change
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ternary statement that will call either setFirstName or setLastName based on what field the user is typing in
    name === "startDate"
      ? setStartDate(value)
      : name === "endDate"
      ? setEndDate(value)
      : name === "startTime"
      ? setStartTime(value)
      : name === "endTime"
      ? setEndTime(value)
      : name === "squareFeet"
      ? setSquareFeet(value)
      : name === "jobDetails"
      ? setJobDetails(value)
      : name === "numberOfClientEmployees"
      ? setNumberOfClientEmployees(value)
      : name === "client"
      ? setClient(value)
      : name === "employees"
      ? setEmployees(value)
      : name === "streetAddress"
      ? setStreetAddress(value)
      : name === "state"
      ? setState(value)
      : name === "city"
      ? setCity(value)
      : setZip(value);

    return name;
  };

  // If user clicks off an input field without entering text, then validation message "is required" displays
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "businessName" && value.trim() === ""
      ? setShowBusinessNameValidation(true)
      : setShowBusinessNameValidation(false);
    name === "streetAddress" && value.trim() === ""
      ? setShowStreetAddressValidation(true)
      : setShowStreetAddressValidation(false);
    name === "suite" && value.trim() === ""
      ? setShowSuiteValidation(true)
      : setShowSuiteValidation(false);
    name === "city" && value.trim() === ""
      ? setShowCityValidation(true)
      : setShowCityValidation(false);
    name === "state" && value.trim() === ""
      ? setShowStateValidation(true)
      : setShowStateValidation(false);
    name === "zip" && value.trim() === ""
      ? setShowZipValidation(true)
      : setShowZipValidation(false);

    name === "startDate" && value.trim() === ""
      ? setStartDateValidation(true)
      : setStartDateValidation(false);
    name === "endDate" && value.trim() === ""
      ? setShowEndDateValidation(true)
      : setShowEndDateValidation(false);
    name === "startTime" && value.trim() === ""
      ? setShowStartTimeValidation(true)
      : setShowStartTimeValidation(false);

    name === "endTime" && value.trim() === ""
      ? setShowEndTimeValidation(true)
      : setShowEndTimeValidation(false);
    name === "squareFeet" && value.trim() === ""
      ? setShowSquareFeetValidation(true)
      : setShowSquareFeetValidation(false);
    name === "jobDetails" && value.trim() === ""
      ? setShowJobDetailsValidation(true)
      : setShowJobDetailsValidation(false);

    name === "numberOfClientEmployees" && value.trim() === ""
      ? setShowNumberOfClientEmployeesValidation(true)
      : setShowNumberOfClientEmployeesValidation(false);
  };

  // const [client, setClient] = useState(""); //fix double check - ?
  // const [employees, setEmployees] = useState("");
  // const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);
  // const [selectedEmployees, setSelectedEmployees] = useState([]);

  // SECTION ADD
  const handleAddScheduleSubmit = async (event) => {
    event.preventDefault();

    try {
      // eslint-disable-next-line
      const { data } = await addSchedule({
        variables: {
          businessName,
          streetAddress,
          // suite,
          city,
          state,
          zip,
          startDate,
          endDate,
          startTime,
          endTime,
          squareFeet,
          jobDetails,
          numberOfClientEmployees,
          client: clients?.clients
            ?.filter((client) => client.businessName === businessName)
            .map((id) => id._id)
            .toString(), // convert client name to client._id
          employees: selectedEmployees.map(({ employeeId }) => employeeId),
        },
      });

      console.log(data);
    } catch (err) {
      console.error(err);
    }

    // refetch a work order might be necessary when it is added
    scheduleRefetch();

    // resetForm();

    // handleUpdateForDisabled(null, businessName, "addClient");
  };

  // Reset the add schedule form after submission
  // const resetForm = () => {
  //   setBusinessName("");
  //   setContact("");
  //   setPhone("");
  //   setEmailClient("");
  //   setStreetAddress("");
  //   setSuite("");
  //   setCity("");
  //   setState("");
  //   setZip("");
  // };

  // If all fields are populated then enable the submit button
  // useEffect(() => {
  //   setAreAllFieldsFilled(
  //     businessName.trim() !== "" &&
  //       contact.trim() !== "" &&
  //       phone.trim() !== "" &&
  //       emailClient.trim() !== "" &&
  //       streetAddress.trim() !== "" &&
  //       suite.trim() !== "" &&
  //       city.trim() !== "" &&
  //       state.trim() !== "" &&
  //       zip.trim() !== ""
  //   );
  //   // console.log(areAllFieldsFilled);
  //   // eslint-disable-next-line
  // }, [
  //   businessName,
  //   contact,
  //   phone,
  //   emailClient,
  //   streetAddress,
  //   suite,
  //   city,
  //   state,
  //   zip,
  // ]);

  // SECTION END ADD CLIENT
  const getElement = (event) => {
    let currentAvailTarget = event.currentTarget.getAttribute("data-target");
    console.log(currentAvailTarget);
    let currentAvailTable = document.getElementById(currentAvailTarget);

    if (currentAvailTable.classList.contains("show")) {
      currentAvailTable.classList.remove("show");
      setOpenDetails(false);
    } else {
      currentAvailTable.classList.add("show");
      setOpenDetails(true);
    }
  };
  // SECTION END ADD

  // SECTION START DELETE
  const [deleteSchedule] = useMutation(DELETE_SCHEDULE);

  // delete incident
  const handleDeleteSchedule = async (event) => {
    let scheduleId = event.currentTarget.getAttribute("data-scheduleid");
    console.log(scheduleId, event, event.currentTarget);
    
    try {
      // eslint-disable-next-line
      await deleteSchedule({
        variables: {
          id: scheduleId,
        },
      });

      // RELOAD SCHEDULE
      scheduleRefetch();

    } catch (err) {
      console.log(err);
    }
  };
  // SECTION END DELETE

  return (
    <>
      <div>
        {/* className="mx-3 pb-2 d-flex flex-column align-self-center align-items-center shadow rounded-lg border border-secondary" */}

        {/* <h2 className="display-6 custom-text heading">New Work Order</h2> */}
        <Collapse in={open}>
          <Form
            className="py-3 overflow-auto custom-about border border-secondary"
            onSubmit={handleAddScheduleSubmit}
            style={{ margin: "20px 0px 20px 0px", textAlign: "center" }}
          >
            <Form.Group className="form-length">
              <Form.Label style={{ fontWeight: "bolder" }}>
                Select Client
              </Form.Label>
              <Form.Label
                className={`validation-color ${
                  showBusinessNameValidation ? "show" : "hide"
                }`}
              >
                *required
              </Form.Label>
              <Form.Control
                as="select"
                className="custom-border"
                type="text"
                placeholder="Select Client"
                value={"form-select"}
                name={"form-select"}
                onChange={businessNameSelect}
              >
                <option>{businessName}</option>
                {clients?.clients?.map((client, index) => (
                  <option key={index} value={client.businessName}>
                    {client.businessName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Address
                </Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showStreetAddressValidation ? "show" : "hide"
                  }`}
                >
                  *required
                </Form.Label>
              </div>
              <Form.Control
                className="custom-border"
                placeholder="Enter Address"
                value={streetAddress}
                name="streetAddress"
                // defaultValue={client?.streetAddress}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                //required
              />
            </Form.Group>
            <Row className="addy">
              <Col xs={7}>
                <Form.Label style={{ fontWeight: "bolder" }}>City</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showCityValidation ? "show" : "hide"
                  }`}
                >
                  *required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  placeholder="City"
                  value={city}
                  name="city"
                  // defaultValue={client?.city}
                  onChange={handleInputChange}
                  onBlur={handleBlurChange}
                  //required
                />
              </Col>
              <Col>
                <Form.Label style={{ fontWeight: "bolder" }}>State</Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showStateValidation ? "show" : "hide"
                  }`}
                >
                  *required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  placeholder="State"
                  value={state}
                  name="state"
                  // defaultValue={client?.state}
                  onChange={handleInputChange}
                  onBlur={handleBlurChange}
                  //required
                />
              </Col>
              <Col>
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Zipcode
                </Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showZipValidation ? "show" : "hide"
                  }`}
                >
                  *required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  placeholder="Zip"
                  value={zip}
                  name="zip"
                  // defaultValue={client?.zip}
                  onChange={handleInputChange}
                  onBlur={handleBlurChange}
                  //required
                />
              </Col>
            </Row>
            <Row className="addy">
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Job Start Date
                    </Form.Label>

                    <Form.Label
                      className={`validation-color ${
                        showStartDateValidation ? "show" : "hide"
                      }`}
                    >
                      *required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="date"
                    name="startDate"
                    // defaultValue={client?.startDate}
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    //required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Job End Date
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showEndDateValidation ? "show" : "hide"
                      }`}
                    >
                      *required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="date"
                    value={endDate}
                    name="endDate"
                    // defaultValue={client?.endDate}
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    //required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="formBasicEmail">
                  <div className="form-label">
                    <Form.Label style={{ fontWeight: "bolder" }}>
                      Start Time
                    </Form.Label>
                    <Form.Label
                      className={`validation-color ${
                        showStartTimeValidation ? "show" : "hide"
                      }`}
                    >
                      *required
                    </Form.Label>
                  </div>
                  <Form.Control
                    className="custom-border"
                    type="time"
                    value={startTime}
                    name="startTime"
                    // defaultValue={client?.startTime}
                    onChange={handleInputChange}
                    onBlur={handleBlurChange}
                    //required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="addy">
              <Col xs={6}>
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Office Sqft
                </Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showSquareFeetValidation ? "show" : "hide"
                  }`}
                >
                  *required
                </Form.Label>
                <Form.Control
                  className="custom-border"
                  placeholder="8000 Sqft"
                  value={squareFeet}
                  name="squareFeet"
                  // defaultValue={client?.squareFeet}
                  onChange={handleInputChange}
                  onBlur={handleBlurChange}
                  //required
                />
              </Col>

              <Col xs={6}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bolder" }}>
                    Number of Employees
                  </Form.Label>
                  <Form.Label
                    className={`validation-color ${
                      showNumberOfClientEmployeesValidation ? "show" : "hide"
                    }`}
                  >
                    *required
                  </Form.Label>
                  <Form.Control
                    as="select"
                    className="custom-border"
                    type="text"
                    value={numberOfClientEmployees}
                    name="numberOfClientEmployees"
                    // onChange={addEmployee}
                    onChange={handleInputChange}
                  >
                    <option>Select</option>
                    {numberOfEmployees.map((emp, index) => (
                      <option
                        key={index}
                        // value={emp}
                      >
                        {emp}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="form-length">
              <Form.Label style={{ fontWeight: "bolder" }}>
                Select Employees for Job
              </Form.Label>
              <Form.Label
                className={`validation-color ${
                  showSelectedEmployeesValidation ? "show" : "hide"
                }`}
              >
                *required
              </Form.Label>
              <Form.Control
                as="select"
                className="custom-border"
                type="text"
                value={"form-select"}
                name={"form-select"}
                // section
                onChange={(event) => {
                  createSelectedEmployees(event);
                }}
              >
                <option>Select</option>
                {emp?.employees?.map((emp, index) => (
                  <option
                    key={index}
                    value={emp.firstName}
                    data-firstname={emp.firstName}
                    data-lastname={emp.lastName}
                    data-id={emp._id}
                  >
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Creates button when adding employee to job  */}
            {selectedEmployees.map((employee) => (
              <Button
                style={{
                  marginRight: "15px",
                  padding: "3px",
                  backgroundColor: "#007bff",
                }}
                onClick={removeEmployee}
                value={employee.employeeId}
                variant="secondary"
                data-id={emp._id}
              >
                {`${employee.firstName} ${employee.lastName}`}
              </Button>
            ))}

            <Form.Group className="mb-3" controlId="formBasicMessage">
              <div className="form-label form-length">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Job Details
                </Form.Label>
                <Form.Label
                  className={`validation-color ${
                    showJobDetailsValidation ? "show" : "hide"
                  }`}
                >
                  *required
                </Form.Label>
              </div>
              <Form.Control
                style={{
                  width: "60%",
                  marginRight: "auto",
                  marginLeft: "auto",
                }}
                className="custom-border"
                as="textarea"
                rows={4}
                type="textarea"
                placeholder="Enter additional information here."
                // name="body"
                value={jobDetails}
                name="jobDetails"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                //required
              />
            </Form.Group>

            <Button
              className="button-custom submit-button-style"
              variant="primary"
              type="submit"
              title="Submit to schedule job."
            >
              Schedule Job
            </Button>
          </Form>
        </Collapse>
      </div>
      <Container
        style={{
          border: "1px solid black",
          borderRadius: "10px",
          padding: "10px",
          marginTop: "20px",
        }}
      >
        <div className="d-flex justify-content-between">
          <h3>Work Orders</h3>
          <button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            style={{ backgroundColor: "white", border: "none", color: "black" }}
          >
            Add Work Order ➕
          </button>
        </div>
      {/* </Container>

      <Container style={{ border: "1px solid black" }}> */}
        {/* <h3>Schedule</h3> */}
        <Row style={{ display: "flex", justifyContent: "center" }}>
          {schedule?.schedules?.map((job, index) => (
            <div id="accordion" key={index} style={{ width: "98%" }}>
              <div className="card p-2 mb-1">
                <div
                  className="rounded directions-collapse"
                  id="headingOne"
                  style={{
                    color: "black",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <h5 className="mb-0 text-left">
                    <button
                      onClick={(event) => getElement(event)}
                      aria-controls={`#collapse-schedule-${index}`}
                      aria-expanded={openDetails}
                      className="btn btn-link pl-1"
                      data-target={`#collapse-schedule-${index}`}
                    >
                      {job?.client.businessName}
                    </button>
                  </h5>

                  <div className="mr-2" style={{ display: "flex" }}>
                    {/* //section */}

                    <FontAwesomeIcon
                      icon="fa-pencil"
                      className="p-2"
                      onClick={() => console.log("pencil")}
                    />
                    <FontAwesomeIcon 
                      icon="fa-trash" 
                      className="p-2"
                      data-scheduleid={job?._id}
                      onClick={(event) => {
                        handleDeleteSchedule(event);
                      }}

                    />

                    {/* section */}
                  </div>
                </div>

                {/* <Collapse in={open}> */}
                <Collapse>
                  <div id={`#collapse-schedule-${index}`}>
                    <div>Contact Name: {job?.client.contact}</div>
                    <div>Phone: {job?.client.phone}</div>
                    <div>Email: {job?.client.email}</div>
                    <div>Address: {job?.client.streetAddress}</div>
                    <div>Suite: {job?.client.suite}</div>
                    <div>City: {job?.client.city}</div>
                    <div>State: {job?.client.state}</div>
                    <div>Zip: {job?.client.zip}</div>
                    <div>Start Date: {job?.startDate}</div>
                    <div>Start Time: {job?.startTime}</div>
                    <div>End Date: {job?.endDate}</div>
                    <div>Job Details: {job?.jobDetails}</div>
                    <div>Number of Clients: {job?.numberOfClientEmployees}</div>
                    {job?.employees.map((employee, index) => (
                      <div key={index}>
                        <div>First Name: {employee?.firstName}</div>
                        <div>Last Name: {employee?.lastName}</div>
                        <div>Email: {employee?.email}</div>
                        <div>Phone: {employee?.phone}</div>
                      </div>
                    ))}
                  </div>
                </Collapse>
              </div>
            </div>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default WorkOrder;
