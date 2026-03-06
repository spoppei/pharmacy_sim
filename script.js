// PHARMACY SIM — script.js (clean rewrite)

const SHELF_CATEGORIES = [
  { name:"🌬 Asthma & Allergies",       quizzes:["F1","W7"] },
  { name:"💉 Diabetes",                  quizzes:["F2"] },
  { name:"❤️ Cardiovascular",            quizzes:["F6","W1","W2","W3"] },
  { name:"💊 Pain & Muscle",             quizzes:["F3","W4","W5"] },
  { name:"🧠 Mental Health & Neurology", quizzes:["F9","F10","W8"] },
  { name:"🦠 Antibiotics & Antivirals",  quizzes:["F7","F8"] },
  { name:"🧪 GI & Supplements",          quizzes:["F4"] },
  { name:"🌸 Women's & Men's Health",    quizzes:["F5","W6"] },
  { name:"🔬 Miscellaneous",             quizzes:["W9"] },
];

const SHIFT_START = 9 * 60;
const LUNCH_START = 12 * 60;
const LUNCH_END   = 13 * 60;
const SHIFT_END   = 17 * 60;
const TICK_MS     = 1000;  // 1s per game-minute → ~8 min real-time for a full shift

function el(id) { return document.getElementById(id); }
function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length-1; i>0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]]=[a[j],a[i]];
  }
  return a;
}

// Game variables
var pharmacistName   = "";
var pharmacistAvatar = "🧑‍⚕️";
var clockMin         = SHIFT_START;
var clockTick        = null;
var growthTick       = null;
var onLunch          = false;
var shiftOver        = false;

var statServed=0, statCorrect=0, statErrors=0, statStreak=0, statBest=0;
var missedLog=[], fillLog=[], morningServed=0, morningCorrect=0;

var queue           = [];
var currentScenario = null;
var selectedDrug    = null;
var dispensed       = false;
var scenarioPool    = [];
var poolIdx         = 0;

function makePatient() {
  // Added waitTicks to track how long they are in line
  return { 
    name: pick(PATIENT_NAMES), 
    avatar: pick(PATIENT_AVATARS), 
    mood: pick(PATIENT_MOODS),
    waitTicks: 0 
  };
}

function initPool() {
  scenarioPool = shuffled(getAllScenarios());
  poolIdx = 0;
}

function nextScenario() {
  if (poolIdx >= scenarioPool.length) { scenarioPool = shuffled(getAllScenarios()); poolIdx = 0; }
  return scenarioPool[poolIdx++];
}

function addToQueue() {
  if (queue.length < 4) { queue.push(makePatient()); renderQueue(); }
}

function renderQueue() {
  var wrap = el("queue-avatars");
  wrap.innerHTML = "";
  if (queue.length === 0) {
    wrap.innerHTML = '<span style="opacity:0.6;font-style:italic;font-size:0.9em;">Nobody waiting...</span>';
    return;
  }
queue.forEach(function(p, i) {
    var div = document.createElement("div");
    div.className = "queue-person" + (i === 0 ? " active" : "");
    
    // Turn their queue bubble red if they are mad
    if (p.mood === "impatient" || p.mood === "angry") {
        div.style.borderColor = "var(--red)";
        div.style.color = "var(--red)";
        div.style.backgroundColor = "var(--red-light)";
    }
    
    div.textContent = p.avatar + " " + p.name;
    wrap.appendChild(div);
  });
}

function renderClock() {
  var h = Math.floor(clockMin/60), m = clockMin%60;
  var ampm = h>=12?"PM":"AM", h12 = h>12?h-12:(h===0?12:h);
  el("clock-display").textContent = h12+":"+(m<10?"0":"")+m+" "+ampm;
  el("clock-display").classList.toggle("near-end", clockMin >= SHIFT_END-10);
}

function startClock() {
  if (clockTick) clearInterval(clockTick);
  clockTick = setInterval(function() {
    if (onLunch || shiftOver) return;
    clockMin++;
    renderClock();

    // --- IMPATIENT LOGIC ---
    let queueChanged = false;
    queue.forEach(function(p) {
      p.waitTicks++;
      // If they wait for 30 ticks and aren't already annoyed:
      if (p.waitTicks === 20 && p.mood !== "angry" && p.mood !== "impatient") {
         p.mood = "impatient";
         queueChanged = true;
      }
    });
    // Re-render the queue so we can see the color change
    if (queueChanged) renderQueue(); 
    // -----------------------

    if (clockMin >= SHIFT_END)   { endShift();   return; }
    if (clockMin >= LUNCH_START) { startLunch(); return; }
  }, TICK_MS);
}

