# Planning Guide

Infinity Spark is an educational game-world builder where learning feels like play, play creates assets, and assets have real value derived from function. Through a neural slot machine interface and 12 canonical world types, users create playable learning environments that are also tradable tokens. Each search deploys a live website with static HTML ready for GitHub Pages hosting.

**Experience Qualities**:
1. **Play as Learning** - Educational concepts emerge through game mechanics, interactive worlds, and discovery-driven exploration
2. **Neural Creation** - Slot machine interface combines user intent with behavior signals (timing, cursor movement, hesitation) to generate unique world combinations
3. **Function as Value** - Assets gain worth through uniqueness, reusability, tool diversity, and time spent building (not idle)

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a playful learning platform with 12 world archetypes (physics playgrounds, logic gyms, research libraries, quantum visualizers, dreamscape architects, etc.), neural slot-machine creation, game-script recombination, and an emulator separation model. Users build educational game-worlds that teach through interaction while generating tradable tokens. Every website is automatically deployable as static HTML to GitHub Pages with an index builder showing all created worlds. The system enforces originality through anti-clone mechanics and values creation over replication.

## Essential Features

### 1. Neural Slot Machine (Creation Interface)
- **Functionality**: Giant slot machine UI with emoji reels that combine user intent with behavior signals (click rhythm, hover time, cursor movement, hesitation patterns) to generate unique world-websites
- **Purpose**: Make creation feel playful while capturing nuanced user preferences through interaction patterns
- **Trigger**: User presses CREATE button on home screen
- **Progression**: Button press → Reels spin with emojis 🎰🍄⚙️📀👑🧲 → Analyze timing/movement/prior history → Classify into world archetype → Generate live website with 1-3 tools → Mint 1 token
- **Success criteria**: Every spin produces a working website, emoji combinations determine world type and rarity, behavior signals influence tool selection, rare combinations yield higher valuations

### 2. 12 Canonical World Archetypes (Learning Environments)
- **Functionality**: Pre-designed world types that combine education, play, and productivity: Slot Forge, Mario-Scale Physics, Game Script Genome Lab, Neural Cart Playground, World Stitcher, Playable Research Library, Intent Magnet Arena, Logic & Reasoning Gym, Game-to-Film Studio, Quantum Playground, Emulator Dock, Dreamscape Architect
- **Purpose**: Provide structured yet flexible learning environments where each world teaches different skills through game mechanics
- **Trigger**: Determined by neural slot machine output or user selection
- **Progression**: World type selected → Educational goal identified → Interactive tools loaded → Game mechanics activated → Learning through play begins
- **Success criteria**: Each world has distinct visual identity, unique mechanics, clear educational purpose, and appropriate toolset

### 3. Anti-Clone Originality System
- **Functionality**: Automatically detects when two worlds share identical tools, layout, and logic, then reduces value of both to enforce uniqueness
- **Purpose**: Force creativity and prevent lazy replication, making truly original worlds more valuable
- **Trigger**: Runs on every new world creation and periodically on existing worlds
- **Progression**: Scan world → Compare tools/layout/logic → Calculate similarity score → If > 90% match found → Reduce both worlds' values → Notify owners
- **Success criteria**: Duplicate worlds lose value, original combinations maintain value, users are incentivized to create unique worlds

### 4. World-Specific Value Calculation
- **Functionality**: Calculate world value based on: base world type value, tool diversity multiplier, uniqueness score, script reuse by others, active building time (not idle), and world combination rarity
- **Purpose**: Make functional, original, and useful worlds more valuable than copied or idle ones
- **Trigger**: On creation, tool addition, world stitching, and when other users reference/reuse components
- **Progression**: Action occurs → Calculate base value → Apply multipliers (diversity, uniqueness, reuse) → Penalize clones → Update token value → Display in wallet
- **Success criteria**: Unique worlds worth more, tool diversity increases value, clone detection reduces value, idle time doesn't accumulate value

### 5. Game Script Recombination System (Legal & Safe)
- **Functionality**: Extract and store game logic patterns (jump mechanics, aim systems, spawn rules, score logic) as reusable genomes WITHOUT copying assets, sprites, sounds, or maps
- **Purpose**: Learn from existing games to build new ones while staying completely legal and educational
- **Trigger**: User uploads script/logic snippet or connects external emulator
- **Progression**: Script uploaded → Parse mechanics → Tag patterns (movement, collision, state) → Store as genome → Make reusable → User combines genomes into new worlds
- **Success criteria**: Only logic extracted (no assets), genomes are reusable building blocks, combinations create new games, stays legally clean

