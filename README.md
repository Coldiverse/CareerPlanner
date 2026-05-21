# Career Path Explorer

An interactive web application that helps discover personalized career paths based on subject interests. Users rate their interest in different subjects, and the application saves their responses to identify aligned career paths.

## Features

- **Phase 1: Subject Rating** - Rate 8 core subject areas (Physics, Chemistry, Biology, History, Mathematics, Art & Design, Writing & Literature, Technology & Computing)
- **Auto-Save** - All ratings are automatically saved to Firebase Realtime Database
- **Data Persistence** - Ratings persist across browser sessions using localStorage + Firebase
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Beautiful UI** - Built with React and Tailwind CSS for a polished experience

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Database**: Firebase Realtime Database
- **Hosting**: GitHub Pages
- **State Management**: React hooks

## Setup Instructions

### 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a new project" (or use existing project)
3. Name it something like "career-explorer"
4. Proceed through setup (disable Analytics is fine for this use case)
5. Once created, go to Project Settings (gear icon)
6. Copy your web app config credentials

### 2. Set Up Realtime Database

1. In Firebase Console, go to **Realtime Database** (left sidebar)
2. Click **Create Database**
3. Start in **Test mode** (for now, you can restrict later)
4. Choose a region close to you
5. Copy the Database URL (format: `https://your-project.firebaseio.com`)

### 3. Update Firebase Config

1. Open `src/firebaseConfig.js`
2. Replace the placeholder config with your actual Firebase credentials from Project Settings
3. Ensure the `databaseURL` matches your Realtime Database URL

### 4. Install & Run Locally

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Then open `http://localhost:5173` in your browser.

### 5. Set Up GitHub Pages Deployment

1. Push this repository to GitHub
2. Go to **Repository Settings** → **Pages**
3. Set source to "GitHub Actions"
4. The workflow will automatically build and deploy on push to main

Your app will be available at: `https://YOUR_USERNAME.github.io/career/`

## How Data is Stored

```
Firebase Realtime Database Structure:
users/
  {userId}/
    phase1/
      ratings/
        physics: 8
        chemistry: 6
        ...
      timestamp: 1234567890
```

- **userId**: Generated on first visit using UUID, stored in localStorage
- **ratings**: User's 1-10 rating for each subject
- **timestamp**: When ratings were last updated

## Extending to Phase 2

To add Phase 2 (career paths based on Phase 1 ratings):

1. Create `src/components/PhaseTwo.jsx`
2. Load Phase 1 ratings and create career suggestions weighted by ratings
3. Add similar rating flow for careers
4. Update `PhaseOne.jsx` to add a "Next Phase" button
5. Store Phase 2 data in `users/{userId}/phase2/ratings`

## Security Notes

- Currently using Firebase Test Mode (anyone can read/write)
- For production, implement Firebase Security Rules:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": true,
        ".write": true
      }
    }
  }
}
```

- Consider adding authentication (Google, Anonymous, etc.) for production

## Development

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires localStorage support
- Requires Firebase real-time database connectivity

## Troubleshooting

**Ratings not saving?**
- Check browser console for errors
- Verify Firebase credentials are correct
- Ensure internet connection to Firebase is working

**Page not loading from GitHub Pages?**
- Verify repository name is correct in vite.config.js (base: '/career/')
- Clear browser cache
- Check GitHub Actions workflow status in repo settings

**Can't connect to Firebase?**
- Check firebaseConfig.js has correct projectId and databaseURL
- Verify Firebase Realtime Database is created in your project
- Check Network tab in browser DevTools

## Future Enhancements

- [ ] Phase 2: Career path recommendations
- [ ] Phase 3: Job listings filtered by interest
- [ ] User authentication (Google Sign-In)
- [ ] Data visualization and charts
- [ ] Career path details (salary, education required, job outlook)
- [ ] Share results with friends
- [ ] Dark mode toggle

## License

MIT
