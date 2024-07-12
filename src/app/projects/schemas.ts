import { z } from "zod";

export const CreateProjectSchema = z.object({
  // template: __fieldName__: z.__zodType__(),
});
export const UpdateProjectSchema = CreateProjectSchema.merge(
  z.object({
    id: z.number(),
  })
);

export const DeleteProjectSchema = z.object({
  id: z.number(),
});
