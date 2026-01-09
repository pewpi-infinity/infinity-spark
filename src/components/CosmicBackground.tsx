export function CosmicBackground() {
  console.log('🌌 CosmicBackground rendering')
  
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-background" />
      
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, transparent, transparent 2px, oklch(0.25 0.04 270 / 0.1) 2px, oklch(0.25 0.04 270 / 0.1) 4px),
            repeating-linear-gradient(90deg, transparent, transparent 2px, oklch(0.25 0.04 270 / 0.1) 2px, oklch(0.25 0.04 270 / 0.1) 4px)
          `,
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  )
}
