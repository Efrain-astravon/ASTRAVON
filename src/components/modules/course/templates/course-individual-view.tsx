import { getQueryClient, trpc } from '@/trpc/server'
import React, { Suspense } from 'react'
import CoursePresentation from '../components/individual/course-presentation'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { CourseTableListListErrorState, CourseTableListLoadingState } from '../components/course-loaders'

type CourseIndividualViewProps = {
  course_id: string
}

const CourseIndividualView = ({ course_id }: CourseIndividualViewProps) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.courseRouter.get.queryOptions({
    id: course_id
  }))
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<CourseTableListLoadingState />}>
        <ErrorBoundary fallback={<CourseTableListListErrorState />} >
          <CoursePresentation
            course_id={course_id}
          />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default CourseIndividualView
