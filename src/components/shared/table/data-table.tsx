"use client"

import React, { useState, useId, ReactNode } from "react"
import {
  ColumnDef,
  useReactTable,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  PaginationState,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"

import DataTableFilters from "./data-table-filters"
import DataTablePagination from "./data-table-pagination"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

type DataTableProps<T> = {
  columns: ColumnDef<T>[]
  data: T[]
  onDeleteRows?: (rows: T[]) => void
  onDoubleClickRow?: (row: T) => void
  addNewItemButton?: ReactNode
  searchFilterPlaceholder?: string
  filterComponent?: ReactNode,
  columnTranslations?: Record<string, string>
}

function DataTable<T>({
  columns,
  data,
  onDeleteRows,
  onDoubleClickRow,
  addNewItemButton,
  searchFilterPlaceholder = "Filter by name...",
  filterComponent,
  columnTranslations
}: DataTableProps<T>) {
  const id = useId()

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      sorting,
    },
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  // Proceso para eliminar filas seleccionadas
  const handleDeleteRows = () => {
    if (onDeleteRows) {
      const selectedData = table.getSelectedRowModel().rows.map((row) => row.original)
      onDeleteRows(selectedData)
      table.resetRowSelection()
    }
  }

  return (
    <div className="space-y-4">
      <DataTableFilters
        table={table}
        id={id}
        addNewItemButton={addNewItemButton}
        onDeleteRows={handleDeleteRows}
        searchFilterPlaceholder={searchFilterPlaceholder}
        filterComponent={filterComponent}
        columnTranslations={columnTranslations}
      />

      <div className="overflow-hidden rounded-md border">
        <Table className="table-fixed">
          <TableHeader className="bg-secondary">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} style={{ width: `${header.getSize()}px` }} className="h-11">
                    {header.isPlaceholder ? null : header.column.getCanSort() ? (
                      <div
                        className={cn(
                          "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                        tabIndex={0}
                      >
                        {header.column.columnDef.header instanceof Function
                          ? header.column.columnDef.header(header.getContext())
                          : header.column.columnDef.header}
                        {{
                          asc: (
                            <ChevronUpIcon
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                          desc: (
                            <ChevronDownIcon
                              className="shrink-0 opacity-60"
                              size={16}
                              aria-hidden="true"
                            />
                          ),
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    ) : (
                      header.column.columnDef.header instanceof Function
                        ? header.column.columnDef.header(header.getContext())
                        : header.column.columnDef.header
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  onDoubleClick={() => onDoubleClickRow?.(row.original)}
                  data-state={row.getIsSelected() ? "selected" : undefined}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} className="last:py-0">
                      {cell.column.columnDef.cell instanceof Function
                        ? cell.column.columnDef.cell(cell.getContext())
                        : cell.column.columnDef.cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination table={table} id={id} />
    </div>
  )
}

export default DataTable
