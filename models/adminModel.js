const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  designation: {
    type: String
  },
  department: {
    type: String
  },
  isAdmin: {
    type: String,
    required: true
  },
  signature: {
    fileName: {
      type: String
    },
    filePath: {
      type: String
    }
  }
});

module.exports = Admin = mongoose.model("admins", AdminSchema);
