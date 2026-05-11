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

    console.log(validatedField);

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
    } catch (error) {
        return {
            error: "An unexpected error occurred while updating the job.",
        }
    }
    console.log("Job updated successfully");

    revalidatePath("/dashboard/applications");
    redirect("/dashboard/applications");
}