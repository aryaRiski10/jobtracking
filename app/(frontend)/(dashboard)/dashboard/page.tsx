import { Award, Calendar, Send, TrendingUp } from "lucide-react";
import { getJobs, getInterviews, getStatusLabelInterview } from "@/lib/data";

export default async function DashboardPage() {
    const jobs = await getJobs();
    const interviews = await getInterviews();

    return (
        <section id="section-overview" className="space-y-6 block">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-secondary text-sm">Total Applied</p>
                    <div className="size-8 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Send className="size-4 text-primary" />
                    </div>
                </div>
                <div className="flex items-end gap-2">
                    <h3 className="font-bold text-3xl text-foreground">{jobs.length}</h3>
                    <span className="text-xs font-medium text-success mb-1 flex items-center">
                    <TrendingUp className="size-3 mr-1" />
                    +
                    {jobs.filter(job => {
                        const oneWeekAgo = new Date();
                        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
                        return job.dateApplied >= oneWeekAgo;
                    }).length} this week
                    </span>
                </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-secondary text-sm">Interviews</p>
                    <div className="size-8 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Calendar className="size-4 text-warning" />
                    </div>
                </div>
                <div className="flex items-end gap-2">
                    <h3 className="font-bold text-3xl text-foreground">{interviews.filter(interview => {
                        return interview.date;
                    }).length}</h3>
                    <span className="text-xs font-medium text-secondary mb-1">
                    {interviews.filter(interview => {
                        return interview.date === null;
                    }).length} pending
                    </span>
                </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-secondary text-sm">Offers</p>
                    <div className="size-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <Award className="size-4 text-success" />
                    </div>
                </div>
                <div className="flex items-end gap-2">
                    <h3 className="font-bold text-3xl text-foreground">{jobs.filter(job => job.status === "offer").length}</h3>
                    <span className="text-xs font-medium text-secondary mb-1">
                    Pending response
                    </span>
                </div>
                </div>
            </div>
            {/* Chart & Timeline Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-border p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-lg text-foreground">
                    Application Activity
                    </h3>
                    <select className="bg-muted border-none text-sm font-medium rounded-lg px-3 py-1.5 outline-none cursor-pointer">
                    <option>Last 30 Days</option>
                    <option>This Year</option>
                    </select>
                </div>
                <div className="h-[250px] w-full">
                    <canvas id="activityChart" />
                </div>
                </div>
                {/* Timeline */}
                <div className="bg-white rounded-2xl border border-border p-6 shadow-sm flex flex-col">
                <h3 className="font-bold text-lg text-foreground mb-6">
                    Recent Activity
                </h3>
                <div className="flex-1 overflow-y-auto pr-2">
                    <div className="relative border-l-2 border-muted ml-3 space-y-6 pb-4">
                        {jobs.map(job => {
                            return (
                                <div key={job.id} className="relative pl-6">
                                    <div className={`absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 ${job.status === "applied" ? "border-muted" : job.status === "interview" ? "border-primary" : job.status === "offer" ? "border-success" : job.status === "rejected" ? "border-error" : "border-muted"}`} />
                                    <p className="text-xs text-secondary mb-1">
                                        {getStatusLabelInterview(job)}
                                    </p>
                                    <p className="font-medium text-sm text-foreground">
                                    {job.status === "applied" ? "Applied for role" : job.status === "interview" ? "Interview scheduled" : job.status === "offer" ? "Received offer" : job.status === "rejected" ? "Application Rejected" : "Status updated"}
                                    </p>
                                    <p className="text-sm text-secondary mt-1">
                                    {job.position} at {job.companyName}
                                    </p>
                                </div>
                            )
                        })}
                        {/* <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 border-primary" />
                            <p className="text-xs text-secondary mb-1">Today, 10:30 AM</p>
                            <p className="font-medium text-sm text-foreground">
                            Interview scheduled
                            </p>
                            <p className="text-sm text-secondary mt-1">
                            Product Designer at Stripe
                            </p>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 border-success" />
                            <p className="text-xs text-secondary mb-1">Yesterday</p>
                            <p className="font-medium text-sm text-foreground">
                            Application moved to Review
                            </p>
                            <p className="text-sm text-secondary mt-1">
                            UX Researcher at Spotify
                            </p>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 border-muted" />
                            <p className="text-xs text-secondary mb-1">Oct 24, 2023</p>
                            <p className="font-medium text-sm text-foreground">
                            Applied for role
                            </p>
                            <p className="text-sm text-secondary mt-1">
                            Frontend Dev at Vercel
                            </p>
                        </div>
                        <div className="relative pl-6">
                            <div className="absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 border-error" />
                            <p className="text-xs text-secondary mb-1">Oct 22, 2023</p>
                            <p className="font-medium text-sm text-foreground">
                            Application Rejected
                            </p>
                            <p className="text-sm text-secondary mt-1">
                            Senior Designer at Netflix
                            </p>
                        </div> */}
                    </div>
                </div>
                </div>
            </div>
        </section>
        
    )
}