function startGrowth() {
  if (growthTick) clearTimeout(growthTick);
  
  function spawnPatient() {
    if (onLunch || shiftOver) return;
    
    // Add a patient if the queue isn't full (less than 4 people)
    if (queue.length < 4) {
      addToQueue();
    }
    
    // Pick a random time between 10 and 30 seconds (10000ms to 30000ms)
    var nextDelay = 10000 + Math.random() * 20000;
    
    // Schedule the next person
    growthTick = setTimeout(spawnPatient, nextDelay);
  }
  
  // Kick off the very first background spawn
  growthTick = setTimeout(spawnPatient, 10000 + Math.random() * 20000);
}

// ── HOME ──────────────────────────────────────
function initHome() {
  var avatars = ["🧑‍⚕️","👩‍⚕️","👨‍⚕️","🧑‍🔬","👩‍🔬","👨‍🔬"];
  var row = el("avatar-row");
  row.innerHTML = "";
  avatars.forEach(function(a, i) {
    var btn = document.createElement("button");
    btn.className = "avatar-opt" + (i===0?" chosen":"");
    btn.textContent = a;
    btn.onclick = function() {
      document.querySelectorAll(".avatar-opt").forEach(function(b){b.classList.remove("chosen");});
      btn.classList.add("chosen");
      pharmacistAvatar = a;
    };
    row.appendChild(btn);
  });

  el("pharmacist-name").oninput = function() {
    el("home-start-btn").disabled = this.value.trim().length < 2;
  };

  el("home-start-btn").onclick = function() {
    var name = el("pharmacist-name").value.trim();
    if (name.length < 2) return;
    pharmacistName = name;
    var chosen = document.querySelector(".avatar-opt.chosen");
    pharmacistAvatar = chosen ? chosen.textContent : "🧑";
    startShift();
  };
}

// ── START SHIFT ────────────────────────────────
function startShift() {
  if (clockTick)  clearInterval(clockTick);
  if (growthTick) clearInterval(growthTick);

  clockMin=SHIFT_START; onLunch=false; shiftOver=false;
  statServed=0; statCorrect=0; statErrors=0; statStreak=0; statBest=0;
  missedLog=[]; fillLog=[]; morningServed=0; morningCorrect=0;
  queue=[]; currentScenario=null; selectedDrug=null; dispensed=false;

  initPool();

  el("top-pharmacist").textContent = pharmacistAvatar+" "+pharmacistName;
  renderClock();
  updateTopStats();
  buildShelf();

  showScreen("game");

  // Start with two people: one at counter, one waiting
  addToQueue();
  addToQueue();
  serveNext();

  startClock();
  startGrowth();
}

// ── SERVE NEXT PATIENT ─────────────────────────
function serveNext() {
  dispensed    = false;
  selectedDrug = null;
  el("selection-area").classList.remove("show");
  var fb = el("feedback-area");
  fb.className = ""; fb.style.display = "none";
  el("next-patient-btn").classList.remove("show");
  el("hint-area").classList.remove("show");
  el("hint-btn").style.display = "none";
  el("dispense-btn").disabled = false;
  document.querySelectorAll(".drug-shelf-item.selected").forEach(function(e){e.classList.remove("selected");});

  if (queue.length === 0) {
    el("patient-window").style.opacity = "0.5";
    el("complaint-wrap").innerHTML = '<div style="padding:20px 0;color:var(--text-muted);font-style:italic;font-weight:700;font-size:0.9em;">⏳ Waiting for next patient to arrive...</div>';
    el("hint-btn").style.display = "none";
    // Guarantee someone arrives in exactly 3 seconds
    setTimeout(function() {
      addToQueue();
      serveNext();
    }, 3000);
    return;
  }

  var patient = queue.shift();
  renderQueue();
  currentScenario = nextScenario();

  el("patient-window").style.opacity = "1";
  el("patient-emoji").textContent      = patient.avatar;
  el("patient-name-label").textContent = patient.name;
  el("patient-mood").textContent       = patient.mood;

  var wrap = el("complaint-wrap");
  wrap.innerHTML = "";

  if (currentScenario.type === "slip") {
    var slip = document.createElement("div");
    slip.className = "rx-slip";
    var doc = currentScenario.doctor || pick(DOCTOR_NAMES);
    slip.innerHTML = '<div class="rx-slip-header"><span>'+doc+'</span><span>Rx</span></div>'
      +'<div class="rx-slip-body">'+currentScenario.complaint.replace(/\n/g,"<br>")+'</div>'
      +'<div class="rx-slip-tear"></div>';
    wrap.appendChild(slip);
  } else {
    var bubble = document.createElement("div");
    bubble.className = "speech-bubble";
    bubble.textContent = currentScenario.complaint;
    wrap.appendChild(bubble);
  }

  el("hint-btn").style.display = "inline-block";
  updateCounterStrip();
}

