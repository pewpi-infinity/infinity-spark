import { Website, ToolComponent } from './types'
import { getThemeStyles } from './generators'

export interface DeploymentConfig {
  repoName: string
  deploymentUrl: string
  indexPath: string
  suggestions: string[]
}

export interface DeploymentResult {
  success: boolean
  url: string
  repoPath: string
  indexContent: string
  suggestions: string[]
  error?: string
}

function generateToolHTML(tool: ToolComponent): string {
  const toolTemplates: Record<string, (tool: ToolComponent) => string> = {
    'video-player': (t) => `
      <div class="tool-video-player">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="video-container">
          <video controls style="width: 100%; max-width: 800px; border-radius: 12px;">
            <source src="${t.config.videoUrl || 'https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4'}" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    `,
    'chart': (t) => `
      <div class="tool-chart">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <canvas id="chart-${t.id}" width="600" height="400"></canvas>
        <script>
          const ctx = document.getElementById('chart-${t.id}').getContext('2d');
          ctx.fillStyle = '#8B5CF6';
          ctx.fillRect(50, 250, 100, 100);
          ctx.fillStyle = '#EC4899';
          ctx.fillRect(200, 200, 100, 150);
          ctx.fillStyle = '#10B981';
          ctx.fillRect(350, 150, 100, 200);
        </script>
      </div>
    `,
    'gallery': (t) => `
      <div class="tool-gallery">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="gallery-grid">
          <div class="gallery-item">🖼️ Image 1</div>
          <div class="gallery-item">🖼️ Image 2</div>
          <div class="gallery-item">🖼️ Image 3</div>
          <div class="gallery-item">🖼️ Image 4</div>
        </div>
      </div>
    `,
    'dashboard': (t) => `
      <div class="tool-dashboard">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="dashboard-grid">
          <div class="metric-card">
            <div class="metric-value">1,234</div>
            <div class="metric-label">Total Views</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">567</div>
            <div class="metric-label">Unique Visitors</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">89%</div>
            <div class="metric-label">Engagement</div>
          </div>
        </div>
      </div>
    `,
    'timeline': (t) => `
      <div class="tool-timeline">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="timeline-container">
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h4>Event 1</h4>
              <p>First milestone in the journey</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h4>Event 2</h4>
              <p>Second major achievement</p>
            </div>
          </div>
          <div class="timeline-item">
            <div class="timeline-marker"></div>
            <div class="timeline-content">
              <h4>Event 3</h4>
              <p>Current status and future goals</p>
            </div>
          </div>
        </div>
      </div>
    `,
    'audio-player': (t) => `
      <div class="tool-audio-player">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <audio controls style="width: 100%; max-width: 600px;">
          <source src="${t.config.audioUrl || 'https://archive.org/download/testmp3testfile/mpthreetest.mp3'}" type="audio/mpeg">
          Your browser does not support the audio element.
        </audio>
      </div>
    `,
    'calculator': (t) => `
      <div class="tool-calculator">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="calculator">
          <input type="text" id="calc-display-${t.id}" readonly value="0" style="width: 100%; padding: 20px; font-size: 24px; text-align: right; border-radius: 8px; margin-bottom: 10px;">
          <div class="calc-buttons">
            <button onclick="appendToCalc('${t.id}', '7')">7</button>
            <button onclick="appendToCalc('${t.id}', '8')">8</button>
            <button onclick="appendToCalc('${t.id}', '9')">9</button>
            <button onclick="appendToCalc('${t.id}', '/')">÷</button>
            <button onclick="appendToCalc('${t.id}', '4')">4</button>
            <button onclick="appendToCalc('${t.id}', '5')">5</button>
            <button onclick="appendToCalc('${t.id}', '6')">6</button>
            <button onclick="appendToCalc('${t.id}', '*')">×</button>
            <button onclick="appendToCalc('${t.id}', '1')">1</button>
            <button onclick="appendToCalc('${t.id}', '2')">2</button>
            <button onclick="appendToCalc('${t.id}', '3')">3</button>
            <button onclick="appendToCalc('${t.id}', '-')">−</button>
            <button onclick="clearCalc('${t.id}')">C</button>
            <button onclick="appendToCalc('${t.id}', '0')">0</button>
            <button onclick="calculateCalc('${t.id}')">=</button>
            <button onclick="appendToCalc('${t.id}', '+')">+</button>
          </div>
        </div>
        <script>
          function appendToCalc(id, val) {
            const display = document.getElementById('calc-display-' + id);
            if (display.value === '0') display.value = val;
            else display.value += val;
          }
          function clearCalc(id) {
            document.getElementById('calc-display-' + id).value = '0';
          }
          function calculateCalc(id) {
            const display = document.getElementById('calc-display-' + id);
            try {
              display.value = eval(display.value);
            } catch(e) {
              display.value = 'Error';
            }
          }
        </script>
      </div>
    `,
    'content-hub': (t) => `
      <div class="tool-content-hub">
        <h3>${t.title}</h3>
        <p>${t.description}</p>
        <div class="content-list">
          <article class="content-item">
            <h4>Featured Article</h4>
            <p>Explore the latest insights and discoveries in this comprehensive guide.</p>
            <a href="#" class="read-more">Read More →</a>
          </article>
          <article class="content-item">
            <h4>Research Paper</h4>
            <p>Detailed analysis of current trends and future predictions.</p>
            <a href="#" class="read-more">Read More →</a>
          </article>
        </div>
      </div>
    `,
  }

  const templateFn = toolTemplates[tool.type]
  if (templateFn) {
    return templateFn(tool)
  }

  return `
    <div class="tool-generic">
      <h3>${tool.title}</h3>
      <p>${tool.description}</p>
      <div class="tool-placeholder">
        <span class="tool-icon">🔧</span>
        <p>Tool: ${tool.type}</p>
      </div>
    </div>
  `
}

