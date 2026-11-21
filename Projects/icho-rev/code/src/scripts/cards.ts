/**
 * Cards Script – transforms rendered MDX DOM into card groups.
 *
 * Walks the content area, groups sections under each H3 into a card.
 * H2 headings become row labels. Cards have a fade overlay and can be
 * clicked to expand/collapse long content.
 *
 * Usage: <script src="/src/scripts/cards.ts"></script> in the Astro page,
 * and a <main class="view-wrapper">…</main> wrapper in the lesson content.
 */

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  if (!main) return

  // Collect all H2 headings as row labels
  const rowLabels = Array.from(main.querySelectorAll('h2')).map(h => ({
    element: h,
    text: h.innerText.trim()
  }))

  // Group content under each H3 into cards
  const h3s = Array.from(main.querySelectorAll('h3'))

  h3s.forEach((h3, h3Index) => {
    const card = document.createElement('div')
    card.className = 'card fade-in'
    card.setAttribute('role', 'button')
    card.setAttribute('tabindex', '0')
    card.setAttribute('aria-label', `Card: ${h3.innerText.trim()}`)
    card.addEventListener('click', () => toggleCardExpand(card))
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        toggleCardExpand(card)
      }
    })

    // Find the next H3 or end of main to determine card content boundary
    const nextH3 = h3Index < h3s.length - 1 ? h3s[h3Index + 1] : null
    const contentEnd = nextH3 ? nextH3 : main.querySelector('footer') || main

    // Collect all siblings between this H3 and the next H3 (or end)
    let sibling = h3.nextElementSibling
    const contentNodes = []

    while (sibling && sibling !== contentEnd) {
      if (sibling.nodeType === Node.ELEMENT_NODE) {
        contentNodes.push(sibling)
      }
      sibling = sibling.nextElementSibling
    }

    // Build card inner
    const cardInner = document.createElement('div')
    cardInner.className = 'card-inner'

    // H3 as card header
    const h3Copy = h3.cloneNode(true)
    h3Copy.className = 'card-header'
    cardInner.appendChild(h3Copy)

    // Content div with fade overlay
    const contentDiv = document.createElement('div')
    contentDiv.className = 'card-content'

    contentNodes.forEach(node => {
      // Skip heading tags that aren't the originating H3
      if (node.tagName === 'H3' || node.tagName === 'H2') return
      // Move content nodes into the card
      contentDiv.appendChild(node.cloneNode(true))
    })

    cardInner.appendChild(contentDiv)
    card.appendChild(cardInner)

    // Insert card before the H3 (so it appears above in the flow)
    h3.parentNode.insertBefore(card, h3)
  })

  // Expand/collapse functionality
  function toggleCardExpand(card) {
    const cardInner = card.querySelector('.card-inner')
    if (!cardInner) return

    // Toggle expanded state
    card.classList.toggle('expanded')

    // If expanding, focus the card content for accessibility
    if (card.classList.contains('expanded')) {
      const focusable = cardInner.querySelector('a, button, input, textarea')
      if (focusable) focusable.focus()
    }
  }
})