'use client'

import React from 'react'
import { Search } from "lucide-react";
import { useState } from 'react';

const SearchFilterJob = ({ searchTerm, handleSerachJob, statusFilter, handleStatusFilter }: { searchTerm: string, handleSerachJob: (e: any) => void, statusFilter: string, handleStatusFilter: (e: any) => void }) => {


    return (
        <>
        <div className="flex-1 relative">
            <Search className="size-5 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
            <input type="text" value={searchTerm} id="searchInput" onChange={handleSerachJob} placeholder="Search company or role..." className="w-full bg-muted rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-primary/20 transition-all" />
        </div>
        <select id="statusFilter" value={statusFilter} onChange={handleStatusFilter} className="bg-muted rounded-xl px-4 py-2.5 text-sm font-medium outline-none border-r-8 border-transparent cursor-pointer min-w-[140px]">
            <option value="all">All Status</option>
            <option value="applied">Applied</option>
            <option value="interview">Interviewing</option>
            <option value="offer">Offer</option>
            <option value="rejected">Rejected</option>
        </select>
        </>
    )
}

export default SearchFilterJob