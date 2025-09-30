import { Button } from '@/components/ui/button'
import { BookOpenIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

type Props = {}

const HeroLandingPage = (props: Props) => {
  return (
    <div className="max-w-6xl text-center">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
        Bienvenido a <span className="text-primary">astravon.com</span>
      </h1>
      <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10">
        Descubre una nueva forma de aprender <span className="text-primary">ingeniería</span> con nuestros cursos digitales
        especializados. Explora nuestras escuelas, cursos y capítulos,
        con contenido multimedia y textual diseñado para mejorar tu conocimiento en ingeniería — más allá de la informática.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-6 max-w-xl mx-auto">
        <Button
          asChild
          size={"lg"}
          className="px-6 py-6 text-primary-foreground font-semibold rounded-xl"
        >
          <Link href={"/escuelas"}>
            <div className="flex justify-center items-center gap-2">
              <BookOpenIcon className="size-4" />
              <p>Explora las escuelas</p>
            </div>
          </Link>
        </Button>
        <div className="flex justify-center items-center">
          <p>O tambien puedes{" "}
            <span className="hover:underline hover:text-primary">
              <Link href={"/escuelas"} className="inline">
                Iniciar Sesión
              </Link>
            </span></p>
        </div>
      </div>
    </div>
  )
}

export default HeroLandingPage
