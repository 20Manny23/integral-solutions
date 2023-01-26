import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me($id: ID!) {
    me(_id: $id) {
      _id
      username
      email
      firstName
      lastName
    }
  }
`;

// SECTION EMPLOYEE
export const QUERY_EMPLOYEE_BYEMAIL = gql`
  query EmployeeByEmail($email: String!) {
    employeeByEmail(email: $email) {
      _id
      firstName
      lastName
      email
      phone
      isAdmin
      isLocked
      password
      phone
      schedule {
        _id
      }
    }
  }
`;

export const QUERY_EMPLOYEE_BYID = gql`
  query EmployeeById($id: ID!) {
    employeeById(_id: $id) {
      _id
      firstName
      lastName
      email
      phone
      isAdmin
      isLocked
      password
      schedule {
        isDisplayable
        startDate
        startTime
        streetAddress
        city
        state
        zip
        endDate
        endTime
        jobDetails
        numberOfClientEmployees
        client {
          _id
          businessName
          contact
          streetAddress
          phone
          suite
          city
          state
          zip
        }
      }
    }
  }
`;

export const QUERY_ALL_EMPLOYEES = gql`
  # query getAllEmployees {
    #employees {
  query getAllEmployees($isDisplayable: Boolean) {
    employees(isDisplayable: $isDisplayable) {
      _id
      isDisplayable
      firstName
      lastName
      email
      phone
      isAdmin
      isLocked
      password
      schedule {
        startDate
        startTime
        endDate
        endTime
        jobDetails
        numberOfClientEmployees
        client {
          _id
          businessName
          city
          streetAddress
          state
          suite
          zip
        }
      }
    }
  }
`;

export const QUERY_SINGLE_EMPLOYEE = gql`
  query getASingleEmployee($id: ID!) {
    employeeById(_id: $id) {
      _id
      firstName
      lastName
      email
      phone
      isAdmin
      isLocked
      password
    }
  }
`;

// SECTION CLIENTS
export const QUERY_ALL_CLIENTS = gql`
  #query getAllClients {
  #   clients {
  query getAllClients($isDisplayable: Boolean) {
    clients(isDisplayable: $isDisplayable) {
      _id
      isDisplayable
      businessName
      city
      contact
      email
      phone
      state
      streetAddress
      suite
      zip
      schedule {
        _id
        startDate
        startTime
        endDate
        endTime
        jobDetails
        numberOfClientEmployees
      }
    }
  }
`;

export const QUERY_SINGLE_CLIENT = gql`
  query getSingleClient($clientId: ID!) {
    client(_id: $clientId) {
      _id
      businessName
      contact
      phone
      email
      streetAddress
      suite
      state
      city
      zip
    }
  }
`;

// SECTION SCHEDULE
export const QUERY_SCHEDULE = gql`
  #query getSchedule {
  #  schedules {
  query getSchedule($isDisplayable: Boolean) {
    schedules(isDisplayable: $isDisplayable) {
      _id
      isDisplayable
      startDate
      endDate
      startTime
      endTime
      jobDetails
      numberOfClientEmployees
      employees {
        firstName
        lastName
        email
        phone
      }
      client {
        _id
        businessName
        contact
        email
        phone
        streetAddress
        city
        state
        suite
        zip
      }
      suite
      streetAddress
      city
      state
      zip
      squareFeet
    }
  }
`;

export const QUERY_SINGLE_SCHEDULE = gql`
  query scheduleFindOne($scheduleId: ID!) {
    schedule(scheduleId: $scheduleId) {
      _id
      startDate
      endDate
      startTime
      endTime
      streetAddress
      suite
      state
      city
      zip
      squareFeet
      jobDetails
      numberOfClientEmployees
      employees {
        _id
        firstName
        lastName
        email
        phone
      }
      client {
        _id
        businessName
        contact
        email
        phone
        streetAddress
        city
        state
        suite
        zip
      }
    }
  }
`;

// SECTION SEND EMAIL
export const SEND_EMAIL = gql`
  query emailContent(
    $toEmail: String
    $fromEmail: String
    $subject: String
    $textContent: String
    $htmlContent: String
  ) {
    sendEmail(
      toEmail: $toEmail
      fromEmail: $fromEmail
      subject: $subject
      textContent: $textContent
      htmlContent: $htmlContent
    )
  }
`;

// SECTION HOUR
//QUERY ALL HOURS
export const QUERY_ALL_HOURS = gql`
  query AllHours {
    hours {
      _id
      jobDate
      startTime
      endTime
      hoursWorked
      employee {
        _id
      }
    }
  }
`;

//QUERY HOURS BY EMPLOYEE ID
export const QUERY_HOURS_BYEMPLOYEEID = gql`
  query HoursByEmployeeId($employee: ID!) {
    hoursByEmployeeId(employee: $employee) {
      _id
      jobDate
      hoursWorked
      employee {
        _id
        email
      }
    }
  }
`;

//QUERY HOURS BY EMPLOYEE BY JOB DATE
export const QUERY_HOURS_BYEMPLOYEEID_BYJOBDATE = gql`
  query HoursByEmployeeIdByJobDate($employee: ID!, $jobDate: String) {
    hoursByEmployeeIdByJobDate(employee: $employee, jobDate: $jobDate) {
      _id
      jobDate
      startTime
      endTime
      hoursWorked
      employee {
        _id
      }
    }
  }
`;
