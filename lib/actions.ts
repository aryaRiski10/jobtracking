'use server'
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const emptyStringToUndefined = (value: unknown) => {
    if (typeof value === "string" && value.trim() === "") {
        return undefined;
    }
    return value;
};

const jobSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    companyLocation: z.string().optional(), 
    position: z.string().min(1, "Position title is required"),
    status: z.enum(["applied", "interview", "offer", "rejected"]),
    dateApplied: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    jobUrl: z.preprocess(
        emptyStringToUndefined,
        z.string().url("Invalid URL format").optional(),
    ),
    notes: z.string().optional(),
});

const interviewSchema = z.object({
    title : z.enum(["hr interview", "technical interview", "user interview", "final interview", "salary offering"]),
    type: z.enum(["online", "onsite"]).optional(),
    date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date format",
    }),
    link: z.preprocess(
        emptyStringToUndefined,
        z.string().url("Invalid URL format").optional(),
    ),
    notes: z.string().optional(),
    status: z.enum(["upcoming", "completed", "cancelled"]).optional(),
})

export const addJob = async (prevState: unknown, formData: FormData) => {

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Unauthorized",
        }
    }

    const validatedField = jobSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedField.success) {
        return {
            error: z.flattenError(validatedField.error).fieldErrors,
        }
    }

    try {
        await prisma.job.create({
            data: {
                companyName: validatedField.data.companyName,
                companyLocation: validatedField.data.companyLocation,
                position: validatedField.data.position,
                status: validatedField.data.status,
                dateApplied: new Date(validatedField.data.dateApplied),
                jobUrl: validatedField.data.jobUrl,
                notes: validatedField.data.notes,
                userId: session.user.id,
            }
        })
    } catch (error) {
        return {
            error: "An unexpected error occurred while adding the job.",
        }
    }
    console.log("Job added successfully");

    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
}

export const updateJob = async (id: string, prevState: unknown, formData: FormData) => {

    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Unauthorized",
        }
    }

    const validatedField = jobSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedField.success) {
        return {
            error: z.flattenError(validatedField.error).fieldErrors,
        }
    }

    console.log(validatedField);

    try {
        const currentJob = await prisma.job.findUnique({
            where: { id },
            select: { status: true },
        })
        await prisma.job.update({
            where: { id },
            data: {
                companyName: validatedField.data.companyName,
                companyLocation: validatedField.data.companyLocation,
                position: validatedField.data.position,
                status: validatedField.data.status,
                dateApplied: new Date(validatedField.data.dateApplied),
                jobUrl: validatedField.data.jobUrl,
                notes: validatedField.data.notes,
                userId: session.user.id,
            }
        })

            // If status changed to "interview", create an interview record
        if (currentJob?.status !== "interview" && validatedField.data.status === "interview"){
            await prisma.interview.create({
                data: {
                    jobId: id,
                    status: "upcoming",
                }
            })
        }

    } catch (error) {
        
        return {
            error: "An unexpected error occurred while updating the job.",
        }
    }
    revalidatePath("/dashboard/applications");
    revalidatePath("/dashboard/interviews");
    redirect("/dashboard/applications");
}

// delete job
export const deleteJob = async (id: string) => {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Unauthorized",
        }
    }

    try {
        await prisma.job.delete({
            where: { id, userId: session.user.id },
        });
    } catch (error) {
        return {
            error: "An unexpected error occurred while deleting the job.",
        }
    }

    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
}

// update interview
export const updateInterview = async (id: string, prevState: unknown, formData: FormData) => {
    const session = await auth();

    if (!session?.user?.id) {
        return {
            error: "Unauthorized",
        }
    }

    const validatedField = interviewSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!validatedField.success) {
        return {
            error: z.flattenError(validatedField.error).fieldErrors,
        }
    }

    try{
        await prisma.interview.update({
            where: { id },
            data: {
                title: validatedField.data.title,
                type: validatedField.data.type,
                date: new Date(validatedField.data.date),
                link: validatedField.data.link,
                status: validatedField.data.status,
                notes: validatedField.data.notes,
            }
        })
        console.log("Interview updated successfully");
    } catch (error) {
        return {
            error: "An unexpected error occurred while updating the interview.",
        }
        // console.error(error);
        // console.log(validatedField)
    }

    revalidatePath("/dashboard/interviews");
    redirect("/dashboard/interviews");
}