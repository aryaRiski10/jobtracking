'use client'

import { updateInterview } from "@/lib/actions";
import { useActionState } from "react";
import type { InterviewWithJob } from "@/types/types";
import { ChevronDown } from "lucide-react";

export default function UpdateFormInterview({ onClose, interview }: { onClose: () => void, interview: InterviewWithJob }) {
    const updateInterviewWithId = updateInterview.bind(null, interview.id);
    const [ state, formAction ] = useActionState(updateInterviewWithId, null);
    
    const formError = typeof state?.error === "string" ? state.error : undefined;
    const fieldErrors = typeof state?.error === "string" ? undefined : state?.error;

    return (
        <form action={formAction} className="space-y-4">
            {formError ? (
                <div className="mx-6 mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formError}
                </div>
            ) : null}
            <div className="p-6 flex flex-col gap-4 ">
                <div className="relative">
                    <label htmlFor="status" className="block text-sm font-medium text-foreground mb-1.5">
                        Interview Title
                    </label>
                    <div className="relative">
                        <select
                            name="title"
                            id="title"
                            className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all cursor-pointer appearance-none"
                            defaultValue={interview.title ?? 'hr interview'}
                            >
                            <option value="hr interview">HR Interview</option>
                            <option value="technical interview">Technical Interview</option>
                            <option value="user interview">User Interview</option>
                            <option value="final interview">Final Interview</option>  
                            <option value="salary offering">Salary Offering</option>
                        </select>
                        <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary"/>
                    </div>
                    <div id="title-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.title?.[0]}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                        <label htmlFor="type" className="block text-sm font-medium text-foreground mb-1.5">
                            Type Interview
                        </label>
                        <div className="relative">
                            <select
                                name="type"
                                id="type"
                                className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all cursor-pointer appearance-none"
                                defaultValue={interview.type ?? 'online'}
                                >
                                <option value="online">Online</option>
                                <option value="onsite">Onsite</option>
                            </select>
                            <ChevronDown className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-secondary"/>
                        </div>
                        <div id="type-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                            <span className="mt-2 text-sm text-red-500">{fieldErrors?.type?.[0]}</span>
                        </div>
                    </div>
                    <div className="relative">
                        <label htmlFor="dateApplied" className="block text-sm font-medium text-foreground mb-1.5">
                            Date Interview
                        </label>
                        <input
                            type="datetime-local"
                            name="date"
                            id="date"
                            className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                            defaultValue={interview.date ? interview.date.toISOString().slice(0, 16) : ''}
                        />
                    </div>
                    <div id="date-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.date?.[0]}</span>
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="jobUrl" className="block text-sm font-medium text-foreground mb-1.5">
                    Link Meet / Location (Optional)
                    </label>
                    <input
                    type="url"
                    name="link"
                    id="link"
                    placeholder="https://..."
                    defaultValue={interview.link ?? ''}
                    className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    />
                    <div id="link-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.link?.[0]}</span>
                    </div>
                </div>
                <div className="relative">
                    <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1.5">
                    Notes (Optional)
                    </label>
                    <textarea
                    name="notes"
                    id="notes"
                    rows={4}
                    placeholder="Additional details about the interview..."
                    defaultValue={interview.notes ?? ''}
                    className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                    ></textarea>
                </div>
                <div className="relative">
                    <label htmlFor="status" className="block text-sm font-medium text-foreground mb-1.5">
                        Status
                    </label>
                    <select
                        name="status"
                        id="status"
                        className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all cursor-pointer appearance-none"
                        defaultValue={interview.status}
                    >
                        <option value="upcoming">Upcoming</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                    <div id="status-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.status?.[0]}</span>
                    </div>
                </div>
                
            </div>

            <div className="p-6 border-t border-border bg-card-grey flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-medium text-secondary hover:bg-muted transition-colors cursor-pointer">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer shadow-sm shadow-primary/30">
                    Update Interview
                </button>
            </div>
        </form>
    )
}