import { getQueryClient, trpc } from "@/trpc/server"
import { dehydrate, HydrationBoundary } from "@tanstack/react-query"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import SchoolTableView from "./school-table-view"
import { SchoolTableListListErrorState, SchoolTableListLoadingState } from "../components/school-loaders"

type SchoolViewProps = {}

const SchoolView = ({ }: SchoolViewProps) => {
  const queryClient = getQueryClient()
  void queryClient.prefetchQuery(trpc.schoolRouter.list.queryOptions())

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-foreground">Escuelas</h2>
      </div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SchoolTableListLoadingState />}>
          <ErrorBoundary fallback={<SchoolTableListListErrorState />} >
            <SchoolTableView />
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </div >
  )
}

export default SchoolView
