import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { JobWithInterviews } from "@/types/types";

export async function getJobs() {

    const session = await auth();

    if (!session?.user?.id) {
        // throw new Error("Unauthorized");
        return [];
    }

    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                dateApplied: "desc",
            },
            include:{
                interviews: true,
            }
        });
        return jobs;
    } catch {
        throw new Error("Failed to fetch jobs");
    }
}

export async function getInterviews() {
    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    try{
        const interviews = await prisma.interview.findMany({
            where: {
                job: {
                    userId: session.user.id,
                    status: "interview",
                },
            },
            orderBy: {
                date: "asc",
            },
            include: {
                job: true,
            },
        })
        return interviews;
    } catch {
        throw new Error("Failed to fetch interviews");
    }
}

export function getStatusLabelInterview(job: JobWithInterviews){
    const interviewDate = job.interviews[0]?.date; // Assuming one interview per job for simplicity
    switch (job.status) {
        case "applied":
            return `Applied on ${new Date(job.dateApplied).toLocaleDateString()}`;
        case "interview":
            return interviewDate
                ? `Interview on ${new Date(interviewDate).toLocaleDateString()}`
                : "Interview date not set";
        case "offer":
            return `Offer received on ${new Date(job.dateApplied).toLocaleDateString()}`;
        case "rejected":
            return `Rejected on ${new Date(job.updatedAt).toLocaleDateString()}`;
        default:
            return `Updated on ${new Date(job.dateApplied).toLocaleDateString()}`;
    }
}