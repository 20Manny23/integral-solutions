import { gql } from "@apollo/client";

// SECTION LOGIN / RESET
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
        isLocked
      }
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation forgotPassword($email: String!, $password: String!) {
    forgotPassword(email: $email, password: $password) {
      token
      employee {
        _id
      }
    }
  }
`;

export const UPDATE_PASSWORD = gql`
  mutation UpdatePassword($id: ID, $password: String) {
    updatePassword(_id: $id, password: $password) {
      _id
      email
      firstName
      lastName
      password
      phone
      isAdmin
      isLocked
      hasDriversLicense
    }
  }
`;

// SECTION EMPLOYEE
export const SIGNUP_EMPLOYEE = gql`
  mutation signupEmployee($email: String!, $password: String!) {
    signupEmployee(email: $email, password: $password) {
      token
      employee {
        _id
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $phone: String
    $isAdmin: Boolean
    $isLocked: Boolean
    $hasDriversLicense: String
  ) {
    updateEmployee(
      _id: $id
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      isAdmin: $isAdmin
      isLocked: $isLocked
      hasDriversLicense: $hasDriversLicense
    ) {
      _id
      email
      firstName
      lastName
      password
      phone
      isAdmin
      isLocked
      hasDriversLicense
    }
  }
`;

export const UPDATE_EMPLOYEE_FORM = gql`
  mutation updateEmployeeForm(
    $id: ID
    $firstName: String
    $lastName: String
    $email: String
    $phone: String
    $hasDriversLicense: String
  ) {
    updateEmployeeForm(
      _id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
      hasDriversLicense: $hasDriversLicense
    ) {
      _id
      firstName
      lastName
      email
      phone
      hasDriversLicense
    }
  }
`;

export const TOGGLE_ADMIN = gql`
  mutation ToggleAdmin($employeeId: ID!) {
    toggleAdmin(employeeId: $employeeId) {
      employee {
        _id
        isAdmin
      }
    }
  }
`;

export const TOGGLE_LOCKED = gql`
  mutation ToggleLocked($employeeId: ID!) {
    toggleLocked(employeeId: $employeeId) {
      employee {
        _id
        isLocked
      }
    }
  }
`;

export const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $email: String
    $password: String
    $firstName: String
    $lastName: String
    $phone: String
    $isAdmin: Boolean
    $isLocked: Boolean
    $isDisplayable: Boolean
    $hasDriversLicense: String
  ) {
    addEmployee(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      isAdmin: $isAdmin
      isLocked: $isLocked
      isDisplayable: $isDisplayable
      hasDriversLicense: $hasDriversLicense
    ) {
      _id
      email
      firstName
      lastName
      password
      phone
      isAdmin
      isLocked
      isDisplayable
      hasDriversLicense
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation deleteEmployee($id: ID!) {
    deleteEmployee(_id: $id) {
      _id
    }
  }
`;

export const SOFT_DELETE_EMPLOYEE = gql`
  mutation softDeleteEmployee($id: ID!, $isDisplayable: Boolean) {
    softDeleteEmployee(_id: $id, isDisplayable: $isDisplayable) {
      _id
      isDisplayable
    }
  }
`;

export const UPDATE_EMPLOYEE_SCHEDULE = gql`
  mutation UpdateEmployeeSchedule($id: ID, $schedule: String) {
    updateEmployeeSchedule(_id: $id, schedule: $schedule) {
      _id
      schedule {
        _id
      }
    }
  }
`;

export const REMOVE_EMPLOYEE_SCHEDULE = gql`
  mutation RemoveEmployeeSchedule($id: ID, $schedule: String) {
    removeEmployeeSchedule(_id: $id, schedule: $schedule) {
      _id
      schedule {
        _id
      }
    }
  }
`;

export const UPDATE_EMPLOYEE_HOURS = gql`
  mutation updateEmployeeHours($id: ID, $hours: String) {
    updateEmployeeHours(_id: $id, hours: $hours) {
      _id
      hours {
        _id
      }
    }
  }
`;

// SECTION CLIENT
export const ADD_CLIENT = gql`
  mutation addClient(
    $businessName: String
    $contact: String
    $phone: String
    $email: String
    $streetAddress: String
    $suite: String
    $city: String
    $state: String
    $zip: String
    $isDisplayable: Boolean
  ) {
    addClient(
      businessName: $businessName
      contact: $contact
      phone: $phone
      email: $email
      streetAddress: $streetAddress
      suite: $suite
      city: $city
      state: $state
      zip: $zip
      isDisplayable: $isDisplayable
    ) {
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
      isDisplayable
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(_id: $id) {
      _id
    }
  }
`;

export const SOFT_DELETE_CLIENT = gql`
  mutation softDeleteClient($id: ID!, $isDisplayable: Boolean) {
    softDeleteClient(_id: $id, isDisplayable: $isDisplayable) {
      _id
      isDisplayable
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation UpdateClient(
    $id: ID!
    $businessName: String
    $streetAddress: String
    $suite: String
    $city: String
    $state: String
    $zip: String
    $contact: String
    $phone: String
    $email: String
  ) {
    updateClient(
      _id: $id
      businessName: $businessName
      streetAddress: $streetAddress
      suite: $suite
      city: $city
      state: $state
      zip: $zip
      contact: $contact
      phone: $phone
      email: $email
    ) {
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

export const UPDATE_CLIENT_SCHEDULE = gql`
  mutation updateClientSchedule($id: ID, $schedule: String) {
    updateClientSchedule(_id: $id, schedule: $schedule) {
      _id
      schedule {
        _id
      }
    }
  }
`;

// SECTION SCHEDULE
export const ADD_SCHEDULE = gql`
  mutation AddSchedule(
    $streetAddress: String
    $suite: String
    $city: String
    $state: String
    $zip: String
    $startDate: String
    $endDate: String
    $startTime: String
    $endTime: String
    $squareFeet: String
    $jobDetails: String
    $numberOfClientEmployees: String
    $client: String
    $employees: [String]
    $isDisplayable: Boolean
  ) {
    addSchedule(
      streetAddress: $streetAddress
      suite: $suite
      city: $city
      state: $state
      zip: $zip
      startDate: $startDate
      endDate: $endDate
      startTime: $startTime
      endTime: $endTime
      squareFeet: $squareFeet
      jobDetails: $jobDetails
      numberOfClientEmployees: $numberOfClientEmployees
      employees: $employees
      client: $client
      isDisplayable: $isDisplayable
    ) {
      _id
      streetAddress
      suite
      state
      city
      zip
      startDate
      startTime
      endDate
      endTime
      jobDetails
      numberOfClientEmployees
      squareFeet
      isDisplayable
      client {
        _id
      }
      employees {
        _id
      }
    }
  }
`;

export const DELETE_SCHEDULE = gql`
  mutation deleteSchedule($id: ID!) {
    deleteSchedule(_id: $id) {
      _id
    }
  }
`;

export const SOFT_DELETE_SCHEDULE = gql`
  mutation softDeleteSchedule($id: ID!, $isDisplayable: Boolean) {
    softDeleteSchedule(_id: $id, isDisplayable: $isDisplayable) {
      _id
      isDisplayable
    }
  }
`;

export const UPDATE_SCHEDULE = gql`
  mutation UpdateSchedule(
    $id: ID
    $streetAddress: String
    $suite: String
    $city: String
    $state: String
    $zip: String
    $startDate: String
    $endDate: String
    $startTime: String
    $endTime: String
    $squareFeet: String
    $jobDetails: String
    $numberOfClientEmployees: String
    $client: String
    $employees: [String]
  ) {
    updateSchedule(
      _id: $id
      startDate: $startDate
      endDate: $endDate
      startTime: $startTime
      endTime: $endTime
      client: $client
      employees: $employees
      streetAddress: $streetAddress
      suite: $suite
      city: $city
      state: $state
      zip: $zip
      squareFeet: $squareFeet
      jobDetails: $jobDetails
      numberOfClientEmployees: $numberOfClientEmployees
    ) {
      _id
      startDate
      endDate
      startTime
      endTime
      client {
        _id
      }
      employees {
        _id
      }
      city
      jobDetails
      numberOfClientEmployees
      squareFeet
      state
      streetAddress
      suite
      zip
    }
  }
`;

// SECTION Hours
//ADD HOUR RECORD
export const ADD_HOURS = gql`
  mutation AddHourRecord(
    $jobDate: String
    $startTime: String
    $endTime: String
    $hoursWorked: String
    $employee: String
  ) {
    addHour(
      jobDate: $jobDate
      startTime: $startTime
      endTime: $endTime
      hoursWorked: $hoursWorked
      employee: $employee
    ) {
      _id
      employee {
        _id
      }
    }
  }
`;

//UPDATE HOUR RECORD - CREATES DOCUMENT IF IT DOESN'T EXIST OR UPDATES IF IT DOES EXIST VIA THE UPSERT OPTION ON THE RESOLVER
export const UPDATE_HOURS_BYEMPLOYEEID_BYJOBDATE = gql`
  mutation UpdateHourByEmployeeIdByJobDate(
    $jobDate: String
    $startTime: String
    $endTime: String
    $hoursWorked: String
    $employee: String
  ) {
    updateHourByEmployeeIdByJobDate(
      jobDate: $jobDate
      startTime: $startTime
      endTime: $endTime
      hoursWorked: $hoursWorked
      employee: $employee
    ) {
      _id
    }
  }
`;

//DELETE HOUR RECORD
export const DELETE_HOURS_BYEMPLOYEEID_BYJOBDATE = gql`
  mutation DeleteHours($employee: String, $jobDate: String) {
    deleteHours(employee: $employee, jobDate: $jobDate) {
      _id
      employee {
        _id
      }
    }
  }
`;

// fix
export const UPDATE_EMPLOYEE_HOUR = gql`
  mutation updateEmployeeHour($id: ID, $hour: String) {
    updateEmployeeHour(_id: $id, hour: $hour) {
      _id
      hour {
        _id
      }
    }
  }
`;
