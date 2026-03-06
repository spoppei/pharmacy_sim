// ═══════════════════════════════════════════════
// PHARMACY SIM — script.js
// Sections:
//   1. Config & State
//   2. Shift Clock
//   3. Onboarding
//   4. Shelf Building
//   5. Patient Flow
//   6. Dispensing & Feedback
//   7. Break Screen
//   8. End of Day Screen
//   9. Utilities
//  10. Init
// ═══════════════════════════════════════════════

/* ── 1. Config & State ───────────────────────── */
const SHIFT_START  = 9 * 60;   // 9:00 AM in minutes
const LUNCH_START  = 12 * 60;  // 12:00 PM
const LUNCH_END    = 13 * 60;  // 1:00 PM
const SHIFT_END    = 17 * 60;  // 5:00 PM
const TICK_INTERVAL = 2000;     // real ms per game minute (2s = 1 game min, full shift ~4.8 min real time)

// Shelf categories — maps display name to quiz codes
const shelfCategories = [
  { name: "🌬 Asthma & Allergies",        quizzes: ["F1", "W7"] },
  { name: "💉 Diabetes",                   quizzes: ["F2"] },
  { name: "❤️ Cardiovascular",             quizzes: ["F6", "W1", "W2", "W3"] },
  { name: "💊 Pain & Muscle",              quizzes: ["F3", "W4", "W5"] },
  { name: "🧠 Mental Health & Neurology",  quizzes: ["F9", "F10", "W8"] },
  { name: "🦠 Antibiotics & Antivirals",   quizzes: ["F7", "F8"] },
  { name: "🧪 GI & Supplements",           quizzes: ["F4"] },
  { name: "🌸 Women's & Men's Health",     quizzes: ["F5", "W6"] },
  { name: "🔬 Miscellaneous",              quizzes: ["W9"] },
];

let state = {
  pharmacistName:   "",
  pharmacistAvatar: "🧑‍⚕️",
  clockMinutes:     SHIFT_START,
  clockInterval:    null,
  onLunch:          false,
  shiftOver:        false,

  // Session stats
  totalServed:      0,
  totalCorrect:     0,
  totalErrors:      0,
  streakCurrent:    0,
  streakBest:       0,
  missedDrugs:      [],   // { scenario, givenDrug }

  // Morning session (before lunch)
  morningServed:    0,
  morningCorrect:   0,

  // Current patient
  currentScenario:  null,
  selectedDrug:     null,
  awaitingNext:     false,
  hintUsed:         false,
  shuffledScenarios: [],
  scenarioIdx:      0,
};

/* ── 2. Shift Clock ──────────────────────────── */
function startClock() {
  if (state.clockInterval) clearInterval(state.clockInterval);
  state.clockInterval = setInterval(tickClock, TICK_INTERVAL);
  renderClock();
}

function tickClock() {
  if (state.onLunch || state.shiftOver || state.awaitingNext) return;
  state.clockMinutes++;
  renderClock();

  if (state.clockMinutes >= SHIFT_END) {
    endShift();
  } else if (state.clockMinutes >= LUNCH_START && !state.onLunch) {
    startLunch();
  }
}

