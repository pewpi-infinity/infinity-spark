import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { ArrowLeft, Download, Copy, CheckCircle, Globe, Code, Sparkle } from '@phosphor-icons/react'
import { Website } from '@/lib/types'
import { deployWebsite, generateIndexBuilder, DeploymentResult } from '@/lib/deployment'
import { toast } from 'sonner'

interface DeploymentViewProps {
  website: Website
  allWebsites: Website[]
  onBack: () => void
}

export function DeploymentView({ website, allWebsites, onBack }: DeploymentViewProps) {
  const [deployment, setDeployment] = useState<DeploymentResult | null>(null)
  const [indexHTML, setIndexHTML] = useState<string>('')
  const [copiedIndex, setCopiedIndex] = useState(false)
  const [copiedWebsite, setCopiedWebsite] = useState(false)
  const [isDeploying, setIsDeploying] = useState(false)

  useEffect(() => {
    handleDeploy()
    const index = generateIndexBuilder(allWebsites)
    setIndexHTML(index)
  }, [website, allWebsites])

  const handleDeploy = async () => {
    setIsDeploying(true)
    const result = await deployWebsite(website)
    setDeployment(result)
    setIsDeploying(false)

    if (result.success) {
      toast.success('Deployment files generated!')
    } else {
      toast.error(result.error || 'Deployment failed')
    }
  }

  const handleCopyWebsiteHTML = () => {
    if (deployment?.indexContent) {
      navigator.clipboard.writeText(deployment.indexContent)
      setCopiedWebsite(true)
      toast.success('Website HTML copied to clipboard')
      setTimeout(() => setCopiedWebsite(false), 2000)
    }
  }

  const handleCopyIndexHTML = () => {
    navigator.clipboard.writeText(indexHTML)
    setCopiedIndex(true)
    toast.success('Index HTML copied to clipboard')
    setTimeout(() => setCopiedIndex(false), 2000)
  }

  const handleDownloadWebsiteHTML = () => {
    if (deployment?.indexContent) {
      const blob = new Blob([deployment.indexContent], { type: 'text/html' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${website.id}-index.html`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      toast.success('Website HTML downloaded')
    }
  }

  const handleDownloadIndexHTML = () => {
    const blob = new Blob([indexHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'index.html'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Index HTML downloaded')
  }

  const handleDownloadAll = () => {
    handleDownloadIndexHTML()
    setTimeout(() => handleDownloadWebsiteHTML(), 500)
    toast.success('All files downloaded - ready to deploy!')
  }

  return (
    <div className="min-h-screen relative z-10 p-6">
      <div className="max-w-7xl mx-auto">
        <Button
          onClick={onBack}
          variant="ghost"
          className="mb-6 gap-2"
        >
          <ArrowLeft size={20} />
          Back
        </Button>

        <div className="mb-8">
          <Card className="mb-6 p-4 bg-accent/10 border-accent/30">
            <p className="text-sm">
              <strong>📦 Deployment Package Generated!</strong> Download the HTML files below and push them to your GitHub repository to make this world live on the web. 
              Each world gets its own URL on GitHub Pages.
            </p>
          </Card>

          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                <Globe size={40} className="text-accent" />
                Deploy: {website.title}
              </h1>
              <p className="text-muted-foreground text-lg">
                Production-ready static HTML files for GitHub Pages or any web host
              </p>
            </div>
            <Button
              onClick={handleDownloadAll}
              size="lg"
              className="gap-2"
            >
              <Download size={20} />
              Download All Files
            </Button>
          </div>

          {deployment?.success && (
            <Card className="mt-6 p-6 bg-card/50 border-accent/30">
              <div className="flex items-start gap-4">
                <CheckCircle size={32} className="text-accent flex-shrink-0" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">Deployment Package Ready!</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Your world has been packaged into production-ready static HTML files. Download and push to GitHub Pages for instant live deployment.
                  </p>
                  
                  <div className="bg-background/80 p-4 rounded-lg mb-4">
                    <div className="text-xs text-muted-foreground mb-2">📍 Recommended GitHub Pages structure:</div>
                    <div className="font-mono text-xs space-y-1">
                      <div>Repository: <span className="text-accent">pewpi-infinity/infinity-spark</span></div>
                      <div>Master Index: <span className="text-muted-foreground">/index.html</span></div>
                      <div>This World: <span className="text-muted-foreground">/{website.id}/index.html</span></div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <div className="text-xs text-accent mb-1">🌐 Live URL (after GitHub Pages setup):</div>
                      <div className="font-mono text-xs text-muted-foreground break-all">
                        https://pewpi-infinity.github.io/infinity-spark/{website.id}/
                      </div>
                    </div>
                  </div>

                  {deployment.suggestions.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <Sparkle size={16} className="text-accent" />
                        Suggestions to improve this world:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {deployment.suggestions.map((suggestion, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {suggestion}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}
        </div>

        <Tabs defaultValue="website" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="website" className="gap-2">
              <Globe size={18} />
              Website HTML
            </TabsTrigger>
            <TabsTrigger value="index" className="gap-2">
              <Code size={18} />
              Index Builder
            </TabsTrigger>
            <TabsTrigger value="instructions" className="gap-2">
              <CheckCircle size={18} />
              Deployment Guide
            </TabsTrigger>
          </TabsList>

          <TabsContent value="website">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Website HTML</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete standalone page for {website.title}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyWebsiteHTML}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedWebsite ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copiedWebsite ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    onClick={handleDownloadWebsiteHTML}
                    size="sm"
                    className="gap-2"
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-[600px] w-full rounded-lg border bg-muted/30">
                <pre className="p-4 text-xs font-mono">
                  <code>{deployment?.indexContent || 'Generating...'}</code>
                </pre>
              </ScrollArea>

              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-sm font-semibold mb-2">File Info:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-muted-foreground">File Name</div>
                    <div className="font-mono">{website.id}-index.html</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Size</div>
                    <div className="font-mono">{(deployment?.indexContent.length || 0) / 1024 | 0} KB</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Tools</div>
                    <div className="font-mono">{(website.tools || []).length}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Pages</div>
                    <div className="font-mono">{(website.pages || []).length}</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="index">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">Index Builder</h3>
                  <p className="text-sm text-muted-foreground">
                    Master index page listing all {allWebsites.length} worlds
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCopyIndexHTML}
                    variant="outline"
                    size="sm"
                    className="gap-2"
                  >
                    {copiedIndex ? <CheckCircle size={16} /> : <Copy size={16} />}
                    {copiedIndex ? 'Copied!' : 'Copy'}
                  </Button>
                  <Button
                    onClick={handleDownloadIndexHTML}
                    size="sm"
                    className="gap-2"
                  >
                    <Download size={16} />
                    Download
                  </Button>
                </div>
              </div>
              
              <ScrollArea className="h-[600px] w-full rounded-lg border bg-muted/30">
                <pre className="p-4 text-xs font-mono">
                  <code>{indexHTML}</code>
                </pre>
              </ScrollArea>

              <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                <div className="text-sm font-semibold mb-2">File Info:</div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                  <div>
                    <div className="text-muted-foreground">File Name</div>
                    <div className="font-mono">index.html</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Size</div>
                    <div className="font-mono">{indexHTML.length / 1024 | 0} KB</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Worlds</div>
                    <div className="font-mono">{allWebsites.length}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Total Value</div>
                    <div className="font-mono">{allWebsites.reduce((s, w) => s + w.value, 0).toLocaleString()} ∞</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="instructions">
            <Card className="p-6">
              <h3 className="text-xl font-bold mb-2">GitHub Pages Deployment Guide</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Follow these steps to publish your Infinity worlds to the web
              </p>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm">1</span>
                    Download Files
                  </h4>
                  <p className="text-sm text-muted-foreground ml-8">
                    Click "Download All Files" above to get both index.html (master list) and {website.id}-index.html (this world's page)
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm">2</span>
                    Create/Clone GitHub Repository
                  </h4>
                  <div className="text-sm text-muted-foreground ml-8 space-y-2">
                    <p>Repository name: <code className="bg-muted px-2 py-1 rounded font-mono text-xs">infinity-spark</code></p>
                    <p className="text-xs">Suggested: Use <code className="bg-muted px-1 py-0.5 rounded">pewpi-infinity/infinity-spark</code> or your own username</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm">3</span>
                    Organize Files in Repository
                  </h4>
                  <div className="text-sm text-muted-foreground ml-8">
                    <p className="mb-2">Create this exact structure:</p>
                    <pre className="bg-muted p-3 rounded text-xs font-mono">
{`infinity-spark/
├── index.html                (master index - lists all worlds)
└── ${website.id}/
    └── index.html            (this world - ${website.title})`}
                    </pre>
                    <p className="text-xs mt-2">💡 Rename {website.id}-index.html to just index.html when placing it in the folder</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm">4</span>
                    Push to GitHub
                  </h4>
                  <div className="text-sm text-muted-foreground ml-8">
                    <p className="mb-2">Commit and push your files:</p>
                    <pre className="bg-muted p-3 rounded text-xs font-mono">
{`git add .
git commit -m "Deploy ${website.title}"
git push origin main`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm">5</span>
                    Enable GitHub Pages
                  </h4>
                  <div className="text-sm text-muted-foreground ml-8">
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Go to repository Settings → Pages</li>
                      <li>Set source to "Deploy from a branch"</li>
                      <li>Select branch: <code className="bg-muted px-1 py-0.5 rounded text-xs">main</code></li>
                      <li>Select folder: <code className="bg-muted px-1 py-0.5 rounded text-xs">/ (root)</code></li>
                      <li>Click Save</li>
                    </ol>
                    <p className="mt-2 text-xs">⏱️ Pages will be live in 1-2 minutes</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-accent text-accent-foreground text-sm">6</span>
                    Access Your Live Sites
                  </h4>
                  <div className="text-sm text-muted-foreground ml-8">
                    <p className="mb-3">Your worlds will be live at these URLs:</p>
                    <div className="bg-muted p-4 rounded space-y-3">
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">🌐 Master Index (all worlds):</div>
                        <code className="text-xs text-accent">https://your-username.github.io/infinity-spark/</code>
                      </div>
                      <div>
                        <div className="text-xs text-muted-foreground mb-1">🌍 This World ({website.title}):</div>
                        <code className="text-xs text-accent">https://your-username.github.io/infinity-spark/{website.id}/</code>
                      </div>
                    </div>
                    <p className="text-xs mt-3">Replace "your-username" with your GitHub username</p>
                  </div>
                </div>

                <div className="bg-accent/10 border border-accent/30 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 flex items-center gap-2">
                    <Sparkle size={18} className="text-accent" />
                    Growing Your Infinity Network
                  </h5>
                  <p className="text-sm text-muted-foreground mb-2">
                    Each time you create a new world in Infinity Spark:
                  <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1 ml-2">
                  <ol className="text-sm text-muted-foreground list-decimal list-inside space-y-1 ml-2">
                    <li>Click "Deploy to GitHub Pages" from the world view</li>
                    <li>Download the new world's HTML file</li>
                    <li>Add it to your repo in a new folder (e.g., /world-2/)</li>
                    <li>Download and update the master index.html</li>
                    <li>Push changes - your network grows automatically! 🌱</li>
                  </ol>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
