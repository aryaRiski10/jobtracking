'use client'

import {useState} from "react";
import { Plus } from "lucide-react";
import ModalAddJob from "@/components/modals/ModalAddJob";


export default function ButtonJobAdd() {
    const [isOpenModalAddJob, setIsOpenModalAddJob] = useState(false);
    
    function handlerOpenModalAddJob() {
        setIsOpenModalAddJob(!isOpenModalAddJob);
    }

    return (
        <>
        <button onClick={() => handlerOpenModalAddJob()} className="bg-primary-hover text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-primary-hover transition-colors flex items-center gap-2 cursor-pointer w-full sm:w-auto justify-center shadow-sm shadow-primary/30">
                <Plus className="size-4" /> Add Job
        </button>
        <ModalAddJob isOpen={isOpenModalAddJob} onClose={() => setIsOpenModalAddJob(false)}/>
        </>
    )
}