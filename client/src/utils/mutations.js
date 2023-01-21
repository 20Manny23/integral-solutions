import { gql } from "@apollo/client";

// SECTION LOGIN / RESET
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
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
  mutation UpdatePassword(
    $id: ID
    $password: String
  ) {
    updatePassword(
      _id: $id
      password: $password
    ) {
      _id
      email
      firstName
      lastName
      password
      phone
      isManager
      isAdmin
      isLocked
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
    $isManager: Boolean
    $isAdmin: Boolean
    $isLocked: Boolean
  ) {
    updateEmployee(
      _id: $id
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      isManager: $isManager
      isAdmin: $isAdmin
      isLocked: $isLocked
    ) {
      _id
      email
      firstName
      lastName
      password
      phone
      isManager
      isAdmin
      isLocked
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
  ) {
    updateEmployeeForm(
      _id: $id
      firstName: $firstName
      lastName: $lastName
      email: $email
      phone: $phone
    ) {
      _id
      firstName
      lastName
      email
      phone
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
    $isManager: Boolean
    $isAdmin: Boolean
    $isLocked: Boolean
  ) {
    addEmployee(
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      isManager: $isManager
      isAdmin: $isAdmin
      isLocked: $isLocked
    ) {
      _id
      email
      firstName
      isManager
      lastName
      password
      phone
      isAdmin
      isLocked
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

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(_id: $id) {
      _id
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

// SECTION LEGACY CODE
// export const LOGIN_USER = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//       }
//     }
//   }
// `;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
      _id
    }
  }
`;

// export const ADD_USER = gql`
//   mutation addUser($username: String!, $email: String!, $password: String!) {
//     addUser(username: $username, email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

export const DELETE_INCIDENT = gql`
  mutation deleteIncident($id: ID!) {
    deleteIncident(_id: $id) {
      _id
    }
  }
`;

export const ADD_INCIDENT = gql`
  mutation Mutation(
    $employeeName: String!
    $locationName: String!
    $employeePhone: String!
    $subject: String!
    $urgent: String!
    $incidentDetails: String!
  ) {
    addIncident(
      employeeName: $employeeName
      locationName: $locationName
      employeePhone: $employeePhone
      subject: $subject
      urgent: $urgent
      incidentDetails: $incidentDetails
    ) {
      employeeName
      locationName
      employeePhone
      subject
      urgent
      incidentDetails
    }
  }
`;
// Start Hours Section

export const ADD_HOURS = gql`
mutation addHours(
  $workDate: String!
  $hours: String!
){
  addHours(
    _id: $id
    workDate: $workDate
    hours: $Hours
  ){
    _idworkDate
    hours
  }
}`;

export const DELETE_HOURS = gql`
  mutation deleteHours($id: ID!) {
    deleteHours(_id: $id) {
      _id
  }
  }`;
