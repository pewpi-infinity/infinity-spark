import { InfinitySearch } from '@/components/InfinitySearch'
import { Infinity } from '@phosphor-icons/react'

interface EntryViewProps {
  onSearch: (query: string) => Promise<void>
  onEnterInfinity: () => void
  isSearching: boolean
}

export function EntryView({ onSearch, onEnterInfinity, isSearching }: EntryViewProps) {
  console.log('✨ EntryView rendering, isSearching:', isSearching)
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <button
        onClick={onEnterInfinity}
        className="absolute top-8 left-1/2 -translate-x-1/2 group transition-all duration-300 hover:scale-105"
        aria-label="Enter Infinity Hub"
      >
        <div className="flex items-center gap-3">
          <Infinity size={48} weight="bold" className="text-accent group-hover:animate-spin" />
          <span className="text-2xl font-bold tracking-tight text-foreground opacity-0 group-hover:opacity-100 transition-opacity">
            INFINITY
          </span>
        </div>
      </button>

      <div className="w-full max-w-2xl space-y-8">
        <div className="flex flex-col items-center space-y-8">
          <InfinitySearch
            onSearch={onSearch}
            isLoading={isSearching}
            placeholder="Search to create..."
            size="large"
          />
          
          <p className="text-sm text-muted-foreground text-center max-w-md">
            Search to create
          </p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
        Nothing up front — everything behind intent.
      </div>
    </div>
  )
}
