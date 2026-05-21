# Career Path Explorer - Complete Setup Guide

## Overview

This project consists of:
1. **Frontend App** - React app deployed to GitHub Pages
2. **Database** - Firebase Realtime Database for storing ratings
3. **Architecture** - Each user gets a unique ID (stored in localStorage), ratings auto-save to Firebase

## Step-by-Step Setup

### Phase 1: Firebase Setup (5-10 minutes)

#### 1.1 Create Firebase Project
1. Visit [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"**
3. Name it (e.g., "career-explorer")
4. Accept the default settings and click **Create project**
5. Wait for project creation to complete

#### 1.2 Set Up Realtime Database
1. In your Firebase project, click **Realtime Database** (left sidebar)
2. Click **Create Database**
3. **Choose location** - Select the region closest to you
4. **Configure rules** - Start in **Test mode** (you'll see a security warning, but it's fine for now)
5. Click **Enable**
6. **Copy your Database URL** - It will look like: `https://YOUR-PROJECT.firebaseio.com`

#### 1.3 Get Your Firebase Credentials
1. Click the **⚙️ gear icon** (Settings) at the top-left
2. Go to **Project Settings**
3. Scroll down to **Your apps** section
4. Click **</> ** (Web app icon) if you haven't created one
5. **Copy all 7 values**:
   - `apiKey`
   - `authDomain`
   - `projectId`
   - `databaseURL` (use the one from 1.2)
   - `storageBucket`
   - `messagingSenderId`
   - `appId`

### Phase 2: Update Your Project (2 minutes)

1. Open `src/firebaseConfig.js` in the project
2. Replace the `firebaseConfig` object with your actual credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  databaseURL: "https://your-project.firebaseio.com",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

3. **Save the file** - The app will now connect to YOUR database

### Phase 3: Test Locally (2 minutes)

```bash
# Terminal at D:\ClaudeCode\career

# Start development server
npm run dev
```

Then open your browser to the URL shown (usually `http://localhost:5173`)

**Test it:**
1. Rate each subject 1-10
2. Check your browser's Developer Tools → Console (should see no errors)
3. Refresh the page - your ratings should still be there!
4. Open [Firebase Console](https://console.firebase.com) → Realtime Database → look for your ratings saved there

### Phase 4: Deploy to GitHub Pages (5-10 minutes)

#### 4.1 Push to GitHub
```bash
# Initialize git if not done
git init
git add .
git commit -m "Initial commit: Career Path Explorer Phase 1"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/career.git
git push -u origin main
```

#### 4.2 Enable GitHub Pages
1. Go to your GitHub repo: `https://github.com/YOUR_USERNAME/career`
2. Go to **Settings** → **Pages**
3. Under **Source**, select **Deploy from a branch**
4. Select **main** branch, root folder
5. Wait ~2-5 minutes for the action to complete
6. Your app is now live at: `https://YOUR_USERNAME.github.io/career/`

## Verify It Works

1. **Test auto-save**: Rate a subject, wait 1 second, you should see "Saving..." then "✓ Saved"
2. **Check Firebase**: Go to Firebase Console → Realtime Database, you should see data appearing
3. **Persist across browser close**: Rate subjects, close the browser tab, reopen the app - ratings should be there
4. **Persist across devices**: Open `https://YOUR_USERNAME.github.io/career/` on your phone - it will be a fresh user with fresh ratings (this is correct for different devices)

## Data Structure in Firebase

Once you start rating, your Firebase Realtime Database will look like:

```
users/
  "a1b2c3d4-e5f6-47g8-h9i0-j1k2l3m4n5o6"/
    phase1/
      ratings/
        "art_design": 8
        "biology": 5
        "chemistry": 4
        "history": 6
        "mathematics": 7
        "physics": 3
        "technology_computing": 9
        "writing_literature": 6
      timestamp: 1624567890123
```

The long string is your unique user ID (stored in localStorage).

## Next Steps: Phase 2

When you're ready to add Phase 2 (career path recommendations):

1. Create `src/components/PhaseTwo.jsx`
2. Load the Phase 1 ratings from Firebase
3. Create a list of career paths weighted by ratings
4. Similar UI with auto-save to `phase2/ratings`

Example careers weighted by subjects:
- **High Math + Physics + Tech** → Software Engineer, Data Scientist, Physicist
- **High Art + Design + Math** → UI/UX Designer, Graphic Designer, Game Designer
- **High Biology + Chemistry + Math** → Doctor, Pharmacist, Researcher
- **High History + Writing + Art** → Journalist, Historian, Content Creator

## Troubleshooting

### "Can't connect to Firebase"
- Check firebaseConfig.js has the correct `projectId`
- Check internet connection
- Check browser console for error messages

### "Ratings not saving"
- Look at browser console for red errors
- Verify Firebase config is correct
- Make sure Realtime Database is created and not locked down

### "Deployed to GitHub Pages but blank page"
- Check GitHub Actions workflow ran successfully
- Verify repo is set to "Deploy from a branch" in Settings → Pages
- Wait 5+ minutes after push
- Check your repo name matches the vite.config.js `base` path

### "Page loads but ratings don't display"
- Clear browser cache and localStorage
- In DevTools → Application → Local Storage → delete careerUserId
- Refresh page

## Firebase Security Rules (Optional)

For now, the database is in "Test mode" which allows anyone to read/write. For production, you should restrict this. Later, you can update Firebase Realtime Database Rules to:

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

This still allows anyone to write, but at least restricts to the users path.

## Questions?

Check README.md for more details or reach out with specific errors from the browser console.
