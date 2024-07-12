"use client";
import { FORM_ERROR, ProjectForm } from "./ProjectForm";
import { CreateProjectSchema } from "../schemas";
import { useMutation } from "@blitzjs/rpc";
import createProject from "../mutations/createProject";
import { useRouter } from "next/navigation";

export function New__ModelName() {
  const [createProjectMutation] = useMutation(createProject);
  const router = useRouter();
  return (
    <ProjectForm
      submitText="Create Project"
      schema={CreateProjectSchema}
      onSubmit={async (values) => {
        try {
          const project = await createProjectMutation(values);
          router.push(`/projects/${project.id}`);
        } catch (error: any) {
          console.error(error);
          return {
            [FORM_ERROR]: error.toString(),
          };
        }
      }}
    />
  );
}
