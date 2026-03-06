// ═══════════════════════════════════════════════
// DRUG DATA
// Edit this file to fix drug names, brands, classes, or indications.
// fallDrugs  = Fall semester  (Top 100, Quizzes F1–F10)
// winterDrugs = Winter semester (Top 200, Quizzes W1–W9)
// ═══════════════════════════════════════════════

const fallDrugs = [
  // ── F1: Asthma / Allergies ──────────────────────────────────────────────
  { generic: "Albuterol", brand: ["ProAir HFA", "ProAir Respiclick", "Proventil HFA", "Ventolin HFA"], class: "Selective beta-2 adrenergic agonist", indications: ["Asthma", "Exercise induced asthma"], quiz: "F1" },
  { generic: "Montelukast", brand: ["Singulair"], class: "Leukotriene receptor antagonist", indications: ["Asthma", "Exercise induced bronchoconstriction", "Seasonal allergic rhinitis"], quiz: "F1" },
  { generic: "Hydroxyzine", brand: ["Atarax", "Vistaril"], class: "1st generation antihistamine", indications: ["Anxiety", "Pruritis", "Sedation"], quiz: "F1" },
  { generic: "Meclizine", brand: ["Antivert", "Dramamine"], class: "1st generation antihistamine", indications: ["Motion sickness", "Vertigo"], quiz: "F1" },
  { generic: "Cetirizine", brand: ["Zyrtec"], class: "2nd generation antihistamine", indications: ["Allergic rhinitis", "Urticaria"], quiz: "F1" },
  { generic: "Fexofenadine", brand: ["Allegra"], class: "2nd generation antihistamine", indications: ["Seasonal allergic rhinitis", "Urticaria"], quiz: "F1" },
  { generic: "Epinephrine", brand: ["Auvi-Q", "EpiPen"], class: "Anaphylaxis agent", indications: ["Emergency treatment of anaphylaxis due to allergic reactions"], quiz: "F1" },

  // ── F2: Diabetes / Antiplatelet ─────────────────────────────────────────
  { generic: "Metformin", brand: ["Glucophage"], class: "Biguanide", indications: ["Type 2 diabetes mellitus", "Polycystic ovary syndrome"], quiz: "F2" },
  { generic: "Glimepiride", brand: ["Amaryl"], class: "Sulfonylurea", indications: ["Type 2 diabetes mellitus"], quiz: "F2" },
  { generic: "Glipizide", brand: ["Glucotrol"], class: "Sulfonylurea", indications: ["Type 2 diabetes mellitus"], quiz: "F2" },
  { generic: "Sitagliptin", brand: ["Januvia"], class: "Dipeptidyl peptidase-4 inhibitor (DPP-4 inhibitor)", indications: ["Type 2 diabetes mellitus"], quiz: "F2" },
  { generic: "Pioglitazone", brand: ["Actos"], class: "Thiazolidinedione", indications: ["Type 2 diabetes mellitus"], quiz: "F2" },
  { generic: "Insulin Aspart", brand: ["NovoLog", "NovoLog FlexPen"], class: "Rapid-acting insulin", indications: ["Type 1 and type 2 diabetes mellitus"], quiz: "F2" },
  { generic: "Insulin Glargine", brand: ["Lantus"], class: "Long-acting insulin", indications: ["Type 1 and type 2 diabetes mellitus"], quiz: "F2" },
  { generic: "Clopidogrel", brand: ["Plavix"], class: "Platelet aggregation inhibitor", indications: ["Myocardial infarction", "Prevention of thrombosis in arteriosclerotic vascular disease"], quiz: "F2" },
  { generic: "Dapagliflozin", brand: ["Farxiga"], class: "Sodium-glucose cotransporter-2 inhibitor (SGLT2 inhibitor)", indications: ["Type 2 diabetes mellitus", "Heart failure", "Chronic kidney disease"], quiz: "F2" },
  { generic: "Empagliflozin", brand: ["Jardiance"], class: "Sodium-glucose cotransporter-2 inhibitor (SGLT2 inhibitor)", indications: ["Type 2 diabetes mellitus", "Heart failure", "Chronic kidney disease"], quiz: "F2" },
  { generic: "Semaglutide", brand: ["Ozempic", "Rybelsus", "Wegovy"], class: "Glucagon-like peptide-1 receptor agonist (GLP-1 agonist)", indications: ["Type 2 diabetes mellitus", "Weight loss (Wegovy)"], quiz: "F2" },
  { generic: "Dulaglutide", brand: ["Trulicity"], class: "Glucagon-like peptide-1 receptor agonist (GLP-1 agonist)", indications: ["Type 2 diabetes mellitus"], quiz: "F2" },

  // ── F3: Insomnia / Pain / Stimulants ────────────────────────────────────
  { generic: "Zolpidem", brand: ["Ambien"], class: "Nonbarbiturate hypnotic [C-IV]", indications: ["Insomnia"], quiz: "F3" },
  { generic: "Eszopiclone", brand: ["Lunesta"], class: "Nonbarbiturate hypnotic [C-IV]", indications: ["Insomnia"], quiz: "F3" },
  { generic: "Hydrocodone and acetaminophen", brand: ["-"], class: "Opioid analgesic [C-II]", indications: ["Pain (severe)"], quiz: "F3" },
  { generic: "Ibuprofen", brand: ["Motrin"], class: "Nonsteroidal anti-inflammatory drug (NSAID)", indications: ["Fever", "Osteoarthritis", "Pain", "Rheumatoid arthritis"], quiz: "F3" },
  { generic: "Meloxicam", brand: ["Mobic"], class: "Nonsteroidal anti-inflammatory drug (NSAID)", indications: ["Osteoarthritis", "Rheumatoid arthritis"], quiz: "F3" },
  { generic: "Lisdexamfetamine", brand: ["Vyvanse"], class: "CNS stimulant [C-II]", indications: ["Attention-deficit hyperactivity disorder (ADHD)", "Binge eating disorder"], quiz: "F3" },
  { generic: "Methylphenidate", brand: ["Concerta", "Ritalin"], class: "CNS stimulant [C-II]", indications: ["Attention-deficit hyperactivity disorder (ADHD)", "Narcolepsy"], quiz: "F3" },
  { generic: "Atomoxetine", brand: ["Strattera"], class: "Norepinephrine reuptake inhibitor (NRI)", indications: ["Attention-deficit hyperactivity disorder (ADHD)"], quiz: "F3" },
  { generic: "Donepezil", brand: ["Aricept"], class: "Central cholinesterase inhibitor", indications: ["Alzheimer disease", "Dementia"], quiz: "F3" },
  { generic: "Memantine", brand: ["Namenda"], class: "N-methyl-d-aspartate (NMDA) receptor antagonist", indications: ["Alzheimer disease"], quiz: "F3" },

  // ── F4: GI / Supplements ────────────────────────────────────────────────
  { generic: "Esomeprazole", brand: ["Nexium"], class: "Proton pump inhibitor (PPI)", indications: ["Helicobacter pylori GI tract infection", "Gastroesophageal reflux disease (GERD)", "Prevention of NSAID-induced gastropathy", "Zollinger-Ellison syndrome"], quiz: "F4" },
  { generic: "Pantoprazole", brand: ["Protonix"], class: "Proton pump inhibitor (PPI)", indications: ["Gastroesophageal reflux disease (GERD)", "Gastric hypersecretion", "Zollinger-Ellison syndrome"], quiz: "F4" },
  { generic: "Omeprazole", brand: ["Prilosec"], class: "Proton pump inhibitor (PPI)", indications: ["Duodenal or gastric ulcer disease", "Gastroesophageal reflux disease (GERD)", "Helicobacter pylori GI tract infection"], quiz: "F4" },
  { generic: "Lansoprazole", brand: ["Prevacid"], class: "Proton pump inhibitor (PPI)", indications: ["Duodenal or gastric ulcer disease", "Gastroesophageal reflux disease (GERD)", "Helicobacter pylori GI tract infection"], quiz: "F4" },
  { generic: "Famotidine", brand: ["Pepcid"], class: "Histamine H2 receptor antagonist (H2RA)", indications: ["Duodenal or gastric ulcer disease", "Gastroesophageal reflux disease (GERD)"], quiz: "F4" },
  { generic: "Polyethylene Glycol", brand: ["Golytely"], class: "Hyperosmotic laxative", indications: ["Colonoscopy or barium enema preparation", "Constipation"], quiz: "F4" },
  { generic: "Cyanocobalamin", brand: ["Cobolin-M"], class: "Essential vitamin (B12)", indications: ["Cobalamin (vitamin B12) deficiency"], quiz: "F4" },
  { generic: "Potassium Chloride", brand: ["Klor-Con"], class: "Electrolyte, potassium", indications: ["Hypokalemia"], quiz: "F4" },

  // ── F5: Women's / Men's Health ──────────────────────────────────────────
  { generic: "Sildenafil", brand: ["Viagra", "Revatio"], class: "Phosphodiesterase-5 inhibitor (PDE-5 inhibitor)", indications: ["Erectile dysfunction", "Pulmonary hypertension"], quiz: "F5" },
  { generic: "Tadalafil", brand: ["Adcirca", "Cialis"], class: "Phosphodiesterase-5 inhibitor (PDE-5 inhibitor)", indications: ["Benign prostatic hyperplasia (BPH)", "Erectile dysfunction", "Pulmonary hypertension"], quiz: "F5" },
  { generic: "Tamsulosin", brand: ["Flomax"], class: "Alpha-1 adrenergic blocker", indications: ["Benign prostatic hyperplasia (BPH)"], quiz: "F5" },
  { generic: "Tolterodine", brand: ["Detrol", "Detrol LA"], class: "Antimuscarinic", indications: ["Overactive bladder"], quiz: "F5" },
  { generic: "Oxybutynin", brand: ["Ditropan"], class: "Urinary antispasmodic", indications: ["Overactive bladder", "Neurogenic bladder"], quiz: "F5" },
  { generic: "Levothyroxine", brand: ["Synthroid"], class: "Thyroid supplement", indications: ["Hypothyroidism"], quiz: "F5" },
  { generic: "Thyroid desiccated", brand: ["Armour Thyroid"], class: "Thyroid supplement", indications: ["Hypothyroidism"], quiz: "F5" },
  { generic: "Alendronate", brand: ["Fosamax", "Binosto"], class: "Bisphosphonate", indications: ["Postmenopausal osteoporosis", "Osteoporosis in men", "Glucocorticoid-induced osteoporosis", "Paget disease"], quiz: "F5" },
  { generic: "Ibandronate", brand: ["Boniva"], class: "Bisphosphonate", indications: ["Postmenopausal osteoporosis", "Prevention of postmenopausal osteoporosis"], quiz: "F5" },
  { generic: "Risedronate", brand: ["Actonel", "Atelvia"], class: "Bisphosphonate", indications: ["Postmenopausal osteoporosis", "Paget disease", "Osteoporosis due to glucocorticoids", "Osteoporosis in men"], quiz: "F5" },
  { generic: "Raloxifene", brand: ["Evista"], class: "Selective estrogen receptor modulator (SERM)", indications: ["Prevention of breast cancer in postmenopausal women", "Prevention or treatment of postmenopausal osteoporosis"], quiz: "F5" },

  // ── F6: HTN / Lipids ────────────────────────────────────────────────────
  { generic: "Lisinopril", brand: ["Prinivil", "Zestril"], class: "Angiotensin converting enzyme inhibitor (ACE inhibitor)", indications: ["Heart failure", "Hypertension", "Myocardial infarction"], quiz: "F6" },
  { generic: "Ramipril", brand: ["Altace"], class: "Angiotensin converting enzyme inhibitor (ACE inhibitor)", indications: ["Heart failure", "Hypertension", "Reduce risk of cardiovascular events and death from cardiovascular disease"], quiz: "F6" },
  { generic: "Losartan", brand: ["Cozaar"], class: "Angiotensin II receptor blocker (ARB)", indications: ["Diabetic nephropathy", "Hypertension"], quiz: "F6" },
  { generic: "Atenolol", brand: ["Tenormin"], class: "Beta-blocker, cardioselective", indications: ["Angina", "Hypertension"], quiz: "F6" },
  { generic: "Metoprolol", brand: ["Lopressor", "Toprol XL"], class: "Beta-blocker", indications: ["Angina", "Heart failure", "Hypertension", "Myocardial infarction"], quiz: "F6" },
  { generic: "Amlodipine", brand: ["Norvasc"], class: "Calcium channel blocker (CCB)", indications: ["Angina", "Hypertension"], quiz: "F6" },
  { generic: "Furosemide", brand: ["Lasix"], class: "Loop diuretic", indications: ["Edema", "Hypertension"], quiz: "F6" },
  { generic: "Hydrochlorothiazide", brand: [], class: "Thiazide diuretic", indications: ["Edema", "Hypertension"], quiz: "F6" },
  { generic: "Atorvastatin", brand: ["Lipitor"], class: "HMG-CoA reductase inhibitor (statin)", indications: ["Hyperlipidemia", "Primary and secondary prevention of atherosclerotic cardiovascular disease", "Familial hypercholesterolemia"], quiz: "F6" },
  { generic: "Simvastatin", brand: ["Zocor"], class: "HMG-CoA reductase inhibitor (statin)", indications: ["Hyperlipidemia", "Primary and secondary prevention of atherosclerotic cardiovascular disease", "Familial hypercholesterolemia"], quiz: "F6" },
  { generic: "Fenofibrate", brand: ["Lofibra", "Tricor"], class: "Antihyperlipidemic (fibrate)", indications: ["Hypercholesterolemia", "Hypertriglyceridemia"], quiz: "F6" },

  // ── F7: Antibiotics I ───────────────────────────────────────────────────
  { generic: "Azithromycin", brand: ["Zithromax", "Z-Pak"], class: "Macrolide antibiotic", indications: ["Bacterial sinusitis", "Community-acquired pneumonia", "Streptococcal pharyngitis"], quiz: "F7" },
  { generic: "Ciprofloxacin (oral)", brand: ["Cipro", "Cipro XR"], class: "Fluoroquinolone antibiotic", indications: ["Bronchitis", "Sinusitis", "Urinary tract infection (UTI)"], quiz: "F7" },
  { generic: "Ciprofloxacin (ear drops)", brand: ["Cetraxal", "Otiprio"], class: "Fluoroquinolone antibiotic", indications: ["Otitis externa", "Otitis media with effusion"], quiz: "F7" },
  { generic: "Levofloxacin", brand: ["Levaquin"], class: "Fluoroquinolone antibiotic", indications: ["Bacterial sinusitis", "Bronchitis", "Community-acquired pneumonia"], quiz: "F7" },
  { generic: "Amoxicillin", brand: ["Amoxil"], class: "Beta-lactam antibiotic (aminopenicillin)", indications: ["Acute otitis media", "Streptococcal pharyngitis"], quiz: "F7" },
  { generic: "Penicillin", brand: ["-"], class: "Beta-lactam antibiotic", indications: ["Otitis media", "Streptococcal pharyngitis"], quiz: "F7" },
  { generic: "Amoxicillin/Clavulanate", brand: ["Augmentin"], class: "Beta-lactam antibiotic + Beta-lactamase inhibitor", indications: ["Otitis media", "Sinusitis", "Urinary tract infections"], quiz: "F7" },
  { generic: "Cephalexin", brand: ["Keflex"], class: "1st generation cephalosporin", indications: ["Otitis media", "Urinary tract infection (UTI)", "Streptococcal pharyngitis"], quiz: "F7" },
  { generic: "Cefdinir", brand: ["Omnicef"], class: "3rd generation cephalosporin", indications: ["Acute otitis media", "Pharyngitis", "Bronchitis", "Community-acquired pneumonia"], quiz: "F7" },
  { generic: "Valacyclovir", brand: ["Valtrex"], class: "Viral DNA polymerase inhibitor (antiviral)", indications: ["Herpes simplex", "Herpes zoster", "Varicella"], quiz: "F7" },
  { generic: "Oseltamivir", brand: ["Tamiflu"], class: "Neuraminidase inhibitor (antiviral)", indications: ["Influenza"], quiz: "F7" },

  // ── F8: Antibiotics II ──────────────────────────────────────────────────
  { generic: "Clindamycin (oral)", brand: ["Cleocin"], class: "Lincosamide antibiotic", indications: ["Infection of skin or subcutaneous tissue", "Lower respiratory tract infection"], quiz: "F8" },
  { generic: "Clindamycin (topical)", brand: ["Cleocin T"], class: "Lincosamide antibiotic", indications: ["Acne vulgaris"], quiz: "F8" },
  { generic: "Doxycycline", brand: ["Vibramycin"], class: "Tetracycline antibiotic", indications: ["Acne vulgaris", "Staphylococcal infection of the skin"], quiz: "F8" },
  { generic: "Metronidazole", brand: ["Flagyl"], class: "Nitroimidazole antibiotic, antiprotozoal", indications: ["Abscess"], quiz: "F8" },
  { generic: "Chlorhexidine Gluconate", brand: ["Peridex", "Hibiclens"], class: "Antibacterial cleansing agent", indications: ["Gingivitis", "Skin or wound cleansing"], quiz: "F8" },
  { generic: "Mupirocin", brand: ["Bactroban"], class: "Topical antibiotic", indications: ["Impetigo"], quiz: "F8" },
  { generic: "Nitrofurantoin", brand: ["Macrodantin", "Macrobid"], class: "Nitrofuran antibiotic", indications: ["Urinary tract infection (UTI)"], quiz: "F8" },
  { generic: "Trimethoprim-Sulfamethoxazole", brand: ["Bactrim", "Septra"], class: "Sulfonamide antibiotic", indications: ["Urinary tract infection (UTI)"], quiz: "F8" },
  { generic: "Fluconazole", brand: ["Diflucan"], class: "Imidazole antifungal", indications: ["Candidiasis"], quiz: "F8" },
  { generic: "Ketoconazole", brand: ["Nizoral"], class: "Imidazole antifungal", indications: ["Dandruff", "Tinea corporis", "Tinea cruris", "Tinea pedis"], quiz: "F8" },
  { generic: "Nystatin (systemic)", brand: ["Bio-Statin"], class: "Polyene antifungal", indications: ["Oropharyngeal candidiasis"], quiz: "F8" },
  { generic: "Nystatin (topical)", brand: ["Mycostatin", "Nyamyc", "Nystop"], class: "Polyene antifungal", indications: ["Candidiasis of skin"], quiz: "F8" },
  { generic: "Clobetasol", brand: ["Temovate"], class: "Topical corticosteroid", indications: ["Plaque psoriasis"], quiz: "F8" },
  { generic: "Prednisone", brand: ["Deltasone"], class: "Corticosteroid", indications: ["Disorders due to an inflammatory response (e.g., asthma, ulcerative colitis, multiple sclerosis, rheumatoid arthritis)"], quiz: "F8" },

  // ── F9: Antidepressants ─────────────────────────────────────────────────
  { generic: "Amitriptyline", brand: ["Elavil"], class: "Tricyclic antidepressant (TCA)", indications: ["Depression"], quiz: "F9" },
  { generic: "Nortriptyline", brand: ["Pamelor"], class: "Tricyclic antidepressant (TCA)", indications: ["Depression"], quiz: "F9" },
  { generic: "Citalopram", brand: ["Celexa"], class: "Selective serotonin reuptake inhibitor (SSRI)", indications: ["Depression"], quiz: "F9" },
  { generic: "Paroxetine", brand: ["Paxil", "Paxil CR"], class: "Selective serotonin reuptake inhibitor (SSRI)", indications: ["Depression", "Generalized anxiety disorder", "Social anxiety disorder", "Obsessive compulsive disorder (OCD)", "Panic disorder", "Posttraumatic stress disorder (PTSD)", "Premenstrual dysphoric disorder (PMDD)", "Vasomotor symptoms of menopause"], quiz: "F9" },
  { generic: "Escitalopram", brand: ["Lexapro"], class: "Selective serotonin reuptake inhibitor (SSRI)", indications: ["Depression", "Generalized anxiety disorder"], quiz: "F9" },
  { generic: "Fluoxetine", brand: ["Prozac", "Sarafem"], class: "Selective serotonin reuptake inhibitor (SSRI)", indications: ["Depression", "Obsessive compulsive disorder (OCD)", "Panic disorder", "Premenstrual dysphoric disorder (PMDD)"], quiz: "F9" },
  { generic: "Sertraline", brand: ["Zoloft"], class: "Selective serotonin reuptake inhibitor (SSRI)", indications: ["Depression", "Obsessive compulsive disorder (OCD)", "Panic disorder", "Premenstrual dysphoric disorder (PMDD)"], quiz: "F9" },
  { generic: "Duloxetine", brand: ["Cymbalta"], class: "Serotonin/norepinephrine reuptake inhibitor (SNRI)", indications: ["Anxiety", "Depression", "Diabetic peripheral neuropathy pain"], quiz: "F9" },
  { generic: "Venlafaxine", brand: ["Effexor", "Effexor XR"], class: "Serotonin/norepinephrine reuptake inhibitor (SNRI)", indications: ["Depression", "Generalized anxiety disorder", "Panic disorder", "Social anxiety disorder"], quiz: "F9" },
  { generic: "Lithium", brand: ["Eskalith", "Eskalith-CR", "Lithobid"], class: "Antimanic", indications: ["Bipolar disorder"], quiz: "F9" },
  { generic: "Mirtazapine", brand: ["Remeron"], class: "Antidepressant, alpha-2 antagonist", indications: ["Depression"], quiz: "F9" },
  { generic: "Bupropion", brand: ["Wellbutrin", "Zyban"], class: "Monocyclic antidepressant", indications: ["Depression", "Seasonal affective disorder", "Smoking cessation assistance"], quiz: "F9" },
  { generic: "Trazodone", brand: ["Desyrel"], class: "Antidepressant, serotonin antagonist and reuptake inhibitor (SARI)", indications: ["Depression (uncommon use)", "Insomnia (off-label but typical use)"], quiz: "F9" },

  // ── F10: Antipsychotics / Antianxiety ───────────────────────────────────
  { generic: "Aripiprazole", brand: ["Abilify"], class: "2nd generation (atypical) antipsychotic", indications: ["Bipolar disorder", "Schizophrenia", "Depression", "Tourette's disorder"], quiz: "F10" },
  { generic: "Olanzapine", brand: ["Zyprexa"], class: "2nd generation (atypical) antipsychotic", indications: ["Bipolar disorder", "Schizophrenia", "Depression"], quiz: "F10" },
  { generic: "Risperidone", brand: ["Risperdal"], class: "2nd generation (atypical) antipsychotic", indications: ["Irritability associated with autism spectrum disorder", "Bipolar disorder", "Schizophrenia", "Tourette syndrome"], quiz: "F10" },
  { generic: "Quetiapine", brand: ["Seroquel", "Seroquel XR"], class: "2nd generation (atypical) antipsychotic", indications: ["Bipolar disorder", "Major depressive disorder (adjunct to antidepressant)", "Schizophrenia"], quiz: "F10" },
  { generic: "Alprazolam", brand: ["Xanax"], class: "Benzodiazepine [C-IV]", indications: ["Anxiety", "Panic disorder"], quiz: "F10" },
  { generic: "Clonazepam", brand: ["Klonopin"], class: "Benzodiazepine [C-IV]", indications: ["Panic disorder", "Seizure"], quiz: "F10" },
  { generic: "Diazepam", brand: ["Valium"], class: "Benzodiazepine [C-IV]", indications: ["Alcohol withdrawal syndrome", "Anxiety", "Seizure"], quiz: "F10" },
  { generic: "Lorazepam", brand: ["Ativan"], class: "Benzodiazepine [C-IV]", indications: ["Anxiety", "Insomnia due to anxiety or situational stress"], quiz: "F10" },
  { generic: "Buspirone", brand: ["BuSpar"], class: "Antianxiety", indications: ["Anxiety"], quiz: "F10" },
];

