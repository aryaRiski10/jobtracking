import { Award, Calendar, Send, TrendingUp } from "lucide-react";
import { getJobs, getInterviews, getStatusLabelInterview } from "@/lib/data";
import { getActivityData } from "@/lib/actions";
import Charts from "./components/Charts";

export default async function DashboardPage() {
    const jobs = await getJobs();
    const interviews = await getInterviews();
    const activityData = await getActivityData();

    return (
        <section id="section-overview" className="space-y-6 block">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">Total Applied</p>
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
                    <p className="font-medium text-sm">Interviews</p>
                    <div className="size-8 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Calendar className="size-4 text-warning" />
                    </div>
                </div>
                <div className="flex items-end gap-2">
                    <h3 className="font-bold text-3xl text-foreground">{interviews.filter(interview => {
                        return interview.date;
                    }).length}</h3>
                    <span className="text-xs font-medium mb-1">
                    {interviews.filter(interview => {
                        return interview.date === null;
                    }).length} pending
                    </span>
                </div>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-border flex flex-col gap-2 shadow-sm">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-sm">Offers</p>
                    <div className="size-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <Award className="size-4 text-success" />
                    </div>
                </div>
                <div className="flex items-end gap-2">
                    <h3 className="font-bold text-3xl text-foreground">{jobs.filter(job => job.status === "offer").length}</h3>
                    <span className="text-xs font-medium mb-1">
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
                <div className="w-full relative">
                    {/* <canvas id="activityChart" /> */}
                    <Charts data={activityData} />
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
                                    <div className={`absolute -left-[9px] top-1 size-4 rounded-full bg-white border-2 ${job.status === "applied" ? "border-muted-foreground" : job.status === "interview" ? "border-primary-hover" : job.status === "offer" ? "border-success" : job.status === "rejected" ? "border-error" : "border-muted"}`} />
                                    <p className="text-xs mb-1 text-muted-foreground">
                                        {getStatusLabelInterview(job)}
                                    </p>
                                    <p className="font-semibold text-sm">
                                        {job.status === "applied" ? "Applied for role" : job.status === "interview" ? "Interview scheduled" : job.status === "offer" ? "Received offer" : job.status === "rejected" ? "Application Rejected" : "Status updated"}
                                    </p>
                                    <p className="text-sm mt-1">
                                        {job.position} at {job.companyName}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                </div>
            </div>
        </section>
        
    )
}