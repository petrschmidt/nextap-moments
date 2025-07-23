# NEXTAP Moments

**Author**: Petr Schmidt

A React-based moments viewing application with vertical scrolling, infinite feed, and optimized media playback.

## Tech Stack

- React 19 + TypeScript
- Styled Components
- React Router
- TanStack Query
- Phosphor Icons
- Vite + Vitest

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Lint code
npm run lint
```

## Architecture

### Core Components

- `Moment.tsx` - Main moment component with auto-play and viewport detection
- `MomentToolbar.tsx` - Social actions and playback controls
- `MomentProgress.tsx` - Asynchronous visual progress indicator
- `MomentDescription.tsx` - Location and content description

### Media Handling

- `MomentImageSourceSet.tsx` - Responsive image with multiple variants
- `MomentVideoSourceSet.tsx` - Video optimization with format selection
- Blurhash integration for smooth loading transitions

### Performance

- Custom virtualization hook (`useVirtualItems.ts`) with buffer-based rendering (±1 item around viewport)
- Infinite query with pagination

### API Integration

- Steller API integration (`api.steller.co/v1`)
- Infinite query hooks for user moments

## Project Structure

```
src/
├── components/
│   └── Moment/           # Moment components
├── hooks/
│   ├── api/             # API query hooks
│   └── useVirtualItems.ts
├── pages/
│   └── Home/            # Main feed page
├── providers/           # Context providers
├── types/              # TypeScript definitions
└── utils/              # Utilities and API config
```

