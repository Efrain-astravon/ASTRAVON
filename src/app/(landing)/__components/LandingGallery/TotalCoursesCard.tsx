import { Card, CardContent } from '@/components/ui/card'

type TotalCoursesCardProps = {
  totalCursos: number
}

const TotalCoursesCard = ({ totalCursos }: TotalCoursesCardProps) => {
  return (
    <Card className='h-full'>
      <CardContent className='h-full'>
        <div className="h-full p-8 flex flex-col justify-center items-center">
          <h3 className="text-4xl font-extrabold mb-2">{totalCursos}</h3>
          <p className="text-xl">Cursos totales</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalCoursesCard
