
import type { JobModel as Job } from "@/app/generated/prisma/models/Job";
import type { InterviewModel as Interview } from "@/app/generated/prisma/models/Interview";

export type JobWithInterviews = Job & {
    interviews: Interview[];
}

export type InterviewWithJob = Interview & {
    job: Job;
}

export type JobProps = {
    job: Job;
}

export interface ListCardProps {
    job: Job;
}

export interface ListCardInterviewProps {
    interview: InterviewWithJob;
}

export interface InterviewsClientProps {
    interviews: InterviewWithJob[];
}