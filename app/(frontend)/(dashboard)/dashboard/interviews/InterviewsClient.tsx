import React from 'react'
import ListCard from '../interviews/components/ListCard';
import { InterviewsClientProps } from '@/types/types';
import { Search } from 'lucide-react';

const InterviewsClient = ({ interviews }: InterviewsClientProps) => {
  return (
    <>
      {interviews.length > 0 ? (
        <div className="container-cards flex flex-col gap-4  overflow-hidden">
            {interviews.map(interview => (
              <ListCard interview={interview} key={interview.id} />
            ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">  
          <div id="noResults" className="p-12 text-center flex flex-col items-center justify-center">
              <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Search className="size-8 text-secondary"/>
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">
                  No interviews found
              </h3>
              
          </div>
        </div>
      )}
    </>
  )
}

export default InterviewsClient