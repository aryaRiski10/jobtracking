import ListCard from "./ListCard";
import type { JobModel as Job } from "@/app/generated/prisma/models"
import { Session } from "next-auth";


export default function ViewJob( {jobs}: {jobs: Job[]} ) {      
    return (
        <div className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden">
            { jobs.length > 0 ? (
                <div id="applicationsList" className="divide-y divide-border">
                    {jobs.map((job) => (
                        <ListCard key={job.id} job={job}/>
                    ))}
                </div>
            ) : (
                <div id="noResults" className="p-12 text-center flex flex-col items-center justify-center">
                    <div className="size-16 bg-muted rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="search-x" className="size-8 text-secondary" />
                    </div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">
                        No applications found
                    </h3>
                    <p className="text-secondary text-sm">
                        Try adjusting your search or filters.
                    </p>
                </div>
            )}     
        </div>
    )
}