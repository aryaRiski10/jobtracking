'use client'

import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { useState } from "react";
import ModalDetailJob from "@/components/modals/ModalDetailJob";
import type {ListCardProps} from "@/types/types";
import ModalEditJob from "@/components/modals/ModalEditJob";

export default function ListCard({ job }: ListCardProps) {
    const [isOpenModalDetailJob, setIsOpenModalDetailJob] = useState<boolean>(false);
    const [isOpenModalEditJob, setIsOpenModalEditJob] = useState<boolean>(false);  

    function handlerOpenModalDetailJob() {
        setIsOpenModalDetailJob(!isOpenModalDetailJob);
    }

    function handleOpenEditJob(){
        setIsOpenModalEditJob(true);
        setIsOpenModalDetailJob(false);
    }

    return (
        <>
        <div className="p-4 hover:bg-card-grey transition-colors flex flex-col sm:flex-row sm:items-center gap-4 group" data-item-id={`job-${job.id}`} data-status={job.status} data-searchable={`${job.companyName} ${job.position}`}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="size-12 rounded-xl border border-border flex items-center justify-center bg-[#e2e2e2] shrink-0 overflow-hidden">
                <span className="w-8 h-8 flex items-center justify-center font-bold">{job.position.split(" ").map(word => word[0]).join("")}</span>
            </div>
            <div className="min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                {job.position}
                </h4>
                <p className="text-sm text-secondary truncate">
                {job.companyName}
                </p>
            </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4 sm:w-[300px] shrink-0">
            <div className="flex flex-col sm:items-end">
                <span
                className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${job.status === 'applied' ? 'badge-applied' : job.status === 'interview' ? 'badge-interview' : job.status === 'offer' ? 'badge-offer' : 'badge-rejected'}`}
                data-status-badge=""
                >
                {job.status}
                </span>
                <span className="text-xs text-secondary mt-1 hidden sm:block">
                Applied on {formatDate(job.dateApplied)}
                </span>
            </div>
            <button
                onClick={handlerOpenModalDetailJob}
                className="size-9 rounded-lg border border-border flex items-center justify-center text-secondary hover:bg-white hover:text-primary hover:border-primary transition-colors cursor-pointer bg-muted"
                >
                <ChevronRight className="size-5"/>
            </button>
            </div>
        </div>
        <ModalDetailJob job={job} onOpenEdit={handleOpenEditJob} isOpen={isOpenModalDetailJob} onClose={() => setIsOpenModalDetailJob(false)}/>
        <ModalEditJob job={job} isOpen={isOpenModalEditJob} onCloseEdit={() => setIsOpenModalEditJob(false)}/>

        </>
    )
}