function renderClock() {
  const h   = Math.floor(state.clockMinutes / 60);
  const m   = state.clockMinutes % 60;
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h > 12 ? h - 12 : h === 0 ? 12 : h;
  const el  = document.getElementById("clock-display");
  el.textContent = `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
  el.classList.toggle("lunch-time", state.onLunch);
  el.classList.toggle("end-time",   state.clockMinutes >= SHIFT_END - 5);
}

/* ── 3. Onboarding ───────────────────────────── */
function initOnboarding() {
  const avatarOpts = ["🧑‍⚕️", "👩‍⚕️", "👨‍⚕️", "🧑‍🔬", "👩‍🔬", "👨‍🔬"];
  const row = document.getElementById("avatar-row");
  row.innerHTML = "";
  avatarOpts.forEach((a, i) => {
    const btn = document.createElement("button");
    btn.className = "avatar-opt" + (i === 0 ? " chosen" : "");
    btn.textContent = a;
    btn.addEventListener("click", () => {
      document.querySelectorAll(".avatar-opt").forEach(b => b.classList.remove("chosen"));
      btn.classList.add("chosen");
      state.pharmacistAvatar = a;
    });
    row.appendChild(btn);
  });
  state.pharmacistAvatar = avatarOpts[0];

  document.getElementById("pharmacist-name").addEventListener("input", function () {
    document.getElementById("start-shift-btn").disabled = this.value.trim().length < 2;
  });

  document.getElementById("start-shift-btn").addEventListener("click", () => {
    const name = document.getElementById("pharmacist-name").value.trim();
    if (!name) return;
    state.pharmacistName = name;
    startShift();
  });
}

function startShift() {
  // Reset state
  Object.assign(state, {
    clockMinutes:  SHIFT_START,
    onLunch:       false,
    shiftOver:     false,
    totalServed:   0,
    totalCorrect:  0,
    totalErrors:   0,
    streakCurrent: 0,
    streakBest:    0,
    missedDrugs:   [],
    morningServed: 0,
    morningCorrect:0,
    awaitingNext:  false,
    hintUsed:      false,
    shuffledScenarios: shuffle([...scenarios]),
    scenarioIdx:   0,
  });

  // Update top bar
  document.getElementById("pharmacist-display").textContent = `${state.pharmacistAvatar} ${state.pharmacistName}`;
  updateTopBarStats();

  showScreen("game");
  buildShelf();
  startClock();
  nextPatient();
}

/* ── 4. Shelf Building ───────────────────────── */
function buildShelf(filter = "") {
  const list = document.getElementById("shelf-list");
  list.innerHTML = "";
  const q = filter.toLowerCase().trim();

  shelfCategories.forEach(cat => {
    const drugsInCat = allDrugs.filter(d => cat.quizzes.includes(d.quiz));
    const filtered = q
      ? drugsInCat.filter(d =>
          d.generic.toLowerCase().includes(q) ||
          d.brand.join(" ").toLowerCase().includes(q)
        )
      : drugsInCat;

    if (!filtered.length) return;

    const catEl = document.createElement("div");
    catEl.className = "shelf-category";

    const header = document.createElement("div");
    header.className = "category-header";
    header.innerHTML = `<span>${cat.name}</span><span class="category-arrow">▶</span>`;
    header.addEventListener("click", () => {
      header.classList.toggle("open");
      drugsEl.classList.toggle("open");
    });
    // Auto-open if searching
    if (q) { header.classList.add("open"); }

    const drugsEl = document.createElement("div");
    drugsEl.className = "category-drugs" + (q ? " open" : "");

    filtered.forEach(drug => {
      const item = document.createElement("div");
      item.className = "drug-shelf-item";
      item.dataset.generic = drug.generic;
      const brands = drug.brand.filter(b => b && b !== "-").slice(0, 2).join(", ");
      item.innerHTML = `
        <div class="drug-shelf-generic">${drug.generic}</div>
        ${brands ? `<div class="drug-shelf-brand">${brands}</div>` : ""}
      `;
      item.addEventListener("click", () => selectDrug(drug, item));
      drugsEl.appendChild(item);
    });

    catEl.appendChild(header);
    catEl.appendChild(drugsEl);
    list.appendChild(catEl);
  });

  if (!list.children.length) {
    list.innerHTML = `<div style="color:rgba(255,255,255,0.4);text-align:center;padding:20px;font-size:0.85em;font-weight:700;">No drugs match "${filter}"</div>`;
  }
}

document.getElementById("shelf-search").addEventListener("input", function () {
  buildShelf(this.value);
});

/* ── 5. Patient Flow ─────────────────────────── */
function nextPatient() {
  // Reset UI
  state.awaitingNext = false;
  state.selectedDrug = null;
  state.hintUsed     = false;

  document.getElementById("selection-area").classList.remove("show");
  document.getElementById("feedback-area").className = ""; // reset classes
  document.getElementById("feedback-area").style.display = "none";
  document.getElementById("next-patient-btn").classList.remove("show");
  document.getElementById("hint-area").classList.remove("show");
  document.getElementById("hint-btn").style.display = "inline-block";
  document.getElementById("dispense-btn").disabled = false;

  // Clear shelf selection
  document.querySelectorAll(".drug-shelf-item.selected").forEach(el => el.classList.remove("selected"));

  // Get next scenario
  if (state.scenarioIdx >= state.shuffledScenarios.length) {
    state.shuffledScenarios = shuffle([...scenarios]);
    state.scenarioIdx = 0;
  }
  state.currentScenario = state.shuffledScenarios[state.scenarioIdx++];
  const patient = randomPatient();

  // Render patient
  document.getElementById("patient-emoji").textContent  = patient.avatar;
  document.getElementById("patient-name-label").textContent = patient.name;
  document.getElementById("patient-mood").textContent   = patient.mood;
  document.getElementById("complaint-text").textContent = state.currentScenario.complaint;

  updateTopBarStats();
}

/* ── 6. Dispensing & Feedback ────────────────── */
function selectDrug(drug, el) {
  if (state.awaitingNext) return;

  // Deselect previous
  document.querySelectorAll(".drug-shelf-item.selected").forEach(e => e.classList.remove("selected"));
  el.classList.add("selected");
  state.selectedDrug = drug;

  // Show selection preview
  const area = document.getElementById("selection-area");
  area.classList.add("show");
  document.getElementById("selected-drug-name").textContent  = drug.generic;
  document.getElementById("selected-drug-class").textContent = drug.class;
}

document.getElementById("dispense-btn").addEventListener("click", () => {
  if (!state.selectedDrug) return;
  dispenseDrug(state.selectedDrug);
});

document.getElementById("hint-btn").addEventListener("click", () => {
  if (!state.currentScenario) return;
  state.hintUsed = true;
  document.getElementById("hint-text").textContent = "💡 " + state.currentScenario.hint;
  document.getElementById("hint-area").classList.add("show");
  document.getElementById("hint-btn").style.display = "none";
});

document.getElementById("next-patient-btn").addEventListener("click", () => {
  if (state.onLunch || state.shiftOver) return;
  nextPatient();
});

function dispenseDrug(drug) {
  const scenario = state.currentScenario;
  state.awaitingNext = true;
  document.getElementById("dispense-btn").disabled = true;

  const isCorrect = scenario.correct.some(c =>
    c.toLowerCase() === drug.generic.toLowerCase()
  );

  const fbArea = document.getElementById("feedback-area");
  fbArea.style.display = "block";

  if (isCorrect) {
    // ✅ Correct
    state.totalServed++;
    state.totalCorrect++;
    state.streakCurrent++;
    if (state.streakCurrent > state.streakBest) state.streakBest = state.streakCurrent;

    fbArea.className = "correct";
    fbArea.innerHTML = `✅ <strong>Correct!</strong> ${scenario.rightFeedback}`;

    // Animate patient window
    document.getElementById("patient-window").classList.add("dispense-anim");
    setTimeout(() => document.getElementById("patient-window").classList.remove("dispense-anim"), 500);

    if (typeof confetti === "function" && !document.body.classList.contains("reduce-motion")) {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 }, colors: ["#2d6a4f", "#95d5b2", "#e9a14a"] });
    }

  } else {
    // ❌ Wrong
    state.totalServed++;
    state.totalErrors++;
    state.streakCurrent = 0;

    // Look for specific feedback for this drug
    const specific = scenario.wrongFeedback?.[drug.generic] || scenario.wrongFeedback?.["default"];
    fbArea.className = "incorrect";
    fbArea.innerHTML = `❌ <strong>Not quite.</strong> "${specific || "I don't think that's what my doctor prescribed."}"
      <br><span style="font-size:0.85em;margin-top:6px;display:block;opacity:0.8;">
        Correct answer: <strong>${scenario.correct.join(" or ")}</strong>
      </span>`;

    state.missedDrugs.push({
      scenario: scenario.complaint.substring(0, 60) + "...",
      correct:  scenario.correct.join(", "),
      given:    drug.generic,
    });

    // Shake animation
    document.getElementById("patient-window").classList.add("shake-anim");
    setTimeout(() => document.getElementById("patient-window").classList.remove("shake-anim"), 400);
  }

  // Show next patient button
  document.getElementById("next-patient-btn").classList.add("show");
  updateTopBarStats();
}

function updateTopBarStats() {
  document.getElementById("stat-served").textContent  = state.totalServed;
  document.getElementById("stat-correct").textContent = state.totalCorrect;
  document.getElementById("stat-streak").textContent  = state.streakCurrent;
  const pct = state.totalServed > 0 ? Math.round((state.totalCorrect / state.totalServed) * 100) : 100;
  document.getElementById("stat-pct").textContent = pct + "%";
}

/* ── 7. Break Screen ─────────────────────────── */
function startLunch() {
  state.onLunch      = true;
  state.morningServed  = state.totalServed;
  state.morningCorrect = state.totalCorrect;

  // Populate break screen
  const pct = state.morningServed > 0
    ? Math.round((state.morningCorrect / state.morningServed) * 100) : 100;

  document.getElementById("break-served").textContent  = state.morningServed;
  document.getElementById("break-correct").textContent = state.morningCorrect;
  document.getElementById("break-errors").textContent  = state.totalErrors;
  document.getElementById("break-streak").textContent  = state.streakBest;
  document.getElementById("break-pct").textContent     = pct + "%";
  document.getElementById("break-pharmacist").textContent = `${state.pharmacistAvatar} ${state.pharmacistName}`;

  showScreen("break");
}

document.getElementById("resume-btn").addEventListener("click", () => {
  state.onLunch      = false;
  state.clockMinutes = LUNCH_END;
  renderClock();
  showScreen("game");
  nextPatient();
});

/* ── 8. End of Day Screen ────────────────────── */
function endShift() {
  clearInterval(state.clockInterval);
  state.shiftOver = true;

  const total = state.totalServed;
  const pct   = total > 0 ? Math.round((state.totalCorrect / total) * 100) : 100;

  // Star rating
  let stars = "⭐⭐⭐⭐⭐";
  let ratingLabel = "Perfect Shift! You're a star pharmacist! 🌟";
  if (pct < 95) { stars = "⭐⭐⭐⭐"; ratingLabel = "Excellent work! Almost flawless."; }
  if (pct < 80) { stars = "⭐⭐⭐";   ratingLabel = "Good effort! A few to review tonight."; }
  if (pct < 65) { stars = "⭐⭐";     ratingLabel = "Keep studying — you'll get there!"; }
  if (pct < 50) { stars = "⭐";       ratingLabel = "Rough day. Hit those flashcards tonight!"; }

  document.getElementById("end-pharmacist").textContent = `${state.pharmacistAvatar} ${state.pharmacistName}`;
  document.getElementById("end-served").textContent     = total;
  document.getElementById("end-correct").textContent    = state.totalCorrect;
  document.getElementById("end-errors").textContent     = state.totalErrors;
  document.getElementById("end-streak").textContent     = state.streakBest;
  document.getElementById("end-pct").textContent        = pct + "%";
  document.getElementById("end-stars").textContent      = stars;
  document.getElementById("end-rating").textContent     = ratingLabel;

  // Missed drugs list
  const missedEl = document.getElementById("end-missed-list");
  if (state.missedDrugs.length) {
    document.getElementById("end-missed-section").style.display = "block";
    missedEl.innerHTML = state.missedDrugs.slice(0, 8).map(m => `
      <div class="missed-drug-item">
        ❌ Gave <strong>${m.given}</strong> — correct: <strong>${m.correct}</strong>
      </div>
    `).join("");
  } else {
    document.getElementById("end-missed-section").style.display = "none";
  }

  showScreen("end");

  if (pct >= 80 && typeof confetti === "function") {
    setTimeout(() => confetti({ particleCount: 150, spread: 120, origin: { y: 0.5 } }), 300);
  }
}

document.getElementById("new-shift-btn").addEventListener("click", () => {
  showScreen("onboard");
});

/* ── 9. Utilities ────────────────────────────── */
function showScreen(name) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById("screen-" + name).classList.add("active");
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ── 10. Init ────────────────────────────────── */
initOnboarding();
showScreen("onboard");