const winterDrugs = [
  // ── W1: Cardiovascular I ────────────────────────────────────────────────
  { generic: "Benazepril", brand: ["Lotensin"], class: "Angiotensin converting enzyme inhibitor (ACE-I)", indications: ["Hypertension"], quiz: "W1" },
  { generic: "Enalapril", brand: ["Vasotec"], class: "Angiotensin converting enzyme inhibitor (ACE-I)", indications: ["Hypertension", "Heart failure"], quiz: "W1" },
  { generic: "Quinapril", brand: ["Accupril"], class: "Angiotensin converting enzyme inhibitor (ACE-I)", indications: ["Hypertension", "Heart failure"], quiz: "W1" },
  { generic: "Irbesartan", brand: ["Avapro"], class: "Angiotensin II receptor antagonist (ARB)", indications: ["Hypertension", "Diabetic nephropathy (type 2 diabetes)"], quiz: "W1" },
  { generic: "Olmesartan", brand: ["Benicar"], class: "Angiotensin II receptor antagonist (ARB)", indications: ["Hypertension"], quiz: "W1" },
  { generic: "Doxazosin", brand: ["Cardura", "Cardura XL"], class: "Alpha-1 adrenergic blocker", indications: ["Hypertension", "Benign prostatic hyperplasia (BPH)"], quiz: "W1" },
  { generic: "Terazosin", brand: ["Hytrin"], class: "Alpha-1 adrenergic blocker", indications: ["Hypertension", "Benign prostatic hyperplasia (BPH)"], quiz: "W1" },
  { generic: "Carvedilol", brand: ["Coreg", "Coreg CR"], class: "Alpha/beta-adrenergic blocker", indications: ["Hypertension", "Heart failure"], quiz: "W1" },
  { generic: "Labetalol", brand: ["Normodyne"], class: "Alpha/beta-adrenergic blocker", indications: ["Hypertension"], quiz: "W1" },
  { generic: "Propranolol", brand: ["Inderal", "Inderal LA", "Inderal XL"], class: "Beta-adrenergic blocker, nonselective", indications: ["Hypertension", "Angina pectoris", "Cardiac dysrhythmia", "Migraine"], quiz: "W1" },

  // ── W2: Cardiovascular II ───────────────────────────────────────────────
  { generic: "Diltiazem", brand: ["Cardizem", "Cartia XT", "Dilt-XR", "Tiazac"], class: "Calcium channel blocker (non-dihydropyridine)", indications: ["Hypertension", "Angina", "Atrial arrhythmia", "Paroxysmal supraventricular tachycardia"], quiz: "W2" },
  { generic: "Verapamil", brand: ["Calan", "Calan SR"], class: "Calcium channel blocker (non-dihydropyridine)", indications: ["Hypertension", "Angina", "Atrial arrhythmia", "Paroxysmal supraventricular tachycardia"], quiz: "W2" },
  { generic: "Nifedipine", brand: ["Adalat CC", "Procardia XL"], class: "Calcium channel blocker (dihydropyridine)", indications: ["Hypertension", "Angina"], quiz: "W2" },
  { generic: "Isosorbide Mononitrate", brand: ["Imdur"], class: "Nitrate", indications: ["Angina"], quiz: "W2" },
  { generic: "Nitroglycerin", brand: ["Minitran", "Nitro-Dur", "Nitrostat"], class: "Nitrate", indications: ["Angina", "Anal fissure"], quiz: "W2" },
  { generic: "Spironolactone", brand: ["Aldactone"], class: "Potassium-sparing diuretic", indications: ["Hypertension", "Edema", "Heart failure", "Hypokalemia"], quiz: "W2" },
  { generic: "Triamterene/hydrochlorothiazide", brand: ["Dyazide", "Maxzide"], class: "Potassium-sparing/thiazide diuretic combination", indications: ["Hypertension", "Edema"], quiz: "W2" },
  { generic: "Chlorthalidone", brand: ["Thalitone"], class: "Thiazide diuretic", indications: ["Hypertension", "Edema"], quiz: "W2" },
  { generic: "Clonidine", brand: ["Catapres"], class: "Alpha-2 adrenergic agonist", indications: ["Hypertension", "Attention-deficit hyperactivity disorder (ADHD)"], quiz: "W2" },
  { generic: "Tizanidine", brand: ["Zanaflex"], class: "Alpha-2 adrenergic agonist", indications: ["Muscle spasticity"], quiz: "W2" },

  // ── W3: Cardiovascular III ──────────────────────────────────────────────
  { generic: "Ezetimibe", brand: ["Zetia"], class: "Antihyperlipidemic (cholesterol absorption inhibitor)", indications: ["Hyperlipidemia"], quiz: "W3" },
  { generic: "Gemfibrozil", brand: ["Lopid"], class: "Antihyperlipidemic (fibrate)", indications: ["Hyperlipidemia", "Coronary atherosclerosis"], quiz: "W3" },
  { generic: "Niacin", brand: ["Niaspan", "Slo-Niacin"], class: "Antihyperlipidemic (nicotinic acid)", indications: ["Hyperlipidemia", "Myocardial infarction"], quiz: "W3" },
  { generic: "Lovastatin", brand: ["Altoprev"], class: "HMG-CoA reductase inhibitor (statin)", indications: ["Hyperlipidemia", "Coronary atherosclerosis"], quiz: "W3" },
  { generic: "Pravastatin", brand: ["Pravachol"], class: "HMG-CoA reductase inhibitor (statin)", indications: ["Hyperlipidemia", "Coronary atherosclerosis", "Cerebrovascular accident prevention"], quiz: "W3" },
  { generic: "Rosuvastatin", brand: ["Crestor"], class: "HMG-CoA reductase inhibitor (statin)", indications: ["Hyperlipidemia"], quiz: "W3" },
  { generic: "Prasugrel", brand: ["Effient"], class: "Antiplatelet agent", indications: ["Thromboembolism prevention"], quiz: "W3" },
  { generic: "Dabigatran", brand: ["Pradaxa"], class: "Direct oral anticoagulant (DOAC)", indications: ["Atrial fibrillation (stroke prevention)", "Deep vein thrombosis (DVT)", "Pulmonary embolism (PE)", "Thromboembolism prevention", "Cerebrovascular accident"], quiz: "W3" },
  { generic: "Warfarin", brand: ["Coumadin"], class: "Anticoagulant (vitamin K antagonist)", indications: ["Atrial fibrillation", "Deep vein thrombosis (DVT)", "Pulmonary embolism (PE)", "Thrombosis"], quiz: "W3" },
  { generic: "Digoxin", brand: ["Lanoxin"], class: "Digitalis glycoside", indications: ["Heart failure", "Supraventricular tachyarrhythmia"], quiz: "W3" },

  // ── W4: Pain I ──────────────────────────────────────────────────────────
  { generic: "Celecoxib", brand: ["Celebrex"], class: "Nonsteroidal anti-inflammatory agent (COX-2 inhibitor)", indications: ["Osteoarthritis", "Rheumatoid arthritis", "Pain"], quiz: "W4" },
  { generic: "Diclofenac", brand: ["Voltaren (gel)", "Zipsor (oral)", "Zorvolex (oral)"], class: "Nonsteroidal anti-inflammatory agent", indications: ["Osteoarthritis", "Rheumatoid arthritis", "Pain", "Dysmenorrhea", "Migraine"], quiz: "W4" },
  { generic: "Indomethacin", brand: ["Indocin"], class: "Nonsteroidal anti-inflammatory agent", indications: ["Osteoarthritis", "Rheumatoid arthritis", "Pain", "Gout"], quiz: "W4" },
  { generic: "Naproxen", brand: ["Naprosyn"], class: "Nonsteroidal anti-inflammatory agent", indications: ["Osteoarthritis", "Rheumatoid arthritis", "Pain", "Gout", "Fever"], quiz: "W4" },
  { generic: "Lidocaine patch", brand: ["Lidoderm"], class: "Local anesthetic", indications: ["Pain"], quiz: "W4" },
  { generic: "Allopurinol", brand: ["Zyloprim"], class: "Xanthine oxidase inhibitor", indications: ["Gout"], quiz: "W4" },
  { generic: "Colchicine", brand: ["Colcrys"], class: "Antigout agent", indications: ["Gout"], quiz: "W4" },
  { generic: "Baclofen", brand: ["Lioresal"], class: "Centrally acting skeletal muscle relaxant", indications: ["Spasticity"], quiz: "W4" },
  { generic: "Cyclobenzaprine", brand: ["Flexeril"], class: "Centrally acting skeletal muscle relaxant", indications: ["Spasticity", "Muscle spasm"], quiz: "W4" },

  // ── W5: Pain II ─────────────────────────────────────────────────────────
  { generic: "Codeine", brand: ["Tylenol with Codeine"], class: "Opioid [C-III]", indications: ["Pain", "Cough"], quiz: "W5" },
  { generic: "Fentanyl (Transdermal)", brand: ["Duragesic"], class: "Opioid [C-II]", indications: ["Pain (severe, chronic)"], quiz: "W5" },
  { generic: "Methadone", brand: ["Dolophine"], class: "Opioid [C-II]", indications: ["Pain", "Opioid detoxification"], quiz: "W5" },
  { generic: "Morphine", brand: ["Kadian", "MS Contin"], class: "Opioid [C-II]", indications: ["Pain"], quiz: "W5" },
  { generic: "Tramadol", brand: ["Ultram"], class: "Opioid [C-IV]", indications: ["Pain"], quiz: "W5" },
  { generic: "Buprenorphine/naloxone", brand: ["Suboxone"], class: "Opioid partial agonist and antagonist combination [C-III]", indications: ["Opioid use disorder"], quiz: "W5" },
  { generic: "Naloxone", brand: ["Narcan"], class: "Opioid antagonist", indications: ["Opioid overdose"], quiz: "W5" },
  { generic: "Gabapentin", brand: ["Neurontin"], class: "Gamma aminobutyric acid (GABA) analog, anticonvulsant", indications: ["Seizures", "Nerve pain"], quiz: "W5" },
  { generic: "Pregabalin", brand: ["Lyrica"], class: "Analgesic, anticonvulsant", indications: ["Nerve pain", "Seizures", "Fibromyalgia"], quiz: "W5" },

  // ── W6: Women's / Men's Health / HIV ────────────────────────────────────
  { generic: "Conjugated estrogen", brand: ["Premarin"], class: "Estrogen", indications: ["Menopause", "Primary ovarian failure"], quiz: "W6" },
  { generic: "Estradiol", brand: ["Estrace"], class: "Estrogen", indications: ["Abnormal vasomotor function", "Menopause", "Breast cancer", "Decreased estrogen level"], quiz: "W6" },
  { generic: "Ethinyl estradiol (vaginal ring)", brand: ["NuvaRing"], class: "Contraceptive", indications: ["Contraception"], quiz: "W6" },
  { generic: "Oral contraceptives", brand: ["Various"], class: "Contraceptive", indications: ["Contraception", "Acne"], quiz: "W6" },
  { generic: "Medroxyprogesterone", brand: ["Depo-Provera", "Provera"], class: "Progestin hormone", indications: ["Breast cancer", "Contraception", "Amenorrhea"], quiz: "W6" },
  { generic: "Testosterone (topical)", brand: ["AndroGel", "Androderm"], class: "Androgen", indications: ["Hypogonadism"], quiz: "W6" },
  { generic: "Finasteride", brand: ["Proscar", "Propecia"], class: "5-alpha reductase inhibitor", indications: ["Benign prostatic hyperplasia (BPH)", "Alopecia"], quiz: "W6" },
  { generic: "Efavirenz", brand: ["Sustiva"], class: "Antiretroviral agent, reverse transcriptase inhibitor", indications: ["HIV (Human Immunodeficiency Virus)"], quiz: "W6" },
  { generic: "Emtricitabine/tenofovir", brand: ["Truvada"], class: "Antiretroviral agent, reverse transcriptase inhibitor", indications: ["HIV (Human Immunodeficiency Virus)", "Pre-exposure prophylaxis (PrEP) for HIV"], quiz: "W6" },

  // ── W7: Asthma / COPD ───────────────────────────────────────────────────
  { generic: "Budesonide/formoterol", brand: ["Symbicort"], class: "Inhaled corticosteroid/bronchodilator combination (ICS/LABA)", indications: ["Asthma", "Chronic obstructive pulmonary disease (COPD)"], quiz: "W7" },
  { generic: "Fluticasone (nasal)", brand: ["Flonase"], class: "Intranasal adrenal glucocorticosteroid", indications: ["Rhinitis"], quiz: "W7" },
  { generic: "Fluticasone (oral inhaled)", brand: ["Flovent Diskus"], class: "Inhaled adrenal corticosteroid (ICS)", indications: ["Asthma"], quiz: "W7" },
  { generic: "Fluticasone/salmeterol", brand: ["Advair Diskus", "Advair HFA", "AirDuo RespiClick"], class: "Inhaled corticosteroid and long-acting beta-2 adrenergic agonist combination (ICS/LABA)", indications: ["Asthma", "Chronic obstructive pulmonary disease (COPD)"], quiz: "W7" },
  { generic: "Ipratropium/albuterol", brand: ["Combivent Respimat"], class: "Anticholinergic/selective beta-2 agonist combination (SAMA/SABA)", indications: ["Chronic obstructive pulmonary disease (COPD)"], quiz: "W7" },
  { generic: "Methylprednisolone", brand: ["Medrol"], class: "Adrenal corticosteroid", indications: ["Inflammation"], quiz: "W7" },
  { generic: "Mometasone (nasal)", brand: ["Nasonex"], class: "Intranasal corticosteroid", indications: ["Rhinitis"], quiz: "W7" },
  { generic: "Tiotropium", brand: ["Spiriva HandiHaler", "Spiriva Respimat"], class: "Anticholinergic bronchodilator (LAMA)", indications: ["Asthma", "Chronic obstructive pulmonary disease (COPD)"], quiz: "W7" },
  { generic: "Triamcinolone (topical)", brand: ["-"], class: "Topical corticosteroid", indications: ["Skin rash"], quiz: "W7" },
  { generic: "Varenicline", brand: ["Chantix"], class: "Smoking cessation agent", indications: ["Tobacco cessation"], quiz: "W7" },

  // ── W8: Neurology ───────────────────────────────────────────────────────
  { generic: "Carbidopa/levodopa", brand: ["Sinemet"], class: "Antiparkinson agent", indications: ["Parkinson disease"], quiz: "W8" },
  { generic: "Divalproex", brand: ["Depakote"], class: "Anticonvulsant", indications: ["Seizures", "Manic bipolar disorder"], quiz: "W8" },
  { generic: "Lamotrigine", brand: ["Lamictal"], class: "Anticonvulsant", indications: ["Bipolar disorder", "Seizures"], quiz: "W8" },
  { generic: "Levetiracetam", brand: ["Keppra"], class: "Anticonvulsant", indications: ["Seizures"], quiz: "W8" },
  { generic: "Topiramate", brand: ["Topamax"], class: "Anticonvulsant", indications: ["Migraine", "Seizures"], quiz: "W8" },
  { generic: "Pramipexole", brand: ["Mirapex"], class: "Dopamine agonist", indications: ["Parkinson disease", "Restless leg syndrome"], quiz: "W8" },
  { generic: "Ropinirole", brand: ["Requip"], class: "Dopamine agonist", indications: ["Parkinson disease", "Restless legs syndrome"], quiz: "W8" },
  { generic: "Phenobarbital", brand: ["Luminal"], class: "Long-acting barbiturate", indications: ["Epilepsy", "Daytime sedation"], quiz: "W8" },
  { generic: "Sumatriptan", brand: ["Imitrex"], class: "Antimigraine serotonin receptor agonist", indications: ["Migraine", "Cluster headaches"], quiz: "W8" },

  // ── W9: Miscellaneous ───────────────────────────────────────────────────
  { generic: "Benzonatate", brand: ["Tessalon Perles"], class: "Antitussive", indications: ["Cough"], quiz: "W9" },
  { generic: "Bimatoprost", brand: ["Lumigan", "Latisse"], class: "Prostaglandin, antiglaucoma agent, cosmetic agent for eyelash growth", indications: ["Ocular hypertension", "Open-angle glaucoma", "Hypotrichosis of eyelashes"], quiz: "W9" },
  { generic: "Hydrocortisone (topical)", brand: ["Cortizone"], class: "Topical corticosteroid", indications: ["Skin disorders"], quiz: "W9" },
  { generic: "Hydroxychloroquine", brand: ["Plaquenil"], class: "Aminoquinoline", indications: ["Lupus", "Malaria"], quiz: "W9" },
  { generic: "Latanoprost", brand: ["Xalatan"], class: "Prostaglandin, antiglaucoma agent", indications: ["Ocular hypertension", "Open-angle glaucoma"], quiz: "W9" },
  { generic: "Methotrexate", brand: ["Trexall"], class: "Antimetabolite", indications: ["Psoriasis", "Rheumatoid arthritis"], quiz: "W9" },
  { generic: "Ondansetron", brand: ["Zofran"], class: "Antiemetic (5-HT3 receptor antagonist)", indications: ["Nausea"], quiz: "W9" },
  { generic: "Phenazopyridine", brand: ["Pyridium"], class: "Urinary tract analgesic", indications: ["Dysuria"], quiz: "W9" },
  { generic: "Promethazine", brand: ["Phenergan"], class: "Phenothiazine antihistamine", indications: ["Motion sickness", "Nausea & vomiting"], quiz: "W9" },
];

// Combined pool used throughout the app
const allDrugs = [...fallDrugs, ...winterDrugs];
