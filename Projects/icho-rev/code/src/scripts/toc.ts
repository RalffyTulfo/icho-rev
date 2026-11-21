/**
 * Sticky Table of Contents with scroll‑spy for lesson pages.
 * Positions the ToC below the header, makes it position: sticky,
 * limits height with its own scrollbar, and highlights the active
 * section as the user scrolls through the lesson content.
 *
 * Usage: <script src="/src/scripts/toc.ts"></script> in the Astro page,
 * and <nav id="toc">…</nav> somewhere in the layout (typically after
 * the header and before the main content).
 */

document.addEventListener('DOMContentLoaded', () => {
  const toc = document.getElementById('toc')
  if (!toc) return

  // Collect all headings that should be tracked
  const headings = Array.from(document.querySelectorAll(
    'h2, h3' // lesson headings
  )).filter(h => {
    // Only include headings that have an id (anchors for scroll‑spy)
    if (h.id) return true
    // Generate an id if missing
    const text = h.innerText.trim().substring(0, 40).replace(/\s+/g, '-').toLowerCase()
    h.id = `heading-${Date.now()}-${Math.floor(Math.random() * 10000)}`
    return true
  })

  // Build the ToC list
  const list = toc.querySelector('ul') || document.createElement('ul')
  if (!toc.querySelector('ul')) toc.appendChild(list)

  headings.forEach((h, i) => {
    const li = document.createElement('li')
    const link = document.createElement('a')
    link.href = `#${h.id}`
    link.textContent = h.innerText.trim()
    link.className = 'block py-1 px-2 rounded text-sm text-muted-foreground hover:text-primary transition-colors'
    link.dataset.headingId = h.id
    li.appendChild(link)
    list.appendChild(li)
  })

  // Sticky container setup
  toc.style.position = 'sticky'
  toc.style.top = '8rem' // below the header
  toc.style.height = 'calc(100vh - 16rem)' // space below header + footer margin
  toc.style.overflowY = 'auto'
  toc.style.borderLeft = '1px solid var(--border, #e5e7eb)'
  toc.style.paddingLeft = '1rem'
  toc.style.backgroundColor = 'var(--sidebar-background, #f8fafc)'

  // Scroll‑spy: highlight active link based on intersection
  const observer = new IntersectionObserver(
    entries => {
      let mostRecent = null
      let maxRatio = 0

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const ratio = entry.target.getBoundingClientRect().top / window.innerHeight
          if (ratio > maxRatio) {
            maxRatio = ratio
            mostRecent = entry
          }
        }
      })

      if (mostRecent) {
        const activeId = mostRecent.target.getAttribute('id')
        // Remove active class from all links
        document.querySelectorAll('#toc a').forEach(a => a.classList.remove('active'))
        // Add active class to the matching link
        const activeLink = document.querySelector(`#toc a[data-heading-id="${activeId}"]`)
        if (activeLink) activeLink.classList.add('active')
      }
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // 50% of the heading must be visible
    }
  )

  // Observe each heading
  headings.forEach(h => observer.observe(h))

  // Also update on scroll for headings near the top/bottom
  let ticking = false
  function onScroll() {
    if (ticking) return
    window.requestAnimationFrame(() => {
      headings.forEach(h => {
        const rect = h.getBoundingClientRect()
        const isVisible = rect.top >= 0 && rect.top <= window.innerHeight
        if (isVisible) {
          const link = document.querySelector(`#toc a[data-heading-id="${h.id}"]`)
          if (link) link.classList.add('visible')
        } else {
          const link = document.querySelector(`#toc a[data-heading-id="${h.id}"]`)
          if (link) link.classList.remove('visible')
        }
      })
      ticking = false
    })
    ticking = true
  }

  window.addEventListener('scroll', onScroll, { passive: true })
})