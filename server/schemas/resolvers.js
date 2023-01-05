const { AuthenticationError } = require("apollo-server-express");
const { User, Location, Incident, Event, Schedule, Client, Employee } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      // if (context.user) {
        return User.find().populate("locations");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    schedule: async (parent, args, context) => {
      // if (context.user) {
        return Schedule.find().populate("users").populate("location");
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
        return Client.find().sort({ createdAt: -1 });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    client: async (parent, { clientId }, context) => {
      // if (context.user) {
        return Client.findOne({ _id: clientId });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employees: async (parent, args, context) => {
      // if (context.user) {
        return Employee.find().populate("schedule");
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    employee: async (parent, { email }, context) => {
      // if (context.user) {
        return Employee.findOne({ email: email });
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    // me: async (parent, { _id }, context) => {
    //   // if (context.user) {
    //     return Employee.findById({ _id }).populate("schedule");
    //   // }
    //   // throw new AuthenticationError("You need to be logged in!");
    // },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
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

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user found with this email address");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);

      return { token, user };
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

    addClient: async (parent, { businessName, streetAddress, suite, city, state, zip, contact, phone, email }, context) => {
      // if (context.user) {
      const user = await Client.create({ businessName, streetAddress, suite, city, state, zip, contact, phone, email });
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
        email
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
            email
          },
          { new: true }
        );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },

    addEmployee: async (parent, { username, email, password, firstName, lastName, phone, isManager }, context) => {
      // if (context.user) {
      const user = await Employee.create({ username, email, password, firstName, lastName, phone, isManager });
      return { email }, 
      { new: true};
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
        username, 
        email, 
        password, 
        firstName, 
        lastName, 
        phone, 
        isManager
      },
      context
    ) => {
      // if (context.user) {
        return Employee.findOneAndUpdate(
          { _id },
          {
            username, 
            email, 
            password, 
            firstName, 
            lastName, 
            phone, 
            isManager
          },
          { new: true }
        );
      // }
      // throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
