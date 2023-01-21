const { gql } = require("apollo-server-express");

const typeDefs = gql`

  type User {
    _id: ID
    username: String
    email: String
    password: String
    firstName: String
    lastName: String
    cell: String
    isManager: Boolean
    availability: Availability
    locations: [Location]
  }

  type Employee {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    phone: String
    isManager: Boolean
    isAdmin: Boolean
    isLocked: Boolean
    schedule: [Schedule]
    hours: [Hour]
  }
  type Hour {
    _id: ID
    workDate: String
    hours: String
    
  }

  type Message {
    message: String!
    employee: Employee
  }

  type Schedule {
    _id: ID
    streetAddress: String
    suite: String
    city: String
    state: String
    zip: String
    startDate: String
    endDate: String
    startTime: String
    endTime: String
    squareFeet: String
    jobDetails: String
    numberOfClientEmployees: String
    client: Client
    employees: [Employee]
  }

  type Availability {
    mondayAm: Boolean
    mondayPm: Boolean
    tuesdayAm: Boolean
    tuesdayPm: Boolean
    wednesdayAm: Boolean
    wednesdayPm: Boolean
    thursdayAm: Boolean
    thursdayPm: Boolean
    fridayAm: Boolean
    fridayPm: Boolean
    saturdayAm: Boolean
    saturdayPm: Boolean
    sundayAm: Boolean
    sundayPm: Boolean
  }

  type Auth {
    token: ID!
    user: User
    employee: Employee
  }

  type Location {
    _id: ID
    businessName: String
    address: String
    businessContact: String
    shifts: String
    daysOfWeek: String
    startTime: String
    laborHours: Float
    instructions: Instructions
  }

  type Client {
    _id: ID
    businessName: String
    streetAddress: String
    suite: String
    city: String
    state: String
    zip: String
    contact: String
    phone: String
    email: String
    schedule: [Schedule]
  }

  type Instructions {
    facilityType: String
    cleaningType: String
    bathrooms: String
    lobby: String
    sittingArea: String
    breakRoom: String
    frontdesk: String
    appliances: String
    dusting: String
    windows: String
    trash: String
    vacuum: String
    mop: String
    additionalServices: String
    exclusions: String
  }

  type Event {
    _id: ID!
    title: String
    startTime: String
    endTime: String
    daysOfWeek: [Int]
    startRecur: String
    display: String
    backgroundColor: String
    textColor: String
  }

  type Incident {
    _id: ID
    employeeName: String
    locationName: String
    employeePhone: String
    subject: String
    urgent: String
    incidentDetails: String
  }

  type Query {
    users: [User]!
    user(email: String!): User
    me(_id: ID!): User
    locations: [Location]!
    location(locationId: ID!): Location
    hours: [Hour]!
    incidents: [Incident]!
    events: [Event]!
    clients: [Client]!
    client(_id: ID!): Client
    employees: [Employee]!
    employeeByEmail(email: String!): Employee
    employeeById(_id: ID!): Employee
    schedules: [Schedule]
    schedule(scheduleId: ID!): Schedule
  }

  type Query {
    sendEmailContactUs(
      companyName: String
      contactName: String    
      phoneNumber: String
      emailAddress: String
      address: String
      city: String
      state: String
      zip: String
      squareFeet: String
      employeeNumber: String
      startDate: String
      jobDetails: String
      services: [String]
    ): String 
  }

  type Query {
    sendEmail(    
      toEmail: String
      fromEmail: String
      subject: String
      textContent: String
      htmlContent: String  
    ): String 
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    forgotPassword(email: String!, password: String!): Auth

    updatePassword(
      _id: ID
      password: String
    ): Employee

    addUser(email: String!, password: String!): Auth
    deleteUser(_id: ID!): User
    updateAvailability(
      _id: ID!
      mondayAm: Boolean
      mondayPm: Boolean
      tuesdayAm: Boolean
      tuesdayPm: Boolean
      wednesdayAm: Boolean
      wednesdayPm: Boolean
      thursdayAm: Boolean
      thursdayPm: Boolean
      fridayAm: Boolean
      fridayPm: Boolean
      saturdayAm: Boolean
      saturdayPm: Boolean
      sundayAm: Boolean
      sundayPm: Boolean
    ): User

    addIncident(
      employeeName: String!
      locationName: String!
      employeePhone: String!
      subject: String!
      urgent: String!
      incidentDetails: String!
    ): Incident

    deleteIncident(_id: ID!): Incident

    addClient(
      businessName: String
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      contact: String
      phone: String
      email: String
    ): Client

    deleteClient(_id: ID!): Client

    updateClient(
      _id: ID!
      businessName: String
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      contact: String
      phone: String
      email: String
    ): Client

    updateClientSchedule(
      _id: ID
      schedule: String
    ): Client

    addEmployee(
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isManager: Boolean
      isAdmin: Boolean
      isLocked: Boolean
    ): Employee

    signupEmployee(
      email: String
      password: String
    ): Auth

    deleteEmployee(_id: ID!): Employee

    updateEmployee(
      _id: ID
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isManager: Boolean
      isAdmin: Boolean
      isLocked: Boolean
      schedule: String
      hours: String
    ): Employee

    updateEmployeeForm(
      _id: ID
      firstName: String
      lastName: String
      email: String
      phone: String
    ): Employee

    updateEmployeeSchedule(
      _id: ID
      schedule: String
    ): Employee

    toggleAdmin(employeeId: ID!): Message

    toggleLocked(employeeId: ID!): Message

    addHours(
      _id: ID
      hours: String
      workDate: String
    ): Hour

    updateHours(
      _id: ID
      hours: String
      workDate: String
    ): Hour

    updateEmployeeHours(
      _id: ID
      hours: String
      workDate: String
    ) : Employee

    deleteHours (_id: ID!): Hour

    addSchedule(
      _id: ID
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      startDate: String
      endDate: String
      startTime: String
      endTime: String
      squareFeet: String
      jobDetails: String
      numberOfClientEmployees: String
      client: String
      employees: [String]
    ): Schedule

    deleteSchedule(_id: ID!): Schedule
    
    updateSchedule(
      _id: ID
      streetAddress: String
      suite: String
      city: String
      state: String
      zip: String
      startDate: String
      endDate: String
      startTime: String
      endTime: String
      squareFeet: String
      jobDetails: String
      numberOfClientEmployees: String
      client: String
      employees: [String]
    ): Schedule
  }
`;

module.exports = typeDefs;
