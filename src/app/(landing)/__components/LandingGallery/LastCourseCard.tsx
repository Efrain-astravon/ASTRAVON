import { Card, CardContent, CardHeader } from '@/components/ui/card'
import Image from 'next/image'

type Course = {
  titulo: string
  descripcion_larga: string
  descripcion_corta: string
  precio: number
  duracion: string
  dificultad: string
  imagen_url: string
  profesor: string
  cantidad_capitulos: number
  escuela: string
}

type LastCourseCardProps = {
  course: Course
}

const LastCourseCard = ({ course }: LastCourseCardProps) => {
  return (
    <Card className='p-0 rounded-xl'>
      <CardHeader className="p-0 rounded-xl">
        <div className="relative w-full h-48 rounded-xl">
          <Image
            src={course.imagen_url}
            alt={`Imagen del curso ${course.titulo}`}
            fill
            className=" object-fit rounded-t-xl"
            priority
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="p-6 flex flex-col justify-between h-full">
          <h2 className="text-xl font-semibold mb-2">{course.titulo}</h2>
          <p className="text-sm mb-4 line-clamp-3">
            {course.descripcion_larga}
          </p>
          <div className="flex flex-wrap justify-between text-sm font-medium mb-4">
            <span>Duración: <span className='text-primary'>{course.duracion}</span></span>
            <span>Dificultad: <span className='text-primary'>{course.dificultad}</span></span>
          </div>
          <p className="text-sm mb-2">
            Profesor: <b>{course.profesor}</b>
          </p>
          <p className="text-sm mb-2">Capítulos: <span className='text-primary'>{course.cantidad_capitulos}</span></p>
          <p className="text-sm mb-4">
            Escuela: <i>{course.escuela}</i>
          </p>
          {/* <p className="text-lg font-bold text-primary">Precio: ${course.precio}</p> */}
        </div>
      </CardContent>
    </Card>
  )
}

export default LastCourseCard
