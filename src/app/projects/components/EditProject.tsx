"use client";
import { Suspense } from "react";
import updateProject from "../mutations/updateProject";
import getProject from "../queries/getProject";
import { UpdateProjectSchema } from "../schemas";
import { FORM_ERROR, ProjectForm } from "./ProjectForm";
import { useMutation, useQuery } from "@blitzjs/rpc";
import { useRouter } from "next/navigation";

export const EditProject = ({ projectId }: { projectId: number }) => {
  const [project, { setQueryData }] = useQuery(
    getProject,
    { id: projectId },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateProjectMutation] = useMutation(updateProject);
  const router = useRouter();
  return (
    <>
      <div>
        <h1>Edit Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectForm
            submitText="Update Project"
            schema={UpdateProjectSchema}
            initialValues={project}
            onSubmit={async (values) => {
              try {
                const updated = await updateProjectMutation({
                  ...values,
                  id: project.id,
                });
                await setQueryData(updated);
                router.refresh();
              } catch (error: any) {
                console.error(error);
                return {
                  [FORM_ERROR]: error.toString(),
                };
              }
            }}
          />
        </Suspense>
      </div>
    </>
  );
};
