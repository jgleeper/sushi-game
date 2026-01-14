# Roll Recall 🍣🍸

A polished, production-ready React webapp for mastering sushi roll & cocktail ingredients using spaced repetition, active recall, and interleaving techniques.

## Dual Deck System

Train on two separate decks with independent progress tracking:
- **🍣 Sushi Rolls**: 15 rolls from the restaurant menu
- **🍸 Cocktails**: 20 cocktails from the bar menu

Each deck maintains its own:
- Progress tracking and mastery scores
- Due dates and spaced repetition schedule
- Separate localStorage persistence

## Features

### Three Training Modes
- **🧠 Recall Mode**: Type ingredients from memory (best retention)
- **🏗️ Build Mode**: Select ingredients from pantry (mobile-friendly)
- **⚡ Lightning Mode**: Rapid-fire discrimination training

### Science-Backed Learning
- **Spaced Repetition**: Automatic scheduling based on performance
- **Active Recall**: Forces memory retrieval for better retention
- **Interleaving**: Mixes similar rolls to prevent confusion
- **Immediate Feedback**: Learn from mistakes right away

### Smart Features
- ✅ LocalStorage persistence (progress auto-saves)
- ✅ All 15 rolls with accurate ingredient lists
- ✅ **Fuzzy matching** - accepts close-enough answers ("daikon" matches "pickled daikon")
- ✅ **Hidden preview by default** - prevents cheating, toggle to study for 10 seconds
- ✅ Mastery tracking (0-100% per roll)
- ✅ Streak counter for motivation
- ✅ Help modal with full instructions
- ✅ Copy missing ingredients to clipboard
- ✅ Reveal answer (only after checking)
- ✅ Mobile-first responsive design
- ✅ Premium glass UI with smooth animations
- ✅ Custom scrollbars for aesthetics
- ✅ Accessibility (focus rings, touch-optimized buttons)

## Tech Stack

- **Vite** - Lightning-fast build tool
- **React 18** - Modern UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Inter Font** - Clean, modern typography

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will open at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage Guide

### First Time Setup
1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open the app in your browser
4. Click "Help" to see detailed instructions

### Training Workflow
1. **Preview** (optional): Click "Show Preview" to study the color-coded ingredients for 10 seconds, then hide it
2. **Recall/Build/Lightning**: Test yourself in your chosen mode without looking at the preview
3. **Check**: See results with correct/missing/extra breakdown
4. **Study**: Review missing ingredients (use "Copy Missing" button)
5. **Continue**: The system automatically schedules your next review

**Note**: The preview is hidden by default to encourage genuine recall. Only reveal it when you need to encode the ingredients initially!

### Tips for Best Results
- Practice 5-10 minutes at a time, 2-3 times per day
- Use different modes to keep practice fresh
- Focus on "Missing" ingredients after each attempt
- Only use "Reveal Answer" after genuinely trying
- Your progress auto-saves, so close anytime

### Fuzzy Matching Explained
The app uses intelligent fuzzy matching to accept answers that are "close enough":

**What gets matched:**
- ✅ "daikon" matches "pickled daikon"
- ✅ "tuna" matches "spicy tuna" or "tuna belly"
- ✅ "asparagus" matches "grilled asparagus – 1 pc"
- ✅ "snow crab" matches "snow crab mix"
- ✅ Partial word matches (3+ characters)

**What doesn't match:**
- ❌ Very short words (< 3 characters) to avoid false positives
- ❌ Completely different ingredients
- ❌ Requires at least 60% word overlap for multi-word answers

This makes practicing more forgiving and realistic—you don't need to remember every modifier perfectly!

## What Was Changed/Added

### Core Integration
✅ Integrated provided App.jsx with all 15 rolls and data intact  
✅ No changes to roll names or ingredient strings  
✅ Spaced repetition algorithm preserved exactly as provided

### Visual Polish
✅ Added Inter font for modern, professional typography  
✅ Enhanced all buttons with hover/focus states and focus rings  
✅ Added smooth transitions throughout (Tailwind + Framer Motion)  
✅ Improved mobile responsiveness (breakpoints, touch-friendly buttons)  
✅ Custom scrollbars for cleaner aesthetic  
✅ Better spacing and padding for mobile screens  
✅ Moved subtitle to separate line on mobile for readability

### New Features
✅ **Dual Deck System**: Switch between Sushi Rolls (15) and Cocktails (20) with independent progress  
✅ **Fuzzy Matching System**: Accepts close-enough answers (e.g., "daikon" matches "pickled daikon")  
✅ **Hidden Preview by Default**: Ingredients are blurred until you click "Show Preview" - prevents cheating!  
✅ **Help Modal**: Comprehensive guide explaining all modes, spaced repetition, and tips  
✅ **Copy Missing Button**: Copies missing ingredients to clipboard for easy study  
✅ **Reveal Answer Toggle**: Shows complete ingredient list (only after checking)  
✅ **Enhanced Accessibility**: Focus rings, better contrast, semantic HTML

### Technical Improvements
✅ Vite React project structure  
✅ Tailwind CSS fully configured (content paths, custom utilities)  
✅ PostCSS with autoprefixer  
✅ Clean project structure with proper .gitignore  
✅ Optimized for both development and production builds

## File Structure

```
sushi gm/
├── index.html              # Entry HTML with Inter font
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind setup
├── postcss.config.js       # PostCSS setup
├── .gitignore             # Git ignore rules
├── README.md              # This file
└── src/
    ├── main.jsx           # React entry point
    ├── App.jsx            # Main app component
    └── index.css          # Tailwind imports + custom styles
```

## Data Integrity

### Sushi Deck
All 15 rolls are included with exact ingredient lists:
1. Negi Toro Hand Rolls (3 pc)
2. Geisha Roll (8 pc)
3. Tulum Roll (8 pc)
4. Duke Roll (8 pc)
5. Shogun Roll (8 pc)
6. Salmon Crunch Roll (8 pc)
7. Spicy Negi Toro (8 pc)
8. Kamilla Roll (8 pc)
9. Casa Brasa Roll (8 pc)
10. La Langosta Tempura Roll (8 pc)
11. Crying Tiger Roll (8 pc)
12. Shrimp Tempura Roll (8 pc)
13. Cucumber Roll (8 pc)
14. Spicy Tuna Roll (8 pc)
15. Zen Roll (6 pc)

### Cocktails Deck
All 20 cocktails are included with exact ingredient lists:
1. Classic Martini
2. Espresso Martini
3. Muchacho Marg
4. Black Manhattan
5. White Cosmo
6. Last Word
7. New Fashioned
8. Smoke Signal
9. Violet Hour
10. Ofrenda
11. Neptunes Vieux
12. Golden Crossroad
13. Winter in Veracruz
14. Spicy Shogun
15. South of the Border
16. Brasa Tropical
17. Mexican Martini
18. N/A Sunset in Sonora
19. N/A Fuego Fresh
20. N/A Pandanito

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

Private training tool - all rights reserved.

---

**Data Sources**: 
- Sushi_Rolls_Ingredients_All_15.docx
- Cocktail_Menu_Master_Document

**Enjoy mastering your sushi rolls & cocktails!** 🍣🍸✨

