"use client"

import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query"
import { format } from "date-fns"
import Image from "next/image"

type CoursePresentationProps = {
  course_id: string
}

const levelMap = {
  BEGINNER: "Fácil",
  INTERMEDIATE: "Intermedio",
  ADVANCED: "Avanzado",
};

const statusMap = {
  PUBLISHED: "Publicado",
  DRAFT: "Boceto",
  ARCHIVED: "Archivado",
};



const CoursePresentation = ({ course_id }: CoursePresentationProps) => {
  const trpc = useTRPC()
  const { data: course } = useSuspenseQuery(
    trpc.courseRouter.get.queryOptions({ id: course_id })
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Image */}
      <div className="relative w-full aspect-[36/12]">
        {course.thumbnailUrl ? (
          <Image
            src={course.thumbnailUrl}
            alt={`Thumbnail of ${course.title}`}
            fill
            className="object-cover rounded-t-lg"
            priority
          />
        ) : (
          <div className="w-full md:w-1/3 bg-gray-200 flex items-center justify-center aspect-[4/3]">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </div>
      {/* Content */}
      <div className="flex flex-col md:flex-row rounded-b-xl shadow-lg border-b-1 border-x-1 overflow-hidden">
        <div className="p-6 flex flex-col flex-1">
          <h1 className="text-3xl font-extrabold mb-2">{course.title}</h1>

          {course.smallDescription && (
            <p className="text-lg  mb-4">{course.smallDescription}</p>
          )}

          <div className="flex flex-row mb-6 space-x-4 text-sm font-medium">
            <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full">
              Level: {levelMap[course.level] ?? "Unknown"}
            </span>

            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
              Status: {statusMap[course.status] ?? "Unknown"}
            </span>

            {course.duration != null && (
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                Duración: {Number(course.duration)}h
              </span>
            )}

            {course.price != null && (
              <span className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full">
                Price: S/{course.price.toFixed(2)}
              </span>
            )}
          </div>

          {course.description && (
            <div className="prose prose-indigo max-w-none mb-8">
              <h2>Description</h2>
              <p>{course.description}</p>
            </div>
          )}

          <div className="mt-auto pt-4 border-t text-sm flex flex-col md:flex-row gap-4">
            <div>
              Created at:{" "}
              {course.createdAt ? format(new Date(course.createdAt), "PPP") : "N/A"}
            </div>
            <div>
              Last Updated:{" "}
              {course.updatedAt ? format(new Date(course.updatedAt), "PPP") : "N/A"}
            </div>
            <div>Teacher ID: {course.teacherId}</div>
            <div>School ID: {course.schoolId}</div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition"
              onClick={() => alert("Comprar curso aún no implementado")}
            >
              Buy this course
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoursePresentation
