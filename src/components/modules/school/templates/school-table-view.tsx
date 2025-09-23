"use client"

import { useTRPC } from '@/trpc/client'
import { SchoolType } from '@/trpc/routers/school/schemas'
import { LevelEnum } from '@/trpc/routers/shared/enums'

import { useSuspenseQuery } from '@tanstack/react-query'
import { ColumnDef, FilterFn } from '@tanstack/react-table'

import DataTable from '@/components/shared/table/data-table'

import { LevelFormatter } from '@/components/shared/level/level-formatter'
import { DateFormatter } from '@/components/shared/date/date-formatter'

import SchoolCreateButton from '@/components/modules/school/components/school-create-button'
import SchoolActionsDropdown from '@/components/modules/school/components/school-actions-dropdown'

import { Checkbox } from '@/components/ui/checkbox'

const multiColumnFilterFn: FilterFn<SchoolType> = (row, columnId, filterValue) => {
  const searchableRowContent =
    `${row.original.name} ${row.original.level}`.toLowerCase()
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const levelFilterFn: FilterFn<SchoolType> = (row, columnId, filterValue: string[]) => {
  if (!filterValue?.length) return true
  const level = row.getValue(columnId) as string
  return filterValue.includes(level)
}

const columns: ColumnDef<SchoolType>[] = [
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
        aria-label="Select all schools"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select school"
      />
    ),
    size: 28,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Nombre",
    accessorKey: "name",
    cell: ({ row }) => <div>{row.getValue("name")}</div>,
    size: 250,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Nivel",
    accessorKey: "level",
    cell: ({ row }) => {
      const levelValue = row.getValue("level");
      const parsed = LevelEnum.safeParse(levelValue);
      // Si el valor no es válido, pasa null o undefined para que salga —
      return <LevelFormatter level={parsed.success ? parsed.data : null} />;
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
    header: "Ultima Actualización",
    accessorKey: "updatedAt",
    cell: ({ row }) => (
      <DateFormatter date={row.getValue("updatedAt")} />
    ),
    size: 150,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <SchoolActionsDropdown row={row} />,
    size: 100,
    enableHiding: false,
  },
]

type SchoolTableViewProps = {}

const SchoolTableView = ({ }: SchoolTableViewProps) => {
  const trpc = useTRPC()
  const { data } = useSuspenseQuery(trpc.schoolRouter.list.queryOptions())

  const onDeleteRows = (rowsToDelete: SchoolType[]) => {
    // TODO: implement row deletion logic here
    // e.g. setData((old) => old.filter(d => !rowsToDelete.find(row => row.id === d.id)))
  }

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      onDeleteRows={onDeleteRows}
      addNewItemButton={<SchoolCreateButton />}
      filterPlaceholder="Search by name or level"
    />
  )
}

export default SchoolTableView
