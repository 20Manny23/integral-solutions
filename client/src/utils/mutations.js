import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
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

export const UPDATE_AVAILABILITY = gql`
  mutation updateAvailability(
    $id: ID!
    $mondayAm: Boolean
    $mondayPm: Boolean
    $tuesdayAm: Boolean
    $tuesdayPm: Boolean
    $wednesdayAm: Boolean
    $wednesdayPm: Boolean
    $thursdayAm: Boolean
    $thursdayPm: Boolean
    $fridayAm: Boolean
    $fridayPm: Boolean
    $saturdayAm: Boolean
    $saturdayPm: Boolean
    $sundayAm: Boolean
    $sundayPm: Boolean
  ) {
    updateAvailability(
      _id: $id
      mondayAm: $mondayAm
      mondayPm: $mondayPm
      tuesdayAm: $tuesdayAm
      tuesdayPm: $tuesdayPm
      wednesdayAm: $wednesdayAm
      wednesdayPm: $wednesdayPm
      thursdayAm: $thursdayAm
      thursdayPm: $thursdayPm
      fridayAm: $fridayAm
      fridayPm: $fridayPm
      saturdayAm: $saturdayAm
      saturdayPm: $saturdayPm
      sundayAm: $sundayAm
      sundayPm: $sundayPm
    ) {
      _id
    }
  }
`;
