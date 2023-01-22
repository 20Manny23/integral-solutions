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
  // ADD_SCHEDULE,
  UPDATE_CLIENT_SCHEDULE,
  UPDATE_EMPLOYEE_SCHEDULE,
  UPDATE_SCHEDULE,
} from "../../../utils/mutations";

import {
  format_date_string,
  format_date_MMDDYYYY,
  format_time_HHmmss,
  format_date_YYYYDDMM,
} from "../../../utils/dateFormat";
import { STATE_DROPDOWN } from "../../../utils/stateDropdown";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";
import "../../../styles/Forms.css";

function ScheduleUpdate() {
  //form = input fields
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
  const [employees, setEmployees] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [oneFieldHasInput, setOneFieldHasInput] = useState(true);

  //set selected schedule/jobs
  const [currentInput, setCurrentInput] = useState({});
  const [currentScheduleId, setCurrentScheduleId] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState("");
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

  const numberOfEmployees = [
    "Home Office",
    "Less Than 50",
    "50-99",
    "More Than 100",
  ];

  //enable/disable form
  const [formIsDisabled, setFormIsDisabled] = useState(true);

  //validation
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
  const [showClientValidation, setShowClientValidation] = useState(false);
  const [showSelectedEmployeesValidation, setShowSelectedEmployeesValidation] =
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
  } = useQuery(QUERY_SCHEDULE);

  //SECTION get a single job
  // eslint-disable-next-line
  const [getASingleSchedule, { loading: lazyLoading, data: singleSchedule }] =
    useLazyQuery(QUERY_SINGLE_SCHEDULE, {
      variables: { scheduleId: currentScheduleId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleSchedule) => {
        // setCurrentSchedule(singleSchedule);
      },
    });

  //SECTION get clients for dropdown
  const {
    // eslint-disable-next-line
    loading: clientsLoad,
    data: clients,
    // eslint-disable-next-line
    error: clientError,
    // eslint-disable-next-line
    refetch: clientsRefetch,
  } = useQuery(QUERY_ALL_CLIENTS);

  //SECTION get employees for dropdown
  const {
    // eslint-disable-next-line
    loading: empLoad,
    data: emp,
    // eslint-disable-next-line
    error: empError,
    // eslint-disable-next-line
    refetch: empRefectch,
  } = useQuery(QUERY_ALL_EMPLOYEES);

  //SECTION create a schedule/job
  // const [addSchedule] = useMutation(ADD_SCHEDULE);

  // SECTION UPDATE SCHEDULE IN DATABASE
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

  //SECTION add new schedule / job to the appropriate client
  const [updateClientSchedule] = useMutation(UPDATE_CLIENT_SCHEDULE);

  //SECTION add new schedule / job to the appropriate employee(s)
  const [updateEmployeeSchedule] = useMutation(UPDATE_EMPLOYEE_SCHEDULE);

  //SECTION HANDLE INPUT //fix
  const handleInputChange = (event) => {
    const { name, value } = event.target;

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
    } else if (name === "client") {
      setClient(value);
    } else if (name === "employees") {
      setEmployees(value);
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

    //fix start
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
    //fix end
  }

  //SECTION SCHEDULE UPDATE
  const handleScheduleUpdate = async (event) => {
    event.preventDefault();

    let getSchedule = await getASingleSchedule();

    try {
      await updateSchedule({
        variables: {
          id: currentScheduleId,
          streetAddress: streetAddress
            ? streetAddress
            : getSchedule.data.schedule.streetAddress,
          // suite,
          city: city ? city : getSchedule.data.schedule.city,
          state: state ? state : getSchedule.data.schedule.state,
          zip: zip ? zip : getSchedule.data.schedule.zip,
          startDate: startDate
            ? format_date_string(startDate, endTime)
            : getSchedule.data.schedule.startDate,
          endDate: endDate
            ? format_date_string(endDate, endTime ? endTime : "09:00:00 (MST)")
            : getSchedule.data.schedule.endDate,
          startTime: startTime
            ? startTime + ":00 (MST)" //incoming is 09:00 changed to 09:00:00 (MST)
            : `${getSchedule.data.schedule.startTime
                ?.slice(0, 5)
                .toString()}:00 (MST)`,
          endTime: endTime
            ? endTime
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
          // employees:
          //   selectedEmployees.length > 0
          //     ? selectedEmployees.map(({ employeeId }) => employeeId)
          //     : getSchedule.data.schedule.employees.map((employee) => employee._id),
          employees: selectedEmployees.map(({ employeeId }) => employeeId),
        },
      });
    } catch (err) {
      console.log(err);
    }

    scheduleRefetch();

    //fix start
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

    resetForm();

    setFormIsDisabled(true); // enable form for input
    //fix end

    //fix end
    // // refetch the list of schedules/jobs to get the most recent id added
    //   let getScheduleIds = await scheduleRefetch();
    //   let scheduleIdsLength = getScheduleIds.data.schedules.length - 1;
    //   let mostRecentScheduleId =
    //     getScheduleIds.data.schedules[scheduleIdsLength]._id;

    //   updateClientJobs(mostRecentScheduleId);
    //   updateEmployeeJobs(mostRecentScheduleId);
    //fix end
  };

  //SECTION ADD OR REMOVE SELECTED EMPLOYEE FROM PAGE
  // set state of selectedEmployees upon load useEffect
  // populate employee list with employees in list at the time of "select job" dropdown
  useEffect(() => {
    if (currentScheduleId !== "") {
      createCurrentEmployees();
    }

    // eslint-disable-next-line
  }, [currentScheduleId]);

  const createCurrentEmployees = async () => {
    // get employees currently assigned to a job
    let test = await getASingleSchedule();

    let currentEmployees = [];
    currentEmployees = test.data.schedule.employees;

    let temp = [];
    for (let i = 0; i < currentEmployees.length; i++) {
      let firstName = currentEmployees[i].firstName;
      let lastName = currentEmployees[i].lastName;
      let employeeId = currentEmployees[i]._id;

      temp.push({ firstName, lastName, employeeId });
    }

    // setSelectedEmployees([...currentEmployees]);
    setSelectedEmployees([...temp]);

    console.log("1 = ", selectedEmployees);
  };

  const createSelectedEmployees = async (event) => {
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
    let keepEmployees = selectedEmployees.filter(
      (item) => item.employeeId !== event.target.value
    );

    setSelectedEmployees(keepEmployees);
  }

  // update client schedule array
  // const updateClientJobs = async (mostRecentScheduleId) => {
  //   try {
  //     // eslint-disable-next-line
  //     const { data } = await updateClientSchedule({
  //       variables: {
  //         id: clients?.clients
  //           ?.filter((client) => client.businessName === businessName)
  //           .map((id) => id._id)
  //           .toString(), // convert client name to client._id
  //         schedule: mostRecentScheduleId,
  //       },
  //     });
  //     console.log("what data = ", data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // update employee schedule array
  // const updateEmployeeJobs = async (mostRecentScheduleId) => {
  //   console.log("employees array = ", selectedEmployees);
  //   try {
  //     for (let i = 0; i < selectedEmployees.length; i++) {
  //       // eslint-disable-next-line
  //       const { data } = await updateEmployeeSchedule({
  //         variables: {
  //           id: selectedEmployees[i].employeeId,
  //           schedule: mostRecentScheduleId,
  //         },
  //       });
  //       console.log(data);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  //SECTION UTILITY FUNCTIONS

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  function businessNameSelect(event) {
    setBusinessName(event.target.value);
  }

  //validation - if a user clicks off field w/out entering text, then validation is required displays
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

  //reset = resets form to placeholder values
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
    setEmployees("");
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

  return (
    <Container>
      <Form
        data-editscheduleid={prevScheduleData?._id}
        className="py-3 overflow-auto custom-about border border-secondary"
        style={{ alignContent: "left" }}
        onSubmit={handleScheduleUpdate}
        // onSubmit={(event) => {
        //   event.preventDefault();
        //   let scheduleId = event.currentTarget.getAttribute(
        //     "data-editscheduleid"
        //   );
        //   setCurrentScheduleId(scheduleId);
        //   setCurrentInput({
        //     businessName,
        //     streetAddress,
        //     // suite,
        //     city,
        //     state,
        //     zip,
        //     startDate,
        //     endDate,
        //     startTime,
        //     endTime,
        //     squareFeet,
        //     jobDetails,
        //     numberOfClientEmployees,
        //     client,
        //     employees,
        //   });
        //   window.location.reload();
        // }}
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
            {schedule?.schedules?.map((job, index) => (
              <option
                key={index}
                // value={job?.client?.businessName}
                data-id={job?._id}
              >
                {index}: {job?.client?.businessName}:{" "}
                {format_date_MMDDYYYY(job?.startDate)}
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
            // defaultValue={prevScheduleData?.streetAddress} //fix
            value={
              selectStreetAddress
                ? prevScheduleData.streetAddress
                : streetAddress
            } // fix
            onChange={handleInputChange}
            // onChange={(event) => {
            //   setStreetAddress(event.target.value);
            // }}
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
              // value={city}
              // defaultValue={prevScheduleData?.city} //fix
              value={selectCity ? prevScheduleData.city : city} // fix
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
              // defaultValue={prevScheduleData?.state} //fix
              value={selectState ? prevScheduleData.state : state} // fix
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
            >
              <option>
                {prevScheduleData?.state ? prevScheduleData?.state : "Select"}
              </option>
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
            <Form.Control
              className="custom-border"
              placeholder="Zip"
              name="zip"
              // defaultValue={prevScheduleData?.zip} //fix
              value={selectZip ? prevScheduleData.zip : zip} // fix
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
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
                // defaultValue={format_date_YYYYDDMM(prevScheduleData?.startDate)} //fix
                value={
                  selectStartDate
                    ? format_date_YYYYDDMM(prevScheduleData.startDate)
                    : startDate
                } // fix
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
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
                name="endDate"
                // defaultValue={format_date_YYYYDDMM(prevScheduleData?.endDate)} //fix
                value={
                  selectEndDate
                    ? format_date_YYYYDDMM(prevScheduleData.endDate)
                    : endDate
                } // fix
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
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
                // defaultValue={
                //   prevScheduleData &&
                //   prevScheduleData?.startTime?.slice(0, 5).toString()
                // } //fix
                value={
                  selectStartTime
                    ? format_time_HHmmss(prevScheduleData.startTime)
                    : startTime
                } // fix
                // defaultValue="13:30"
                onChange={handleInputChange}
                onBlur={handleBlurChange}
                disabled={formIsDisabled}
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
              // value={squareFeet}
              // defaultValue={prevScheduleData?.squareFeet} //fix
              value={
                selectSquareFeet ? prevScheduleData.squareFeet : squareFeet
              } // fix
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              disabled={formIsDisabled}
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
                name="numberOfClientEmployees"
                // defaultValue={prevScheduleData?.numberOfClientEmployees} //fix
                value={
                  selectNumberOfClientEmployees
                    ? prevScheduleData?.numberOfClientEmployees
                    : numberOfClientEmployees
                } // fix
                onChange={handleInputChange}
              >
                {/* fix */}
                <option>
                  {prevScheduleData?.numberOfClientEmployees
                    ? prevScheduleData?.numberOfClientEmployees
                    : "Select"}
                </option>
                {/* <option>Select</option> */}
                {numberOfEmployees.map((emp, index) => (
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
            // fix
            // defaultValue={prevScheduleData?.endDate}
          >
            {/* fix */}
            {/* <option>{prevScheduleData?.employees[0]?.firstName ? `${prevScheduleData?.employees[0].firstName} ${prevScheduleData?.employees[0].lastName}` : "Select"}</option> */}
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
            name="jobDetails"
            // value={jobDetails}
            // defaultValue={prevScheduleData?.jobDetails} //fix
            value={selectJobDetails ? prevScheduleData.jobDetails : jobDetails} // fix
            onChange={handleInputChange}
            onBlur={handleBlurChange}
            disabled={formIsDisabled}
          />
        </Form.Group>

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
