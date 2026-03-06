// ═══════════════════════════════════════════════
// PHARMACY SIM — scenarios.js
//
// Two types of scenarios:
//   1. handwrittenScenarios — fully crafted, natural speech, specific feedback
//   2. Procedural generation — buildProceduralScenarios() generates
//      both natural-speech AND prescription-slip scenarios from drug data
//
// Final export: getAllScenarios() merges both pools
// ═══════════════════════════════════════════════

// ── Patient name / avatar / mood pools ───────────────────────────────────
const PATIENT_NAMES = [
  "Margaret","Carlos","Diane","James","Priya","Tom","Linda","Aisha",
  "Robert","Sofia","Kevin","Janet","Andre","Nancy","Miguel","Helen",
  "Derek","Rosa","Gary","Wendy","Victor","Patricia","Elijah","Donna",
  "Marcus","Barbara","Tyler","Gloria","Sean","Rita","Harold","Cynthia",
  "Dennis","Yolanda","Frank","Brenda","Omar","Tanya","Phil","Keisha"
];
const PATIENT_AVATARS = ["👩","👨","👴","👵","🧑","👩‍🦳","👨‍🦳","🧔","👩‍🦱","👨‍🦱","👩‍🦰","👨‍🦰"];
const PATIENT_MOODS   = ["friendly","nervous","impatient","confused","cheerful","tired","anxious","in a hurry"];
const DOCTOR_NAMES    = ["Dr. Patel","Dr. Chen","Dr. Williams","Dr. Rivera","Dr. Okafor","Dr. Kim","Dr. Nguyen","Dr. Martinez"];

// Internal helper (script.js also defines randomFrom — this one is for scenarios.js only)
function scenPick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function randomPatient() {
  return {
    name:   scenPick(PATIENT_NAMES),
    avatar: scenPick(PATIENT_AVATARS),
    mood:   scenPick(PATIENT_MOODS),
  };
}

