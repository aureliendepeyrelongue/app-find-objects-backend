const mongoose = require("mongoose");

const ObjectSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    enum: ["lost", "found"],
  },
  location: {
    value: {
      type: String,
      required: true,
      enum: ["address", "transport", "airport", "police"],
    },
    locationAddress: {
      city: {
        type: String,
        required: true,
      },
      zipcode: {
        type: Number,
        required: true,
      },
      street: {
        type: String,
        required: true,
      },
    },
  },
  category: {
    value: {
      type: String,
      required: true,
      enum: ["keys", "phone", "book", "watch"],
    },
    description: {
      type: String,
    },
  },

  when: {
    type: Date,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Objects", ObjectSchema);
