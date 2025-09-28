import React from 'react'
import { ShowStatusEmumType } from '@/trpc/routers/shared/enums'

type StatusFormatterProps = {
  status: ShowStatusEmumType | null
}

const statusLabels: Record<ShowStatusEmumType, string> = {
  DRAFT: "Borrador",
  PUBLISHED: "Publicado",
  ARCHIVED: "Archivado",
}

const statusColors: Record<ShowStatusEmumType, string> = {
  DRAFT: "bg-yellow-100 text-yellow-800",
  PUBLISHED: "bg-green-100 text-green-800",
  ARCHIVED: "bg-gray-100 text-gray-600",
}

export const StatusFormatter: React.FC<StatusFormatterProps> = ({ status }) => {
  if (!status) {
    return <span className="italic text-muted-foreground">Desconocido</span>
  }

  return (
    <span
      className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${statusColors[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}