### 6. Emulator Separation Model (Critical Legal Boundary)
- **Functionality**: Spark NEVER hosts emulators or ROMs; instead provides containers where users bring their own emulators/ROMs, while Spark only reads and extracts logic patterns
- **Purpose**: Stay completely legal while enabling game-based learning and mechanic extraction
- **Trigger**: User navigates to Emulator Dock world
- **Progression**: User provides emulator → User provides ROM → Runs in isolated container → Spark reads scripts/mechanics only → User extracts logic patterns → Uses patterns in new creations
- **Success criteria**: Zero emulators hosted by Spark, zero ROMs stored, only logic/mechanics extracted, clear legal separation maintained

### 7. Neural Cart System (AI Delegation)
- **Functionality**: Tiny thinking agents (NeuralMcarts) that each perform one cognitive job: chooser, explorer, optimizer, chaos injector - users employ them like workers within their worlds
- **Purpose**: Teach AI delegation and modular thinking through playful worker management
- **Trigger**: Available in Neural Cart Playground world and employable in other worlds
- **Progression**: User selects cart type → Assign to task in world → Cart performs specialized function → Results feed back → Unique cart combinations increase world value
- **Success criteria**: Each cart has distinct behavior, carts work together, users learn delegation patterns, rare cart combinations add value

### 8. World Stitcher (Cross-Domain Synthesis)
- **Functionality**: Combine mechanics from multiple worlds to create hybrid learning environments (e.g., helicopter drop mechanic + Mario gravity + desert map + logic puzzle)
- **Purpose**: Teach systems interoperability and creative synthesis across different domains
- **Trigger**: User selects World Stitcher archetype or uses stitch action in existing world
- **Progression**: Select source worlds → Choose mechanics from each → Define interaction rules → Generate hybrid world → Test for compatibility → Mint high-rarity token if domains are distant
- **Success criteria**: Mechanics from different worlds work together, incompatibilities detected early, successful stitches create unique valuable worlds

### 9. Playable Research Library (Knowledge as Space)
- **Functionality**: Research topics become explorable rooms where charts are doors, videos are windows, simulations are interactive toys, and knowledge is spatial navigation
- **Purpose**: Replace scrolling text walls with interactive spatial exploration for better learning retention
- **Trigger**: User creates Research Library world or adds research to any world
- **Progression**: Topic selected → Research generated → Spatial layout created → Interactive elements placed → Citations become links → User explores physically
- **Success criteria**: No scrolling walls of text, everything is clickable/explorable, research cited by others increases value, spatial metaphors aid understanding

### 10. Intent Magnet Arena (Behavioral Creation)
- **Functionality**: User creates worlds without typing — system infers intent purely from mouse movement, tap patterns, hesitation, and cursor behavior
- **Purpose**: Teach subconscious decision-making and demonstrate human-machine interaction through pure behavior
- **Trigger**: User selects Intent Magnet world or enables behavioral mode
- **Progression**: Track mouse/touch → Analyze patterns → Classify intent → Build world from behavior → Show what was inferred → User refines → World evolves
- **Success criteria**: Meaningful worlds built without typing, behavior patterns accurately classified, users understand their own subconscious choices

### 11. Physics & Logic Learning Worlds
- **Functionality**: Specialized worlds for different educational domains: Mario-Scale Physics (gravity, collision, momentum), Logic & Reasoning Gym (deduction puzzles, cause-effect), Quantum Playground (visual wave metaphors), Dreamscape Architect (emotional intelligence through symbols)
- **Purpose**: Each world teaches specific skills through game mechanics and play
- **Trigger**: Selected from slot machine or world type selector
- **Progression**: World loads → Tutorial mechanic appears → User experiments → Complexity increases → Learning happens through discovery → Tokens mint for milestones
- **Success criteria**: Each world teaches its domain effectively, mechanics map to concepts, progression feels natural, users retain knowledge

