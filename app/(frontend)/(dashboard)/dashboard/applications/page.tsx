import ApplicationsClient from "./ApplicationsClient";
import ButtonJobAdd from "./components/ButtonJobAdd";
import { getJobs } from "@/lib/data";

export default async function ApplicationsPage() {
    const jobs = await getJobs();

    return (
        <section id="section-applications" className="space-y-6">
            {/* Header & Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="font-bold text-2xl text-foreground">My Applications</h2>
                <ButtonJobAdd />
            </div>
            <ApplicationsClient jobs={jobs} />
            
            
        </section>

    )
}