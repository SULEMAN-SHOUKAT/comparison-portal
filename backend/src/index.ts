import express from "express";
import config from "config";
import cors from "cors";
import { createExpressEndpoints } from "@ts-rest/express";

import client from "./client";
import api from "./api/http/index";
import utils from "./utils";

const app = express();
app.use(cors());
const port = process.env.PORT || config.port;
app.use(express.json());
app.use(config.baseRoute, utils.logHttpRequest);

createExpressEndpoints(api.contract, api.router, app);

const startApp = app.listen(port, () => {
  console.log("server is listening", {
    port: port,
    baseRoute: config.baseRoute,
  });
});

Promise.all([client.connectDb()])
  .then(() => startApp)
  .catch((error) => console.error("failed to start service", error));