// ── 1. HAND-WRITTEN SCENARIOS ─────────────────────────────────────────────
// type: "speech" — patient speaks naturally at counter
const handwrittenScenarios = [
  // ASTHMA / ALLERGIES
  { type:"speech", correct:["Albuterol"], hint:"Short-acting beta-2 agonist — the classic blue rescue inhaler.",
    complaint:"My doctor just prescribed a rescue inhaler for my asthma — I use it when I feel a flare coming on or before exercise.",
    rightFeedback:"Perfect, this is exactly what my doctor prescribed! I keep one in my gym bag.",
    wrongFeedback:{ "Montelukast":"I don't think that's an inhaler... my doctor said I'd be breathing it in.", "default":"Hmm, I don't think that's my rescue inhaler. Could you double-check?" }},

  { type:"speech", correct:["Cetirizine","Fexofenadine"], hint:"Second-generation antihistamine — non-drowsy.",
    complaint:"I have seasonal allergies — sneezing, itchy eyes. My doctor wants something that won't make me drowsy at work.",
    rightFeedback:"Yes! I tried Benadryl once and fell asleep at my desk. This is so much better.",
    wrongFeedback:{ "Hydroxyzine":"I specifically asked for something non-drowsy — that one knocks me out!", "default":"That doesn't sound like what my doctor recommended for non-drowsy allergies." }},

  { type:"speech", correct:["Epinephrine"], hint:"Auto-injector for anaphylaxis emergencies.",
    complaint:"I carry one of these pens everywhere — I'm severely allergic to peanuts and my doctor insists I have it at all times.",
    rightFeedback:"Yes! My EpiPen. I never leave home without it.",
    wrongFeedback:{ "default":"That's not an emergency injector — I need my anaphylaxis pen!" }},

  { type:"speech", correct:["Montelukast"], hint:"Leukotriene receptor antagonist — works for both asthma and allergic rhinitis.",
    complaint:"My son has asthma and his doctor wants to control his seasonal allergies too — just one daily pill for both.",
    rightFeedback:"Great, Singulair! His doctor mentioned this handles both conditions at once.",
    wrongFeedback:{ "Albuterol":"That's a rescue inhaler, not a daily pill.", "default":"I don't think that's the one for both his asthma and allergies." }},

  { type:"speech", correct:["Meclizine"], hint:"First-generation antihistamine for motion sickness and vertigo.",
    complaint:"I get really dizzy on long car rides. My doctor suggested something for motion sickness.",
    rightFeedback:"Perfect, Dramamine! I always get carsick on mountain roads.",
    wrongFeedback:{ "Cetirizine":"That's for allergies — I need something for the dizziness and nausea from moving.", "default":"I need something specifically for motion sickness." }},

  // DIABETES
  { type:"speech", correct:["Metformin"], hint:"Biguanide — gold standard first-line oral agent for Type 2 diabetes.",
    complaint:"I was just diagnosed with Type 2 diabetes. My doctor wants to start me on the standard first-line pill I take with meals.",
    rightFeedback:"Yes, Glucophage! My doctor said this is the usual starting point.",
    wrongFeedback:{ "Glipizide":"My doctor said first-line treatment specifically.", "default":"My doctor said this would be the standard first choice for Type 2 diabetes." }},

  { type:"speech", correct:["Semaglutide","Dulaglutide"], hint:"GLP-1 receptor agonist — weekly injection known for weight loss benefits.",
    complaint:"I inject myself once a week — it's helping my blood sugar AND I've been losing weight. My doctor says it's one of the newer diabetes drugs.",
    rightFeedback:"That's it! My doctor said it's great for both my diabetes and the extra weight.",
    wrongFeedback:{ "Insulin Glargine":"That's a long-acting insulin — I inject once a week with a different type.", "default":"That's not my weekly injectable." }},

  { type:"speech", correct:["Dapagliflozin","Empagliflozin"], hint:"SGLT2 inhibitor — lowers glucose through urine, protects heart and kidneys.",
    complaint:"My doctor added a new diabetes pill that also protects my heart and kidneys. Something about sodium and glucose.",
    rightFeedback:"Yes! My cardiologist and endocrinologist both agreed on this one.",
    wrongFeedback:{ "Metformin":"I'm already on that — this is an additional one for heart and kidney protection.", "default":"That's not the kidney and heart protective diabetes drug." }},

  { type:"speech", correct:["Insulin Aspart"], hint:"Rapid-acting insulin — works within 15 minutes, taken right before meals.",
    complaint:"I have Type 1 diabetes and need my fast-acting insulin to use right before meals.",
    rightFeedback:"NovoLog, yes! I take it right before I eat to cover the carbs.",
    wrongFeedback:{ "Insulin Glargine":"That's my basal insulin I take at night — I need the mealtime one.", "default":"That's not my mealtime insulin." }},

  { type:"speech", correct:["Insulin Glargine"], hint:"Long-acting insulin — no peak, provides 24 hours of background coverage.",
    complaint:"I take a long-acting insulin once a day at bedtime to keep my blood sugar stable overnight.",
    rightFeedback:"Lantus, perfect. One injection at bedtime covers me until morning.",
    wrongFeedback:{ "Insulin Aspart":"That's my fast-acting mealtime insulin — I need the once-daily bedtime one.", "default":"That's not my basal insulin." }},

  // CARDIOVASCULAR
  { type:"speech", correct:["Lisinopril","Ramipril","Enalapril","Benazepril","Quinapril"], hint:"ACE inhibitors end in '-pril' — first-line for hypertension, especially with heart failure.",
    complaint:"My blood pressure has been high and my doctor started me on an ACE inhibitor. I also have mild heart failure.",
    rightFeedback:"That's the one! My doctor said it's good for both my blood pressure and my heart.",
    wrongFeedback:{ "Losartan":"That's an ARB — similar but my doctor said ACE inhibitor.", "Amlodipine":"That's a calcium channel blocker, not an ACE inhibitor.", "default":"That's not my ACE inhibitor." }},

  { type:"speech", correct:["Amlodipine"], hint:"Dihydropyridine CCB — most commonly prescribed, once daily.",
    complaint:"My doctor prescribed a calcium channel blocker for my hypertension and angina. Just one pill a day.",
    rightFeedback:"Norvasc, perfect. My doctor said it handles both my blood pressure and chest pain.",
    wrongFeedback:{ "Diltiazem":"That's a non-dihydropyridine CCB — mine is Norvasc.", "Metoprolol":"That's a beta-blocker, not a CCB.", "default":"That's not my calcium channel blocker." }},

  { type:"speech", correct:["Furosemide"], hint:"Most commonly used loop diuretic — works on the loop of Henle.",
    complaint:"My legs swell up and my doctor prescribed a strong water pill for the fluid. A loop diuretic.",
    rightFeedback:"Lasix! My doctor said this drains the extra fluid from my legs.",
    wrongFeedback:{ "Hydrochlorothiazide":"That's a thiazide — my doctor specified a loop diuretic.", "Spironolactone":"That's potassium-sparing — not the strong loop diuretic I need.", "default":"That's not the loop diuretic for my swollen legs." }},

  { type:"speech", correct:["Atorvastatin","Rosuvastatin"], hint:"High-intensity statins — most potent LDL reducers.",
    complaint:"My cholesterol is really high and my doctor wants me on the strongest statin available.",
    rightFeedback:"That's it! My doctor said this gives me the most LDL reduction.",
    wrongFeedback:{ "Simvastatin":"My doctor said that one isn't strong enough.", "Lovastatin":"That's lower-intensity — I need the strongest one.", "default":"That's not the high-intensity statin my doctor prescribed." }},

  { type:"speech", correct:["Nitroglycerin"], hint:"Sublingual nitrate — fast-acting vasodilator for acute angina.",
    complaint:"I have angina and my doctor gave me tiny tablets I put under my tongue when chest pain hits.",
    rightFeedback:"Yes! My doctor said to put it under my tongue immediately when I feel chest pressure.",
    wrongFeedback:{ "Isosorbide Mononitrate":"That's the long-acting one for prevention — I need the emergency sublingual.", "default":"That's not my sublingual angina medication." }},

  { type:"speech", correct:["Spironolactone"], hint:"Aldosterone antagonist — potassium-sparing diuretic used in heart failure.",
    complaint:"My heart failure doctor added a potassium-sparing diuretic that also blocks aldosterone.",
    rightFeedback:"Aldactone! My cardiologist said this one actually helps the heart muscle itself.",
    wrongFeedback:{ "Furosemide":"That's my loop diuretic — I'm already on that. This spares potassium.", "default":"That's not the aldosterone-blocking diuretic for my heart failure." }},

  { type:"speech", correct:["Dabigatran","Warfarin"], hint:"Anticoagulants for AFib — dabigatran doesn't need regular INR checks.",
    complaint:"I have atrial fibrillation and my doctor put me on a blood thinner to prevent a stroke. No regular blood tests needed.",
    rightFeedback:"Yes! My doctor said unlike Warfarin I don't need monthly INR checks.",
    wrongFeedback:{ "Warfarin":"My doctor specifically chose one without regular monitoring.", "Clopidogrel":"That's antiplatelet — I need a full anticoagulant for AFib.", "default":"That's not my AFib anticoagulant." }},

  // PAIN
  { type:"speech", correct:["Celecoxib"], hint:"COX-2 selective inhibitor — less GI risk than traditional NSAIDs.",
    complaint:"I have rheumatoid arthritis and need an NSAID that's easier on my stomach than regular ibuprofen.",
    rightFeedback:"Celebrex! My doctor said this is much gentler on my stomach. I had ulcers before.",
    wrongFeedback:{ "Ibuprofen":"My doctor specifically said NOT regular ibuprofen because of my stomach history.", "Naproxen":"That's still non-selective — I need the COX-2 one.", "default":"That's not the stomach-friendly NSAID." }},

  { type:"speech", correct:["Allopurinol"], hint:"Xanthine oxidase inhibitor — reduces uric acid, prevents gout attacks.",
    complaint:"I have gout and my doctor wants something to lower my uric acid levels long-term.",
    rightFeedback:"Zyloprim! My doctor said this prevents future attacks by keeping my uric acid low.",
    wrongFeedback:{ "Colchicine":"That's for acute attacks — I need the preventive uric acid reducer.", "Indomethacin":"That's an NSAID for pain — I need the long-term one.", "default":"That's not the uric acid-lowering medication." }},

  { type:"speech", correct:["Cyclobenzaprine","Baclofen"], hint:"Centrally-acting skeletal muscle relaxants.",
    complaint:"I threw my back out and my doctor prescribed a muscle relaxer for the spasms.",
    rightFeedback:"That's it! My doctor said to take it at night since it can make you sleepy.",
    wrongFeedback:{ "Ibuprofen":"That's anti-inflammatory — I need something specifically for muscle spasms.", "default":"That's not the muscle relaxant for my back spasms." }},

  { type:"speech", correct:["Gabapentin","Pregabalin","Duloxetine"], hint:"Anticonvulsants or SNRIs approved for diabetic peripheral neuropathy.",
    complaint:"I have nerve pain from my diabetes — a burning tingling sensation in my feet. My doctor prescribed something for neuropathic pain.",
    rightFeedback:"Yes! My doctor said this should help with that horrible burning feeling.",
    wrongFeedback:{ "Ibuprofen":"Regular pain relievers don't work for nerve pain — I need something for neuropathy.", "default":"That's not my diabetic nerve pain medication." }},

  { type:"speech", correct:["Fentanyl (Transdermal)"], hint:"Transdermal opioid patch — changed every 72 hours.",
    complaint:"I have severe chronic pain and my doctor prescribed a fentanyl patch I change every 72 hours.",
    rightFeedback:"Yes, the Duragesic patch. My pain doctor is very specific about how I apply it.",
    wrongFeedback:{ "Morphine":"That's oral morphine — I specifically use the 3-day patch.", "default":"That's not my 72-hour fentanyl patch." }},

  // MENTAL HEALTH
  { type:"speech", correct:["Sertraline","Escitalopram","Fluoxetine","Citalopram","Paroxetine"], hint:"SSRIs — selective serotonin reuptake inhibitors.",
    complaint:"I've been diagnosed with depression and my doctor wants to start me on an SSRI.",
    rightFeedback:"That's the one! My doctor said it may take a few weeks to feel the full effect.",
    wrongFeedback:{ "Venlafaxine":"That's an SNRI — my doctor specifically said SSRI.", "Amitriptyline":"That's an older tricyclic — my doctor wanted a newer SSRI.", "default":"That's not the SSRI my doctor prescribed." }},

  { type:"speech", correct:["Duloxetine","Venlafaxine"], hint:"SNRIs — work on both serotonin and norepinephrine. Good for anxiety + depression.",
    complaint:"I have generalized anxiety and depression. My doctor chose an antidepressant that works on both serotonin and norepinephrine.",
    rightFeedback:"Yes! My doctor said this dual-action medication works better for my combination.",
    wrongFeedback:{ "Sertraline":"That's an SSRI — my doctor specifically chose dual-action.", "default":"That's not my SNRI." }},

  { type:"speech", correct:["Lithium","Divalproex"], hint:"Classic mood stabilizers — both require therapeutic drug monitoring.",
    complaint:"I have bipolar disorder and my psychiatrist has me on a mood stabilizer. I need regular blood tests to monitor the levels.",
    rightFeedback:"Yes, that's my mood stabilizer. My psychiatrist checks my levels every few months.",
    wrongFeedback:{ "Quetiapine":"That's an antipsychotic add-on — I need my primary mood stabilizer.", "default":"That's not my mood stabilizer." }},

  { type:"speech", correct:["Alprazolam","Lorazepam","Diazepam","Clonazepam"], hint:"Benzodiazepines — Schedule IV, used for anxiety and sleep.",
    complaint:"I have really bad anxiety. My doctor gave me a short-term prescription for a benzodiazepine.",
    rightFeedback:"That's it. My doctor was very clear this is just for short-term use.",
    wrongFeedback:{ "Buspirone":"That takes weeks to work — I need something for immediate relief.", "default":"That's not the benzodiazepine my doctor prescribed." }},

  { type:"speech", correct:["Bupropion"], hint:"Monocyclic antidepressant — also marketed as Zyban for smoking cessation.",
    complaint:"My doctor prescribed something for my depression that also helps me quit smoking. It's not an SSRI.",
    rightFeedback:"Wellbutrin! My doctor said it's a two-for-one since I've been trying to quit smoking.",
    wrongFeedback:{ "Sertraline":"That's an SSRI — mine also helps with smoking cessation.", "Varenicline":"That's purely for smoking — mine also treats my depression.", "default":"That's not the antidepressant that helps with smoking cessation." }},

  { type:"speech", correct:["Atomoxetine"], hint:"Non-stimulant ADHD medication — NRI, not a controlled substance.",
    complaint:"I have ADHD and my doctor prescribed a non-stimulant since I have a history of substance abuse.",
    rightFeedback:"Strattera! My doctor said this was right given my history — no abuse potential.",
    wrongFeedback:{ "Lisdexamfetamine":"That's a stimulant — my doctor specifically said non-stimulant.", "Methylphenidate":"Also a stimulant — I need the non-controlled option.", "default":"That's not the non-stimulant ADHD medication." }},

  { type:"speech", correct:["Aripiprazole","Olanzapine","Risperidone","Quetiapine"], hint:"Atypical antipsychotics — second generation.",
    complaint:"I have schizophrenia and my doctor put me on a second-generation antipsychotic I take every day.",
    rightFeedback:"Yes, that's my antipsychotic. My doctor said it has fewer side effects than the older ones.",
    wrongFeedback:{ "Lithium":"That's a mood stabilizer — I need my antipsychotic.", "default":"That's not my antipsychotic medication." }},

  // ANTIBIOTICS
  { type:"speech", correct:["Nitrofurantoin","Trimethoprim-Sulfamethoxazole"], hint:"First-line UTI antibiotics — nitrofurantoin concentrates in urine.",
    complaint:"I have a UTI and my doctor called in an antibiotic specific to urinary tract infections.",
    rightFeedback:"Yes! My doctor said this concentrates specifically in the urine where I need it.",
    wrongFeedback:{ "Ciprofloxacin (oral)":"My doctor wanted to save fluoroquinolones — she picked a UTI-specific one.", "default":"That's not the UTI-specific antibiotic." }},

  { type:"speech", correct:["Amoxicillin","Penicillin","Cephalexin"], hint:"First-line for strep pharyngitis — beta-lactam antibiotics.",
    complaint:"My kid has strep throat. The pediatrician called it in. My child is not allergic to penicillin.",
    rightFeedback:"Perfect! The pediatrician said 10 days and he should be all better.",
    wrongFeedback:{ "Azithromycin":"That's for penicillin-allergic patients — my child can take penicillin.", "default":"That's not the right antibiotic for strep in a child without penicillin allergy." }},

  { type:"speech", correct:["Doxycycline"], hint:"Tetracycline antibiotic — skin infections and acne.",
    complaint:"I have a skin infection and my doctor prescribed an antibiotic that also treats my acne. It's a tetracycline.",
    rightFeedback:"Vibramycin! My doctor said take it with food and stay out of the sun.",
    wrongFeedback:{ "Clindamycin (oral)":"That's a lincosamide — I need the tetracycline.", "default":"That's not the tetracycline antibiotic." }},

  { type:"speech", correct:["Azithromycin"], hint:"Z-Pak — 5-day macrolide course for respiratory infections.",
    complaint:"I have community-acquired pneumonia and my doctor prescribed a macrolide antibiotic for 5 days.",
    rightFeedback:"The Z-Pak! My doctor said 5 days is all I need.",
    wrongFeedback:{ "Amoxicillin":"That's a penicillin — my doctor said macrolide.", "default":"That's not the macrolide for my pneumonia." }},

  { type:"speech", correct:["Fluconazole"], hint:"Azole antifungal — a single oral dose treats most vaginal candidiasis.",
    complaint:"I have a yeast infection and my doctor prescribed a one-time oral antifungal pill.",
    rightFeedback:"Diflucan! Just one pill and it should clear up in a few days.",
    wrongFeedback:{ "Metronidazole":"That's for bacterial vaginosis — yeast needs antifungal.", "default":"That's not the antifungal pill." }},

  { type:"speech", correct:["Valacyclovir"], hint:"Antiviral prodrug for herpes simplex suppression.",
    complaint:"My doctor prescribed an antiviral to suppress herpes outbreaks.",
    rightFeedback:"Valtrex. My doctor said daily use can significantly reduce outbreak frequency.",
    wrongFeedback:{ "Fluconazole":"That's antifungal — I need an antiviral for herpes.", "Oseltamivir":"That's for flu — I need the herpes antiviral.", "default":"That's not my herpes antiviral." }},

  { type:"speech", correct:["Oseltamivir"], hint:"Neuraminidase inhibitor — must start within 48 hours of flu symptom onset.",
    complaint:"I have the flu and my doctor wants to shorten how long I'm sick. I only started feeling bad yesterday.",
    rightFeedback:"Tamiflu! My doctor said I caught it early enough that this should help a lot.",
    wrongFeedback:{ "Azithromycin":"The flu is viral — antibiotics won't help.", "default":"That's not the flu antiviral." }},

  // GI
  { type:"speech", correct:["Omeprazole","Esomeprazole","Pantoprazole","Lansoprazole"], hint:"PPIs — reduce stomach acid production. Take before breakfast.",
    complaint:"I have terrible acid reflux and my doctor put me on a proton pump inhibitor I take every morning before breakfast.",
    rightFeedback:"Yes, that's my acid reflux medication. My doctor said 30-60 minutes before eating.",
    wrongFeedback:{ "Famotidine":"That's an H2 blocker — my doctor specifically prescribed a PPI.", "default":"That's not my proton pump inhibitor." }},

  { type:"speech", correct:["Famotidine"], hint:"H2 receptor antagonist — Pepcid. Faster than PPIs but less potent.",
    complaint:"I get occasional heartburn and my doctor said I can use an H2 blocker as needed — something milder than a PPI.",
    rightFeedback:"Pepcid! My doctor said to take it as needed.",
    wrongFeedback:{ "Omeprazole":"My doctor said I only need an H2 blocker — not the stronger PPI.", "default":"That's not my H2 blocker." }},

  { type:"speech", correct:["Ondansetron"], hint:"5-HT3 antagonist — Zofran, powerful antiemetic for chemo.",
    complaint:"I have severe nausea from my chemotherapy and my doctor prescribed an antiemetic.",
    rightFeedback:"Zofran! My oncologist said this is specifically designed for chemo-related nausea.",
    wrongFeedback:{ "Promethazine":"My doctor chose the one specifically for chemo nausea.", "default":"That's not the antiemetic my oncologist prescribed." }},

  // RESPIRATORY
  { type:"speech", correct:["Tiotropium"], hint:"LAMA — long-acting muscarinic antagonist. Spiriva, once daily for COPD.",
    complaint:"I have COPD and my doctor added a once-daily inhaler — a long-acting anticholinergic bronchodilator.",
    rightFeedback:"Spiriva! My pulmonologist said this opens my airways all day.",
    wrongFeedback:{ "Albuterol":"That's my rescue inhaler — I need the once-daily COPD maintenance one.", "default":"That's not my long-acting COPD inhaler." }},

  { type:"speech", correct:["Fluticasone/salmeterol","Budesonide/formoterol"], hint:"ICS/LABA combination inhalers — Advair or Symbicort.",
    complaint:"My doctor prescribed a combination inhaler with both a steroid and a long-acting bronchodilator for my asthma.",
    rightFeedback:"Yes, my combination inhaler! The steroid reduces inflammation and the other keeps airways open.",
    wrongFeedback:{ "Albuterol":"That's a rescue inhaler — I need my daily combination preventer.", "default":"That's not my ICS/LABA combination inhaler." }},

  { type:"speech", correct:["Fluticasone (nasal)","Mometasone (nasal)"], hint:"Intranasal corticosteroids — Flonase or Nasonex.",
    complaint:"I have nasal allergies and my doctor prescribed a nasal steroid spray.",
    rightFeedback:"Yes! My doctor said spray it every morning and it reduces congestion within a week.",
    wrongFeedback:{ "Cetirizine":"That's an oral antihistamine — mine is a nasal spray steroid.", "default":"That's not my nasal steroid spray." }},

  { type:"speech", correct:["Varenicline"], hint:"Chantix — partial nicotine receptor agonist for smoking cessation.",
    complaint:"I'm trying to quit smoking and my doctor prescribed a non-nicotine pill to help with cravings.",
    rightFeedback:"Chantix! My doctor said to start a week before my quit date.",
    wrongFeedback:{ "Bupropion":"That's another option but my doctor chose the receptor agonist.", "default":"That's not my smoking cessation medication." }},

  // THYROID / HORMONES
  { type:"speech", correct:["Levothyroxine"], hint:"Synthetic thyroid hormone — Synthroid. Empty stomach, 30 min before food.",
    complaint:"I have an underactive thyroid and take a hormone replacement pill every morning on an empty stomach.",
    rightFeedback:"Synthroid! My endocrinologist is very specific — 30 minutes before breakfast, no exceptions.",
    wrongFeedback:{ "Thyroid desiccated":"My doctor uses the synthetic version specifically.", "default":"That's not my thyroid hormone replacement." }},

  { type:"speech", correct:["Alendronate","Risedronate"], hint:"Weekly bisphosphonates — Fosamax or Actonel. Stay upright 30 min after.",
    complaint:"I take a bisphosphonate for osteoporosis — once a week, and I have to stay upright for 30 minutes after.",
    rightFeedback:"Yes! Take it first thing in the morning with a full glass of water and don't lie down.",
    wrongFeedback:{ "Ibandronate":"That one is monthly — mine is weekly.", "Raloxifene":"That's a SERM, not a bisphosphonate.", "default":"That's not my weekly bisphosphonate." }},

  { type:"speech", correct:["Conjugated estrogen","Estradiol"], hint:"Estrogen replacement therapy for menopausal symptoms.",
    complaint:"I'm going through menopause and my doctor prescribed estrogen to help with hot flashes and night sweats.",
    rightFeedback:"Yes! My doctor said this should really help with those terrible hot flashes.",
    wrongFeedback:{ "Raloxifene":"That's a SERM — it doesn't help with hot flashes the way estrogen does.", "default":"That's not my estrogen therapy." }},

  // UROLOGY
  { type:"speech", correct:["Tamsulosin","Doxazosin","Terazosin"], hint:"Alpha-1 adrenergic blockers — relax smooth muscle in prostate and bladder.",
    complaint:"I have an enlarged prostate and trouble urinating. My doctor prescribed an alpha-blocker to relax the muscles.",
    rightFeedback:"Yes! My urologist said this should make urinating much easier within a few days.",
    wrongFeedback:{ "Finasteride":"That shrinks the prostate over months — I need the fast-acting muscle relaxer.", "Sildenafil":"That's for ED — I need help with urinary flow.", "default":"That's not the alpha-blocker for my BPH." }},

  { type:"speech", correct:["Tadalafil"], hint:"PDE-5 inhibitor — Cialis, 36-hour duration, the 'weekend pill'.",
    complaint:"My doctor prescribed something for erectile dysfunction that works for up to 36 hours.",
    rightFeedback:"Cialis! My doctor mentioned the 36-hour window gives much more flexibility.",
    wrongFeedback:{ "Sildenafil":"That only lasts 4-6 hours — I wanted the longer-lasting option.", "default":"That's not the long-acting ED medication." }},

  { type:"speech", correct:["Tolterodine","Oxybutynin"], hint:"Antimuscarinics — reduce bladder contractions.",
    complaint:"I have an overactive bladder — I need to rush to the bathroom constantly. My doctor prescribed something to calm the bladder muscle.",
    rightFeedback:"Yes! My doctor said this will reduce those urgent contractions.",
    wrongFeedback:{ "Tamsulosin":"That's for enlarged prostate — I need something for overactive bladder.", "default":"That's not the overactive bladder medication." }},

  // MISC
  { type:"speech", correct:["Hydroxychloroquine"], hint:"Plaquenil — antimalarial used for lupus and RA.",
    complaint:"I have lupus and my rheumatologist has me on an antimalarial drug that also treats autoimmune conditions.",
    rightFeedback:"Plaquenil! My rheumatologist says it's a cornerstone for lupus. I get my eyes checked regularly.",
    wrongFeedback:{ "Methotrexate":"That's an antimetabolite — my doctor specifically chose the antimalarial.", "default":"That's not my lupus antimalarial." }},

  { type:"speech", correct:["Methotrexate"], hint:"Antimetabolite DMARD — low doses for RA/psoriasis, high doses for cancer.",
    complaint:"I have rheumatoid arthritis and my doctor prescribed a disease-modifying drug that can also be used for certain cancers.",
    rightFeedback:"Trexall. My rheumatologist said at the low dose it's very effective for joint inflammation.",
    wrongFeedback:{ "Hydroxychloroquine":"That's the antimalarial DMARD — I need the antimetabolite.", "default":"That's not my DMARD for RA." }},

  { type:"speech", correct:["Latanoprost","Bimatoprost"], hint:"Prostaglandin analog eye drops — reduce intraocular pressure.",
    complaint:"I have glaucoma and my eye doctor prescribed eye drops to reduce my eye pressure. I use them every evening.",
    rightFeedback:"Yes! One drop each evening should keep my eye pressure in check.",
    wrongFeedback:{ "default":"That's not the glaucoma eye drops my ophthalmologist prescribed." }},

  { type:"speech", correct:["Emtricitabine/tenofovir"], hint:"Truvada — combination NRTI for PrEP.",
    complaint:"My doctor wants me to start PrEP — I'm HIV-negative but want protection. Daily pill.",
    rightFeedback:"Truvada! My doctor said daily use is over 99% effective at preventing HIV transmission.",
    wrongFeedback:{ "Efavirenz":"That's for HIV treatment — I need the PrEP prevention medication.", "default":"That's not my PrEP medication." }},

  { type:"speech", correct:["Benzonatate"], hint:"Tessalon Perles — non-narcotic antitussive. Swallow whole, don't chew.",
    complaint:"I have a persistent cough. My doctor said it's not infectious — wants something non-narcotic to suppress it.",
    rightFeedback:"Tessalon Perles! My doctor said to swallow them whole — don't chew or they'll numb my mouth.",
    wrongFeedback:{ "Codeine":"My doctor specifically chose a non-narcotic cough suppressant.", "default":"That's not my cough suppressant." }},

  { type:"speech", correct:["Phenazopyridine"], hint:"Urinary analgesic — relieves burning but does NOT treat infection.",
    complaint:"I have burning when I urinate but my culture hasn't come back yet. My doctor prescribed something just for the pain.",
    rightFeedback:"Pyridium! My doctor warned me it will turn my urine orange — totally normal.",
    wrongFeedback:{ "Nitrofurantoin":"That's the antibiotic — my culture isn't back yet, just the pain reliever for now.", "default":"That's not the urinary pain reliever." }},

  { type:"speech", correct:["Carbidopa/levodopa"], hint:"Gold standard for Parkinson's — levodopa + carbidopa (Sinemet).",
    complaint:"I have Parkinson's disease and my neurologist put me on the gold standard combination treatment.",
    rightFeedback:"Sinemet! My neurologist said this is still the most effective for my symptoms.",
    wrongFeedback:{ "Pramipexole":"That's a dopamine agonist — my doctor chose the gold standard combination.", "default":"That's not my Parkinson's medication." }},

  { type:"speech", correct:["Sumatriptan"], hint:"Triptan — take at first sign of migraine, don't wait.",
    complaint:"I get terrible migraines and my doctor prescribed something to take immediately when one hits to stop it.",
    rightFeedback:"Imitrex! My doctor said take it at the first sign — don't wait until it's severe.",
    wrongFeedback:{ "Topiramate":"That's preventive — I need the one that stops an active migraine.", "Ibuprofen":"Regular painkillers don't work for my migraines.", "default":"That's not my acute migraine medication." }},

  { type:"speech", correct:["Donepezil"], hint:"Central cholinesterase inhibitor — Aricept, most widely used Alzheimer's medication.",
    complaint:"My father has Alzheimer's and his neurologist prescribed a cholinesterase inhibitor to slow the progression.",
    rightFeedback:"Aricept! His neurologist said it won't cure it but may slow the memory decline.",
    wrongFeedback:{ "Memantine":"That works differently — my father is on the cholinesterase inhibitor.", "default":"That's not the Alzheimer's cholinesterase inhibitor." }},

  { type:"speech", correct:["Mupirocin"], hint:"Bactroban — topical antibiotic for impetigo.",
    complaint:"I have impetigo on my arm — my doctor prescribed a topical antibiotic ointment to apply directly.",
    rightFeedback:"Bactroban! Apply it three times a day until the sores are completely gone.",
    wrongFeedback:{ "Clindamycin (topical)":"That's for acne — I need the one for impetigo.", "Clobetasol":"That's a steroid — I need an antibiotic for bacteria.", "default":"That's not the topical antibiotic for my impetigo." }},

  { type:"speech", correct:["Clobetasol"], hint:"Super-potent topical corticosteroid — class I steroid for severe psoriasis.",
    complaint:"I have severe plaque psoriasis and my dermatologist prescribed the strongest topical steroid available.",
    rightFeedback:"Temovate! My dermatologist said this is one of the strongest available.",
    wrongFeedback:{ "Hydrocortisone (topical)":"That's a mild steroid — I need the strongest class.", "default":"That's not the super-potent steroid for severe psoriasis." }},

  { type:"speech", correct:["Clopidogrel"], hint:"Antiplatelet agent — Plavix, used after MI to prevent clot formation.",
    complaint:"I had a heart attack last year and my cardiologist has me on an antiplatelet drug to prevent another one.",
    rightFeedback:"Plavix! My cardiologist stressed I should never miss a dose.",
    wrongFeedback:{ "Warfarin":"That's a full anticoagulant — my doctor chose the antiplatelet.", "default":"That's not my antiplatelet medication." }},

  { type:"speech", correct:["Medroxyprogesterone"], hint:"Depo-Provera — injectable progestin, given every 3 months.",
    complaint:"I need my monthly contraceptive shot — the injection I get every 3 months.",
    rightFeedback:"Depo-Provera! I come in every 3 months for my shot. Very convenient.",
    wrongFeedback:{ "Ethinyl estradiol (vaginal ring)":"That's the NuvaRing — I use the injection.", "default":"That's not my injectable contraceptive." }},

  { type:"speech", correct:["Finasteride"], hint:"5-alpha reductase inhibitor — Proscar for BPH, Propecia for hair loss.",
    complaint:"My doctor prescribed something for my enlarged prostate that also happens to slow hair loss.",
    rightFeedback:"Yes! My doctor said it shrinks the prostate over time and slows the hair thinning.",
    wrongFeedback:{ "Tamsulosin":"That relaxes muscles but doesn't shrink the prostate or affect hair.", "default":"That's not the 5-alpha reductase inhibitor." }},

  { type:"speech", correct:["Topiramate","Divalproex"], hint:"Anticonvulsants with dual approval for epilepsy and migraine prevention.",
    complaint:"I have epilepsy and my doctor controls my seizures with a medication that also prevents my migraines.",
    rightFeedback:"Yes! My neurologist loves that one medication handles both my seizures and migraines.",
    wrongFeedback:{ "Levetiracetam":"That isn't approved for migraine prevention — I need the dual-purpose one.", "default":"That's not my anticonvulsant that also prevents migraines." }},
];

