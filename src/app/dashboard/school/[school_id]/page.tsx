import React from 'react'

type SchoolIdPageProps = {
  params: Promise<{ school_id: string }>
}

const SchoolIdPage = async ({ params }: SchoolIdPageProps) => {
  const { school_id } = await params
  return (
    <div>SchoolIdPage {school_id} </div>
  )
}

export default SchoolIdPage
