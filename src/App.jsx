import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ROLL RECALL
 * - Active recall + spaced repetition + interleaving
 * - Data source: Sushi_Rolls_Ingredients_All_15.docx
 */

const STORAGE_KEY_BASE = "roll_recall_v1_progress";
const storageKeyForDeck = (deckId) => `${STORAGE_KEY_BASE}:${deckId}`;

/** ---------- DATA (from the uploaded doc) ---------- **/
const ROLLS = [
  {
    id: "negi-toro-hand-rolls",
    name: "Negi Toro Hand Rolls (3 pc)",
    ingredients: [
      "1.5 oz chopped blue fin tuna belly",
      "scallion",
      "pickled daikon",
      "shiso",
      "seaweed",
      "misoyaki butter",
    ],
  },
  {
    id: "geisha-roll",
    name: "Geisha Roll (8 pc)",
    ingredients: [
      "1 oz salmon",
      "cucumber",
      "scallions",
      "chili mayo",
      "avocado shiso",
      "spicy tuna",
      "jalapeno masago (fish roe)",
      "sushi rice",
      "sesame seeds",
      "seaweed",
      "arare",
      "sweet soy",
    ],
  },
  {
    id: "tulum-roll",
    name: "Tulum Roll (8 pc)",
    ingredients: [
      "1.2 oz snow crab mix",
      "grilled pineapple",
      "avocado",
      "cucumber",
      "1.2 oz salmon",
      "chili mayo",
      "scallions",
      "sesame seed",
      "macadamia",
      "scallion curls",
      "seaweed",
      "sushi rice",
      "sweet soy",
    ],
  },
  {
    id: "duke-roll",
    name: "Duke Roll (8 pc)",
    ingredients: [
      "1 oz tuna",
      "1 oz salmon",
      "1 oz yellowtail",
      "avocado",
      "daikon",
      "sesame ponzu",
      "sesame seeds",
    ],
  },
  {
    id: "shogun-roll",
    name: "Shogun Roll (8 pc)",
    ingredients: [
      "2.2 oz snow crab – 8 pc",
      "tempura batter",
      "red tobiko",
      "avocado",
      "scallions",
      "spicy mayo",
      "soy paper",
      "sushi rice",
      "truffle oil",
      "yuzu habanero",
    ],
  },
  {
    id: "salmon-crunch-roll",
    name: "Salmon Crunch Roll (8 pc)",
    ingredients: [
      "3 oz snow crab mix",
      "1 oz salmon",
      "tempura crunch",
      "avocado",
      "grilled asparagus – 1 pc",
      "thin lemon slices",
      "truffle oil",
      "lemon oil",
      "soy paper",
    ],
  },
  {
    id: "spicy-negi-toro",
    name: "Spicy Negi Toro (8 pc)",
    ingredients: [
      "1.5 oz negi toro",
      "avocado",
      "cucumber",
      "chili mayo",
      "scallions",
      "sesame seeds",
      "arare",
      "seaweed",
      "sushi rice",
    ],
  },
  {
    id: "kamilla-roll",
    name: "Kamilla Roll (8 pc)",
    ingredients: [
      "1.5 oz yellowtail",
      "kewpie mayo",
      "avocado",
      "cucumber",
      "1.5 oz tuna",
      "jicama (3pc 1.5in x 2.5in)",
      "red onion",
      "jalapeno",
      "jalapeno sauce",
      "sesame seeds",
      "seaweed",
      "sushi rice",
    ],
  },
  {
    id: "casa-brasa-roll",
    name: "Casa Brasa Roll (8 pc)",
    ingredients: [
      "1.5 oz snow crab",
      "grilled jalapeno",
      "grilled asparagus – 1 pc",
      "smoked daikon",
      "chili mayo",
      "1.8 oz wagyu (+5)",
      "crispy leeks",
      "sweet soy",
      "miso pina",
      "sesame seeds",
      "seaweed",
      "sushi rice",
    ],
  },
  {
    id: "la-langosta-tempura",
    name: "La Langosta Tempura Roll (8 pc)",
    ingredients: [
      "3 oz lobster",
      "tempura batter",
      "scallions",
      "chili mayo",
      "red tobiko",
      "avocado",
      "potato crisp",
      "truffle oil",
      "maldon salt",
      "chives",
      "black truffle sauce",
      "smoked paprika",
      "chili garlic butter",
      "sesame seeds",
      "seaweed",
      "sushi rice",
    ],
  },
  {
    id: "crying-tiger-roll",
    name: "Crying Tiger Roll (8 pc)",
    ingredients: [
      "1.5 oz tuna",
      "crispy shallots",
      "avocado",
      "cashew",
      "mango",
      "sesame seeds",
      "Thai chili (julienne)",
      "seaweed",
      "sushi rice",
      "Thai chili nuoc cham",
    ],
  },
  {
    id: "shrimp-tempura-roll",
    name: "Shrimp Tempura Roll (8 pc)",
    ingredients: [
      "2 pc nobashi shrimp",
      "tempura batter",
      "grilled asparagus – 1 pc",
      "scallions",
      "chili mayo",
      "sweet soy",
      "roasted jalapeno sauce",
      "sesame seeds",
      "seaweed",
      "sushi rice",
    ],
  },
  {
    id: "cucumber-roll",
    name: "Cucumber Roll (8 pc)",
    ingredients: ["2 oz cucumber", "seaweed", "sesame seeds", "sushi rice"],
  },
  {
    id: "spicy-tuna-roll",
    name: "Spicy Tuna Roll (8 pc)",
    ingredients: [
      "2 oz spicy tuna",
      "scallions",
      "avocado",
      "sesame seeds",
      "arare",
      "seaweed",
      "sushi rice",
    ],
  },
  {
    id: "zen-roll",
    name: "Zen Roll (6 pc)",
    ingredients: [
      "Grilled veggies",
      "Shiso leaf",
      "shiso seasoning",
      "sesame seeds",
      "pickled daikon",
      "avocado",
      "white miso sauce",
      "sushi rice",
      "daikon",
      "seaweed",
    ],
  },
];

