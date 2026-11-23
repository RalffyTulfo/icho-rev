/**
 * TOC Script – builds the lesson sidebar table of contents.
 *
 * Reads only the headings inside the lesson content container
 * (`.view-wrapper > .lesson-content-cards`), so the toolbar, study panel,
 * statistics panel and the ToC itself are never picked up. Headings keep their
 * ids in both Scroll and Cards mode (cards.ts moves the same nodes), so one
 * build serves both views. Renders the same list into the desktop sidebar and
 * the mobile "On this page" panel.
 */

const EMOJI = /[\u{1F000}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}\u{2B00}-\u{2BFF}]/gu
const OFFSET = 96

function slugify(text: string): string {
  return text
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(EMOJI, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '')
}

function labelFor(heading: HTMLElement): string {
  const clone = heading.cloneNode(true) as HTMLElement
  clone.querySelectorAll('.katex-mathml, .katex-html .mspace, style, script').forEach((n) => n.remove())
  return (clone.textContent || '')
    .replace(EMOJI, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function buildToc() {
  const content = document.querySelector('.view-wrapper > .lesson-content-cards')
  const nav = document.getElementById('toc')
  if (!content || !nav) return

  const headings = Array.from(content.querySelectorAll('h2, h3')).filter(
    (h) => !h.closest('#study-mode-wrapper, #toc, header, nav, aside'),
  ) as HTMLElement[]

  if (headings.length === 0) return

  // Stable, unique ids generated from the label text.
  const seen = new Map<string, number>()
  headings.forEach((heading) => {
    const raw = slugify(labelFor(heading)) || 'section'
    const count = seen.get(raw) || 0
    seen.set(raw, count + 1)
    heading.id = count === 0 ? raw : `${raw}-${count + 1}`
  })

  const list = document.createElement('ul')
  list.className = 'toc-list'

  let group: HTMLElement | null = null
  let sublist: HTMLElement | null = null

  const linkFor = (heading: HTMLElement, level: 2 | 3) => {
    const link = document.createElement('a')
    link.className = `toc-link toc-link-${level}`
    link.href = `#${heading.id}`
    link.dataset.target = heading.id
    link.textContent = labelFor(heading)
    link.addEventListener('click', (event) => {
      event.preventDefault()
      // In Cards mode the heading lives inside a card; scroll to the card.
      const target = (heading.closest('.card') as HTMLElement) || heading
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (history.replaceState) history.replaceState(null, '', `#${heading.id}`)
      setActive(heading.id)
    })
    return link
  }

  headings.forEach((heading) => {
    if (heading.tagName === 'H2') {
      group = document.createElement('li')
      group.className = 'toc-group'
      group.appendChild(linkFor(heading, 2))
      sublist = document.createElement('ul')
      sublist.className = 'toc-sublist'
      group.appendChild(sublist)
      list.appendChild(group)
    } else if (sublist && group) {
      const item = document.createElement('li')
      item.appendChild(linkFor(heading, 3))
      sublist.appendChild(item)
    } else {
      const item = document.createElement('li')
      item.className = 'toc-group'
      item.appendChild(linkFor(heading, 3))
      list.appendChild(item)
    }
  })

  nav.innerHTML = ''
  nav.appendChild(list)

  const mobile = document.getElementById('mobile-toc-list')
  if (mobile) {
    mobile.innerHTML = ''
    mobile.appendChild(list.cloneNode(true))
    // The clone has no listeners; delegate so the mobile list behaves the same.
    mobile.addEventListener('click', (event) => {
      const link = (event.target as HTMLElement).closest('a[data-target]') as HTMLAnchorElement | null
      if (!link) return
      event.preventDefault()
      const heading = headings.find((h) => h.id === link.dataset.target)
      if (!heading) return
      const target = (heading.closest('.card') as HTMLElement) || heading
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      if (history.replaceState) history.replaceState(null, '', `#${heading.id}`)
      setActive(heading.id)
    })
  }

  const allLists = [list, ...(mobile ? Array.from(mobile.querySelectorAll('.toc-list')) : [])]
  const linksFor = (id: string) =>
    allLists.flatMap((l) => Array.from(l.querySelectorAll<HTMLAnchorElement>(`a[data-target="${id}"]`)))

  function setActive(id: string) {
    allLists.forEach((l) => {
      l.querySelectorAll('.toc-link.is-active').forEach((a) => a.classList.remove('is-active'))
      l.querySelectorAll('.toc-group.is-active, .toc-group.is-open').forEach((g) => {
        g.classList.remove('is-active')
        g.classList.remove('is-open')
      })
      linksFor(id).forEach((link) => {
        link.classList.add('is-active')
        const g = link.closest('.toc-group')
        if (g) {
          g.classList.add('is-active', 'is-open')
          const parent = g.parentElement?.closest('.toc-group')
          if (parent) parent.classList.add('is-open')
        }
      })
    })
  }

  function updateActive() {
    // scroll-margin-top leaves a gap below the header, so allow some slack.
    let current = headings[0]
    for (const heading of headings) {
      if (heading.getBoundingClientRect().top - OFFSET <= 24) current = heading
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8
    if (atBottom) current = headings[headings.length - 1]
    setActive(current.id)
  }

  // Scrollspy: the observer drives updates; rect math picks the topmost passed heading.
  const observer = new IntersectionObserver(() => updateActive(), {
    rootMargin: `-${OFFSET}px 0px -55% 0px`,
    threshold: [0, 1],
  })
  headings.forEach((heading) => observer.observe(heading))
  updateActive()

  // Keep the highlight correct when cards.ts rewrites the DOM.
  const wrapper = document.querySelector('.view-wrapper')
  if (wrapper) {
    new MutationObserver(() => updateActive()).observe(wrapper, {
      attributes: true,
      attributeFilter: ['data-view'],
    })
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', buildToc, { once: true })
} else {
  buildToc()
}
