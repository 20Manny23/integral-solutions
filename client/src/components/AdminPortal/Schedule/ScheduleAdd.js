import React, { useState } from "react";

import { useQuery, useMutation } from "@apollo/client";
import {
  QUERY_SCHEDULE,
  QUERY_ALL_CLIENTS,
  QUERY_ALL_EMPLOYEES,
} from "../../../utils/queries";
import {
  ADD_SCHEDULE,
  UPDATE_CLIENT_SCHEDULE,
  UPDATE_EMPLOYEE_SCHEDULE,
} from "../../../utils/mutations";

import format_date_string from "../../../utils/dateFormat";
import { STATE_DROPDOWN } from "../../../utils/stateDropdown";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";
import "../../../styles/Forms.css";

function ScheduleAdd() {
  // GET FORM INPUT
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

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  function businessNameSelect(e) {
    setBusinessName(e.target.value);
  }

  const numberOfEmployees = [
    "Home Office",
    "Less Than 50",
    "50-99",
    "More Than 100",
  ];

  // VALIDATION
  const [showBusinessNameValidation, setShowBusinessNameValidation] =
    useState(false);
  const [showStreetAddressValidation, setShowStreetAddressValidation] =
    useState(false);
  const [showSuiteValidation, setShowSuiteValidation] = useState(false); // currently no suite field on input form
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

  //SECTION QUERIES / MUTATIONS
  // get schedule
  const {
    // eslint-disable-next-line
    loading: scheduleLoad,
    // eslint-disable-next-line
    data: schedule,
    // eslint-disable-next-line
    error: scheduleError,
    refetch: scheduleRefetch,
  } = useQuery(QUERY_SCHEDULE);
  // console.log(schedule);

  // get clients
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    // eslint-disable-next-line
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS);

  // get employees
  const {
    // eslint-disable-next-line
    loading: empLoad,
    data: emp,
    // eslint-disable-next-line
    error: empError,
    // eslint-disable-next-line
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  // add schedule
  const [addSchedule] = useMutation(ADD_SCHEDULE);

  // add new schedule / job to the appropriate client
  const [updateClientSchedule] = useMutation(UPDATE_CLIENT_SCHEDULE);

  // add new schedule / job to the appropriate employee(s)
  const [updateEmployeeSchedule] = useMutation(UPDATE_EMPLOYEE_SCHEDULE);

  //SECTION ADD INTO OR REMOVE FROM SELECTED EMPLOYEE FROM PAGE
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

  //SECTION HANDLE INPUT
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

  //SECTION HANDLE INPUT
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

  // SECTION ADD
  const handleAddScheduleSubmit = async (event) => {
    event.preventDefault();

    //fix
    let reformattedStartDate = format_date_string(startDate, startTime);
    let reformattedEndDate = format_date_string(startDate, startTime);

    console.log(reformattedEndDate, reformattedStartDate);

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
          startDate: reformattedStartDate,
          endDate: reformattedEndDate,
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

      // console.log('hello', data)
    } catch (err) {
      console.error(err);
    }

    // refetch the list of schedules/jobs to get the most recent id added
    let getScheduleIds = await scheduleRefetch();
    let scheduleIdsLength = getScheduleIds.data.schedules.length - 1;
    let mostRecentScheduleId =
      getScheduleIds.data.schedules[scheduleIdsLength]._id;

    updateClientJobs(mostRecentScheduleId);
    updateEmployeeJobs(mostRecentScheduleId);

    // resetForm();
  };

  // update client schedule array
  const updateClientJobs = async (mostRecentScheduleId) => {
    try {
      // eslint-disable-next-line
      const { data } = await updateClientSchedule({
        variables: {
          id: clients?.clients
            ?.filter((client) => client.businessName === businessName)
            .map((id) => id._id)
            .toString(), // convert client name to client._id
          schedule: mostRecentScheduleId,
        },
      });
      console.log("what data = ", data);
    } catch (err) {
      console.error(err);
    }
  };

  // update employee schedule array
  const updateEmployeeJobs = async (mostRecentScheduleId) => {
    console.log("employees array = ", selectedEmployees);
    try {
      for (let i = 0; i < selectedEmployees.length; i++) {
        // eslint-disable-next-line
        const { data } = await updateEmployeeSchedule({
          variables: {
            id: selectedEmployees[i].employeeId,
            schedule: mostRecentScheduleId,
          },
        });
        console.log(data);
      }
    } catch (err) {
      console.error(err);
    }
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

  return (
    <Container>
      <Form
        className="py-3 overflow-auto custom-about border border-secondary"
        onSubmit={handleAddScheduleSubmit}
        style={{ alignContent: "left" }}
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
            <option>Select</option>
            {clients?.clients?.map((client, index) => (
              <option key={index} value={client.businessName}>
                {client.businessName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group className="mb-3 form-length" controlId="formBasicEmail">
          <div className="form-label">
            <Form.Label style={{ fontWeight: "bolder" }}>Address</Form.Label>
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
            defaultValue={client?.streetAddress}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            //required
          />
        </Form.Group>
        <Row className="addy">
          <Col xs={12}>
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
              defaultValue={client?.city}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //required
            />
          </Col>
          <Col xs={5}>
            <Form.Label style={{ fontWeight: "bolder" }}>State</Form.Label>
            <Form.Label
              className={`validation-color ${
                showStateValidation ? "show" : "hide"
              }`}
            >
              *required
            </Form.Label>
            <Form.Control
              as={"select"}
              className="custom-border"
              placeholder="State"
              value={state}
              name="state"
              defaultValue={client?.state}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //required
            >
              <option>Select</option>
              {STATE_DROPDOWN.map((st) => (
                <option>{st}</option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.Label style={{ fontWeight: "bolder" }}>Zipcode</Form.Label>
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
              defaultValue={client?.zip}
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
                defaultValue={client?.startDate}
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
                defaultValue={client?.endDate}
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
                defaultValue={client?.startTime}
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
              defaultValue={client?.squareFeet}
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
            value={jobDetails}
            name="jobDetails"
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            //required
          />
        </Form.Group>

        <Button
          className="button-custom submit-button-style"
          style={{ display: "grid", margin: "auto" }}
          variant="primary"
          type="submit"
          title="Submit to schedule job."
        >
          Schedule Job
        </Button>
      </Form>
    </Container>
  );
}
export default ScheduleAdd;
