// importing the mongoose
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    resetLink: {
      data: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// to remove a password from an instance
if (!usersSchema.options.toObject) usersSchema.options.toObject = {};
usersSchema.options.toObject.transform = function (doc, ret, options) {
  // delete the passworc and createdAt and UpdatedAt of every document before retuning the result
  delete ret.createdAt;
  delete ret.updatedAt;
  delete ret.__v;
  delete ret._id;
  return ret;
};

const User = mongoose.model("User", usersSchema);

module.exports = User;
