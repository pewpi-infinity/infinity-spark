import { useState } from 'react'
import { Website, Wallet, TradeOffer } from '@/lib/types'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, ArrowsLeftRight, X, Check, Clock, Sparkle } from '@phosphor-icons/react'
import { cn } from '@/lib/utils'

interface TradingViewProps {
  websites: Website[]
  wallet: Wallet | null
  tradeOffers: TradeOffer[]
  onBack: () => void
  onCreateTradeOffer: (offeredWebsiteId: string, requestedWebsiteId: string) => void
  onAcceptTrade: (offerId: string) => void
  onRejectTrade: (offerId: string) => void
  onCancelTrade: (offerId: string) => void
  onViewWebsite: (websiteId: string) => void
}

export function TradingView({
  websites,
  wallet,
  tradeOffers,
  onBack,
  onCreateTradeOffer,
  onAcceptTrade,
  onRejectTrade,
  onCancelTrade,
  onViewWebsite
}: TradingViewProps) {
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [selectedOfferedWebsite, setSelectedOfferedWebsite] = useState<string>('')
  const [selectedRequestedWebsite, setSelectedRequestedWebsite] = useState<string>('')

  const myWebsites = websites.filter(w => w.ownerWallet === wallet?.address)
  const othersWebsites = websites.filter(w => w.ownerWallet !== wallet?.address)

  const receivedOffers = tradeOffers.filter(
    offer => offer.recipientWallet === wallet?.address && offer.status === 'pending'
  )
  
  const sentOffers = tradeOffers.filter(
    offer => offer.offerorWallet === wallet?.address && offer.status === 'pending'
  )

  const completedTrades = tradeOffers.filter(
    offer => (offer.offerorWallet === wallet?.address || offer.recipientWallet === wallet?.address) 
      && offer.status === 'accepted'
  )

  const handleCreateOffer = () => {
    if (selectedOfferedWebsite && selectedRequestedWebsite) {
      onCreateTradeOffer(selectedOfferedWebsite, selectedRequestedWebsite)
      setSelectedOfferedWebsite('')
      setSelectedRequestedWebsite('')
      setIsCreatingOffer(false)
    }
  }

  const getWebsite = (id: string) => websites.find(w => w.id === id)

  return (
    <div className="min-h-screen relative z-10 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={onBack}>
              <ArrowLeft className="text-infinity-gold" />
            </Button>
            <div>
              <h1 className="text-4xl font-bold text-infinity-gold flex items-center gap-3">
                <ArrowsLeftRight weight="bold" />
                World Trading
              </h1>
              <p className="text-muted-foreground mt-1">
                Swap entire websites directly with other creators
              </p>
            </div>
          </div>

          <Dialog open={isCreatingOffer} onOpenChange={setIsCreatingOffer}>
            <DialogTrigger asChild>
              <Button className="cosmic-glow">
                <ArrowsLeftRight className="mr-2" />
                Create Trade Offer
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl cosmic-border bg-card">
              <DialogHeader>
                <DialogTitle className="text-infinity-gold flex items-center gap-2">
                  <Sparkle weight="fill" />
                  Create Trade Offer
                </DialogTitle>
                <DialogDescription>
                  Select one of your worlds to offer and choose a world you want in return
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Your World to Offer</label>
                  <Select value={selectedOfferedWebsite} onValueChange={setSelectedOfferedWebsite}>
                    <SelectTrigger className="cosmic-border">
                      <SelectValue placeholder="Select world to offer..." />
                    </SelectTrigger>
                    <SelectContent>
                      {myWebsites.map(website => (
                        <SelectItem key={website.id} value={website.id}>
                          <div className="flex items-center justify-between gap-4">
                            <span>{website.title}</span>
                            <Badge variant="secondary">{website.value.toLocaleString()}Ω</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedOfferedWebsite && (
                    <Card className="cosmic-border bg-muted/30">
                      <CardContent className="pt-4">
                        <WebsitePreview website={getWebsite(selectedOfferedWebsite)!} />
                      </CardContent>
                    </Card>
                  )}
                </div>

                <div className="flex justify-center">
                  <ArrowsLeftRight className="text-infinity-gold" size={32} weight="bold" />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">World You Want</label>
                  <Select value={selectedRequestedWebsite} onValueChange={setSelectedRequestedWebsite}>
                    <SelectTrigger className="cosmic-border">
                      <SelectValue placeholder="Select world to request..." />
                    </SelectTrigger>
                    <SelectContent>
                      {othersWebsites.map(website => (
                        <SelectItem key={website.id} value={website.id}>
                          <div className="flex items-center justify-between gap-4">
                            <span>{website.title}</span>
                            <Badge variant="secondary">{website.value.toLocaleString()}Ω</Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {selectedRequestedWebsite && (
                    <Card className="cosmic-border bg-muted/30">
                      <CardContent className="pt-4">
                        <WebsitePreview website={getWebsite(selectedRequestedWebsite)!} />
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Button 
                  className="w-full cosmic-glow" 
                  onClick={handleCreateOffer}
                  disabled={!selectedOfferedWebsite || !selectedRequestedWebsite}
                >
                  Send Trade Offer
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="received">
              Received ({receivedOffers.length})
            </TabsTrigger>
            <TabsTrigger value="sent">
              Sent ({sentOffers.length})
            </TabsTrigger>
            <TabsTrigger value="history">
              History ({completedTrades.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {receivedOffers.length === 0 ? (
              <Card className="cosmic-border">
                <CardContent className="py-12 text-center">
                  <Clock className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-muted-foreground">No pending trade offers received</p>
                </CardContent>
              </Card>
            ) : (
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {receivedOffers.map(offer => (
                    <TradeOfferCard
                      key={offer.id}
                      offer={offer}
                      offeredWebsite={getWebsite(offer.offeredWebsiteId)!}
                      requestedWebsite={getWebsite(offer.requestedWebsiteId)!}
                      type="received"
                      onAccept={() => onAcceptTrade(offer.id)}
                      onReject={() => onRejectTrade(offer.id)}
                      onViewWebsite={onViewWebsite}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {sentOffers.length === 0 ? (
              <Card className="cosmic-border">
                <CardContent className="py-12 text-center">
                  <ArrowsLeftRight className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-muted-foreground">No pending trade offers sent</p>
                  <Button 
                    className="mt-4 cosmic-glow" 
                    onClick={() => setIsCreatingOffer(true)}
                  >
                    Create Your First Trade
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {sentOffers.map(offer => (
                    <TradeOfferCard
                      key={offer.id}
                      offer={offer}
                      offeredWebsite={getWebsite(offer.offeredWebsiteId)!}
                      requestedWebsite={getWebsite(offer.requestedWebsiteId)!}
                      type="sent"
                      onCancel={() => onCancelTrade(offer.id)}
                      onViewWebsite={onViewWebsite}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            {completedTrades.length === 0 ? (
              <Card className="cosmic-border">
                <CardContent className="py-12 text-center">
                  <Check className="mx-auto mb-4 text-muted-foreground" size={48} />
                  <p className="text-muted-foreground">No completed trades yet</p>
                </CardContent>
              </Card>
            ) : (
              <ScrollArea className="h-[600px]">
                <div className="space-y-4 pr-4">
                  {completedTrades.map(offer => (
                    <TradeOfferCard
                      key={offer.id}
                      offer={offer}
                      offeredWebsite={getWebsite(offer.offeredWebsiteId)!}
                      requestedWebsite={getWebsite(offer.requestedWebsiteId)!}
                      type="history"
                      onViewWebsite={onViewWebsite}
                    />
                  ))}
                </div>
              </ScrollArea>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

interface TradeOfferCardProps {
  offer: TradeOffer
  offeredWebsite: Website
  requestedWebsite: Website
  type: 'received' | 'sent' | 'history'
  onAccept?: () => void
  onReject?: () => void
  onCancel?: () => void
  onViewWebsite: (websiteId: string) => void
}

function TradeOfferCard({
  offer,
  offeredWebsite,
  requestedWebsite,
  type,
  onAccept,
  onReject,
  onCancel,
  onViewWebsite
}: TradeOfferCardProps) {
  const expiresIn = offer.expiresAt - Date.now()
  const hoursLeft = Math.floor(expiresIn / (1000 * 60 * 60))

  return (
    <Card className={cn(
      "cosmic-border transition-all hover:cosmic-glow",
      type === 'history' && "opacity-75"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <ArrowsLeftRight className="text-infinity-gold" />
            {type === 'received' && 'Trade Offer Received'}
            {type === 'sent' && 'Trade Offer Sent'}
            {type === 'history' && 'Completed Trade'}
          </CardTitle>
          {type !== 'history' && (
            <Badge variant="outline" className="gap-1">
              <Clock size={14} />
              {hoursLeft}h left
            </Badge>
          )}
          {type === 'history' && (
            <Badge variant="default" className="gap-1 bg-green-500/20 text-green-400 border-green-500/30">
              <Check size={14} weight="bold" />
              Completed
            </Badge>
          )}
        </div>
        <CardDescription className="text-xs">
          {type === 'history' && offer.respondedAt && (
            `Traded ${new Date(offer.respondedAt).toLocaleDateString()}`
          )}
          {type !== 'history' && (
            `Created ${new Date(offer.createdAt).toLocaleDateString()}`
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          <Card className="cosmic-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onViewWebsite(offeredWebsite.id)}>
            <CardContent className="pt-4">
              <WebsitePreview website={offeredWebsite} />
              {type === 'received' && (
                <Badge className="mt-2" variant="secondary">They Offer</Badge>
              )}
              {type === 'sent' && (
                <Badge className="mt-2" variant="secondary">You Offer</Badge>
              )}
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <ArrowsLeftRight className="text-infinity-gold" size={32} weight="bold" />
          </div>

          <Card className="cosmic-border bg-muted/30 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => onViewWebsite(requestedWebsite.id)}>
            <CardContent className="pt-4">
              <WebsitePreview website={requestedWebsite} />
              {type === 'received' && (
                <Badge className="mt-2" variant="default">They Want</Badge>
              )}
              {type === 'sent' && (
                <Badge className="mt-2" variant="default">You Want</Badge>
              )}
            </CardContent>
          </Card>
        </div>

        {type === 'received' && (
          <>
            <Separator className="my-4" />
            <div className="flex gap-2">
              <Button 
                className="flex-1 cosmic-glow" 
                onClick={onAccept}
              >
                <Check className="mr-2" weight="bold" />
                Accept Trade
              </Button>
              <Button 
                variant="outline" 
                className="flex-1" 
                onClick={onReject}
              >
                <X className="mr-2" />
                Reject
              </Button>
            </div>
          </>
        )}

        {type === 'sent' && (
          <>
            <Separator className="my-4" />
            <Button 
              variant="destructive" 
              className="w-full" 
              onClick={onCancel}
            >
              <X className="mr-2" />
              Cancel Offer
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  )
}

interface WebsitePreviewProps {
  website: Website
}

function WebsitePreview({ website }: WebsitePreviewProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-bold text-foreground line-clamp-1">{website.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">{website.description}</p>
      <div className="flex flex-wrap gap-2 mt-2">
        <Badge variant="outline" className="gap-1">
          <Sparkle size={12} weight="fill" />
          {website.value.toLocaleString()}Ω
        </Badge>
        <Badge variant="secondary">
          {website.tools.length} tool{website.tools.length !== 1 ? 's' : ''}
        </Badge>
        {website.pages && website.pages.length > 0 && (
          <Badge variant="secondary">
            {website.pages.length} page{website.pages.length !== 1 ? 's' : ''}
          </Badge>
        )}
        {website.worldArchetype && (
          <Badge variant="outline" className="text-infinity-gold border-infinity-gold/30">
            {website.worldArchetype}
          </Badge>
        )}
      </div>
    </div>
  )
}
