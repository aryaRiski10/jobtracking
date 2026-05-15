import { getInterviews } from '@/lib/data';
import React from 'react'
import InterviewsClient from './InterviewsClient';

const InterviewPage = async () => {
  const interviews = await getInterviews();

  return (
    <section id="section-applications" className="space-y-6">
        {/* Header & Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="font-bold text-2xl text-foreground">My Interviews</h2>
        </div>
        <InterviewsClient interviews={interviews} />
        
    </section>
  )
}

export default InterviewPage