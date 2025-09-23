import React, { ReactNode, useRef } from "react"
import { Table } from "@tanstack/react-table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { FilterIcon, ListFilterIcon, TrashIcon, PlusIcon, Columns3Icon, XIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DataTableFiltersProps<T> {
  table: Table<T>
  id: string
  onDeleteRows?: () => void
  addNewItemButton?: ReactNode
  filterPlaceholder?: string
}

function DataTableFilters<T>({ table, id, addNewItemButton, onDeleteRows, filterPlaceholder }: DataTableFiltersProps<T>) {
  // Ejemplo simple: filtro global en la primera columna (se puede mejorar o hacer multi)
  const inputRef = useRef<HTMLInputElement>(null)

  // Ejemplo de filtros de columnas visibles
  const columnsWithVisibility = table.getAllColumns().filter(col => col.getCanHide())

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        {/* Input para filtro global */}
        <div className="relative">
          <Input
            id={`${id}-input`}
            ref={inputRef}
            className="peer xl:min-w-80 md:min-w-60 min-w-40 ps-9"
            value={(table.getColumn("name")?.getFilterValue() ?? "") as string}
            onChange={(e) => table.getColumn("name")?.setFilterValue(e.target.value)}
            placeholder={`${filterPlaceholder}...`}
            type="text"
            aria-label={`${filterPlaceholder}`}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
            <ListFilterIcon size={16} aria-hidden="true" />
          </div>
          {!!table.getColumn("name")?.getFilterValue() && (
            <Button
              className="text-muted-foreground/80 absolute inset-y-2 end-2 flex h-full items-center justify-center transition size-5 rounded-md"
              onClick={() => {
                table.getColumn("name")?.setFilterValue("")
                inputRef.current?.focus()
              }}
              aria-label="Clear filter"
              variant={"outline"}
              size={"icon"}
            >
              <XIcon className="" />
            </Button>
          )}
        </div>

        {/* Toggle columnas */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Columns3Icon size={16} aria-hidden="true" />
              View
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            {columnsWithVisibility.map(col => (
              <DropdownMenuCheckboxItem
                key={col.id}
                className="capitalize"
                checked={col.getIsVisible()}
                onCheckedChange={value => col.toggleVisibility(!!value)}
                onSelect={e => e.preventDefault()}
              >
                {col.id}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex items-center gap-3">
        {table.getSelectedRowModel().rows.length > 0 && onDeleteRows && (
          <Button variant="outline" size="sm" onClick={onDeleteRows}>
            <TrashIcon size={16} aria-hidden="true" />
            Delete ({table.getSelectedRowModel().rows.length})
          </Button>
        )}
        {addNewItemButton}
      </div>
    </div>
  )
}

export default DataTableFilters
