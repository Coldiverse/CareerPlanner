/**
 * CAREERS DATABASE - Phase 3
 *
 * 144 total careers across 4 tiers:
 * - Core (35): High-demand, clear career paths
 * - Advanced (43): Specialized education, leadership roles
 * - Niche (44): Specific interests, less common, creative combinations
 * - Exploratory (22): Rare combinations, emerging fields, unique intersections
 *
 * All careers mapped to actual subcategories with realistic weights
 * Realistic US salaries (~2026), education paths, and growth trajectories
 */

export const CAREERS = [
  // CORE TIER (35 careers)
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    tier: 'core',
    description: 'Designs, builds, and maintains software applications and systems. Works across frontend, backend, or full-stack development.',
    requirements: [
      { subcategoryId: 'software_development', weight: 0.95 },
      { subcategoryId: 'algebra_discrete', weight: 0.7 },
      { subcategoryId: 'databases_backend', weight: 0.75 }
    ],
    context: {
      salary: { entry: 85000, mid: 140000, senior: 200000 },
      education: 'BS Computer Science or related; bootcamp acceptable for entry',
      jobOutlook: '8% growth, very high demand',
      yearsToEntry: 4,
      skills: ['Python', 'JavaScript', 'System Design', 'Problem Solving'],
      careerPath: 'Junior Dev → Mid-level Dev → Senior Dev → Staff/Principal Engineer',
      relatedCareers: ['web-developer', 'backend-engineer', 'mobile-developer'],
      discoveryHint: 'If you love building things and solving logic puzzles, this is the path.'
    }
  },
  {
    id: 'registered-nurse',
    title: 'Registered Nurse',
    tier: 'core',
    description: 'Provides direct patient care, administers medications, and monitors health conditions in hospitals, clinics, and other settings.',
    requirements: [
      { subcategoryId: 'nursing', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.85 },
      { subcategoryId: 'biochemistry', weight: 0.6 }
    ],
    context: {
      salary: { entry: 62000, mid: 80000, senior: 110000 },
      education: 'BSN (Bachelor of Science in Nursing); RN licensure exam required',
      jobOutlook: '6% growth, consistently high demand',
      yearsToEntry: 4,
      skills: ['Patient Care', 'Clinical Assessment', 'Communication', 'Critical Thinking'],
      careerPath: 'RN Bedside Nurse → Charge Nurse → Nurse Manager → Nursing Leadership',
      relatedCareers: ['nurse-practitioner', 'nurse-anesthetist', 'nursing-educator'],
      discoveryHint: 'Make a direct difference in people\'s health and well-being every day.'
    }
  },
  {
    id: 'high-school-teacher',
    title: 'High School Teacher',
    tier: 'core',
    description: 'Educates students in specific subject areas, develops curriculum, and assesses student learning.',
    requirements: [
      { subcategoryId: 'k12_teaching', weight: 0.95 },
      { subcategoryId: 'creative_writing', weight: 0.6 },
      { subcategoryId: 'applied_mathematics', weight: 0.65 }
    ],
    context: {
      salary: { entry: 38000, mid: 55000, senior: 75000 },
      education: 'BA in subject area + teaching credential/MAT',
      jobOutlook: '4% growth, moderate demand with regional variation',
      yearsToEntry: 4,
      skills: ['Communication', 'Curriculum Design', 'Classroom Management', 'Assessment'],
      careerPath: 'New Teacher → Experienced Teacher → Department Chair → Administration',
      relatedCareers: ['college-professor', 'curriculum-developer', 'school-principal'],
      discoveryHint: 'Inspire the next generation and shape young minds daily.'
    }
  },
  {
    id: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    tier: 'core',
    description: 'Designs, develops, and tests mechanical devices and systems including engines, machines, and mechanical equipment.',
    requirements: [
      { subcategoryId: 'mechanical_engineering', weight: 0.95 },
      { subcategoryId: 'applied_mathematics', weight: 0.8 },
      { subcategoryId: 'thermodynamics_energy', weight: 0.75 }
    ],
    context: {
      salary: { entry: 68000, mid: 110000, senior: 155000 },
      education: 'BS Mechanical Engineering; PE certification optional',
      jobOutlook: '7% growth, solid demand',
      yearsToEntry: 4,
      skills: ['CAD Design', 'Physics', 'Problem Solving', 'Project Management'],
      careerPath: 'Junior Engineer → Senior Engineer → Engineering Manager → Director',
      relatedCareers: ['aerospace-engineer', 'automotive-engineer', 'robotics-engineer'],
      discoveryHint: 'Design and build the machines and systems that power the world.'
    }
  },
  {
    id: 'web-developer',
    title: 'Web Developer',
    tier: 'core',
    description: 'Creates and maintains websites and web applications using HTML, CSS, JavaScript, and modern frameworks.',
    requirements: [
      { subcategoryId: 'web_development', weight: 0.95 },
      { subcategoryId: 'human_computer_interaction', weight: 0.7 },
      { subcategoryId: 'software_development', weight: 0.8 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 140000 },
      education: 'BS Computer Science, bootcamp, or self-taught with portfolio',
      jobOutlook: '13% growth, very high demand',
      yearsToEntry: 3,
      skills: ['JavaScript', 'React/Vue', 'CSS/HTML', 'UI/UX Design'],
      careerPath: 'Junior Developer → Senior Developer → Tech Lead → Engineering Manager',
      relatedCareers: ['frontend-architect', 'ux-designer', 'full-stack-developer'],
      discoveryHint: 'Build beautiful, interactive experiences that millions use daily.'
    }
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    tier: 'core',
    description: 'Analyzes large datasets to extract insights and build predictive models. Combines statistics, programming, and domain expertise.',
    requirements: [
      { subcategoryId: 'ai_machine_learning', weight: 0.85 },
      { subcategoryId: 'statistics_probability', weight: 0.9 },
      { subcategoryId: 'databases_backend', weight: 0.7 }
    ],
    context: {
      salary: { entry: 85000, mid: 135000, senior: 190000 },
      education: 'BS in Math/Stats/CS or MS in Data Science',
      jobOutlook: '35% growth, exceptional demand',
      yearsToEntry: 4,
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistical Analysis'],
      careerPath: 'Junior Data Scientist → Senior Data Scientist → Lead Data Scientist → Director',
      relatedCareers: ['ml-engineer', 'data-engineer', 'analytics-manager'],
      discoveryHint: 'Turn raw data into actionable insights that drive business decisions.'
    }
  },
  {
    id: 'physical-therapist',
    title: 'Physical Therapist',
    tier: 'core',
    description: 'Helps patients recover from injuries and improve mobility through exercises and therapeutic techniques.',
    requirements: [
      { subcategoryId: 'rehabilitation', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.85 },
      { subcategoryId: 'applied_mathematics', weight: 0.6 }
    ],
    context: {
      salary: { entry: 60000, mid: 85000, senior: 120000 },
      education: 'DPT (Doctor of Physical Therapy); license required',
      jobOutlook: '14% growth, high demand',
      yearsToEntry: 6,
      skills: ['Patient Care', 'Anatomy', 'Therapeutic Techniques', 'Communication'],
      careerPath: 'PT → Senior PT → Clinic Manager → Director of Rehab',
      relatedCareers: ['occupational-therapist', 'sports-medicine-specialist', 'athletic-trainer'],
      discoveryHint: 'Help people regain mobility and independence after injury.'
    }
  },
  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    tier: 'core',
    description: 'Creates visual content including logos, layouts, digital graphics, and branding materials.',
    requirements: [
      { subcategoryId: 'graphic_design', weight: 0.95 },
      { subcategoryId: 'web_digital_design', weight: 0.75 },
      { subcategoryId: 'human_computer_interaction', weight: 0.65 }
    ],
    context: {
      salary: { entry: 38000, mid: 58000, senior: 85000 },
      education: 'BFA Graphic Design or related; strong portfolio essential',
      jobOutlook: '3% growth, competitive field',
      yearsToEntry: 4,
      skills: ['Adobe Creative Suite', 'Visual Design', 'Typography', 'Branding'],
      careerPath: 'Junior Designer → Mid-level Designer → Senior Designer → Creative Director',
      relatedCareers: ['ux-designer', 'art-director', 'web-designer'],
      discoveryHint: 'Combine creativity with technical skill to communicate visually.'
    }
  },
  {
    id: 'accountant',
    title: 'Certified Public Accountant (CPA)',
    tier: 'core',
    description: 'Manages financial records, prepares tax returns, and provides financial advice to individuals and businesses.',
    requirements: [
      { subcategoryId: 'accounting', weight: 0.95 },
      { subcategoryId: 'microeconomics', weight: 0.7 },
      { subcategoryId: 'applied_mathematics', weight: 0.6 }
    ],
    context: {
      salary: { entry: 52000, mid: 80000, senior: 120000 },
      education: 'BS Accounting; CPA license required',
      jobOutlook: '4% growth, steady demand',
      yearsToEntry: 5,
      skills: ['Financial Analysis', 'Tax Knowledge', 'Attention to Detail', 'Communication'],
      careerPath: 'Junior Accountant → Senior Accountant → Manager → Partner',
      relatedCareers: ['tax-specialist', 'auditor', 'financial-analyst'],
      discoveryHint: 'Help individuals and businesses manage their finances strategically.'
    }
  },
  {
    id: 'architect',
    title: 'Architect',
    tier: 'core',
    description: 'Designs buildings and structures, considering aesthetics, functionality, safety, and environmental impact.',
    requirements: [
      { subcategoryId: 'architecture', weight: 0.95 },
      { subcategoryId: 'civil_engineering', weight: 0.8 },
      { subcategoryId: 'applied_mathematics', weight: 0.65 }
    ],
    context: {
      salary: { entry: 50000, mid: 85000, senior: 140000 },
      education: 'B.Arch (5 years); architecture license required',
      jobOutlook: '4% growth, project-dependent',
      yearsToEntry: 7,
      skills: ['Design', 'CAD', 'Project Management', 'Building Codes'],
      careerPath: 'Junior Architect → Senior Architect → Associate → Principal',
      relatedCareers: ['landscape-architect', 'urban-planner', 'interior-designer'],
      discoveryHint: 'Shape the built environment and create spaces where people live and work.'
    }
  },
  {
    id: 'electrician',
    title: 'Licensed Electrician',
    tier: 'core',
    description: 'Installs, maintains, and repairs electrical systems in residential, commercial, and industrial settings.',
    requirements: [
      { subcategoryId: 'electrical_engineering', weight: 0.9 },
      { subcategoryId: 'electromagnetism', weight: 0.7 },
      { subcategoryId: 'systems_networks', weight: 0.6 }
    ],
    context: {
      salary: { entry: 35000, mid: 62000, senior: 95000 },
      education: 'High school diploma + apprenticeship (4 years); state license required',
      jobOutlook: '9% growth, consistent demand',
      yearsToEntry: 4,
      skills: ['Electrical Systems', 'Safety', 'Problem Solving', 'Technical Knowledge'],
      careerPath: 'Apprentice → Journeyman → Master Electrician → Contractor',
      relatedCareers: ['hvac-technician', 'plumber', 'solar-installer'],
      discoveryHint: 'Build and maintain critical infrastructure with hands-on technical work.'
    }
  },
  {
    id: 'psychologist',
    title: 'Clinical Psychologist',
    tier: 'core',
    description: 'Diagnoses and treats mental health disorders through psychotherapy, assessment, and behavioral interventions.',
    requirements: [
      { subcategoryId: 'clinical_counseling', weight: 0.95 },
      { subcategoryId: 'social_psychology', weight: 0.8 },
      { subcategoryId: 'neuroscience_biopsychology', weight: 0.7 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 140000 },
      education: 'PhD or PsyD in Psychology; license required',
      jobOutlook: '10% growth, increasing demand',
      yearsToEntry: 7,
      skills: ['Assessment', 'Psychotherapy', 'Research', 'Communication'],
      careerPath: 'Doctoral Intern → Licensed Psychologist → Senior Clinician → Supervisor',
      relatedCareers: ['counselor', 'psychiatrist', 'therapist'],
      discoveryHint: 'Help people understand and improve their mental health and well-being.'
    }
  },
  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    tier: 'core',
    description: 'Designs and supervises construction of infrastructure including bridges, roads, buildings, and water systems.',
    requirements: [
      { subcategoryId: 'civil_engineering', weight: 0.95 },
      { subcategoryId: 'applied_mathematics', weight: 0.85 },
      { subcategoryId: 'mechanical_engineering', weight: 0.65 }
    ],
    context: {
      salary: { entry: 65000, mid: 105000, senior: 150000 },
      education: 'BS Civil Engineering; PE license',
      jobOutlook: '5% growth, stable demand',
      yearsToEntry: 5,
      skills: ['Project Management', 'CAD', 'Structural Analysis', 'Construction Methods'],
      careerPath: 'Junior Engineer → Senior Engineer → Project Manager → Director',
      relatedCareers: ['structural-engineer', 'geotechnical-engineer', 'transportation-planner'],
      discoveryHint: 'Build the infrastructure that connects and sustains communities.'
    }
  },
  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    tier: 'core',
    description: 'Develops and executes marketing strategies to promote products or services and achieve business goals.',
    requirements: [
      { subcategoryId: 'marketing', weight: 0.95 },
      { subcategoryId: 'social_psychology', weight: 0.75 },
      { subcategoryId: 'statistics_probability', weight: 0.65 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: 'BS Business, Marketing, or related field',
      jobOutlook: '7% growth, competitive field',
      yearsToEntry: 4,
      skills: ['Strategic Planning', 'Analytics', 'Communication', 'Creativity'],
      careerPath: 'Marketing Coordinator → Manager → Senior Manager → Director',
      relatedCareers: ['brand-manager', 'product-manager', 'digital-marketer'],
      discoveryHint: 'Create campaigns that connect products with the people who need them.'
    }
  },
  {
    id: 'physician',
    title: 'Physician (MD/DO)',
    tier: 'core',
    description: 'Diagnoses and treats diseases and injuries in patients through examination, testing, and medical intervention.',
    requirements: [
      { subcategoryId: 'medicine_clinical', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.9 },
      { subcategoryId: 'biochemistry', weight: 0.8 }
    ],
    context: {
      salary: { entry: 120000, mid: 200000, senior: 350000 },
      education: 'MD or DO (4 years med school + 3-7 years residency)',
      jobOutlook: '3% growth, high demand for specialists',
      yearsToEntry: 11,
      skills: ['Diagnosis', 'Medical Knowledge', 'Decision Making', 'Patient Care'],
      careerPath: 'Resident → Attending Physician → Senior Physician → Chief of Department',
      relatedCareers: ['surgeon', 'psychiatrist', 'pediatrician'],
      discoveryHint: 'Dedicate your career to healing and improving people\'s health.'
    }
  },
  {
    id: 'lawyer',
    title: 'Attorney/Lawyer',
    tier: 'core',
    description: 'Provides legal advice, represents clients in court, and handles legal documents and contracts.',
    requirements: [
      { subcategoryId: 'law_legal_studies', weight: 0.95 },
      { subcategoryId: 'logic_reasoning', weight: 0.85 },
      { subcategoryId: 'political_philosophy', weight: 0.65 }
    ],
    context: {
      salary: { entry: 72000, mid: 130000, senior: 250000 },
      education: 'JD (Juris Doctor); bar exam required',
      jobOutlook: '2% growth, competitive field',
      yearsToEntry: 7,
      skills: ['Legal Research', 'Negotiation', 'Writing', 'Oral Advocacy'],
      careerPath: 'Associate → Senior Associate → Partner → Practice Leader',
      relatedCareers: ['judge', 'paralegal', 'legal-consultant'],
      discoveryHint: 'Champion justice and guide clients through complex legal matters.'
    }
  },
  {
    id: 'pharmacist',
    title: 'Pharmacist',
    tier: 'core',
    description: 'Dispenses medications, counsels patients on drug use, and ensures medication safety in healthcare settings.',
    requirements: [
      { subcategoryId: 'pharmacy', weight: 0.95 },
      { subcategoryId: 'biochemistry', weight: 0.85 },
      { subcategoryId: 'organic_chemistry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 110000, mid: 140000, senior: 180000 },
      education: 'PharmD (4 years); license required',
      jobOutlook: '2% growth, stable demand',
      yearsToEntry: 8,
      skills: ['Pharmacology', 'Patient Counseling', 'Medication Management', 'Chemistry'],
      careerPath: 'Pharmacist → Senior Pharmacist → Pharmacy Manager → Director',
      relatedCareers: ['pharmaceutical-scientist', 'clinical-pharmacist', 'pharmacy-technician'],
      discoveryHint: 'Be the medication expert that healthcare providers and patients trust.'
    }
  },
  {
    id: 'dentist',
    title: 'Dentist',
    tier: 'core',
    description: 'Diagnoses and treats dental diseases, performs oral surgery, and maintains patient oral health.',
    requirements: [
      { subcategoryId: 'dentistry', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.8 },
      { subcategoryId: 'analytical_chemistry', weight: 0.6 }
    ],
    context: {
      salary: { entry: 110000, mid: 165000, senior: 230000 },
      education: 'DDS or DMD (4 years); license required',
      jobOutlook: '4% growth, solid demand',
      yearsToEntry: 8,
      skills: ['Oral Surgery', 'Diagnosis', 'Patient Care', 'Manual Dexterity'],
      careerPath: 'General Dentist → Specialist → Practice Owner → Corporate Leadership',
      relatedCareers: ['orthodontist', 'oral-surgeon', 'dental-hygienist'],
      discoveryHint: 'Maintain oral health and create beautiful, healthy smiles.'
    }
  },
  {
    id: 'environmental-engineer',
    title: 'Environmental Engineer',
    tier: 'core',
    description: 'Designs solutions for environmental problems including pollution control, waste management, and water treatment.',
    requirements: [
      { subcategoryId: 'environmental_engineering', weight: 0.95 },
      { subcategoryId: 'environmental_chemistry', weight: 0.8 },
      { subcategoryId: 'applied_mathematics', weight: 0.75 }
    ],
    context: {
      salary: { entry: 63000, mid: 105000, senior: 150000 },
      education: 'BS Environmental Engineering; PE optional',
      jobOutlook: '5% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Environmental Systems', 'Project Management', 'Problem Solving', 'Analysis'],
      careerPath: 'Junior Engineer → Senior Engineer → Project Lead → Department Director',
      relatedCareers: ['environmental-scientist', 'sustainability-consultant', 'water-engineer'],
      discoveryHint: 'Protect the environment and build sustainable solutions for the future.'
    }
  },
  {
    id: 'electrical-engineer',
    title: 'Electrical Engineer',
    tier: 'core',
    description: 'Designs electrical systems, power generation equipment, and electronic devices for various applications.',
    requirements: [
      { subcategoryId: 'electrical_engineering', weight: 0.95 },
      { subcategoryId: 'electromagnetism', weight: 0.85 },
      { subcategoryId: 'applied_mathematics', weight: 0.8 }
    ],
    context: {
      salary: { entry: 67000, mid: 115000, senior: 165000 },
      education: 'BS Electrical Engineering; PE optional',
      jobOutlook: '4% growth, stable demand',
      yearsToEntry: 4,
      skills: ['Circuit Design', 'CAD', 'Power Systems', 'Problem Solving'],
      careerPath: 'Junior Engineer → Senior Engineer → Lead Engineer → Engineering Manager',
      relatedCareers: ['power-systems-engineer', 'electronics-engineer', 'controls-engineer'],
      discoveryHint: 'Design the electrical systems that power modern technology.'
    }
  },
  {
    id: 'musician',
    title: 'Professional Musician',
    tier: 'core',
    description: 'Performs music professionally in orchestras, bands, studios, or as a solo artist across various genres.',
    requirements: [
      { subcategoryId: 'instrumental_performance', weight: 0.95 },
      { subcategoryId: 'music_theory_history', weight: 0.8 },
      { subcategoryId: 'music_composition', weight: 0.65 }
    ],
    context: {
      salary: { entry: 25000, mid: 60000, senior: 150000 },
      education: 'BM in Music Performance; conservatory training highly beneficial',
      jobOutlook: '1% growth, highly variable by specialty',
      yearsToEntry: 4,
      skills: ['Instrument Mastery', 'Music Theory', 'Performance', 'Discipline'],
      careerPath: 'Student Musician → Ensemble Member → Soloist/Band Leader → Conductor',
      relatedCareers: ['music-producer', 'composer', 'music-educator'],
      discoveryHint: 'Express yourself and move audiences through the power of music.'
    }
  },
  {
    id: 'chef',
    title: 'Executive Chef',
    tier: 'core',
    description: 'Oversees kitchen operations, creates menus, manages staff, and maintains food quality and safety standards.',
    requirements: [
      { subcategoryId: 'culinary_arts', weight: 0.95 },
      { subcategoryId: 'food_beverage', weight: 0.85 },
      { subcategoryId: 'business_management', weight: 0.7 }
    ],
    context: {
      salary: { entry: 40000, mid: 70000, senior: 120000 },
      education: 'Culinary school (2-4 years) + apprenticeship',
      jobOutlook: '5% growth, competitive field',
      yearsToEntry: 6,
      skills: ['Culinary Technique', 'Menu Development', 'Leadership', 'Food Safety'],
      careerPath: 'Sous Chef → Chef de Cuisine → Executive Chef → Restaurant Owner',
      relatedCareers: ['restaurant-manager', 'food-scientist', 'pastry-chef'],
      discoveryHint: 'Create memorable dining experiences through culinary artistry.'
    }
  },
  {
    id: 'journalist',
    title: 'Journalist/Reporter',
    tier: 'core',
    description: 'Researches, investigates, and reports news stories across various media platforms.',
    requirements: [
      { subcategoryId: 'journalism_nonfiction', weight: 0.95 },
      { subcategoryId: 'creative_writing', weight: 0.75 },
      { subcategoryId: 'media_communication', weight: 0.8 }
    ],
    context: {
      salary: { entry: 35000, mid: 55000, senior: 95000 },
      education: 'BA in Journalism or related field',
      jobOutlook: '4% decline, competitive and shifting industry',
      yearsToEntry: 4,
      skills: ['Investigative Research', 'Writing', 'Interviewing', 'Critical Thinking'],
      careerPath: 'Reporter → Senior Reporter → Editor → Editorial Director',
      relatedCareers: ['editor', 'documentary-filmmaker', 'content-strategist'],
      discoveryHint: 'Uncover truth and inform the public about important issues.'
    }
  },
  {
    id: 'production-manager',
    title: 'Production Manager',
    tier: 'core',
    description: 'Oversees manufacturing operations, ensures efficiency, quality, and safety in production facilities.',
    requirements: [
      { subcategoryId: 'business_management', weight: 0.85 },
      { subcategoryId: 'mechanical_engineering', weight: 0.75 },
      { subcategoryId: 'applied_mathematics', weight: 0.7 }
    ],
    context: {
      salary: { entry: 50000, mid: 80000, senior: 130000 },
      education: 'BS Engineering, Business, or related field',
      jobOutlook: '4% growth, varies by industry',
      yearsToEntry: 4,
      skills: ['Process Optimization', 'Leadership', 'Quality Management', 'Problem Solving'],
      careerPath: 'Supervisor → Production Manager → Plant Manager → Operations Director',
      relatedCareers: ['supply-chain-manager', 'operations-manager', 'quality-engineer'],
      discoveryHint: 'Optimize operations and lead teams that manufacture products used worldwide.'
    }
  },
  {
    id: 'hr-manager',
    title: 'Human Resources Manager',
    tier: 'core',
    description: 'Manages recruitment, employee relations, training, and compliance functions within an organization.',
    requirements: [
      { subcategoryId: 'industrial_organizational', weight: 0.9 },
      { subcategoryId: 'business_management', weight: 0.8 },
      { subcategoryId: 'social_psychology', weight: 0.7 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: 'BS Business, HR, or related field',
      jobOutlook: '7% growth, steady demand',
      yearsToEntry: 4,
      skills: ['Recruitment', 'Employee Relations', 'Compliance', 'Communication'],
      careerPath: 'HR Coordinator → HR Manager → Director → VP of Human Resources',
      relatedCareers: ['recruiter', 'organizational-development-consultant', 'training-specialist'],
      discoveryHint: 'Build strong teams and foster positive workplace cultures.'
    }
  },
  {
    id: 'police-officer',
    title: 'Police Officer/Detective',
    tier: 'core',
    description: 'Enforces laws, investigates crimes, and maintains public safety in communities.',
    requirements: [
      { subcategoryId: 'criminal_law', weight: 0.85 },
      { subcategoryId: 'social_psychology', weight: 0.7 },
      { subcategoryId: 'logic_reasoning', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 70000, senior: 110000 },
      education: 'High school diploma/GED; police academy training required',
      jobOutlook: '3% growth, steady demand',
      yearsToEntry: 1,
      skills: ['Law Enforcement', 'Investigation', 'Physical Fitness', 'Communication'],
      careerPath: 'Officer → Detective → Sergeant → Captain → Lieutenant',
      relatedCareers: ['fbi-agent', 'homeland-security', 'security-manager'],
      discoveryHint: 'Protect communities and bring justice through investigative work.'
    }
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    tier: 'core',
    description: 'Analyzes business processes and requirements, recommending improvements and technology solutions.',
    requirements: [
      { subcategoryId: 'business_management', weight: 0.85 },
      { subcategoryId: 'databases_backend', weight: 0.75 },
      { subcategoryId: 'statistics_probability', weight: 0.7 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 145000 },
      education: 'BS Business, IT, or related field',
      jobOutlook: '8% growth, high demand',
      yearsToEntry: 4,
      skills: ['Data Analysis', 'Process Improvement', 'Communication', 'Business Acumen'],
      careerPath: 'Junior Analyst → Business Analyst → Senior Analyst → Manager',
      relatedCareers: ['systems-analyst', 'project-manager', 'data-analyst'],
      discoveryHint: 'Bridge technology and business to drive organizational improvement.'
    }
  },
  {
    id: 'solar-installer',
    title: 'Solar Photovoltaic Installer',
    tier: 'core',
    description: 'Installs and maintains solar panel systems on residential and commercial buildings.',
    requirements: [
      { subcategoryId: 'electrical_engineering', weight: 0.85 },
      { subcategoryId: 'thermodynamics_energy', weight: 0.8 },
      { subcategoryId: 'mechanical_engineering', weight: 0.65 }
    ],
    context: {
      salary: { entry: 40000, mid: 68000, senior: 105000 },
      education: 'High school diploma + on-the-job training/certification',
      jobOutlook: '27% growth, fastest-growing occupation',
      yearsToEntry: 1,
      skills: ['Electrical Installation', 'Safety', 'Problem Solving', 'Physical Capability'],
      careerPath: 'Installer → Lead Installer → Supervisor → Project Manager',
      relatedCareers: ['wind-turbine-technician', 'electrical-technician', 'hvac-technician'],
      discoveryHint: 'Be part of the renewable energy revolution and help build a sustainable future.'
    }
  },
  {
    id: 'nurse-anesthetist',
    title: 'Certified Registered Nurse Anesthetist',
    tier: 'core',
    description: 'Administers anesthesia and monitors patients during surgical procedures and pain management.',
    requirements: [
      { subcategoryId: 'nursing', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.9 },
      { subcategoryId: 'biochemistry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 120000, mid: 170000, senior: 220000 },
      education: 'MSN (Master\'s in Nursing); CRNA certification required',
      jobOutlook: '12% growth, high demand',
      yearsToEntry: 7,
      skills: ['Anesthesia Administration', 'Patient Monitoring', 'Clinical Judgment', 'Critical Care'],
      careerPath: 'RN → Graduate Student → CRNA → Senior CRNA → Teaching/Leadership',
      relatedCareers: ['anesthesiologist', 'critical-care-nurse', 'surgical-nurse'],
      discoveryHint: 'Provide critical care support during surgical procedures.'
    }
  },

  // ADVANCED TIER (43 careers)
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    tier: 'advanced',
    description: 'Designs and implements machine learning models and systems for production use.',
    requirements: [
      { subcategoryId: 'ai_machine_learning', weight: 0.95 },
      { subcategoryId: 'software_development', weight: 0.9 },
      { subcategoryId: 'statistics_probability', weight: 0.85 }
    ],
    context: {
      salary: { entry: 120000, mid: 180000, senior: 280000 },
      education: 'BS Computer Science or MS in ML/AI',
      jobOutlook: '37% growth, exceptional demand',
      yearsToEntry: 4,
      skills: ['Python', 'TensorFlow/PyTorch', 'Statistics', 'System Design'],
      careerPath: 'ML Engineer → Senior ML Engineer → ML Lead → Director of AI',
      relatedCareers: ['ai-researcher', 'data-scientist', 'nlp-engineer'],
      discoveryHint: 'Build intelligent systems that learn and adapt from data.'
    }
  },
  {
    id: 'aerospace-engineer',
    title: 'Aerospace Engineer',
    tier: 'advanced',
    description: 'Designs aircraft, spacecraft, satellites, and related propulsion systems.',
    requirements: [
      { subcategoryId: 'aerospace_engineering', weight: 0.95 },
      { subcategoryId: 'thermodynamics_energy', weight: 0.85 },
      { subcategoryId: 'applied_mathematics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 70000, mid: 120000, senior: 170000 },
      education: 'BS Aerospace Engineering; PE optional',
      jobOutlook: '3% growth, concentrated in defense/aviation',
      yearsToEntry: 4,
      skills: ['Aerodynamics', 'CAD', 'Systems Engineering', 'Problem Solving'],
      careerPath: 'Junior Engineer → Senior Engineer → Lead Engineer → Program Manager',
      relatedCareers: ['systems-engineer', 'propulsion-engineer', 'flight-test-engineer'],
      discoveryHint: 'Design the aircraft and spacecraft that explore our world and beyond.'
    }
  },
  {
    id: 'biomedical-engineer',
    title: 'Biomedical Engineer',
    tier: 'advanced',
    description: 'Develops medical devices, prosthetics, and healthcare technologies using engineering principles.',
    requirements: [
      { subcategoryId: 'biomedical_engineering', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.85 },
      { subcategoryId: 'applied_mathematics', weight: 0.8 }
    ],
    context: {
      salary: { entry: 68000, mid: 115000, senior: 165000 },
      education: 'BS Biomedical Engineering',
      jobOutlook: '6% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Medical Device Design', 'CAD', 'Physiology', 'Problem Solving'],
      careerPath: 'Junior Engineer → Senior Engineer → Lead Engineer → Director',
      relatedCareers: ['medical-device-sales', 'clinical-engineer', 'prosthetics-specialist'],
      discoveryHint: 'Improve human health through innovative medical technology.'
    }
  },
  {
    id: 'chemical-engineer',
    title: 'Chemical Engineer',
    tier: 'advanced',
    description: 'Designs industrial chemical processes and equipment for manufacturing chemicals, pharmaceuticals, and materials.',
    requirements: [
      { subcategoryId: 'chemical_engineering', weight: 0.95 },
      { subcategoryId: 'organic_chemistry', weight: 0.85 },
      { subcategoryId: 'thermodynamics_energy', weight: 0.85 }
    ],
    context: {
      salary: { entry: 72000, mid: 125000, senior: 180000 },
      education: 'BS Chemical Engineering',
      jobOutlook: '4% growth, steady demand',
      yearsToEntry: 4,
      skills: ['Process Design', 'Chemistry', 'CAD', 'Safety Management'],
      careerPath: 'Process Engineer → Senior Engineer → Design Engineer → Plant Manager',
      relatedCareers: ['petroleum-engineer', 'polymer-engineer', 'environmental-engineer'],
      discoveryHint: 'Transform raw materials into products that improve daily life.'
    }
  },
  {
    id: 'senior-architect',
    title: 'Solutions Architect',
    tier: 'advanced',
    description: 'Designs large-scale technology solutions and systems architecture for enterprise organizations.',
    requirements: [
      { subcategoryId: 'software_development', weight: 0.95 },
      { subcategoryId: 'systems_networks', weight: 0.9 },
      { subcategoryId: 'databases_backend', weight: 0.85 }
    ],
    context: {
      salary: { entry: 130000, mid: 190000, senior: 280000 },
      education: 'BS Computer Science + 10+ years experience',
      jobOutlook: '15% growth, high demand',
      yearsToEntry: 14,
      skills: ['System Design', 'Cloud Architecture', 'Technical Leadership', 'Communication'],
      careerPath: 'Senior Developer → Solutions Architect → Principal Architect → VP Engineering',
      relatedCareers: ['cloud-architect', 'enterprise-architect', 'security-architect'],
      discoveryHint: 'Design the technology foundations that power large organizations.'
    }
  },
  {
    id: 'surgeon',
    title: 'Surgeon',
    tier: 'advanced',
    description: 'Performs surgical operations to treat diseases, injuries, and disorders.',
    requirements: [
      { subcategoryId: 'medicine_clinical', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.95 },
      { subcategoryId: 'mechanical_engineering', weight: 0.65 }
    ],
    context: {
      salary: { entry: 150000, mid: 250000, senior: 500000 },
      education: 'MD/DO + 5-7 years surgical residency',
      jobOutlook: '4% growth, specialty dependent',
      yearsToEntry: 12,
      skills: ['Surgical Technique', 'Decision Making', 'Manual Dexterity', 'Leadership'],
      careerPath: 'Surgical Resident → Attending Surgeon → Chief of Surgery → Academic Leader',
      relatedCareers: ['orthopaedic-surgeon', 'neurosurgeon', 'cardiothoracic-surgeon'],
      discoveryHint: 'Master the art and science of surgery to transform patient outcomes.'
    }
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    tier: 'advanced',
    description: 'Builds data pipelines, databases, and systems that enable data analysis and machine learning.',
    requirements: [
      { subcategoryId: 'databases_backend', weight: 0.95 },
      { subcategoryId: 'software_development', weight: 0.9 },
      { subcategoryId: 'systems_networks', weight: 0.8 }
    ],
    context: {
      salary: { entry: 100000, mid: 150000, senior: 220000 },
      education: 'BS Computer Science or related',
      jobOutlook: '32% growth, very high demand',
      yearsToEntry: 4,
      skills: ['SQL', 'Python', 'Cloud Platforms', 'Big Data Tools'],
      careerPath: 'Data Engineer → Senior Data Engineer → Principal Data Engineer → Director',
      relatedCareers: ['database-administrator', 'data-scientist', 'analytics-engineer'],
      discoveryHint: 'Build the infrastructure that powers data-driven decision making.'
    }
  },
  {
    id: 'patent-attorney',
    title: 'Patent Attorney',
    tier: 'advanced',
    description: 'Specializes in intellectual property law, patents, trademarks, and technology licensing.',
    requirements: [
      { subcategoryId: 'intellectual_property', weight: 0.95 },
      { subcategoryId: 'law_legal_studies', weight: 0.9 },
      { subcategoryId: 'software_development', weight: 0.65 }
    ],
    context: {
      salary: { entry: 100000, mid: 170000, senior: 300000 },
      education: 'JD + Technical degree (BS CS/Engineering); bar exam + patent bar',
      jobOutlook: '6% growth, strong demand in tech',
      yearsToEntry: 8,
      skills: ['Patent Law', 'Technical Understanding', 'Negotiation', 'Writing'],
      careerPath: 'Associate → Senior Associate → Counsel → Partner',
      relatedCareers: ['ip-counsel', 'trademark-attorney', 'licensing-specialist'],
      discoveryHint: 'Protect innovation and intellectual property at the intersection of law and tech.'
    }
  },
  {
    id: 'sustainability-consultant',
    title: 'Sustainability Consultant',
    tier: 'advanced',
    description: 'Advises organizations on environmental sustainability, carbon reduction, and ESG initiatives.',
    requirements: [
      { subcategoryId: 'climate_sustainability', weight: 0.95 },
      { subcategoryId: 'environmental_engineering', weight: 0.8 },
      { subcategoryId: 'business_management', weight: 0.75 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 180000 },
      education: 'BS Environmental Science/Engineering or MBA',
      jobOutlook: '11% growth, rapidly increasing demand',
      yearsToEntry: 4,
      skills: ['Sustainability Strategy', 'Environmental Analysis', 'Communication', 'Business Sense'],
      careerPath: 'Consultant → Senior Consultant → Manager → Director',
      relatedCareers: ['environmental-scientist', 'esg-analyst', 'green-building-specialist'],
      discoveryHint: 'Help organizations build sustainable business practices for the future.'
    }
  },
  {
    id: 'venture-capitalist',
    title: 'Venture Capital Investor',
    tier: 'advanced',
    description: 'Evaluates startups and invests capital to fund high-growth companies.',
    requirements: [
      { subcategoryId: 'finance_investment', weight: 0.95 },
      { subcategoryId: 'business_management', weight: 0.85 },
      { subcategoryId: 'statistics_probability', weight: 0.7 }
    ],
    context: {
      salary: { entry: 150000, mid: 300000, senior: 1000000 },
      education: 'MBA or BS Economics/Business + 5+ years finance/tech',
      jobOutlook: 'Variable by economy, competitive field',
      yearsToEntry: 8,
      skills: ['Financial Analysis', 'Market Assessment', 'Negotiation', 'Industry Knowledge'],
      careerPath: 'Analyst → Associate → Principal → Managing Partner',
      relatedCareers: ['private-equity-professional', 'startup-founder', 'angel-investor'],
      discoveryHint: 'Fund the next generation of transformative companies.'
    }
  },
  {
    id: 'public-health-officer',
    title: 'Public Health Officer',
    tier: 'advanced',
    description: 'Develops public health policies and programs to prevent disease and promote community health.',
    requirements: [
      { subcategoryId: 'public_health', weight: 0.95 },
      { subcategoryId: 'statistics_probability', weight: 0.85 },
      { subcategoryId: 'public_policy', weight: 0.8 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 165000 },
      education: 'MPH (Master of Public Health)',
      jobOutlook: '7% growth, increasing demand',
      yearsToEntry: 6,
      skills: ['Epidemiology', 'Policy Analysis', 'Program Development', 'Leadership'],
      careerPath: 'Health Officer → Senior Officer → Director → Chief Health Officer',
      relatedCareers: ['epidemiologist', 'health-policy-analyst', 'disease-prevention-specialist'],
      discoveryHint: 'Protect population health and build healthier communities.'
    }
  },
  {
    id: 'robotics-engineer',
    title: 'Robotics Engineer',
    tier: 'advanced',
    description: 'Designs and develops robots and automation systems for manufacturing and other applications.',
    requirements: [
      { subcategoryId: 'robotics_automation', weight: 0.95 },
      { subcategoryId: 'mechanical_engineering', weight: 0.85 },
      { subcategoryId: 'electrical_engineering', weight: 0.8 }
    ],
    context: {
      salary: { entry: 72000, mid: 125000, senior: 185000 },
      education: 'BS Robotics, Mechanical, or Electrical Engineering',
      jobOutlook: '8% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Robot Programming', 'CAD', 'Control Systems', 'Problem Solving'],
      careerPath: 'Junior Engineer → Senior Engineer → Lead Engineer → Technical Director',
      relatedCareers: ['automation-engineer', 'controls-engineer', 'systems-engineer'],
      discoveryHint: 'Create robots and automation systems that transform manufacturing.'
    }
  },
  {
    id: 'game-designer',
    title: 'Game Designer/Director',
    tier: 'advanced',
    description: 'Creates game mechanics, narratives, and overall design for video games.',
    requirements: [
      { subcategoryId: 'game_dev_graphics', weight: 0.9 },
      { subcategoryId: 'creative_writing', weight: 0.75 },
      { subcategoryId: 'human_computer_interaction', weight: 0.8 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 160000 },
      education: 'BS Game Design or Computer Science',
      jobOutlook: '9% growth, competitive field',
      yearsToEntry: 4,
      skills: ['Game Design', 'Storytelling', 'Problem Solving', 'Leadership'],
      careerPath: 'Game Designer → Senior Designer → Lead Designer → Creative Director',
      relatedCareers: ['game-programmer', 'game-artist', 'level-designer'],
      discoveryHint: 'Create immersive gaming experiences that entertain millions.'
    }
  },
  {
    id: 'cinematographer',
    title: 'Cinematographer/Director of Photography',
    tier: 'advanced',
    description: 'Plans and executes visual elements of film and television production.',
    requirements: [
      { subcategoryId: 'film_video', weight: 0.95 },
      { subcategoryId: 'photography', weight: 0.85 },
      { subcategoryId: 'aesthetics', weight: 0.75 }
    ],
    context: {
      salary: { entry: 35000, mid: 75000, senior: 150000 },
      education: 'BFA in Film/Cinematography; extensive hands-on experience essential',
      jobOutlook: '4% growth, project-based income',
      yearsToEntry: 4,
      skills: ['Camera Operation', 'Lighting', 'Visual Storytelling', 'Technical Knowledge'],
      careerPath: 'Camera Assistant → Cinematographer → Director of Photography → Film Director',
      relatedCareers: ['film-director', 'gaffer', 'production-designer'],
      discoveryHint: 'Craft the visual language that brings stories to life on screen.'
    }
  },
  {
    id: 'constitutional-lawyer',
    title: 'Constitutional Lawyer',
    tier: 'advanced',
    description: 'Specializes in constitutional law, civil rights, and government regulation cases.',
    requirements: [
      { subcategoryId: 'constitutional_administrative', weight: 0.95 },
      { subcategoryId: 'law_legal_studies', weight: 0.9 },
      { subcategoryId: 'political_philosophy', weight: 0.8 }
    ],
    context: {
      salary: { entry: 85000, mid: 160000, senior: 350000 },
      education: 'JD; often LLM in Constitutional Law',
      jobOutlook: '2% growth, highly competitive',
      yearsToEntry: 7,
      skills: ['Constitutional Analysis', 'Legal Research', 'Oral Advocacy', 'Writing'],
      careerPath: 'Associate → Senior Associate → Counsel → Partner',
      relatedCareers: ['civil-rights-attorney', 'appellate-attorney', 'government-counsel'],
      discoveryHint: 'Shape law and defend fundamental rights through constitutional litigation.'
    }
  },
  {
    id: 'neurosurgeon',
    title: 'Neurosurgeon',
    tier: 'advanced',
    description: 'Performs surgery on the brain, spinal cord, and nervous system.',
    requirements: [
      { subcategoryId: 'medicine_clinical', weight: 0.95 },
      { subcategoryId: 'developmental_biology', weight: 0.95 },
      { subcategoryId: 'mechanical_engineering', weight: 0.7 }
    ],
    context: {
      salary: { entry: 200000, mid: 350000, senior: 600000 },
      education: 'MD/DO + 7 years neurosurgery residency',
      jobOutlook: '4% growth, limited positions',
      yearsToEntry: 14,
      skills: ['Surgical Precision', 'Neuroanatomy', 'Decision Making', 'Manual Dexterity'],
      careerPath: 'Resident → Attending Neurosurgeon → Chief → Academic Leader',
      relatedCareers: ['neuroscientist', 'neurologist', 'spine-surgeon'],
      discoveryHint: 'Perform groundbreaking surgery on the brain and nervous system.'
    }
  },
  {
    id: 'university-professor',
    title: 'University Professor/Researcher',
    tier: 'advanced',
    description: 'Teaches university courses and conducts research in their academic field.',
    requirements: [
      { subcategoryId: 'pure_mathematics', weight: 0.7 },
      { subcategoryId: 'creative_writing', weight: 0.65 },
      { subcategoryId: 'psychology', weight: 0.65 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 150000 },
      education: 'PhD in field (5-7 years)',
      jobOutlook: '3% growth, limited positions',
      yearsToEntry: 8,
      skills: ['Research', 'Teaching', 'Writing', 'Grant Writing'],
      careerPath: 'Postdoc → Assistant Professor → Associate Professor → Full Professor',
      relatedCareers: ['research-scientist', 'laboratory-director', 'academic-administrator'],
      discoveryHint: 'Advance knowledge through research and shape future scholars.'
    }
  },
  {
    id: 'film-director',
    title: 'Film Director',
    tier: 'advanced',
    description: 'Directs film and television productions, making creative decisions about storytelling and visual style.',
    requirements: [
      { subcategoryId: 'film_video', weight: 0.95 },
      { subcategoryId: 'creative_writing', weight: 0.85 },
      { subcategoryId: 'aesthetics', weight: 0.8 }
    ],
    context: {
      salary: { entry: 40000, mid: 100000, senior: 500000 },
      education: 'BFA in Film; extensive industry experience essential',
      jobOutlook: '3% growth, highly competitive',
      yearsToEntry: 8,
      skills: ['Visual Storytelling', 'Leadership', 'Creative Vision', 'Communication'],
      careerPath: 'Short Films → Feature Film Director → Established Director → Producer',
      relatedCareers: ['cinematographer', 'screenwriter', 'producer'],
      discoveryHint: 'Create stories that move, inspire, and entertain audiences worldwide.'
    }
  },
  {
    id: 'clinical-pharmacist',
    title: 'Clinical Pharmacist',
    tier: 'advanced',
    description: 'Works in hospitals and clinics providing direct patient care and optimizing medication therapy.',
    requirements: [
      { subcategoryId: 'pharmacy', weight: 0.95 },
      { subcategoryId: 'medicine_clinical', weight: 0.85 },
      { subcategoryId: 'biochemistry', weight: 0.8 }
    ],
    context: {
      salary: { entry: 115000, mid: 150000, senior: 190000 },
      education: 'PharmD; additional residency often required',
      jobOutlook: '8% growth, increasing demand',
      yearsToEntry: 9,
      skills: ['Clinical Pharmacology', 'Patient Care', 'Research', 'Communication'],
      careerPath: 'Clinical Pharmacist → Senior Clinician → Clinical Manager → Director',
      relatedCareers: ['pharmacy-specialist', 'research-pharmacist', 'pharmaceutical-scientist'],
      discoveryHint: 'Optimize medication therapy and improve patient outcomes.'
    }
  },
  {
    id: 'geologist',
    title: 'Geologist/Geoscientist',
    tier: 'advanced',
    description: 'Studies Earth\'s structure, materials, and geological processes for resource exploration and hazard assessment.',
    requirements: [
      { subcategoryId: 'structural_geology', weight: 0.95 },
      { subcategoryId: 'mineralogy_petrology', weight: 0.9 },
      { subcategoryId: 'geochemistry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 58000, mid: 100000, senior: 150000 },
      education: 'BS Geology or Geosciences',
      jobOutlook: '5% growth, varies by commodity prices',
      yearsToEntry: 4,
      skills: ['Geological Analysis', 'Field Work', 'Data Interpretation', 'Problem Solving'],
      careerPath: 'Junior Geologist → Senior Geologist → Exploration Manager → Director',
      relatedCareers: ['geophysicist', 'mining-engineer', 'petroleum-geologist'],
      discoveryHint: 'Unlock Earth\'s secrets and discover valuable resources.'
    }
  },
  {
    id: 'forensic-scientist',
    title: 'Forensic Scientist',
    tier: 'advanced',
    description: 'Analyzes physical evidence from crime scenes to support criminal investigations and prosecutions.',
    requirements: [
      { subcategoryId: 'analytical_chemistry', weight: 0.95 },
      { subcategoryId: 'criminal_law', weight: 0.8 },
      { subcategoryId: 'molecular_genetics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: 'BS Forensic Science or Chemistry',
      jobOutlook: '14% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Evidence Analysis', 'Laboratory Skills', 'Report Writing', 'Testifying'],
      careerPath: 'Analyst → Senior Analyst → Laboratory Manager → Director',
      relatedCareers: ['crime-scene-investigator', 'dna-analyst', 'toxicologist'],
      discoveryHint: 'Use science to solve crimes and support justice.'
    }
  },
  {
    id: 'astrophysicist',
    title: 'Astrophysicist',
    tier: 'advanced',
    description: 'Studies stars, galaxies, black holes, and the structure of the universe through observation and theory.',
    requirements: [
      { subcategoryId: 'astrophysics_cosmology', weight: 0.95 },
      { subcategoryId: 'quantum_particle', weight: 0.85 },
      { subcategoryId: 'pure_mathematics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 165000 },
      education: 'PhD in Astrophysics (5-7 years)',
      jobOutlook: '7% growth, limited academic positions',
      yearsToEntry: 9,
      skills: ['Theoretical Analysis', 'Data Analysis', 'Research', 'Programming'],
      careerPath: 'Postdoc → Researcher → Senior Researcher → Principal Investigator',
      relatedCareers: ['physicist', 'cosmologist', 'telescope-designer'],
      discoveryHint: 'Explore the cosmos and unlock the mysteries of the universe.'
    }
  },
  {
    id: 'clinical-therapist',
    title: 'Licensed Clinical Therapist/Counselor',
    tier: 'advanced',
    description: 'Provides psychotherapy and counseling to individuals and groups dealing with mental health and emotional issues.',
    requirements: [
      { subcategoryId: 'clinical_counseling', weight: 0.95 },
      { subcategoryId: 'developmental_psychology', weight: 0.85 },
      { subcategoryId: 'social_psychology', weight: 0.8 }
    ],
    context: {
      salary: { entry: 40000, mid: 65000, senior: 110000 },
      education: 'Master\'s in Counseling/Social Work; license required',
      jobOutlook: '12% growth, increasing demand',
      yearsToEntry: 6,
      skills: ['Psychotherapy', 'Assessment', 'Empathy', 'Communication'],
      careerPath: 'Therapist → Senior Therapist → Clinical Supervisor → Agency Director',
      relatedCareers: ['social-worker', 'marriage-family-therapist', 'rehabilitation-counselor'],
      discoveryHint: 'Help people heal emotionally and improve their mental health.'
    }
  },
  {
    id: 'marine-biologist',
    title: 'Marine Biologist',
    tier: 'advanced',
    description: 'Studies marine organisms and ecosystems to understand ocean life and conservation needs.',
    requirements: [
      { subcategoryId: 'marine_biology', weight: 0.95 },
      { subcategoryId: 'ecology_evolution', weight: 0.9 },
      { subcategoryId: 'molecular_genetics', weight: 0.7 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 130000 },
      education: 'BS Marine Biology; MS/PhD for research',
      jobOutlook: '4% growth, limited positions',
      yearsToEntry: 4,
      skills: ['Field Research', 'Data Analysis', 'Scientific Writing', 'Scuba Diving'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Conservation Leader',
      relatedCareers: ['oceanographer', 'aquaculturist', 'conservation-biologist'],
      discoveryHint: 'Study and protect the incredible diversity of ocean life.'
    }
  },
  {
    id: 'computational-linguist',
    title: 'Computational Linguist / NLP Engineer',
    tier: 'advanced',
    description: 'Develops natural language processing systems and algorithms that enable computers to understand human language.',
    requirements: [
      { subcategoryId: 'computational_linguistics', weight: 0.95 },
      { subcategoryId: 'ai_machine_learning', weight: 0.9 },
      { subcategoryId: 'software_development', weight: 0.85 }
    ],
    context: {
      salary: { entry: 100000, mid: 160000, senior: 250000 },
      education: 'BS Computer Science/Linguistics or MS in NLP',
      jobOutlook: '24% growth (AI field), very high demand',
      yearsToEntry: 4,
      skills: ['NLP', 'Machine Learning', 'Python', 'Linguistics'],
      careerPath: 'NLP Engineer → Senior NLP Engineer → Lead NLP Engineer → Research Director',
      relatedCareers: ['speech-recognition-engineer', 'ai-researcher', 'chatbot-developer'],
      discoveryHint: 'Build AI systems that understand and generate human language.'
    }
  },
  {
    id: 'investment-banker',
    title: 'Investment Banker',
    tier: 'advanced',
    description: 'Advises companies on mergers, acquisitions, and capital raising transactions.',
    requirements: [
      { subcategoryId: 'finance_investment', weight: 0.95 },
      { subcategoryId: 'corporate_business_law', weight: 0.85 },
      { subcategoryId: 'accounting', weight: 0.75 }
    ],
    context: {
      salary: { entry: 120000, mid: 300000, senior: 1000000 },
      education: 'BS Finance/Economics; MBA often preferred',
      jobOutlook: '4% growth, competitive and cyclical',
      yearsToEntry: 4,
      skills: ['Financial Modeling', 'Valuation', 'Communication', 'Sales'],
      careerPath: 'Analyst → Associate → Vice President → Director → Managing Director',
      relatedCareers: ['equity-research-analyst', 'corporate-finance-manager', 'venture-capitalist'],
      discoveryHint: 'Shape major business transactions and corporate strategy.'
    }
  },
  {
    id: 'landscape-architect',
    title: 'Landscape Architect',
    tier: 'advanced',
    description: 'Designs outdoor spaces including parks, gardens, and urban landscapes for aesthetic and functional purposes.',
    requirements: [
      { subcategoryId: 'architecture', weight: 0.85 },
      { subcategoryId: 'horticulture', weight: 0.8 },
      { subcategoryId: 'ecology_evolution', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 125000 },
      education: 'BLA (Bachelor of Landscape Architecture); license required',
      jobOutlook: '3% growth, project-dependent',
      yearsToEntry: 5,
      skills: ['Design', 'CAD', 'Horticultural Knowledge', 'Project Management'],
      careerPath: 'Junior Designer → Landscape Architect → Senior Architect → Principal',
      relatedCareers: ['urban-planner', 'architect', 'environmental-planner'],
      discoveryHint: 'Create beautiful and sustainable outdoor spaces for communities.'
    }
  },
  {
    id: 'economist',
    title: 'Economist',
    tier: 'advanced',
    description: 'Analyzes economic data, trends, and policies to inform business, government, or research decisions.',
    requirements: [
      { subcategoryId: 'macroeconomics', weight: 0.95 },
      { subcategoryId: 'statistics_probability', weight: 0.9 },
      { subcategoryId: 'microeconomics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 70000, mid: 120000, senior: 180000 },
      education: 'BS/MS Economics; PhD for academia/government research',
      jobOutlook: '8% growth, steady demand',
      yearsToEntry: 4,
      skills: ['Statistical Analysis', 'Economic Modeling', 'Research', 'Writing'],
      careerPath: 'Economist → Senior Economist → Chief Economist → Director',
      relatedCareers: ['policy-analyst', 'financial-analyst', 'research-analyst'],
      discoveryHint: 'Use economic analysis to inform major policy and business decisions.'
    }
  },
  {
    id: 'clinical-nurse-specialist',
    title: 'Clinical Nurse Specialist',
    tier: 'advanced',
    description: 'Provides expert nursing care, mentors staff, and improves clinical practice in specialized healthcare areas.',
    requirements: [
      { subcategoryId: 'nursing', weight: 0.95 },
      { subcategoryId: 'medicine_clinical', weight: 0.85 },
      { subcategoryId: 'animal_physiology', weight: 0.8 }
    ],
    context: {
      salary: { entry: 75000, mid: 105000, senior: 150000 },
      education: 'MSN (Master\'s in Nursing); CNS certification',
      jobOutlook: '9% growth, high demand',
      yearsToEntry: 7,
      skills: ['Advanced Clinical Skills', 'Leadership', 'Research', 'Teaching'],
      careerPath: 'RN → Graduate Nurse → CNS → Nursing Manager → Director',
      relatedCareers: ['nurse-practitioner', 'nursing-educator', 'quality-improvement-specialist'],
      discoveryHint: 'Lead clinical excellence and mentor the nursing team.'
    }
  },
  {
    id: 'urban-planner',
    title: 'Urban/City Planner',
    tier: 'advanced',
    description: 'Plans land use and development to create sustainable, functional, and livable communities.',
    requirements: [
      { subcategoryId: 'urban_sociology', weight: 0.85 },
      { subcategoryId: 'environmental_engineering', weight: 0.8 },
      { subcategoryId: 'transportation_planning', weight: 0.85 }
    ],
    context: {
      salary: { entry: 50000, mid: 85000, senior: 140000 },
      education: 'Master\'s in Urban Planning; AICP certification often required',
      jobOutlook: '4% growth, concentrated in growing areas',
      yearsToEntry: 6,
      skills: ['Urban Design', 'GIS', 'Policy Analysis', 'Community Engagement'],
      careerPath: 'Planner → Senior Planner → Planning Manager → Director of Planning',
      relatedCareers: ['landscape-architect', 'transportation-planner', 'environmental-planner'],
      discoveryHint: 'Shape the future of cities and create better living environments.'
    }
  },
  {
    id: 'petroleum-engineer',
    title: 'Petroleum Engineer',
    tier: 'advanced',
    description: 'Designs and develops methods for extracting oil and gas from the ground.',
    requirements: [
      { subcategoryId: 'chemical_engineering', weight: 0.85 },
      { subcategoryId: 'geophysics', weight: 0.8 },
      { subcategoryId: 'applied_mathematics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 80000, mid: 150000, senior: 220000 },
      education: 'BS Petroleum Engineering',
      jobOutlook: '2% growth, cyclical with oil prices',
      yearsToEntry: 4,
      skills: ['Reservoir Engineering', 'Drilling', 'Problem Solving', 'CAD'],
      careerPath: 'Junior Engineer → Senior Engineer → Engineering Manager → Director',
      relatedCareers: ['geoscientist', 'drilling-engineer', 'facilities-engineer'],
      discoveryHint: 'Develop efficient methods for energy resource extraction.'
    }
  },
  {
    id: 'music-therapist',
    title: 'Music Therapist',
    tier: 'advanced',
    description: 'Uses music to improve physical, emotional, cognitive, and social well-being in therapeutic settings.',
    requirements: [
      { subcategoryId: 'music_production', weight: 0.85 },
      { subcategoryId: 'clinical_counseling', weight: 0.85 },
      { subcategoryId: 'instrumental_performance', weight: 0.95 }
    ],
    context: {
      salary: { entry: 38000, mid: 65000, senior: 110000 },
      education: 'BM in Music Therapy; MT-BC certification required',
      jobOutlook: '8% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Music Technique', 'Therapeutic Principles', 'Assessment', 'Communication'],
      careerPath: 'Music Therapist → Senior Therapist → Clinical Director → Program Director',
      relatedCareers: ['art-therapist', 'occupational-therapist', 'rehabilitation-specialist'],
      discoveryHint: 'Heal through the therapeutic power of music.'
    }
  },

  // NICHE TIER (44 careers)
  {
    id: 'conservation-scientist',
    title: 'Conservation Scientist',
    tier: 'niche',
    description: 'Manages natural resources like forests, wildlife habitats, and water systems for sustainable use.',
    requirements: [
      { subcategoryId: 'conservation_biology', weight: 0.95 },
      { subcategoryId: 'ecosystem_management', weight: 0.9 },
      { subcategoryId: 'ecology_evolution', weight: 0.85 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: 'BS Forestry, Conservation, or Environmental Science',
      jobOutlook: '3% growth, concentrated in government/nonprofits',
      yearsToEntry: 4,
      skills: ['Resource Management', 'Field Work', 'Data Analysis', 'Policy Knowledge'],
      careerPath: 'Scientist → Senior Scientist → Regional Manager → Director',
      relatedCareers: ['environmental-scientist', 'wildlife-biologist', 'park-ranger'],
      discoveryHint: 'Protect forests, wildlife, and natural resources for future generations.'
    }
  },
  {
    id: 'biomechanical-engineer',
    title: 'Biomechanical Engineer',
    tier: 'niche',
    description: 'Applies mechanics and engineering principles to biological systems, studying movement and prosthetics.',
    requirements: [
      { subcategoryId: 'mechanical_engineering', weight: 0.85 },
      { subcategoryId: 'animal_physiology', weight: 0.9 },
      { subcategoryId: 'biomedical_engineering', weight: 0.85 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 165000 },
      education: 'BS Biomechanical Engineering or related',
      jobOutlook: '6% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Biomechanics', 'CAD', 'Lab Skills', 'Data Analysis'],
      careerPath: 'Junior Engineer → Senior Engineer → Research Lead → Director',
      relatedCareers: ['biomedical-engineer', 'prosthetics-specialist', 'sports-scientist'],
      discoveryHint: 'Engineer solutions for human movement and rehabilitation.'
    }
  },
  {
    id: 'toxicologist',
    title: 'Toxicologist',
    tier: 'niche',
    description: 'Studies effects of toxic substances on organisms and environments, assesses health and safety risks.',
    requirements: [
      { subcategoryId: 'analytical_chemistry', weight: 0.9 },
      { subcategoryId: 'biochemistry', weight: 0.85 },
      { subcategoryId: 'animal_physiology', weight: 0.8 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 150000 },
      education: 'BS Chemistry/Toxicology; MS/PhD often required',
      jobOutlook: '7% growth, increasing demand',
      yearsToEntry: 4,
      skills: ['Chemical Analysis', 'Lab Skills', 'Risk Assessment', 'Regulatory Knowledge'],
      careerPath: 'Toxicologist → Senior Toxicologist → Research Director → Safety Officer',
      relatedCareers: ['analytical-chemist', 'forensic-toxicologist', 'regulatory-scientist'],
      discoveryHint: 'Identify and mitigate toxic hazards to protect human and environmental health.'
    }
  },
  {
    id: 'sound-engineer',
    title: 'Sound Engineer / Audio Engineer',
    tier: 'niche',
    description: 'Designs, sets up, and operates sound systems for recordings, concerts, and events.',
    requirements: [
      { subcategoryId: 'sound_design', weight: 0.95 },
      { subcategoryId: 'music_production', weight: 0.9 },
      { subcategoryId: 'acoustics_waves', weight: 0.75 }
    ],
    context: {
      salary: { entry: 35000, mid: 65000, senior: 120000 },
      education: 'Associate\'s in Audio Engineering or self-taught with experience',
      jobOutlook: '5% growth, project-based work',
      yearsToEntry: 2,
      skills: ['Audio Equipment', 'Mixing/Mastering', 'Problem Solving', 'Communication'],
      careerPath: 'Assistant → Audio Engineer → Senior Engineer → Studio Owner/Director',
      relatedCareers: ['music-producer', 'live-sound-engineer', 'acoustician'],
      discoveryHint: 'Capture and shape sound for recordings and live performances.'
    }
  },
  {
    id: 'perfumer',
    title: 'Perfumer / Fragrance Developer',
    tier: 'niche',
    description: 'Develops fragrances and scents for perfumes, colognes, and consumer products.',
    requirements: [
      { subcategoryId: 'organic_chemistry', weight: 0.95 },
      { subcategoryId: 'polymer_chemistry', weight: 0.75 },
      { subcategoryId: 'analytical_chemistry', weight: 0.8 }
    ],
    context: {
      salary: { entry: 50000, mid: 90000, senior: 150000 },
      education: 'BS Chemistry; specialized perfumery training highly valuable',
      jobOutlook: 'Stable, niche field',
      yearsToEntry: 4,
      skills: ['Chemistry', 'Sensory Evaluation', 'Creativity', 'Formulation'],
      careerPath: 'Junior Perfumer → Perfumer → Senior Perfumer → Master Perfumer',
      relatedCareers: ['flavor-chemist', 'cosmetic-scientist', 'product-developer'],
      discoveryHint: 'Create scents that evoke emotion and enhance products.'
    }
  },
  {
    id: 'underwater-welder',
    title: 'Underwater Welder / Diver',
    tier: 'niche',
    description: 'Performs welding and repair work underwater on oil rigs, pipelines, and other submerged structures.',
    requirements: [
      { subcategoryId: 'mechanical_engineering', weight: 0.75 },
      { subcategoryId: 'electrical_engineering', weight: 0.65 },
      { subcategoryId: 'maritime', weight: 0.85 }
    ],
    context: {
      salary: { entry: 55000, mid: 120000, senior: 200000 },
      education: 'High school diploma + commercial diving certification',
      jobOutlook: 'Stable, high-risk work',
      yearsToEntry: 2,
      skills: ['Welding', 'Diving', 'Problem Solving', 'Safety Awareness'],
      careerPath: 'Diver → Experienced Diver → Dive Supervisor → Project Manager',
      relatedCareers: ['commercial-diver', 'offshore-engineer', 'marine-technician'],
      discoveryHint: 'Work in extreme environments maintaining critical underwater infrastructure.'
    }
  },
  {
    id: 'animation-director',
    title: 'Animation Director',
    tier: 'niche',
    description: 'Directs animated films and television shows, supervising artistic and technical teams.',
    requirements: [
      { subcategoryId: 'puppetry_animation', weight: 0.95 },
      { subcategoryId: 'game_dev_graphics', weight: 0.85 },
      { subcategoryId: 'creative_writing', weight: 0.75 }
    ],
    context: {
      salary: { entry: 60000, mid: 110000, senior: 200000 },
      education: 'BFA in Animation or related field',
      jobOutlook: '6% growth, competitive field',
      yearsToEntry: 5,
      skills: ['Animation', 'Leadership', 'Storytelling', '3D Software'],
      careerPath: 'Animator → Senior Animator → Animation Director → Creative Director',
      relatedCareers: ['animator', '3d-artist', 'visual-effects-director'],
      discoveryHint: 'Bring animated worlds and characters to life on screen.'
    }
  },
  {
    id: 'ethnobotanist',
    title: 'Ethnobotanist',
    tier: 'niche',
    description: 'Studies relationships between plants and human cultures, exploring traditional plant uses and conservation.',
    requirements: [
      { subcategoryId: 'plant_biology', weight: 0.95 },
      { subcategoryId: 'cultural_anthropology', weight: 0.9 },
      { subcategoryId: 'ecology_evolution', weight: 0.8 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 130000 },
      education: 'BS Botany/Anthropology; MS/PhD recommended',
      jobOutlook: '5% growth, academic/nonprofit focus',
      yearsToEntry: 4,
      skills: ['Botanical Knowledge', 'Ethnographic Research', 'Field Work', 'Writing'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Academic Leader',
      relatedCareers: ['ethnobotany-specialist', 'medical-botanist', 'biodiversity-scientist'],
      discoveryHint: 'Explore traditional plant knowledge and indigenous ecological wisdom.'
    }
  },
  {
    id: 'cryptographer',
    title: 'Cryptographer / Cryptology Specialist',
    tier: 'niche',
    description: 'Develops encryption algorithms and security protocols to protect sensitive information.',
    requirements: [
      { subcategoryId: 'algebra_discrete', weight: 0.95 },
      { subcategoryId: 'cybersecurity', weight: 0.9 },
      { subcategoryId: 'pure_mathematics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 95000, mid: 160000, senior: 240000 },
      education: 'BS Computer Science/Mathematics; often MS in Cryptography',
      jobOutlook: '18% growth, very high demand',
      yearsToEntry: 4,
      skills: ['Cryptography', 'Number Theory', 'Python/C++', 'Security Theory'],
      careerPath: 'Cryptographer → Senior Cryptographer → Lead Researcher → Chief Cryptographer',
      relatedCareers: ['security-engineer', 'penetration-tester', 'information-security-analyst'],
      discoveryHint: 'Protect sensitive data with unbreakable encryption.'
    }
  },
  {
    id: 'volcanologist',
    title: 'Volcanologist',
    tier: 'niche',
    description: 'Studies volcanoes and volcanic processes to understand hazards and monitor eruption risks.',
    requirements: [
      { subcategoryId: 'geophysics', weight: 0.95 },
      { subcategoryId: 'structural_geology', weight: 0.9 },
      { subcategoryId: 'geochemistry', weight: 0.8 }
    ],
    context: {
      salary: { entry: 50000, mid: 90000, senior: 140000 },
      education: 'BS Geology; MS/PhD for research',
      jobOutlook: '7% growth (geoscience field)',
      yearsToEntry: 4,
      skills: ['Geological Analysis', 'Field Work', 'Modeling', 'Communication'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Observatory Director',
      relatedCareers: ['seismologist', 'geophysicist', 'hazard-assessment-specialist'],
      discoveryHint: 'Study volcanic processes to protect communities from eruptions.'
    }
  },
  {
    id: 'book-illustrator',
    title: 'Book Illustrator / Children\'s Book Illustrator',
    tier: 'niche',
    description: 'Creates visual illustrations for books, typically children\'s books and fantasy novels.',
    requirements: [
      { subcategoryId: 'painting_drawing', weight: 0.95 },
      { subcategoryId: 'web_digital_design', weight: 0.75 },
      { subcategoryId: 'creative_writing', weight: 0.65 }
    ],
    context: {
      salary: { entry: 30000, mid: 60000, senior: 120000 },
      education: 'BFA in Illustration; strong portfolio essential',
      jobOutlook: '3% growth, competitive freelance field',
      yearsToEntry: 4,
      skills: ['Drawing/Painting', 'Digital Art', 'Storytelling', 'Design Sense'],
      careerPath: 'Freelance Illustrator → Book Illustrator → Lead Illustrator → Art Director',
      relatedCareers: ['concept-artist', 'graphic-designer', 'comic-artist'],
      discoveryHint: 'Bring stories to life through compelling visual illustrations.'
    }
  },
  {
    id: 'ocular-prosthetist',
    title: 'Ocular Prosthetist',
    tier: 'niche',
    description: 'Designs and manufactures prosthetic eyes and other ocular devices for patients who have lost eyes.',
    requirements: [
      { subcategoryId: 'biomedical_engineering', weight: 0.85 },
      { subcategoryId: 'medicine_clinical', weight: 0.75 },
      { subcategoryId: 'sculpture_3d', weight: 0.7 }
    ],
    context: {
      salary: { entry: 40000, mid: 70000, senior: 120000 },
      education: 'Certificate/Associate\'s in Prosthetics; on-the-job training',
      jobOutlook: '6% growth, specialized field',
      yearsToEntry: 2,
      skills: ['Prosthetic Design', 'Anatomy', 'Manual Skills', 'Patient Care'],
      careerPath: 'Technician → Prosthetist → Supervisor → Clinical Director',
      relatedCareers: ['prosthetist-orthotist', 'dental-technician', 'optical-technician'],
      discoveryHint: 'Restore vision and confidence through custom eye prosthetics.'
    }
  },
  {
    id: 'mycologist',
    title: 'Mycologist',
    tier: 'niche',
    description: 'Studies fungi including mushrooms and molds, with applications in medicine, food, and agriculture.',
    requirements: [
      { subcategoryId: 'microbiology', weight: 0.95 },
      { subcategoryId: 'biochemistry', weight: 0.8 },
      { subcategoryId: 'molecular_genetics', weight: 0.75 }
    ],
    context: {
      salary: { entry: 48000, mid: 85000, senior: 135000 },
      education: 'BS Microbiology/Mycology; MS/PhD for research',
      jobOutlook: '7% growth, growing field',
      yearsToEntry: 4,
      skills: ['Mycology', 'Lab Skills', 'Research', 'Taxonomy'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Lab Director',
      relatedCareers: ['microbiologist', 'medical-mycologist', 'industrial-mycologist'],
      discoveryHint: 'Unlock the potential of fungi for medicine and biotechnology.'
    }
  },
  {
    id: 'seismologist',
    title: 'Seismologist',
    tier: 'niche',
    description: 'Studies earthquakes and seismic waves to understand Earth\'s structure and predict seismic hazards.',
    requirements: [
      { subcategoryId: 'geophysics', weight: 0.95 },
      { subcategoryId: 'structural_geology', weight: 0.85 },
      { subcategoryId: 'applied_mathematics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 55000, mid: 100000, senior: 155000 },
      education: 'BS Geophysics; MS/PhD for research',
      jobOutlook: '7% growth, academic/government focus',
      yearsToEntry: 4,
      skills: ['Seismology', 'Data Analysis', 'Modeling', 'Communication'],
      careerPath: 'Seismologist → Senior Seismologist → Research Director → Observatory Director',
      relatedCareers: ['geophysicist', 'volcanologist', 'hazard-analyst'],
      discoveryHint: 'Study earthquakes to save lives and understand our dynamic planet.'
    }
  },
  {
    id: 'flavor-chemist',
    title: 'Flavor Chemist',
    tier: 'niche',
    description: 'Develops flavoring compounds and taste profiles for food and beverage products.',
    requirements: [
      { subcategoryId: 'organic_chemistry', weight: 0.95 },
      { subcategoryId: 'analytical_chemistry', weight: 0.85 },
      { subcategoryId: 'biochemistry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 155000 },
      education: 'BS Chemistry; specialized flavor training valuable',
      jobOutlook: '5% growth, stable field',
      yearsToEntry: 4,
      skills: ['Organic Chemistry', 'Flavor Science', 'Sensory Evaluation', 'Formulation'],
      careerPath: 'Flavor Chemist → Senior Chemist → Research Director → Chief Scientist',
      relatedCareers: ['perfumer', 'food-scientist', 'chemist'],
      discoveryHint: 'Create delicious flavors that enhance food and beverage products.'
    }
  },
  {
    id: 'dance-choreographer',
    title: 'Dance Choreographer',
    tier: 'niche',
    description: 'Creates dance movements and routines for performances, theater, film, and television.',
    requirements: [
      { subcategoryId: 'dance_choreography', weight: 0.95 },
      { subcategoryId: 'creative_writing', weight: 0.75 },
      { subcategoryId: 'music_theory_history', weight: 0.7 }
    ],
    context: {
      salary: { entry: 25000, mid: 60000, senior: 130000 },
      education: 'BFA in Dance; extensive performance experience essential',
      jobOutlook: '2% growth, freelance/project work',
      yearsToEntry: 4,
      skills: ['Dance Technique', 'Choreography', 'Music Understanding', 'Creativity'],
      careerPath: 'Dancer → Assistant Choreographer → Choreographer → Creative Director',
      relatedCareers: ['dancer', 'movement-director', 'ballet-master'],
      discoveryHint: 'Express artistic vision through movement and dance.'
    }
  },
  {
    id: 'paleontologist',
    title: 'Paleontologist',
    tier: 'niche',
    description: 'Studies fossils and extinct organisms to understand Earth\'s history and evolution.',
    requirements: [
      { subcategoryId: 'paleontology', weight: 0.95 },
      { subcategoryId: 'ecology_evolution', weight: 0.85 },
      { subcategoryId: 'mineralogy_petrology', weight: 0.75 }
    ],
    context: {
      salary: { entry: 48000, mid: 85000, senior: 135000 },
      education: 'BS Paleontology/Geology; MS/PhD for research',
      jobOutlook: '5% growth, limited academic positions',
      yearsToEntry: 4,
      skills: ['Fossil Analysis', 'Geological Knowledge', 'Field Work', 'Research'],
      careerPath: 'Paleontologist → Senior Paleontologist → Research Director → Curator',
      relatedCareers: ['archaeologist', 'geologist', 'evolutionary-biologist'],
      discoveryHint: 'Unearth ancient life and understand how evolution shaped our world.'
    }
  },
  {
    id: 'coat-and-apparel-designer',
    title: 'Apparel Designer / Fashion Designer',
    tier: 'niche',
    description: 'Designs clothing and fashion collections for commercial production or custom tailoring.',
    requirements: [
      { subcategoryId: 'fashion_design', weight: 0.95 },
      { subcategoryId: 'industrial_product_design', weight: 0.8 },
      { subcategoryId: 'graphic_design', weight: 0.7 }
    ],
    context: {
      salary: { entry: 35000, mid: 70000, senior: 140000 },
      education: 'BFA Fashion Design; strong portfolio essential',
      jobOutlook: '2% growth, competitive field',
      yearsToEntry: 4,
      skills: ['Design', 'Sewing', 'Pattern Making', 'Trend Analysis'],
      careerPath: 'Junior Designer → Designer → Senior Designer → Creative Director',
      relatedCareers: ['textile-designer', 'costume-designer', 'shoe-designer'],
      discoveryHint: 'Create beautiful and functional clothing that shapes personal style.'
    }
  },
  {
    id: 'dendrochronologist',
    title: 'Dendrochronologist (Tree Ring Dating)',
    tier: 'niche',
    description: 'Studies tree rings to determine age and analyze historical climate and environmental changes.',
    requirements: [
      { subcategoryId: 'plant_biology', weight: 0.9 },
      { subcategoryId: 'environmental_history', weight: 0.85 },
      { subcategoryId: 'ecology_evolution', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 130000 },
      education: 'BS Forestry/Biology; MS/PhD for research',
      jobOutlook: '5% growth, specialized field',
      yearsToEntry: 4,
      skills: ['Tree Ring Analysis', 'Climate Science', 'Field Work', 'Dating Methods'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Lab Director',
      relatedCareers: ['climate-scientist', 'archaeologist', 'forest-ecologist'],
      discoveryHint: 'Read Earth\'s climate history written in tree rings.'
    }
  },
  {
    id: 'dialectologist',
    title: 'Dialectologist / Sociolinguist',
    tier: 'niche',
    description: 'Studies language variation across regions and social groups, analyzing dialects and language change.',
    requirements: [
      { subcategoryId: 'sociolinguistics', weight: 0.95 },
      { subcategoryId: 'structural_linguistics', weight: 0.9 },
      { subcategoryId: 'cultural_anthropology', weight: 0.75 }
    ],
    context: {
      salary: { entry: 50000, mid: 85000, senior: 130000 },
      education: 'BA/MA Linguistics; PhD for research',
      jobOutlook: '6% growth, academic focus',
      yearsToEntry: 4,
      skills: ['Linguistic Analysis', 'Field Research', 'Writing', 'Cultural Knowledge'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Department Chair',
      relatedCareers: ['linguist', 'anthropologist', 'sociolinguist'],
      discoveryHint: 'Explore how language varies and evolves across communities.'
    }
  },
  {
    id: 'documentary-filmmaker',
    title: 'Documentary Filmmaker / Producer',
    tier: 'niche',
    description: 'Creates documentary films that explore real-world issues, stories, and social themes.',
    requirements: [
      { subcategoryId: 'film_video', weight: 0.95 },
      { subcategoryId: 'journalism_nonfiction', weight: 0.85 },
      { subcategoryId: 'creative_writing', weight: 0.75 }
    ],
    context: {
      salary: { entry: 35000, mid: 75000, senior: 150000 },
      education: 'BFA in Film/Documentary; funding-dependent income',
      jobOutlook: '4% growth, project-based',
      yearsToEntry: 4,
      skills: ['Filmmaking', 'Storytelling', 'Production Management', 'Editing'],
      careerPath: 'Filmmaker → Established Filmmaker → Documentarian → Producer',
      relatedCareers: ['film-director', 'cinematographer', 'editor'],
      discoveryHint: 'Tell important true stories that inform and inspire audiences.'
    }
  },
  {
    id: 'tissue-engineer',
    title: 'Tissue Engineer',
    tier: 'niche',
    description: 'Develops artificial tissues and organs using engineering and biological principles for transplantation.',
    requirements: [
      { subcategoryId: 'biomedical_engineering', weight: 0.95 },
      { subcategoryId: 'cell_biology', weight: 0.9 },
      { subcategoryId: 'biochemistry', weight: 0.85 }
    ],
    context: {
      salary: { entry: 70000, mid: 125000, senior: 190000 },
      education: 'BS Biomedical Engineering; MS/PhD often required',
      jobOutlook: '10% growth (biotech), rapidly expanding',
      yearsToEntry: 4,
      skills: ['Tissue Culture', 'Biomaterials', 'Lab Skills', 'Problem Solving'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Lab Director',
      relatedCareers: ['biomedical-engineer', 'molecular-biologist', 'medical-scientist'],
      discoveryHint: 'Engineer replacement tissues and organs to save lives.'
    }
  },
  {
    id: 'archaeologist',
    title: 'Archaeologist',
    tier: 'niche',
    description: 'Excavates and analyzes artifacts and remains to understand past human societies and cultures.',
    requirements: [
      { subcategoryId: 'cultural_anthropology', weight: 0.9 },
      { subcategoryId: 'paleontology', weight: 0.75 },
      { subcategoryId: 'world_history', weight: 0.85 }
    ],
    context: {
      salary: { entry: 40000, mid: 70000, senior: 120000 },
      education: 'BA/MA Archaeology; PhD for research',
      jobOutlook: '4% growth, limited academic positions',
      yearsToEntry: 4,
      skills: ['Excavation', 'Artifact Analysis', 'Field Research', 'Writing'],
      careerPath: 'Field Archaeologist → Senior Archaeologist → Research Director → Curator',
      relatedCareers: ['anthropologist', 'historian', 'museum-curator'],
      discoveryHint: 'Uncover human history through archaeological discovery.'
    }
  },
  {
    id: 'video-game-animator',
    title: 'Video Game Animator',
    tier: 'niche',
    description: 'Creates character and object animations for video games using 3D animation software.',
    requirements: [
      { subcategoryId: 'game_dev_graphics', weight: 0.95 },
      { subcategoryId: 'puppetry_animation', weight: 0.85 },
      { subcategoryId: 'human_computer_interaction', weight: 0.65 }
    ],
    context: {
      salary: { entry: 50000, mid: 95000, senior: 160000 },
      education: 'BFA Animation; strong 3D animation portfolio essential',
      jobOutlook: '8% growth (game industry), competitive',
      yearsToEntry: 4,
      skills: ['3D Animation', 'Game Engines', 'Character Design', 'Problem Solving'],
      careerPath: 'Junior Animator → Animator → Senior Animator → Lead Animator',
      relatedCareers: ['game-artist', 'vfx-animator', '3d-modeler'],
      discoveryHint: 'Bring video game characters and worlds to life through animation.'
    }
  },
  {
    id: 'conservation-biologist',
    title: 'Conservation Biologist',
    tier: 'niche',
    description: 'Works to protect biodiversity and endangered species through research and conservation programs.',
    requirements: [
      { subcategoryId: 'conservation_biology', weight: 0.95 },
      { subcategoryId: 'ecology_evolution', weight: 0.95 },
      { subcategoryId: 'molecular_genetics', weight: 0.7 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 130000 },
      education: 'BS Biology; MS/PhD for research',
      jobOutlook: '6% growth, nonprofit/government focus',
      yearsToEntry: 4,
      skills: ['Population Biology', 'Field Research', 'Data Analysis', 'Communication'],
      careerPath: 'Biologist → Senior Biologist → Research Director → Conservation Leader',
      relatedCareers: ['wildlife-biologist', 'marine-biologist', 'environmental-scientist'],
      discoveryHint: 'Save species and ecosystems for future generations.'
    }
  },
  {
    id: 'brewery-master',
    title: 'Brewery Master / Head Brewer',
    tier: 'niche',
    description: 'Develops beer recipes and oversees brewing operations in breweries.',
    requirements: [
      { subcategoryId: 'biochemistry', weight: 0.85 },
      { subcategoryId: 'food_beverage', weight: 0.9 },
      { subcategoryId: 'analytical_chemistry', weight: 0.8 }
    ],
    context: {
      salary: { entry: 40000, mid: 70000, senior: 120000 },
      education: 'Certificate/Associate in Brewing; apprenticeship common',
      jobOutlook: '5% growth, craft beer growth',
      yearsToEntry: 3,
      skills: ['Brewing Science', 'Recipe Development', 'Quality Control', 'Leadership'],
      careerPath: 'Assistant Brewer → Brewer → Head Brewer → Brewery Owner/Director',
      relatedCareers: ['food-scientist', 'quality-assurance-manager', 'production-manager'],
      discoveryHint: 'Craft unique beers and lead brewing operations.'
    }
  },
  {
    id: 'scenic-designer',
    title: 'Scenic Designer / Set Designer',
    tier: 'niche',
    description: 'Designs sets, scenery, and visual environments for theater, film, and television productions.',
    requirements: [
      { subcategoryId: 'theater_production', weight: 0.95 },
      { subcategoryId: 'architecture', weight: 0.8 },
      { subcategoryId: 'aesthetics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 35000, mid: 70000, senior: 130000 },
      education: 'BFA Theater/Design; hands-on experience essential',
      jobOutlook: '4% growth, project-based',
      yearsToEntry: 4,
      skills: ['Scenic Design', 'CAD', 'Art Direction', 'Construction Knowledge'],
      careerPath: 'Set Designer → Senior Designer → Lead Designer → Production Designer',
      relatedCareers: ['costume-designer', 'lighting-designer', 'production-designer'],
      discoveryHint: 'Create immersive theatrical and cinematic environments.'
    }
  },
  {
    id: 'medical-illustrator',
    title: 'Medical Illustrator',
    tier: 'niche',
    description: 'Creates detailed medical and anatomical illustrations for healthcare, education, and publications.',
    requirements: [
      { subcategoryId: 'painting_drawing', weight: 0.95 },
      { subcategoryId: 'animal_physiology', weight: 0.85 },
      { subcategoryId: 'graphic_design', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 85000, senior: 140000 },
      education: 'BFA Medical Illustration; anatomy knowledge essential',
      jobOutlook: '5% growth, stable field',
      yearsToEntry: 4,
      skills: ['Medical Anatomy', 'Digital Illustration', 'Scientific Knowledge', 'Detail'],
      careerPath: 'Medical Illustrator → Senior Illustrator → Lead Illustrator → Director',
      relatedCareers: ['anatomist', 'medical-designer', 'scientific-illustrator'],
      discoveryHint: 'Communicate complex medical concepts through compelling illustration.'
    }
  },
  {
    id: 'ethnomusicologist',
    title: 'Ethnomusicologist',
    tier: 'niche',
    description: 'Studies music from different cultures to understand its roles in society and cultural expression.',
    requirements: [
      { subcategoryId: 'music_theory_history', weight: 0.95 },
      { subcategoryId: 'cultural_anthropology', weight: 0.9 },
      { subcategoryId: 'instrumental_performance', weight: 0.7 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 130000 },
      education: 'BA/MA Ethnomusicology; PhD for research',
      jobOutlook: '5% growth, academic focus',
      yearsToEntry: 4,
      skills: ['Musical Analysis', 'Field Research', 'Cultural Knowledge', 'Writing'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Department Chair',
      relatedCareers: ['musicologist', 'anthropologist', 'music-educator'],
      discoveryHint: 'Explore the profound connections between music and culture.'
    }
  },
  {
    id: 'court-reporter',
    title: 'Court Reporter / Stenographer',
    tier: 'niche',
    description: 'Creates verbatim transcripts of court proceedings and depositions using stenography or digital recording.',
    requirements: [
      { subcategoryId: 'law_legal_studies', weight: 0.85 },
      { subcategoryId: 'technical_writing', weight: 0.8 },
      { subcategoryId: 'applied_translation', weight: 0.7 }
    ],
    context: {
      salary: { entry: 40000, mid: 70000, senior: 120000 },
      education: 'Associate\'s in Court Reporting; certification required',
      jobOutlook: '8% growth, steady demand',
      yearsToEntry: 2,
      skills: ['Stenography', 'Typing Speed', 'Legal Terminology', 'Attention to Detail'],
      careerPath: 'Court Reporter → Senior Reporter → Supervisor → Agency Owner',
      relatedCareers: ['legal-secretary', 'transcriptionist', 'paralegal'],
      discoveryHint: 'Document legal proceedings with precision and accuracy.'
    }
  },
  {
    id: 'renewable-energy-engineer',
    title: 'Renewable Energy Engineer',
    tier: 'niche',
    description: 'Designs and develops renewable energy systems including solar, wind, and hydroelectric power.',
    requirements: [
      { subcategoryId: 'thermodynamics_energy', weight: 0.95 },
      { subcategoryId: 'electrical_engineering', weight: 0.9 },
      { subcategoryId: 'environmental_engineering', weight: 0.8 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 165000 },
      education: 'BS Renewable Energy Engineering or related',
      jobOutlook: '13% growth, very high demand',
      yearsToEntry: 4,
      skills: ['Energy Systems', 'CAD', 'Power Generation', 'Problem Solving'],
      careerPath: 'Junior Engineer → Senior Engineer → Lead Engineer → Director',
      relatedCareers: ['solar-engineer', 'wind-engineer', 'energy-consultant'],
      discoveryHint: 'Design clean energy systems for a sustainable future.'
    }
  },
  {
    id: 'curator',
    title: 'Museum Curator',
    tier: 'niche',
    description: 'Selects, preserves, and displays artifacts in museums and cultural institutions.',
    requirements: [
      { subcategoryId: 'cultural_history', weight: 0.9 },
      { subcategoryId: 'literary_studies', weight: 0.75 },
      { subcategoryId: 'aesthetics', weight: 0.8 }
    ],
    context: {
      salary: { entry: 40000, mid: 70000, senior: 120000 },
      education: 'MA in Art History, Museum Studies, or related field',
      jobOutlook: '5% growth, limited positions',
      yearsToEntry: 6,
      skills: ['Art/History Knowledge', 'Curation', 'Research', 'Communication'],
      careerPath: 'Curator → Senior Curator → Head Curator → Director',
      relatedCareers: ['art-historian', 'archaeologist', 'conservator'],
      discoveryHint: 'Preserve and present cultural heritage for public appreciation.'
    }
  },
  {
    id: 'prosthetics-orthotist',
    title: 'Prosthetist-Orthotist',
    tier: 'niche',
    description: 'Designs and manufactures prosthetic limbs and orthotic devices for patients with disabilities.',
    requirements: [
      { subcategoryId: 'biomedical_engineering', weight: 0.9 },
      { subcategoryId: 'animal_physiology', weight: 0.85 },
      { subcategoryId: 'mechanical_engineering', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 140000 },
      education: 'Master\'s in Prosthetics-Orthotics; certification required',
      jobOutlook: '8% growth, increasing demand',
      yearsToEntry: 6,
      skills: ['Prosthetic Design', 'Anatomy', 'Patient Care', 'Technical Skills'],
      careerPath: 'Technician → Prosthetist-Orthotist → Supervisor → Director',
      relatedCareers: ['biomedical-engineer', 'physical-therapist', 'medical-device-specialist'],
      discoveryHint: 'Restore mobility and independence through custom prosthetics.'
    }
  },
  {
    id: 'acoustic-engineer',
    title: 'Acoustic Engineer',
    tier: 'niche',
    description: 'Designs acoustic systems for concert halls, theaters, recording studios, and noise reduction.',
    requirements: [
      { subcategoryId: 'acoustics_waves', weight: 0.95 },
      { subcategoryId: 'physics', weight: 0.9 },
      { subcategoryId: 'electrical_engineering', weight: 0.7 }
    ],
    context: {
      salary: { entry: 60000, mid: 105000, senior: 160000 },
      education: 'BS Physics/Acoustics or Engineering',
      jobOutlook: '6% growth, specialized field',
      yearsToEntry: 4,
      skills: ['Acoustics', 'Physics', 'CAD', 'Problem Solving'],
      careerPath: 'Engineer → Senior Engineer → Lead Engineer → Chief Acoustician',
      relatedCareers: ['audio-engineer', 'sound-designer', 'electrical-engineer'],
      discoveryHint: 'Shape sound and acoustics for optimal listening environments.'
    }
  },

  // EXPLORATORY TIER (22 careers)
  {
    id: 'astrobiology-researcher',
    title: 'Astrobiology Researcher',
    tier: 'exploratory',
    description: 'Investigates the possibility of life beyond Earth and studies the conditions that support life.',
    requirements: [
      { subcategoryId: 'astrophysics_cosmology', weight: 0.85 },
      { subcategoryId: 'molecular_genetics', weight: 0.9 },
      { subcategoryId: 'microbiology', weight: 0.85 }
    ],
    context: {
      salary: { entry: 65000, mid: 115000, senior: 170000 },
      education: 'PhD in Biology, Astronomy, or related field (5-7 years)',
      jobOutlook: '7% growth (STEM), highly specialized',
      yearsToEntry: 9,
      skills: ['Astrobiology', 'Research', 'Exoplanet Analysis', 'Microbiology'],
      careerPath: 'Postdoc → Research Scientist → Senior Scientist → Principal Investigator',
      relatedCareers: ['astrobiologist', 'exoplanet-researcher', 'space-scientist'],
      discoveryHint: 'Search for life beyond Earth and understand cosmic biology.'
    }
  },
  {
    id: 'quantum-computing-engineer',
    title: 'Quantum Computing Engineer',
    tier: 'exploratory',
    description: 'Develops quantum computers and algorithms that leverage quantum mechanics for computation.',
    requirements: [
      { subcategoryId: 'quantum_particle', weight: 0.95 },
      { subcategoryId: 'software_development', weight: 0.9 },
      { subcategoryId: 'pure_mathematics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 130000, mid: 200000, senior: 350000 },
      education: 'BS Physics/CS; MS/PhD in Quantum Computing',
      jobOutlook: '25% growth (emerging field), exceptional demand',
      yearsToEntry: 6,
      skills: ['Quantum Mechanics', 'Python/C++', 'Algorithm Design', 'Physics'],
      careerPath: 'Quantum Engineer → Senior Engineer → Research Lead → Director',
      relatedCareers: ['quantum-physicist', 'cryptographer', 'ai-researcher'],
      discoveryHint: 'Build the next generation of powerful quantum computers.'
    }
  },
  {
    id: 'synthetic-biologist',
    title: 'Synthetic Biologist',
    tier: 'exploratory',
    description: 'Uses molecular biology and engineering principles to design and create new biological systems.',
    requirements: [
      { subcategoryId: 'molecular_genetics', weight: 0.95 },
      { subcategoryId: 'biochemistry', weight: 0.95 },
      { subcategoryId: 'biomedical_engineering', weight: 0.8 }
    ],
    context: {
      salary: { entry: 75000, mid: 135000, senior: 210000 },
      education: 'BS Biology; MS/PhD in Synthetic Biology recommended',
      jobOutlook: '12% growth (biotech), rapidly expanding',
      yearsToEntry: 4,
      skills: ['Molecular Biology', 'Genetics', 'Lab Skills', 'Computational Biology'],
      careerPath: 'Researcher → Senior Researcher → Principal Investigator → Lab Director',
      relatedCareers: ['genetic-engineer', 'molecular-biologist', 'bioengineer'],
      discoveryHint: 'Design organisms and biological systems to solve real-world problems.'
    }
  },
  {
    id: 'brain-computer-interface-engineer',
    title: 'Brain-Computer Interface Engineer',
    tier: 'exploratory',
    description: 'Develops systems that create direct communication pathways between the brain and external devices.',
    requirements: [
      { subcategoryId: 'neuroscience_biopsychology', weight: 0.95 },
      { subcategoryId: 'electrical_engineering', weight: 0.9 },
      { subcategoryId: 'software_development', weight: 0.85 }
    ],
    context: {
      salary: { entry: 100000, mid: 170000, senior: 280000 },
      education: 'BS in related field; MS/PhD in BCI or Neurotechnology',
      jobOutlook: '18% growth (biotech/neurotechnology), very high demand',
      yearsToEntry: 6,
      skills: ['Neuroscience', 'Signal Processing', 'Embedded Systems', 'Research'],
      careerPath: 'Engineer → Senior Engineer → Research Lead → Director',
      relatedCareers: ['neurotechnology-specialist', 'neurotech-entrepreneur', 'biomedical-engineer'],
      discoveryHint: 'Create direct interfaces between human brains and technology.'
    }
  },
  {
    id: 'climate-modeler',
    title: 'Climate Modeler / Climate Scientist',
    tier: 'exploratory',
    description: 'Develops computational models to predict climate patterns and understand climate change impacts.',
    requirements: [
      { subcategoryId: 'meteorology', weight: 0.95 },
      { subcategoryId: 'applied_mathematics', weight: 0.95 },
      { subcategoryId: 'climate_sustainability', weight: 0.9 }
    ],
    context: {
      salary: { entry: 70000, mid: 125000, senior: 190000 },
      education: 'BS Physics/Meteorology; MS/PhD for research',
      jobOutlook: '10% growth, increasingly critical',
      yearsToEntry: 4,
      skills: ['Climate Modeling', 'Data Analysis', 'Programming', 'Physics/Math'],
      careerPath: 'Scientist → Senior Scientist → Research Director → Climate Authority',
      relatedCareers: ['meteorologist', 'environmental-scientist', 'data-scientist'],
      discoveryHint: 'Model Earth\'s climate and guide global climate action.'
    }
  },
  {
    id: 'space-architect',
    title: 'Space Architect',
    tier: 'exploratory',
    description: 'Designs habitats and infrastructure for space exploration including lunar bases and space stations.',
    requirements: [
      { subcategoryId: 'aerospace_engineering', weight: 0.95 },
      { subcategoryId: 'architecture', weight: 0.85 },
      { subcategoryId: 'biomedical_engineering', weight: 0.75 }
    ],
    context: {
      salary: { entry: 80000, mid: 145000, senior: 220000 },
      education: 'BS Aerospace Engineering + Architecture background',
      jobOutlook: '5% growth, nascent industry',
      yearsToEntry: 4,
      skills: ['Space Systems', 'Design', 'Problem Solving', 'Systems Thinking'],
      careerPath: 'Engineer → Senior Engineer → Design Lead → Chief Architect',
      relatedCareers: ['aerospace-engineer', 'mission-architect', 'habitat-designer'],
      discoveryHint: 'Design human habitats for exploration beyond Earth.'
    }
  },
  {
    id: 'metaverse-designer',
    title: 'Metaverse Designer / Virtual Environment Architect',
    tier: 'exploratory',
    description: 'Creates immersive virtual worlds and metaverse experiences for entertainment, work, and social interaction.',
    requirements: [
      { subcategoryId: 'game_dev_graphics', weight: 0.95 },
      { subcategoryId: 'human_computer_interaction', weight: 0.9 },
      { subcategoryId: 'web_digital_design', weight: 0.85 }
    ],
    context: {
      salary: { entry: 75000, mid: 135000, senior: 220000 },
      education: 'BS Computer Science/Design; specialized metaverse training',
      jobOutlook: '22% growth (VR/metaverse), rapidly emerging',
      yearsToEntry: 4,
      skills: ['3D Design', 'Game Engines', 'UX Design', 'Virtual Environment Development'],
      careerPath: 'Designer → Senior Designer → Lead Designer → Creative Director',
      relatedCareers: ['vr-developer', 'game-designer', '3d-artist'],
      discoveryHint: 'Build immersive virtual worlds where billions interact.'
    }
  },
  {
    id: 'genetic-counselor',
    title: 'Genetic Counselor',
    tier: 'exploratory',
    description: 'Interprets genetic tests and helps patients understand hereditary health risks and treatment options.',
    requirements: [
      { subcategoryId: 'molecular_genetics', weight: 0.95 },
      { subcategoryId: 'medicine_clinical', weight: 0.85 },
      { subcategoryId: 'social_psychology', weight: 0.75 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 150000 },
      education: 'Master\'s in Genetic Counseling; ACGC certification',
      jobOutlook: '20% growth, very high demand',
      yearsToEntry: 6,
      skills: ['Genetics', 'Counseling', 'Patient Education', 'Medical Knowledge'],
      careerPath: 'Genetic Counselor → Senior Counselor → Clinical Director → Director',
      relatedCareers: ['genetic-specialist', 'medical-geneticist', 'counselor'],
      discoveryHint: 'Help patients navigate genetic health information and prevention.'
    }
  },
  {
    id: 'happiness-economist',
    title: 'Happiness Economist / Well-Being Researcher',
    tier: 'exploratory',
    description: 'Studies human well-being, life satisfaction, and mental health to inform policy and improve quality of life.',
    requirements: [
      { subcategoryId: 'macroeconomics', weight: 0.85 },
      { subcategoryId: 'social_psychology', weight: 0.95 },
      { subcategoryId: 'statistics_probability', weight: 0.9 }
    ],
    context: {
      salary: { entry: 65000, mid: 115000, senior: 180000 },
      education: 'BS Economics/Psychology; MS/PhD in Well-Being Studies',
      jobOutlook: '8% growth, emerging field',
      yearsToEntry: 4,
      skills: ['Data Analysis', 'Psychology', 'Economics', 'Research'],
      careerPath: 'Researcher → Senior Researcher → Research Director → Policy Influencer',
      relatedCareers: ['social-scientist', 'policy-analyst', 'psychologist'],
      discoveryHint: 'Research human happiness and shape policies for well-being.'
    }
  },
  {
    id: 'drone-technology-specialist',
    title: 'Unmanned Aerial Systems Specialist',
    tier: 'exploratory',
    description: 'Designs, operates, and manages drone systems for mapping, delivery, surveillance, and research.',
    requirements: [
      { subcategoryId: 'robotics_automation', weight: 0.95 },
      { subcategoryId: 'electrical_engineering', weight: 0.85 },
      { subcategoryId: 'systems_networks', weight: 0.8 }
    ],
    context: {
      salary: { entry: 55000, mid: 100000, senior: 160000 },
      education: 'BS Engineering or related; drone certification required',
      jobOutlook: '28% growth, rapidly expanding',
      yearsToEntry: 3,
      skills: ['Drone Systems', 'Programming', 'Regulations', 'Problem Solving'],
      careerPath: 'Operator → Technician → System Designer → Program Manager',
      relatedCareers: ['roboticist', 'systems-engineer', 'automation-engineer'],
      discoveryHint: 'Develop and deploy autonomous drone technology.'
    }
  },
  {
    id: 'longevity-researcher',
    title: 'Longevity / Aging Researcher',
    tier: 'exploratory',
    description: 'Investigates biological mechanisms of aging and develops interventions to extend healthy lifespan.',
    requirements: [
      { subcategoryId: 'molecular_genetics', weight: 0.95 },
      { subcategoryId: 'cell_biology', weight: 0.95 },
      { subcategoryId: 'neuroscience_biopsychology', weight: 0.8 }
    ],
    context: {
      salary: { entry: 70000, mid: 130000, senior: 210000 },
      education: 'PhD in Biology, Biochemistry, or related (5-7 years)',
      jobOutlook: '10% growth, rapidly expanding biotech',
      yearsToEntry: 9,
      skills: ['Aging Biology', 'Molecular Research', 'Lab Skills', 'Data Analysis'],
      careerPath: 'Postdoc → Research Scientist → Senior Scientist → Lab Director',
      relatedCareers: ['gerontologist', 'molecular-biologist', 'medical-researcher'],
      discoveryHint: 'Unlock the secrets of aging and extend healthy human lifespan.'
    }
  },
  {
    id: 'carbon-engineer',
    title: 'Carbon Capture / Carbon Engineering Specialist',
    tier: 'exploratory',
    description: 'Develops and implements carbon capture and sequestration technologies to combat climate change.',
    requirements: [
      { subcategoryId: 'environmental_engineering', weight: 0.95 },
      { subcategoryId: 'chemical_engineering', weight: 0.95 },
      { subcategoryId: 'climate_sustainability', weight: 0.9 }
    ],
    context: {
      salary: { entry: 75000, mid: 135000, senior: 210000 },
      education: 'BS Chemical/Environmental Engineering',
      jobOutlook: '16% growth, critical and expanding',
      yearsToEntry: 4,
      skills: ['Carbon Capture', 'Chemical Engineering', 'Systems Design', 'Problem Solving'],
      careerPath: 'Engineer → Senior Engineer → Lead Engineer → Director',
      relatedCareers: ['environmental-engineer', 'sustainability-consultant', 'climate-scientist'],
      discoveryHint: 'Remove carbon from the atmosphere and combat climate change.'
    }
  },
  {
    id: 'neurotech-entrepreneur',
    title: 'Neurotech Entrepreneur',
    tier: 'exploratory',
    description: 'Launches and scales startup companies developing neurotechnology products and services.',
    requirements: [
      { subcategoryId: 'neuroscience_biopsychology', weight: 0.85 },
      { subcategoryId: 'business_management', weight: 0.95 },
      { subcategoryId: 'software_development', weight: 0.75 }
    ],
    context: {
      salary: { entry: 100000, mid: 300000, senior: 1000000 },
      education: 'BS in related field + business/entrepreneurship background',
      jobOutlook: '22% growth (biotech startups), high risk/reward',
      yearsToEntry: 4,
      skills: ['Neurotechnology', 'Business Development', 'Fundraising', 'Leadership'],
      careerPath: 'Founder → CEO → Scaling to Series A/B → Exit/IPO',
      relatedCareers: ['startup-founder', 'tech-entrepreneur', 'product-manager'],
      discoveryHint: 'Build transformative neurotech companies.'
    }
  },
  {
    id: 'circular-economy-specialist',
    title: 'Circular Economy Specialist',
    tier: 'exploratory',
    description: 'Designs products and systems following circular economy principles to minimize waste and maximize reuse.',
    requirements: [
      { subcategoryId: 'environmental_engineering', weight: 0.9 },
      { subcategoryId: 'business_management', weight: 0.85 },
      { subcategoryId: 'sustainability', weight: 0.95 }
    ],
    context: {
      salary: { entry: 60000, mid: 110000, senior: 180000 },
      education: 'BS Engineering/Business + Circular Economy training',
      jobOutlook: '12% growth, rapidly emerging',
      yearsToEntry: 4,
      skills: ['Systems Design', 'Sustainability', 'Business Strategy', 'Analysis'],
      careerPath: 'Specialist → Senior Specialist → Lead Designer → Director',
      relatedCareers: ['sustainability-consultant', 'environmental-designer', 'systems-engineer'],
      discoveryHint: 'Design the circular economy where nothing goes to waste.'
    }
  },
  {
    id: 'cultural-technologist',
    title: 'Cultural Technologist',
    tier: 'exploratory',
    description: 'Combines technology and cultural studies to create digital cultural experiences and preserve heritage.',
    requirements: [
      { subcategoryId: 'web_digital_design', weight: 0.9 },
      { subcategoryId: 'cultural_history', weight: 0.95 },
      { subcategoryId: 'game_dev_graphics', weight: 0.8 }
    ],
    context: {
      salary: { entry: 60000, mid: 105000, senior: 175000 },
      education: 'BS Digital Design/CS + MA Cultural Studies',
      jobOutlook: '10% growth, emerging field',
      yearsToEntry: 6,
      skills: ['Digital Design', 'Cultural Knowledge', 'Technology', 'Creative Thinking'],
      careerPath: 'Designer → Senior Designer → Cultural Tech Director → Institution Leader',
      relatedCareers: ['digital-heritage-specialist', 'museum-technologist', 'ar-vr-designer'],
      discoveryHint: 'Preserve and share cultural heritage through immersive technology.'
    }
  },
  {
    id: 'biotech-patent-manager',
    title: 'Biotech Patent Manager / IP Strategist',
    tier: 'exploratory',
    description: 'Manages intellectual property strategies and patent portfolios for biotechnology companies.',
    requirements: [
      { subcategoryId: 'intellectual_property', weight: 0.95 },
      { subcategoryId: 'molecular_genetics', weight: 0.85 },
      { subcategoryId: 'law_legal_studies', weight: 0.9 }
    ],
    context: {
      salary: { entry: 110000, mid: 180000, senior: 320000 },
      education: 'JD + BS Biology/Chemistry; patent bar exam',
      jobOutlook: '8% growth (biotech), high demand',
      yearsToEntry: 8,
      skills: ['Patent Law', 'Biotechnology', 'IP Strategy', 'Negotiation'],
      careerPath: 'Patent Attorney → Senior Attorney → Head of IP → VP Legal',
      relatedCareers: ['patent-attorney', 'licensing-specialist', 'legal-counsel'],
      discoveryHint: 'Protect breakthrough biotech innovations through strategic IP management.'
    }
  },
  {
    id: 'zero-waste-engineer',
    title: 'Zero-Waste Systems Engineer',
    tier: 'exploratory',
    description: 'Designs and implements zero-waste systems for municipalities, industries, and facilities.',
    requirements: [
      { subcategoryId: 'environmental_engineering', weight: 0.95 },
      { subcategoryId: 'systems_networks', weight: 0.8 },
      { subcategoryId: 'climate_sustainability', weight: 0.9 }
    ],
    context: {
      salary: { entry: 65000, mid: 115000, senior: 180000 },
      education: 'BS Environmental/Civil Engineering',
      jobOutlook: '12% growth, rapidly expanding',
      yearsToEntry: 4,
      skills: ['Waste Management', 'Systems Design', 'Project Management', 'Analysis'],
      careerPath: 'Engineer → Senior Engineer → Lead Engineer → Director',
      relatedCareers: ['environmental-engineer', 'sustainability-consultant', 'waste-manager'],
      discoveryHint: 'Design systems where waste is eliminated entirely.'
    }
  },
  {
    id: 'immunotherapy-specialist',
    title: 'Immunotherapy Specialist / Oncology Researcher',
    tier: 'exploratory',
    description: 'Develops novel immunotherapy treatments that use the immune system to fight cancer.',
    requirements: [
      { subcategoryId: 'microbiology', weight: 0.95 },
      { subcategoryId: 'molecular_genetics', weight: 0.95 },
      { subcategoryId: 'biochemistry', weight: 0.9 }
    ],
    context: {
      salary: { entry: 80000, mid: 155000, senior: 250000 },
      education: 'PhD in Immunology/Oncology (5-7 years)',
      jobOutlook: '12% growth (biomedical), high demand',
      yearsToEntry: 9,
      skills: ['Immunology', 'Molecular Biology', 'Research', 'Lab Skills'],
      careerPath: 'Postdoc → Research Scientist → Senior Scientist → Lab Director',
      relatedCareers: ['oncologist', 'molecular-biologist', 'medical-researcher'],
      discoveryHint: 'Develop cutting-edge immunotherapy treatments for cancer.'
    }
  },
  {
    id: 'bioplastic-engineer',
    title: 'Bioplastic / Biomaterial Engineer',
    tier: 'exploratory',
    description: 'Develops sustainable bioplastics and biomaterials as alternatives to conventional petrochemical plastics.',
    requirements: [
      { subcategoryId: 'polymer_chemistry', weight: 0.95 },
      { subcategoryId: 'biomedical_engineering', weight: 0.85 },
      { subcategoryId: 'environmental_engineering', weight: 0.8 }
    ],
    context: {
      salary: { entry: 70000, mid: 125000, senior: 200000 },
      education: 'BS Chemical/Materials Engineering',
      jobOutlook: '14% growth, rapidly expanding',
      yearsToEntry: 4,
      skills: ['Polymer Science', 'Materials Testing', 'Sustainable Design', 'Problem Solving'],
      careerPath: 'Engineer → Senior Engineer → Research Lead → Product Director',
      relatedCareers: ['materials-scientist', 'environmental-engineer', 'chemist'],
      discoveryHint: 'Create sustainable alternatives to plastic for a greener future.'
    }
  },
  {
    id: 'space-medicine-doctor',
    title: 'Space Medicine Physician',
    tier: 'exploratory',
    description: 'Provides medical care and researches health challenges faced by astronauts in space environments.',
    requirements: [
      { subcategoryId: 'medicine_clinical', weight: 0.95 },
      { subcategoryId: 'aerospace_engineering', weight: 0.8 },
      { subcategoryId: 'biophysics', weight: 0.85 }
    ],
    context: {
      salary: { entry: 130000, mid: 220000, senior: 380000 },
      education: 'MD/DO + aerospace medicine fellowship',
      jobOutlook: '5% growth (specialized), niche field',
      yearsToEntry: 13,
      skills: ['Space Physiology', 'Medicine', 'Research', 'Aerospace Knowledge'],
      careerPath: 'Flight Surgeon → Senior Flight Surgeon → Space Medicine Director',
      relatedCareers: ['astronaut', 'aerospace-engineer', 'military-physician'],
      discoveryHint: 'Protect astronauts\' health as humanity ventures into space.'
    }
  }
];

export const getCareersbyTier = (tier) => {
  return CAREERS.filter(career => career.tier === tier);
};

export const getCareerById = (careerId) => {
  return CAREERS.find(career => career.id === careerId);
};
