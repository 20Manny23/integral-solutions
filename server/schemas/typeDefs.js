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
    username: String
    email: String
    password: String
    firstName: String
    lastName: String
    phone: String
    isManager: Boolean
    schedule: [Schedule]
  }

  type Schedule {
    _id: ID
    startDate: String
    endDate: String
    startTime: String
    endTime: String
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
    incidents: [Incident]!
    events: [Event]!
    clients: [Client]!
    client(clientId: ID!): Client
    employees: [Employee]!
    employee(email: String!): Employee
    schedules: [Schedule]
    schedule(scheduleId: ID!): Schedule
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
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
    addEmployee(
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isManager: Boolean
    ): Employee
    deleteEmployee(_id: ID!): Employee
    updateEmployee(
      _id: ID
      username: String
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isManager: Boolean
    ): Employee
    
    addSchedule(
      startDate: String
      endDate: String
      startTime: String
      endTime: String
      client: String
      employees: [String]
    ): Schedule
    deleteSchedule(_id: ID!): Schedule
    updateSchedule(
      _id: ID
      startDate: String
      endDate: String
      startTime: String
      endTime: String
      client: String
      employees: [String]
    ): Schedule
  }
`;

module.exports = typeDefs;
