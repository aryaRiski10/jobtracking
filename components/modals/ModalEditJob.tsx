'use client'
import { X } from "lucide-react";
import { useEffect } from "react";
import type { Job } from "@/app/generated/prisma/client";
import UpdateForm from "../forms/update-form";

export default function ModalEditJob({ isOpen, onCloseEdit, job }: {isOpen: boolean, onCloseEdit: () => void, job: Job | null}) {
    

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!document.getElementById("edit-modal")?.contains(target)) {
                onCloseEdit();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[isOpen, onCloseEdit]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm">
            <div id="edit-modal" className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md overflow-hidden shadow-2xl transform transition-all max-h-[90vh] flex flex-col">
                <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                    <h3 className="font-bold text-xl text-foreground">Edit Application</h3>
                    <button onClick={onCloseEdit}
                        className="size-8 flex items-center justify-center rounded-full hover:bg-muted text-secondary cursor-pointer transition-colors"
                    >
                        <X className="size-5"/>
                    </button>
                </div>
                <div className="overflow-y-auto flex-1">
                    {job && <UpdateForm onClose={onCloseEdit} job={job}/>}
                </div>
            </div>
        </div>
    )
}