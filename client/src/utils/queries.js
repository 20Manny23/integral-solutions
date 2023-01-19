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
  query getAllClients {
    clients {
      _id
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
  query getSchedule {
    schedules {
      _id
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
export const SEND_EMAIL_CONTACT_US = gql`
  query contactUs(
    $companyName: String
    $contactName: String      
    $phoneNumber: String
    $emailAddress: String
    $address: String
    $city: String
    $state: String
    $zip: String
    $squareFeet: String
    $employeeNumber: String
    $startDate: String
    $jobDetails: String
    $services: [String]
  ) {
    sendEmailContactUs(
      companyName: $companyName,
      contactName: $contactName,
      phoneNumber: $phoneNumber,
      emailAddress: $emailAddress,
      address: $address,
      city: $city,
      state: $state,
      zip: $zip,
      squareFeet: $squareFeet,
      employeeNumber: $employeeNumber,
      startDate: $startDate,
      jobDetails: $jobDetails,
      services: $services,
    )
  }
`;

export const SEND_EMAIL = gql`
  query emailContent(
    $toEmail: String
    $fromEmail: String
    $subject: String
    $textContent: String
    $htmlContent: String      
  ) {
    sendEmail(
      toEmail: $toEmail,
      fromEmail: $fromEmail,
      subject: $subject,
      textContent: $textContent,
      htmlContent: $htmlContent,
    )
  }
`;

// SECTION LEGACY CODE
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
