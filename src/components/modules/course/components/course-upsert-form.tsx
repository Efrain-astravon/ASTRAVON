"use client";

import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { upsertCourseSchema, UpsertCourseType } from "@/trpc/routers/course/schemas";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";

type DurationInput = {
  hours: number;
  minutes: number;
  seconds: number;
};

function secondsToHMS(seconds: number): DurationInput {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return { hours: h, minutes: m, seconds: s };
}

function HMSToSeconds({ hours, minutes, seconds }: DurationInput): number {
  return hours * 3600 + minutes * 60 + seconds;
}

const levelOptionsLabel = [
  { value: "BEGINNER", label: "Principiante" },
  { value: "INTERMEDIATE", label: "Intermedio" },
  { value: "ADVANCED", label: "Avanzado" },
]

const ShowStatusEnumLabel = [
  { value: "DRAFT", label: "boceto" },
  { value: "PUBLISHED", label: "publicado" },
  { value: "ARCHIVED", label: "archivado" },
];

type CourseUpsertFormProps = {
  initialValues?: Partial<UpsertCourseType>;
  onSuccessCallback?: () => void
  onErrorCallback?: () => void
};

const CourseUpsertForm = ({
  initialValues,
  onSuccessCallback,
  onErrorCallback,
}: CourseUpsertFormProps) => {
  const trpc = useTRPC()
  const queryClient = useQueryClient();

  const { data: schools } = useSuspenseQuery(trpc.schoolRouter.list.queryOptions())
  const { data: teachers } = useSuspenseQuery(trpc.authRouter.user.getByRole.queryOptions({ role: "admin" }))

  const upsertMutation = useMutation(
    trpc.courseRouter.upsert.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.courseRouter.list.queryOptions());
        onSuccessCallback?.();
      },
      onError: (error: any) => {
        toast.error(error.message || (initialValues?.id ? "Error al actualizar la curso" : "Error al crear la curso"))
        onErrorCallback?.();
      },
    })
  );

  const { isPending } = upsertMutation

  const form = useForm<UpsertCourseType>({
    resolver: zodResolver(upsertCourseSchema),
    defaultValues: {
      ...initialValues,
      duration: initialValues?.duration ?? 0,
    },
  });

  const [durationHMS, setDurationHMS] = useState<DurationInput>(
    secondsToHMS(initialValues?.duration ?? 0)
  );

  useEffect(() => {
    form.setValue("duration", HMSToSeconds(durationHMS));
  }, [durationHMS, form]);



  const onSubmit = (values: UpsertCourseType) => {
    upsertMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full"
      >
        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título del curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción del curso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Descripción corta */}
        <FormField
          control={form.control}
          name="smallDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción corta</FormLabel>
              <FormControl>
                <Input placeholder="Descripción corta" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Precio */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Precio</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  min={0}
                  step={1}
                  placeholder="Precio"
                  {...field}
                  value={field.value ?? ""}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Slug */}
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input placeholder="Slug" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Thumbnail URL */}
        <FormField
          control={form.control}
          name="thumbnailUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la imagen</FormLabel>
              <FormControl>
                <Input type="url" placeholder="URL de la imagen" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Duration: horas, minutos, segundos */}
        <FormItem>
          <FormLabel>Duración</FormLabel>
          <div className="flex gap-2">
            <Input
              type="number"
              min={0}
              value={durationHMS.hours}
              onChange={(e) =>
                setDurationHMS({
                  ...durationHMS,
                  hours: Math.max(0, Number(e.target.value)),
                })
              }
              placeholder="Horas"
              className="w-20"
            />
            <Input
              type="number"
              min={0}
              max={59}
              value={durationHMS.minutes}
              onChange={(e) =>
                setDurationHMS({
                  ...durationHMS,
                  minutes: Math.min(59, Math.max(0, Number(e.target.value))),
                })
              }
              placeholder="Minutos"
              className="w-20"
            />
            <Input
              type="number"
              min={0}
              max={59}
              value={durationHMS.seconds}
              onChange={(e) =>
                setDurationHMS({
                  ...durationHMS,
                  seconds: Math.min(59, Math.max(0, Number(e.target.value))),
                })
              }
              placeholder="Segundos"
              className="w-20"
            />
          </div>
        </FormItem>

        {/* Level dropdown */}
        <FormField
          control={form.control}
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nivel</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona nivel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {levelOptionsLabel.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Status dropdown */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {ShowStatusEnumLabel.map(({ label, value }) => (
                      <SelectItem key={value} value={value}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Teacher dropdown */}
        <FormField
          control={form.control}
          name="teacherId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profesor</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona profesor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {teachers.map((teacher) => (
                      <SelectItem key={teacher.id} value={teacher.id}>
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* School dropdown */}
        <FormField
          control={form.control}
          name="schoolId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Escuela</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona escuela" />
                </SelectTrigger>
                <SelectContent className="max-h-64" side="right">
                  <SelectGroup>
                    {schools.map((school) => (
                      <SelectItem key={school.id} value={school.id}>
                        {school.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit */}
        <div className="flex justify-center pt-4">
          <Button type="submit" disabled={isPending}>
            {isPending
              ? (initialValues?.id ? "Actualizando..." : "Creando...")
              : (initialValues?.id ? "Actualizar Curso" : "Crear Curso")}
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default CourseUpsertForm