export function generateStaticHTML(website: Website): string {
  const toolsHTML = (website.tools || []).map(tool => generateToolHTML(tool)).join('\n')
  const pagesHTML = (website.pages || []).map(page => `
    <section class="page-section">
      <h2>${page.title}</h2>
      <div class="page-content">${page.content}</div>
      ${(page.tools || []).map(tool => generateToolHTML(tool)).join('\n')}
    </section>
  `).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${website.title} - Infinity Spark</title>
  <meta name="description" content="${website.description}">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, oklch(0.12 0 0), oklch(0.18 0.02 260));
      color: oklch(0.95 0 0);
      line-height: 1.6;
      min-height: 100vh;
    }

    header {
      background: oklch(0.18 0.02 260 / 0.8);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-bottom: 1px solid oklch(0.25 0.04 270);
      position: sticky;
      top: 0;
      z-index: 100;
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2.5rem;
      font-weight: 700;
      margin-bottom: 0.5rem;
      background: linear-gradient(135deg, oklch(0.75 0.15 85), oklch(0.65 0.2 320));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .site-meta {
      display: flex;
      gap: 1.5rem;
      margin-top: 1rem;
      flex-wrap: wrap;
    }

    .meta-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: oklch(0.25 0.08 270 / 0.5);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.875rem;
    }

    .description {
      margin-top: 1rem;
      font-size: 1.125rem;
      color: oklch(0.85 0 0);
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
      padding: 3rem 2rem;
    }

    h2 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 2rem;
      margin-bottom: 1rem;
      color: oklch(0.75 0.15 85);
    }

    h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      margin-bottom: 0.75rem;
      color: oklch(0.85 0.1 280);
    }

    h4 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
      color: oklch(0.9 0.05 270);
    }

    .content-section {
      background: oklch(0.18 0.02 260 / 0.6);
      border: 1px solid oklch(0.25 0.04 270);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      white-space: pre-wrap;
    }

    .tools-section {
      display: grid;
      gap: 2rem;
      margin-bottom: 3rem;
    }

    .tool-video-player, .tool-chart, .tool-gallery, .tool-dashboard, 
    .tool-timeline, .tool-audio-player, .tool-calculator, .tool-content-hub, .tool-generic {
      background: oklch(0.18 0.02 260 / 0.6);
      border: 1px solid oklch(0.25 0.04 270);
      border-radius: 16px;
      padding: 2rem;
    }

    .video-container {
      margin-top: 1.5rem;
    }

    .gallery-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin-top: 1.5rem;
    }

    .gallery-item {
      aspect-ratio: 1;
      background: oklch(0.25 0.08 270);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
    }

    .dashboard-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .metric-card {
      background: oklch(0.25 0.08 270);
      padding: 2rem;
      border-radius: 12px;
      text-align: center;
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: oklch(0.75 0.15 85);
      margin-bottom: 0.5rem;
    }

    .metric-label {
      font-size: 0.875rem;
      color: oklch(0.65 0 0);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .timeline-container {
      margin-top: 1.5rem;
    }

    .timeline-item {
      display: flex;
      gap: 1.5rem;
      margin-bottom: 2rem;
      position: relative;
    }

    .timeline-item::after {
      content: '';
      position: absolute;
      left: 10px;
      top: 40px;
      bottom: -20px;
      width: 2px;
      background: oklch(0.35 0.15 290);
    }

    .timeline-item:last-child::after {
      display: none;
    }

    .timeline-marker {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: oklch(0.75 0.15 85);
      flex-shrink: 0;
      margin-top: 4px;
      z-index: 1;
    }

    .timeline-content {
      flex: 1;
    }

    .calc-buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }

    .calc-buttons button {
      padding: 20px;
      font-size: 20px;
      border: none;
      background: oklch(0.35 0.15 290);
      color: oklch(1 0 0);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s;
    }

    .calc-buttons button:hover {
      background: oklch(0.45 0.15 290);
      transform: translateY(-2px);
    }

    .calc-buttons button:active {
      transform: translateY(0);
    }

    .content-list {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin-top: 1.5rem;
    }

    .content-item {
      background: oklch(0.25 0.08 270);
      padding: 1.5rem;
      border-radius: 12px;
    }

    .content-item h4 {
      margin-bottom: 0.75rem;
    }

    .read-more {
      display: inline-block;
      margin-top: 0.75rem;
      color: oklch(0.75 0.15 85);
      text-decoration: none;
      font-weight: 600;
    }

    .read-more:hover {
      text-decoration: underline;
    }

    .tool-placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 3rem;
      background: oklch(0.25 0.08 270 / 0.3);
      border-radius: 12px;
      margin-top: 1rem;
    }

    .tool-icon {
      font-size: 4rem;
      margin-bottom: 1rem;
    }

    .page-section {
      margin-bottom: 3rem;
    }

    .page-content {
      background: oklch(0.18 0.02 260 / 0.4);
      padding: 2rem;
      border-radius: 12px;
      margin-bottom: 2rem;
      white-space: pre-wrap;
    }

    footer {
      background: oklch(0.18 0.02 260 / 0.8);
      backdrop-filter: blur(10px);
      padding: 2rem;
      text-align: center;
      border-top: 1px solid oklch(0.25 0.04 270);
      margin-top: 4rem;
    }

    .infinity-logo {
      font-size: 1.5rem;
      color: oklch(0.75 0.15 85);
      margin-bottom: 0.5rem;
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2rem;
      }

      .site-meta {
        flex-direction: column;
        gap: 0.75rem;
      }

      main {
        padding: 2rem 1rem;
      }

      .dashboard-grid, .gallery-grid {
        grid-template-columns: 1fr;
      }

      .calc-buttons button {
        padding: 15px;
        font-size: 18px;
      }
    }
  </style>
