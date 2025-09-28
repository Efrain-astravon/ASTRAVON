import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import CourseUpsertForm from '@/components/modules/course/components/course-upsert-form'

type CourseCreatePageProps = {}

const CourseCreatePage = ({ }: CourseCreatePageProps) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.schoolRouter.list.queryOptions())
  // void queryClient.prefetchQuery()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Creación de Cursos</h2>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div />}>
          <ErrorBoundary fallback={<div />} >
            <CourseUpsertForm />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div >
  )
}

export default CourseCreatePage
