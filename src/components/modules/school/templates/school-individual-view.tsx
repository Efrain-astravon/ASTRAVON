import React from 'react'
import { CourseAccordion } from '../components/individual/course-accordion'

import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { SchoolTableListListErrorState, SchoolTableListLoadingState } from "../components/school-loaders"
import SchoolAccordionView from './school-accordion-view'

type SchoolIndividualViewProps = {
  school_id: string
}

const SchoolIndividualView = ({ school_id }: SchoolIndividualViewProps) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.schoolRouter.get.queryOptions({
    id: school_id
  }))
  void queryClient.prefetchQuery(trpc.courseRouter.listBySchool.queryOptions({
    schoolId: school_id
  }))

  return (
    <div className="space-y-6">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SchoolTableListLoadingState />}>
          <ErrorBoundary fallback={<SchoolTableListListErrorState />} >
            <SchoolAccordionView school_id={school_id} />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div >
  )
}

export default SchoolIndividualView
