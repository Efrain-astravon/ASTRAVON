"use client"

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from 'sonner'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { upsertSchoolSchema, UpsertSchoolType } from '@/trpc/routers/school/schemas'
import { LevelEnum } from '@/trpc/routers/shared/enums'

const levelOptions = LevelEnum.options
const levelOptionsLabel = [
  { value: "BEGINNER", label: "Principiante" },
  { value: "INTERMEDIATE", label: "Intermedio" },
  { value: "ADVANCED", label: "Avanzado" },
]

type SchoolUpsertFormProps = {
  initialValues?: Partial<UpsertSchoolType>
  onSuccessCallback?: () => void
  onErrorCallback?: () => void
}

const SchoolUpsertForm = ({
  initialValues,
  onSuccessCallback,
  onErrorCallback,
}: SchoolUpsertFormProps) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const upsertMutation = useMutation(
    trpc.schoolRouter.upsert.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.schoolRouter.list.queryOptions())
        toast.success(initialValues?.id ? "Escuela actualizada correctamente" : "Escuela creada correctamente")
        onSuccessCallback?.()
      },
      onError: (error: any) => {
        toast.error(error.message || (initialValues?.id ? "Error al actualizar la escuela" : "Error al crear la escuela"))
        onErrorCallback?.()
      },
    })
  )

  const { isPending } = upsertMutation

  const form = useForm<UpsertSchoolType>({
    resolver: zodResolver(upsertSchoolSchema),
    defaultValues: {
      id: initialValues?.id,
      name: initialValues?.name ?? '',
      level: initialValues?.level ?? levelOptions[0],
    },
  })

  const onSubmit = (values: UpsertSchoolType) => {
    upsertMutation.mutate(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-full p-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre de la Escuela</FormLabel>
              <FormControl>
                <Input placeholder="Ingrese el nombre" {...field} disabled={isPending} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value} disabled={isPending}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccione un nivel" />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptionsLabel.map(({ value, label }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-center pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? (initialValues?.id ? "Actualizando..." : "Creando...")
              : (initialValues?.id ? "Actualizar Escuela" : "Crear Escuela")}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default SchoolUpsertForm