// ── 2. PROCEDURAL TEMPLATE ENGINE ────────────────────────────────────────

// Natural speech templates — {indication}, {class}, {generic}, {brand} are filled in
const naturalTemplates = [
  { t:"My doctor called in a refill for my {indication} medication. It's a {class}.", slot:"indication+class" },
  { t:"I've been on this {class} for a while now — just need a refill for my {indication}.", slot:"indication+class" },
  { t:"My doctor prescribed something new for my {indication}. She said it's a type of {class}.", slot:"indication+class" },
  { t:"I need to pick up my prescription for {indication}. My doctor put me on a {class}.", slot:"indication+class" },
  { t:"My {indication} has been acting up and my doctor started me on a {class}.", slot:"indication+class" },
  { t:"Can you fill this for me? It's for my {indication} — a {class}.", slot:"indication+class" },
  { t:"Just a refill please. It's for {indication} and my doctor has me on a {class}.", slot:"indication+class" },
  { t:"My doctor prescribed a {class} for my {indication}. First time picking this up.", slot:"indication+class" },
  { t:"I take this every day for my {indication}. It's in the {class} family.", slot:"indication+class" },
  { t:"My specialist put me on a {class} for my {indication}. I'm new to this medication.", slot:"indication+class" },
];

// Prescription slip templates — look like a paper Rx slip
const slipTemplates = [
  { t:"Refill — {indication}\nClass: {class}", slot:"indication+class" },
  { t:"Rx: {indication}\n{class}", slot:"indication+class" },
  { t:"Patient presents with {indication}\nDispense: {class}", slot:"indication+class" },
  { t:"Diagnosis: {indication}\nTreatment: {class}", slot:"indication+class" },
  { t:"{indication} — ongoing management\n{class} indicated", slot:"indication+class" },
  { t:"Follow-up refill\n{indication} / {class}", slot:"indication+class" },
];

