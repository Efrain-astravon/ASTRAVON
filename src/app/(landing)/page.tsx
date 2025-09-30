import HeroLandingPage from "./__components/Hero"
import LandingGallery from "./__components/LandingGallery";

const lastCourse = {
  titulo: "Termodinámica Avanzada",
  descripcion_larga:
    "Profundiza en los principios de la termodinámica y su aplicación en sistemas complejos, con ejemplos prácticos y ejercicios.",
  descripcion_corta: "Curso avanzado de termodinámica para ingenieros.",
  precio: 120,
  duracion: "8 semanas",
  dificultad: "Avanzado",
  imagen_url: "./calculo-diferencial.jpg",
  profesor: "Ing. Laura Martínez",
  cantidad_capitulos: 24,
  escuela: "Ingeniería Mecánica",
};

const totalEscuelas = 5;
const totalCursos = 27;

const HomeLandingPage = () => {
  return (
    <div className="w-full flex-grow flex items-center justify-center px-6 py-12">
      <div className="flex flex-col gap-8">
        {/* Main Content */}
        <HeroLandingPage />
        {/* Gallery con las 3 tarjetas */}
        <LandingGallery
          lastCourse={lastCourse}
          totalEscuelas={totalEscuelas}
          totalCursos={totalCursos}
        />
      </div>
    </div>
  )
}

export default HomeLandingPage
