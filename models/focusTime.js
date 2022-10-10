const mongoose = require("mongoose");
require("dotenv").config();
const url = process.env.MONGODB_URI;

console.log("connecting to", url);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

const focusTimeSchema = new mongoose.Schema({
  userEmail: String,
  tagColor: String,
  intention: String,
  tag: String,
  date: String,
  localTime: String,
  length: String,
});

focusTimeSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("focusTime", focusTimeSchema);
