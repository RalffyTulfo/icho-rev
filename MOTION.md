# IChO Motion Guidelines

## Motion Philosophy

- Purposeful only: animate only when there is a clear origin, destination, or action confirmation
- Chemistry over time: animate when elements interact, combine, or transform
- Hero delight: animate the hero section to draw attention and create visual interest

## Timing and Curves

```css
:root {
  --duration-micro: 120ms;
  --duration-ui: 250ms;
  --duration-page: 400ms;
  --duration-hero: 20s;
  --ease-out: cubic-bezier(0.25, 0.1, 0.25, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Performance

- GPU-only properties: transform, opacity, filter (blur)
- 60fps performance budget: keep animations smooth and responsive

## Accessibility

- `prefers-reduced-motion` compliance: provide instant/fade fallbacks
- In-app "Reduce motion" toggle: allow users to disable animations

## Implementation

```css
@keyframes hero-drift {
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
}

.hero-section {
  animation: hero-drift var(--duration-hero) ease-in-out infinite;
}
```