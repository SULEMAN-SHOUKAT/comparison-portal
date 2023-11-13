import { initServer } from "@ts-rest/express";
import { contract, allConfigurationsQuerySchema } from "./contract";
import createUseCase from "../../../domain/configuration/use-case/create";
import getUseCase from "../../../domain/configuration/use-case/get";
import getByFilterUseCase from "../../../domain/configuration/use-case/get-by-filter";
import updateUseCase from "../../../domain/configuration/use-case/update";
import deleteUseCase from "../../../domain/configuration/use-case/delete";

const s = initServer();

const router = s.router(contract, {
  get: async ({ req }) => {
    try {
      const { id } = req.params;
      const configuration = await getUseCase(id);
      return {
        status: 200,
        body: configuration,
      };
    } catch (error) {
      return {
        status: 500,
        body: (error as Error).message,
      };
    }
  },
  getAll: async ({ req }) => {
    try {
      const { page, pageSize } = allConfigurationsQuerySchema.parse(req.query);
      const result = await getByFilterUseCase({
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      });
      return {
        status: 200,
        body: result,
      };
    } catch (error) {
      return {
        status: 500,
        body: (error as Error).message,
      };
    }
  },
  create: async ({ req }) => {
    try {
      const { companies, questions, dataSources } = req.body;
      const configuration = await createUseCase({
        companies,
        questions,
        dataSources,
      });

      return {
        status: 200,
        body: configuration,
      };
    } catch (error) {
      return {
        status: 500,
        body: (error as Error).message,
      };
    }
  },
  update: async ({ req }) => {
    try {
      const { companies, questions, dataSources, _id } = req.body;
      const configuration = await updateUseCase({
        _id,
        companies,
        questions,
        dataSources,
      });

      return {
        status: 200,
        body: configuration,
      };
    } catch (error) {
      return {
        status: 500,
        body: (error as Error).message,
      };
    }
  },
  delete: async ({ req }) => {
    try {
      const { _id } = req.body;
      const configuration = await deleteUseCase(_id);
      return {
        status: 200,
        body: { message: "OK" },
      };
    } catch (error) {
      return {
        status: 500,
        body: (error as Error).message,
      };
    }
  },
});

export default router;
