# Career Path Explorer - Quick Start (5 minutes)

## What's Built ✅

**Phase 1 is complete and ready to deploy:**
- React app with 8 subject rating cards
- Auto-saves ratings to Firebase (every 500ms with visual feedback)
- Responsive design (works on phone, tablet, desktop)
- GitHub Pages ready (automatic deploy on push)
- Data persists across browser sessions per user

## Your Immediate To-Do (In Order)

### Step 1: Create Firebase Project (3 minutes)
1. Go to https://console.firebase.google.com/
2. Click "Create a project" → name it anything (e.g., "career-explorer") → Create
3. Wait for it to finish
4. Click "Realtime Database" on the left
5. Click "Create Database" → Choose location near you → Click "Enable"
6. **Copy the Database URL** (looks like: `https://xxxx.firebaseio.com`)

### Step 2: Get Firebase Credentials (2 minutes)
1. Click the ⚙️ gear icon (top left) → "Project Settings"
2. Scroll down to "Your apps" section
3. Click the **</> ** (web app) icon
4. Copy the 7 values from the config object
5. Open this file: `src/firebaseConfig.js`
6. Paste the 7 values into the `firebaseConfig` object
7. Save the file

### Step 3: Test Locally (1 minute)
```bash
npm run dev
```
- Open http://localhost:5173 in your browser
- Rate each subject 1-10
- Refresh the page - **ratings should persist!**
- Check Firebase Console → Realtime Database to see data being saved

### Step 4: Deploy to GitHub Pages (1 minute setup)
```bash
# Push to GitHub
git remote add origin https://github.com/YOUR_USERNAME/career.git
git push -u origin main
```

Then:
1. Go to https://github.com/YOUR_USERNAME/career
2. Click **Settings** → **Pages**
3. Under "Source", select **"Deploy from a branch"**
4. Select **main** branch, root folder
5. Wait 2-5 minutes... ✨ Done!
6. Your app is live at: **https://YOUR_USERNAME.github.io/career/**

## Verify It Works

- ✅ Ratings save with "✓ Saved" indicator
- ✅ Data persists after page refresh
- ✅ Data appears in Firebase Console
- ✅ Responsive on mobile/tablet
- ✅ Deployed and live on GitHub Pages

## What's Next?

**Phase 2 (whenever you're ready):**
Add career path recommendations weighted by Phase 1 ratings. You'll have all the ratings data ready to go in Firebase, just need to:
1. Create career suggestions list
2. Weight them by Phase 1 ratings
3. Build Phase 2 UI (copy Phase 1 pattern)
4. Save Phase 2 ratings to Firebase

See CLAUDE.md for Phase 2 structure planning.

## Project Structure

```
career/
├── src/
│   ├── main.jsx           (React entry point)
│   ├── App.jsx            (Main wrapper, Firebase setup)
│   ├── firebaseConfig.js  (← YOU UPDATE THIS)
│   ├── components/
│   │   ├── PhaseOne.jsx   (Subject rating UI)
│   │   └── SubjectCard.jsx (Rating card component)
│   └── index.css
├── index.html
├── vite.config.js
├── package.json
└── .github/workflows/deploy.yml (Auto-deploy on push)
```

## If Something Breaks

**"Can't connect to Firebase"**
- Double-check `src/firebaseConfig.js` has the correct projectId and databaseURL
- Check internet connection
- Look at browser console for error messages

**"Ratings not saving"**
- Check browser console for red error messages
- Verify Firebase config is correct
- Make sure you created the Realtime Database (not Firestore)

**"Build fails"**
- Run `npm install` to ensure all packages are installed
- Check that you have Node 16+ (`node --version`)

**"Not appearing on GitHub Pages"**
- Check GitHub Actions workflow ran (go to repo → Actions tab)
- Wait 5+ minutes after pushing
- Check repo Settings → Pages is set to deploy from main branch
- Clear browser cache

## Key Files to Know

- **SETUP_GUIDE.md** - Detailed step-by-step setup with screenshots
- **CLAUDE.md** - Technical architecture and planning for Phase 2
- **README.md** - Full documentation
- **src/firebaseConfig.js** - **Update with your Firebase config**

## Firebase Data Example

Once you start rating, your database will look like:

```
users/
  abc123xyz.../
    phase1/
      ratings/
        physics: 7
        chemistry: 5
        biology: 6
        history: 4
        mathematics: 8
        art_design: 9
        writing_literature: 5
        technology_computing: 9
      timestamp: 1624567890000
```

Each user gets a unique ID (stored in their browser's localStorage).

---

**Ready?** Start with Step 1. The whole setup takes 5 minutes if you follow these steps in order. 🚀

Questions? Check SETUP_GUIDE.md for more detail.
