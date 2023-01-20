const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Location,
  Incident,
  Event,
  Schedule,
  Client,
  Employee,
} = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const { addAbortSignal } = require("stream");

let expiration = "2h"; // 2 hours

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      // if (context.user) {
      return User.find().populate("locations");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    user: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOne({ _id: userId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    me: async (parent, { _id }, context) => {
      // if (context.user) {
      return User.findById({ _id }).populate("locations");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    locations: async (parent, args, context) => {
      // if (context.user) {
      return Location.find().sort({ createdAt: -1 });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    location: async (parent, { locationId }, context) => {
      // if (context.user) {
      return Location.findOne({ _id: locationId });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    incidents: async (parent, args, context) => {
      // if (context.user) {
      return Incident.find();
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    events: async (parent, args, context) => {
      // if (context.user) {
      return Event.find();
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    clients: async (parent, args, context) => {
      // if (context.user) {
      return Client.find()
        .sort({ createdAt: -1 })
        .populate({ path: "schedule", populate: { path: "client" } });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    client: async (parent, { _id }, context) => {
      // if (context.user) {

      console.log("resolver = ", _id);

      return Client.findOne({ _id }).populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employees: async (parent, args, context) => {
      // if (context.user) {
      return Employee.find().populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // return Employee.find().populate("schedule");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employeeByEmail: async (parent, { email }, context) => {
      console.log(email);
      // if (context.user) {
      return Employee.findOne({ email: email }).populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employeeById: async (parent, { _id }, context) => {
      // if (context.user) {

        console.log('employee by id', _id);
        
      return Employee.findOne({ _id }).populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // me: async (parent, { _id }, context) => {
    //   // if (context.user) {
    //     return Employee.findById({ _id }).populate("schedule");
    //   // }
    //   // throw new AuthenticationError("You need to be logged in!");
    // },

    schedules: async (parent, args, context) => {
      // if (context.user) {
      return Schedule.find().populate("employees").populate("client");
      // return Schedule.find().populate("users").populate("location");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    schedule: async (parent, { scheduleId }, context) => {
      // if (context.user) {
      return Schedule.findOne({ _id: scheduleId })
        .populate("employees")
        .populate("client");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    sendEmailContactUs: async (parent, args, context) => {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      let message = `Your information was sent to Integral Solutions. A represenative will be in touch soon.`;

      console.log('lazy query');
      console.log('args = ', args);

      const msg = {
        to: "callasteven@gmail.com", // Change to your recipient
        from: "callasteven@gmail.com", // Change to your verified sender
        subject: `Contact Us: ${args.companyName}, Start: ${args.startDate} Services: ${args.services}`,
        text: `
        Company Name: ${args.companyName}
        Email Address: ${args.emailAddress} 
        Contact Name: ${args.ontactName}
        Phone Number: ${args.phoneNumber}
        Address: ${args.address}, ${args.city}, ${args.state} ${args.zip}
        Square Feet: ${args.squareFeet} 
        Employee Number: ${args.employeeNumber} 
        Start Date: ${args.startDate}
        Services Needed: ${args.services}
        Job Details: ${args.jobDetails}`,
        html: `
        <p>Company Name: ${args.companyName}</p>
        <p>Email Address: ${args.emailAddress}</p>
        <p>Contact Name: ${args.contactName}</p>
        <p>Phone Number: ${args.phoneNumber}</p>
        <p>Address: ${args.address}, ${args.city}, ${args.state} ${args.zip}</p>
        <p>Square Feet: ${args.squareFeet} </p>
        <p>Employee Number: ${args.employeeNumber} </p>
        <p>Start Date: ${args.startDate}</p>
        <p>Services Needed: ${args.services}</p>
        <p>Job Details: ${args.jobDetails}</p>`,
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response.body.errors);
          message = "Something went wrong. Give us a call at 555-555-1212."
        });

        console.log(message)
        return message;
    },

    sendEmail: async (parent, args, context) => {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      let message = `Your information was sent to Integral Solutions. A represenative will be in touch soon.`;

      console.log(args);

      console.log('lazy query');
      console.log('args = ', args);

      const msg = {
        to: args.toEmail ? `${args.toEmail}` : 'callasteven@gmail.com',
        from: args.fromEmail ? `${args.fromEmail}` : 'callasteven@gmail.com',
        subject: args.subject,
        text: args.textContent,
        html: args.htmlContent,
      };

      sgMail
        .send(msg)
        .then(() => {
          console.log("Email sent");
        })
        .catch((error) => {
          console.error(error);
          console.error(error.response.body.errors);
          message = "Something went wrong. Give us a call at 555-555-1212."
        });

        console.log(message)
        return message;
    },
  },

  Mutation: {
    // addUser: async (parent, { username, email, password }, context) => {
    //   const user = await User.create({ username, email, password });
    //   const token = signToken(user);
    //   return { token, user };
    // },

    signupEmployee: async (parent, { email, password }, context) => {
      const employee = await Employee.create({ email, password });

      expiration = "2h"; // 15 minutes
      const token = signToken(employee, expiration);
      return { token, employee };
    },

    deleteUser: async (parent, { _id }, context) => {
      // if (context.user) {
      return User.findOneAndDelete({ _id });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addIncident: async (
      parent,
      {
        employeeName,
        locationName,
        employeePhone,
        subject,
        urgent,
        incidentDetails,
      },
      context
    ) => {
      // if (context.user) {
      return Incident.create({
        employeeName,
        locationName,
        employeePhone,
        subject,
        urgent,
        incidentDetails,
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteIncident: async (parent, { _id }, context) => {
      // if (context.user) {
      return Incident.findOneAndDelete({ _id });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // login: async (parent, { email, password }) => {
    //   const user = await User.findOne({ email });

    //   if (!user) {
    //     throw new AuthenticationError("No user found with this email address");
    //   }

    //   const correctPw = await user.isCorrectPassword(password);

    //   if (!correctPw) {
    //     throw new AuthenticationError("Incorrect credentials");
    //   }

    //   const token = signToken(user);

    //   return { token, user };
    // },

    login: async (parent, { email, password }) => {
      console.log("login ", email);

      const employee = await Employee.findOne({ email });

      if (!employee) {
        throw new AuthenticationError("No email found with this email address");
      }

      const correctPw = await employee.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      expiration = "2h"; // 15 minutes
      const token = signToken(employee, expiration);
      // const token = signToken(employee);

      return { token, employee };
    },

    forgotPassword: async (parent, { email, password }) => {
      const employee = await Employee.findOne({ email });

      if (!employee) {
        throw new AuthenticationError("Email address not found.");
      }

      // const correctPw = await employee.isCorrectPassword(password);

      // if (!correctPw) {
      //   throw new AuthenticationError("Incorrect credentials");
      // }
      expiration = 900; // 15 minutes
      const token = signToken(employee, expiration);
      // const token = signToken(employee);

      return { token, employee };
    },

    updateAvailability: async (
      parent,
      {
        _id,
        mondayAm,
        mondayPm,
        tuesdayAm,
        tuesdayPm,
        wednesdayAm,
        wednesdayPm,
        thursdayAm,
        thursdayPm,
        fridayAm,
        fridayPm,
        saturdayAm,
        saturdayPm,
        sundayAm,
        sundayPm,
      },
      context
    ) => {
      // if (context.user) {
      return User.findOneAndUpdate(
        { _id },
        {
          availability: {
            mondayAm,
            mondayPm,
            tuesdayAm,
            tuesdayPm,
            wednesdayAm,
            wednesdayPm,
            thursdayAm,
            thursdayPm,
            fridayAm,
            fridayPm,
            saturdayAm,
            saturdayPm,
            sundayAm,
            sundayPm,
          },
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // SECTION client
    addClient: async (
      parent,
      {
        businessName,
        streetAddress,
        suite,
        city,
        state,
        zip,
        contact,
        phone,
        email,
      },
      context
    ) => {
      // if (context.user) {
      const user = await Client.create({
        businessName,
        streetAddress,
        suite,
        city,
        state,
        zip,
        contact,
        phone,
        email,
      });
      return { businessName };
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteClient: async (parent, { _id }, context) => {
      // if (context.user) {
      return Client.findOneAndDelete({ _id });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateClient: async (
      parent,
      {
        _id,
        businessName,
        streetAddress,
        suite,
        city,
        state,
        zip,
        contact,
        phone,
        email,
      },
      context
    ) => {
      // if (context.user) {
      return Client.findOneAndUpdate(
        { _id },
        {
          businessName,
          streetAddress,
          suite,
          city,
          state,
          zip,
          contact,
          phone,
          email,
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateClientSchedule: async (parent, { _id, schedule }, context) => {
      // if (context.user) {
      console.log("resolver update client schedule = ", _id, schedule);
      return Client.findOneAndUpdate(
        { _id },
        {
          $addToSet: { schedule },
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // SECTION EMPLOYEE
    addEmployee: async (
      parent,
      {
        email,
        password,
        firstName,
        lastName,
        phone,
        isManager,
        isAdmin,
        isLocked,
      },
      context
    ) => {
      // if (context.user) {
      const employee = await Employee.create({
        email,
        password,
        firstName,
        lastName,
        phone,
        isManager,
        isAdmin,
        isLocked,
      });
      const token = signToken(employee, expiration);
      return { token, employee, email }, { new: true };
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteEmployee: async (parent, { _id }, context) => {
      // if (context.user) {
      return Employee.findOneAndDelete({ _id });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateEmployee: async (
      parent,
      {
        _id,
        email,
        password,
        phone,
        firstName,
        lastName,
        isManager,
        isAdmin,
        isLocked,
        schedule,
      },
      context
    ) => {
      // if (context.user) {
      console.log(
        "resolver update employee = ",
        _id,
        email,
        password,
        firstName,
        lastName,
        phone,
        isManager,
        isAdmin,
        isLocked,
        schedule
      );
      return Employee.findOneAndUpdate(
        { _id },
        {
          email,
          password,
          firstName,
          lastName,
          phone,
          isManager,
          isAdmin,
          isLocked,
          schedule,
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateEmployeeForm: async (
      parent,
      {
        _id,
        firstName,
        lastName,
        email,
        phone,
      },
      context
    ) => {
      // if (context.user) {
      console.log(
        "resolver update employee form = ",
        _id,
        firstName,
        lastName,
        email,
        phone,
      );
      return Employee.findOneAndUpdate(
        { _id },
        {
          firstName,
          lastName,
          email,
          phone,
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateEmployeeSchedule: async (parent, { _id, schedule }, context) => {
      // if (context.user) {
      console.log("resolver update employee schedule = ", _id, schedule);
      return Employee.findOneAndUpdate(
        { _id },
        {
          $addToSet: { schedule },
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // SECTION TOGGLE RESOLVERS
    // toggleAdmin mutation that returns a success/fail message
    toggleAdmin: async (parent, { employeeId }) => {
      let message = "No such user exists";

      console.log('employee id = ', employeeId)
      
      const employee = await Employee.findById(employeeId);

      console.log('employee = ', employee);

      if (employee) {
        try {
          employee.isAdmin = !employee.isAdmin;
          employee.save();
          message = employee.isAdmin
            ? `${employee.firstName} ${employee.lastName} is now an administrator.`
            : `${employee.firstName} ${employee.lastName} is no longer an administrator.`;
        } catch {
          message = `${employee.firstName} ${employee.lastName} update failed.`;
        }
      }
      return { message, employee };
    },

    // toggleLocked mutation that returns a success/fail message
    toggleLocked: async (parent, { employeeId }) => {
      let message = "No such employee exists";
      const employee = await Employee.findById(employeeId);
      if (employee) {
        try {
          employee.isLocked = !employee.isLocked;
          employee.save();
          message = employee.isLocked
            ? `${employee.firstName} ${employee.lastName} is now locked.`
            : `${employee.firstName} ${employee.lastName} is no longer locked.`;
        } catch {
          message = `${employee.firstName} ${employee.lastName} update failed.`;
        }
      }
      return { message, employee };
    },

    // SECTION SCHEDULE
    addSchedule: async (
      parent,
      {
        _id,
        streetAddress,
        suite,
        city,
        state,
        zip,
        startDate,
        endDate,
        startTime,
        endTime,
        squareFeet,
        jobDetails,
        numberOfClientEmployees,
        client,
        employees,
      },
      context
    ) => {
      // _id, streetAddress, suite, city, state, zip, startDate, endDate, startTime, endTime, squareFeet, jobDetails, numberOfClientEmployees, client, employees
      // if (context.user) {
      const user = await Schedule.create({
        _id,
        streetAddress,
        suite,
        city,
        state,
        zip,
        startDate,
        endDate,
        startTime,
        endTime,
        squareFeet,
        jobDetails,
        numberOfClientEmployees,
        client,
        employees,
      });
      return {
        _id,
        streetAddress,
        suite,
        city,
        state,
        zip,
        startDate,
        endDate,
        startTime,
        endTime,
        squareFeet,
        jobDetails,
        numberOfClientEmployees,
        client,
        employees,
      };
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteSchedule: async (parent, { _id }, context) => {
      // if (context.user) {
      return Schedule.findOneAndDelete({ _id });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateSchedule: async (
      parent,
      {
        _id,
        streetAddress,
        suite,
        city,
        state,
        zip,
        startDate,
        endDate,
        startTime,
        endTime,
        squareFeet,
        jobDetails,
        numberOfClientEmployees,
        client,
        employees,
      },
      context
    ) => {
      // if (context.user) {
      return Schedule.findOneAndUpdate(
        { _id },
        {
          _id,
          streetAddress,
          suite,
          city,
          state,
          zip,
          startDate,
          endDate,
          startTime,
          endTime,
          squareFeet,
          jobDetails,
          numberOfClientEmployees,
          client,
          employees,
        }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