### 12. Self-Growing C13B0 Loop (System Learning)
- **Functionality**: System watches which worlds users keep, observes which tools recur, promotes successful patterns, deprecates boring ones, and carries winning mechanics into next builds
- **Purpose**: Users train the system by building, making the platform smarter over time
- **Trigger**: Runs continuously in background, analyzing usage patterns
- **Progression**: Observe user retention → Track tool popularity → Identify successful world types → Adjust slot machine weights → Promote winning patterns → Deprecate unused mechanics
- **Success criteria**: Popular world types appear more in slot machine, successful tools get prioritized, boring mechanics fade away, system improves without manual tuning

### 13. Token Minting & Value System (Core Economy)
- **Functionality**: Mint tokens when worlds are created with metadata including world type, tool count, rarity score, uniqueness hash - value based on function not hype
- **Purpose**: Make learning assets tradable with real value derived from originality and utility
- **Trigger**: World creation, tool addition, world stitching, script genome creation
- **Progression**: Functional addition → Calculate value (base + multipliers) → Check for clones (penalize if found) → Update token metadata → Mint or update token → Display in wallet
- **Success criteria**: Value reflects functionality and uniqueness, clones are penalized, original work is rewarded, metadata is comprehensive

### 14. Automatic Wallet & Marketplace System
- **Functionality**: Creates wallet on first use with 10,000 ∞ starting balance, allows trading of world-tokens in marketplace, enforces Infinity currency for guaranteed settlement
- **Purpose**: Enable real economy around educational game-worlds with guaranteed exchange and delivery
- **Trigger**: Wallet auto-created on first world creation, marketplace accessible anytime
- **Progression**: Create first world → Wallet appears → Token minted → Browse marketplace → Purchase world with ∞ → Ownership transfers → Seller receives payment → Buyer gets full world + all tools
- **Success criteria**: Wallet creation is seamless, ∞ balance enforced, purchases are atomic, ownership transfers completely, marketplace shows accurate listings

### 15. Collaboration & Ownership
- **Functionality**: World owners can add collaborators (editor/viewer roles), manage permissions, track contributions, and maintain ownership control
- **Purpose**: Enable team-based world building and shared learning experiences
- **Trigger**: Owner clicks "Add Collaborator" in world view
- **Progression**: Enter collaborator wallet → Select role → Add → Collaborator gains access → Editors can add tools/pages → Owner maintains control → Remove collaborators anytime
- **Success criteria**: Roles are enforced, contributions are tracked, owner control maintained, collaboration is smooth

### 16. Guest-First Architecture
- **Functionality**: Full exploration and viewing without authentication, login only required for creating/editing/trading
- **Purpose**: Remove friction, encourage exploration, never gate discovery behind auth
- **Trigger**: App loads with guest access enabled
- **Progression**: Load app → Browse as guest → View worlds → Explore tools → Attempt to create → Login prompt → Authenticate → Creation unlocked
- **Success criteria**: Zero auth screens on load, all viewing works as guest, creation/editing properly gated, smooth auth when needed

### 17. GitHub Pages Deployment System
- **Functionality**: Every created world automatically generates deployable static HTML files with embedded tools, plus a master index page listing all worlds
- **Purpose**: Give users real ownership by letting them deploy their worlds to actual live websites on GitHub Pages or any hosting service
- **Trigger**: User clicks "Deploy to GitHub Pages" button from any world view
- **Progression**: Click deploy → System generates static HTML with all tools rendered → Show deployment view with copy/download options → Display master index HTML → Provide step-by-step GitHub Pages setup instructions → User downloads files → User uploads to GitHub repo → Site goes live
- **Success criteria**: HTML is fully functional without backend, all tools render properly (video players, charts, galleries, calculators), index page lists all worlds with stats, deployment instructions are clear, files download correctly, sites work on any static host

## Edge Case Handling

