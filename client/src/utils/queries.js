import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me($id: ID!) {
    me(_id: $id) {
      _id
      username
      email
      firstName
      isManager
      lastName
      availability {
        mondayAm
        mondayPm
        tuesdayAm
        tuesdayPm
        wednesdayAm
        wednesdayPm
        thursdayAm
        thursdayPm
        fridayAm
        fridayPm
        saturdayAm
        saturdayPm
        sundayAm
        sundayPm
      }
      locations {
        _id
        businessName
        address
        businessContact
        shifts
        daysOfWeek
        startTime
        laborHours
        instructions {
          facilityType
          cleaningType
          bathrooms
          lobby
          sittingArea
          breakRoom
          frontdesk
          appliances
          dusting
          windows
          trash
          vacuum
          mop
          additionalServices
          exclusions
        }
      }
    }
  }
`;

export const QUERY_SINGLE_LOCATION = gql`
  query getSingleLocation($locationId: ID!) {
    location(locationId: $locationId) {
      _id
      businessName
      businessContact
      address
    }
  }
`;

export const QUERY_LOCATIONS = gql`
  query allLocations {
    locations {
      _id
      businessName
      address
      businessContact
      shifts
      daysOfWeek
      startTime
      laborHours
      instructions {
        facilityType
        cleaningType
        bathrooms
        lobby
        sittingArea
        breakRoom
        frontdesk
        appliances
        dusting
        windows
        trash
        vacuum
        mop
        additionalServices
        exclusions
      }
    }
  }
`;

export const QUERY_INCIDENTS = gql`
  query allIncidents {
    incidents {
      _id
      employeeName
      locationName
      employeePhone
      subject
      urgent
      incidentDetails
    }
  }
`;

export const QUERY_USERS = gql`
  query allUsers {
    users {
      _id
      username
      email
      password
      firstName
      lastName
      cell
      isManager
      availability {
        mondayAm
        mondayPm
        tuesdayAm
        tuesdayPm
        wednesdayAm
        wednesdayPm
        thursdayAm
        thursdayPm
        fridayAm
        fridayPm
        saturdayAm
        saturdayPm
        sundayAm
        sundayPm
      }
    }
  }
`;

export const QUERY_EVENTS = gql`
  query events {
    events {
      _id
      title
      startTime
      endTime
      daysOfWeek
      startRecur
      display
      backgroundColor
      textColor
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
        startDate
        startTime
        endDate
        endTime
        jobDetails
        numberOfClientEmployees
        client {
          _id
          businessName
          streetAddress
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
  query getAllEmployees {
    employees {
      _id
      firstName
      lastName
      email
      phone
      isAdmin
      isLocked
      password
      username
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

export const QUERY_ALL_Clients= gql`
  query getAllClients {
    employees {
      _id
      firstName
      lastName
      email
      phone
      isAdmin
      isLocked
      password
      username
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