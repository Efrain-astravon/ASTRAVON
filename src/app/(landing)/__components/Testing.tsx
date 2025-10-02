"use client"

import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'


type Props = {}

const Testing = (props: Props) => {

  const trpc = useTRPC()
  const { data: healthcheck, isPending, isError } = useQuery(trpc.healthcheck.queryOptions())

  if (isPending) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error...</div>
  }

  return (
    <div>
      <div>
        Healthcheck:
      </div>
      <div>
        {JSON.stringify(healthcheck)}
      </div>
    </div>
  )
}

export default Testing