const COCKTAILS = [
  {
    id: "classic-martini",
    name: "Classic Martini",
    ingredients: ["Ketel or Condesa", "LoFi Dry Vermouth", "Angostura bitters"],
  },
  {
    id: "espresso-martini",
    name: "Espresso Martini",
    ingredients: ["Titos", "Espresso", "Mr Black", "Licor 43"],
  },
  {
    id: "muchacho-marg",
    name: "Muchacho Marg",
    ingredients: ["Casa Lujo", "Ferrand Dry Curaçao", "Lime juice", "Agave"],
  },
  {
    id: "black-manhattan",
    name: "Black Manhattan",
    ingredients: ["Old Overholt 100 proof Rye", "Averna", "Angostura bitter"],
  },
  {
    id: "white-cosmo",
    name: "White Cosmo",
    ingredients: ["Grey goose", "St germain", "White cranberry juice", "Lime juice"],
  },
  {
    id: "last-word",
    name: "Last Word",
    ingredients: ["Roku", "Green Chartreuse", "Luxardo Maraschino", "lime juice"],
  },
  {
    id: "new-fashioned",
    name: "New Fashioned",
    ingredients: [
      "High West bourbon",
      "Diplomatico Reserve rum",
      "angostura bitters",
      "orange bitters",
      "Demerara",
    ],
  },
  {
    id: "smoke-signal",
    name: "Smoke Signal",
    ingredients: [
      "High West Rendezvous rye",
      "High West bourbon",
      "Demerara syrup",
      "Saline",
      "House bitters",
    ],
  },
  {
    id: "violet-hour",
    name: "Violet Hour",
    ingredients: ["Empress Gin", "Lillet Rouge", "St Germain", "Rose Champagne"],
  },
  {
    id: "ofrenda",
    name: "Ofrenda",
    ingredients: ["Bacardi", "Leblon", "Giffard coconut", "lime juice", "agave", "Fee foam"],
  },
  {
    id: "neptunes-vieux",
    name: "Neptunes Vieux",
    ingredients: [
      "Old Forester Rye",
      "E&J Brandy",
      "Punt E Mes",
      "Amaro Nonino",
      "peychauds bitters",
    ],
  },
  {
    id: "golden-crossroad",
    name: "Golden Crossroad",
    ingredients: ["El Tesoro Blanco", "LoFi dry vermouth", "Luxardo maraschino", "Tio Pepe Fino Sherry", "Suze"],
  },
  {
    id: "winter-in-veracruz",
    name: "Winter in Veracruz",
    ingredients: ["Naranja Orange Liqueur", "Allspice Dram", "Lemon juice", "Sparkling wine"],
  },
  {
    id: "spicy-shogun",
    name: "Spicy Shogun",
    ingredients: ["Tanteo Jalapeno", "Cucumber jalapeño simple", "Ferrand Yuzu", "Lime juice"],
  },
  {
    id: "south-of-the-border",
    name: "South of the Border",
    ingredients: ["Jalapeño infused ilegal mezcal", "pineapple juice", "dry curaçao", "lime juice", "Agave"],
  },
  {
    id: "brasa-tropical",
    name: "Brasa Tropical",
    ingredients: ["Malibu", "Guava", "pineapple juice", "lime", "simple", "Amaretto"],
  },
  {
    id: "mexican-martini",
    name: "Mexican Martini",
    ingredients: ["Qui", "Ferrand Dry Curaçao", "Castelvetrano olive juice", "lime juice", "agave"],
  },
  {
    id: "na-sunset-in-sonora",
    name: "N/A Sunset in Sonora",
    ingredients: ["Seedlip Grove", "Blood orange juice", "Yuzu", "agave", "Club soda"],
  },
  {
    id: "na-fuego-fresh",
    name: "N/A Fuego Fresh",
    ingredients: ["Seedlip Garden", "Cucumber Jalapeño simple", "lime", "Club Soda"],
  },
  {
    id: "na-pandanito",
    name: "N/A Pandanito",
    ingredients: ["hibiscus pandan syrup", "yuzu juice", "fee foam"],
  },
];

/** ---------- VISUAL CATEGORY TAGGING (for memory cues) ---------- **/
const CATEGORY_RULES = [
  { cat: "Protein", test: /(tuna|salmon|yellowtail|snow crab|lobster|shrimp|wagyu|negi toro|blue fin)/i },
  { cat: "Veg/Fruit", test: /(avocado|cucumber|scallion|scallions|jalapeno|onion|daikon|shiso|asparagus|lemon|mango|pineapple|jicama|chives|veggies)/i },
  { cat: "Sauce/Seasoning", test: /(mayo|ponzu|soy|miso|nuoc cham|sauce|butter|oil|paprika|habanero)/i },
  { cat: "Crunch/Texture", test: /(tempura|crunch|arare|crispy|tobiko|masago|potato crisp|maldon|cashew|macadamia)/i },
  { cat: "Wrapper/Base", test: /(seaweed|soy paper|sushi rice)/i },
];

const CAT_STYLES = {
  "Protein": "bg-white/10 border-white/15 text-white",
  "Veg/Fruit": "bg-white/10 border-white/15 text-white",
  "Sauce/Seasoning": "bg-white/10 border-white/15 text-white",
  "Crunch/Texture": "bg-white/10 border-white/15 text-white",
  "Wrapper/Base": "bg-white/10 border-white/15 text-white",
  "Other": "bg-white/10 border-white/15 text-white",
};

