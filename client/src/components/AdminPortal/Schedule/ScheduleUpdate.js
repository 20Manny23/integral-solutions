import React, { useState, useEffect } from "react";
import Auth from "../../../utils/auth";

import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import {
  QUERY_SCHEDULE,
  QUERY_SINGLE_SCHEDULE,
  QUERY_ALL_CLIENTS,
  QUERY_ALL_EMPLOYEES,
} from "../../../utils/queries";
import {
  UPDATE_EMPLOYEE_SCHEDULE,
  REMOVE_EMPLOYEE_SCHEDULE,
  UPDATE_SCHEDULE,
} from "../../../utils/mutations";

import {
  format_date_string,
  format_date_MMDDYYYY,
  format_time_HHmmss,
  format_date_YYYYDDMM,
  format_date_ISOStringNoTime,
} from "../../../utils/dateFormat";
import { STATE_DROPDOWN } from "../../../utils/stateDropdown";
import MaskedInput from "react-text-mask";
import { NUMBER_OF_EMPLOYEES } from "../../../utils/numberOfEmployees";
import SuccessAlert from "../../Alert";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";
import "../../../styles/Forms.css";

function ScheduleUpdate() {
  const [showSuccess, setShowSuccess] = useState(false);
  //form = input fields
  // const [businessName, setBusinessName] = useState("");
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
  // const [setClient] = useState("");
  // const [setEmployees] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [oneFieldHasInput, setOneFieldHasInput] = useState(true);

  //set selected schedule/jobs
  const [currentScheduleId, setCurrentScheduleId] = useState("");
  const [prevScheduleData, setPrevScheduleData] = useState({});

  //set the state of the value in the input fields (either the input by the user or populate based on selected client)
  const [selectStreetAddress, setSelectStreetAddress] = useState(false);
  const [selectCity, setSelectCity] = useState(false);
  const [selectState, setSelectState] = useState(false);
  const [selectZip, setSelectZip] = useState(false);
  const [selectStartDate, setSelectStartDate] = useState(false);
  const [selectEndDate, setSelectEndDate] = useState(false);
  const [selectStartTime, setSelectStartTime] = useState(false);
  const [selectSquareFeet, setSelectSquareFeet] = useState(false);
  const [selectNumberOfClientEmployees, setSelectNumberOfClientEmployees] =
    useState(false);
  // client
  //  employees selected for job?
  const [selectJobDetails, setSelectJobDetails] = useState(false);

  //enable/disable form
  const [formIsDisabled, setFormIsDisabled] = useState(true);

  //validation

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

  // const [showSelectedEmployeesValidation, setShowSelectedEmployeesValidation] =
  useState(false);

  //SECTION GET ALL JOBS
  const {
    // eslint-disable-next-line
    loading: scheduleLoad,
    // eslint-disable-next-line
    data: schedule,
    // eslint-disable-next-line
    error: scheduleError,
    // eslint-disable-next-line
    refetch: scheduleRefetch,
    // } = useQuery(QUERY_SCHEDULE);
  } = useQuery(QUERY_SCHEDULE, {
    variables: {
      isDisplayable: true, //only retrieve schedule with a displayable status
    },
  });

  //SECTION get a single job
  // eslint-disable-next-line
  const [getASingleSchedule, { loading: lazyLoading, data: singleSchedule }] =
    useLazyQuery(QUERY_SINGLE_SCHEDULE, {
      variables: { scheduleId: currentScheduleId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleSchedule) => {},
    });

  //SECTION get clients for dropdown
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    // eslint-disable-next-line
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

  //SECTION get employees for dropdown & to add/remove schedule/jobs from employee schedule array
  const {
    // eslint-disable-next-line
    loading: empLoad,
    data: emp,
    // eslint-disable-next-line
    error: empError,
    // eslint-disable-next-line
    refetch: empRefectch,
    // } = useQuery(QUERY_ALL_EMPLOYEES);
  } = useQuery(QUERY_ALL_EMPLOYEES, {
    variables: {
      isDisplayable: true, //only retrieve employees with a displayable status = true
    },
  });

  // SECTION UPDATE SCHEDULE IN DATABASE
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

  //SECTION add new schedule / job to the appropriate employee(s)
  const [updateEmployeeSchedule] = useMutation(UPDATE_EMPLOYEE_SCHEDULE);
  const [removeEmployeeSchedule] = useMutation(REMOVE_EMPLOYEE_SCHEDULE);

  //SECTION HANDLE INPUT
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    console.log(event.target);

    if (name === "streetAddress") {
      setStreetAddress(value);
      setSelectStreetAddress(false);
    } else if (name === "city") {
      setCity(value);
      setSelectCity(false);
    } else if (name === "state") {
      setState(value);
      setSelectState(false);
    } else if (name === "zip") {
      setZip(value);
      setSelectZip(false);
    } else if (name === "startDate") {
      setStartDate(value);
      setSelectStartDate(false);
    } else if (name === "endDate") {
      setEndDate(value);
      setSelectEndDate(false);
    } else if (name === "startTime") {
      setStartTime(value);
      setSelectStartTime(false);
    } else if (name === "squareFeet") {
      setSquareFeet(value);
      setSelectSquareFeet(false);
    } else if (name === "jobDetails") {
      setJobDetails(value);
      setSelectJobDetails();
    } else if (name === "numberOfClientEmployees") {
      setNumberOfClientEmployees(value);
      setSelectNumberOfClientEmployees(false);
      // } else if (name === "client") {
      //   setClient(value);
      // } else if (name === "employees") {
      //   setEmployees(value);
    } else {
      console.log("Error in form input at EmployeeUpdate.js");
    }
    return name;
  };

  //SECTION HANDLE SELECTED SCHEDULE/JOB
  //set the state for the selected schedule dropdown
  async function handleSelectedSchedule(event) {
    let scheduleId =
      event.target.options[event.target.selectedIndex].dataset.id; //get selected schedule id
    setCurrentScheduleId(scheduleId); //set state of current id

    //await query single client
    let currentScheduleData = await getASingleSchedule(); //get selected schedule data

    setPrevScheduleData(currentScheduleData.data.schedule);

    // allow form to populate with selected employee data
    setSelectStreetAddress(true);
    setSelectCity(true);
    setSelectState(true);
    setSelectZip(true);
    setSelectStartDate(true);
    setSelectEndDate(true);
    setSelectStartTime(true);
    setSelectSquareFeet(true);
    setSelectNumberOfClientEmployees(true);
    setSelectJobDetails(true);

    setFormIsDisabled(false); // enable form for input
  }

  //section
  const handleScheduleUpdate = async (event) => {
    event.preventDefault();

    let getSchedule = await getASingleSchedule();

    // alert(`input start date = ${startDate}`);
    // alert(`input start time = ${startTime}`);
    // alert(`calc start date/time = ${format_date_string(
    //   startDate
    //     ? startDate
    //     : format_date_ISOStringNoTime(getSchedule.data.schedule.startDate),
    //   startTime
    //     ? startTime
    //     : format_time_HHmmss(getSchedule.data.schedule.startTime)
    // )}
    // `);

    alert(`end date input= ${endDate}`);
    alert(`end date stored = ${getSchedule.data.schedule.endDate}`);
    alert(`end time stored = ${getSchedule.data.schedule.endTime}`);
    alert(
      `end time format = ${format_date_string(
        endDate
          ? endDate
          : format_date_ISOStringNoTime(getSchedule.data.schedule.endDate),

        getSchedule.data.schedule.endTime
          ? format_time_HHmmss(getSchedule.data.schedule.endTime)
          : startTime
      )}
    `
    );

    try {
      await updateSchedule({
        variables: {
          id: currentScheduleId,
          streetAddress: streetAddress
            ? streetAddress
            : getSchedule.data.schedule.streetAddress,

          city: city ? city : getSchedule.data.schedule.city,
          state: state ? state : getSchedule.data.schedule.state,
          zip: zip ? zip : getSchedule.data.schedule.zip,
          startDate: format_date_string(
            startDate
              ? startDate
              : format_date_ISOStringNoTime(
                  getSchedule.data.schedule.startDate
                ),
            startTime
              ? startTime
              : format_time_HHmmss(getSchedule.data.schedule.startTime)
          ),
          endDate: format_date_string(
            endDate
              ? endDate
              : format_date_ISOStringNoTime(getSchedule.data.schedule.endDate),
            //since endTime is not an input field always make equal to startTime
            startTime
              ? startTime
              : format_time_HHmmss(getSchedule.data.schedule.startTime)
          ),
          startTime: startTime
            ? startTime + ":00 (MST)" //incoming is 09:00 changed to 09:00:00 (MST)
            : `${getSchedule.data.schedule.startTime
                ?.slice(0, 5)
                .toString()}:00 (MST)`,
          endTime: endTime
            ? endTime + ":00 (MST)" //incoming is 09:00 changed to 09:00:00 (MST)
            : `${getSchedule.data.schedule.endTime
                ?.slice(0, 5)
                .toString()}:00 (MST)`,
          squareFeet: squareFeet
            ? squareFeet
            : getSchedule.data.schedule.squareFeet,
          jobDetails: jobDetails
            ? jobDetails
            : getSchedule.data.schedule.jobDetails,
          numberOfClientEmployees: numberOfClientEmployees
            ? numberOfClientEmployees
            : getSchedule.data.schedule.numberOfClientEmployees,
          client: getSchedule.data.schedule.client._id,

          employees: selectedEmployees.map(({ employeeId }) => employeeId),
        },
      });
    } catch (err) {
      console.log(err);
    }

    //loop to determine adds and deletes
    //compare revised array with original arrray
    //SECTION UPDATE EMPLOYEE SCHEDULE ARRAY - ADD OR DELETE
    //create an array of current employees on the job
    let currentJobEmployeeIds = prevScheduleData.employees.map(
      (emp) => emp._id
    );
    let selectedJobEmployeeIds = selectedEmployees.map((emp) => emp.employeeId);

    for (let i = 0; i < selectedJobEmployeeIds.length; i++) {
      if (!currentJobEmployeeIds.includes(selectedJobEmployeeIds[i])) {
        await updateEmployeeSchedule({
          variables: {
            id: selectedJobEmployeeIds[i],
            schedule: currentScheduleId,
          },
        });
      }
    }

    //if selected employee ids does not include an id in the original array/database, remove it from the database
    for (let i = 0; i < currentJobEmployeeIds.length; i++) {
      if (!selectedJobEmployeeIds.includes(currentJobEmployeeIds[i])) {
        await removeEmployeeSchedule({
          variables: {
            id: currentJobEmployeeIds[i],
            schedule: currentScheduleId,
          },
        });
      }
    }

    scheduleRefetch();

    // allow form to populate with selected employee data
    setSelectStreetAddress(false);
    setSelectCity(false);
    setSelectState(false);
    setSelectZip(false);
    setSelectStartDate(false);
    setSelectEndDate(false);
    setSelectStartTime(false);
    setSelectSquareFeet(false);
    setSelectNumberOfClientEmployees(false);
    setSelectJobDetails(false);

    oneFieldHasInput ? setShowSuccess(true) : setShowSuccess(false);

    resetForm();

    setFormIsDisabled(true); // enable form for input
  };

  //SECTION ADD OR REMOVE SELECTED EMPLOYEE FROM PAGE Render
  // render/populate employee list with employees in list at the time of "select job" dropdown
  useEffect(() => {
    if (currentScheduleId !== "") {
      createCurrentEmployees();
    }

    // eslint-disable-next-line
  }, [currentScheduleId]);

  const createCurrentEmployees = async () => {
    // get employees currently assigned to a job
    let employees = await getASingleSchedule();

    let currentEmployees = [];
    currentEmployees = employees.data.schedule.employees;

    let employeeBuild = [];
    for (let i = 0; i < currentEmployees.length; i++) {
      let firstName = currentEmployees[i].firstName;
      let lastName = currentEmployees[i].lastName;
      let employeeId = currentEmployees[i]._id;

      employeeBuild.push({ firstName, lastName, employeeId });
    }

    // setSelectedEmployees([...currentEmployees]);
    setSelectedEmployees([...employeeBuild]);
  };

  const createSelectedEmployees = async (event) => {
    setOneFieldHasInput(true); //enable submit button if an employee is selected

    if (event) {
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
    }
  };

  function removeEmployee(event) {
    setOneFieldHasInput(true); //enable submit button if an employee is selected

    let keepEmployees = selectedEmployees.filter(
      (item) => item.employeeId !== event.target.value
    );

    setSelectedEmployees(keepEmployees);
  }

  //SECTION UTILITY FUNCTIONS
  //validation - if a user clicks off field w/out entering text, then validation is required displays
  const handleBlurChange = (e) => {
    const { name, value } = e.target;

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

  //reset = resets form to placeholder values
  const resetForm = () => {
    // setBusinessName("");
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
    // setClient("");
    // setEmployees("");
    setSelectedEmployees([]);
  };

  // If all fields are populated then enable the submit button
  useEffect(() => {
    setOneFieldHasInput(
      streetAddress.trim() !== "" ||
        city.trim() !== "" ||
        state.trim() !== "" ||
        zip.trim() !== "" ||
        startDate.trim() !== "" ||
        endDate.trim() !== "" ||
        startTime.trim() !== "" ||
        squareFeet.trim() !== "" ||
        numberOfClientEmployees.trim() !== "" ||
        jobDetails.trim() !== ""
    );
    // eslint-disable-next-line
  }, [
    streetAddress,
    city,
    state,
    zip,
    startDate,
    endDate,
    startTime,
    squareFeet,
    numberOfClientEmployees,
    jobDetails,
  ]);

  let arrayForSortEmp = [];
  if (emp) {
    arrayForSortEmp = [...emp.employees];
    arrayForSortEmp.sort(function (a, b) {
      if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
      if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
      return 0;
    });
  }

  let arrayForSortDate = [];
  if (schedule) {
    arrayForSortDate = [...schedule.schedules];
    arrayForSortDate.sort(function (a, b) {
      if (a.startDate.toLowerCase() < b.startDate.toLowerCase()) return 1;
      if (a.startDate.toLowerCase() > b.startDate.toLowerCase()) return -1;
      return 0;
    });
  }

  return (
    <Container>
      <Form
        data-editscheduleid={prevScheduleData?._id}
        className="py-3 overflow-auto custom-about border border-secondary"
        style={{ alignContent: "left" }}
        onSubmit={handleScheduleUpdate}
      >
        <Form.Group className="form-length">
          <Form.Label style={{ fontWeight: "bolder" }}>Select Job</Form.Label>
          <Form.Control
            as="select"
            className="custom-border"
            type="text"
            placeholder="Select Client"
            value={"form-select"}
            name={"form-select"}
            onChange={handleSelectedSchedule}
          >
            <option>
              {prevScheduleData?.client?.businessName
                ? `${
                    prevScheduleData?.client.businessName
                  }: ${format_date_MMDDYYYY(prevScheduleData?.startDate)}`
                : "Select"}
            </option>
            {arrayForSortDate.map((job, index) => (
              <option key={index} data-id={job?._id}>
                {index + 1}: {format_date_MMDDYYYY(job?.startDate)} --{" "}
                {job?.client?.businessName}
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
            value={
              selectStreetAddress
                ? prevScheduleData.streetAddress
                : streetAddress
            }
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            disabled={formIsDisabled}
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
              value={selectCity ? prevScheduleData.city : city}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Col>
          <Col xs={5}>
            <Form.Label style={{ fontWeight: "bolder", marginTop: "15px" }}>
              State
            </Form.Label>
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
              value={selectState ? prevScheduleData.state : state}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            >
              <option>Select</option>
              {STATE_DROPDOWN.map((st, index) => (
                <option key={index}>{st}</option>
              ))}
            </Form.Control>
          </Col>
          <Col>
            <Form.Label style={{ fontWeight: "bolder", marginTop: "15px" }}>
              Zipcode
            </Form.Label>
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
              value={selectZip ? prevScheduleData.zip : zip}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
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
                className="custom-border startDate"
                type="date"
                min={
                  format_date_YYYYDDMM(prevScheduleData.startDate) <
                  new Date().toISOString().split("T")[0]
                    ? format_date_YYYYDDMM(prevScheduleData.startDate)
                    : new Date().toISOString().split("T")[0]
                } //default to earlier of the job start date or today
                name="startDate"
                value={
                  selectStartDate
                    ? format_date_YYYYDDMM(prevScheduleData.startDate)
                    : startDate
                }
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="addy">
          <Col>
            <Form.Group>
              <div className="form-label">
                <Form.Label
                  style={{ fontWeight: "bolder", marginTop: "-15px" }}
                >
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
                className="custom-border endDate"
                type="date"
                min={
                  format_date_YYYYDDMM(prevScheduleData.startDate) <
                  new Date().toISOString().split("T")[0]
                    ? format_date_YYYYDDMM(prevScheduleData.startDate)
                    : new Date().toISOString().split("T")[0]
                } //default to earlier of the job start date or today
                name="endDate"
                value={
                  selectEndDate
                    ? format_date_YYYYDDMM(prevScheduleData.endDate)
                    : endDate
                }
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="addy">
          <Col>
            <Form.Group>
              <div className="form-label">
                <Form.Label
                  style={{ fontWeight: "bolder", marginTop: "-15px" }}
                >
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
                value={
                  selectStartTime
                    ? format_time_HHmmss(prevScheduleData.startTime)
                    : startTime
                }
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="addy">
          <Col xs={6}>
            <Form.Label style={{ fontWeight: "bolder", marginTop: "-15px" }}>
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
              value={
                selectSquareFeet ? prevScheduleData.squareFeet : squareFeet
              }
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            />
          </Col>

          <Col xs={6}>
            <Form.Group>
              <Form.Label style={{ fontWeight: "bolder", marginTop: "-15px" }}>
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
                value={
                  selectNumberOfClientEmployees
                    ? prevScheduleData?.numberOfClientEmployees
                    : numberOfClientEmployees
                }
                onChange={handleInputChange}
                disabled={formIsDisabled}
              >
                <option>
                  {prevScheduleData?.numberOfClientEmployees
                    ? prevScheduleData?.numberOfClientEmployees
                    : "Select"}
                </option>
                {NUMBER_OF_EMPLOYEES.map((emp, index) => (
                  <option key={index}>{emp}</option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="form-length">
          <Form.Label style={{ fontWeight: "bolder", marginTop: "-15px" }}>
            Select Employee(s)
          </Form.Label>
          <Form.Control
            as="select"
            className="custom-border"
            type="text"
            name={"form-select"}
            value={"form-select"}
            onChange={(event) => {
              createSelectedEmployees(event);
            }}
            disabled={formIsDisabled}
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

        {/* Creates button when adding employee to job  */}
        <Form.Group className="form-length">
          {selectedEmployees.map((employee, index) => (
            <Button
              key={index}
              className="m-1 p-2"
              onClick={removeEmployee}
              variant="primary"
              data-id={emp._id}
              value={employee.employeeId}
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
            name="jobDetails"
            value={selectJobDetails ? prevScheduleData.jobDetails : jobDetails}
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            disabled={formIsDisabled}
          />
        </Form.Group>

        <SuccessAlert
          message="Job details have been updated"
          show={showSuccess}
        ></SuccessAlert>

        <Button
          className="button-custom submit-button-style"
          style={{ display: "grid", margin: "auto" }}
          variant="primary"
          type="submit"
          title="Submit to schedule job."
          disabled={!oneFieldHasInput}
        >
          Update Job
        </Button>
      </Form>
    </Container>
  );
}
export default ScheduleUpdate;
