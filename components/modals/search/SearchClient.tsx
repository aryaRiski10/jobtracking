'use client'
import SearchResult from './SearchResult'
import SearchInput from './SearchInput'
import { useEffect, useState } from 'react'
import type { Job } from "@/app/generated/prisma/client"
import ModalDetailJob from '../ModalDetailJob'
import ModalEditJob from '../ModalEditJob'

const SearchClient = ({ closeModalSearch, jobs, isOpen, onClose }: { closeModalSearch: () => void, jobs: Job[], isOpen: boolean, onClose: () => void }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJob, setSelectedJob] = useState<Job | null>(null);
    const [isOpenModalDetailJob, setIsOpenModalDetailJob] = useState<boolean>(false);
    const [isOpenModalEditJob, setIsOpenModalEditJob] = useState<boolean>(false);  


    function handleSearchQuery(e: any){
        setSearchQuery(e.target.value);
    }

    function handleOpenModalDetailJob(job: Job){
        setSelectedJob(job);
        setIsOpenModalDetailJob(true);
        closeModalSearch();
    }

    function handleOpenEditJob(){
        setIsOpenModalEditJob(true);
        setIsOpenModalDetailJob(false);
    }

    useEffect(() => {
        if (!isOpen) return;

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!document.getElementById("search-modal")?.contains(target)) {
                onClose();
            }
        }

        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);


    const searchJobs = jobs.filter((job) => {
        if (searchQuery){
            return job.position.toLowerCase().includes(searchQuery.toLowerCase());
        }else{
            return true;
        }
    })

  return (
    <>
    {isOpen && (
    <div className="fixed inset-0 bg-black/50 z-100 flex items-start justify-center pt-[10vh] p-4 backdrop-blur-sm">
        <div id="search-modal" className="w-full max-w-lg">
            <div className="bg-white w-full max-w-2xl overflow-hidden shadow-2xl rounded-3xl">
                <SearchInput search={handleSearchQuery} />
                <SearchResult openJobDetail={handleOpenModalDetailJob} query={searchQuery} resultsJobs={searchJobs} />
            </div>
        </div>
    </div>
    )}
    <ModalDetailJob job={selectedJob} onOpenEdit={handleOpenEditJob} isOpen={isOpenModalDetailJob} onClose={() => setIsOpenModalDetailJob(false)}/>
    <ModalEditJob job={selectedJob} isOpen={isOpenModalEditJob} onCloseEdit={() => setIsOpenModalEditJob(false)}/>
    
    </>
  )
}

export default SearchClient