</head>
<body>
  <header>
    <h1>${website.title}</h1>
    <p class="description">${website.description}</p>
    <div class="site-meta">
      <div class="meta-item">
        <span>🌐</span>
        <span>${website.url}</span>
      </div>
      <div class="meta-item">
        <span>👤</span>
        <span>Owner: ${website.ownerWallet.slice(0, 6)}...${website.ownerWallet.slice(-4)}</span>
      </div>
      <div class="meta-item">
        <span>💎</span>
        <span>Value: ${website.value.toLocaleString()} ∞</span>
      </div>
      <div class="meta-item">
        <span>🔧</span>
        <span>${(website.tools || []).length} Tools</span>
      </div>
      ${website.worldArchetype ? `
      <div class="meta-item">
        <span>🌍</span>
        <span>${website.worldArchetype}</span>
      </div>
      ` : ''}
    </div>
  </header>

  <main>
    <section class="content-section">
      ${website.content}
    </section>

    ${toolsHTML ? `
    <section class="tools-section">
      <h2>Interactive Tools</h2>
      ${toolsHTML}
    </section>
    ` : ''}

    ${pagesHTML ? `
    <section class="pages-section">
      <h2>Pages</h2>
      ${pagesHTML}
    </section>
    ` : ''}
  </main>

  <footer>
    <div class="infinity-logo">∞ Infinity Spark</div>
    <p>Created with Infinity Spark - Turn Ideas Into Worlds</p>
    <p style="margin-top: 0.5rem; font-size: 0.875rem; color: oklch(0.65 0 0);">
      Token ID: ${website.tokenId} • Created: ${new Date(website.createdAt).toLocaleDateString()}
    </p>
    <p style="margin-top: 1rem; font-size: 0.75rem;">
      <a href="https://pewpi-infinity.github.io/infinity-spark/" style="color: oklch(0.75 0.15 85); text-decoration: none;">
        🌐 View All Worlds
      </a>
      •
      <a href="https://pewpi-infinity.github.io/infinity-spark-tour/" style="color: oklch(0.75 0.15 85); text-decoration: none;">
        🚀 Live Reference System
      </a>
    </p>
  </footer>
