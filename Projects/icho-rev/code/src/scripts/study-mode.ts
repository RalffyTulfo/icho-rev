/**
 * Study Mode – one complete numbered subtopic per card.
 *
 * The lesson DOM is the single source of truth: nodes are MOVED into the study
 * panel (never cloned) and handed back in their original order on exit. One
 * card = one numbered H3 section; its nearest preceding H2 is the category.
 * Progress lives in localStorage under icho-rev:study:v1:<slug>.
 */

type Status = 'mastered' | 'progress'

interface Subtopic {
  id: string
  heading: HTMLElement
  nodes: Node[]
  category: string
}

const STORAGE_PREFIX = 'icho-rev:study:v1:'

function slugOf(): string {
  return window.location.pathname.split('/').filter(Boolean).pop() || 'lesson'
}

function cleanText(node: Node | null): string {
  if (!node) return ''
  return (node.textContent || '')
    .replace(/[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim()
}

export class StudyDeckEngine {
  private root: HTMLElement | null = null
  private wrapper: HTMLElement | null = null
  private panel: HTMLElement | null = null
  private originalNodes: Node[] = []
  private deck: Subtopic[] = []
  private intro: Node[] = []
  private recall: Node[] = []
  private ending: Node[] = []
  private statuses: Record<string, Status> = {}
  private index = 0
  private active = false
  private slug = 'lesson'
  private pendingView: string | null = null

  /** Snapshot the pristine lesson before any view script moves a node. */
  public capture() {
    if (typeof document === 'undefined' || this.originalNodes.length > 0) return
    this.root = document.querySelector('.view-wrapper > .lesson-content-cards')
    this.wrapper = document.querySelector('.view-wrapper')
    this.panel = document.getElementById('study-mode-wrapper')
    if (this.root) this.originalNodes = Array.from(this.root.childNodes)
  }

  public init() {
    if (typeof document === 'undefined') return
    this.capture()
    if (!this.root || !this.panel) return

    this.slug = slugOf()
    this.buildModel()
    this.loadProgress()
    this.bindControls()
    this.bindViewMode()
    this.renderStats()

    // A view switch may have arrived before the deck was ready; honour it now.
    const view = this.pendingView || this.wrapper?.getAttribute('data-view') || 'scroll'
    this.pendingView = null
    this.setMode(view)
  }

  // ---- model -------------------------------------------------------------

  private buildModel() {
    let category = 'Lesson'
    let section: 'intro' | 'body' | 'recall' | 'end' = 'intro'
    let pending: Node[] = []
    let current: Subtopic | null = null

    for (const node of this.originalNodes) {
      const el = node.nodeType === Node.ELEMENT_NODE ? (node as HTMLElement) : null
      const tag = el?.tagName

      if (tag === 'H2') {
        const text = cleanText(el)
        current = null
        pending = []
        if (/recall/i.test(text)) {
          category = text
          section = 'recall'
        } else {
          category = text || category
          section = 'body'
        }
        continue
      }

      if (tag === 'H3') {
        const text = cleanText(el)
        if (/^end of lesson/i.test(text)) {
          section = 'end'
          current = null
          this.ending.push(node)
          continue
        }
        if (section === 'recall') {
          this.recall.push(node)
          continue
        }
        const match = text.match(/^(\d+(?:\.\d+)+)\b/)
        if (match) {
          current = { id: match[1], heading: el as HTMLElement, nodes: [node], category }
          if (pending.length > 0) {
            // Lead-in text under the H2 belongs at the top of its first card.
            current.nodes.push(...pending)
            pending = []
          }
          this.deck.push(current)
        } else if (current) {
          current.nodes.push(node)
        } else {
          this.intro.push(node)
        }
        continue
      }

      if (section === 'recall') this.recall.push(node)
      else if (section === 'end') this.ending.push(node)
      else if (current) current.nodes.push(node)
      else if (section === 'body') pending.push(node)
      else this.intro.push(node)
    }
  }

  // ---- progress ----------------------------------------------------------

  private loadProgress() {
    try {
      const raw = localStorage.getItem(STORAGE_PREFIX + this.slug)
      const parsed = raw ? JSON.parse(raw) : {}
      if (parsed && typeof parsed === 'object') this.statuses = parsed
    } catch (e) {
      this.statuses = {}
    }
  }

  private saveProgress() {
    try {
      localStorage.setItem(STORAGE_PREFIX + this.slug, JSON.stringify(this.statuses))
    } catch (e) {}
  }

  private statusOf(id: string): Status | undefined {
    const value = this.statuses[id]
    return value === 'mastered' || value === 'progress' ? value : undefined
  }

  private setStatus(id: string, status: Status | undefined) {
    if (status) this.statuses[id] = status
    else delete this.statuses[id]
    this.saveProgress()
    this.renderStats()
    this.renderStatus()
  }

  // ---- views -------------------------------------------------------------

  public setMode(view: string) {
    if (!this.root || !this.panel) {
      this.pendingView = view
      return
    }
    if (view === 'study') this.enterStudy()
    else if (this.active) this.leaveStudy()
  }

  private releaseCards() {
    const api = (window as unknown as { __cardsRelease?: () => void }).__cardsRelease
    if (typeof api === 'function') api()
  }

  private enterStudy() {
    if (!this.panel) return
    // All cards mode wraps nodes; the lesson DOM must be flat again first.
    this.releaseCards()
    this.active = true
    this.wrapper?.classList.add('hidden')
    this.panel.classList.remove('hidden')
    this.panel.classList.add('flex')

    this.moveInto(document.getElementById('study-overview'), this.intro)
    this.moveInto(document.getElementById('study-recall-body'), this.recall)
    document.getElementById('study-recall')?.classList.toggle('hidden', this.recall.length === 0)
    this.moveInto(document.getElementById('study-end'), this.ending)

    this.renderCard()
  }

  public leaveStudy() {
    if (!this.active) return
    this.active = false
    // Pull every original node back into the lesson, in its original order.
    for (const node of this.originalNodes) this.root!.appendChild(node)
    document.getElementById('study-overview')?.classList.add('hidden')
    document.getElementById('study-recall')?.classList.add('hidden')
    document.getElementById('study-end')?.classList.add('hidden')
    this.panel?.classList.add('hidden')
    this.panel?.classList.remove('flex')
    this.wrapper?.classList.remove('hidden')
  }

  private moveInto(target: HTMLElement | null, nodes: Node[]) {
    if (!target) return
    if (nodes.length === 0) {
      target.classList.add('hidden')
      return
    }
    target.classList.remove('hidden')
    nodes.forEach((node) => target.appendChild(node))
  }

  private renderCard() {
    const card = this.deck[this.index]
    const title = document.getElementById('study-card-title')
    const body = document.getElementById('study-card-content')
    const badge = document.getElementById('study-card-category')
    if (!card || !title || !body) return

    if (badge) badge.textContent = card.category
    title.replaceChildren(card.heading)
    body.replaceChildren()

    for (const node of card.nodes) {
      if (node === card.heading) continue
      body.appendChild(node)
    }

    // Opening a card starts it, unless it was already tracked.
    if (!this.statusOf(card.id)) {
      this.statuses[card.id] = 'progress'
      this.saveProgress()
    }

    const total = this.deck.length
    const progressText = document.getElementById('study-card-progress-text')
    const progressBar = document.getElementById('study-card-progress-bar')
    if (progressText) progressText.textContent = `Card ${this.index + 1} of ${total}`
    if (progressBar) progressBar.style.width = `${((this.index + 1) / total) * 100}%`

    const prev = document.getElementById('study-prev-btn') as HTMLButtonElement | null
    const next = document.getElementById('study-next-btn') as HTMLButtonElement | null
    if (prev) prev.disabled = this.index === 0
    if (next) next.disabled = this.index >= total - 1

    this.renderStatus()
    this.renderStats()
  }

  private renderStatus() {
    const card = this.deck[this.index]
    const pill = document.getElementById('study-card-status-pill')
    const mark = document.getElementById('study-mark-mastered-btn')
    if (!card) return
    const status = this.statusOf(card.id)
    const mastered = status === 'mastered'

    if (pill) {
      pill.textContent = mastered ? 'Mastered' : status === 'progress' ? 'In Progress' : 'Not Started'
      pill.classList.toggle('text-emerald-300', mastered)
      pill.classList.toggle('text-amber-300', status === 'progress')
    }
    if (mark) {
      mark.textContent = mastered ? 'Mastered' : 'I Know This'
      mark.setAttribute('aria-pressed', String(mastered))
    }
  }

  private renderStats() {
    const total = this.deck.length
    let mastered = 0
    let progress = 0
    for (const card of this.deck) {
      const status = this.statusOf(card.id)
      if (status === 'mastered') mastered++
      else if (status === 'progress') progress++
    }
    const set = (id: string, value: number) => {
      const el = document.getElementById(id)
      if (el) el.textContent = String(value)
    }
    set('stat-total', total)
    set('stat-mastered', mastered)
    set('stat-in-progress', progress)
    set('stat-not-started', total - mastered - progress)
  }

  // ---- controls ----------------------------------------------------------

  private bindControls() {
    document.getElementById('study-prev-btn')?.addEventListener('click', () => {
      if (this.index > 0) {
        this.index--
        this.renderCard()
      }
    })

    document.getElementById('study-next-btn')?.addEventListener('click', () => {
      if (this.index < this.deck.length - 1) {
        this.index++
        this.renderCard()
      }
    })

    document.getElementById('study-mark-mastered-btn')?.addEventListener('click', () => {
      const card = this.deck[this.index]
      if (!card) return
      this.setStatus(card.id, this.statusOf(card.id) === 'mastered' ? 'progress' : 'mastered')
    })

    document.getElementById('study-reset-card-btn')?.addEventListener('click', () => {
      const card = this.deck[this.index]
      if (card) this.setStatus(card.id, undefined)
    })
  }

  private bindViewMode() {
    document.addEventListener('viewModeChange', (event) => {
      const view = (event as CustomEvent).detail?.view
      this.setMode(view)
    })
    ;(window as unknown as { __studyRelease?: () => void }).__studyRelease = () => this.leaveStudy()
  }
}

let engineInstance: StudyDeckEngine | null = null

export function getStudyEngine(): StudyDeckEngine {
  if (!engineInstance) engineInstance = new StudyDeckEngine()
  return engineInstance
}

if (typeof document !== 'undefined') {
  const engine = getStudyEngine()
  engine.capture()
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => engine.init(), { once: true })
  } else {
    engine.init()
  }
}
