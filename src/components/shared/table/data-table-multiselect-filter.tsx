import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { FilterIcon } from 'lucide-react'

type MultiSelectFilterProps = {
  label: string
  options: Array<{ label: React.ReactNode; value: string }>
  selectedValues: string[]
  onChange: (values: string[]) => void
}

const MultiSelectFilter = ({ label, options, selectedValues, onChange }: MultiSelectFilterProps) => {
  const isAllSelected = selectedValues.length === options.length

  const toggleSelectAll = (checked: boolean) => {
    if (checked) {
      onChange(options.map(o => o.value))
    } else {
      onChange([])
    }
  }

  const toggleValue = (checked: boolean, value: string) => {
    if (checked) {
      onChange([...selectedValues, value])
    } else {
      onChange(selectedValues.filter(v => v !== value))
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          <FilterIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
          {label}
          {selectedValues.length > 0 && (
            <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
              {selectedValues.length}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto min-w-[9rem] p-3" align="start">
        <div className="space-y-3">
          <div className="text-muted-foreground text-xs font-medium">{label}</div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Checkbox
                id={`${label}-select-all`}
                checked={isAllSelected}
                onCheckedChange={(checked) => toggleSelectAll(!!checked)}
              />
              <Label htmlFor={`${label}-select-all`} className="font-medium cursor-pointer">
                Seleccionar todos
              </Label>
            </div>
            {options.map(({ label: optionLabel, value }, i) => (
              <div key={value} className="flex items-center gap-2">
                <Checkbox
                  id={`${label}-filter-${i}`}
                  checked={selectedValues.includes(value)}
                  onCheckedChange={(checked) => toggleValue(!!checked, value)}
                />
                <Label htmlFor={`${label}-filter-${i}`} className="cursor-pointer">
                  {optionLabel}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default MultiSelectFilter
