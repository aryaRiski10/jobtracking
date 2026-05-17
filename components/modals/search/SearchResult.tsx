import { Job } from '@/app/generated/prisma/client'
import React from 'react'

const SearchResult = ({openJobDetail, query, resultsJobs}: {openJobDetail: (job: Job) => void, query: string, resultsJobs: Job[]}) => {

  return (
    <div className="p-4 overflow-y-auto max-h-[50vh]">
        { query ? (
            <>
            <p className="text-xs font-semibold text-secondary mb-3 uppercase tracking-wider">
            Recent Searches
            </p>
            <div className="flex flex-col gap-1">
                {resultsJobs.map((job) => (
                    <React.Fragment key={job.id}>
                        <div key={job.id} className="flex flex-col gap-1">
                            <button onClick={() => openJobDetail(job)}  className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted transition-all group"
                            >
                            <div className="size-12 rounded-xl border border-border flex items-center justify-center bg-white shrink-0 overflow-hidden">
                                <span className="w-8 h-8 flex items-center justify-center font-bold">PD</span>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-foreground truncate text-left">
                                {job.position}
                                </p>
                                <p className="text-xs text-secondary truncate text-left">{job.companyName}</p>
                            </div>
                            </button>       
                        </div>
                    </React.Fragment>

                ))}
            </div>
            </>
            
        ) : (
            <div id="noResults" className="p-2 text-center flex flex-col items-center justify-center">
                <h3 className="font-semibold text-lg text-foreground mb-1">
                    You have {resultsJobs.length} jobs
                </h3>
                <p className="text-secondary text-sm">
                    Try adjusting your search.
                </p>
            </div>
        )}
    </div>
  )
}

export default SearchResult