// ── SHELF ──────────────────────────────────────
function buildShelf(filter) {
  filter = filter || "";
  var list = el("shelf-list");
  list.innerHTML = "";
  var q = filter.toLowerCase().trim();

  SHELF_CATEGORIES.forEach(function(cat) {
    var drugs = allDrugs.filter(function(d){ return cat.quizzes.indexOf(d.quiz) > -1; });
    var shown = q ? drugs.filter(function(d){
      return d.generic.toLowerCase().indexOf(q)>-1 || d.brand.join(" ").toLowerCase().indexOf(q)>-1;
    }) : drugs;
    if (!shown.length) return;

    var catEl = document.createElement("div");
    catEl.className = "shelf-category";

    var hdr = document.createElement("div");
    hdr.className = "category-header";
    hdr.innerHTML = "<span>"+cat.name+"</span><span class='category-arrow'>▶</span>";

    var drugList = document.createElement("div");
    drugList.className = "category-drugs"+(q?" open":"");
    if (q) hdr.classList.add("open");

    hdr.onclick = function() {
      hdr.classList.toggle("open");
      drugList.classList.toggle("open");
    };

    shown.forEach(function(drug) {
      var item = document.createElement("div");
      item.className = "drug-shelf-item";
      var brands = drug.brand.filter(function(b){return b&&b!=="-";}).slice(0,2).join(", ");
      item.innerHTML = "<div class='drug-shelf-generic'>"+drug.generic+"</div>"+(brands?"<div class='drug-shelf-brand'>"+brands+"</div>":"");
      item.onclick = function() {
        if (dispensed) return;
        document.querySelectorAll(".drug-shelf-item.selected").forEach(function(e){e.classList.remove("selected");});
        item.classList.add("selected");
        selectedDrug = drug;
        el("selected-drug-name").textContent  = drug.generic;
        el("selected-drug-class").textContent = drug.class;
        el("selection-area").classList.add("show");
      };
      drugList.appendChild(item);
    });

    catEl.appendChild(hdr);
    catEl.appendChild(drugList);
    list.appendChild(catEl);
  });

  if (!list.children.length) {
    list.innerHTML = "<div style='color:rgba(255,255,255,0.4);text-align:center;padding:18px;font-size:0.82em;font-weight:700;'>No results for \""+filter+"\"</div>";
  }
}

el("shelf-search").oninput = function() { buildShelf(this.value); };

// ── DISPENSE ───────────────────────────────────
el("dispense-btn").onclick = function() {
  if (!selectedDrug || !currentScenario || dispensed) return;
  dispensed = true;
  el("dispense-btn").disabled = true;

  var sc = currentScenario;
  var isCorrect = sc.correct.some(function(c){ return c.toLowerCase()===selectedDrug.generic.toLowerCase(); });
  var fb = el("feedback-area");
  fb.style.display = "block";

  if (isCorrect) {
    statServed++; statCorrect++; statStreak++;
    if (statStreak > statBest) statBest = statStreak;
    fb.className = "correct";
    fb.innerHTML = "✅ <strong>Correct!</strong> "+sc.rightFeedback;
    el("patient-window").classList.add("dispense-anim");
    setTimeout(function(){el("patient-window").classList.remove("dispense-anim");}, 500);
    addFillLog(selectedDrug.generic, true);
    if (typeof confetti==="function")
      confetti({particleCount:55,spread:65,origin:{y:0.65},colors:["#2d6a4f","#95d5b2","#e9a14a"]});
  } else {
    statServed++; statErrors++; statStreak=0;
    var msg = (sc.wrongFeedback&&(sc.wrongFeedback[selectedDrug.generic]||sc.wrongFeedback["default"])) || "That doesn't seem right.";
    fb.className = "incorrect";
    fb.innerHTML = "❌ <strong>Not quite.</strong> \""+msg+"\"<br><span style='font-size:0.85em;margin-top:5px;display:block;opacity:0.85;'>Correct: <strong>"+sc.correct.join(" or ")+"</strong></span>";
    el("patient-window").classList.add("wrong-anim");
    setTimeout(function(){el("patient-window").classList.remove("wrong-anim");},400);
    missedLog.push({given:selectedDrug.generic, correct:sc.correct.join(", ")});
    addFillLog(selectedDrug.generic, false);
  }

  el("next-patient-btn").classList.add("show");
  updateTopStats();
  updateCounterStrip();
  updateStreakFire();
};

el("hint-btn").onclick = function() {
  if (!currentScenario) return;
  el("hint-text").textContent = "💡 "+currentScenario.hint;
  el("hint-area").classList.add("show");
  el("hint-btn").style.display = "none";
};

