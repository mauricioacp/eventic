import { Metadata } from "next";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../../queries/getProject";
import { EditProject } from "../../components/EditProject";

type EditProjectPageProps = {
  params: { projectId: string };
};

export async function generateMetadata({
  params,
}: EditProjectPageProps): Promise<Metadata> {
  const Project = await invoke(getProject, { id: Number(params.projectId) });
  return {
    title: `Edit Project ${Project.id} - ${Project.name}`,
  };
}

export default async function Page({ params }: EditProjectPageProps) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditProject projectId={Number(params.projectId)} />
      </Suspense>
    </div>
  );
}