function categorize(ingredient) {
  for (const r of CATEGORY_RULES) if (r.test.test(ingredient)) return r.cat;
  return "Other";
}

/** ---------- SPACED REPETITION (simple SM-2-ish) ---------- **/
function defaultProgress(cards) {
  const now = Date.now();
  const p = {};
  for (const card of cards) {
    p[card.id] = {
      ease: 2.3,
      intervalDays: 0,
      reps: 0,
      dueAt: now, // due immediately first time
      lastScore: null,
      mastery: 0, // 0..100
    };
  }
  return p;
}

function loadProgress(key, cards) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultProgress(cards);
    const parsed = JSON.parse(raw);
    // backfill new cards if needed
    const base = defaultProgress(cards);
    return { ...base, ...parsed };
  } catch {
    return defaultProgress(cards);
  }
}

function saveProgress(key, p) {
  localStorage.setItem(key, JSON.stringify(p));
}

// score: 0..1 (fraction correct)
function scheduleNext(prev, score) {
  // Convert score into a 0..5 "quality"
  // 0–2 = fail, 3 = pass, 4–5 = strong pass
  const quality =
    score >= 0.95 ? 5 :
    score >= 0.85 ? 4 :
    score >= 0.70 ? 3 :
    score >= 0.45 ? 2 :
    score >= 0.25 ? 1 : 0;

  let { ease, intervalDays, reps, mastery } = prev;

  // update ease
  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const now = Date.now();

  if (quality < 3) {
    // fail => bring back soon (minutes)
    reps = 0;
    intervalDays = 0;
    const minutes = quality === 2 ? 10 : quality === 1 ? 5 : 2;
    mastery = Math.max(0, mastery - 8);
    return { ease, intervalDays, reps, dueAt: now + minutes * 60 * 1000, lastScore: score, mastery };
  }

  // pass => expand interval
  reps += 1;
  if (reps === 1) intervalDays = 1;
  else if (reps === 2) intervalDays = 3;
  else intervalDays = Math.round(intervalDays * ease);

  mastery = Math.min(100, mastery + (quality === 5 ? 10 : quality === 4 ? 7 : 4));

  // add tiny jitter so not everything clumps
  const jitterHours = Math.floor(Math.random() * 6); // 0..5h
  const dueAt = now + (intervalDays * 24 + jitterHours) * 60 * 60 * 1000;

  return { ease, intervalDays, reps, dueAt, lastScore: score, mastery };
}

/** ---------- UTIL ---------- **/
function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

/**
 * Fuzzy matching: returns true if two ingredients are "close enough"
 * Accepts partial matches like "daikon" matching "pickled daikon"
 */
function fuzzyMatch(userAnswer, correctAnswer) {
  const user = normalize(userAnswer);
  const correct = normalize(correctAnswer);
  
  // Exact match
  if (user === correct) return true;
  
  // Empty strings don't match
  if (!user || !correct) return false;
  
  // Split into words for analysis
  const userWords = user.split(' ').filter(w => w.length > 0);
  const correctWords = correct.split(' ').filter(w => w.length > 0);
  
  // Single word cases
  if (userWords.length === 1 && correctWords.length === 1) {
    // For single words, require exact match or very close substring
    // This prevents "tuna" from matching "tuna belly" too loosely
    return user === correct;
  }
  
  // Multi-word matching: check if one contains the other
  // "daikon" should match "pickled daikon"
  // "tuna" should match "spicy tuna" or "tuna belly"
  if (userWords.length === 1) {
    // User typed single word - check if it's in the correct answer
    const userWord = userWords[0];
    // Match if the user's word is one of the main words in correct answer
    // Minimum 3 characters to avoid matching "oz" with everything
    if (userWord.length >= 3 && correctWords.some(w => w === userWord || w.includes(userWord))) {
      return true;
    }
  }
  
  if (correctWords.length === 1) {
    // Correct answer is single word, user typed multiple
    const correctWord = correctWords[0];
    if (correctWord.length >= 3 && userWords.some(w => w === correctWord || w.includes(correctWord))) {
      return true;
    }
  }
  
  // Multi-word to multi-word: check word overlap
  // At least 60% of words should match
  const matchingWords = userWords.filter(uw => 
    correctWords.some(cw => cw === uw || cw.includes(uw) || uw.includes(cw))
  );
  
  const overlapRatio = matchingWords.length / Math.max(userWords.length, correctWords.length);
  if (overlapRatio >= 0.6) return true;
  
  // Check if user answer is substring of correct (for things like "snow crab" vs "snow crab mix")
  if (correct.includes(user) && user.length >= 4) return true;
  if (user.includes(correct) && correct.length >= 4) return true;
  
  return false;
}

/**
 * Find the best match for a user answer in a list of correct answers
 * Returns the matched correct answer or null
 */
function findBestMatch(userAnswer, correctAnswers) {
  // Try exact match first
  const normalized = normalize(userAnswer);
  if (correctAnswers.includes(normalized)) return normalized;
  
  // Try fuzzy match
  for (const correctAnswer of correctAnswers) {
    if (fuzzyMatch(userAnswer, correctAnswer)) {
      return correctAnswer;
    }
  }
  
  return null;
}