function buildProceduralScenarios() {
  const procedural = [];

  allDrugs.forEach(drug => {
    if (!drug.indications || !drug.indications.length || !drug.class) return;
    // Skip drugs already well-covered by hand-written scenarios
    const alreadyCovered = handwrittenScenarios.some(s =>
      s.correct.some(c => c.toLowerCase() === drug.generic.toLowerCase())
    );

    drug.indications.forEach((indication, idx) => {
      // Natural speech scenario
      const natTemplate = naturalTemplates[(handwrittenScenarios.length + idx) % naturalTemplates.length];
      const natComplaint = natTemplate.t
        .replace("{indication}", indication.toLowerCase())
        .replace("{class}", drug.class.toLowerCase())
        .replace("{generic}", drug.generic)
        .replace("{brand}", drug.brand[0] || drug.generic);

      procedural.push({
        type: "speech",
        correct: [drug.generic],
        hint: `${drug.class} — used for ${indication}.`,
        complaint: natComplaint,
        rightFeedback: `That's it! I've been waiting for my ${drug.generic} refill.`,
        wrongFeedback: { default: `Hmm, I don't think that's right. My doctor prescribed something for my ${indication.toLowerCase()}.` },
        procedural: true,
      });

      // Prescription slip scenario — only generate for some drugs (every other indication)
      if (idx % 2 === 0) {
        const slipTemplate = slipTemplates[idx % slipTemplates.length];
        const slipText = slipTemplate.t
          .replace("{indication}", indication)
          .replace("{class}", drug.class)
          .replace("{generic}", drug.generic)
          .replace("{brand}", drug.brand[0] || drug.generic);

        procedural.push({
          type: "slip",
          correct: [drug.generic],
          hint: `${drug.class} — brand name: ${drug.brand[0] || "N/A"}.`,
          complaint: slipText,
          doctor: scenPick(DOCTOR_NAMES),
          rightFeedback: `Correct fill — ${drug.generic}. Thank you!`,
          wrongFeedback: { default: `That doesn't match the prescription. Please check again.` },
          procedural: true,
        });
      }
    });
  });

  return procedural;
}

// ── 3. EXPORT ─────────────────────────────────────────────────────────────
function getAllScenarios() {
  const procedural = buildProceduralScenarios();
  return [...handwrittenScenarios, ...procedural];
}
