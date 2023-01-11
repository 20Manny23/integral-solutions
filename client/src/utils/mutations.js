import { gql } from "@apollo/client";

// export const LOGIN_USER = gql`
//   mutation login($email: String!, $password: String!) {
//     login(email: $email, password: $password) {
//       token
//       user {
//         _id
//         username
//       }
//     }
//   }
// `;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      employee {
        _id
        username
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

export const SIGNUP_EMPLOYEE = gql`
  mutation signupEmployee(
    $username: String!
    $email: String!
    $password: String!
  ) {
    signupEmployee(username: $username, email: $email, password: $password) {
      token
      employee {
        _id
        username
      }
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(_id: $id) {
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

export const DELETE_INCIDENT = gql`
  mutation deleteIncident($id: ID!) {
    deleteIncident(_id: $id) {
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

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $id: ID
    $username: String
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
      username: $username
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
      username
      isAdmin
      isLocked
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

export const DELETE_CLIENT = gql`
  mutation deleteClient($id: ID!) {
    deleteClient(_id: $id) {
      _id
    }
  }
`;