function uniquePantry(cards) {
  const set = new Set();
  for (const r of cards) for (const ing of r.ingredients) set.add(ing);
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

function pickDueRoll(progress, cards) {
  if (!cards || cards.length === 0) return null;
  
  const now = Date.now();
  const due = cards.filter(r => progress[r.id]?.dueAt <= now);
  // If none due, pick soonest
  if (due.length === 0) {
    const sorted = [...cards].sort((a, b) => {
      const aDue = progress[a.id]?.dueAt ?? now;
      const bDue = progress[b.id]?.dueAt ?? now;
      return aDue - bDue;
    });
    return sorted[0] || null;
  }
  // Interleave by preferring medium mastery (to keep it challenging)
  const scored = due.map(r => ({
    roll: r,
    m: progress[r.id]?.mastery ?? 0,
    last: progress[r.id]?.lastScore ?? 0.5,
  }));
  scored.sort((a, b) => {
    // prioritize low-to-mid mastery, then weaker last score
    const aKey = Math.abs(55 - a.m);
    const bKey = Math.abs(55 - b.m);
    if (aKey !== bKey) return aKey - bKey;
    return a.last - b.last;
  });
  return scored[0]?.roll || null;
}

function formatDue(ts) {
  const diff = ts - Date.now();
  if (diff <= 0) return "Due now";
  const mins = Math.round(diff / 60000);
  if (mins < 60) return `Due in ${mins}m`;
  const hrs = Math.round(mins / 60);
  if (hrs < 48) return `Due in ${hrs}h`;
  const days = Math.round(hrs / 24);
  return `Due in ${days}d`;
}

/** ---------- APP ---------- **/
export default function App() {
  const [deck, setDeck] = useState("sushi"); // "sushi" | "cocktails"
  
  // Compute active deck based on current selection
  const ACTIVE_DECK = useMemo(() => (deck === "sushi" ? ROLLS : COCKTAILS), [deck]);
  
  const pantry = useMemo(() => uniquePantry(ACTIVE_DECK), [ACTIVE_DECK]);
  const [progress, setProgress] = useState(() => loadProgress(storageKeyForDeck("sushi"), ROLLS));
  const [mode, setMode] = useState("recall"); // recall | build | lightning
  const [stage, setStage] = useState("prompt"); // prompt | answer | result
  const [current, setCurrent] = useState(() => pickDueRoll(loadProgress(storageKeyForDeck("sushi"), ROLLS), ROLLS));
  const [input, setInput] = useState("");
  const [picked, setPicked] = useState([]);
  const [result, setResult] = useState(null);
  const [streak, setStreak] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const curProg = progress[current?.id] || {
    ease: 2.3,
    intervalDays: 0,
    reps: 0,
    dueAt: Date.now(),
    lastScore: null,
    mastery: 0,
  };

  // Save progress when it changes
  useEffect(() => {
    saveProgress(storageKeyForDeck(deck), progress);
  }, [progress, deck]);

  // Handle deck switching (skip on initial mount)
  const isInitialMount = React.useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    try {
      const cards = deck === "sushi" ? ROLLS : COCKTAILS;
      const key = storageKeyForDeck(deck);
      const p = loadProgress(key, cards);
      const nextCard = pickDueRoll(p, cards);
      
      if (!nextCard) {
        console.error('No card available for deck:', deck);
        return;
      }
      
      setProgress(p);
      setCurrent(nextCard);
      setStage("prompt");
      setInput("");
      setPicked([]);
      setResult(null);
      setStreak(0);
      setShowAnswer(false);
      setShowPreview(false);
    } catch (error) {
      console.error('Error switching deck:', error);
    }
  }, [deck]);

  function nextCard() {
    const next = pickDueRoll(progress, ACTIVE_DECK);
    setCurrent(next);
    setStage("prompt");
    setInput("");
    setPicked([]);
    setResult(null);
    setShowAnswer(false);
    setShowPreview(false);
  }

  function gradeRecall() {
    const truth = current.ingredients.map(normalize);
    const given = input
      .split("\n")
      .map(s => normalize(s))
      .filter(Boolean);

    // Use fuzzy matching to pair user answers with correct answers
    const matchedTruth = new Set();
    const matchedGiven = new Set();
    const correct = [];

    // For each user answer, try to find a match in truth
    for (const userAnswer of given) {
      const match = findBestMatch(userAnswer, truth);
      if (match && !matchedTruth.has(match)) {
        correct.push(userAnswer);
        matchedTruth.add(match);
        matchedGiven.add(userAnswer);
      }
    }

    // Missing = truth items that weren't matched
    const missing = truth.filter(x => !matchedTruth.has(x));
    
    // Extra = user answers that didn't match anything
    const extra = given.filter(x => !matchedGiven.has(x));

    const score = truth.length ? matchedTruth.size / truth.length : 0;

    const updated = scheduleNext(curProg, score);
    setProgress(prev => ({ ...prev, [current.id]: updated }));
    setResult({ correct, missing, extra, score });
    setStage("result");

    if (score >= 0.85) setStreak(s => s + 1);
    else setStreak(0);
  }

  function gradeBuild() {
    const truth = current.ingredients.map(normalize);
    const pickedN = picked.map(normalize);

    // Use fuzzy matching to pair picked items with correct answers
    const matchedTruth = new Set();
    const matchedPicked = new Set();
    const correct = [];

    // For each picked answer, try to find a match in truth
    for (const pickedAnswer of pickedN) {
      const match = findBestMatch(pickedAnswer, truth);
      if (match && !matchedTruth.has(match)) {
        correct.push(pickedAnswer);
        matchedTruth.add(match);
        matchedPicked.add(pickedAnswer);
      }
    }

    // Missing = truth items that weren't matched
    const missing = truth.filter(x => !matchedTruth.has(x));
    
    // Extra = picked items that didn't match anything
    const extra = pickedN.filter(x => !matchedPicked.has(x));

    // builder is a bit easier => weight it slightly down
    const raw = truth.length ? matchedTruth.size / truth.length : 0;
    const score = Math.max(0, raw - 0.07);

    const updated = scheduleNext(curProg, score);
    setProgress(prev => ({ ...prev, [current.id]: updated }));
    setResult({ correct, missing, extra, score });
    setStage("result");

    if (score >= 0.85) setStreak(s => s + 1);
    else setStreak(0);
  }

  // Lightning: quick "belongs/doesn't belong" for 12 items
  const [lightIdx, setLightIdx] = useState(0);
  const [lightScore, setLightScore] = useState({ right: 0, total: 0 });
  const lightningSet = useMemo(() => {
    if (!current) return [];
    
    const truth = current.ingredients.map(normalize);
    const inRoll = current.ingredients;
    
    // pick decoys that don't fuzzy match with correct answers
    const decoys = pantry
      .filter(p => {
        const match = findBestMatch(p, truth);
        return !match; // Only include if no fuzzy match found
      })
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);

    const mix = [...inRoll.slice(0, 6), ...decoys]
      .sort(() => Math.random() - 0.5)
      .slice(0, 12);

    return mix.map(item => ({
      item,
      isTrue: !!findBestMatch(item, truth),
    }));
  }, [current, pantry]); // eslint-disable-line

  function resetLightning() {
    setLightIdx(0);
    setLightScore({ right: 0, total: 0 });
    setStage("prompt");
    setResult(null);
    setShowAnswer(false);
    setShowPreview(false);
  }

  function answerLightning(yes) {
    const q = lightningSet[lightIdx];
    const isCorrect = (yes && q.isTrue) || (!yes && !q.isTrue);
    const nextScore = {
      right: lightScore.right + (isCorrect ? 1 : 0),
      total: lightScore.total + 1,
    };
    setLightScore(nextScore);

    const nextIdx = lightIdx + 1;
    if (nextIdx >= lightningSet.length) {
      const raw = nextScore.total ? nextScore.right / nextScore.total : 0;
      // lightning is discrimination training => medium weighting
      const score = Math.max(0, raw - 0.03);
      const updated = scheduleNext(curProg, score);
      setProgress(prev => ({ ...prev, [current.id]: updated }));
      setResult({
        score,
        correct: [],
        missing: current.ingredients
          .map(normalize)
          .filter(t => !lightningSet.some(q => q.isTrue && normalize(q.item) === t)),
        extra: [],
        lightning: nextScore,
      });
      setStage("result");
      if (score >= 0.85) setStreak(s => s + 1);
      else setStreak(0);
      return;
    }
    setLightIdx(nextIdx);
  }

  function resetAll() {
    const fresh = defaultProgress(ACTIVE_DECK);
    setProgress(fresh);
    setCurrent(pickDueRoll(fresh, ACTIVE_DECK));
    setStage("prompt");
    setInput("");
    setPicked([]);
    setResult(null);
    setStreak(0);
    setShowAnswer(false);
    setShowPreview(false);
  }

  function copyMissingIngredients() {
    if (result && result.missing.length > 0) {
      const text = result.missing.join('\n');
      navigator.clipboard.writeText(text).then(() => {
        // Visual feedback - could add a toast here
        console.log('Copied missing ingredients to clipboard');
      }).catch(err => {
        console.error('Failed to copy:', err);
      });
    }
  }

  // Safety check: ensure current card exists
  if (!current) {
    return (
      <div className="min-h-screen text-white">
        {/* Background (same as main app) */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-br from-zinc-950 via-slate-950 to-indigo-950" />
        <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.22),transparent_40%),radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.18),transparent_38%)]" />
        
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-2xl mb-2 font-semibold">Loading...</div>
            <div className="text-white/60">Preparing your deck</div>
          </div>
        </div>
      </div>
    );
  }

  const itemName = deck === "sushi" ? "roll" : "cocktail";
  const headerSubtitle =
    mode === "recall" ? "Type ingredients from memory (best retention)"
    : mode === "build" ? `Build the ${itemName} from the pantry (great for mobile)`
    : `Rapid-fire: does it belong in the ${itemName}? (discrimination training)`;

  return (
    <div className="min-h-screen text-white">
      {/* Background */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-zinc-950 via-slate-950 to-indigo-950" />
      <div className="fixed inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(99,102,241,0.22),transparent_40%),radial-gradient(circle_at_30%_80%,rgba(16,185,129,0.18),transparent_38%)]" />

      <div className="mx-auto max-w-6xl px-4 py-6 md:py-10">
        {/* Top Bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/15 grid place-items-center text-2xl">
                🍣
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">
                  Roll Recall
                </h1>
                <p className="text-white/70 text-sm md:text-base">
                  Spaced repetition + recall drills to lock ingredients into working memory.
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Pill label={`Streak: ${streak}`} />
            <Pill label={`Mastery: ${Math.round(curProg?.mastery ?? 0)}%`} />
            <Pill label={formatDue(curProg?.dueAt ?? Date.now())} />
            <button
              onClick={() => setShowHelp(true)}
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
              title="Help & Info"
            >
              Help
            </button>
            <button
              onClick={resetAll}
              className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
              title="Reset all progress"
            >
              Reset
            </button>
          </div>
        </div>

        {/* Deck Selection */}
        <div className="mt-6 flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setDeck("sushi")}
            className={[
              "px-4 py-2 rounded-2xl border transition-all text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/50",
              deck === "sushi"
                ? "bg-white text-zinc-950 border-white"
                : "bg-white/10 border-white/15 hover:bg-white/20",
            ].join(" ")}
          >
            🍣 Sushi Rolls
          </button>

          <button
            onClick={() => setDeck("cocktails")}
            className={[
              "px-4 py-2 rounded-2xl border transition-all text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/50",
              deck === "cocktails"
                ? "bg-white text-zinc-950 border-white"
                : "bg-white/10 border-white/15 hover:bg-white/20",
            ].join(" ")}
          >
            🍸 Cocktails
          </button>

          <div className="text-sm text-white/50 px-2">|</div>
        </div>

        {/* Mode Switch */}
        <div className="mt-3 flex flex-wrap gap-2 items-center">
          <ModeButton active={mode === "recall"} onClick={() => { setMode("recall"); setStage("prompt"); setResult(null); setShowAnswer(false); setShowPreview(false); }}>
            Recall
          </ModeButton>
          <ModeButton active={mode === "build"} onClick={() => { setMode("build"); setStage("prompt"); setResult(null); setShowAnswer(false); setShowPreview(false); }}>
            Build
          </ModeButton>
          <ModeButton active={mode === "lightning"} onClick={() => { setMode("lightning"); resetLightning(); }}>
            Lightning
          </ModeButton>

          <div className="hidden md:block ml-auto text-sm text-white/70 self-center">
            {headerSubtitle}
          </div>
        </div>

        <div className="md:hidden mt-2 text-xs text-white/60">
          {headerSubtitle}
        </div>

        {/* Main Card */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Prompt Card */}
          <motion.div
            layout
            className="lg:col-span-2 rounded-3xl bg-white/7 border border-white/12 shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            <div className="p-5 md:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs uppercase tracking-widest text-white/60">
                    Current Card
                  </div>
                  <div className="mt-1 text-xl md:text-2xl font-semibold">
                    {current.name}
                  </div>
                </div>

                <button
                  onClick={nextCard}
                  className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm whitespace-nowrap"
                >
                  Next
                </button>
              </div>

              {/* Quick encoding preview */}
              <div className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="text-sm text-white/80 font-medium">
                    10-second Preview (encoding)
                  </div>
                  <button
                    onClick={() => setShowPreview(!showPreview)}
                    className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-xs"
                  >
                    {showPreview ? "Hide" : "Show Preview"}
                  </button>
                </div>

                <div className={`mt-3 flex flex-wrap gap-2 relative ${!showPreview ? 'select-none' : ''}`}>
                  {/* Blur overlay when preview is hidden */}
                  {!showPreview && (
                    <div className="absolute inset-0 backdrop-blur-lg bg-white/5 rounded-xl flex items-center justify-center z-10">
                      <div className="text-sm text-white/60 font-medium">
                        Click "Show Preview" to study ingredients
                      </div>
                    </div>
                  )}
                  
                  {current.ingredients.map((ing) => {
                    const cat = categorize(ing);
                    return (
                      <span
                        key={ing}
                        className={`text-xs px-2.5 py-1 rounded-full border ${CAT_STYLES[cat]} transition-all`}
                        title={cat}
                      >
                        <span className="opacity-75">{cat}:</span>{" "}
                        <span className="font-medium">{ing}</span>
                      </span>
                    );
                  })}
                </div>
              </div>

              {/* Game Area */}
              <div className="mt-5">
                <AnimatePresence mode="popLayout">
                  {mode === "recall" && (
                    <motion.div
                      key="recall"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-3"
                    >
                      <div className="text-sm text-white/70">
                        Type one ingredient per line. Don't worry about order.
                      </div>

                      <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={`Example:\nseaweed\nsushi rice\n...`}
                        className="w-full min-h-[220px] rounded-2xl bg-zinc-950/40 border border-white/12 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 p-4 text-sm leading-relaxed transition-all"
                      />

                      <div className="flex items-center gap-2">
                        <button
                          onClick={gradeRecall}
                          className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        >
                          Check
                        </button>
                        <button
                          onClick={() => { setInput(""); setResult(null); setStage("prompt"); setShowAnswer(false); setShowPreview(false); }}
                          className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        >
                          Clear
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {mode === "build" && (
                    <motion.div
                      key="build"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-3"
                    >
                      <div className="text-sm text-white/70">
                        Tap ingredients to add/remove. Aim for complete accuracy.
                      </div>

                      <div className="rounded-2xl bg-white/5 border border-white/10 p-3">
                        <div className="text-xs uppercase tracking-widest text-white/60 px-1">
                          Your Build ({picked.length})
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2 min-h-[3rem]">
                          {picked.length === 0 ? (
                            <span className="text-sm text-white/50 px-1 py-2">
                              Pick ingredients from the pantry below…
                            </span>
                          ) : (
                            picked.map((ing) => (
                              <button
                                key={ing}
                                onClick={() => setPicked(prev => prev.filter(x => x !== ing))}
                                className="text-xs px-2.5 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                                title="Remove"
                              >
                                {ing} ✕
                              </button>
                            ))
                          )}
                        </div>
                      </div>

                      <div className="rounded-2xl bg-zinc-950/25 border border-white/10 p-3 max-h-[240px] overflow-auto scrollbar-custom">
                        <div className="text-xs uppercase tracking-widest text-white/60 px-1">
                          Pantry
                        </div>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {pantry.map((ing) => {
                            const active = picked.includes(ing);
                            return (
                              <button
                                key={ing}
                                onClick={() => setPicked(prev => active ? prev.filter(x => x !== ing) : [...prev, ing])}
                                className={[
                                  "text-xs px-2.5 py-1.5 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-white/40",
                                  active
                                    ? "bg-white text-zinc-950 border-white"
                                    : "bg-white/5 border-white/12 hover:bg-white/15",
                                ].join(" ")}
                              >
                                {ing}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={gradeBuild}
                          className="px-5 py-2.5 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        >
                          Check
                        </button>
                        <button
                          onClick={() => { setPicked([]); setShowAnswer(false); setShowPreview(false); }}
                          className="px-5 py-2.5 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                        >
                          Clear
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {mode === "lightning" && (
                    <motion.div
                      key="lightning"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className="space-y-4"
                    >
                      {stage !== "result" && (
                        <>
                          <div className="flex items-center justify-between">
                            <div className="text-sm text-white/70">
                              Question {lightIdx + 1} / {lightningSet.length}
                            </div>
                            <Pill label={`Score: ${lightScore.right}/${lightScore.total}`} />
                          </div>

                          <div className="rounded-3xl bg-white/6 border border-white/12 p-5 md:p-6">
                            <div className="text-xs uppercase tracking-widest text-white/60">
                              Does this belong in the roll?
                            </div>
                            <div className="mt-2 text-xl md:text-2xl font-semibold">
                              {lightningSet[lightIdx]?.item}
                            </div>

                            <div className="mt-4 flex gap-2">
                              <button
                                onClick={() => answerLightning(true)}
                                className="flex-1 px-4 py-3 rounded-2xl bg-white text-zinc-950 font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all touch-manipulation"
                              >
                                Yes
                              </button>
                              <button
                                onClick={() => answerLightning(false)}
                                className="flex-1 px-4 py-3 rounded-2xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all font-semibold touch-manipulation"
                              >
                                No
                              </button>
                            </div>
                          </div>

                          <button
                            onClick={resetLightning}
                            className="px-4 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                          >
                            Reshuffle Lightning
                          </button>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Results */}
              {stage === "result" && result && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-3xl bg-emerald-500/10 border border-emerald-400/20 p-5"
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1">
                      <div className="text-xs uppercase tracking-widest text-emerald-200/80">
                        Results
                      </div>
                      <div className="mt-1 text-lg font-semibold text-white">
                        Score: {Math.round(result.score * 100)}%
                        <span className="text-white/60 font-normal text-sm block md:inline md:ml-2">
                          Next: {formatDue(progress[current.id].dueAt)}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {result.missing && result.missing.length > 0 && (
                        <button
                          onClick={copyMissingIngredients}
                          className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                          title="Copy missing ingredients to clipboard"
                        >
                          Copy Missing
                        </button>
                      )}
                      {!showAnswer && (
                        <button
                          onClick={() => setShowAnswer(true)}
                          className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                        >
                          Reveal Answer
                        </button>
                      )}
                      <button
                        onClick={nextCard}
                        className="px-4 py-2 rounded-xl bg-white text-zinc-950 font-semibold hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all text-sm"
                      >
                        Continue
                      </button>
                    </div>
                  </div>

                  {result.lightning && (
                    <div className="mt-2 text-sm text-white/70">
                      Lightning: {result.lightning.right}/{result.lightning.total} correct
                    </div>
                  )}

                  <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                    <ResultCol title="Correct" items={result.correct} tone="good" />
                    <ResultCol title="Missing (must learn)" items={result.missing} tone="warn" />
                    <ResultCol title="Extra (didn't belong)" items={result.extra} tone="bad" />
                  </div>

                  {/* Reveal Answer Section */}
                  {showAnswer && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-4 rounded-2xl bg-white/5 border border-white/10 p-4"
                    >
                      <div className="text-sm font-semibold text-white/90 mb-2">
                        Complete Answer ({current.ingredients.length} ingredients):
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {current.ingredients.map((ing) => (
                          <span
                            key={ing}
                            className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-white"
                          >
                            {ing}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Side Panel */}
          <motion.div
            layout
            className="rounded-3xl bg-white/7 border border-white/12 shadow-[0_10px_40px_rgba(0,0,0,0.35)] overflow-hidden"
          >
            <div className="p-5 md:p-6">
              <div className="text-xs uppercase tracking-widest text-white/60">
                Your System
              </div>
              <div className="mt-2 text-lg font-semibold">
                Spaced Review Queue
              </div>
              <div className="mt-1 text-sm text-white/70">
                Cards reappear based on your performance—fail = soon, pass = later.
              </div>

              <div className="mt-4 space-y-2 max-h-[360px] overflow-auto pr-1 scrollbar-custom">
                {ACTIVE_DECK
                  .slice()
                  .sort((a, b) => {
                    const aDue = progress[a.id]?.dueAt ?? Date.now();
                    const bDue = progress[b.id]?.dueAt ?? Date.now();
                    return aDue - bDue;
                  })
                  .map((r) => {
                    const cardProg = progress[r.id] || { dueAt: Date.now(), mastery: 0 };
                    return (
                      <div key={r.id} className="rounded-2xl bg-white/5 border border-white/10 p-3 hover:bg-white/[0.07] transition-all">
                        <div className="flex items-start justify-between gap-2">
                          <div className="text-sm font-semibold">{r.name}</div>
                          <div className="text-xs text-white/60 whitespace-nowrap">{formatDue(cardProg.dueAt)}</div>
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full bg-white/70 transition-all duration-300"
                              style={{ width: `${Math.round(cardProg.mastery)}%` }}
                            />
                          </div>
                          <div className="text-xs text-white/60 w-10 text-right">
                            {Math.round(cardProg.mastery)}%
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>

              <div className="mt-5 rounded-2xl bg-white/5 border border-white/10 p-4">
                <div className="text-sm font-semibold">Retention Boosters (built-in)</div>
                <ul className="mt-2 text-sm text-white/70 space-y-2 list-disc pl-5">
                  <li><span className="text-white/85 font-medium">Interleaving:</span> similar rolls get mixed to prevent "illusion of knowing."</li>
                  <li><span className="text-white/85 font-medium">Immediate feedback:</span> missing items become your next targets.</li>
                  <li><span className="text-white/85 font-medium">Spaced repeats:</span> you'll see weak rolls again in minutes, strong rolls in days.</li>
                </ul>
              </div>

              <div className="mt-4 text-xs text-white/50">
                Tip: For best results, do 5 minutes, 2–3 times/day.
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-8 text-xs text-white/50">
          Data sources: Sushi_Rolls_Ingredients_All_15.docx • Cocktail_Menu_Master_Document
        </div>
      </div>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-zinc-900 border border-white/20 rounded-3xl p-6 md:p-8 max-w-2xl w-full max-h-[80vh] overflow-auto scrollbar-custom shadow-2xl"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h2 className="text-2xl font-bold">How Roll Recall Works</h2>
                  <p className="text-white/70 text-sm mt-1">Master sushi rolls & cocktails with science-backed learning</p>
                </div>
                <button
                  onClick={() => setShowHelp(false)}
                  className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                >
                  Close
                </button>
              </div>

              <div className="space-y-6">
                <section>
                  <h3 className="text-lg font-semibold mb-2">Three Training Modes</h3>
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="font-semibold text-white">🧠 Recall Mode</div>
                      <p className="text-sm text-white/70 mt-1">
                        Type ingredients from memory, one per line. This is the most effective mode for long-term retention.
                        Don't worry about the order—just try to remember everything!
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="font-semibold text-white">🏗️ Build Mode</div>
                      <p className="text-sm text-white/70 mt-1">
                        Select ingredients from the pantry. Great for mobile devices and when you want tactile interaction.
                        Tap an ingredient to add it, tap again to remove it.
                      </p>
                    </div>
                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                      <div className="font-semibold text-white">⚡ Lightning Mode</div>
                      <p className="text-sm text-white/70 mt-1">
                        Rapid-fire discrimination training. Does this ingredient belong in the roll? Answer quickly to train
                        your recognition speed and prevent false memories.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">Spaced Repetition System</h3>
                  <p className="text-sm text-white/70 mb-2">
                    The app automatically schedules each roll based on your performance:
                  </p>
                  <ul className="space-y-2 text-sm text-white/70 list-disc pl-5">
                    <li><strong className="text-white">Struggled?</strong> You'll see it again in 2-10 minutes</li>
                    <li><strong className="text-white">Got it right?</strong> Next review in 1-3 days</li>
                    <li><strong className="text-white">Mastered it?</strong> The interval keeps expanding</li>
                  </ul>
                  <p className="text-sm text-white/70 mt-2">
                    This scientifically-proven technique ensures you review right before you'd forget, maximizing retention
                    with minimal time investment.
                  </p>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">Tips for Best Results</h3>
                  <ul className="space-y-2 text-sm text-white/70 list-disc pl-5">
                    <li>Practice 5-10 minutes at a time, 2-3 times per day</li>
                    <li>Use the color-coded preview for 10 seconds before each attempt</li>
                    <li>After checking, study the "Missing" ingredients carefully</li>
                    <li>Use "Copy Missing" to create custom study notes</li>
                    <li>Only use "Reveal Answer" after you've genuinely tried—no peeking!</li>
                    <li>Your progress auto-saves, so you can close and resume anytime</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">Dual Deck System</h3>
                  <p className="text-sm text-white/70 mb-2">
                    Switch between two decks: 🍣 Sushi Rolls (15 cards) and 🍸 Cocktails (20 cards).
                  </p>
                  <ul className="space-y-2 text-sm text-white/70 list-disc pl-5">
                    <li><strong className="text-white">Separate Progress:</strong> Each deck has its own progress, queue, and mastery tracking</li>
                    <li><strong className="text-white">Same Modes:</strong> All three training modes work with both decks</li>
                    <li><strong className="text-white">Auto-Save:</strong> Progress for each deck is saved independently</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-lg font-semibold mb-2">Understanding Your Stats</h3>
                  <ul className="space-y-2 text-sm text-white/70 list-disc pl-5">
                    <li><strong className="text-white">Streak:</strong> Consecutive cards with 85%+ accuracy</li>
                    <li><strong className="text-white">Mastery:</strong> Overall progress on the current card (0-100%)</li>
                    <li><strong className="text-white">Queue:</strong> Shows all cards in the active deck sorted by when they're due next</li>
                  </ul>
                </section>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** ---------- UI Bits ---------- **/
function Pill({ label }) {
  return (
    <div className="px-3 py-2 rounded-xl bg-white/10 border border-white/15 text-sm">
      {label}
    </div>
  );
}

function ModeButton({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={[
        "px-4 py-2 rounded-2xl border transition-all text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/50 touch-manipulation",
        active
          ? "bg-white text-zinc-950 border-white"
          : "bg-white/10 border-white/15 hover:bg-white/20",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

function ResultCol({ title, items, tone }) {
  const toneStyles =
    tone === "good"
      ? "bg-emerald-500/10 border-emerald-400/20"
      : tone === "warn"
      ? "bg-amber-500/10 border-amber-400/20"
      : "bg-rose-500/10 border-rose-400/20";

  return (
    <div className={`rounded-2xl border p-3 ${toneStyles}`}>
      <div className="text-xs uppercase tracking-widest text-white/70">{title}</div>
      <div className="mt-2 flex flex-wrap gap-2">
        {items.length === 0 ? (
          <span className="text-sm text-white/55">—</span>
        ) : (
          items.map((x) => (
            <span key={x} className="text-xs px-2.5 py-1 rounded-full bg-white/10 border border-white/15">
              {x}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

