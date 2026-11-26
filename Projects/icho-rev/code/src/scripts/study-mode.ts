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

import { parseCardId } from './card-id.mjs';

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
  /** Deck ids in the order currently shown (lesson order, filtered, maybe shuffled). */
  private order: string[] = []
  private pos = 0
  private view: 'scroll' | 'study' | 'cards' = 'scroll'
  private category = 'all'
  private hideMastered = false
  private shuffled = false
  private cols = 2
  /** Set when the deck order changes on purpose (shuffle), to start at the top. */
  private resetPos = false
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
    this.buildCategoryOptions()
    this.loadControls()
    this.rebuildOrder()
    this.bindControls()
    this.bindColumns()
    this.bindKeyboard()
    this.bindStatsDisclosure()
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
        const cardId = parseCardId(text)
        if (cardId) {
          current = { id: cardId, heading: el as HTMLElement, nodes: [node], category }
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
    const next = view === 'study' || view === 'cards' ? view : 'scroll'
    const keep = this.resetPos ? '' : this.currentCard()?.id
    this.resetPos = false
    this.view = next
    this.active = next !== 'scroll'

    // Always start from the flat lesson: both the card and the grid are filled by moving nodes.
    this.clearGrid()
    this.restoreAll()

    if (next === 'scroll') {
      this.panel.classList.add('hidden')
      this.panel.classList.remove('flex')
      this.wrapper?.classList.remove('hidden')
      return
    }

    this.wrapper?.classList.add('hidden')
    this.panel.classList.remove('hidden')
    this.panel.classList.add('flex')
    this.syncToolbar()
    this.rebuildOrder(keep)

    const stage = document.getElementById('study-stage')
    const grid = document.getElementById('study-grid-wrap')

    if (next === 'study') {
      stage?.classList.remove('hidden')
      grid?.classList.add('hidden')
      this.moveInto(document.getElementById('study-overview'), this.intro)
      this.moveInto(document.getElementById('study-recall-body'), this.recall)
      document.getElementById('study-recall')?.classList.toggle('hidden', this.recall.length === 0)
      this.moveInto(document.getElementById('study-end'), this.ending)
      this.renderCard()
    } else {
      stage?.classList.add('hidden')
      grid?.classList.remove('hidden')
      this.renderGrid()
    }
  }

  public leaveStudy() {
    this.setMode('scroll')
  }

  /** Re-append every original node to the lesson, in order. */
  private restoreAll() {
    if (!this.root) return
    for (const node of this.originalNodes) this.root.appendChild(node)
  }

  private clearGrid() {
    document.getElementById('all-cards-grid')?.replaceChildren()
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

  private currentCard(): Subtopic | undefined {
    const id = this.order[this.pos]
    return this.deck.find((card) => card.id === id)
  }

  private renderCard() {
    const card = this.currentCard()
    const title = document.getElementById('study-card-title')
    const body = document.getElementById('study-card-content')
    const badge = document.getElementById('study-card-category')
    if (!title || !body) return

    document.getElementById('study-empty')?.classList.toggle('hidden', Boolean(card))
    document.getElementById('active-study-card')?.classList.toggle('hidden', !card)
    document.querySelector('.study-actions')?.classList.toggle('hidden', !card)

    if (!card) {
      this.updateNav()
      return
    }

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

    const active = document.getElementById('active-study-card')
    if (active) {
      active.classList.remove('study-card-enter')
      void active.offsetWidth
      active.classList.add('study-card-enter')
    }

    const bar = document.getElementById('study-card-progress-bar')
    if (bar) bar.style.width = `${((this.pos + 1) / Math.max(this.order.length, 1)) * 100}%`

    this.updateNav()
    this.renderStatus()
    this.renderStats()
  }

  private updateNav() {
    const text = document.getElementById('study-card-progress-text')
    const total = this.order.length
    if (text) {
      text.textContent = total === 0 ? 'No cards' : `Card ${this.pos + 1} of ${total}`
    }
    const prev = document.getElementById('study-prev-btn') as HTMLButtonElement | null
    const next = document.getElementById('study-next-btn') as HTMLButtonElement | null
    if (prev) prev.disabled = this.pos <= 0 || total === 0
    if (next) next.disabled = this.pos >= total - 1 || total === 0
  }

  private renderStatus() {
    const card = this.currentCard()
    const pill = document.getElementById('study-card-status-pill')
    const mark = document.getElementById('study-mark-mastered-btn')
    const label = document.getElementById('study-mark-mastered-label')
    if (!card) return
    const status = this.statusOf(card.id)
    const mastered = status === 'mastered'

    if (pill) {
      pill.textContent = mastered ? 'Mastered' : status === 'progress' ? 'In Progress' : 'Not Started'
      pill.style.color = mastered
        ? 'var(--study-mastered)'
        : status === 'progress'
          ? 'var(--study-progress)'
          : 'var(--color-muted)'
    }
    if (mark) mark.setAttribute('aria-pressed', String(mastered))
    if (label) label.textContent = mastered ? 'Mastered' : 'I Know This'
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

  // ---- all cards ---------------------------------------------------------

  private renderGrid() {
    const grid = document.getElementById('all-cards-grid')
    if (!grid) return
    this.clearGrid()
    this.restoreAll()

    const cards = this.order
      .map((id) => this.deck.find((entry) => entry.id === id))
      .filter((card): card is Subtopic => Boolean(card))

    document.getElementById('study-grid-empty')?.classList.toggle('hidden', cards.length > 0)

    cards.forEach((card, index) => {
      const status = this.statusOf(card.id) || 'idle'
      const el = document.createElement('article')
      el.className = 'study-card study-grid-card'
      el.dataset.id = card.id
      el.dataset.status = status
      el.setAttribute('role', 'button')
      el.setAttribute('tabindex', '0')
      el.setAttribute('aria-label', `${card.id} ${cleanText(card.heading)} — open in Study`)
      el.addEventListener('click', () => this.openCard(card.id))
      el.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          this.openCard(card.id)
        }
      })

      const head = document.createElement('div')
      head.className = 'study-card-head'
      const badge = document.createElement('span')
      badge.className = 'study-badge'
      badge.textContent = card.category
      const title = document.createElement('div')
      title.className = 'study-title'
      title.appendChild(card.heading)
      head.append(badge, title)

      const body = document.createElement('div')
      body.className = 'study-card-body'
      for (const node of card.nodes) {
        if (node !== card.heading) body.appendChild(node)
      }

      const foot = document.createElement('div')
      foot.className = 'study-card-foot'
      const count = document.createElement('span')
      count.className = 'study-nav-count'
      count.textContent = `${index + 1} / ${cards.length}`
      const chip = document.createElement('span')
      chip.className = 'study-grid-status'
      chip.textContent = status === 'mastered' ? 'Mastered' : status === 'progress' ? 'In Progress' : 'Not Started'
      foot.append(count, chip)

      el.append(head, body, foot)
      grid.appendChild(el)
    })

    this.syncColumns()
  }

  // ---- controls ----------------------------------------------------------

  private step(delta: number) {
    const next = this.pos + delta
    if (next < 0 || next >= this.order.length) return
    this.pos = next
    this.renderCard()
  }

  private rebuildOrder(keepId?: string) {
    const keep = keepId ?? this.currentCard()?.id
    const ids = this.sessionOrder.filter((id) => {
      const card = this.deck.find((entry) => entry.id === id)
      if (!card) return false
      if (this.category !== 'all' && card.category !== this.category) return false
      if (this.hideMastered && this.statusOf(id) === 'mastered') return false
      return true
    })
    this.order = ids
    const at = keep ? ids.indexOf(keep) : -1
    this.pos = at >= 0 ? at : Math.min(this.pos, Math.max(ids.length - 1, 0))
  }

  private bindControls() {
    document.getElementById('study-prev-btn')?.addEventListener('click', () => this.step(-1))
    document.getElementById('study-next-btn')?.addEventListener('click', () => this.step(1))

    document.getElementById('study-mark-mastered-btn')?.addEventListener('click', () => {
      const card = this.currentCard()
      if (!card) return
      const wasMastered = this.statusOf(card.id) === 'mastered'
      this.setStatus(card.id, wasMastered ? 'progress' : 'mastered')
      if (!wasMastered && this.hideMastered) {
        // The mastered card leaves the filtered deck; the next one slides in.
        const at = this.pos
        this.rebuildOrder()
        this.pos = Math.min(at, Math.max(this.order.length - 1, 0))
        this.renderCard()
      }
    })

    document.getElementById('study-reset-card-btn')?.addEventListener('click', () => {
      const card = this.currentCard()
      if (!card) return
      this.setStatus(card.id, undefined)
      if (this.hideMastered) this.setMode(this.view)
    })

    const select = document.getElementById('study-category-select') as HTMLSelectElement | null
    select?.addEventListener('change', () => {
      this.category = select.value
      this.setMode(this.view)
    })

    const hide = document.getElementById('study-hide-mastered') as HTMLInputElement | null
    hide?.addEventListener('change', () => {
      this.hideMastered = hide.checked
      this.setMode(this.view)
    })

    document.getElementById('study-shuffle-btn')?.addEventListener('click', () => {
      this.shuffled = !this.shuffled
      this.sessionOrder = this.shuffled
        ? shuffleIds(this.deck.map((card) => card.id))
        : this.deck.map((card) => card.id)
      this.resetPos = true
      this.pos = 0
      this.setMode(this.view)
    })

    const showAll = () => {
      this.category = 'all'
      this.hideMastered = false
      this.setMode(this.view)
    }
    document.getElementById('study-show-all-btn')?.addEventListener('click', showAll)
    document.getElementById('study-grid-show-all-btn')?.addEventListener('click', showAll)
  }

  private bindColumns() {
    const group = document.getElementById('study-cols-control')
    if (!group) return
    group.querySelectorAll<HTMLButtonElement>('button[data-cols]').forEach((btn) => {
      btn.addEventListener('click', () => {
        this.cols = Number(btn.dataset.cols) || 1
        try {
          localStorage.setItem('icho-rev-cols', String(this.cols))
        } catch (e) {}
        this.syncColumns()
      })
    })
    window.addEventListener('resize', () => this.syncColumns())
    this.syncColumns()
  }

  private maxColumns(): number {
    if (window.innerWidth < 700) return 1
    if (window.innerWidth < 1100) return 2
    return 3
  }

  private syncColumns() {
    const max = this.maxColumns()
    if (this.cols > max) this.cols = max
    if (this.cols < 1) this.cols = 1
    document.getElementById('all-cards-grid')?.setAttribute('data-columns', String(this.cols))
    document.getElementById('study-cols-control')?.classList.toggle('hidden', this.view !== 'cards')
    document.querySelectorAll<HTMLButtonElement>('#study-cols-control button[data-cols]').forEach((btn) => {
      const value = Number(btn.dataset.cols)
      btn.setAttribute('aria-pressed', String(value === this.cols))
      btn.disabled = value > max
    })
  }

  private syncToolbar() {
    const select = document.getElementById('study-category-select') as HTMLSelectElement | null
    if (select) select.value = this.category
    const hide = document.getElementById('study-hide-mastered') as HTMLInputElement | null
    if (hide) hide.checked = this.hideMastered
    const shuffle = document.getElementById('study-shuffle-btn')
    const label = document.getElementById('study-shuffle-label')
    if (label) label.textContent = this.shuffled ? 'Unshuffle' : 'Shuffle'
    shuffle?.setAttribute('aria-pressed', String(this.shuffled))
    shuffle?.setAttribute('aria-label', this.shuffled ? 'Restore lesson order' : 'Shuffle cards')
    this.syncColumns()
  }

  private buildCategoryOptions() {
    const select = document.getElementById('study-category-select') as HTMLSelectElement | null
    if (!select) return
    const categories: string[] = []
    for (const card of this.deck) {
      if (!categories.includes(card.category)) categories.push(card.category)
    }
    for (const name of categories) {
      const option = document.createElement('option')
      option.value = name
      option.textContent = name
      select.appendChild(option)
    }
  }

  private loadControls() {
    try {
      const stored = Number(localStorage.getItem('icho-rev-cols'))
      if (stored === 1 || stored === 2 || stored === 3) this.cols = stored
    } catch (e) {}
    this.sessionOrder = this.deck.map((card) => card.id)
  }

  private bindKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (this.view !== 'study' || !this.active) return
      if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return
      const target = event.target as HTMLElement | null
      if (target && /^(INPUT|SELECT|TEXTAREA|SUMMARY)$/.test(target.tagName)) return
      if (target?.isContentEditable) return
      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        this.step(-1)
      } else if (event.key === 'ArrowRight') {
        event.preventDefault()
        this.step(1)
      }
    })
  }

  private bindStatsDisclosure() {
    const stats = document.getElementById('study-stats') as HTMLDetailsElement | null
    if (!stats) return
    let wide = window.innerWidth >= 700
    stats.open = wide
    window.addEventListener('resize', () => {
      const nowWide = window.innerWidth >= 700
      if (nowWide !== wide) {
        wide = nowWide
        stats.open = nowWide
      }
    })
  }

  private openCard(id: string) {
    const at = this.order.indexOf(id)
    this.pos = at >= 0 ? at : 0
    if (this.view === 'study') this.setMode('study')
    else document.dispatchEvent(new CustomEvent('requestView', { detail: { view: 'study' } }))
  }

  private bindViewMode() {
    document.addEventListener('viewModeChange', (event) => {
      const view = (event as CustomEvent).detail?.view
      this.setMode(view)
    })
    ;(window as unknown as { __studyRelease?: () => void }).__studyRelease = () => this.leaveStudy()
  }
}

function shuffleIds(ids: string[]): string[] {
  const copy = ids.slice()
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const swap = copy[i]
    copy[i] = copy[j]
    copy[j] = swap
  }
  return copy
}

let engineInstance: StudyDeckEngine | null = null

export function getStudyEngine(): StudyDeckEngine {
  if (!engineInstance) engineInstance = new StudyDeckEngine()
  return engineInstance
}

if (typeof document !== 'undefined') {
  // Tell cards.ts to stand down: this engine renders All cards too.
  ;(window as unknown as { __studyDeck?: boolean }).__studyDeck = true
  const engine = getStudyEngine()
  engine.capture()
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => engine.init(), { once: true })
  } else {
    engine.init()
  }
}
