import Configuration from "../../Configurations";

import ConfigurationModel from "../../repository/ConfigurationModel";

export type ConfigurationFilter = {
  page: number;
  pageSize: number;
};

const getByFilter = async ({ page, pageSize }: ConfigurationFilter) => {
  const skip = (page - 1) * pageSize;

  const totalDocuments = await ConfigurationModel.countDocuments();
  const totalPages = Math.ceil(totalDocuments / pageSize);
  const configurations = await ConfigurationModel.find({})
    .skip(skip)
    .limit(pageSize);
  return {
    totalDocuments,
    totalPages,
    data:
      configurations && configurations.length
        ? configurations.map((conf) => {
            const configuration = new Configuration(conf);
            return configuration.get();
          })
        : null,
  };
};

export default getByFilter;
