const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pdfSchema = new Schema({
  to: {
    type: String,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  pdf: {
    type: String,
    required: true
  },
  isApproved: {
    type: String,
    required: true
  }
});

module.exports = PdfSubmit = mongoose.model("pdfsubmit", pdfSchema);
