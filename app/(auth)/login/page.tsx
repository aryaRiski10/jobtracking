import { GoogleButton } from "@/components/auth/social-button";
import { Lock } from "lucide-react";

export default function LoginPage() {
    return (
        <div className=' max-w-md flex flex-col justify-center items-center mx-auto h-screen p-6 space-y-4'>
            <div className="flex flex-col gap-4 shadow-xl items-center rounded-md bg-white border-2 border-gray-200 p-12">
                <Lock className="text-blue-500" />
                <h1 className='text-2xl font-semibold text-gray-900'>Welcome</h1>
                <span>Sign in to access your dashboard</span>
                <GoogleButton />
            </div>
        </div>
    )
}