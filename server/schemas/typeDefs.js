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
  }

  type Employee {
    _id: ID
    email: String
    password: String
    firstName: String
    lastName: String
    phone: String
    isAdmin: Boolean
    isLocked: Boolean
    schedule: [Schedule]
    isDisplayable: Boolean
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
    isDisplayable: Boolean
  }

  type Auth {
    token: ID!
    user: User
    employee: Employee
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
    isDisplayable: Boolean

  }

  type Hour {
    _id: ID
    jobDate: String
    startTime: String
    endTime: String
    hoursWorked: String
    employee: Employee
  }

  type Query {
    users: [User]!
    user(email: String!): User
    me(_id: ID!): User
    #clients: [Client]!
    clients(isDisplayable: Boolean): [Client]!
    client(_id: ID!): Client
    #employees: [Employee]!
    employees(isDisplayable: Boolean): [Employee]!
    employeeByEmail(email: String!): Employee
    employeeById(_id: ID!): Employee
    #schedules: [Schedule]
    schedules(isDisplayable: Boolean): [Schedule]!
    schedule(scheduleId: ID!): Schedule

    hours: [Hour]
    hoursById(_id: ID!): Hour
    hoursByEmployeeId(employee: ID!): [Hour]
    hoursByEmployeeIdByJobDate(employee: ID!, jobDate: String): [Hour]
  }

  # SECTION SEND EMAILS
  type Query {
    # should be able to delete this query
    #sendEmailContactUs(
     # companyName: String
      #contactName: String
      #phoneNumber: String
      #emailAddress: String
      #address: String
     # city: String
      #state: String
      #zip: String
     #squareFeet: String
      #employeeNumber: String
      #startDate: String
      #jobDetails: String
      #services: [String]
    #): String

    # send email via SendGrid
    sendEmail(
      toEmail: String
      fromEmail: String
      subject: String
      textContent: String
      htmlContent: String
    ): String
  }

  type Mutation {
    # SECTION LOGIN & RESET PASSWORD
    login(email: String!, password: String!): Auth

    forgotPassword(email: String!, password: String!): Auth

    updatePassword(_id: ID, password: String): Employee

    # SECTION CLIENT
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

    softDeleteClient(_id: ID!, isDisplayable: Boolean): Client

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

    updateClientSchedule(_id: ID, schedule: String): Client

    # SECTION EMPLOYEE
    addEmployee(
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
      isAdmin: Boolean
      isLocked: Boolean
    ): Employee

    signupEmployee(email: String, password: String): Auth

    deleteEmployee(_id: ID!): Employee

    softDeleteEmployee(_id: ID!, isDisplayable: Boolean): Employee

    updateEmployee(
      _id: ID
      email: String
      password: String
      firstName: String
      lastName: String
      phone: String
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

    updateEmployeeSchedule(_id: ID, schedule: String): Employee

    removeEmployeeSchedule(_id: ID, schedule: String): Employee

    toggleAdmin(employeeId: ID!): Message

    toggleLocked(employeeId: ID!): Message

    # SECTION HOURS
    addHour(
      jobDate: String
      startTime: String
      endTime: String
      hoursWorked: String
      employee: String
    ): Hour

    updateHourByEmployeeIdByJobDate(
      jobDate: String
      startTime: String
      endTime: String
      hoursWorked: String
      employee: String
    ): Hour

    deleteHours(employee: String, jobDate: String): Hour

    # SECTION SCHEDULE / JOB
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

    softDeleteSchedule(_id: ID!, isDisplayable: Boolean): Schedule

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
