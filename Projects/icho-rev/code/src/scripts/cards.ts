/**
 * Cards Script – transforms rendered MDX DOM into card groups.
 *
 * Walks the lesson content area, groups each H3 section into a card, and
 * moves the original H3 into the card header as the card title. A snapshot
 * of the pristine children is kept so switching back to Scroll restores the
 * exact original DOM (Cards -> Scroll -> Cards is repeatable).
 *
 * Usage: imported from the lesson page; requires the article markup
 * `.view-wrapper > .lesson-content-cards` and `.view-wrapper[data-view]`.
 */

// Snapshot at module evaluation: parsed DOM, before any view script has run.
const snapshotRoot = document.querySelector('.view-wrapper > .lesson-content-cards')
const initialNodes: Node[] = snapshotRoot ? Array.from(snapshotRoot.childNodes) : []

document.addEventListener('DOMContentLoaded', () => {
  // The study engine now owns All cards: it fills the grid with full subtopic cards.
  if ((window as unknown as { __studyDeck?: boolean }).__studyDeck) return

  const wrapper = document.querySelector('.view-wrapper')
  // The article's content container; exclude the study-mode panel's copy.
  const contentRoot = document.querySelector('.view-wrapper > .lesson-content-cards')
  if (!wrapper || !contentRoot) return

  // Pristine server-rendered children, in order. Never mutated.
  const originalNodes: Node[] = initialNodes.length ? initialNodes : Array.from(contentRoot.childNodes)
  // H3s we restyled as card headers, with their original class attribute.
  const cardedHeadings: Array<{ heading: HTMLElement; className: string | null }> = []

  function hasCards(): boolean {
    return contentRoot!.querySelector(':scope > .card') !== null
  }

  function restore() {
    if (!hasCards()) return
    // Re-append in original order: moves nodes back out of cards.
    originalNodes.forEach((node) => contentRoot!.appendChild(node))
    // Cards are empty now; drop the wrappers.
    contentRoot!.querySelectorAll(':scope > .card').forEach((card) => card.remove())
    // Undo the header class so the restored DOM matches the server output.
    cardedHeadings.forEach(({ heading, className }) => {
      if (className === null) {
        heading.removeAttribute('class')
      } else {
        heading.setAttribute('class', className)
      }
    })
    cardedHeadings.length = 0
  }

  // Study mode calls this before taking the nodes over.
  ;(window as unknown as { __cardsRelease?: () => void }).__cardsRelease = () => restore()

  function buildCards() {
    if (hasCards()) return

    const headingForCard = new Map<Node, HTMLElement>()
    const consumed = new Set<Node>()

    originalNodes.forEach((node, index) => {
      if (node.nodeType !== Node.ELEMENT_NODE) return
      const heading = node as HTMLElement
      if (heading.tagName !== 'H3') return

      const card = document.createElement('div')
      card.className = 'card fade-in'
      card.setAttribute('role', 'button')
      card.setAttribute('tabindex', '0')
      card.setAttribute('aria-label', `Card: ${(heading.textContent || '').trim()}`)
      card.addEventListener('click', () => toggleCardExpand(card))
      card.addEventListener('keydown', (event: KeyboardEvent) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          toggleCardExpand(card)
        }
      })

      const inner = document.createElement('div')
      inner.className = 'card-inner'

      // The original H3 becomes the card header — moved, not cloned.
      cardedHeadings.push({ heading, className: heading.getAttribute('class') })
      heading.classList.add('card-header')
      inner.appendChild(heading)

      const content = document.createElement('div')
      content.className = 'card-content'

      // Everything up to the next H2/H3 belongs to this card.
      let cursor = index + 1
      while (cursor < originalNodes.length) {
        const sibling = originalNodes[cursor]
        if (sibling.nodeType === Node.ELEMENT_NODE) {
          const tag = (sibling as HTMLElement).tagName
          if (tag === 'H2' || tag === 'H3') break
          content.appendChild(sibling)
          consumed.add(sibling)
        } else if (sibling.nodeType === Node.TEXT_NODE && (sibling.textContent || '').trim() !== '') {
          content.appendChild(sibling)
          consumed.add(sibling)
        }
        cursor++
      }

      inner.appendChild(content)
      card.appendChild(inner)
      headingForCard.set(node, card)
    })

    // Reassemble in original order; each H3 is replaced in place by its card.
    originalNodes.forEach((node) => {
      const card = headingForCard.get(node)
      if (card) {
        contentRoot!.appendChild(card)
        return
      }
      if (consumed.has(node)) return
      contentRoot!.appendChild(node)
    })
  }

  function toggleCardExpand(card: HTMLElement) {
    const cardInner = card.querySelector('.card-inner')
    if (!cardInner) return

    card.classList.toggle('expanded')

    if (card.classList.contains('expanded')) {
      const focusable = cardInner.querySelector('a, button, input, textarea') as HTMLElement | null
      if (focusable) focusable.focus()
    }
  }

  function applyMode() {
    const mode = wrapper!.getAttribute('data-view')
    if (mode === 'cards') {
      buildCards()
    } else {
      restore()
    }
  }

  applyMode()

  // Study mode moves lesson nodes into its own panel; hand them back first.
  function releaseStudy() {
    const api = (window as unknown as { __studyRelease?: () => void }).__studyRelease
    if (typeof api === 'function') api()
  }

  // ViewToggle announces the new view with one event.
  document.addEventListener('viewModeChange', (event) => {
    const view = (event as CustomEvent).detail?.view ?? wrapper!.getAttribute('data-view')
    if (view === 'cards') releaseStudy()
    applyMode()
  })
})
