# Career Path Explorer - Project Context

## Project Purpose
Interactive career discovery tool for girlfriend. Users rate their interest in subject areas, and the app persists these ratings to generate weighted career path recommendations in later phases.

## Architecture Overview

```
Phase 1 (Complete):
├─ 8 subject cards (Physics, Chemistry, Biology, History, Math, Art, Writing, Tech)
├─ 1-10 rating per subject with dual UI (slider + star)
├─ Auto-save to Firebase Realtime Database every 500ms
├─ localStorage tracks userId (UUID)
└─ Beautiful responsive UI with Tailwind CSS

Phase 2 (Planned):
├─ Load Phase 1 ratings
├─ Generate career paths weighted by interest
├─ Rate careers, same auto-save pattern
└─ Build on same Firebase data structure

Phase 3+ (Future):
└─ Job listings, details, salary info, education requirements
```

## Tech Stack
- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **State**: React hooks (useState, useEffect)
- **Database**: Firebase Realtime Database (free tier)
- **Build**: Vite (fast bundler)
- **Hosting**: GitHub Pages (free, static)
- **IDs**: UUID (unique user per browser)

## Key Files

### Core App
- `src/main.jsx` - React entry point
- `src/App.jsx` - Main app wrapper, handles user ID + Firebase loading
- `src/firebaseConfig.js` - **NEEDS USER CONFIG** - Firebase credentials

### Components
- `src/components/PhaseOne.jsx` - Phase 1 subject rating UI, auto-save trigger
- `src/components/SubjectCard.jsx` - Individual subject card with slider + stars

### Config
- `vite.config.js` - Build config (base: '/career/' for GitHub Pages)
- `tailwind.config.js` - Tailwind setup
- `package.json` - Dependencies + scripts
- `.github/workflows/deploy.yml` - Auto-deploy on push to main

## Setup Instructions for User

**Important**: User must follow SETUP_GUIDE.md:
1. Create Firebase project + Realtime Database
2. Get Firebase config from Project Settings
3. Paste config into `src/firebaseConfig.js`
4. Test locally with `npm run dev`
5. Push to GitHub, enable Pages in repo settings

## Firebase Data Model

```
users/
  {userId}/
    phase1/
      ratings/
        {subjectId}: {number 1-10}
      timestamp: {milliseconds}
    phase2/ (future)
      ratings/
        {careerId}: {number 1-10}
      timestamp: {milliseconds}
```

**Current subjects** (in PhaseOne.jsx):
- physics, chemistry, biology, history, mathematics, art_design, writing_literature, technology_computing

## Critical Implementation Details

### Auto-Save Pattern
- 500ms debounce on rating changes
- Triggers Firebase `set()` operation
- Shows "Saving..." then "✓ Saved" visual feedback
- **Important**: Uses `ref(db, 'users/' + userId + '/phase1/ratings')`

### User Persistence
- Generate UUID on first visit → store in localStorage as 'careerUserId'
- Subsequent visits: load same UUID, fetch existing ratings from Firebase
- Each browser/device gets own UUID (fresh experience on new device = correct behavior)

### Responsive Design
- Grid: 1 col mobile, 2 col md+ (see PhaseOne grid-cols-1 md:grid-cols-2)
- SubjectCard: slider + dual rating UI (numerical + visual bars + stars)
- Summary: 2 col grid on mobile, 4 col on larger screens

## Phase 2 Planning (When Ready)

Structure will mirror Phase 1:
1. Create `src/components/PhaseTwo.jsx`
2. Load Phase1 ratings at start
3. Generate career array based on weights
4. Show 6-12 careers with descriptions
5. Same SubjectCard pattern but for careers
6. Auto-save to `users/{userId}/phase2/ratings`

**Career weighting example**:
```javascript
const careerScore = (
  ratings.physics * 0.3 +
  ratings.mathematics * 0.3 +
  ratings.technology_computing * 0.4
) // "Software Engineer" score
```

## Deployment Checklist

- [x] Firebase config (placeholder, user fills in real one)
- [x] Local dev works (`npm run dev`)
- [x] Production build works (`npm run build`)
- [x] GitHub Actions workflow configured
- [x] Vite config has correct base path
- [x] README with setup instructions
- [x] SETUP_GUIDE with step-by-step Firebase setup

**User action**: Push to GitHub → enable Pages in Settings → done

## Known Limitations / Design Decisions

1. **Test Mode Firebase**: Anyone can read/write. OK for sharing with girlfriend, revisit for production.
2. **No authentication**: Using device-based UUID instead. Simple, works for single user per device.
3. **Placeholder Firebase config**: Intentional—user must fill with real credentials for security.
4. **8 subjects in Phase 1**: Chosen as good balance (not overwhelming, broad coverage).
5. **No Phase 2 yet**: Built structure to make Phase 2 straightforward.

## Common Future Edits

**Add a new subject to Phase 1**:
1. Add to SUBJECTS array in PhaseOne.jsx
2. Update Firebase structure (auto-handled)
3. Update Phase 2 weighting logic when written

**Customize subject descriptions**:
1. Edit SUBJECTS array in PhaseOne.jsx

**Change auto-save debounce**:
1. Edit the setTimeout in PhaseOne.jsx useEffect (currently 500ms)

**Adjust star/slider UI**:
1. Edit SubjectCard.jsx (slider: range input, stars: button click handlers)

## Performance Notes

- Build size: ~371KB (JS) + 12KB (CSS), gzips to ~98KB + 3KB
- Firebase latency: ~100-500ms depending on connection
- No images/heavy assets
- Tailwind purges unused CSS

## Testing Instructions

1. **Local**: `npm run dev` → test ratings → refresh → verify persistence
2. **Firebase**: Open Firebase Console → Realtime Database → watch data appear
3. **Build**: `npm run build` → `npm run preview` → verify dist/
4. **Deploy**: After GitHub Pages setup, test at `https://YOUR_USERNAME.github.io/career/`

## Dependencies

```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "firebase": "^10.7.2",
  "uuid": "^9.0.1"
}
```

Firebase includes: Realtime Database, Auth (not used yet), other services.

---

**Last updated**: 2026-05-20
**Status**: Phase 1 complete and tested. Ready for user Firebase setup and deployment.
