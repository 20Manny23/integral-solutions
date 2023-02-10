const { AuthenticationError } = require("apollo-server-express");
const { Schedule, Client, Employee, Hour } = require("../models");
const { signToken } = require("../utils/auth");
const bcrypt = require("bcrypt");

let expiration = "2h"; // 2 hours

const resolvers = {
  Query: {
    // me: async (parent, { _id }, context) => {
    //   // if (context.user) {
    //   return User.findById({ _id }).populate("locations");
    //   // }
    //   // throw new AuthenticationError("You need to be logged in!");
    // },

    clients: async (parent, { isDisplayable }, context) => {
      // if (context.user) {

      return Client.find({ isDisplayable })
        .sort({ createdAt: -1 })
        .populate({ path: "schedule", populate: { path: "client" } });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    client: async (parent, { _id }, context) => {
      // if (context.user) {
      return Client.findOne({ _id }).populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employees: async (parent, { isDisplayable }, context) => {
      // if (context.user) {

      return Employee.find({ isDisplayable })
        .populate("hour")
        .populate({
          path: "schedule",
          populate: { path: "client" },
        });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employeeByEmail: async (parent, { email }, context) => {
      // if (context.user) {
      return Employee.findOne({ email: email }).populate({
        path: "schedule",
        populate: { path: "client" },
      });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // employeeById: async (parent, { _id, isDisplayable }, context) => {
    // return Employee.findOne({ _id: _id, schedule: { isDisplayable: isDisplayable } }).populate({

    employeeById: async (parent, { _id }, context) => {
      //fix
      // if (context.user) {
      return Employee.findOne({ _id }).populate({
        //fix
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
      return Hour.findOne({ _id }).populate("employee");
      // throw new AuthenticationError("You need to be logged in!");
    },

    hoursByEmployeeId: async (parent, { employee }, context) => {
      // if (context.user) {
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

    //section schedule/job
    schedules: async (parent, { isDisplayable }, context) => {
      // if (context.user) {
      return Schedule.find({ isDisplayable })
        .populate("employees")
        .populate("client");
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

    sendEmail: async (parent, args, context) => {
      const sgMail = require("@sendgrid/mail");
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

      let message = `Your information was sent to Integral Solutions. A represenative will be in touch soon.`;

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
        isDisplayable,
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
        isDisplayable,
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

    //(b) search for employee id and date; this is an upsert; if not in db, create else update the record
    updateHourByEmployeeIdByJobDate: async (
      parent,
      { jobDate, startTime, endTime, hoursWorked, employee },
      context
    ) => {
      // if (context.user) {
      return Hour.findOneAndUpdate(
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
          new: true,
        }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteHours: async (parent, { employee, jobDate }, context) => {
      return Hour.findOneAndDelete({ employee, jobDate });
    },

    updateEmployeeHour: async (parent, { _id, hour }, context) => {
      // if (context.user) {
      return Employee.findOneAndUpdate(
        { _id },
        {
          $addToSet: { hour },
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
        isAdmin,
        isLocked,
        isDisplayable,
        hasDriversLicense,
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
        isAdmin,
        isLocked,
        isDisplayable,
        hasDriversLicense,
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
        hasDriversLicense,
      },
      context
    ) => {
      // if (context.user) {
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
      { _id, firstName, lastName, email, phone, hasDriversLicense },
      context
    ) => {
      // if (context.user) {
      return Employee.findOneAndUpdate(
        { _id },
        {
          firstName,
          lastName,
          email,
          phone,
          hasDriversLicense,
        },
        { new: true }
      );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    updateEmployeeSchedule: async (parent, { _id, schedule }, context) => {
      // if (context.user) {
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

      const employee = await Employee.findById(employeeId);

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
        isDisplayable,
      },
      context
    ) => {
      // if (context.user) {)
      const schedule = await Schedule.create({
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
        isDisplayable,
      });
      return schedule
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    deleteSchedule: async (parent, { _id }, context) => {
      // if (context.user) {
      return Schedule.findOneAndDelete({ _id });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // soft delete employee
    softDeleteSchedule: async (parent, { _id, isDisplayable }, context) => {
      // if (context.user) {

      return Schedule.findOneAndUpdate(
        { _id },
        {
          isDisplayable,
        }
      );

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
