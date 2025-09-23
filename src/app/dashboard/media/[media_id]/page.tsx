import React from 'react'

type MediaIdPageProps = {
  params: Promise<{ media_id: string }>
}

const MediaIdPage = async ({ params }: MediaIdPageProps) => {
  const { media_id } = await params
  return (
    <div>MediaIdPage {media_id}</div>
  )
}

export default MediaIdPage
