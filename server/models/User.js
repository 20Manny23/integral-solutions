const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Must use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    cell: {
      type: String,
    },
    isManager: {
      type: Boolean,
      default: false,
    },
    // availability: [availabilitySchema],
    availability: {
      userEmail: {
        type: String,
      },
      mondayAm: {
        type: Boolean,
      },
      mondayPm: {
        type: Boolean,
      },
      tuesdayAm: {
        type: Boolean,
      },
      tuesdayPm: {
        type: Boolean,
      },
      wednesdayAm: {
        type: Boolean,
      },
      wednesdayPm: {
        type: Boolean,
      },
      thursdayAm: {
        type: Boolean,
      },
      thursdayPm: {
        type: Boolean,
      },
      fridayAm: {
        type: Boolean,
      },
      fridayPm: {
        type: Boolean,
      },
      saturdayAm: {
        type: Boolean,
      },
      saturdayPm: {
        type: Boolean,
      },
      sundayAm: {
        type: Boolean,
      },
      sundayPm: {
        type: Boolean,
      },
    },
    // locations: [
    //   {
    //     type: String,
    //   },
    // ],

    locations: {
      type: Schema.Types.Array,
      ref: "Location",
    },
  },

  // locations: [Location.schema]
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const User = model("User", userSchema);

module.exports = User;
