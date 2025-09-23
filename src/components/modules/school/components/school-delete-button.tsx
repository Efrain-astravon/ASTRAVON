"use client"

import { ReactNode, useState } from 'react'

import { useTRPC } from '@/trpc/client'
import { SchoolType } from '@/trpc/routers/school/schemas'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import ResponsiveAlertDialog from '@/components/shared/dialog/responsive-alert-dialog'

import { toast } from 'sonner'

type SchoolDeleteButtonProps = {
  row: Partial<SchoolType>
  trigger?: ReactNode
  onSuccessCallback?: () => void
}
const SchoolDeleteButton = ({ row, trigger, onSuccessCallback }: SchoolDeleteButtonProps) => {
  const [open, setOpen] = useState(false)
  const trpc = useTRPC()
  const queryClient = useQueryClient()

  const deleteSchoolMutation = useMutation(
    trpc.schoolRouter.delete.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.schoolRouter.list.queryOptions())
        toast.success("Escuela eliminada exitosamente")
        setOpen(false)
        onSuccessCallback?.()
      },
      onError: (error: any) => {
        toast.error(error.message || "Error al eliminar la escuela")
      },
    })
  )

  const handleDelete = async () => {
    if (row.id) {
      console.log("Deleteting school with ID:", row.id)
      deleteSchoolMutation.mutate({
        id: row.id
      })
    } else {
      toast.error("Falta el ID de la escuela. No se puede eliminar.")
    }
  }

  return (
    <ResponsiveAlertDialog
      open={open}
      onOpenChange={setOpen}
      title={`¿Está seguro de que desea eliminar ${row.name}?`}
      description={
        <>
          Esta acción no se puede deshacer. Esto eliminará permanentemente la escuela{" "}
          <strong>{row?.name}</strong> y todos los datos asociados.
        </>
      }
      confirmText="Eliminar Escuela"
      cancelText="Cancelar"
      isLoading={deleteSchoolMutation.isPending}
      onConfirm={handleDelete}
      trigger={trigger}
    />
  )
}
export default SchoolDeleteButton
