import { initServer } from "@ts-rest/express";

import configurationApi from "./configuration";
import { contract as configurationApiContract } from "./configuration/contract";

const router = {
  ...configurationApi,
};

const contract = { ...configurationApiContract };

export default { router, contract };
