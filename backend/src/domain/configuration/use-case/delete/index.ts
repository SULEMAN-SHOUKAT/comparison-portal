import ConfigurationModel from "../../repository/ConfigurationModel";

const deleteConfig = (_id: string) => ConfigurationModel.deleteOne({ _id });

export default deleteConfig;
