import Header from "@/components/Header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            <main className="flex-1 max-w-full w-full mx-auto h-screen">
                {children}
            </main>
        </>
    )
}