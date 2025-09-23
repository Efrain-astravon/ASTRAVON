import React from 'react'

type UserIdPageProps = {
  params: Promise<{ user_id: string }>
}

const UserIdPage = async ({ params }: UserIdPageProps) => {
  const { user_id } = await params
  return (
    <div>UserIdPage {user_id}</div>
  )
}

export default UserIdPage
