import type { InterviewWithJob,ListCardInterviewProps } from '@/types/types';
import { X } from 'lucide-react'
import React from 'react'
import UpdateForm from '../forms/update-form-interview';

const ModalEditInterview = ({ interview, isOpen, onClose }: { interview: InterviewWithJob, isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center sm:p-4 backdrop-blur-sm">
        <div id="edit-modal" className="bg-white rounded-t-3xl sm:rounded-3xl w-full sm:max-w-md overflow-hidden shadow-2xl transform transition-all max-h-[90vh] flex flex-col">
            <div className="p-6 border-b border-border flex items-center justify-between shrink-0">
                <h3 className="font-bold text-xl text-foreground">Edit Interview - {interview.id}</h3>
                <button onClick={onClose} className="size-8 flex items-center justify-center rounded-full hover:bg-muted text-secondary cursor-pointer transition-colors">
                    <X className="size-5"/>
                </button>
            </div>
            <div className="overflow-y-auto flex-1">
                {interview && <UpdateForm onClose={onClose} interview={interview}/>}
            </div>
        </div>
    </div>
  )
}

export default ModalEditInterview