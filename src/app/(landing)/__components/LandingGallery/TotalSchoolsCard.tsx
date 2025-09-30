import { Card, CardContent } from '@/components/ui/card'

type TotalSchoolsCardProps = {
  totalEscuelas: number
}

const TotalSchoolsCard = ({ totalEscuelas }: TotalSchoolsCardProps) => {
  return (
    <Card className='h-full'>
      <CardContent className='h-full'>
        <div className="h-full p-8 flex flex-col justify-center items-center">
          <h3 className="text-4xl font-extrabold mb-2">{totalEscuelas}</h3>
          <p className="text-xl">Escuelas disponibles</p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TotalSchoolsCard
