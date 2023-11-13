import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const configurationSchema = z.object({
  companies: z.array(
    z.object({
      name: z.string(),
      websiteUrl: z.string(),
    })
  ),
  questions: z.array(z.string()),
  dataSources: z.array(z.string()),
});

const updateConfigPayload = z.object({
  _id: z.string(),
  companies: z
    .array(
      z.object({
        name: z.string(),
        websiteUrl: z.string(),
      })
    )
    .optional(),
  questions: z.array(z.string()).optional(),
  dataSources: z.array(z.string()).optional(),
});

const allConfigurationsResponse = z.object({
  totalDocuments: z.number(),
  totalPages: z.number(),
  data: z.array(configurationSchema).nullable(),
});

export const allConfigurationsQuerySchema = z.object({
  page: z.string(),
  pageSize: z.string(),
});

export const contract = c.router({
  get: {
    method: "GET",
    path: `/comparison-portal/api/configuration/:id`,
    responses: {
      200: configurationSchema.nullable(),
      500: z.string(),
    },
    summary: "get a configuration",
  },
  getAll: {
    method: "GET",
    path: `/comparison-portal/api/configuration`,
    responses: {
      200: allConfigurationsResponse,
      500: z.string(),
    },
    summary: "get all configurations with pagination and filter",
  },
  create: {
    method: "POST",
    path: "/comparison-portal/api/configuration",
    responses: {
      200: configurationSchema,
      500: z.string(),
    },
    body: configurationSchema,
    summary: "Create a configuration",
  },
  update: {
    method: "PUT",
    path: "/comparison-portal/api/configuration",
    responses: {
      200: configurationSchema,
      500: z.string(),
    },
    body: updateConfigPayload,
    summary: "update a configuration",
  },
  delete: {
    method: "DELETE",
    path: "/comparison-portal/api/configuration",
    responses: {
      200: z.object({ message: z.string() }),
      500: z.string(),
    },
    body: z.object({ _id: z.string() }),
    summary: "delete  a configuration",
  },
});
