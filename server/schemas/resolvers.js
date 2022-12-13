const { AuthenticationError } = require("apollo-server-express");
const { User, Location, Incident, Event } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    users: async (parent, args, context) => {
      if (context.user) {
        return User.find().populate("locations");
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    user: async (parent, { userId }, context) => {
      if (context.user) {
        return User.findOne({ _id: userId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    me: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findById({ _id }).populate("locations");
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    locations: async (parent, args, context) => {
      if (context.user) {
        return Location.find().sort({ createdAt: -1 });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    location: async (parent, { locationId }, context) => {
      if (context.user) {
        return Location.findOne({ _id: locationId });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    incidents: async (parent, args, context) => {
      if (context.user) {
        return Incident.find();
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    events: async (parent, args, context) => {
      if (context.user) {
        return Event.find();
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }, context) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    deleteUser: async (parent, { _id }, context) => {
      if (context.user) {
        return User.findOneAndDelete({ _id });
      }
      throw new AuthenticationError("You need to be logged in!");
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
      if (context.user) {
        return Incident.create({
          employeeName,
          locationName,
          employeePhone,
          subject,
          urgent,
          incidentDetails,
        });
      }
      throw new AuthenticationError("You need to be logged in!");
    },

    deleteIncident: async (parent, { _id }, context) => {
      if (context.user) {
        return Incident.findOneAndDelete({ _id });
      }
      throw new AuthenticationError("You need to be logged in!");
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
      if (context.user) {
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
      }
      throw new AuthenticationError("You need to be logged in!");
    },
  },
};

module.exports = resolvers;
