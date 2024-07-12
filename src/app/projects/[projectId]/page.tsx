import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { invoke } from "src/app/blitz-server";
import getProject from "../queries/getProject";
import { Project } from "../components/Project";

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const Project = await invoke(getProject, { id: Number(params.projectId) });
  return {
    title: `Project ${Project.id} - ${Project.name}`,
  };
}

type ProjectPageProps = {
  params: { projectId: string };
};

export default async function Page({ params }: ProjectPageProps) {
  return (
    <div>
      <p>
        <Link href={"/projects"}>Projects</Link>
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Project projectId={Number(params.projectId)} />
      </Suspense>
    </div>
  );
}
