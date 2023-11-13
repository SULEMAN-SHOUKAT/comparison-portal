import Configuration from "../../Configurations";

import ConfigurationModel from "../../repository/ConfigurationModel";

const get = async (_id: string) => {
  const config = await ConfigurationModel.findOne({ _id });
  if (config) {
    const configuration = new Configuration(config);
    return configuration.get();
  }
  throw new Error("No record found");
};

export default get;
