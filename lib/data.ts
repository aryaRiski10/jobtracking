import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function getJobs() {

    const session = await auth();

    if (!session?.user?.id) {
        throw new Error("Unauthorized");
    }

    try {
        const jobs = await prisma.job.findMany({
            where: {
                userId: session.user.id,
            },
            orderBy: {
                dateApplied: "desc",
            }
        });
        return jobs;
    } catch (error) {
        throw new Error("Failed to fetch jobs");
    }
}