import { Children } from "react";
import Sidebar from "../../../../components/dashboard/Sidebar";
import Header from "../../../../components/dashboard/Header";


export default function DashboardLayout({ children }: { children: React.ReactNode }){
    return (
        <div className="font-sans bg-card-grey min-h-screen flex flex-col md:flex-row">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0">
                <Header />
                <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}