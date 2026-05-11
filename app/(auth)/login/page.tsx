import { GoogleButton } from "@/components/auth/social-button";

export default function LoginPage() {
    return (
        <div className=' max-w-md flex flex-col justify-center items-center mx-auto h-screen p-6 space-y-4'>
            <div className="flex flex-col gap-4 shadow-xl items-center rounded-md bg-white border-2 border-gray-200 p-12">
            <h1 className='text-2xl font-semibold text-gray-900'>Login</h1>
            {/* <div className="my-4 flex items-center before:flex-1 before:border-t before:border-gray-300 after:flex-1 after:border-t after:border-gray-300">
            <span className='mx-4 mb-0 text-center font-semibold text-gray-600'>Or</span>
            </div> */}
            <GoogleButton />
            </div>
        </div>
    )
}