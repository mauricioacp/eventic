"use client";
import { useMutation, useQuery } from "@blitzjs/rpc";
import Link from "next/link";
import { useRouter } from "next/navigation";
import deleteProject from "../mutations/deleteProject";
import getProject from "../queries/getProject";

export const Project = ({ projectId }: { projectId: number }) => {
  const router = useRouter();
  const [deleteProjectMutation] = useMutation(deleteProject);
  const [project] = useQuery(getProject, { id: projectId });

  return (
    <>
      <div>
        <h1>Project {project.id}</h1>
        <pre>{JSON.stringify(project, null, 2)}</pre>

        <Link href={`/projects/${project.id}/edit`}>Edit</Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteProjectMutation({ id: project.id });
              router.push("/projects");
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  );
};
