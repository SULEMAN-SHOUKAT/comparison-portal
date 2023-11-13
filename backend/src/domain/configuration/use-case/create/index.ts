import Configuration, {
  type IPConfigurationPayload,
} from "../../Configurations";

import ConfigurationModel from "../../repository/ConfigurationModel";

const create = async (configurationPayload: IPConfigurationPayload) => {
  const newConfig = await ConfigurationModel.create(configurationPayload);
  const configuration = new Configuration(newConfig);
  return configuration.get();
};

export default create;
