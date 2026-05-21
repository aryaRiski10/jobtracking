'use client'
import ModalEditInterview from '@/components/modals/ModalEditInterview'
import { ListCardInterviewProps } from '@/types/types'
import { Building2, Edit, Link as LinkMeet, MapPin } from 'lucide-react'
import React, { useState } from 'react'

const ListCard = ({ interview }: ListCardInterviewProps) => {
  const [isOpenModalEditInterview, setIsOpenModalEditInterview] = useState<boolean>(false);
  function handleOpenModalEditInterview(){
    setIsOpenModalEditInterview(true);
  }
  return (
    <>
    <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex flex-col sm:flex-row gap-5 relative overflow-hidden">
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${interview.type === 'online' ? 'bg-primary' : interview.type === 'onsite' ? 'bg-warning' : 'bg-gray-300'}`} />
      {/* Date Block */}
      <div className="flex sm:flex-col items-center sm:justify-center gap-3 sm:gap-1 sm:w-24 shrink-0 border-b sm:border-b-0 sm:border-r border-border pb-4 sm:pb-0 sm:pr-4">
        {!interview.date ? (
          <span className="text-sm font-bold text-foreground text-center">No Schedule</span>
        ) : 
        
        (
          <>
            <span className="text-sm font-semibold text-error uppercase tracking-wider">Oct</span>
            <span className="text-3xl font-bold text-foreground">28</span>
            <span className="text-sm text-muted-foreground font-medium">10:00 AM</span>
          </>
        )}
        
      </div>
      {/* Details */}
      <div className="flex-1 flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
            {interview.type || '-'}
          </span>
        </div>
        <h3 className="font-bold text-lg text-foreground truncate capitalize">
          {interview.job.position} - {interview.title ? interview.title : 'HR Interview'}
        </h3>
        <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-1 truncate">
          <Building2 className="size-4"/> {interview.job.companyName}
        </p>
      </div>
      {/* Actions */}
      <div className="flex flex-row sm:flex-col items-center justify-end gap-2 shrink-0 mt-2 sm:mt-0 items-end">
        <div className="flex gap-4 items-center">
          <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium inset-ring ${interview.date ? 'bg-green-400/10 text-green-400 inset-ring-green-500/20' : 'bg-yellow-400/10 text-yellow-500 inset-ring-yellow-400/20'} `}>Update the Schedule</span>
          <button id="editButtonInterview" onClick={handleOpenModalEditInterview} className="size-10 rounded-xl border border-[#EEF0FF] flex items-center justify-center text-muted-foreground hover:bg-muted transition-colors cursor-pointer" title="Edit">
              <Edit className="size-4" />
          </button>
        </div> 
        <a href={interview.link ? interview.link : ''} className={`w-full sm:w-auto px-4 py-2 bg-muted hover:bg-card-grey text-foreground rounded-xl text-sm font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 ${interview.link ? 'cursor-pointer' : 'opacity-50 pointer-events-none cursor-not-allowed'} `}>
          {interview.type === 'online' ? (
            <>
              <LinkMeet className="size-4"/> Join Meet
            </>
          ) :(
            <>
              <MapPin className="size-4"/> View Location
            </>
          )}
        </a>
      </div>
    </div>
    <ModalEditInterview interview={interview} isOpen={isOpenModalEditInterview} onClose={() => setIsOpenModalEditInterview(false)} />
    </>
  )}

export default ListCard