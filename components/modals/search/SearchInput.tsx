import React from 'react'
import { Search } from "lucide-react";


const SearchInput = ({search}: {search: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
  return (
    <div className="p-4 border-b border-border">
        <div className="flex items-center gap-3 bg-muted rounded-xl px-4 border border-transparent focus-within:border-primary focus-within:bg-white transition-all">
            <Search className="size-5 text-secondary" />
            <input
            type="text"
            id="global-search-input"
            placeholder="Search jobs, companies, or interviews..."
            className="flex-1 py-3 bg-transparent outline-none text-foreground"
            onChange={search}
            />
            <kbd className="hidden sm:inline-flex px-2 py-1 bg-white rounded-lg text-xs text-secondary border border-border font-sans">
            ESC
            </kbd>
        </div>
    </div>
  )
}

export default SearchInput