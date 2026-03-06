// ═══════════════════════════════════════════════
// PHARMACY SIM — scenarios.js
// Each scenario has:
//   complaint   : string  — what the patient says at the counter
//   correct     : string[] — correct generic name(s) from drugs.js
//   wrongFeedback: object — keyed by generic, what patient says if wrong drug given
//   rightFeedback: string — what patient says when correct drug given
//   hint        : string  — second clue if student is stuck
//   name        : string  — patient name
//   avatar      : string  — emoji avatar
//   mood        : string  — flavor text mood
// ═══════════════════════════════════════════════

const patientNames = [
  "Margaret", "Carlos", "Diane", "James", "Priya", "Tom", "Linda", "Aisha",
  "Robert", "Sofia", "Kevin", "Janet", "Andre", "Nancy", "Miguel", "Helen",
  "Derek", "Rosa", "Gary", "Wendy", "Victor", "Patricia", "Elijah", "Donna",
  "Marcus", "Barbara", "Tyler", "Gloria", "Sean", "Rita"
];

const patientAvatars = ["👩", "👨", "👴", "👵", "🧑", "👩‍🦳", "👨‍🦳", "🧔", "👩‍🦱", "👨‍🦱"];
const patientMoods   = ["friendly", "nervous", "impatient", "confused", "cheerful", "tired", "anxious"];

