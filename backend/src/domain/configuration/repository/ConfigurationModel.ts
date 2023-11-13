import mongoose from "mongoose";
import { type IPConfiguration } from "../Configurations";

interface IConfigurationDocument extends IPConfiguration, Document {}

const ConfigurationSchema = new mongoose.Schema<IConfigurationDocument>(
  {
    companies: [
      {
        name: {
          type: String,
          required: true,
        },
        websiteUrl: {
          type: String,
          required: true,
        },
      },
    ],
    questions: [
      {
        type: String,
        required: true,
      },
    ],
    dataSources: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true, strict: true }
);

const ConfigurationsModel = mongoose.model(
  "configurations",
  ConfigurationSchema
);

export default ConfigurationsModel;
