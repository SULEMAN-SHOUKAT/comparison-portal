import mongoose from "mongoose";
import config from "config";

const ConfigurationModel = require("../domain/configuration/repository/ConfigurationModel");

const connectDb = async () => {
  console.log("connecting to MongoDB", config.db.url);
  return mongoose
    .connect(config.db.url)
    .then(() => console.log("successfully connected to mongoDB"))
    .catch((error) => {
      console.error("failed to connect to mongoDB", error);
      setTimeout(connectDb, 5000);
    });
};

export default {
  connectDb,
  ConfigurationModel,
};
