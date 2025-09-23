import React from 'react'

type ChapterIdPageProps = {
  params: Promise<{ chapter_id: string }>
}

const ChapterIdPage = async ({ params }: ChapterIdPageProps) => {
  const { chapter_id } = await params
  return (
    <div>ChapterIdPage {chapter_id}</div>
  )
}

export default ChapterIdPage
