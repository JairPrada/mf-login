import { z } from "zod";
import { createEventBus } from "@journals/lib-service-bus";

const schemas = {
  "mf-login:Login:submit": z.object({
    docType: z.enum(["cc", "ce", "pa", "nit"]),
    docNumber: z.string().min(1).max(20),
    userId: z.number().positive().int(),
  }),
  "mf-login:LoginWithCredentials:submit": z.object({
    username: z.string().min(1),
    userId: z.number().positive().int(),
  }),
};

export type EventSchemas = typeof schemas;

export const { publish } = createEventBus(schemas);
