import React, { useState, useEffect } from "react";

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

import { format_date_string } from "../../../utils/dateFormat";
import { STATE_DROPDOWN } from "../../../utils/stateDropdown";
import MaskedInput from "react-text-mask";
import { NUMBER_OF_EMPLOYEES } from "../../../utils/numberOfEmployees";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";
import "../../../styles/Forms.css";

import SuccessAlert from "../../Alert";

function ScheduleAdd() {
  const [showSuccess, setShowSuccess] = useState(false);

  // GET FORM INPUT
  const [businessName, setBusinessName] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [numberOfClientEmployees, setNumberOfClientEmployees] = useState("");
  const [client, setClient] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [selectedBusinessName, setSelectedBusinessName] = useState(""); //used to main businessName state, while businessName is adjusted to match the select box
  const [mostRecentScheduleAddId, setMostRecentScheduleAddId] = useState();
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);

  // VALIDATION
  const [showBusinessNameValidation, setShowBusinessNameValidation] =
    useState(false);
  const [showStreetAddressValidation, setShowStreetAddressValidation] =
    useState(false);
  const [showCityValidation, setShowCityValidation] = useState(false);
  const [showStateValidation, setShowStateValidation] = useState(false);
  const [showZipValidation, setShowZipValidation] = useState(false);
  const [showStartDateValidation, setStartDateValidation] = useState(false);
  const [showEndDateValidation, setShowEndDateValidation] = useState(false);
  const [showStartTimeValidation, setShowStartTimeValidation] = useState(false);
  const [showSquareFeetValidation, setShowSquareFeetValidation] =
    useState(false);
  const [showJobDetailsValidation, setShowJobDetailsValidation] =
    useState(false);
  const [
    showNumberOfClientEmployeesValidation,
    setShowNumberOfClientEmployeesValidation,
  ] = useState(false);

  //SECTION QUERIES / MUTATIONS
  // get schedule / jobs query
  const {
    // eslint-disable-next-line
    loading: scheduleLoad,
    // eslint-disable-next-line
    data: schedule,
    // eslint-disable-next-line
    error: scheduleError,
    // eslint-disable-next-line
    refetch: scheduleRefetch,
  } = useQuery(QUERY_SCHEDULE, {
    variables: {
      isDisplayable: true, //only retrieve schedules with a displayable status
    },
  });

  // get clients query
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    // eslint-disable-next-line
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS, {
    variables: {
      isDisplayable: true, //only retrieve clients with a displayable status = true
    },
  });

  // get employees query
  const {
    // eslint-disable-next-line
    loading: empLoad,
    data: emp,
    // eslint-disable-next-line
    error: empError,
    // eslint-disable-next-line
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES, {
    variables: {
      isDisplayable: true, //only retrieve employees with a displayable status = true
    },
  });

  // add schedule mutation
  const [addSchedule] = useMutation(ADD_SCHEDULE, {
    onCompleted: (data) => {
      setMostRecentScheduleAddId(data?.addSchedule?._id);
    },
    refetchQueries: [
      { query: QUERY_SCHEDULE }, // DocumentNode object parsed with gql
      "getSchedule", // Query name
    ],
  });

  // add new schedule / job to the appropriate client
  const [updateClientSchedule] = useMutation(UPDATE_CLIENT_SCHEDULE);

  // add new schedule / job to the appropriate employee(s)
  const [updateEmployeeSchedule] = useMutation(UPDATE_EMPLOYEE_SCHEDULE);

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  function businessNameSelect(event) {
    setBusinessName(event.target.value); //used to manage the state of the business name / client drop down box
    setSelectedBusinessName(event.target.value); //used to add the selected business to the employee and clietn model
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
      : name === "streetAddress"
      ? setStreetAddress(value)
      : name === "state"
      ? setState(value)
      : name === "city"
      ? setCity(value)
      : setZip(value);

    return name;
  };

  //SECTION ADD NEW JOB
  // add new jobs
  const handleAddScheduleSubmit = async (event) => {
    event.preventDefault();

    setBusinessName(businessName);

    let reformattedStartDate = format_date_string(startDate, startTime);
    let reformattedEndDate = format_date_string(endDate, startTime); //used start time since endTime is no on the form

    try {
      // eslint-disable-next-line
      const { data } = await addSchedule({
        variables: {
          businessName,
          streetAddress,
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
            ?.filter((client) => client.businessName === selectedBusinessName)
            .map((id) => id._id)
            .toString(), // convert selecteded busines name to client._id that is added to the schedule/job object
          employees: selectedEmployees.map(({ employeeId }) => employeeId),
        },
      });

    } catch (err) {
      console.error(err);
    }

    !areAllFieldsFilled ? setShowSuccess(true) : setShowSuccess(false);
    // resetForm();

    //reset form happens after useEffect for the employee array so as not to clear out the selectedEmployee state prior to updating employee model
  };

  //section update client array of jobs/schedule
  useEffect(() => {

    try {
      if (mostRecentScheduleAddId && selectedBusinessName) {
        
        updateClientSchedule({
          variables: {
            id: clients?.clients
              ?.filter(
                (client) => client?.businessName === selectedBusinessName
              )
              .map((id) => id?._id)
              .toString(), // convert client name to client._id
            schedule: mostRecentScheduleAddId,
          },
        });
      }
    } catch (err) {
      console.error(err);
    }
    // eslint-disable-next-line
  }, [mostRecentScheduleAddId, selectedBusinessName]);

  //section update employee array of jobs/schedule
  useEffect(() => {
    try {
      if (mostRecentScheduleAddId) {
        //for each selected employee
        for (let i = 0; i < selectedEmployees.length; i++) {
          // eslint-disable-next-line
          updateEmployeeSchedule({
            variables: {
              id: selectedEmployees[i].employeeId,
              schedule: mostRecentScheduleAddId,
            },
          });
        }
      }
    } catch (err) {
      console.error(err);
    }

    resetForm();
    // eslint-disable-next-line
  }, [mostRecentScheduleAddId]);

  // SECTION UTILITY FUNCTIONS

  //SECTION ADD OR REMOVE FROM SELECTED EMPLOYEE FROM PAGE
  //create array of employees assigned/selected for the added job
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

  //remove assigned selected employees if clicked to delete
  function removeEmployee(event) {
    let keepEmployees = selectedEmployees.filter(
      (item) => item.employeeId !== event.target.value
    );

    setSelectedEmployees(keepEmployees);
  }

  // If user clicks off an input field without entering text, then validation message "is required" displays
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

    name === "businessName" && value.trim() === ""
      ? setShowBusinessNameValidation(true)
      : setShowBusinessNameValidation(false);
    name === "streetAddress" && value.trim() === ""
      ? setShowStreetAddressValidation(true)
      : setShowStreetAddressValidation(false);
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

  // Reset the add schedule form after submission
  const resetForm = () => {
    setBusinessName("");
    setStreetAddress("");
    setCity("");
    setState("");
    setZip("");
    setStartDate("");
    setEndDate("");
    setStartTime("");
    setEndTime("");
    setSquareFeet("");
    setJobDetails("");
    setNumberOfClientEmployees("");
    setClient("");
    setAreAllFieldsFilled(false);
    setSelectedEmployees([]); //fix
  };

  // If all fields are populated then enable the submit button
  useEffect(() => {
    setAreAllFieldsFilled(
      businessName.trim() === "Select" ||
        numberOfClientEmployees.trim() === "Select" ||
        state.trim() === "Select" ||
        streetAddress.trim() === "" ||
        city.trim() === "" ||
        zip.trim() === "" ||
        startDate.trim() === "" ||
        endDate.trim() === "" ||
        startTime.trim() === "" ||
        squareFeet.trim() === "" ||
        jobDetails.trim() === ""
    );

    // eslint-disable-next-line
  }, [
    businessName,
    state,
    numberOfClientEmployees,
    streetAddress,
    city,
    zip,
    startDate,
    endDate,
    startTime,
    squareFeet,
    jobDetails,
  ]);

  // sort conditional
  let arrayForSort = [];
  if (clients) {
    arrayForSort = [...clients.clients];
    arrayForSort.sort(function (a, b) {
      if (a.businessName.toLowerCase() < b.businessName.toLowerCase())
        return -1;
      if (a.businessName.toLowerCase() > b.businessName.toLowerCase()) return 1;
      return 0;
    });
  }

  // sort conditional
  let arrayForSortEmp = [];
  if (emp) {
    arrayForSortEmp = [...emp.employees];
    arrayForSortEmp.sort(function (a, b) {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  }

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
            <option>{businessName ? businessName : "Select"}</option>
            {arrayForSort.map((client, index) => (
              <option
                key={index}
                value={client.businessName}
                data-id={client._id}
              >
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
            name="streetAddress"
            value={streetAddress}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
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
              name="city"
              value={city}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
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
              name="state"
              value={state}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
            >
              <option>Select</option>
              {STATE_DROPDOWN.map((st, index) => (
                <option key={index}>{st}</option>
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

            <MaskedInput
              className="form-control custom-border"
              mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
              placeholder="Zip"
              guide={true}
              name="zip"
              value={zip}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              required
            />
          </Col>
        </Row>
        <Row className="addy">
          <Col>
            <Form.Group controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  Start Date
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
                min={new Date().toISOString().split("T")[0]}
                name="startDate"
                value={startDate}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formBasicEmail">
              <div className="form-label">
                <Form.Label style={{ fontWeight: "bolder" }}>
                  End Date
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
                min={
                  startDate ? startDate : new Date().toISOString().split("T")[0]
                }
                name="endDate"
                value={endDate}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
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
                name="startTime"
                value={startTime}
                onChange={handleInputChange}
                onBlur={handleBlurChange}
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
              name="squareFeet"
              value={squareFeet}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
            />
          </Col>

          <Col xs={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bolder" }}>
                Staff Size
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
                name="numberOfClientEmployees"
                value={numberOfClientEmployees}
                onChange={handleInputChange}
              >
                <option>Select</option>
                {NUMBER_OF_EMPLOYEES.map((emp, index) => (
                  <option key={index}>{emp}</option>
                ))}
              </Form.Control>
            </Form.Group>
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
            value={"form-select"}
            name={"form-select"}
            onChange={(event) => {
              createSelectedEmployees(event);
            }}
          >
            <option>Select</option>
            {arrayForSortEmp.map((emp, index) => (
              <option
                key={index}
                value={emp.firstName}
                data-firstname={emp.firstName}
                data-lastname={emp.lastName}
                data-id={emp._id}
              >
                {emp.lastName}, {emp.firstName}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group className="form-length">
          {/* Creates button when adding employee to job  */}
          {selectedEmployees.map((employee, index) => (
            <Button
              key={index}
              style={{
                marginRight: "15px",
                padding: "3px",
                backgroundColor: "#007bff",
              }}
              className="m-1 p-2"
              onClick={removeEmployee}
              value={employee.employeeId}
              variant="secondary"
              data-id={emp._id}
            >
              {`${employee.firstName} ${employee.lastName}`}
            </Button>
          ))}
        </Form.Group>
        
        <Form.Group className="form-length mb-3" controlId="formBasicMessage">
          <div className="form-label">
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
            className="custom-border"
            as="textarea"
            rows={4}
            type="textarea"
            placeholder="Enter additional information here."
            value={jobDetails}
            name="jobDetails"
            onChange={handleInputChange}
            onBlur={handleBlurChange}
          />
        </Form.Group>

        <SuccessAlert
          message="New job has been created!"
          show={showSuccess}
        ></SuccessAlert>

        <Button
          className="button-custom submit-button-style"
          style={{ display: "grid", margin: "auto" }}
          variant="primary"
          type="submit"
          title="Submit to schedule job."
          disabled={areAllFieldsFilled}
        >
          Schedule Job
        </Button>
      </Form>
    </Container>
  );
}
export default ScheduleAdd;
