import { signIn } from "@/auth"
import { IoLogoGoogle } from "react-icons/io5"

export function GoogleButton() {
    return (
        <form action={async() => {
            'use server'
            await signIn("google", { callbackUrl: "/dashboard" })
        }}>
            <button type="submit" className="flex items-center justify-center gap-1 py-2.5 px-8 rounded-lg uppercase text-white font-medium text-sm bg-blue-500 hover:bg-blue-500 w-full">
                <IoLogoGoogle /> Sign in with Google
            </button>
        </form>
    )
}