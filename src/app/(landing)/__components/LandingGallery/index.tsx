import LastCourseCard from "./LastCourseCard"
import TotalCoursesCard from "./TotalCoursesCard"
import TotalSchoolsCard from "./TotalSchoolsCard"

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

type LandingGalleryProps = {
  lastCourse: Course
  totalEscuelas: number
  totalCursos: number
}

const LandingGallery = ({ lastCourse, totalEscuelas, totalCursos }: LandingGalleryProps) => {
  return (
    <div className="max-w-6xl w-full flex justify-center md:flex-row gap-8">
      <div className="w-full md:w-1/2 aspect-[4/3]">
        <LastCourseCard course={lastCourse} />
      </div>
      <div className="w-full md:w-1/2 flex flex-col gap-8">
        <TotalSchoolsCard totalEscuelas={totalEscuelas} />
        <TotalCoursesCard totalCursos={totalCursos} />
      </div>
    </div>
  )
}

export default LandingGallery
