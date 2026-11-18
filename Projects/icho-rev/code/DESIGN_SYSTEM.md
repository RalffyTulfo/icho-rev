# IChO Design System

## Color Tokens

### Light Mode

```css
:root {
  --color-background: #f8f7f9;
  --color-foreground: #1a1a2e;
  --color-primary: #6a5acd;
  --color-secondary: #9370db;
  --color-accent: #ff6b6b;
  --color-success: #51cf66;
  --color-warning: #ffd166;
  --color-error: #ff6b6b;
  --color-physical: #87ceeb;
  --color-organic: #ffb6c1;
  --color-inorganic: #fffacd;
  --color-analytical: #98fb98;
  --color-biochemistry: #e6e6fa;
  --color-practical: #ffa07a;
}
```

### Dark Mode

```css
:root[data-theme="dark"] {
  --color-background: #1a1a2e;
  --color-foreground: #f8f7f9;
  --color-primary: #9370db;
  --color-secondary: #6a5acd;
  --color-accent: #ff8a8a;
  --color-success: #76d7c4;
  --color-warning: #ffd700;
  --color-error: #ff8a8a;
  --color-physical: #4682b4;
  --color-organic: #db7093;
  --color-inorganic: #f5f5dc;
  --color-analytical: #66cdaa;
  --color-biochemistry: #b0c4de;
  --color-practical: #ff7f50;
}
```

## Typography

```css
:root {
  --font-display: "Plus Jakarta Sans", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;
  --font-size-display: clamp(2.5rem, 5vw, 4rem);
  --font-size-heading: clamp(1.5rem, 3vw, 2rem);
  --font-size-subheading: clamp(1.25rem, 2.5vw, 1.5rem);
  --font-size-body: 1rem;
  --font-size-small: 0.875rem;
  --line-height-display: 1.1;
  --line-height-heading: 1.2;
  --line-height-subheading: 1.3;
  --line-height-body: 1.5;
  --line-height-small: 1.4;
}
```

## Frosted Glass

```css
.frosted-glass {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
}

.frosted-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%);
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}
```

## Spacing Grid

```css
:root {
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 16px;
  --spacing-4: 24px;
  --spacing-5: 32px;
  --spacing-6: 40px;
  --spacing-7: 48px;
  --spacing-8: 56px;
  --spacing-9: 64px;
}
```