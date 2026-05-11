import { formatDate } from "@/lib/utils";
import { ListCardProps } from "@/types/types";
import { Edit, ExternalLink, FileText, X, Trash } from "lucide-react";
import type { Job } from "@/app/generated/prisma/client";

export default function ModalDetailJob({job, onOpenEdit, isOpen, onClose}: {job: Job | null, onOpenEdit: () => void, isOpen: boolean, onClose: () => void}) {
    
    // useEffect(() => {
    //     if (!isOpen) return;

    //     function handleMouseDown(event: MouseEvent) {
    //         const target = event.target as HTMLElement;
    //         if (target.id === "detail-modal" || target.closest("#detail-modal") === null) {
    //             onClose();
    //         }
    //     }

    //     window.addEventListener("mousedown", handleMouseDown);

    //     return () => {
    //         window.removeEventListener("mousedown", handleMouseDown);
    //     };
    // }, [isOpen, onClose]);
    if (!isOpen) return null;

    return (
        <>
        <div id="detail-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
                {/* Header */}
                <div className="p-6 border-b border-border flex items-start justify-between bg-card-grey relative">
                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-xl border border-border flex items-center justify-center bg-white shrink-0 overflow-hidden">
                            <span className="w-8 h-8 flex items-center justify-center font-bold">{job?.position.split(" ").map(word => word[0]).join("")}</span>
                    </div>
                    <div>
                    <h3
                        id="detailRole"
                        className="font-bold text-xl text-foreground leading-tight"
                        >
                        {job?.position}
                    </h3>
                    <p id="detailCompany" className="text-secondary font-medium">
                        {job?.companyName}
                    </p>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="size-8 flex items-center justify-center rounded-full bg-white border border-border hover:bg-muted text-secondary cursor-pointer transition-colors absolute top-6 right-6 shadow-sm"
                    >
                    <X className="size-4" />
                </button>
                </div>
                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1 space-y-6">
                {/* Status & Actions */}
                <div className="flex items-center justify-between">
                    <div
                    id="detailStatusBadge"
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${job?.status === 'applied' ? 'badge-applied' : job?.status === 'interview' ? 'badge-interview' : job?.status === 'offer' ? 'badge-offer' : 'badge-rejected'}`}
                    >
                    {job?.status}
                    </div>
                    <div className="flex gap-2">
                    <button id="editButton"
                        className="size-10 rounded-xl border border-[#EEF0FF] flex items-center justify-center text-secondary hover:bg-muted transition-colors cursor-pointer"
                        title="Edit"
                        onClick={onOpenEdit}
                        >
                        <Edit className="size-4" />
                    </button>
                    <a  href={job?.jobUrl ?? ' '} target="_blank" rel="noopener noreferrer" className={` ${job?.jobUrl ? '' : 'pointer-events-none opacity-50 cursor-default'} size-10 rounded-xl border border-[#EEF0FF] flex items-center justify-center text-secondary hover:bg-muted transition-colors cursor-pointer`} title="Visit Link">
                        <ExternalLink className="size-4" />
                    </a>
                    <button className="size-10 rounded-xl border border-[#EEF0FF] flex items-center justify-center text-secondary hover:bg-muted transition-colors cursor-pointer"
                        title="Delete">
                        <Trash className="size-4 text-[#BC4800]" />
                    </button>
                    </div>
                </div>
                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted p-4 rounded-2xl">
                    <p className="text-xs text-secondary font-medium mb-1 uppercase tracking-wider">
                        Date Applied
                    </p>
                    <p id="detailDate" className="font-semibold text-foreground">
                        {job?.dateApplied ? formatDate(job.dateApplied) : "N/A"}
                    </p>
                    </div>
                    <div className="bg-muted p-4 rounded-2xl">
                    <p className="text-xs text-secondary font-medium mb-1 uppercase tracking-wider">
                        Location
                    </p>
                    <p id="detailLocation" className="font-semibold text-foreground">
                        {job?.companyLocation || "N/A"}
                    </p>
                    </div>
                </div>
                {/* Notes */}
                <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                    <FileText className="size-4 text-secondary" /> Notes
                    </h4>
                    <div className="bg-card-grey border border-border rounded-2xl p-4 text-sm text-secondary leading-relaxed min-h-[100px]">
                    {job?.notes || "No notes added yet."}
                    </div>
                </div>
                </div>
            </div>
        </div>
        </>

    )}