- **Slot Spin Timeout**: If LLM takes too long, show progress indicator, allow cancel, preserve behavior data for retry
- **World Type Classification Failure**: Default to general playground world, log signals for learning, still render functional world
- **Clone Detection False Positive**: Provide appeal mechanism, manual review option, show similarity score breakdown
- **Emulator Connection Failure**: Clear error message, never expose Spark to legal risk, guide user to proper setup
- **Script Extraction Error**: Skip asset files automatically, extract logic only, show what was successfully captured
- **Cart Conflict**: When carts have incompatible goals, show conflict resolution UI, teach users about trade-offs
- **World Stitch Incompatibility**: Detect mechanic conflicts early, suggest alternatives, allow manual resolution
- **Behavior Tracking Privacy**: Clear opt-in for behavioral creation, local-only tracking option, transparent about what's captured
- **Learning Plateau**: Detect when user stops progressing, suggest new world types, introduce complexity gradually
- **Token Value Collapse**: If world becomes worthless (cloned everywhere), allow transformation to new unique world
- **Empty Marketplace**: Showcase featured worlds, provide creation incentives, enable discovery mechanisms
- **Research Citation Loop**: Detect circular references, prevent infinite loops, cap citation depth
- **Physics Simulation Crash**: Isolate physics engine failures, preserve world state, offer reload without data loss
- **Intent Misclassification**: Provide "Not what I meant" button, learn from corrections, offer manual world type selection
- **Network Failure During Creation**: Save behavior signals locally, resume when online, never lose creation intent
- **Wallet Not Found**: Auto-create seamlessly with 10,000 ∞, no user action required
- **Insufficient ∞ Balance**: Clear error with current vs required balance, suggest earning more through creation
- **Educational Progress Tracking**: Store learning milestones per world, show growth over time, celebrate achievements

## Design Direction

The design should evoke **playful learning meets cosmic energy** - a slot machine that creates worlds, emojis that represent possibilities, game worlds that teach concepts, and value that emerges from originality. The interface should feel like opening a treasure chest of infinite learning adventures where complexity is hidden behind joyful interaction. Think: the excitement of spinning a slot machine combined with the satisfaction of building something educational and valuable.

## Color Selection

A vibrant cosmic theme with energetic accents that create joy and wonder, balanced with deep space for focus.

- **Primary Color**: Cosmic Purple `oklch(0.35 0.15 290)` - Communicates creativity, learning, and playful energy
- **Secondary Colors**: 
  - Deep Space Indigo `oklch(0.25 0.08 270)` - For stability and depth
  - Nebula Blue `oklch(0.45 0.12 250)` - For educational elements and information
- **Accent Color**: Infinity Gold `oklch(0.75 0.15 85)` - For slot machine wins, token minting, achievements, and success moments
- **Playful Accents**: Integrate emoji colors naturally (🍄 greens, 🎰 reds/golds, ⚙️ silvers, 📀 rainbow holographic effects)
- **Foreground/Background Pairings**:
  - Background (Deep Black `oklch(0.12 0 0)`): Light Gray text `oklch(0.95 0 0)` - Ratio 16.8:1 ✓
  - Primary (Cosmic Purple `oklch(0.35 0.15 290)`): White text `oklch(1 0 0)` - Ratio 10.2:1 ✓
  - Accent (Infinity Gold `oklch(0.75 0.15 85)`): Deep Black text `oklch(0.12 0 0)` - Ratio 11.2:1 ✓
  - Cards (Dark Slate `oklch(0.18 0.02 260)`): Light Gray text `oklch(0.95 0 0)` - Ratio 13.4:1 ✓

## Font Selection

Typefaces should communicate **playful intelligence with clarity** - fun enough to inspire joy, clear enough for learning, distinctive enough to feel special.

- **Primary Font**: Space Grotesk - Geometric and futuristic, perfect for the cosmic learning theme
- **Secondary Font**: Inter - Clean and readable for educational content and explanations
- **Monospace**: JetBrains Mono - For technical metadata, token IDs, and code-like elements

**Typographic Hierarchy**:
- H1 (Infinity Branding): Space Grotesk Bold / 56px / tight letter-spacing (-0.03em) / with subtle glow
- H2 (World Titles): Space Grotesk Bold / 36px / normal spacing / playful color
- H3 (Section Headers): Space Grotesk Medium / 24px / with emoji integration
- Body (Learning Content): Inter Regular / 16px / line-height 1.7 / comfortable reading
- Small (Metadata): Inter Medium / 14px / muted color
- Mono (Technical): JetBrains Mono Regular / 13px / for IDs and addresses
- Slot Machine Text: Space Grotesk Black / 72px+ / with animation and glow

## Animations

