"use client"

import { useState } from 'react'
import { useTRPC } from '@/trpc/client'
import { CourseType } from '@/trpc/routers/course/schemas'
import { LevelEnum } from '@/trpc/routers/shared/enums'
import { ShowStatusEnum } from '@/trpc/routers/shared/enums'
import { useSuspenseQuery } from '@tanstack/react-query'
import { ColumnDef, FilterFn } from '@tanstack/react-table'
import DataTable from '@/components/shared/table/data-table'
import { LevelFormatter } from '@/components/shared/level/level-formatter'
import { DateFormatter } from '@/components/shared/date/date-formatter'
import CourseCreateButton from '@/components/modules/course/components/course-create-button'
import CourseActionsDropdown from '@/components/modules/course/components/course-actions-dropdown'
import MultiSelectFilter from '@/components/shared/table/data-table-multiselect-filter'
import { Checkbox } from '@/components/ui/checkbox'
import { useRouter } from 'next/navigation'
import { StatusFormatter } from '@/components/shared/state/state-formatter'
import Image from 'next/image'
import { sr } from 'date-fns/locale'

const multiColumnFilterFn: FilterFn<CourseType> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.title} ${row.original.status}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const levelFilterFn: FilterFn<CourseType> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const level = row.getValue(columnId) as string
  return filterValue.includes(level)
}

const columns: ColumnDef<CourseType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className='border-primary-foreground'
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all courses"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select course"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Miniatura",
    accessorKey: "thumbnailUrl",
    cell: ({ row }) => {
      const src = row.getValue("thumbnailUrl") as string
      return <div className='flex justify-center items-center w-full h-full'>
        <Image
          alt={`${row.getValue("title")}_thumbnail`}
          width={50}
          height={50}
          src={src}
        />
      </div>
    },
    size: 120,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Título",
    accessorKey: "title",
    cell: ({ row }) => <div>{row.getValue("title")}</div>,
    size: 250,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Descripción",
    accessorKey: "description",
    cell: ({ row }) => {
      const description = row.getValue("description") as string
      return <div>{description}</div>
    },
    size: 200,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Descripción Corta",
    accessorKey: "smallDescription",
    cell: ({ row }) => {
      const description = row.getValue("smallDescription") as string
      return <div>{description}</div>
    },
    size: 200,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Precio",
    accessorKey: "price",
    cell: ({ row }) => {
      const price = row.getValue("price") as number
      // price can be undefined or null or number
      if (price == null) return "-"  // covers null and undefined
      return `S/ ${price.toFixed(2)}`
    },
    size: 100,
  },
  {
    header: "Duración (horas)",
    accessorKey: "duration",
    cell: ({ row }) => {
      const duration = row.getValue("duration")
      return duration !== undefined ? `${duration}h` : "-"
    },
    size: 120,
  },
  {
    header: "Diminutivo",
    accessorKey: "slug",
    cell: ({ row }) => <div>{row.getValue("slug")}</div>,
    size: 120,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Estado",
    accessorKey: "status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status")
      const parsed = ShowStatusEnum.safeParse(statusValue)
      return <StatusFormatter status={parsed.success ? parsed.data : null} />
    },
    size: 150,
  },
  {
    header: "Nivel",
    accessorKey: "level",
    cell: ({ row }) => {
      const levelValue = row.getValue("level")
      const parsed = LevelEnum.safeParse(levelValue)
      return <LevelFormatter level={parsed.success ? parsed.data : null} />
    },
    size: 150,
    filterFn: levelFilterFn,
  },
  {
    header: "Fecha Creación",
    accessorKey: "createdAt",
    cell: ({ row }) => (
      <DateFormatter date={row.getValue("createdAt")} />
    ),
    size: 150,
  },
  {
    header: "Última Actualización",
    accessorKey: "updatedAt",
    cell: ({ row }) => (
      <DateFormatter date={row.getValue("updatedAt")} />
    ),
    size: 150,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <CourseActionsDropdown row={row} />,
    size: 100,
    enableHiding: false,
  },
]

type CourseTableViewProps = {}

const CourseTableView = ({ }: CourseTableViewProps) => {
  const router = useRouter()
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.courseRouter.list.queryOptions())

  const onDeleteRows = (rowsToDelete: CourseType[]) => {
    // TODO: implement row deletion logic here
    console.log(rowsToDelete)
  }

  const handleDoubleClickRow = (row: CourseType) => {
    router.push(`/dashboard/course/${row.id}`)
  }

  // Filter state
  const [selectedLevels, setSelectedLevels] = useState<string[]>([])

  const uniqueLevels = Array.from(new Set(data?.map(item => item.level) ?? []))
  const levelOptions = uniqueLevels.map(level => ({
    value: level,
    label: <LevelFormatter level={LevelEnum.parse(level)} />,
  }))

  const filteredData = data?.filter(item => {
    if (!selectedLevels.length) return true
    return selectedLevels.includes(item.level)
  }) ?? []

  const courseTranslations = {
    title: "Título",
    description: "Descripción",
    smallDescription: "Descripción corta",
    price: "Precio",
    duration: "Duración",
    slug: "Nombre corto",
    status: "Estado",
    level: "Nivel",
    thumbnailUrl: "URL miniatura",
    createdAt: "Fecha creación",
    updatedAt: "Última actualización",
  }

  return (
    <DataTable
      columns={columns}
      data={filteredData as CourseType[]}
      onDeleteRows={onDeleteRows}
      onDoubleClickRow={handleDoubleClickRow}
      addNewItemButton={<CourseCreateButton />}
      searchFilterPlaceholder="Search by title or status"
      searchFilterColumnName="title"
      // filterComponent={
      //   <MultiSelectFilter
      //     label="Niveles"
      //     options={levelOptions}
      //     selectedValues={selectedLevels}
      //     onChange={setSelectedLevels}
      //   />
      // }
      columnTranslations={courseTranslations}
    />
  )
}

export default CourseTableView
