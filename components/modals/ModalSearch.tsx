import { Job } from "@/app/generated/prisma/browser";
import SearchClient from "./search/SearchClient";

export default function ModalSearch({ closeModalSearch, jobs, isOpen, onClose }: { closeModalSearch: () => void, jobs: Job[], isOpen: boolean, onClose: () => void }) {
    
    return (
        <>
            <SearchClient closeModalSearch={closeModalSearch} jobs={jobs} isOpen={isOpen} onClose={onClose} />
        </>
    )
}