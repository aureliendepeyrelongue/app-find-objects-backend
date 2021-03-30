const mongoose = require("mongoose");

const ObjectSchema = mongoose.Schema({
  state: {
    type: String,
    required: true,
    enum: ["Perdu", "Trouvé"],
  },
  location: {
    type: String,
    required: true,
    enum: ["Adresse", "Transport", "Aéroport", "Mairie/Police"],
  },
  category: {
    type: String,
    required: true,
    enum: ["Adresse", "Transport", "Aéroport", "Mairie/Police"],
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