el("next-patient-btn").onclick = function() { serveNext(); };

// ── COUNTER STRIP ──────────────────────────────
function updateCounterStrip() {
  if (!currentScenario) return;
  
  // Replace the giveaway line with a generic status:
  el("counter-rx-main").textContent = "Active Prescription"; 
  
  el("counter-rx-sub").textContent  = currentScenario.type==="slip"?"📄 Prescription slip":"💬 Patient at counter";
}

function addFillLog(name, correct) {
  fillLog.unshift({name:name,correct:correct});
  if (fillLog.length>4) fillLog.pop();
  el("log-tape").innerHTML = fillLog.map(function(e){
    return "<div class='log-entry "+(e.correct?"correct-entry":"error-entry")+"'>"+(e.correct?"✓":"✗")+" "+e.name+"</div>";
  }).join("");
}

function updateStreakFire() {
  var fire = el("streak-fire");
  if (statStreak >= 3) { fire.classList.add("show"); fire.innerHTML = "🔥<span>"+statStreak+"</span>"; }
  else fire.classList.remove("show");
}

function updateTopStats() {
  el("stat-served").textContent  = statServed;
  el("stat-correct").textContent = statCorrect;
  el("stat-streak").textContent  = statStreak;
  var pct = statServed>0 ? Math.round((statCorrect/statServed)*100) : 100;
  el("stat-pct").textContent = pct+"%";
}

// ── LUNCH ──────────────────────────────────────
function startLunch() {
  if (onLunch) return;
  onLunch=true; morningServed=statServed; morningCorrect=statCorrect;
  var pct = morningServed>0 ? Math.round((morningCorrect/morningServed)*100) : 100;
  el("break-pharmacist").textContent = pharmacistAvatar+" "+pharmacistName;
  el("break-served").textContent     = morningServed;
  el("break-correct").textContent    = morningCorrect;
  el("break-errors").textContent     = statErrors;
  el("break-streak").textContent     = statBest;
  el("break-pct").textContent        = pct+"%";
  showScreen("break");
}

el("resume-btn").onclick = function() {
  onLunch=false; clockMin=LUNCH_END; renderClock();
  showScreen("game");
  queue=[]; addToQueue(); addToQueue(); renderQueue(); serveNext();
};

// ── CLOSE / HOME / END ─────────────────────────
el("close-early-btn").onclick = function() {
  if (confirm("Close the pharmacy early?")) endShift();
};
el("home-btn").onclick = function() {
  if (confirm("Go back to home? Progress will be lost.")) {
    clearInterval(clockTick); clearInterval(growthTick); showScreen("home");
  }
};

function endShift() {
  clearInterval(clockTick); clearInterval(growthTick); shiftOver=true;
  var pct = statServed>0 ? Math.round((statCorrect/statServed)*100) : 100;
  var stars="⭐⭐⭐⭐⭐", label="Perfect Shift! You're a star pharmacist! 🌟";
  if (pct<95){stars="⭐⭐⭐⭐";label="Excellent! Almost flawless.";}
  if (pct<80){stars="⭐⭐⭐";  label="Good effort! A few to review tonight.";}
  if (pct<65){stars="⭐⭐";   label="Keep studying — you'll get there!";}
  if (pct<50){stars="⭐";     label="Rough day. Hit those flashcards tonight!";}
  el("end-pharmacist").textContent=pharmacistAvatar+" "+pharmacistName;
  el("end-served").textContent=statServed; el("end-correct").textContent=statCorrect;
  el("end-errors").textContent=statErrors; el("end-streak").textContent=statBest;
  el("end-pct").textContent=pct+"%"; el("end-stars").textContent=stars; el("end-rating").textContent=label;
  if (missedLog.length) {
    el("end-missed-section").style.display="block";
    el("end-missed-list").innerHTML=missedLog.slice(0,8).map(function(m){
      return "<div class='missed-item'>❌ Gave <strong>"+m.given+"</strong> — correct: <strong>"+m.correct+"</strong></div>";
    }).join("");
  } else { el("end-missed-section").style.display="none"; }
  showScreen("end");
  if (pct>=80&&typeof confetti==="function")
    setTimeout(function(){confetti({particleCount:140,spread:110,origin:{y:0.5}});},300);
}

el("new-shift-btn").onclick = function() { showScreen("home"); };
el("end-home-btn").onclick  = function() { showScreen("home"); };

function showScreen(name) {
  document.querySelectorAll(".screen").forEach(function(s){s.classList.remove("active");});
  el("screen-"+name).classList.add("active");
}

// ── INIT ───────────────────────────────────────
initHome();
showScreen("home");