</body>
</html>`
}

export function generateIndexBuilder(websites: Website[]): string {
  const sortedWebsites = websites.sort((a, b) => b.createdAt - a.createdAt)
  
  const websiteLinks = sortedWebsites.map(site => `
    <a href="./${site.id}/index.html" class="world-card">
      <div class="world-header">
        <h3>${site.title}</h3>
        ${site.worldArchetype ? `<span class="archetype-badge">${site.worldArchetype}</span>` : ''}
      </div>
      <p class="world-description">${site.description}</p>
      <div class="world-meta">
        <span>💎 ${site.value.toLocaleString()} ∞</span>
        <span>🔧 ${(site.tools || []).length} tools</span>
        <span>📄 ${(site.pages || []).length} pages</span>
      </div>
      <div class="world-date">${new Date(site.createdAt).toLocaleDateString()}</div>
    </a>
  `).join('\n')

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Infinity Spark - World Index</title>
  <meta name="description" content="The single source engine that births, indexes, and links all live webpages. Every page originates here.">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, oklch(0.12 0 0), oklch(0.18 0.02 260));
      color: oklch(0.95 0 0);
      min-height: 100vh;
      padding: 3rem 2rem;
    }

    .engine-badge {
      display: inline-block;
      background: linear-gradient(135deg, oklch(0.35 0.15 290), oklch(0.25 0.08 270));
      color: oklch(1 0 0);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-bottom: 1rem;
      border: 1px solid oklch(0.75 0.15 85 / 0.3);
    }

    .reference-link {
      display: inline-block;
      margin-top: 1rem;
      padding: 0.75rem 1.5rem;
      background: oklch(0.18 0.02 260 / 0.8);
      border: 1px solid oklch(0.75 0.15 85 / 0.5);
      border-radius: 12px;
      color: oklch(0.75 0.15 85);
      text-decoration: none;
      font-size: 0.875rem;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .reference-link:hover {
      background: oklch(0.25 0.08 270);
      border-color: oklch(0.75 0.15 85);
      transform: translateY(-2px);
      box-shadow: 0 4px 20px oklch(0.75 0.15 85 / 0.3);
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
    }

    header {
      text-align: center;
      margin-bottom: 4rem;
    }

    h1 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 4rem;
      font-weight: 700;
      background: linear-gradient(135deg, oklch(0.75 0.15 85), oklch(0.65 0.2 320));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.5rem;
      color: oklch(0.75 0 0);
      margin-bottom: 2rem;
    }

    .stats {
      display: flex;
      justify-content: center;
      gap: 3rem;
      flex-wrap: wrap;
      margin-top: 2rem;
    }

    .stat-item {
      text-align: center;
    }

    .stat-value {
      font-size: 3rem;
      font-weight: 700;
      color: oklch(0.75 0.15 85);
    }

    .stat-label {
      font-size: 0.875rem;
      color: oklch(0.65 0 0);
      text-transform: uppercase;
      letter-spacing: 0.1em;
      margin-top: 0.5rem;
    }

    .worlds-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
      gap: 2rem;
      margin-top: 3rem;
    }

    .world-card {
      background: oklch(0.18 0.02 260 / 0.6);
      border: 1px solid oklch(0.25 0.04 270);
      border-radius: 16px;
      padding: 2rem;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .world-card:hover {
      transform: translateY(-4px);
      border-color: oklch(0.75 0.15 85);
      box-shadow: 0 0 30px oklch(0.75 0.15 85 / 0.3);
    }

    .world-header {
      display: flex;
      justify-content: space-between;
      align-items: start;
      gap: 1rem;
    }

    .world-card h3 {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 1.5rem;
      color: oklch(0.85 0.1 280);
      flex: 1;
    }

    .archetype-badge {
      background: oklch(0.35 0.15 290);
      color: oklch(1 0 0);
      padding: 0.25rem 0.75rem;
      border-radius: 6px;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      white-space: nowrap;
    }

    .world-description {
      color: oklch(0.75 0 0);
      line-height: 1.6;
    }

    .world-meta {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      font-size: 0.875rem;
      color: oklch(0.65 0 0);
    }

    .world-date {
      font-size: 0.75rem;
      color: oklch(0.55 0 0);
      font-family: 'JetBrains Mono', monospace;
    }

    .empty-state {
      text-align: center;
      padding: 4rem 2rem;
      color: oklch(0.65 0 0);
    }

    .empty-state h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: oklch(0.75 0 0);
    }

    footer {
      text-align: center;
      margin-top: 6rem;
      padding-top: 3rem;
      border-top: 1px solid oklch(0.25 0.04 270);
      color: oklch(0.65 0 0);
    }

    @media (max-width: 768px) {
      h1 {
        font-size: 2.5rem;
      }

      .subtitle {
        font-size: 1.125rem;
      }

      .stats {
        gap: 1.5rem;
      }

      .stat-value {
        font-size: 2rem;
      }

      .worlds-grid {
        grid-template-columns: 1fr;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="engine-badge">🌐 Source Engine</div>
      <h1>∞ Infinity Spark</h1>
      <p class="subtitle">Turn Ideas Into Worlds</p>
      <p style="max-width: 600px; margin: 0 auto 1rem; color: oklch(0.75 0 0); font-size: 0.95rem;">
        The single source of truth that births, indexes, and links all live webpages. Every page originates here.
      </p>
      <a href="https://pewpi-infinity.github.io/infinity-spark-tour/" target="_blank" rel="noopener" class="reference-link">
        🚀 Live Reference System
      </a>
      <div class="stats">
        <div class="stat-item">
          <div class="stat-value">${websites.length}</div>
          <div class="stat-label">Worlds Created</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${websites.reduce((sum, w) => sum + (w.tools || []).length, 0)}</div>
          <div class="stat-label">Total Tools</div>
        </div>
        <div class="stat-item">
          <div class="stat-value">${websites.reduce((sum, w) => sum + w.value, 0).toLocaleString()}</div>
          <div class="stat-label">Total Value (∞)</div>
        </div>
      </div>
    </header>

    ${websites.length > 0 ? `
    <main>
      <div class="worlds-grid">
        ${websiteLinks}
      </div>
    </main>
    ` : `
    <div class="empty-state">
      <h2>No Worlds Yet</h2>
      <p>Create your first world to see it here</p>
    </div>
    `}

    <footer>
      <p style="font-weight: 600; margin-bottom: 0.5rem;">Powered by Infinity Spark — The Source Engine</p>
      <p>The single source of truth that births, indexes, and links all live webpages</p>
      <p style="margin-top: 0.5rem; font-size: 0.875rem;">
        Each world is a live, functional website with its own tools and pages
      </p>
      <p style="margin-top: 1rem; font-size: 0.875rem;">
        <a href="https://pewpi-infinity.github.io/infinity-spark-tour/" target="_blank" rel="noopener" style="color: oklch(0.75 0.15 85); text-decoration: none;">
          🚀 Live Reference System
        </a>
      </p>
    </footer>
  </div>
</body>
</html>`
}

