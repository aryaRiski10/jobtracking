'use client'
import React from 'react'
import SearchFilterJob from './components/SearchFilterJob'
import ViewJob from './components/ViewJob'
import { useState } from 'react'
import type { JobModel as Job } from "@/app/generated/prisma/models"
import type { JobStatus } from "@/app/generated/prisma/enums"

type StatusFilter = "all" | JobStatus;

const ApplicationsClient = ({ jobs }: { jobs: Job[] }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    
    function handleSearchJob(e: React.ChangeEvent<HTMLInputElement>){
        setSearchTerm(e.target.value);
    }

    function handleStatusFilter(e: React.ChangeEvent<HTMLSelectElement>){
        setStatusFilter(e.target.value as StatusFilter);
    }

    const filteredJobs = jobs.filter((job) => {
        if (searchTerm){
            return job.companyName.toLowerCase().includes(searchTerm.toLowerCase()) || job.position.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (statusFilter !== "all"){
            return job.status === statusFilter;
        }else{
            return true;
        }
    })

    return (
        <>
        <div className="bg-white p-4 rounded-2xl border border-border flex flex-col sm:flex-row gap-3 shadow-sm">
            <SearchFilterJob searchTerm={searchTerm} handleSearchJob={handleSearchJob} statusFilter={statusFilter} handleStatusFilter={handleStatusFilter} />
        </div>
        {/* List View */}
        <ViewJob jobs={filteredJobs}/>

        </>
    )
}

export default ApplicationsClient