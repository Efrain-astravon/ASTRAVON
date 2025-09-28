"use client"

import { ReactNode, useState } from 'react'

import { useTRPC } from '@/trpc/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ResponsiveAlertDialog from '@/components/shared/dialog/responsive-alert-dialog'
import { toast } from 'sonner'
import { CourseType } from '@/trpc/routers/course/schemas'

type CourseDeleteButtonProps = {
  row: Partial<CourseType>
  trigger?: ReactNode
  onSuccessCallback?: () => void
}

const CourseDeleteButton = ({ row, trigger, onSuccessCallback }: CourseDeleteButtonProps) => {
  const [open, setOpen] = useState(false)
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const deleteCourseMutation = useMutation(
    trpc.courseRouter.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.courseRouter.list.queryOptions())
        toast.success("Curso eliminado exitosamente")
        setOpen(false)
        onSuccessCallback?.()
      },
      onError: (error: any) => {
        toast.error(error.message || "Error al eliminar la curso")
      },
    })
  )

  const handleDelete = async () => {
    if (row.id) {
      deleteCourseMutation.mutate({
        id: row.id
      })
    } else {
      toast.error("Falta el ID del curso. No se puede eliminar.")
    }
  }

  return (
    <ResponsiveAlertDialog
      open={open}
      onOpenChange={setOpen}
      title={`¿Está seguro de que desea eliminar ${row.title}?`}
      description={
        <>
          Esta acción no se puede deshacer. Esto eliminará permanentemente el curso{" "}
          <strong>{row?.title}</strong> y todos los datos asociados.
        </>
      }
      confirmText="Eliminar Curso"
      cancelText="Cancelar"
      isLoading={deleteCourseMutation.isPending}
      onConfirm={handleDelete}
      trigger={trigger}
    />
  )
}

export default CourseDeleteButton
