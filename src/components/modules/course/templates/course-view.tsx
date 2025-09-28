import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import CourseTableView from "./course-table-view"
import { CourseTableListListErrorState, CourseTableListLoadingState } from "../components/course-loaders"

type CourseCreatePageProps = {}

const CourseView = ({ }: CourseCreatePageProps) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.schoolRouter.list.queryOptions())
  void queryClient.prefetchQuery(trpc.courseRouter.list.queryOptions())
  void queryClient.prefetchQuery(trpc.authRouter.user.getByRole.queryOptions({ role: "admin" }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Creación de Cursos</h2>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<CourseTableListLoadingState />}>
          <ErrorBoundary fallback={<CourseTableListListErrorState />} >
            <div className="overflow-x-auto">
              <CourseTableView />
            </div>
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div >
  )
}

export default CourseView
