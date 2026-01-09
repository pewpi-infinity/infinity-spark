# 🌐 Infinity Spark — Source Engine Architecture

## The Single Source of Truth

**Infinity Spark is not a page — it is a publishing engine.**

- The **index** is its memory
- **Pages** are its offspring  
- **Input** is its fuel

Every webpage created through Infinity Spark originates from this application. No orphan pages exist — everything links back to the master index.

---

## Core Principle: One Repo → Many Pages

`pewpi-infinity/infinity-spark` is the **parent engine** that:

- ✅ **Births** all webpages through user searches
- ✅ **Indexes** every creation in a living directory  
- ✅ **Links** all pages together in a coherent network
- ✅ **Deploys** production-ready static HTML to GitHub Pages

### Live Reference
[https://pewpi-infinity.github.io/infinity-spark-tour/](https://pewpi-infinity.github.io/infinity-spark-tour/)

---

## Repository Structure

```
pewpi-infinity/infinity-spark/
├── index.html                    # Master index (living directory of all worlds)
├── world-id-1/
│   └── index.html               # Individual world page
├── world-id-2/
│   └── index.html               # Individual world page
└── world-id-n/
    └── index.html               # Individual world page
```

### Master Index (`/index.html`)
- Lists all created worlds
- Shows total stats (worlds, tools, value)
- Links to every individual world
- Updates automatically with each new creation
- Serves as the navigation hub

### Individual Worlds (`/world-id/index.html`)
- Complete standalone webpage
- Fully functional without backend
- Embedded interactive tools
- Links back to master index
- Links to reference system

---

## Index as a Living System (Not Static)

The `index.html` functions as:

- 🔹 **Directory of all live pages** — Complete catalog of creations
- 🔹 **Growth surface** — Expands automatically as input increases
- 🔹 **Navigation hub** — Central point for exploring all worlds

### Index Structure (Auto-Generated):

```html
- Core Spark Entry
- Links to All Generated Pages
- Grouped Sections (auto-expand):
  - Pages
  - Widgets  
  - Media
  - Tools
  - Experiments
  - Archives
```

As new content is created → **the index updates itself**.

---

## Input → Content Expansion Logic

Spark treats **user input as fuel**.

### Rule:
> The more input provided, the richer and more complex the index and pages become.

**Examples:**
- **Short input** → simple page + link
- **Long input** → page + widgets + media + sublinks  
- **Repeated input** → clusters of related pages

---

## Page Birth Flow (Every Creation)

Every time Spark builds something:

1. ✅ Generate a **new webpage** (HTML-based, Pages-compatible)
2. ✅ Populate with **functional tools** (video, charts, calculators, etc.)
3. ✅ Add a **link to master index**
4. ✅ Categorize automatically
5. ✅ Preserve previous pages (no overwrites)
6. ✅ Make downloadable for deployment

---

## Deployment Workflow

### From Creation to Live Website:

```
User Search
    ↓
Website Generated (with functional tools)
    ↓
Static HTML Created
    ↓
Master Index Updated
    ↓
User Downloads Files
    ↓
Push to pewpi-infinity/infinity-spark
    ↓
GitHub Pages Deploys
    ↓
Live at: https://pewpi-infinity.github.io/infinity-spark/world-id/
```

### Deployment Steps:

1. **Create World** in Infinity Spark app
2. **Click Deploy** from world view
3. **Download Files**:
   - `world-id-index.html` (individual world)
   - `index.html` (master index)
4. **Clone/Fork Repository**: `pewpi-infinity/infinity-spark`
5. **Add Files**:
   - Place world HTML in `/world-id/index.html`
   - Update root `/index.html` with latest master index
6. **Push to GitHub**
7. **Enable GitHub Pages** (if not already enabled)
8. **Access Live Site**:
   - Index: `https://pewpi-infinity.github.io/infinity-spark/`
   - World: `https://pewpi-infinity.github.io/infinity-spark/world-id/`

---

## Feature Suggestion System (Interactive)

Spark **suggests optional build features** when creating or expanding a page:

### Examples of Suggestions:
- 📦 Add widget?
- 🔊 Add audio port?
- 🎥 Add video player?
- 🖼 Add image gallery?
- 📁 Add file drop/viewer?
- 🧠 Add AI panel?
- 🧭 Add navigation map?

These are **non-destructive** and **opt-in**.

---

## Supported Page Components (Modular)

Spark attaches these as modular blocks:

- ✅ Widgets (interactive UI)
- ✅ Audio players/ports  
- ✅ Video players
- ✅ Image containers
- ✅ File viewers
- ✅ Text + schematic sections
- ✅ Embedded tools
- ✅ External live links

### Requirements:
- GitHub Pages safe
- Load without auth
- Degrade gracefully
- Functional on first render

---

## Protection Rules

### ❌ DO NOT:
- Break the existing Spark
- Refactor working logic  
- Inject auth, guards, or frameworks
- Let automated tools rewrite structure

### ✅ DO:
- Preserve and extend
- Add features modularly
- Keep deployments simple
- Maintain static HTML compatibility

---

## Success Criteria

✅ Spark visibly renders  
✅ Index lists all live pages  
✅ New pages are born from this repo only  
✅ Links grow as content grows  
✅ System feels alive, expandable, and cumulative  
✅ Every page has functional tools on first load  
✅ Deployment to GitHub Pages is straightforward  
✅ No orphan pages exist  

---

## Mental Model

> **Infinity Spark is not a page — it is a publishing engine.**  
> The index is its memory.  
> Pages are its offspring.  
> Input is its fuel.

This is a **living system** that grows with every creation.

---

## Technical Stack

- **App Framework**: React + TypeScript + Vite
- **UI Library**: shadcn/ui (v4) + Tailwind CSS
- **Deployment Target**: GitHub Pages (static HTML)
- **Repository**: `pewpi-infinity/infinity-spark`
- **Reference**: [infinity-spark-tour](https://pewpi-infinity.github.io/infinity-spark-tour/)

---

## Additional Resources

- **PRD.md** — Full product requirements  
- **PRODUCTION_MODE_IMPLEMENTATION.md** — Production mode details
- **DeploymentView.tsx** — UI for downloading deployment files
- **deployment.ts** — Static HTML generation logic

---

**Built with ∞ Infinity Spark**
