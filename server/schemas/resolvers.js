const { AuthenticationError } = require("apollo-server-express");
const {
  User,
  Location,
  Schedule,
  Client,
  Employee,
  Hour,
} = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");
const { deflateRaw } = require("zlib");

let expiration = "2h"; // 2 hours

const resolvers = {
  Query: {
    // users: async (parent, args, context) => {
    //   // if (context.user) {
    //   return User.find().populate("locations");
    //   // }
    //   // throw new AuthenticationError("You need to be logged in!");
    // },

    // user: async (parent, { userId }, context) => {
    //   if (context.user) {
    //     return User.findOne({ _id: userId });
    //   }
    //   throw new AuthenticationError("You need to be logged in!");
    // },

    me: async (parent, { _id }, context) => {
      // if (context.user) {
      return User.findById({ _id }).populate("locations");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    clients: async (parent, { isDisplayable }, context) => {
      // if (context.user) {

      // console.log("client soft displayable resolver = ", isDisplayable);

      return Client.find({ isDisplayable })
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

    // commented out; use query below to only get isDisplayable = true
    // employees: async (parent, args, context) => {
    //   // if (context.user) {
    //   return Employee.find().populate({
    //     path: "hour",
    //     path: "schedule",
    //     populate: { path: "client" },
    //   });
    //   // return Employee.find().populate("schedule");
    //   // }
    //   // throw new AuthenticationError("You need to be logged in!");
    // },

    employees: async (parent, { isDisplayable }, context) => {
      // if (context.user) {

      // console.log("employee displayable resolver = ", isDisplayable);

      return Employee.find({ isDisplayable }).populate({
        path: "hour",
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
      console.log("employee by id", _id);
      return Employee.findOne({ _id }).populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    //section hour queries
    hours: async (parent, args, context) => {
      // if (context.user) {
      return Hour.find().populate("employee");
      // throw new AuthenticationError("You need to be logged in!");
    },

    hoursById: async (parent, { _id }, context) => {
      // if (context.user) {
      console.log("resolver hours by id = ", _id);
      return Hour.findOne({ _id }).populate("employee");
      // throw new AuthenticationError("You need to be logged in!");
    },

    hoursByEmployeeId: async (parent, { employee }, context) => {
      // if (context.user) {
      console.log("resolver hours by employee id = ", employee);
      return Hour.find({ employee: employee }).populate("employee");
      // throw new AuthenticationError("You need to be logged in!");
    },

    hoursByEmployeeIdByJobDate: async (
      parent,
      { employee, jobDate },
      context
    ) => {
      // if (context.user) {
      console.log(
        "resolver hours by employee id by job date = ",
        employee,
        jobDate
      );
      return Hour.find({ employee: employee, jobDate: jobDate }).populate(
        "employee"
      );
      // throw new AuthenticationError("You need to be logged in!");
    },

    schedules: async (parent, args, context) => {
      // if (context.user) {
      return Schedule.find().populate("employees").populate("client");
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

    sendEmail: async (parent, args, context) => {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      let message = `Your information was sent to Integral Solutions. A represenative will be in touch soon.`;
      // console.log('lazy query');
      console.log("args from = ", args.fromEmail);
      console.log("args to = ", args.toEmail);

      const msg = {
        to: args.toEmail ? `${args.toEmail}` : "callasteven@gmail.com",
        from: args.fromEmail ? `${args.fromEmail}` : "callasteven@gmail.com",
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
          message = "Something went wrong. Give us a call at 555-555-1212.";
        });

      // console.log(message)
      return message;
    },
  },

  Mutation: {
    signupEmployee: async (parent, { email, password }, context) => {
      const employee = await Employee.create({ email, password });

      expiration = "2h"; // 15 minutes
      const token = signToken(employee, expiration);

      return { token, employee };
    },

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

      expiration = 900; // 15 minutes
      const token = signToken(employee, expiration);
      // const token = signToken(employee);

      return { token, employee };
    },

    updatePassword: async (parent, { _id, password }, context) => {
      // if (context.user) {
      console.log("resolver update password = ", _id, password);
      return Employee.findOneAndUpdate(
        { _id },
        {
          password,
        }
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

    // soft delete client
    softDeleteClient: async (parent, { _id, isDisplayable }, client) => {
      // if (context.user) {

      console.log("resolve soft delete client = ", _id, isDisplayable);

      return Client.findOneAndUpdate(
        { _id },
        {
          isDisplayable,
        }
      );
      
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

    // SECTION HOUR
    addHour: async (
      parent,
      { jobDate, startTime, endTime, hoursWorked, employee },
      context
    ) => {
      const hour = await Hour.create({
        jobDate,
        startTime,
        endTime,
        hoursWorked,
        employee,
      });
      return (
        {
          hour,
        },
        { new: true }
      );
    },

    //(a) return hours id after record created; attach to element; pass back on 2nd+ click
    //(b) search for employee id and date... and update the record
    updateHourByEmployeeIdByJobDate: async (
      parent,
      { jobDate, startTime, endTime, hoursWorked, employee },
      context
    ) => {
      // if (context.user) {
      console.log("resolver hours update = ");

      // let hour = await Hour.find({
      //   employee: employee,
      //   jobDate: jobDate,
      // }).populate("employee");
      // let hourId = hour[0]._id;

      // console.log("test = ", hour);
      // console.log("test = ", hour[0]._id);

      return Hour.findOneAndUpdate(
        // { _id: hourId },
        { employee, jobDate },
        {
          jobDate,
          startTime,
          endTime,
          hoursWorked,
          employee,
        },
        {
          upsert: true,
        }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteHours: async (parent, { employee, jobDate }, context) => {
      return Hour.findOneAndDelete({ employee, jobDate });
    },

    // SECTION EMPLOYEE
    addEmployee: async (
      parent,
      { email, password, firstName, lastName, phone, isAdmin, isLocked },
      context
    ) => {
      // if (context.user) {
      const employee = await Employee.create({
        email,
        password,
        firstName,
        lastName,
        phone,
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

    // soft delete employee
    softDeleteEmployee: async (parent, { _id, isDisplayable }, context) => {
      // if (context.user) {
      console.log("resolve soft delete employee = ", _id, isDisplayable);

      return Employee.findOneAndUpdate(
        { _id },
        {
          isDisplayable,
        }
      );
      
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
        isAdmin,
        isLocked,
        schedule,
        hours,
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
      { _id, firstName, lastName, email, phone },
      context
    ) => {
      // if (context.user) {
      console.log(
        "resolver update employee form = ",
        _id,
        firstName,
        lastName,
        email,
        phone
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

    // removes job/schedule from the employee schedule array
    removeEmployeeSchedule: async (parent, { _id, schedule }, context) => {
      // if (context.user) {
      console.log("resolver update employee schedule = ", _id, schedule);
      return Employee.findOneAndUpdate(
        { _id },
        {
          $pull: { schedule },
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // toggleAdmin mutation that returns a success/fail message
    toggleAdmin: async (parent, { employeeId }) => {
      let message = "No such user exists";

      console.log("employee id = ", employeeId);

      const employee = await Employee.findById(employeeId);

      console.log("employee = ", employee);

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
