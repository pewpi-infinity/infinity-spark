import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface InfinitySearchProps {
  onSearch: (query: string) => void
  isLoading?: boolean
  placeholder?: string
  size?: 'default' | 'large'
}

export function InfinitySearch({ onSearch, isLoading = false, placeholder = 'What world will you build?', size = 'large' }: InfinitySearchProps) {
  const [query, setQuery] = useState('')
  
  console.log('🔍 InfinitySearch rendering, isLoading:', isLoading, 'query:', query)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`flex gap-3 ${size === 'large' ? 'flex-col sm:flex-row' : ''}`}>
        <div className="relative flex-1">
          <Input
            id="infinity-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            disabled={isLoading}
            className={`
              ${size === 'large' ? 'h-16 text-lg px-6' : 'h-12 px-4'}
              cosmic-border
              bg-card/50 backdrop-blur-sm
              focus-visible:ring-2 focus-visible:ring-accent
              focus-visible:cosmic-glow
              transition-all duration-300
            `}
          />
        </div>
        <Button
          type="submit"
          disabled={!query.trim() || isLoading}
          className={`
            ${size === 'large' ? 'h-16 px-8 text-lg' : 'h-12 px-6'}
            bg-accent text-accent-foreground
            hover:bg-accent/90
            cosmic-glow
            font-semibold
            transition-all duration-300
            hover:scale-105
            active:scale-95
            disabled:opacity-50 disabled:cursor-not-allowed
            flex items-center gap-2
          `}
        >
          {isLoading ? (
            <>
              <span className="animate-spin">⚙</span>
              <span>Creating...</span>
            </>
          ) : (
            <>
              <InfinityIcon />
              <span>Create</span>
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function InfinityIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="animate-cosmic-pulse"
    >
      <path
        d="M18.178 8C20.328 8 22 9.672 22 11.822c0 2.15-1.672 3.822-3.822 3.822-1.184 0-2.248-.54-2.956-1.388l-3.444-4.126-3.444 4.126C7.626 15.104 6.562 15.644 5.378 15.644 3.228 15.644 1.556 13.972 1.556 11.822 1.556 9.672 3.228 8 5.378 8c1.184 0 2.248.54 2.956 1.388l3.444 4.126 3.444-4.126C15.93 8.54 16.994 8 18.178 8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
