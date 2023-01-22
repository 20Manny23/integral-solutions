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
  ADD_SCHEDULE,
  UPDATE_CLIENT_SCHEDULE,
  UPDATE_EMPLOYEE_SCHEDULE,
  UPDATE_SCHEDULE,
} from "../../../utils/mutations";

import {
  format_date_string,
  format_date_MMDDYYYY,
} from "../../../utils/dateFormat";
import { format_date_YYYYDDMM } from "../../../utils/dateFormat";
import { STATE_DROPDOWN } from "../../../utils/stateDropdown";

import { Row, Col, Container, Form, Button } from "react-bootstrap";
import "../../../styles/Contact.css";
import "../../../styles/button-style.css";
import "../../../styles/Forms.css";

function ScheduleUpdate() {
  const [prevScheduleData, setPrevScheduleData] = useState({});

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
  const [endTime, setEndTime] = useState("");
  const [squareFeet, setSquareFeet] = useState("");
  const [jobDetails, setJobDetails] = useState("");
  const [numberOfClientEmployees, setNumberOfClientEmployees] = useState("");
  const [client, setClient] = useState("");
  const [employees, setEmployees] = useState("");
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [areAllFieldsFilled, setAreAllFieldsFilled] = useState(true);

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

  const [currentInput, setCurrentInput] = useState({});
  const [currentScheduleId, setCurrentScheduleId] = useState("");
  const [currentSchedule, setCurrentSchedule] = useState("");

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

  // eslint-disable-next-line
  const [getASingleSchedule, { loading: lazyLoading, data: singleSchedule }] =
    useLazyQuery(QUERY_SINGLE_SCHEDULE, {
      variables: { scheduleId: currentScheduleId },
      // if skip is true, this query will not be executed; in this instance, if the user is not logged in this query will be skipped when the component mounts
      skip: !Auth.loggedIn(),
      onCompleted: (singleSchedule) => {
        setCurrentSchedule(singleSchedule);
      },
    });

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
    setSelectedEmployees([ ...temp ]);

    console.log("1 = ", selectedEmployees);
  }

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

  // SECTION UPDATE SCHEDULE IN DATABASE
  const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

  // Wait for currentClientId OR current input to be updated
  useEffect(() => {
    if (currentScheduleId && currentInput) {
      handleEditScheduleSubmit();
    }

    // eslint-disable-next-line
  }, [currentScheduleId, currentInput]);

  //fix
  const handleEditScheduleSubmit = async () => {
    let test = await getASingleSchedule();
    
    try {
      await updateSchedule({
        variables: {
          id: currentScheduleId,
          streetAddress: currentInput?.streetAddress
            ? currentInput.streetAddress
            : test.data.schedule.streetAddress,
          // suite,
          city: currentInput?.city
            ? currentInput.city
            : test.data.schedule.city,
          state: currentInput.state
            ? currentInput.state
            : test.data.schedule.state,
          zip: currentInput.zip ? currentInput.zip : test.data.schedule.zip,
          startDate: currentInput.startDate
            ? format_date_string(currentInput.startDate, currentInput.endTime)
            : test.data.schedule.startDate,
          endDate: currentInput.endDate
            ? format_date_string(currentInput.endDate, currentInput.endTime ? currentInput.endTime : "09:00:00 (MST)" )
            : test.data.schedule.endDate,
          startTime: currentInput.startTime
            ? currentInput.startTime + ":00 (MST)" //incoming is 09:00 changed to 09:00:00 (MST)
            : `${test.data.schedule.startTime?.slice(0, 5).toString()}:00 (MST)`,
          endTime: currentInput.endTime
            ? currentInput.endTime
            : `${test.data.schedule.endTime?.slice(0, 5).toString()}:00 (MST)`,
          squareFeet: currentInput.squareFeet
            ? currentInput.squareFeet
            : test.data.schedule.squareFeet,
          jobDetails: currentInput.jobDetails
            ? currentInput.jobDetails
            : test.data.schedule.jobDetails,
          numberOfClientEmployees: 
            currentInput.numberOfClientEmployees
              ? currentInput.numberOfClientEmployees
              : test.data.schedule.numberOfClientEmployees,
          client: test.data.schedule.client._id,
          // employees: 
          //   selectedEmployees.length > 0
          //     ? selectedEmployees.map(({ employeeId }) => employeeId)
          //     : test.data.schedule.employees.map((employee) => employee._id),
          employees: selectedEmployees.map(({ employeeId }) => employeeId),
        },
      });
    } catch (err) {
      console.log(err);
    }

    //  scheduleRefetch();

    // setIsDisabled(true);

    //  resetForm();

    // // refetch the list of schedules/jobs to get the most recent id added
    //   let getScheduleIds = await scheduleRefetch();
    //   let scheduleIdsLength = getScheduleIds.data.schedules.length - 1;
    //   let mostRecentScheduleId =
    //     getScheduleIds.data.schedules[scheduleIdsLength]._id;

    //   updateClientJobs(mostRecentScheduleId);
    //   updateEmployeeJobs(mostRecentScheduleId);
  };

  //SECTION SET STATE FOR THE SELECTED BUSINESS/CLIENT NAME DROPDOWN
  async function scheduleSelect(event) {

    if(currentScheduleId){
      window.location.reload();
    }
    let scheduleId =
      event.target.options[event.target.selectedIndex].dataset.id;
    setCurrentScheduleId(scheduleId);

    // setIsDisabled(false);

    setBusinessName(event.target.value);

    //await query single client
    let currentScheduleData = await getASingleSchedule();

    setPrevScheduleData(currentScheduleData.data.schedule);
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

  //SECTION RESET FORM
  // Reset the add schedule form after submission
  // const resetForm = () => {
  //   setBusinessName("");
  //   setStreetAddress("");
  //   setSuite("");
  //   setCity("");
  //   setState("");
  //   setZip("");
  //   setStartDate("");
  //   setEndDate("");
  //   setStartTime("");
  //   setEndTime("");
  //   setSquareFeet("");
  //   setJobDetails("");
  //   setNumberOfClientEmployees("");
  //   setClient("");
  //   setEmployees("");
  //   setAreAllFieldsFilled(false);
  // };

  // If all fields are populated then enable the submit button
  useEffect(() => {

    console.log('state=', numberOfClientEmployees)

    console.log(state.trim === " Select")
    console.log((state.trim() === "" ))

    console.log(state.trim === "Select" || state.trim() === "" )

    setAreAllFieldsFilled(
      // true
      // businessName.trim() === "Select" ||
      //   numberOfClientEmployees.trim() === "Select" ||
      // (state.trim().length === 0 || state.trim().length > 3)
      // &&
      // numberOfClientEmployees.length === 0
      // &&
      // (state.trim().length === 0 || state.trim().length > 3)
      // && streetAddress.trim() === ""
      // && city.trim() === ""
      // && zip.trim() === ""
      // && startDate.trim() === ""
      // && endDate.trim() === ""
      // && startTime.trim() === ""
      // && squareFeet.trim() === ""
      // && jobDetails.trim() === ""
      // || employees.trim() === "Select"
      // || selectedEmployees.length === 0
      // || suite.trim() !== ""
      // || endTime.trim() === ""
    );
    console.log('all fields = ', areAllFieldsFilled);
    // eslint-disable-next-line
  }, [
    // businessName,
    state,
    // numberOfClientEmployees,
    // streetAddress,
    // city,
    // zip,
    // startDate,
    // endDate,
    // startTime,
    // squareFeet,
    // jobDetails,
    // employees,
    // selectedEmployees,
    // suite,
    // endTime,
  ]);

  return (
    <Container>
      <Form
        data-editscheduleid={prevScheduleData?._id}
        className="py-3 overflow-auto custom-about border border-secondary"
        style={{ alignContent: "left" }}
        onSubmit={(event) => {
          event.preventDefault();
          let scheduleId = event.currentTarget.getAttribute(
            "data-editscheduleid"
          );
          setCurrentScheduleId(scheduleId);
          setCurrentInput({
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
            client,
            employees,
          });
          window.location.reload();
        }}
      >
        <Form.Group className="form-length">
          <Form.Label style={{ fontWeight: "bolder" }}>
            Select Job (to populate below)
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
            onChange={scheduleSelect}
            // onChange={(event) => {
            //   scheduleSelect(event);

            //   //fix

            //   // let scheduleId = event.currentTarget.getAttribute(
            //   //   "data-editscheduleid"
            //   // );
            //   // setCurrentScheduleId(scheduleId);

            //   // console.log("on change")
            //   // createSelectedEmployees(event);
            // }}
          >
            {/* fix */}
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
                value={job?.client?.businessName}
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
            defaultValue={prevScheduleData?.streetAddress}
            // onChange={handleInputChange}
            onChange={(event) => {
              setStreetAddress(event.target.value)
            }}
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
              name="city"
              // value={city}
              defaultValue={prevScheduleData?.city}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //required
            />
          </Col>
          <Col xs={5}>
            <Form.Label style={{ fontWeight: "bolder", marginTop:'15px' }}>State</Form.Label>
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
              defaultValue={prevScheduleData?.state}
              onChange={handleInputChange}
              onBlur={handleBlurChange}
              //required
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
            <Form.Label style={{ fontWeight: "bolder", marginTop:'15px' }}>Zipcode</Form.Label>
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
              defaultValue={prevScheduleData?.zip}
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
                defaultValue={format_date_YYYYDDMM(prevScheduleData?.startDate)}
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
                name="endDate"
                defaultValue={format_date_YYYYDDMM(prevScheduleData?.endDate)}
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
                name="startTime"
                defaultValue={
                  prevScheduleData &&
                  prevScheduleData?.startTime?.slice(0, 5).toString()
                }
                // defaultValue="13:30"
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
              name="squareFeet"
              // value={squareFeet}
              defaultValue={prevScheduleData?.squareFeet}
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
                name="numberOfClientEmployees"
                defaultValue={prevScheduleData?.numberOfClientEmployees}
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
            defaultValue={prevScheduleData?.endDate}
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
        {selectedEmployees.map((employee) => (
          <Button
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
            // value={jobDetails}
            defaultValue={prevScheduleData?.jobDetails}
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
          disabled={areAllFieldsFilled}
          // disabled
        >
          Update Job
        </Button>
      </Form>
    </Container>
  );
}
export default ScheduleUpdate;
