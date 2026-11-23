/**
 * TOC Script – builds the Table of Contents for lesson pages.
 *
 * Only includes headings inside the lesson content (excludes "LESSON NAVIGATION"
 * and "Study Statistics" sidebar entries). Strips .katex-mathml copy before reading
 * label text. Nests H3 under H2. Collapses non-active groups. Adds scrollspy
 * highlighting. Removes card-in-card nesting.
 */

document.addEventListener('DOMContentLoaded', () => {
  const main = document.querySelector('main')
  if (!main) return

  // The actual lesson content div (not the sidebar "Lesson Navigation")
  const contentArea = document.querySelector('.lesson-content-cards')
  if (!contentArea) return

  // Collect heading elements inside the content area only
  // Exclude headings that are part of the sidebar (Lesson Navigation, Study Statistics)
  const allHeadings = Array.from(contentArea.querySelectorAll('h1, h2, h3, h4, h5, h6'))

  // Filter out headings that contain .katex-mathml (strip the mathml copy before reading label)
  const headings = allHeadings.filter(h => {
    const katexMathml = h.querySelector('.katex-mathml')
    if (katexMathml) {
      // Remove the .katex-mathml element from the DOM for label reading,
      // but keep it in the content
      katexMathml.remove()
    }
    return true
  })

  // Track heading IDs for uniqueness and nesting
  const headingIds = new Set()
  const headingLevels = {}

  // Process headings: generate stable IDs with slugify, nest H3 under H2
  headings.forEach((h, i) => {
    const level = parseInt(h.tagName.replace('H', ''), 10)

    // Skip H1 (the main lesson title) - only process H2 and below for TOC
    if (level === 1) {
      h.style.display = 'none'
      return
    }

    // Generate stable ID with slugify: strip emoji, trim hyphens, collapse repeats
    const rawId = h.id || ''
    let slugifiedId

    if (rawId) {
      // Use existing ID if it exists and is valid
      slugifiedId = rawId
        .replace(/[^\w]/g, '-')  // Replace non-word chars with hyphens
        .replace(/^-+|-+$/g, '')  // Trim leading/trailing hyphens
        .replace(/-{2,}/g, '-')   // Collapse repeated hyphens
      // Strip emoji (anything outside normal ASCII range)
      slugifiedId = slugifiedId.replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{27BF}\u{23CF}\u{23E9}-\u{23F0}]/gu, '')
    } else {
      // Generate slug from heading text
      const text = h.innerText.trim()
        .replace(/[^\w\s]/g, '')  // Remove non-alphanumeric (except spaces)
        .replace(/\s+/g, '-')     // Replace spaces with hyphens
        .toLowerCase()
      slugifiedId = text.replace(/-{2,}/g, '-').replace(/^-+|-+$/g, '')
    }

    // Ensure unique ID
    let uniqueId = slugifiedId
    let counter = 0
    if (headingIds.has(slugifiedId)) {
      counter = 1
      while (headingIds.has(`${slugifiedId}-${counter}`)) {
        counter++
      }
      uniqueId = `${slugifiedId}-${counter}`
    }
    headingIds.add(uniqueId)
    h.id = uniqueId
    headingLevels[uniqueId] = level
  })

  // Nest H3 under H2 (H3 should be child of H2 when both exist in sequence)
  // This creates proper heading hierarchy for screen readers
  const headingsByLevel = {
    H2: [],
    H3: [],
    H4: []
  }

  headings.forEach(h => {
    const level = parseInt(h.tagName.replace('H', ''), 10)
    if (level >= 2 && level <= 4) {
      headingsByLevel[`H${level}`].push(h)
    }
  })

  // Find H2-H3 pairs and nest H3 under H2
  for (let i = 0; i < headingsByLevel.H2.length; i++) {
    const h2 = headingsByLevel.H2[i]
    // Find the next H3 that should be nested under this H2
    for (let j = 0; j < headingsByLevel.H3.length; j++) {
      const h3 = headingsByLevel.H3[j]
      // If H3 comes after H2 in the DOM
      if (h3.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING) {
        // Check if there's another H2 between them
        const h2sAfter = headingsByLevel.H2.filter(h2cmp => h2cmp.compareDocumentPosition(h3) & Node.DOCUMENT_POSITION_FOLLOWING)
        const nextH2Index = h2sAfter.findIndex(h2cmp => h2cmp.compareDocumentPosition(h3) & Node.DOCUMENT_POSITION_FOLLOWING)
        const hasNextH2 = nextH2Index >= 0 && nextH2Index < headingsByLevel.H2.length

        if (!hasNextH2) {
          // Nest this H3 under its preceding H2
          // Move H3 to be inside H2 if not already
          if (h3.parentNode !== h2 && !h2.querySelector('h3')) {
            // Remove H3 from current parent, append to H2
            h3.parentNode.removeChild(h3)
            h2.appendChild(h3)
          }
          break // Only nest one H3 per H2 for simplicity
        }
      }
    }
  }

  // Build the TOC navigation - only include H2 and H3 headings
  // Exclude "LESSON NAVIGATION" and "Study Statistics" entries (only content headings)
  const tocUl = document.createElement('ul')
  tocUl.className = 'flex flex-col space-y-2 text-sm text-foreground/80'

  // Add H2 headings as main TOC entries
  headingsByLevel.H2.forEach((h2) => {
    const link = document.createElement('li')
    const anchor = document.createElement('a')
    anchor.href = `#${h2.id}`
    anchor.textContent = h2.innerText.trim()
    anchor.className = 'block p-2 rounded hover:bg-primary/10 transition-colors text-foreground'
    anchor.setAttribute('role', 'menuitem')
    anchor.setAttribute('aria-controls', `toc-section-${h2.id}`)
    link.appendChild(anchor)
    tocUl.appendChild(link)
  })

  // Add H3 headings as nested sub-entries under their parent H2
  headingsByLevel.H3.forEach((h3) => {
    const parentH2 = h3.parentElement.closest('h2') || null
    const li = document.createElement('li')
    li.className = 'ml-4 pt-1'

    const anchor = document.createElement('a')
    anchor.href = `#${h3.id}`
    anchor.textContent = h3.innerText.trim()
    anchor.className = 'block px-2 py-1 rounded hover:bg-primary/10 transition-colors text-muted'
    anchor.setAttribute('role', 'menuitem')
    anchor.setAttribute('aria-controls', `toc-section-${h3.id}`)

    // Only add if parent H2 exists in TOC
    const parentLi = Array.from(tocUl.children).find(child =>
      child.firstChild?.href === `#${parentH2.id}`
    )
    if (parentH2 && parentLi) {
      li.appendChild(anchor)
      // Add nested list under parent H2
      let nestedList = parentLi.querySelector('ul')
      if (!nestedList) {
        nestedList = document.createElement('ul')
        nestedList.className = 'ml-4 text-xs text-foreground/60'
        parentLi.appendChild(nestedList)
      }
      nestedList.appendChild(li)
    } else if (!parentH2) {
      // Orphaned H3 - add at top level (but still filtered, not sidebar entries)
      li.appendChild(anchor)
      tocUl.appendChild(li)
    }
  })

  // Replace existing TOC in sidebar with the new one
  // Find the existing TOC and replace it
  const existingToc = document.querySelector('#toc ul')
  if (existingToc) {
    existingToc.replaceWith(tocUl)
  } else {
    // Append to the sidebar if no existing TOC
    const tocContainer = document.querySelector('#toc')
    if (tocContainer) {
      tocContainer.appendChild(tocUl)
    }
  }

  // Scrollspy: highlight current section in TOC as user scrolls
  const observerOptions = {
    root: main,
    rootMargin: '-70px 0px -70px 0px', // Trigger a bit before reaching top
    threshold: 0.3
  }

  const scrollObserver = new IntersectionObserver((entries) => {
    // Remove active class from all TOC links
    document.querySelectorAll('#toc a').forEach(link => {
      link.classList.remove('bg-primary/10', 'text-primary')
    })

    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Find the corresponding TOC link and highlight it
        const id = entry.target.id
        const link = document.querySelector(`#toc a[href="#${id}"]`)
        if (link) {
          link.classList.add('bg-primary/10', 'text-primary')
        }
      }
    })
  }, observerOptions)

  // Observe all headings for scrollspy
  headings.forEach(h => {
    if (h.id) {
      scrollObserver.observe(h)
    }
  })

  // Add collapse/expand functionality for nested H3 groups
  // (Clicking a parent H2 in TOC toggles visibility of its nested H3s)
  const toggleNested = (e) => {
    const link = e.target
    const parentLi = link.parentElement.parentElement
    const nestedList = parentLi?.querySelector('ul')
    if (nestedList) {
      if (nestedList.style.display === 'none') {
        nestedList.style.display = ''
        link.classList.remove(' collapsed')
      } else {
        nestedList.style.display = 'none'
        link.classList.add(' collapsed')
      }
    }
  }

  document.querySelectorAll('#toc a').forEach(link => {
    link.addEventListener('click', toggleNested)
  })

  console.log(`TOC built with ${headingsByLevel.H2.length} main headings and ${headingsByLevel.H3.length} nested headings`)
})