import SchoolIndividualView from '@/components/modules/school/templates/school-individual-view'
import React from 'react'

type SchoolIdPageProps = {
  params: Promise<{ school_id: string }>
}

const SchoolIdPage = async ({ params }: SchoolIdPageProps) => {
  const { school_id } = await params
  return (
    <SchoolIndividualView
      school_id={school_id}
    />
  )
}

export default SchoolIdPage
