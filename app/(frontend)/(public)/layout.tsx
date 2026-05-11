import Header from "@/components/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
                {children}
            </main>
        </>
    )
}