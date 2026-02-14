# Test Plan: Visual Regression & Edge Cases

## Components to Verify
- `Hero.tsx`
- `Services.tsx`
- `GalleryPreview.tsx`

## Test Cases

### 1. Responsiveness (Mobile -> Desktop)
- [x] **Mobile (375px)**:
    - [x] Hero text should not overflow.
    - [x] "Timeless Interiors" headline should be legible.
    - [x] Services cards should stack vertically.
    - [x] Gallery Preview cards should stack vertically.
- [x] **Tablet (768px)**:
    - [x] Hero layout should shift from vertical to grid.
    - [x] Services "Capabilities" column should NOT be sticky yet (or check behavior).
- [x] **Desktop (1440px)**:
    - [x] Hero image and text side-by-side.
    - [x] Services "Capabilities" column MUST be sticky.
    - [x] Gallery Preview should be a 3-column grid.

### 2. Content & Typography
- [ ] **Hero**:
    - [ ] Verify "Timeless Interiors, Elevated." line breaks.
    - [ ] Verify subtext "At J & M Painting..." visibility against background.
- [ ] **Services**:
    - [ ] Verify "artisans of refined living" text doesn't look too small after "zoom out".
    - [ ] Verify icon alignment with text.
- [ ] **GalleryPreview**:
    - [ ] Verify "The Collection." headline.

### 3. Images & Fallbacks
- [ ] Verify all Unsplash images load.
- [ ] Check for layout shift during loading (priority tags).

### 4. Interactions
- [ ] Hover effects on Hero Call-to-Action.
- [ ] Hover effects on Service cards (scale up).
- [ ] Hover effects on Gallery Preview cards (text reveal).