Animations should create **joy, wonder, and learning momentum** - the slot machine reels should spin with satisfying physics, world creation should feel like magic materializing, tokens should mint with celebratory sparkles, and transitions should feel smooth and energetic. Use elastic easing for playful moments (slot stops, achievements), quick springs for interactions (button presses, cart movements), smooth cubic for transitions (world switches). Key moments: slot spin (anticipation build with sound-like visual rhythm), reel stop (elastic bounce with emoji pop), world generation (particles coalescing into structure), token mint (golden explosion), learning milestone (celebratory burst), world stitch (fusion animation showing combination).

## Component Selection

- **Components**:
  - Custom Slot Machine - Giant animated reels with emoji symbols, pull lever or spin button, anticipation build, satisfying stops
  - Card (world previews, world type selectors) - Vibrant with emoji headers, hover reveals details, click to explore
  - Badge (world types, rarity indicators, achievement markers) - Colorful, glowing, with emoji integration
  - Dialog (world creation flow, detailed views, educational content) - Full-screen with playful transitions
  - Tabs (wallet sections, world type filters) - Emoji-enhanced, smooth sliding indicator
  - Tooltip (hover for learning tips, mechanic explanations) - Quick, helpful, encouraging tone
  - Toast (achievements, milestones, token mints) - Celebratory with animations and emoji
  - Progress Bar (learning progress, world building progress) - Animated with milestone markers
  - Avatar (owner indicators, cart representations) - Playful, emoji-integrated or generated
  - Scroll Area (world galleries, research content) - Smooth with custom themed scrollbars

- **Customizations**:
  - Neural Slot Machine - Giant centerpiece with three spinning reels, each showing 5 emoji at a time, lever animation, win celebration
  - World Type Cards - 12 distinct card designs, each reflecting its archetype's personality (physics world with bouncing elements, logic gym with puzzle pieces, etc.)
  - Neural Cart Display - Animated cart characters with distinct personalities (chooser has selection icons, explorer has compass, etc.)
  - Learning Progress Tracker - Visual journey map showing worlds explored, skills learned, milestones achieved
  - World Stitcher Interface - Drag-and-drop combining UI with fusion animation when mechanics merge
  - Research Room Visualizer - 3D-like spatial navigation with doors/windows/toys as interactive research elements

- **States**:
  - Slot Machine: Idle (gentle pulse), Spinning (blur motion), Slowing (anticipation), Stopped (bounce), Won (explosion)
  - World Cards: Default (subtle float), Hover (lift + glow + scale 1.05), Selected (accent border + strong glow), Locked (grayscale + lock icon)
  - Buttons: Default (playful shadow), Hover (lift + brighten), Active (squash down), Disabled (fade + desaturate)
  - Carts: Idle (breathe animation), Working (gears turning), Success (happy bounce), Conflict (shake)

- **Icon Selection** (Phosphor Icons + Emoji):
  - 🎰 Slot machine symbol - Main creation interface
  - 🍄 Organic growth - Physics/nature worlds
  - ⚙️ Mechanics - Logic and systems
  - 📀 Data/memory - Research and storage
  - 👑 Achievement/mastery - Completions
  - 🧲 Attraction/intent - Behavioral systems
  - Plus/Minus - Add/remove elements
  - Lightning - Quick actions
  - Sparkle - Achievements and mints
  - Infinity (custom) - Brand and currency

- **Spacing**:
  - Slot Machine: margin-top-12 (3rem) for prominence, padding-16 (4rem) around reels
  - World Cards: gap-8 (2rem) in grid, padding-6 (1.5rem) internal, margin-bottom-16 (4rem) between sections
  - Learning Content: padding-12 (3rem) for comfortable reading, gap-6 (1.5rem) between elements
  - Buttons: padding-4 (1rem) vertical, padding-8 (2rem) horizontal for primary actions

- **Mobile**:
  - Slot Machine scales down to single-column reels on mobile, still feels prominent and exciting
  - World cards become full-width carousel with swipe navigation
  - Neural carts display as horizontal scrollable list
  - World stitcher becomes sequential selection rather than drag-drop
  - Research rooms become vertical scrolling with collapsible sections
  - Bottom navigation with emoji icons for main sections
  - Wallet view uses accordion for different sections
