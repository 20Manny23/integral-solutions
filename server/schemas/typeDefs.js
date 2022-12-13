const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Schedule {
    _id: ID
  }

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
  }
`;

module.exports = typeDefs;
