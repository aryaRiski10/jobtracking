'use client'

import { updateJob } from "@/lib/actions";
import { useActionState } from "react";
import type { Job } from "@/app/generated/prisma/client";

export default function UpdateForm({ onClose, job }: { onClose: () => void, job: Job }) {
    const updateJobWithId = updateJob.bind(null, job.id);
    const [ state, formAction ] = useActionState(updateJobWithId, null);
    
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
                <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-foreground mb-1.5">
                    Company Name
                    </label>
                    <input
                    type="text"
                    name="companyName"
                    id="companyName"
                    placeholder="e.g. Google"
                    className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    defaultValue={job.companyName}
                    />
                    <div id="companyName-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.companyName?.[0]}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="position" className="block text-sm font-medium text-foreground mb-1.5">
                    Position Title
                    </label>
                    <input
                    type="text"
                    name="position"
                    id="position"
                    placeholder="e.g. Senior Designer"
                    className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    defaultValue={job.position} 
                    />
                    <div id="position-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.position?.[0]}</span>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="status" className="block text-sm font-medium text-foreground mb-1.5">
                            Status
                        </label>
                        <select
                            name="status"
                            id="status"
                            className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all cursor-pointer appearance-none"
                            defaultValue={job.status}
                        >
                            <option value="applied">Applied</option>
                            <option value="interview">Interviewing</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                        </select>
                        <div id="status-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                            <span className="mt-2 text-sm text-red-500">{fieldErrors?.status?.[0]}</span>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="dateApplied" className="block text-sm font-medium text-foreground mb-1.5">
                            Date Applied
                        </label>
                        <input
                            type="datetime-local"
                            name="dateApplied"
                            id="dateApplied"
                            className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                            defaultValue={job.dateApplied.toISOString().slice(0, 16)}
                        />
                    </div>
                    <div id="dateApplied-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.dateApplied?.[0]}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="jobUrl" className="block text-sm font-medium text-foreground mb-1.5">
                    Job URL (Optional)
                    </label>
                    <input
                    type="url"
                    name="jobUrl"
                    id="jobUrl"
                    placeholder="https://..."
                    defaultValue={job.jobUrl ?? ''}
                    className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all"
                    />
                    <div id="jobUrl-error" className="text-red-500 text-sm mt-1" aria-live="polite" aria-atomic="true">
                        <span className="mt-2 text-sm text-red-500">{fieldErrors?.jobUrl?.[0]}</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-foreground mb-1.5">
                    Notes (Optional)
                    </label>
                    <textarea
                    name="notes"
                    id="notes"
                    rows={4}
                    placeholder="Additional details about the job application..."
                    defaultValue={job.notes ?? ''}
                    className="w-full bg-muted border border-transparent focus:border-primary focus:bg-white rounded-xl px-4 py-3 text-sm outline-none transition-all resize-none"
                    ></textarea>
                </div>
            </div>

            <div className="p-6 border-t border-border bg-card-grey flex justify-end gap-3">
                <button type="button" onClick={onClose} className="px-6 py-2.5 rounded-xl font-medium text-secondary hover:bg-muted transition-colors cursor-pointer">
                    Cancel
                </button>
                <button type="submit" className="px-6 py-2.5 rounded-xl font-semibold bg-primary text-white hover:bg-primary-hover transition-colors cursor-pointer shadow-sm shadow-primary/30">
                    Update Job
                </button>
            </div>
        </form>
    )
}