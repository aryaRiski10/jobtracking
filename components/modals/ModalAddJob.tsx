'use client'
import { X } from "lucide-react";
import { useEffect } from "react";
import CreateForm from "../forms/create-form";

export default function ModalAddJob({ isOpen, onClose}: {isOpen: boolean, onClose: () => void}) {
    

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (!document.getElementById("add-modal")?.contains(target)) {
                console.log("Clicked outside modal");
                onClose();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm m-0">
            <div id="add-modal" className="bg-white rounded-3xl w-full max-w-md overflow-hidden shadow-2xl transform transition-all">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="font-bold text-xl text-foreground">Add Application</h3>
                    <button onClick={onClose}
                        className="size-8 flex items-center justify-center rounded-full hover:bg-muted text-secondary cursor-pointer transition-colors"
                    >
                        <X className="size-5"/>

                    </button>
                </div>
                <CreateForm onClose={onClose}/>
                
            </div>
        </div>
    )
}