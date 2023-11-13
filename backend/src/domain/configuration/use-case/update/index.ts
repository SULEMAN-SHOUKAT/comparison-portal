import Configuration, {
  Company,
  DataSource,
  Question,
} from "../../Configurations";

import ConfigurationModel from "../../repository/ConfigurationModel";
import getUseCase from "../get";

export type ConfigurationUpdatePayload = {
  _id: string;
  companies?: Company[];
  questions?: Question[];
  dataSources?: DataSource[];
};

const makeUpdateQuery = (payload: ConfigurationUpdatePayload) => {
  let query = {};
  if (payload.companies) {
    query = { ...query, companies: payload.companies };
  }
  if (payload.questions) {
    query = { ...query, questions: payload.questions };
  }
  if (payload.dataSources) {
    query = { ...query, dataSources: payload.dataSources };
  }
  return query;
};

const doesConfigExist = (_id: string) => getUseCase(_id);

const update = async (payload: ConfigurationUpdatePayload) => {
  const update = {
    $set: {
      ...makeUpdateQuery(payload),
    },
  };
  doesConfigExist(payload._id);
  const result = await ConfigurationModel.updateOne(
    { _id: payload._id },
    update
  );
  const config = await getUseCase(payload._id);
  const configuration = new Configuration(config);
  return configuration.get();
};

export default update;
