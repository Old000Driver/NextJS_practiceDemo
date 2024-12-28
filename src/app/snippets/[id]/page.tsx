import React from "react";
import Link from "next/link";
import { db } from "@/db";
import { notFound } from "next/navigation";
import { sleep } from "@/app/utils";

interface SnippetShowPageProps {
  params: { id: string };
}

export default async function page(props: SnippetShowPageProps) {
  await sleep();
  const id = props.params.id;
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(id) },
  });
  if (!snippet) return notFound();
  return (
    <>
      <div className="flex items-center justify-between mt-10">
        <h1 className="font-bold text-lg">{snippet?.title}</h1>
        <div className="flex gap-4">
          <Link className="p-2 border border-teal-500 rounded" href="">
            Edit
          </Link>
          <button className="p-2 border border-teal-500 rounded">Delete</button>
        </div>
      </div>
      <pre className="p-3 border border-teal-500 rounded bg-gray-300 mt-6">
        <code>{snippet.code}</code>
      </pre>
    </>
  );
}