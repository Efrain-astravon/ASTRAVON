import { SchoolTableListListErrorState, SchoolTableListLoadingState } from "@/components/modules/school/components/school-loaders"
import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import SchoolsWithCourses from "./__components/SchoolsWithCourses"

// export const revalidate = 60; // Enable ISR every 60 seconds

type Props = {}

const EscuelasLandingPage = (props: Props) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.landingPageRouter.listWithCourses.queryOptions())
  return (
    <div className="w-full grow">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SchoolTableListLoadingState />}>
          <ErrorBoundary fallback={<SchoolTableListListErrorState />} >
            <SchoolsWithCourses />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div>
  )
}

export default EscuelasLandingPage