export function generateDeploymentSuggestions(website: Website): string[] {
  const suggestions: string[] = []

  if ((website.tools || []).length < 3) {
    suggestions.push(`Add more interactive tools to ${website.title}`)
  }

  if ((website.pages || []).length === 0) {
    suggestions.push(`Create additional pages for ${website.title}`)
  }

  if (!website.worldArchetype) {
    suggestions.push('Try creating a world using the slot machine')
  }

  if ((website.tools || []).some(t => t.type === 'video-player')) {
    suggestions.push('Add a gallery to complement your video content')
  }

  if ((website.tools || []).some(t => t.type === 'dashboard')) {
    suggestions.push('Add charts to visualize your dashboard metrics')
  }

  if (website.value < 2000) {
    suggestions.push('Increase world value by adding unique tools')
  }

  return suggestions.slice(0, 3)
}

export async function deployWebsite(website: Website): Promise<DeploymentResult> {
  try {
    const indexHTML = generateStaticHTML(website)
    const repoPath = `infinity-spark/${website.id}`
    const deploymentUrl = `https://pewpi-infinity.github.io/infinity-spark/${website.id}/`
    const suggestions = generateDeploymentSuggestions(website)

    return {
      success: true,
      url: deploymentUrl,
      repoPath,
      indexContent: indexHTML,
      suggestions
    }
  } catch (error) {
    return {
      success: false,
      url: '',
      repoPath: '',
      indexContent: '',
      suggestions: [],
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    }
  }
}
