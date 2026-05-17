import { signIn } from "@/auth"
import { FcGoogle } from "react-icons/fc";


export function GoogleButton() {
    return (
        <form className="w-full" action={async() => {
            'use server'
            await signIn("google", { callbackUrl: "/dashboard" })
        }}>
            <button type="submit" className="w-full flex items-center justify-center gap-1 py-2.5 px-8 rounded-sm capitalize text-gray-600 font-bold text-sm bg-gray-100 hover:bg-gray-200 border border-gray-300">
                <FcGoogle /> Login with Google
            </button>
        </form>
    )
}