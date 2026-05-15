import React from 'react'
import type { InterviewModel as Interview } from '@/app/generated/prisma/models';
import ListCard from '../interviews/components/ListCard';
import { InterviewsClientProps } from '@/types/types';

const InterviewsClient = ({ interviews }: InterviewsClientProps) => {
  return (
    <>
        <div className="container-cards flex flex-col gap-4  overflow-hidden">
            {interviews.map(interview => (
              <ListCard interview={interview} key={interview.id} />
            ))}
        </div>
    </>
  )
}

export default InterviewsClient