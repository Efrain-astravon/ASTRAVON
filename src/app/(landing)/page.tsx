import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

type HomePageProps = {}

const HomePage = ({ }: HomePageProps) => {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <p>HomePage</p>
      <Button asChild>
        <Link href={"/sign-in"} className="">
          Login
        </Link>
      </Button>
    </div>
  )
}

export default HomePage