const scenarios = [
  // ── ASTHMA / ALLERGIES ──────────────────────────────────────────────────
  {
    complaint: "My doctor just prescribed something for my asthma — it's a rescue inhaler I use when I feel a flare coming on or before I exercise.",
    correct: ["Albuterol"],
    hint: "It's a short-acting beta-2 agonist, the classic blue rescue inhaler.",
    rightFeedback: "Perfect, this is exactly what my doctor prescribed! I keep it in my gym bag.",
    wrongFeedback: {
      "Montelukast": "I don't think that's an inhaler... my doctor specifically said I'd be breathing it in.",
      "Fluticasone (oral inhaled)": "I think that's a steroid inhaler for daily use — mine is for emergencies.",
      "default": "Hmm, I don't think that's my rescue inhaler. Could you double-check?"
    }
  },
  {
    complaint: "I have seasonal allergies — sneezing, runny nose, itchy eyes. My doctor wants something that won't make me drowsy at work.",
    correct: ["Cetirizine", "Fexofenadine"],
    hint: "You're looking for a second-generation antihistamine — they don't cross the blood-brain barrier much.",
    rightFeedback: "Yes! I tried Benadryl once and fell asleep at my desk. This is much better.",
    wrongFeedback: {
      "Hydroxyzine": "I specifically asked for something non-drowsy — that one knocks me out!",
      "Meclizine": "I think that's for motion sickness, not allergies?",
      "default": "That doesn't sound like what my doctor recommended for my allergy symptoms."
    }
  },
  {
    complaint: "I carry one of these pens everywhere — I'm severely allergic to peanuts and my doctor insists I have it on me at all times.",
    correct: ["Epinephrine"],
    hint: "It's an auto-injector for anaphylaxis emergencies.",
    rightFeedback: "Yes! My EpiPen. I never leave home without it. Thank goodness you had it in stock.",
    wrongFeedback: {
      "default": "That's not an emergency injector — I need my anaphylaxis pen!"
    }
  },
  {
    complaint: "My son has asthma and his doctor also wants to control his seasonal allergies at the same time with one daily pill.",
    correct: ["Montelukast"],
    hint: "It's a leukotriene receptor antagonist — works for both asthma maintenance and allergic rhinitis.",
    rightFeedback: "Great, Singulair! His doctor mentioned this could help both conditions at once.",
    wrongFeedback: {
      "Albuterol": "That's a rescue inhaler, not a daily pill. My son needs something for prevention.",
      "default": "I don't think that's what the doctor prescribed for both his asthma and allergies."
    }
  },
  {
    complaint: "I get really dizzy on long car rides. My doctor suggested something over the counter for motion sickness.",
    correct: ["Meclizine"],
    hint: "It's a first-generation antihistamine used specifically for motion sickness and vertigo.",
    rightFeedback: "Perfect, Dramamine! I always get carsick on mountain roads. This should help.",
    wrongFeedback: {
      "Cetirizine": "That's for allergies isn't it? I need something for the dizziness and nausea from moving.",
      "default": "I need something specifically for motion sickness — that doesn't sound right."
    }
  },

  // ── DIABETES ────────────────────────────────────────────────────────────
  {
    complaint: "I was just diagnosed with Type 2 diabetes. My doctor wants to start me on the first-line medication — a pill I take with meals.",
    correct: ["Metformin"],
    hint: "It's a biguanide — the gold standard first-line oral agent for Type 2 diabetes.",
    rightFeedback: "Yes, Glucophage! My doctor said this is usually the first thing they try. Thank you.",
    wrongFeedback: {
      "Glipizide": "My doctor specifically said they wanted to start with the safest first option, not a sulfonylurea.",
      "Sitagliptin": "I think that's a newer class — my doctor said first-line treatment.",
      "default": "My doctor said this would be the standard first choice for Type 2 diabetes. That doesn't match."
    }
  },
  {
    complaint: "I inject myself once a week — it's helping my blood sugar AND I've been losing weight. My doctor says it's one of the newer diabetes drugs.",
    correct: ["Semaglutide", "Dulaglutide"],
    hint: "You're looking for a GLP-1 receptor agonist — the class known for weight loss benefits.",
    rightFeedback: "That's it! My doctor said it's great for both my diabetes and the extra weight I've been carrying.",
    wrongFeedback: {
      "Insulin Glargine": "That's a long-acting insulin — I specifically inject once a week with a different type.",
      "Metformin": "That's a pill, not an injection. I definitely inject this one.",
      "default": "That's not my weekly injectable. I need the one that also helps with weight loss."
    }
  },
  {
    complaint: "My doctor added a new diabetes pill that also protects my heart and kidneys. Something about sodium and glucose.",
    correct: ["Dapagliflozin", "Empagliflozin"],
    hint: "SGLT2 inhibitors — they work by making the kidneys excrete excess glucose in urine, and have cardiovascular and renal protective benefits.",
    rightFeedback: "Yes! My cardiologist and endocrinologist both agreed this was the right add-on for me.",
    wrongFeedback: {
      "Metformin": "I'm already on Metformin — this is an additional medication specifically for heart and kidney protection.",
      "default": "That's not the kidney and heart protective diabetes drug my doctor added."
    }
  },
  {
    complaint: "I have Type 1 diabetes and I need my fast-acting insulin to use right before meals.",
    correct: ["Insulin Aspart"],
    hint: "Rapid-acting insulin — works within 15 minutes, peaks around 1 hour.",
    rightFeedback: "NovoLog, yes! I take it right before I eat to cover the carbs in my meal.",
    wrongFeedback: {
      "Insulin Glargine": "That's my basal insulin — I take that at night. I need the mealtime one.",
      "default": "That's not my mealtime insulin. I need the rapid-acting one."
    }
  },
  {
    complaint: "I take a long-acting insulin once a day at bedtime to keep my blood sugar stable overnight.",
    correct: ["Insulin Glargine"],
    hint: "Long-acting insulin — no peak, provides steady background insulin for ~24 hours.",
    rightFeedback: "Lantus, perfect. One injection at bedtime and I'm covered until morning.",
    wrongFeedback: {
      "Insulin Aspart": "That's the fast-acting one I use at meals — I need my once-daily bedtime insulin.",
      "default": "That's not my basal insulin. I need the long-acting once-daily one."
    }
  },

  // ── CARDIOVASCULAR ──────────────────────────────────────────────────────
  {
    complaint: "I had a heart attack last year and my cardiologist has me on a blood thinner to prevent another one. It's a once-daily tablet.",
    correct: ["Clopidogrel", "Warfarin", "Dabigatran"],
    hint: "Think antiplatelet or anticoagulant therapy after MI.",
    rightFeedback: "Yes, that's my cardiac medication. My cardiologist stressed I should never miss a dose.",
    wrongFeedback: {
      "Aspirin": "My doctor said I need a prescription-strength blood thinner, not just aspirin.",
      "default": "That's not the blood thinner my cardiologist prescribed after my heart attack."
    }
  },
  {
    complaint: "My blood pressure has been high and my doctor started me on an ACE inhibitor. I also have some mild heart failure.",
    correct: ["Lisinopril", "Ramipril", "Enalapril", "Benazepril", "Quinapril"],
    hint: "ACE inhibitors — they end in '-pril' and are first-line for hypertension especially with heart failure.",
    rightFeedback: "That's the one! My doctor said it's good for both my blood pressure and my heart.",
    wrongFeedback: {
      "Losartan": "That's an ARB — similar but my doctor specifically said ACE inhibitor.",
      "Amlodipine": "That's a calcium channel blocker, not an ACE inhibitor.",
      "default": "That's not my ACE inhibitor for blood pressure and heart failure."
    }
  },
  {
    complaint: "My doctor prescribed a calcium channel blocker for my hypertension and angina. Just one pill a day.",
    correct: ["Amlodipine"],
    hint: "It's a dihydropyridine CCB — the most commonly prescribed one, once daily.",
    rightFeedback: "Norvasc, perfect. My doctor said it would help with both my blood pressure and chest pain.",
    wrongFeedback: {
      "Diltiazem": "I think that's a different type of calcium channel blocker — mine is Norvasc.",
      "Metoprolol": "That's a beta-blocker, not a calcium channel blocker.",
      "default": "That's not my calcium channel blocker for blood pressure and angina."
    }
  },
  {
    complaint: "My legs swell up and my doctor prescribed a water pill to help with the fluid. It's a strong loop diuretic.",
    correct: ["Furosemide"],
    hint: "The most commonly used loop diuretic — works on the loop of Henle.",
    rightFeedback: "Lasix! Yes, my doctor said this would help drain the extra fluid from my legs.",
    wrongFeedback: {
      "Hydrochlorothiazide": "That's a thiazide diuretic — my doctor specified a loop diuretic for my fluid levels.",
      "Spironolactone": "That's a potassium-sparing diuretic, not the strong loop diuretic I need.",
      "default": "That's not the loop diuretic my doctor prescribed for my swollen legs."
    }
  },
  {
    complaint: "My cholesterol is really high. My doctor wants me on the strongest statin available.",
    correct: ["Atorvastatin", "Rosuvastatin"],
    hint: "High-intensity statins — these two are the most potent LDL reducers in the class.",
    rightFeedback: "That's it! My doctor said this one would give me the most LDL reduction.",
    wrongFeedback: {
      "Simvastatin": "My doctor said that one isn't strong enough for my cholesterol levels.",
      "Lovastatin": "That's a lower-intensity statin — I need the strongest one.",
      "default": "That's not the high-intensity statin my doctor prescribed."
    }
  },
  {
    complaint: "I have atrial fibrillation and my doctor put me on a blood thinner to prevent a stroke. It doesn't need regular blood tests.",
    correct: ["Dabigatran", "Warfarin"],
    hint: "Think DOACs for AFib stroke prevention — dabigatran is the direct thrombin inhibitor.",
    rightFeedback: "Yes! My doctor said unlike Warfarin, I don't have to come in every month for blood tests.",
    wrongFeedback: {
      "Warfarin": "My doctor specifically chose one that doesn't need regular INR monitoring.",
      "Clopidogrel": "That's an antiplatelet, not an anticoagulant — I need something stronger for AFib.",
      "default": "That's not the anticoagulant my doctor prescribed for my AFib."
    }
  },
  {
    complaint: "I have angina and my doctor gave me these little tablets I put under my tongue when chest pain hits.",
    correct: ["Nitroglycerin"],
    hint: "Sublingual nitrate — fast-acting vasodilator for acute angina episodes.",
    rightFeedback: "Yes! My doctor said to put it under my tongue immediately when I feel chest pressure.",
    wrongFeedback: {
      "Isosorbide Mononitrate": "That's the long-acting nitrate for prevention — I need the emergency sublingual one.",
      "default": "That's not my sublingual angina medication."
    }
  },
  {
    complaint: "My heart failure doctor added a potassium-sparing diuretic that also blocks aldosterone. It helps my heart failure and prevents fluid buildup.",
    correct: ["Spironolactone"],
    hint: "Aldosterone antagonist — potassium-sparing diuretic used in heart failure.",
    rightFeedback: "Aldactone! Yes, my cardiologist said this one actually helps the heart muscle itself, not just removes fluid.",
    wrongFeedback: {
      "Furosemide": "That's my loop diuretic — I'm already on that. This is an additional one that spares potassium.",
      "default": "That's not the aldosterone-blocking diuretic for my heart failure."
    }
  },

  // ── PAIN / NSAIDS ───────────────────────────────────────────────────────
  {
    complaint: "I have rheumatoid arthritis and my doctor wants an NSAID that's easier on my stomach than regular ibuprofen.",
    correct: ["Celecoxib"],
    hint: "COX-2 selective inhibitor — targets inflammation with less GI risk than traditional NSAIDs.",
    rightFeedback: "Celebrex! Yes, my doctor said this one is much gentler on my stomach. I had ulcers before.",
    wrongFeedback: {
      "Ibuprofen": "My doctor specifically said NOT to take regular ibuprofen because of my stomach history.",
      "Naproxen": "That's still a non-selective NSAID — I need the COX-2 selective one.",
      "default": "That's not the stomach-friendly NSAID my doctor prescribed."
    }
  },
  {
    complaint: "I have gout and my doctor wants me on a medication to lower my uric acid levels long-term.",
    correct: ["Allopurinol"],
    hint: "Xanthine oxidase inhibitor — reduces uric acid production, used for gout prevention.",
    rightFeedback: "Zyloprim! My doctor said this will prevent future gout attacks by keeping my uric acid low.",
    wrongFeedback: {
      "Colchicine": "That's for treating acute gout attacks — I need the preventive one that lowers uric acid.",
      "Indomethacin": "That's an NSAID for pain — I need the long-term uric acid reducer.",
      "default": "That's not the uric acid-lowering medication for my gout prevention."
    }
  },
  {
    complaint: "I threw my back out and my doctor prescribed a muscle relaxer. Something for the spasms.",
    correct: ["Cyclobenzaprine", "Baclofen"],
    hint: "Centrally-acting skeletal muscle relaxants — used for acute muscle spasm.",
    rightFeedback: "That's it! My doctor said to take it at night since it can make you sleepy.",
    wrongFeedback: {
      "Ibuprofen": "That's just an anti-inflammatory — I need something specifically for the muscle spasms.",
      "default": "That's not the muscle relaxant my doctor prescribed for my back spasms."
    }
  },
  {
    complaint: "I have severe chronic pain and my doctor prescribed a fentanyl patch I change every 72 hours.",
    correct: ["Fentanyl (Transdermal)"],
    hint: "Transdermal opioid — provides continuous pain relief through the skin over 3 days.",
    rightFeedback: "Yes, the Duragesic patch. My pain management doctor is very specific about how I apply it.",
    wrongFeedback: {
      "Morphine": "That's oral morphine — I specifically use the patch that lasts 3 days.",
      "default": "That's not my 72-hour fentanyl patch."
    }
  },
  {
    complaint: "I have nerve pain from my diabetes — a burning, tingling sensation in my feet. My doctor prescribed something for neuropathic pain.",
    correct: ["Gabapentin", "Pregabalin", "Duloxetine"],
    hint: "Think anticonvulsants or SNRIs — several options are approved for diabetic peripheral neuropathy.",
    rightFeedback: "Yes! My doctor said this should help with that horrible burning feeling in my feet.",
    wrongFeedback: {
      "Ibuprofen": "Regular pain relievers don't work well for nerve pain — I need something specific for neuropathy.",
      "default": "That's not what my doctor prescribed for my diabetic nerve pain."
    }
  },

  // ── MENTAL HEALTH ────────────────────────────────────────────────────────
  {
    complaint: "I've been diagnosed with depression and my doctor wants to start me on an SSRI. She said it's one of the most commonly prescribed ones.",
    correct: ["Sertraline", "Escitalopram", "Fluoxetine", "Citalopram", "Paroxetine"],
    hint: "SSRIs — selective serotonin reuptake inhibitors. Several options here.",
    rightFeedback: "That's the one! My doctor said it may take a few weeks to feel the full effect.",
    wrongFeedback: {
      "Venlafaxine": "That's an SNRI — my doctor specifically said SSRI for me.",
      "Amitriptyline": "That's an older tricyclic antidepressant — my doctor wanted a newer SSRI.",
      "default": "That's not the SSRI my doctor prescribed for my depression."
    }
  },
  {
    complaint: "I have generalized anxiety and depression. My doctor chose an antidepressant that works on both serotonin and norepinephrine.",
    correct: ["Duloxetine", "Venlafaxine"],
    hint: "SNRIs — serotonin-norepinephrine reuptake inhibitors. Good for both anxiety and depression.",
    rightFeedback: "Yes! My doctor said this class works better for my combination of anxiety and depression.",
    wrongFeedback: {
      "Sertraline": "That's an SSRI — my doctor specifically chose a dual-action medication.",
      "default": "That's not my SNRI for anxiety and depression."
    }
  },
  {
    complaint: "I have bipolar disorder and my psychiatrist has me on a mood stabilizer. I need regular blood tests to monitor the levels.",
    correct: ["Lithium", "Divalproex"],
    hint: "Classic mood stabilizers for bipolar disorder — both require therapeutic drug monitoring.",
    rightFeedback: "Yes, that's my mood stabilizer. My psychiatrist checks my levels every few months.",
    wrongFeedback: {
      "Quetiapine": "That's an antipsychotic add-on — I need my primary mood stabilizer that requires blood monitoring.",
      "default": "That's not my mood stabilizer for bipolar disorder."
    }
  },
  {
    complaint: "I have schizophrenia and my doctor put me on a second-generation antipsychotic. I take it every day.",
    correct: ["Aripiprazole", "Olanzapine", "Risperidone", "Quetiapine"],
    hint: "Atypical antipsychotics — second-generation agents used for schizophrenia.",
    rightFeedback: "Yes, that's my antipsychotic. My doctor said it has fewer side effects than the older ones.",
    wrongFeedback: {
      "Lithium": "That's a mood stabilizer — I need my antipsychotic medication.",
      "default": "That's not my antipsychotic medication."
    }
  },
  {
    complaint: "I have really bad anxiety and trouble sleeping due to it. My doctor gave me a short-term prescription for a benzodiazepine.",
    correct: ["Alprazolam", "Lorazepam", "Diazepam", "Clonazepam"],
    hint: "Benzodiazepines — controlled substances used for anxiety and sleep. Schedule IV.",
    rightFeedback: "That's it. My doctor was very clear this is just for short-term use.",
    wrongFeedback: {
      "Buspirone": "That one takes weeks to work — my doctor gave me something for immediate relief.",
      "Zolpidem": "That's more for sleep specifically — I need something for my anxiety.",
      "default": "That's not the benzodiazepine my doctor prescribed for my anxiety."
    }
  },
  {
    complaint: "My doctor prescribed something for my depression that also helps me quit smoking. It's not an SSRI.",
    correct: ["Bupropion"],
    hint: "Monocyclic antidepressant — also marketed as Zyban for smoking cessation.",
    rightFeedback: "Wellbutrin! My doctor said it's a two-for-one since I've been trying to quit smoking too.",
    wrongFeedback: {
      "Sertraline": "That's an SSRI — my doctor specifically chose one that also helps with smoking cessation.",
      "Varenicline": "That's purely for smoking cessation — mine also treats my depression.",
      "default": "That's not the antidepressant that also helps with smoking cessation."
    }
  },
  {
    complaint: "I have ADHD and my doctor prescribed a non-stimulant medication since I have a history of substance abuse.",
    correct: ["Atomoxetine"],
    hint: "Non-stimulant ADHD medication — norepinephrine reuptake inhibitor, not a controlled substance.",
    rightFeedback: "Strattera! My doctor said this was the right choice given my history. No abuse potential.",
    wrongFeedback: {
      "Lisdexamfetamine": "That's a stimulant controlled substance — my doctor specifically said non-stimulant.",
      "Methylphenidate": "That's also a stimulant — I need the non-controlled option.",
      "default": "That's not the non-stimulant ADHD medication my doctor prescribed."
    }
  },

  // ── ANTIBIOTICS ─────────────────────────────────────────────────────────
  {
    complaint: "I have a UTI and my doctor called in an antibiotic. She said it's specific to urinary tract infections and shouldn't be used for other infections.",
    correct: ["Nitrofurantoin", "Trimethoprim-Sulfamethoxazole"],
    hint: "First-line UTI antibiotics — nitrofurantoin works only in the urinary tract.",
    rightFeedback: "Yes! My doctor said this one concentrates specifically in the urine where I need it.",
    wrongFeedback: {
      "Ciprofloxacin (oral)": "My doctor said she wanted to save the fluoroquinolones — she picked a UTI-specific one.",
      "Amoxicillin": "That's not typically first-line for UTIs anymore due to resistance.",
      "default": "That's not the UTI-specific antibiotic my doctor prescribed."
    }
  },
  {
    complaint: "My kid has strep throat and the pediatrician called in an antibiotic. My child is not allergic to penicillin.",
    correct: ["Amoxicillin", "Penicillin", "Cephalexin"],
    hint: "First-line for strep pharyngitis — beta-lactam antibiotics.",
    rightFeedback: "Perfect! The pediatrician said 10 days of this and he should be all better.",
    wrongFeedback: {
      "Azithromycin": "That's for penicillin-allergic patients — my child can take penicillin-type antibiotics.",
      "Ciprofloxacin (oral)": "That's a fluoroquinolone — way too strong for a child's strep throat.",
      "default": "That's not the right antibiotic for strep throat in a child without penicillin allergy."
    }
  },
  {
    complaint: "I have a skin infection and my doctor prescribed an antibiotic that also treats my acne. It's a tetracycline.",
    correct: ["Doxycycline"],
    hint: "Tetracycline antibiotic — broad spectrum, used for skin infections and acne vulgaris.",
    rightFeedback: "Vibramycin! My doctor said to take it with food and stay out of the sun.",
    wrongFeedback: {
      "Clindamycin (oral)": "That's a lincosamide — I need the tetracycline class specifically.",
      "Azithromycin": "That's a macrolide — my doctor said tetracycline for my skin.",
      "default": "That's not the tetracycline antibiotic my doctor prescribed."
    }
  },
  {
    complaint: "I have a community-acquired pneumonia and my doctor prescribed a macrolide antibiotic for 5 days.",
    correct: ["Azithromycin"],
    hint: "Z-Pak — the classic 5-day macrolide course for respiratory infections.",
    rightFeedback: "The Z-Pak! My doctor said 5 days is all I need for this type of pneumonia.",
    wrongFeedback: {
      "Amoxicillin": "That's a penicillin — my doctor specifically said macrolide antibiotic.",
      "Levofloxacin": "That's a fluoroquinolone — my doctor chose the macrolide for my pneumonia.",
      "default": "That's not the macrolide antibiotic my doctor prescribed for my pneumonia."
    }
  },
  {
    complaint: "I have a yeast infection and my doctor prescribed a one-time oral antifungal pill.",
    correct: ["Fluconazole"],
    hint: "Azole antifungal — a single oral dose treats most vaginal candidiasis.",
    rightFeedback: "Diflucan! Just one pill and the yeast infection should clear up within a few days.",
    wrongFeedback: {
      "Metronidazole": "That's for bacterial vaginosis — I need the antifungal for a yeast infection.",
      "Clindamycin (oral)": "That's an antibiotic — yeast infections need antifungal treatment.",
      "default": "That's not the antifungal pill for my yeast infection."
    }
  },
  {
    complaint: "I had unprotected contact and I'm worried about herpes. My doctor prescribed an antiviral to suppress outbreaks.",
    correct: ["Valacyclovir"],
    hint: "Antiviral prodrug — used for herpes simplex suppression and treatment.",
    rightFeedback: "Valtrex. My doctor said taking this daily can reduce the frequency of outbreaks significantly.",
    wrongFeedback: {
      "Fluconazole": "That's an antifungal — I need an antiviral for herpes.",
      "Oseltamivir": "That's for influenza — I need the herpes antiviral.",
      "default": "That's not the antiviral my doctor prescribed for herpes."
    }
  },
  {
    complaint: "I have the flu and my doctor wants to shorten how long I'm sick. I started feeling bad just yesterday.",
    correct: ["Oseltamivir"],
    hint: "Neuraminidase inhibitor — must be started within 48 hours of flu symptom onset.",
    rightFeedback: "Tamiflu! My doctor said I caught it early enough that this should help a lot.",
    wrongFeedback: {
      "Azithromycin": "The flu is viral — antibiotics won't help. I need the antiviral.",
      "default": "That's not the flu antiviral my doctor prescribed."
    }
  },

  // ── GI / STOMACH ────────────────────────────────────────────────────────
  {
    complaint: "I have terrible acid reflux and my doctor put me on a proton pump inhibitor. I take it every morning before breakfast.",
    correct: ["Omeprazole", "Esomeprazole", "Pantoprazole", "Lansoprazole"],
    hint: "PPIs — proton pump inhibitors. Several options, all reduce stomach acid production.",
    rightFeedback: "Yes, that's my acid reflux medication. My doctor said to take it 30-60 minutes before eating.",
    wrongFeedback: {
      "Famotidine": "That's an H2 blocker — my doctor specifically prescribed a proton pump inhibitor.",
      "default": "That's not the proton pump inhibitor my doctor prescribed for my acid reflux."
    }
  },
  {
    complaint: "I get heartburn occasionally and my doctor said I can use an H2 blocker as needed — something milder than a PPI.",
    correct: ["Famotidine"],
    hint: "H2 receptor antagonist — Pepcid. Works faster than PPIs but less potent.",
    rightFeedback: "Pepcid! My doctor said I can take it as needed since my reflux isn't that severe.",
    wrongFeedback: {
      "Omeprazole": "My doctor said I only need an H2 blocker — I don't need the stronger PPI.",
      "default": "That's not the H2 blocker my doctor recommended for occasional heartburn."
    }
  },
  {
    complaint: "I have severe nausea and vomiting from my chemotherapy. My doctor prescribed an antiemetic.",
    correct: ["Ondansetron"],
    hint: "5-HT3 receptor antagonist — Zofran, a powerful antiemetic used in chemotherapy.",
    rightFeedback: "Zofran! My oncologist said this is specifically designed for chemo-related nausea.",
    wrongFeedback: {
      "Promethazine": "That's another antiemetic but my doctor chose the one specifically for chemo nausea.",
      "default": "That's not the antiemetic my oncologist prescribed for chemotherapy nausea."
    }
  },

  // ── RESPIRATORY ─────────────────────────────────────────────────────────
  {
    complaint: "I have COPD and my doctor added a once-daily inhaler — a long-acting anticholinergic bronchodilator.",
    correct: ["Tiotropium"],
    hint: "LAMA — long-acting muscarinic antagonist. Spiriva is the brand name.",
    rightFeedback: "Spiriva HandiHaler! My pulmonologist said this should open my airways all day long.",
    wrongFeedback: {
      "Albuterol": "That's my rescue inhaler — I need my once-daily COPD maintenance inhaler.",
      "Fluticasone (oral inhaled)": "That's an inhaled steroid — I need the long-acting anticholinergic bronchodilator.",
      "default": "That's not the long-acting anticholinergic inhaler for my COPD."
    }
  },
  {
    complaint: "My doctor prescribed a combination inhaler that has both a steroid and a long-acting bronchodilator for my asthma.",
    correct: ["Fluticasone/salmeterol", "Budesonide/formoterol"],
    hint: "ICS/LABA combination inhalers — Advair or Symbicort are the main ones.",
    rightFeedback: "Yes, my combination inhaler! My doctor said the steroid reduces inflammation and the other part keeps airways open.",
    wrongFeedback: {
      "Albuterol": "That's just a rescue inhaler — I need my daily combination preventer inhaler.",
      "Fluticasone (oral inhaled)": "That's only the steroid component — I need the combination with the bronchodilator.",
      "default": "That's not my combination ICS/LABA inhaler for asthma."
    }
  },
  {
    complaint: "I have nasal allergies and my doctor prescribed a nasal steroid spray to reduce the inflammation.",
    correct: ["Fluticasone (nasal)", "Mometasone (nasal)"],
    hint: "Intranasal corticosteroids — Flonase or Nasonex. Used daily for allergic rhinitis.",
    rightFeedback: "Yes! My doctor said to spray it every morning and it should reduce my congestion within a week.",
    wrongFeedback: {
      "Cetirizine": "That's an oral antihistamine — my doctor specifically prescribed a nasal spray steroid.",
      "default": "That's not the nasal steroid spray my doctor prescribed."
    }
  },
  {
    complaint: "I'm trying to quit smoking and my doctor prescribed a non-nicotine pill that helps reduce cravings.",
    correct: ["Varenicline"],
    hint: "Smoking cessation agent — Chantix. Partial nicotine receptor agonist.",
    rightFeedback: "Chantix! My doctor said to start taking it a week before my quit date.",
    wrongFeedback: {
      "Bupropion": "That's another smoking cessation option but my doctor specifically chose the receptor agonist one.",
      "default": "That's not the smoking cessation medication my doctor prescribed."
    }
  },

  // ── THYROID / HORMONES ──────────────────────────────────────────────────
  {
    complaint: "I have an underactive thyroid and I take a hormone replacement pill every morning on an empty stomach.",
    correct: ["Levothyroxine"],
    hint: "Synthetic thyroid hormone — Synthroid. Must be taken consistently on an empty stomach.",
    rightFeedback: "Synthroid! My endocrinologist is very specific — I take it 30 minutes before breakfast, no exceptions.",
    wrongFeedback: {
      "Thyroid desiccated": "My doctor uses the synthetic version specifically — Synthroid.",
      "default": "That's not my thyroid hormone replacement medication."
    }
  },
  {
    complaint: "I'm going through menopause and my doctor prescribed estrogen to help with my hot flashes and night sweats.",
    correct: ["Conjugated estrogen", "Estradiol"],
    hint: "Estrogen replacement therapy — Premarin or Estrace for menopausal symptoms.",
    rightFeedback: "Yes! My doctor said this should really help with those terrible hot flashes.",
    wrongFeedback: {
      "Raloxifene": "That's a SERM — it actually doesn't help with hot flashes the way estrogen does.",
      "default": "That's not the estrogen therapy my doctor prescribed for my menopause symptoms."
    }
  },
  {
    complaint: "My doctor prescribed a bisphosphonate for my osteoporosis. I take it once a week and have to stay upright for 30 minutes after.",
    correct: ["Alendronate", "Risedronate"],
    hint: "Weekly bisphosphonates — Fosamax or Actonel. Strict administration requirements.",
    rightFeedback: "Yes! My doctor was very specific — take it first thing in the morning with a full glass of water and don't lie down.",
    wrongFeedback: {
      "Ibandronate": "That one is monthly — mine is weekly.",
      "Raloxifene": "That's a SERM, not a bisphosphonate — different class.",
      "default": "That's not my weekly bisphosphonate for osteoporosis."
    }
  },

  // ── NEUROLOGY ───────────────────────────────────────────────────────────
  {
    complaint: "I have epilepsy and my doctor controls my seizures with an anticonvulsant that also helps prevent my migraines.",
    correct: ["Topiramate", "Divalproex"],
    hint: "Anticonvulsants with dual FDA approval for epilepsy AND migraine prevention.",
    rightFeedback: "Yes! My neurologist loves that one medication handles both my seizures and migraines.",
    wrongFeedback: {
      "Levetiracetam": "That one isn't approved for migraine prevention — I need the dual-purpose one.",
      "Sumatriptan": "That treats acute migraines, not prevents them — and doesn't help my seizures.",
      "default": "That's not my anticonvulsant that also prevents migraines."
    }
  },
  {
    complaint: "I have Parkinson's disease and my neurologist put me on the gold standard treatment — a combination pill.",
    correct: ["Carbidopa/levodopa"],
    hint: "Levodopa combined with carbidopa to reduce peripheral side effects — Sinemet.",
    rightFeedback: "Sinemet! My neurologist said this is still the most effective treatment for my Parkinson's symptoms.",
    wrongFeedback: {
      "Pramipexole": "That's a dopamine agonist — my doctor said for my stage we should use the gold standard combination.",
      "default": "That's not my Parkinson's medication."
    }
  },
  {
    complaint: "I get terrible migraines and when one hits, my doctor prescribed something to take immediately to stop it.",
    correct: ["Sumatriptan"],
    hint: "Triptan — serotonin receptor agonist that constricts blood vessels during a migraine.",
    rightFeedback: "Imitrex! My doctor said to take it at the first sign of a migraine — don't wait until it's severe.",
    wrongFeedback: {
      "Topiramate": "That's a migraine preventive — I need the one to stop an active migraine.",
      "Ibuprofen": "Regular painkillers don't work well for my migraines — I need the triptan.",
      "default": "That's not my acute migraine medication."
    }
  },
  {
    complaint: "My father has Alzheimer's and his neurologist prescribed a cholinesterase inhibitor to slow the progression.",
    correct: ["Donepezil"],
    hint: "Central cholinesterase inhibitor — Aricept, the most widely used Alzheimer's medication.",
    rightFeedback: "Aricept! His neurologist said it won't cure it but may slow down the memory decline.",
    wrongFeedback: {
      "Memantine": "That works differently — my father is on the cholinesterase inhibitor for his stage.",
      "default": "That's not the Alzheimer's cholinesterase inhibitor his neurologist prescribed."
    }
  },

  // ── UROLOGY / MEN'S HEALTH ──────────────────────────────────────────────
  {
    complaint: "I have an enlarged prostate and trouble urinating. My doctor prescribed an alpha-blocker to relax the muscles.",
    correct: ["Tamsulosin", "Doxazosin", "Terazosin"],
    hint: "Alpha-1 adrenergic blockers — relax smooth muscle in prostate and bladder neck.",
    rightFeedback: "Yes! My urologist said this should make urinating much easier within a few days.",
    wrongFeedback: {
      "Finasteride": "That one shrinks the prostate over months — I need the one that works quickly on the muscles.",
      "Sildenafil": "That's for erectile dysfunction — I need help with urinary flow from my enlarged prostate.",
      "default": "That's not the alpha-blocker my urologist prescribed for my BPH."
    }
  },
  {
    complaint: "My doctor prescribed something for erectile dysfunction. I'd like it to work for up to 36 hours so I have more flexibility.",
    correct: ["Tadalafil"],
    hint: "PDE-5 inhibitor — Cialis. Known as the 'weekend pill' due to its 36-hour duration.",
    rightFeedback: "Cialis! My doctor mentioned the 36-hour window gives me much more flexibility than the others.",
    wrongFeedback: {
      "Sildenafil": "That one only lasts 4-6 hours — I specifically asked for the longer-lasting option.",
      "default": "That's not the long-acting ED medication I requested."
    }
  },
  {
    complaint: "I have an overactive bladder — I need to rush to the bathroom constantly. My doctor prescribed something to calm the bladder muscle.",
    correct: ["Tolterodine", "Oxybutynin"],
    hint: "Antimuscarinics / urinary antispasmodics — reduce bladder contractions.",
    rightFeedback: "Yes! My doctor said this will reduce those urgent bladder contractions throughout the day.",
    wrongFeedback: {
      "Tamsulosin": "That's for enlarged prostate — I need something for overactive bladder muscle.",
      "default": "That's not the overactive bladder medication my doctor prescribed."
    }
  },

  // ── WOMEN'S HEALTH ──────────────────────────────────────────────────────
  {
    complaint: "I need my monthly contraceptive shot. My doctor uses this to both prevent pregnancy and treat my endometriosis.",
    correct: ["Medroxyprogesterone"],
    hint: "Depo-Provera — injectable progestin for contraception and endometriosis.",
    rightFeedback: "Depo-Provera! I come in every 3 months for my shot. Very convenient.",
    wrongFeedback: {
      "Ethinyl estradiol (vaginal ring)": "That's the NuvaRing — I use the injection, not the ring.",
      "default": "That's not my injectable contraceptive."
    }
  },
  {
    complaint: "I want to start on the pill for contraception. My doctor called in a prescription for oral contraceptives.",
    correct: ["Oral contraceptives"],
    hint: "Combined oral contraceptive pills — estrogen and progestin combination.",
    rightFeedback: "Perfect! My doctor said to start on the first Sunday after my period begins.",
    wrongFeedback: {
      "Medroxyprogesterone": "That's the shot — I specifically want the daily pill.",
      "default": "That's not the oral contraceptive my doctor prescribed."
    }
  },

  // ── SKIN ────────────────────────────────────────────────────────────────
  {
    complaint: "I have impetigo on my arm — my doctor prescribed a topical antibiotic ointment to apply directly.",
    correct: ["Mupirocin"],
    hint: "Bactroban — topical antibiotic specifically used for impetigo and skin infections.",
    rightFeedback: "Bactroban! My doctor said to apply it three times a day until the sores are completely gone.",
    wrongFeedback: {
      "Clindamycin (topical)": "That's for acne — I need the one specifically for impetigo.",
      "Clobetasol": "That's a steroid cream — I need an antibiotic for a bacterial skin infection.",
      "default": "That's not the topical antibiotic for my impetigo."
    }
  },
  {
    complaint: "I have severe plaque psoriasis and my dermatologist prescribed a very strong topical steroid.",
    correct: ["Clobetasol"],
    hint: "Super-potent topical corticosteroid — Temovate, class I steroid for severe psoriasis.",
    rightFeedback: "Temovate! My dermatologist said this is one of the strongest topical steroids available.",
    wrongFeedback: {
      "Hydrocortisone (topical)": "That's a mild steroid — I need the strongest class for my severe psoriasis.",
      "Mupirocin": "That's an antibiotic — I need a steroid for my psoriasis.",
      "default": "That's not the super-potent steroid my dermatologist prescribed."
    }
  },

  // ── MISC / RHEUMATOLOGY ─────────────────────────────────────────────────
  {
    complaint: "I have lupus and my rheumatologist has me on an antimalarial drug that also treats autoimmune conditions.",
    correct: ["Hydroxychloroquine"],
    hint: "Plaquenil — aminoquinoline originally for malaria, now widely used for lupus and rheumatoid arthritis.",
    rightFeedback: "Plaquenil! My rheumatologist says it's a cornerstone treatment for lupus. I get my eyes checked regularly because of it.",
    wrongFeedback: {
      "Methotrexate": "That's an antimetabolite — my rheumatologist specifically chose the antimalarial for my lupus.",
      "Prednisone": "That's a steroid — I take that too but this is my different lupus medication.",
      "default": "That's not the antimalarial my rheumatologist prescribed for my lupus."
    }
  },
  {
    complaint: "I have rheumatoid arthritis and my doctor prescribed a disease-modifying drug — it can also be used for certain cancers.",
    correct: ["Methotrexate"],
    hint: "Antimetabolite DMARD — used at low doses for RA and psoriasis, at high doses for cancer.",
    rightFeedback: "Trexall. My rheumatologist said at the low dose I take it's very effective for joint inflammation.",
    wrongFeedback: {
      "Hydroxychloroquine": "That's the antimalarial DMARD — I need the antimetabolite one.",
      "Prednisone": "That's a steroid for short-term flares — my DMARD is for long-term disease modification.",
      "default": "That's not the DMARD my rheumatologist prescribed for my RA."
    }
  },
  {
    complaint: "I have glaucoma and my eye doctor prescribed eye drops to reduce my eye pressure. I use them every evening.",
    correct: ["Latanoprost", "Bimatoprost"],
    hint: "Prostaglandin analog eye drops — reduce intraocular pressure by increasing aqueous outflow.",
    rightFeedback: "Yes! My ophthalmologist said one drop each evening should keep my eye pressure in check.",
    wrongFeedback: {
      "default": "That's not the glaucoma eye drops my ophthalmologist prescribed."
    }
  },
  {
    complaint: "I have HIV and my doctor put me on a combination antiretroviral therapy to prevent the virus from replicating.",
    correct: ["Emtricitabine/tenofovir", "Efavirenz"],
    hint: "Antiretroviral agents — reverse transcriptase inhibitors used in HIV treatment.",
    rightFeedback: "Yes, that's part of my HIV regimen. My doctor said I need to take it every single day without fail.",
    wrongFeedback: {
      "default": "That's not my HIV antiretroviral medication."
    }
  },
  {
    complaint: "My doctor wants me to start PrEP — I'm HIV-negative but at high risk and want protection.",
    correct: ["Emtricitabine/tenofovir"],
    hint: "Truvada — the combination NRTI used for pre-exposure prophylaxis.",
    rightFeedback: "Truvada! My doctor said taken daily it's over 99% effective at preventing HIV transmission.",
    wrongFeedback: {
      "Efavirenz": "That one is for treatment of HIV — I need the PrEP medication for prevention.",
      "default": "That's not the PrEP medication my doctor prescribed."
    }
  },
  {
    complaint: "I have a cough that won't go away. My doctor said it's not infectious — just wants something to suppress it.",
    correct: ["Benzonatate"],
    hint: "Tessalon Perles — non-narcotic antitussive. Works by anesthetizing stretch receptors in the lungs.",
    rightFeedback: "Tessalon Perles! My doctor said to swallow them whole — don't chew or they'll numb my mouth.",
    wrongFeedback: {
      "Codeine": "My doctor specifically chose a non-narcotic cough suppressant.",
      "default": "That's not the cough suppressant my doctor prescribed."
    }
  },
  {
    complaint: "I have burning when I urinate but my urine culture hasn't come back yet. My doctor prescribed something just for the pain.",
    correct: ["Phenazopyridine"],
    hint: "Urinary analgesic — Pyridium. Relieves burning and urgency but does NOT treat infection.",
    rightFeedback: "Pyridium! My doctor warned me it will turn my urine orange — apparently that's totally normal.",
    wrongFeedback: {
      "Nitrofurantoin": "That's the antibiotic for the infection — my culture isn't back yet, so for now just the pain reliever.",
      "default": "That's not the urinary pain reliever my doctor prescribed."
    }
  },
];

// Utility: get a random patient name/avatar/mood for each encounter
function randomPatient() {
  return {
    name:   patientNames[Math.floor(Math.random() * patientNames.length)],
    avatar: patientAvatars[Math.floor(Math.random() * patientAvatars.length)],
    mood:   patientMoods[Math.floor(Math.random() * patientMoods.length)],
  };
}
