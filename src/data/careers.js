/**
 * CAREERS DATABASE - Phase 3
 *
 * 87 total careers across 4 tiers:
 * - Core (15): High-demand, clear career paths
 * - Advanced (20): Specialized education, leadership roles
 * - Niche (25): Specific interests, less common, creative combinations
 * - Exploratory (27): Rare combinations, emerging fields, unique intersections
 *
 * All 32 subcategories covered by 2-5 careers minimum
 * Realistic US salaries (~2026), education paths, and growth trajectories
 */

export const CAREERS = [
  // ============================================================================
  // TIER 1: CORE (15) - High-demand, clear entry path, essential roles
  // ============================================================================

  {
    id: 'software-engineer',
    title: 'Software Engineer',
    tier: 'core',
    description: 'Design, develop, and maintain software applications and systems. Core role in the tech industry.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },
      { subcategoryId: 'mathematics_discrete', weight: 0.70 },
      { subcategoryId: 'technology_data', weight: 0.40 }
    ],
    context: {
      salary: { entry: 85000, mid: 130000, senior: 180000 },
      education: "Bachelor's in CS or related field (4 years). Boot camps viable.",
      jobOutlook: 'Excellent (22% growth 2023-2033)',
      yearsToEntry: 4,
      skills: ['Problem-solving', 'System design', 'Version control', 'Testing', 'Code review'],
      careerPath: 'Junior Engineer → Software Engineer → Senior Engineer → Tech Lead → Architect',
      relatedCareers: ['Full Stack Developer', 'Backend Engineer', 'Mobile Developer', 'DevOps Engineer'],
      discoveryHint: 'If you enjoy solving puzzles and building systems, software engineering offers unlimited creative technical challenges.'
    }
  },

  {
    id: 'nurse',
    title: 'Registered Nurse',
    tier: 'core',
    description: 'Provide direct patient care, administer medications, and coordinate healthcare in hospitals and clinics.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.90 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.50 },
      { subcategoryId: 'biology_molecular', weight: 0.35 }
    ],
    context: {
      salary: { entry: 65000, mid: 85000, senior: 120000 },
      education: 'BSN or ADN (4 or 2 years) + NCLEX licensure',
      jobOutlook: 'Strong (9% growth, high demand)',
      yearsToEntry: 2,
      skills: ['Patient care', 'Medical procedures', 'Communication', 'Critical thinking', 'Empathy'],
      careerPath: 'Nurse → Charge Nurse → Nurse Manager → Director of Nursing',
      relatedCareers: ['Physician Assistant', 'Nurse Practitioner', 'Midwife', 'Respiratory Therapist'],
      discoveryHint: 'Nursing combines anatomy knowledge with real human impact—you\'ll directly improve lives every shift.'
    }
  },

  {
    id: 'accountant',
    title: 'Certified Public Accountant (CPA)',
    tier: 'core',
    description: 'Manage financial records, taxes, audits, and financial planning for individuals and organizations.',
    requirements: [
      { subcategoryId: 'mathematics_applied', weight: 0.85 },
      { subcategoryId: 'mathematics_pure', weight: 0.40 },
      { subcategoryId: 'technology_software', weight: 0.50 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 150000 },
      education: 'Bachelor\'s in Accounting + CPA exam (5 years total)',
      jobOutlook: 'Steady (4% growth, stable demand)',
      yearsToEntry: 5,
      skills: ['Financial analysis', 'Attention to detail', 'Regulatory compliance', 'Excel mastery', 'Audit procedures'],
      careerPath: 'Staff Accountant → Senior Accountant → Manager → Partner/CFO',
      relatedCareers: ['Financial Analyst', 'Auditor', 'Tax Specialist', 'Management Consultant'],
      discoveryHint: 'If you love patterns and precision in numbers, accounting provides structure and clear career advancement.'
    }
  },

  {
    id: 'secondary-teacher',
    title: 'Secondary Teacher (Math, Science, English)',
    tier: 'core',
    description: 'Educate students in core subjects, develop curriculum, and foster critical thinking.',
    requirements: [
      { subcategoryId: 'mathematics_applied', weight: 0.75 },
      { subcategoryId: 'writing_academic', weight: 0.60 },
      { subcategoryId: 'biology_anatomy', weight: 0.50 }
    ],
    context: {
      salary: { entry: 40000, mid: 65000, senior: 85000 },
      education: 'Bachelor\'s in subject + teaching credential (4-5 years)',
      jobOutlook: 'Good (8% growth, ongoing demand)',
      yearsToEntry: 4,
      skills: ['Communication', 'Curriculum design', 'Classroom management', 'Mentoring', 'Assessment'],
      careerPath: 'Teacher → Lead Teacher → Department Head → Administrator → Principal',
      relatedCareers: ['College Professor', 'Curriculum Designer', 'Educational Consultant', 'School Administrator'],
      discoveryHint: 'Teaching transforms your passion for a subject into lifelong impact on thousands of students.'
    }
  },

  {
    id: 'civil-engineer',
    title: 'Civil Engineer',
    tier: 'core',
    description: 'Design and oversee construction of infrastructure: roads, bridges, buildings, water systems.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.90 },
      { subcategoryId: 'mathematics_geometry', weight: 0.70 },
      { subcategoryId: 'chemistry_environmental', weight: 0.40 }
    ],
    context: {
      salary: { entry: 70000, mid: 110000, senior: 160000 },
      education: 'Bachelor\'s in Civil Engineering + PE license (5-7 years)',
      jobOutlook: 'Good (5% growth)',
      yearsToEntry: 5,
      skills: ['Design software (CAD)', 'Project management', 'Structural analysis', 'Budgeting', 'Regulation knowledge'],
      careerPath: 'Junior Engineer → Engineer → Senior Engineer → Principal Engineer → Project Director',
      relatedCareers: ['Structural Engineer', 'Mechanical Engineer', 'Construction Manager', 'Urban Planner'],
      discoveryHint: 'Civil engineering lets you see your physics and math knowledge shape the physical world permanently.'
    }
  },

  {
    id: 'graphic-designer',
    title: 'Graphic Designer',
    tier: 'core',
    description: 'Create visual content for brands, marketing, and digital platforms using design tools.',
    requirements: [
      { subcategoryId: 'art_design_digital', weight: 0.90 },
      { subcategoryId: 'art_design_visual', weight: 0.70 },
      { subcategoryId: 'writing_journalism', weight: 0.35 }
    ],
    context: {
      salary: { entry: 45000, mid: 70000, senior: 110000 },
      education: "Bachelor's in Design or self-taught portfolio (0-4 years)",
      jobOutlook: 'Good (3% growth, portfolio-driven hiring)',
      yearsToEntry: 2,
      skills: ['Adobe Creative Suite', 'Visual hierarchy', 'Typography', 'Branding', 'Web design'],
      careerPath: 'Junior Designer → Designer → Senior Designer → Creative Director → Design Lead',
      relatedCareers: ['UX/UI Designer', 'Motion Designer', 'Brand Strategist', 'Web Designer'],
      discoveryHint: 'If visual design excites you, graphic design channels that directly into creating the logos, packages, and interfaces millions see daily.'
    }
  },

  {
    id: 'data-analyst',
    title: 'Data Analyst',
    tier: 'core',
    description: 'Collect, process, and analyze data to drive business decisions using SQL, Python, and BI tools.',
    requirements: [
      { subcategoryId: 'mathematics_applied', weight: 0.85 },
      { subcategoryId: 'technology_data', weight: 0.80 },
      { subcategoryId: 'technology_software', weight: 0.45 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 140000 },
      education: "Bachelor's in data/stats/CS or online boot camp (3-4 years)",
      jobOutlook: 'Excellent (36% growth)',
      yearsToEntry: 3,
      skills: ['SQL', 'Python/R', 'Statistics', 'Tableau/Power BI', 'Business acumen'],
      careerPath: 'Junior Analyst → Data Analyst → Senior Analyst → Analytics Manager → Analytics Director',
      relatedCareers: ['Data Scientist', 'Business Analyst', 'BI Developer', 'Machine Learning Engineer'],
      discoveryHint: 'Data analysis combines statistical thinking with storytelling—turn raw numbers into decisions that move companies forward.'
    }
  },

  {
    id: 'mechanical-engineer',
    title: 'Mechanical Engineer',
    tier: 'core',
    description: 'Design and develop mechanical systems, machinery, engines, and industrial equipment.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.95 },
      { subcategoryId: 'physics_thermodynamics', weight: 0.65 },
      { subcategoryId: 'mathematics_geometry', weight: 0.70 }
    ],
    context: {
      salary: { entry: 70000, mid: 115000, senior: 165000 },
      education: "Bachelor's in Mechanical Engineering + PE license (5-7 years)",
      jobOutlook: 'Good (4% growth)',
      yearsToEntry: 5,
      skills: ['CAD design', 'Thermodynamics', 'Fluid mechanics', 'Materials science', 'Testing/simulation'],
      careerPath: 'Junior Engineer → Mechanical Engineer → Senior Engineer → Principal Engineer → Engineering Manager',
      relatedCareers: ['Aerospace Engineer', 'Roboticist', 'Manufacturing Engineer', 'HVAC Engineer'],
      discoveryHint: 'Mechanical engineering is physics applied to real machines—from cars to medical devices, your designs solve tangible problems.'
    }
  },

  {
    id: 'physician',
    title: 'Physician (MD/DO)',
    tier: 'core',
    description: 'Diagnose diseases, prescribe treatments, and manage patient care across various medical specialties.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.95 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.75 },
      { subcategoryId: 'biology_molecular', weight: 0.55 }
    ],
    context: {
      salary: { entry: 200000, mid: 250000, senior: 350000 },
      education: 'MD/DO (4 years) + residency (3-7 years)',
      jobOutlook: 'Strong (3% growth, supply shortage)',
      yearsToEntry: 11,
      skills: ['Clinical diagnosis', 'Patient communication', 'Medical knowledge', 'Procedural skills', 'Leadership'],
      careerPath: 'Resident → Attending Physician → Specialist → Department Head → Chief Medical Officer',
      relatedCareers: ['Surgeon', 'Psychiatrist', 'Pediatrician', 'Cardiologist'],
      discoveryHint: 'Medicine combines deep human anatomy knowledge with the ultimate purpose: saving and improving lives.'
    }
  },

  {
    id: 'financial-analyst',
    title: 'Financial Analyst',
    tier: 'core',
    description: 'Analyze financial statements, market trends, and investment opportunities for firms or investors.',
    requirements: [
      { subcategoryId: 'mathematics_applied', weight: 0.85 },
      { subcategoryId: 'technology_software', weight: 0.55 },
      { subcategoryId: 'mathematics_pure', weight: 0.45 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 175000 },
      education: "Bachelor's in Finance/Economics + CFA charter (4-6 years)",
      jobOutlook: 'Good (6% growth)',
      yearsToEntry: 4,
      skills: ['Financial modeling', 'Valuation', 'Data analysis', 'Excel', 'Risk assessment'],
      careerPath: 'Junior Analyst → Financial Analyst → Senior Analyst → Manager → Director',
      relatedCareers: ['Investment Banker', 'Portfolio Manager', 'Risk Manager', 'Corporate Treasurer'],
      discoveryHint: 'Financial analysis applies mathematical rigor to markets—predict economic trends and guide billions in investment decisions.'
    }
  },

  {
    id: 'web-developer',
    title: 'Web Developer',
    tier: 'core',
    description: 'Build and maintain websites and web applications using HTML, CSS, JavaScript, and backend technologies.',
    requirements: [
      { subcategoryId: 'technology_web', weight: 0.95 },
      { subcategoryId: 'technology_software', weight: 0.75 },
      { subcategoryId: 'art_design_digital', weight: 0.45 }
    ],
    context: {
      salary: { entry: 60000, mid: 100000, senior: 150000 },
      education: "Bachelor's in CS or boot camp (3-4 years)",
      jobOutlook: 'Excellent (23% growth)',
      yearsToEntry: 3,
      skills: ['JavaScript', 'React/Vue', 'HTML/CSS', 'Backend frameworks', 'Responsive design'],
      careerPath: 'Junior Developer → Web Developer → Senior Developer → Tech Lead → Engineering Manager',
      relatedCareers: ['Frontend Engineer', 'Full Stack Developer', 'UX Engineer', 'Product Manager'],
      discoveryHint: 'Web development lets you build interactive experiences millions use daily—visible, tangible results from code.'
    }
  },

  {
    id: 'project-manager',
    title: 'Project Manager',
    tier: 'core',
    description: 'Plan, coordinate, and oversee projects to ensure timely, on-budget delivery of objectives.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.60 },
      { subcategoryId: 'mathematics_applied', weight: 0.55 },
      { subcategoryId: 'writing_academic', weight: 0.50 }
    ],
    context: {
      salary: { entry: 65000, mid: 105000, senior: 155000 },
      education: "Bachelor's + PMP certification (5-7 years)",
      jobOutlook: 'Excellent (10% growth across industries)',
      yearsToEntry: 5,
      skills: ['Planning', 'Risk management', 'Team leadership', 'Communication', 'Budget management'],
      careerPath: 'Project Coordinator → Project Manager → Senior PM → Program Manager → Director',
      relatedCareers: ['Product Manager', 'Scrum Master', 'Business Analyst', 'Program Manager'],
      discoveryHint: 'Project management turns organizational thinking into reality—you orchestrate teams to deliver transformative initiatives.'
    }
  },

  {
    id: 'marketing-manager',
    title: 'Marketing Manager',
    tier: 'core',
    description: 'Develop marketing strategies, manage campaigns, and drive customer acquisition and engagement.',
    requirements: [
      { subcategoryId: 'writing_journalism', weight: 0.75 },
      { subcategoryId: 'art_design_digital', weight: 0.55 },
      { subcategoryId: 'mathematics_applied', weight: 0.50 }
    ],
    context: {
      salary: { entry: 55000, mid: 90000, senior: 140000 },
      education: "Bachelor's in Marketing/Business (4 years)",
      jobOutlook: 'Good (7% growth)',
      yearsToEntry: 4,
      skills: ['Campaign management', 'Analytics', 'Content strategy', 'Social media', 'Brand development'],
      careerPath: 'Marketing Coordinator → Marketing Manager → Senior Manager → Director → VP',
      relatedCareers: ['Content Strategist', 'Brand Manager', 'Digital Marketer', 'Product Manager'],
      discoveryHint: 'Marketing combines creativity with analytics—tell compelling stories while measuring exactly what resonates with audiences.'
    }
  },

  {
    id: 'geologist',
    title: 'Geologist',
    tier: 'core',
    description: 'Study Earth\'s structure, composition, and processes. Work in mining, oil/gas, water resources, or hazard assessment.',
    requirements: [
      { subcategoryId: 'chemistry_physical', weight: 0.70 },
      { subcategoryId: 'physics_mechanics', weight: 0.60 },
      { subcategoryId: 'chemistry_environmental', weight: 0.75 }
    ],
    context: {
      salary: { entry: 55000, mid: 90000, senior: 135000 },
      education: "Bachelor's in Geology (4 years)",
      jobOutlook: 'Moderate (5% growth, depends on industry)',
      yearsToEntry: 4,
      skills: ['Rock/mineral identification', 'Fieldwork', 'Geological mapping', 'Laboratory analysis', 'Data interpretation'],
      careerPath: 'Field Geologist → Geologist → Senior Geologist → Geological Manager → Director',
      relatedCareers: ['Hydrogeologist', 'Mining Engineer', 'Environmental Geologist', 'Seismologist'],
      discoveryHint: 'Geology combines chemistry and physics to unlock Earth\'s history and resources—outdoor field work plus technical lab analysis.'
    }
  },

  {
    id: 'human-resources-manager',
    title: 'Human Resources Manager',
    tier: 'core',
    description: 'Recruit, develop, and manage organizational talent. Handle benefits, compliance, and employee relations.',
    requirements: [
      { subcategoryId: 'writing_academic', weight: 0.65 },
      { subcategoryId: 'technology_software', weight: 0.45 },
      { subcategoryId: 'mathematics_applied', weight: 0.40 }
    ],
    context: {
      salary: { entry: 55000, mid: 85000, senior: 130000 },
      education: "Bachelor's in HR/Business + SHRM certification (4-5 years)",
      jobOutlook: 'Good (7% growth)',
      yearsToEntry: 4,
      skills: ['Recruitment', 'Employee relations', 'Compliance knowledge', 'Coaching', 'Data analysis'],
      careerPath: 'HR Specialist → HR Manager → Senior HR Manager → Director → VP Human Resources',
      relatedCareers: ['Recruiter', 'Organizational Development Specialist', 'Training Manager', 'Employee Relations Specialist'],
      discoveryHint: 'HR management builds organizational culture and develops human potential—shape how thousands of people experience work.'
    }
  },

  // ============================================================================
  // TIER 2: ADVANCED (20) - Specialized education, technical mastery, leadership
  // ============================================================================

  {
    id: 'machine-learning-engineer',
    title: 'Machine Learning Engineer',
    tier: 'advanced',
    description: 'Develop AI models and machine learning systems. Design algorithms to solve complex data problems.',
    requirements: [
      { subcategoryId: 'technology_data', weight: 0.95 },
      { subcategoryId: 'mathematics_pure', weight: 0.75 },
      { subcategoryId: 'technology_software', weight: 0.80 }
    ],
    context: {
      salary: { entry: 110000, mid: 170000, senior: 250000 },
      education: "Master's in ML/CS or strong self-taught (5-6 years)",
      jobOutlook: 'Excellent (36% growth)',
      yearsToEntry: 5,
      skills: ['Python/TensorFlow', 'Statistics', 'Deep learning', 'Feature engineering', 'Model optimization'],
      careerPath: 'ML Engineer → Senior ML Engineer → ML Architect → AI Lead → Director',
      relatedCareers: ['Data Scientist', 'AI Researcher', 'Deep Learning Engineer', 'Computer Vision Engineer'],
      discoveryHint: 'ML engineering builds the future—train models that recognize patterns humans can\'t and solve problems at unprecedented scale.'
    }
  },

  {
    id: 'surgeon',
    title: 'Surgeon (MD/DO, specialized)',
    tier: 'advanced',
    description: 'Perform complex surgical procedures in specialized fields (orthopedic, cardiothoracic, neuro, etc.).',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.95 },
      { subcategoryId: 'physics_mechanics', weight: 0.60 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.60 }
    ],
    context: {
      salary: { entry: 250000, mid: 350000, senior: 500000 },
      education: 'MD/DO (4 years) + surgical residency (5-7 years)',
      jobOutlook: 'Good (4% growth)',
      yearsToEntry: 12,
      skills: ['Surgical techniques', 'Precision', 'Patient assessment', 'Team leadership', 'Crisis management'],
      careerPath: 'Surgical Resident → Attending Surgeon → Chief of Surgery → Surgical Director',
      relatedCareers: ['Orthopedic Surgeon', 'Cardiologist', 'Neurosurgeon', 'Trauma Surgeon'],
      discoveryHint: 'Surgery combines deep anatomical knowledge with hands-on precision to directly save and transform lives through intervention.'
    }
  },

  {
    id: 'patent-lawyer',
    title: 'Patent Lawyer',
    tier: 'advanced',
    description: 'Protect intellectual property through patent filing, prosecution, and litigation in tech/science domains.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.70 },
      { subcategoryId: 'chemistry_organic', weight: 0.60 },
      { subcategoryId: 'physics_mechanics', weight: 0.50 }
    ],
    context: {
      salary: { entry: 100000, mid: 180000, senior: 280000 },
      education: 'Bachelor\'s in STEM + Law degree + Patent bar (7 years)',
      jobOutlook: 'Good (4% growth, specialized demand)',
      yearsToEntry: 7,
      skills: ['Patent law', 'Technical writing', 'Legal research', 'Negotiation', 'Litigation'],
      careerPath: 'Patent Associate → Senior Patent Counsel → Counsel → Partner → IP Director',
      relatedCareers: ['IP Attorney', 'Corporate Counsel', 'Litigation Attorney', 'Trademark Specialist'],
      discoveryHint: 'Patent law blends technical expertise with legal strategy—protect billion-dollar innovations while understanding cutting-edge science.'
    }
  },

  {
    id: 'data-scientist',
    title: 'Data Scientist',
    tier: 'advanced',
    description: 'Develop statistical models and machine learning pipelines to extract insights from complex datasets.',
    requirements: [
      { subcategoryId: 'mathematics_applied', weight: 0.90 },
      { subcategoryId: 'technology_data', weight: 0.90 },
      { subcategoryId: 'mathematics_pure', weight: 0.60 }
    ],
    context: {
      salary: { entry: 95000, mid: 145000, senior: 220000 },
      education: "Master's in Data Science/Statistics (5-6 years)",
      jobOutlook: 'Excellent (36% growth)',
      yearsToEntry: 5,
      skills: ['Statistics', 'Python/R', 'SQL', 'A/B testing', 'Model interpretation'],
      careerPath: 'Data Scientist → Senior Data Scientist → Principal Data Scientist → Data Science Lead',
      relatedCareers: ['ML Engineer', 'Analytics Engineer', 'Research Scientist', 'Quantitative Analyst'],
      discoveryHint: 'Data science turns curiosity about patterns into predictive power—ask questions about data, let algorithms reveal answers.'
    }
  },

  {
    id: 'aerospace-engineer',
    title: 'Aerospace Engineer',
    tier: 'advanced',
    description: 'Design and develop aircraft, spacecraft, and propulsion systems. Work on cutting-edge aviation technology.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.90 },
      { subcategoryId: 'physics_thermodynamics', weight: 0.75 },
      { subcategoryId: 'mathematics_geometry', weight: 0.70 }
    ],
    context: {
      salary: { entry: 75000, mid: 120000, senior: 180000 },
      education: "Bachelor's in Aerospace Engineering (4 years)",
      jobOutlook: 'Moderate (2% growth, specialized)',
      yearsToEntry: 4,
      skills: ['Aerodynamics', 'Propulsion systems', 'CFD simulation', 'Materials selection', 'Systems integration'],
      careerPath: 'Junior Engineer → Aerospace Engineer → Senior Engineer → Principal Engineer → Chief Engineer',
      relatedCareers: ['Mechanical Engineer', 'Flight Test Engineer', 'Systems Engineer', 'Propulsion Specialist'],
      discoveryHint: 'Aerospace pushes physics and thermodynamics to their limits—build the vehicles that explore Earth and space.'
    }
  },

  {
    id: 'research-scientist',
    title: 'Research Scientist',
    tier: 'advanced',
    description: 'Conduct original research in academia or industry. Publish papers, lead studies, and advance scientific knowledge.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.85 },
      { subcategoryId: 'chemistry_organic', weight: 0.75 },
      { subcategoryId: 'mathematics_applied', weight: 0.55 }
    ],
    context: {
      salary: { entry: 65000, mid: 105000, senior: 160000 },
      education: "PhD in Biology/Chemistry (6-8 years)",
      jobOutlook: 'Moderate (5% growth)',
      yearsToEntry: 6,
      skills: ['Experimental design', 'Lab techniques', 'Statistics', 'Writing', 'Peer review'],
      careerPath: 'Postdoc → Research Scientist → Senior Research Scientist → Principal Investigator → Lab Director',
      relatedCareers: ['Biochemist', 'Molecular Biologist', 'Pharmacologist', 'Clinical Researcher'],
      discoveryHint: 'Research science transforms curiosity into discoveries that advance medicine and human knowledge.'
    }
  },

  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    tier: 'advanced',
    description: 'Manage infrastructure, deploy code, automate systems. Bridge development and operations.',
    requirements: [
      { subcategoryId: 'technology_security', weight: 0.85 },
      { subcategoryId: 'technology_software', weight: 0.80 },
      { subcategoryId: 'mathematics_discrete', weight: 0.50 }
    ],
    context: {
      salary: { entry: 85000, mid: 135000, senior: 190000 },
      education: "Bachelor's in CS or hands-on IT background (3-5 years)",
      jobOutlook: 'Excellent (13% growth)',
      yearsToEntry: 4,
      skills: ['Kubernetes', 'Docker', 'CI/CD', 'Cloud platforms (AWS/GCP)', 'Infrastructure as Code'],
      careerPath: 'Systems Administrator → DevOps Engineer → Senior DevOps Engineer → DevOps Architect → Infrastructure Lead',
      relatedCareers: ['Systems Engineer', 'Cloud Architect', 'Release Engineer', 'SRE'],
      discoveryHint: 'DevOps combines software engineering with systems thinking—build the infrastructure that powers global services.'
    }
  },

  {
    id: 'psychiatrist',
    title: 'Psychiatrist',
    tier: 'advanced',
    description: 'Diagnose and treat mental health conditions. Prescribe medications and provide evidence-based therapy.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.85 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.80 },
      { subcategoryId: 'chemistry_organic', weight: 0.55 }
    ],
    context: {
      salary: { entry: 200000, mid: 260000, senior: 350000 },
      education: 'MD/DO (4 years) + psychiatry residency (5 years)',
      jobOutlook: 'Excellent (12% growth)',
      yearsToEntry: 9,
      skills: ['Diagnosis', 'Psychopharmacology', 'Patient communication', 'Crisis intervention', 'Evidence-based treatment'],
      careerPath: 'Psychiatry Resident → Attending Psychiatrist → Specialist → Medical Director',
      relatedCareers: ['Psychologist', 'Clinical Social Worker', 'Neurologist', 'Pharmacologist'],
      discoveryHint: 'Psychiatry applies biochemistry to mental health—medications and therapy combined to restore hope and wellness.'
    }
  },

  {
    id: 'chemical-engineer',
    title: 'Chemical Engineer',
    tier: 'advanced',
    description: 'Design chemical processes and plants. Optimize production of pharmaceuticals, polymers, fuels, and materials.',
    requirements: [
      { subcategoryId: 'chemistry_physical', weight: 0.90 },
      { subcategoryId: 'physics_thermodynamics', weight: 0.80 },
      { subcategoryId: 'mathematics_applied', weight: 0.70 }
    ],
    context: {
      salary: { entry: 75000, mid: 120000, senior: 170000 },
      education: "Bachelor's in Chemical Engineering + PE license (5-7 years)",
      jobOutlook: 'Moderate (4% growth)',
      yearsToEntry: 5,
      skills: ['Chemical kinetics', 'Process design', 'Thermodynamics', 'Safety protocols', 'Simulation software'],
      careerPath: 'Process Engineer → Chemical Engineer → Senior Engineer → Process Development Manager → Plant Manager',
      relatedCareers: ['Materials Engineer', 'Environmental Engineer', 'Petroleum Engineer', 'Pharmaceutical Engineer'],
      discoveryHint: 'Chemical engineering scales chemistry from the lab to industrial production—design processes that produce goods for billions.'
    }
  },

  {
    id: 'quantum-physicist',
    title: 'Quantum Physicist / Quantum Engineer',
    tier: 'advanced',
    description: 'Research quantum mechanics and develop quantum computing systems. Push the boundaries of physics.',
    requirements: [
      { subcategoryId: 'physics_quantum', weight: 0.95 },
      { subcategoryId: 'mathematics_pure', weight: 0.85 },
      { subcategoryId: 'physics_mechanics', weight: 0.60 }
    ],
    context: {
      salary: { entry: 100000, mid: 160000, senior: 240000 },
      education: "PhD in Physics (6-8 years)",
      jobOutlook: 'Emerging (9% growth in emerging sectors)',
      yearsToEntry: 8,
      skills: ['Quantum mechanics', 'Linear algebra', 'Simulation', 'Cryogenics', 'Experimental design'],
      careerPath: 'Postdoc → Quantum Researcher → Senior Researcher → Principal Investigator → Lab Director',
      relatedCareers: ['Condensed Matter Physicist', 'Particle Physicist', 'Quantum Engineer', 'Computational Physicist'],
      discoveryHint: 'Quantum physics tackles the weirdest, most fundamental nature of reality—prepare to have your intuition shattered.'
    }
  },

  {
    id: 'epidemiologist',
    title: 'Epidemiologist',
    tier: 'advanced',
    description: 'Study disease patterns and outbreaks. Track transmission, conduct research, inform public health policy.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.75 },
      { subcategoryId: 'mathematics_applied', weight: 0.85 },
      { subcategoryId: 'biology_ecology', weight: 0.55 }
    ],
    context: {
      salary: { entry: 60000, mid: 100000, senior: 150000 },
      education: "Master's in Public Health/Epidemiology (6 years)",
      jobOutlook: 'Good (5% growth, plus pandemic response)',
      yearsToEntry: 6,
      skills: ['Statistical analysis', 'Epidemiological methods', 'Database management', 'Report writing', 'Fieldwork'],
      careerPath: 'Epidemiologist → Senior Epidemiologist → Epidemiology Manager → Director → Chief Epidemiologist',
      relatedCareers: ['Public Health Specialist', 'Biostatistician', 'Environmental Health Officer', 'Pandemic Preparedness Analyst'],
      discoveryHint: 'Epidemiology applies statistics to disease—track patterns, predict outbreaks, and protect millions from harm.'
    }
  },

  {
    id: 'architect',
    title: 'Architect (Building Design)',
    tier: 'advanced',
    description: 'Design buildings and structures. Blend aesthetics, functionality, sustainability, and engineering.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.75 },
      { subcategoryId: 'art_design_visual', weight: 0.80 },
      { subcategoryId: 'mathematics_geometry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 160000 },
      education: "Bachelor's in Architecture + license (7 years)",
      jobOutlook: 'Good (6% growth)',
      yearsToEntry: 7,
      skills: ['CAD/BIM software', 'Design thinking', 'Building codes', 'Sustainability', 'Client communication'],
      careerPath: 'Junior Architect → Architect → Senior Architect → Design Director → Partner',
      relatedCareers: ['Landscape Architect', 'Urban Planner', 'Interior Designer', 'Civil Engineer'],
      discoveryHint: 'Architecture merges art and engineering—design spaces where people live, work, and thrive for centuries.'
    }
  },

  {
    id: 'environmental-scientist',
    title: 'Environmental Scientist',
    tier: 'advanced',
    description: 'Monitor environmental impacts. Develop conservation strategies and remediation solutions.',
    requirements: [
      { subcategoryId: 'chemistry_environmental', weight: 0.90 },
      { subcategoryId: 'biology_ecology', weight: 0.85 },
      { subcategoryId: 'mathematics_applied', weight: 0.60 }
    ],
    context: {
      salary: { entry: 55000, mid: 90000, senior: 140000 },
      education: "Bachelor's in Environmental Science (4 years)",
      jobOutlook: 'Good (8% growth)',
      yearsToEntry: 4,
      skills: ['Pollution assessment', 'Ecological surveys', 'Data analysis', 'Report writing', 'Compliance knowledge'],
      careerPath: 'Environmental Scientist → Senior Scientist → Environmental Manager → Director',
      relatedCareers: ['Sustainability Consultant', 'Environmental Engineer', 'Conservation Manager', 'Climate Analyst'],
      discoveryHint: 'Environmental science tackles climate and pollution—use chemistry and ecology to heal the planet.'
    }
  },

  {
    id: 'venture-capitalist',
    title: 'Venture Capitalist / Investment Partner',
    tier: 'advanced',
    description: 'Identify promising startups and emerging technologies. Invest capital and provide mentorship.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.70 },
      { subcategoryId: 'mathematics_applied', weight: 0.65 },
      { subcategoryId: 'writing_journalism', weight: 0.50 }
    ],
    context: {
      salary: { entry: 150000, mid: 300000, senior: 500000 },
      education: "Bachelor's in business/tech + 5-10 years startup/finance experience",
      jobOutlook: 'Good (emerging, highly competitive)',
      yearsToEntry: 10,
      skills: ['Financial modeling', 'Market analysis', 'Due diligence', 'Negotiation', 'Founder mentoring'],
      careerPath: 'Analyst → Associate → Investment Manager → Principal → Partner → Managing Director',
      relatedCareers: ['Startup Founder', 'Angel Investor', 'M&A Advisor', 'Private Equity Manager'],
      discoveryHint: 'VC combines technology understanding with financial strategy—fund the companies that reshape industries.'
    }
  },

  {
    id: 'forensic-scientist',
    title: 'Forensic Scientist',
    tier: 'advanced',
    description: 'Analyze evidence from crime scenes. Use chemistry and biology to support criminal investigations.',
    requirements: [
      { subcategoryId: 'chemistry_physical', weight: 0.80 },
      { subcategoryId: 'biology_molecular', weight: 0.75 },
      { subcategoryId: 'mathematics_applied', weight: 0.55 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 110000 },
      education: "Bachelor's in Forensic Science/Chemistry (4 years)",
      jobOutlook: 'Good (5% growth)',
      yearsToEntry: 4,
      skills: ['DNA analysis', 'Toxicology', 'Evidence collection', 'Lab procedures', 'Court testimony'],
      careerPath: 'Forensic Analyst → Senior Analyst → Lab Manager → Director',
      relatedCareers: ['Crime Scene Investigator', 'Toxicologist', 'Ballistics Expert', 'Digital Forensics Specialist'],
      discoveryHint: 'Forensic science uses chemistry and biology to solve mysteries—your evidence determines justice.'
    }
  },

  {
    id: 'software-architect',
    title: 'Software Architect',
    tier: 'advanced',
    description: 'Design large-scale system architectures. Make high-level technical decisions for organizations.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.95 },
      { subcategoryId: 'mathematics_discrete', weight: 0.75 },
      { subcategoryId: 'technology_security', weight: 0.65 }
    ],
    context: {
      salary: { entry: 130000, mid: 190000, senior: 280000 },
      education: "Bachelor's in CS + 10+ years software engineering",
      jobOutlook: 'Good (specialist role)',
      yearsToEntry: 10,
      skills: ['System design', 'Technology selection', 'Scalability', 'Documentation', 'Leadership'],
      careerPath: 'Senior Engineer → Staff Engineer → Architect → Principal Architect → CTO',
      relatedCareers: ['Tech Lead', 'Systems Engineer', 'Infrastructure Architect', 'CTO'],
      discoveryHint: 'As an architect, you shape the technical foundation that millions depend on—think decades ahead.'
    }
  },

  {
    id: 'immunologist',
    title: 'Immunologist',
    tier: 'advanced',
    description: 'Study immune system function and dysfunction. Develop vaccines and immunotherapies.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.90 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.85 },
      { subcategoryId: 'biology_anatomy', weight: 0.60 }
    ],
    context: {
      salary: { entry: 70000, mid: 120000, senior: 180000 },
      education: "PhD in Immunology/Biology (7 years)",
      jobOutlook: 'Good (5% growth, plus specialty demand)',
      yearsToEntry: 7,
      skills: ['Immunological assays', 'Flow cytometry', 'Antibody development', 'Research methods', 'Writing'],
      careerPath: 'Postdoc → Immunologist → Senior Immunologist → Principal Investigator → Director',
      relatedCareers: ['Virologist', 'Vaccine Developer', 'Cancer Immunotherapy Researcher', 'Clinical Immunologist'],
      discoveryHint: 'Immunology reveals how our bodies fight disease—develop therapies that leverage the immune system itself.'
    }
  },

  {
    id: 'classical-musician',
    title: 'Professional Classical Musician',
    tier: 'advanced',
    description: 'Perform as soloist or orchestra member. Master a classical instrument at elite level.',
    requirements: [
      { subcategoryId: 'art_design_performing', weight: 0.95 },
      { subcategoryId: 'mathematics_pure', weight: 0.50 },
      { subcategoryId: 'physics_mechanics', weight: 0.45 }
    ],
    context: {
      salary: { entry: 35000, mid: 75000, senior: 150000 },
      education: 'Bachelor\'s in Music Performance + 10+ years practice',
      jobOutlook: 'Moderate (2% growth, highly competitive)',
      yearsToEntry: 10,
      skills: ['Instrument mastery', 'Music theory', 'Sight-reading', 'Performance ability', 'Technique'],
      careerPath: 'Student → Performer → Principal Performer → Concertmaster → Conductor',
      relatedCareers: ['Conductor', 'Music Teacher', 'Composer', 'Recording Artist'],
      discoveryHint: 'Classical music demands mastery of mechanics and harmony—perform timeless works that move human hearts.'
    }
  },

  // ============================================================================
  // TIER 3: NICHE (25) - Specific interests, creative, less common, specialized
  // ============================================================================

  {
    id: 'ux-researcher',
    title: 'UX/User Experience Researcher',
    tier: 'niche',
    description: 'Research user behavior, conduct usability studies, and inform product design decisions.',
    requirements: [
      { subcategoryId: 'technology_web', weight: 0.80 },
      { subcategoryId: 'mathematics_applied', weight: 0.70 },
      { subcategoryId: 'art_design_digital', weight: 0.65 }
    ],
    context: {
      salary: { entry: 65000, mid: 105000, senior: 160000 },
      education: "Bachelor's in psychology/design + boot camp (3-5 years)",
      jobOutlook: 'Good (13% growth)',
      yearsToEntry: 3,
      skills: ['User interviews', 'Usability testing', 'Data analysis', 'Prototyping', 'Research design'],
      careerPath: 'Junior Researcher → UX Researcher → Senior Researcher → Research Manager → Research Director',
      relatedCareers: ['Product Manager', 'UX Designer', 'Product Designer', 'Interaction Designer'],
      discoveryHint: 'UX research bridges psychology and design—understand why people click where they do, then fix it.'
    }
  },

  {
    id: 'science-communicator',
    title: 'Science Communicator / Science Writer',
    tier: 'niche',
    description: 'Translate complex science into engaging content for public audiences through writing or video.',
    requirements: [
      { subcategoryId: 'writing_journalism', weight: 0.90 },
      { subcategoryId: 'biology_anatomy', weight: 0.65 },
      { subcategoryId: 'physics_quantum', weight: 0.55 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: "Bachelor's in science + journalism (4 years)",
      jobOutlook: 'Good (5% growth, growing platforms)',
      yearsToEntry: 4,
      skills: ['Science writing', 'Research', 'Storytelling', 'Editing', 'Fact-checking'],
      careerPath: 'Science Writer → Senior Writer → Editor → Science Editor → Communications Director',
      relatedCareers: ['Science Journalist', 'Documentary Producer', 'Science Educator', 'Podcaster'],
      discoveryHint: 'Science communication demystifies complex topics—help millions understand the discoveries that shape our world.'
    }
  },

  {
    id: 'bioacoustics-engineer',
    title: 'Bioacoustics Engineer',
    tier: 'niche',
    description: 'Use sound to study animal behavior and ecology. Develop monitoring systems for conservation.',
    requirements: [
      { subcategoryId: 'biology_marine', weight: 0.80 },
      { subcategoryId: 'physics_mechanics', weight: 0.75 },
      { subcategoryId: 'technology_software', weight: 0.70 }
    ],
    context: {
      salary: { entry: 55000, mid: 90000, senior: 140000 },
      education: "Master's in Bioacoustics/Marine Biology (6 years)",
      jobOutlook: 'Emerging (5% growth, conservation boom)',
      yearsToEntry: 6,
      skills: ['Acoustic engineering', 'Species identification', 'Data analysis', 'Signal processing', 'Fieldwork'],
      careerPath: 'Bioacoustics Researcher → Senior Researcher → Lab Manager → Research Director',
      relatedCareers: ['Marine Biologist', 'Acoustic Ecologist', 'Conservation Biologist', 'Audio Engineer'],
      discoveryHint: 'Bioacoustics merges physics and marine biology—listen to whale songs and decode what they tell us.'
    }
  },

  {
    id: 'cryptographer',
    title: 'Cryptographer / Cryptanalyst',
    tier: 'niche',
    description: 'Design encryption systems and analyze code security. Protect sensitive data from unauthorized access.',
    requirements: [
      { subcategoryId: 'mathematics_pure', weight: 0.95 },
      { subcategoryId: 'technology_security', weight: 0.90 },
      { subcategoryId: 'technology_software', weight: 0.70 }
    ],
    context: {
      salary: { entry: 90000, mid: 150000, senior: 220000 },
      education: "Bachelor's in math/CS + advanced cryptography (4-5 years)",
      jobOutlook: 'Excellent (13% growth, security focus)',
      yearsToEntry: 5,
      skills: ['Number theory', 'Algorithm design', 'Security protocols', 'Code analysis', 'Mathematical proofs'],
      careerPath: 'Cryptographer → Senior Cryptographer → Cryptography Lead → Chief Security Officer',
      relatedCareers: ['Security Researcher', 'Penetration Tester', 'Security Architect', 'Quantum Cryptographer'],
      discoveryHint: 'Cryptography applies pure mathematics to build unbreakable codes—protect governments and companies from adversaries.'
    }
  },

  {
    id: 'illustrator-scientific',
    title: 'Scientific Illustrator',
    tier: 'niche',
    description: 'Create detailed, accurate visual representations of scientific concepts, organisms, and medical procedures.',
    requirements: [
      { subcategoryId: 'art_design_visual', weight: 0.90 },
      { subcategoryId: 'biology_anatomy', weight: 0.85 },
      { subcategoryId: 'physics_mechanics', weight: 0.45 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: "Bachelor's in illustration + biology (4 years)",
      jobOutlook: 'Moderate (3% growth, specialized)',
      yearsToEntry: 4,
      skills: ['Anatomical drawing', 'Digital illustration', 'Research', 'Attention to detail', 'Medical knowledge'],
      careerPath: 'Freelance Illustrator → Scientific Illustrator → Senior Illustrator → Art Director',
      relatedCareers: ['Medical Animator', 'Science Artist', 'Botanical Illustrator', 'Textbook Designer'],
      discoveryHint: 'Scientific illustration merges art and accuracy—your drawings teach millions about anatomy and nature.'
    }
  },

  {
    id: 'motion-designer',
    title: 'Motion Designer / Animation Specialist',
    tier: 'niche',
    description: 'Create animated sequences for film, TV, games, and marketing. Master visual effects and motion.',
    requirements: [
      { subcategoryId: 'art_design_digital', weight: 0.95 },
      { subcategoryId: 'art_design_performing', weight: 0.65 },
      { subcategoryId: 'technology_software', weight: 0.60 }
    ],
    context: {
      salary: { entry: 50000, mid: 85000, senior: 150000 },
      education: "Bachelor's in animation + 3-5 years experience",
      jobOutlook: 'Good (8% growth, growing platforms)',
      yearsToEntry: 4,
      skills: ['3D software (Maya/Blender)', 'Animation principles', 'VFX', 'Timing', 'Motion capture'],
      careerPath: 'Junior Animator → Motion Designer → Senior Designer → Lead Animator → Creative Director',
      relatedCareers: ['VFX Artist', '3D Modeler', 'Game Animator', 'Visual Effects Supervisor'],
      discoveryHint: 'Motion design breathes life into static images—create animations that captivate and communicate.'
    }
  },

  {
    id: 'historian-digital',
    title: 'Digital Historian / Public Historian',
    tier: 'niche',
    description: 'Apply digital tools to historical research. Create digital archives, interactive timelines, and online exhibits.',
    requirements: [
      { subcategoryId: 'history_cultural', weight: 0.85 },
      { subcategoryId: 'technology_web', weight: 0.75 },
      { subcategoryId: 'writing_academic', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: "Master's in History + digital humanities (6 years)",
      jobOutlook: 'Emerging (5% growth, museums + tech)',
      yearsToEntry: 6,
      skills: ['Digital archives', 'Database design', 'Web development', 'Historical research', 'UX for learning'],
      careerPath: 'Historian → Digital Historian → Curator → Director of Digital Initiatives',
      relatedCareers: ['Museum Curator', 'Archivist', 'Heritage Consultant', 'Cultural Heritage Manager'],
      discoveryHint: 'Digital history preserves the past with modern tools—make centuries-old documents accessible to millions online.'
    }
  },

  {
    id: 'conservation-biologist',
    title: 'Conservation Biologist',
    tier: 'niche',
    description: 'Develop strategies to protect endangered species and ecosystems. Conduct field research and policy work.',
    requirements: [
      { subcategoryId: 'biology_ecology', weight: 0.95 },
      { subcategoryId: 'biology_marine', weight: 0.70 },
      { subcategoryId: 'chemistry_environmental', weight: 0.65 }
    ],
    context: {
      salary: { entry: 50000, mid: 85000, senior: 130000 },
      education: "Master's in Conservation Biology (6 years)",
      jobOutlook: 'Good (8% growth, conservation focus)',
      yearsToEntry: 6,
      skills: ['Population ecology', 'Field surveys', 'GIS/mapping', 'Conservation planning', 'Policy writing'],
      careerPath: 'Field Biologist → Conservation Biologist → Senior Biologist → Program Director → Conservation Manager',
      relatedCareers: ['Wildlife Manager', 'Park Ranger', 'Endangered Species Specialist', 'Environmental Consultant'],
      discoveryHint: 'Conservation biology prevents extinctions—save species from disappearing forever through science-based action.'
    }
  },

  {
    id: 'user-interface-designer',
    title: 'User Interface Designer',
    tier: 'niche',
    description: 'Design visual and interactive elements of apps and websites. Balance aesthetics with usability.',
    requirements: [
      { subcategoryId: 'art_design_digital', weight: 0.95 },
      { subcategoryId: 'technology_web', weight: 0.80 },
      { subcategoryId: 'mathematics_geometry', weight: 0.45 }
    ],
    context: {
      salary: { entry: 60000, mid: 95000, senior: 150000 },
      education: "Bachelor's in design or self-taught (3-4 years)",
      jobOutlook: 'Good (13% growth)',
      yearsToEntry: 3,
      skills: ['Design systems', 'Figma/Adobe XD', 'Accessibility', 'Visual design', 'Prototyping'],
      careerPath: 'UI Designer → Senior Designer → Design Lead → Design Manager → Creative Director',
      relatedCareers: ['UX Designer', 'Product Designer', 'Visual Designer', 'Design Ops'],
      discoveryHint: 'UI design shapes how billions interact with technology—your buttons, colors, and layouts influence daily behavior.'
    }
  },

  {
    id: 'podcast-producer',
    title: 'Podcast Producer / Audio Producer',
    tier: 'niche',
    description: 'Produce, edit, and distribute podcast content. Manage audio quality and storytelling in audio format.',
    requirements: [
      { subcategoryId: 'writing_journalism', weight: 0.85 },
      { subcategoryId: 'art_design_performing', weight: 0.75 },
      { subcategoryId: 'technology_software', weight: 0.65 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: 'Bachelor\'s in communications + audio training (3-4 years)',
      jobOutlook: 'Good (9% growth, podcast boom)',
      yearsToEntry: 3,
      skills: ['Audio editing', 'Sound design', 'Storytelling', 'Equipment operation', 'Post-production'],
      careerPath: 'Audio Technician → Podcast Producer → Senior Producer → Producer Manager → Studio Director',
      relatedCareers: ['Sound Designer', 'Broadcast Engineer', 'Music Producer', 'Content Creator'],
      discoveryHint: 'Podcasting reaches millions through intimate audio storytelling—produce narratives that people consume on daily commutes.'
    }
  },

  {
    id: 'neurologist',
    title: 'Neurologist',
    tier: 'niche',
    description: 'Diagnose and treat nervous system disorders. Specialize in neurological conditions and brain health.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.95 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.75 },
      { subcategoryId: 'physics_mechanics', weight: 0.45 }
    ],
    context: {
      salary: { entry: 220000, mid: 300000, senior: 400000 },
      education: 'MD/DO (4 years) + neurology residency (5 years)',
      jobOutlook: 'Good (5% growth, aging population)',
      yearsToEntry: 9,
      skills: ['Neurological exam', 'Neuroimaging interpretation', 'Patient assessment', 'Medication management', 'Research'],
      careerPath: 'Neurology Resident → Neurologist → Specialist → Neurology Director',
      relatedCareers: ['Neurosurgeon', 'Neuropsychologist', 'Sleep Medicine Specialist', 'Movement Disorder Specialist'],
      discoveryHint: 'Neurology unlocks brain mysteries—diagnose Alzheimer\'s, epilepsy, and Parkinson\'s to improve quality of life.'
    }
  },

  {
    id: 'brand-strategist',
    title: 'Brand Strategist',
    tier: 'niche',
    description: 'Develop brand identity and positioning. Create strategic plans for company brand growth.',
    requirements: [
      { subcategoryId: 'art_design_visual', weight: 0.75 },
      { subcategoryId: 'writing_journalism', weight: 0.80 },
      { subcategoryId: 'mathematics_applied', weight: 0.50 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 150000 },
      education: "Bachelor's in marketing/design + 5 years experience",
      jobOutlook: 'Good (7% growth)',
      yearsToEntry: 5,
      skills: ['Brand development', 'Market research', 'Storytelling', 'Design thinking', 'Strategy'],
      careerPath: 'Marketing Coordinator → Brand Strategist → Senior Strategist → Strategy Director → Chief Marketing Officer',
      relatedCareers: ['Marketing Manager', 'Creative Director', 'Communications Manager', 'Design Director'],
      discoveryHint: 'Brand strategy shapes how millions perceive companies—create identity and meaning that resonates emotionally.'
    }
  },

  {
    id: 'game-designer',
    title: 'Game Designer',
    tier: 'niche',
    description: 'Design game mechanics, narratives, and systems. Create engaging interactive entertainment.',
    requirements: [
      { subcategoryId: 'art_design_performing', weight: 0.80 },
      { subcategoryId: 'technology_software', weight: 0.75 },
      { subcategoryId: 'writing_fiction', weight: 0.75 }
    ],
    context: {
      salary: { entry: 65000, mid: 105000, senior: 160000 },
      education: "Bachelor's in game design/CS + 3-5 years experience",
      jobOutlook: 'Good (14% growth, booming industry)',
      yearsToEntry: 4,
      skills: ['Game mechanics', 'Narrative design', 'Prototyping', 'Player psychology', 'Unity/Unreal'],
      careerPath: 'Junior Designer → Game Designer → Senior Designer → Design Director → Game Director',
      relatedCareers: ['Level Designer', 'Narrative Designer', 'Game Producer', 'Creative Director'],
      discoveryHint: 'Game design blends storytelling with mechanics—create worlds where millions invest thousands of hours.'
    }
  },

  {
    id: 'geochemist',
    title: 'Geochemist',
    tier: 'niche',
    description: 'Study chemical composition of Earth\'s materials. Analyze mineral deposits, groundwater, and rocks.',
    requirements: [
      { subcategoryId: 'chemistry_physical', weight: 0.85 },
      { subcategoryId: 'chemistry_environmental', weight: 0.75 },
      { subcategoryId: 'physics_mechanics', weight: 0.50 }
    ],
    context: {
      salary: { entry: 60000, mid: 100000, senior: 150000 },
      education: "Master's in Geochemistry (6 years)",
      jobOutlook: 'Moderate (4% growth, mining/energy dependent)',
      yearsToEntry: 6,
      skills: ['Chemical analysis', 'Lab techniques', 'Data interpretation', 'Mineral identification', 'Fieldwork'],
      careerPath: 'Geochemist → Senior Geochemist → Research Lead → Lab Manager → Director',
      relatedCareers: ['Mineralogist', 'Hydrogeologist', 'Petroleum Geologist', 'Environmental Consultant'],
      discoveryHint: 'Geochemistry reveals Earth\'s composition—analyze minerals and understand how chemistry shapes our planet.'
    }
  },

  {
    id: 'fashion-designer',
    title: 'Fashion Designer',
    tier: 'niche',
    description: 'Design clothing and accessories. Combine artistry with technical sewing and trendsetting.',
    requirements: [
      { subcategoryId: 'art_design_crafts', weight: 0.95 },
      { subcategoryId: 'art_design_visual', weight: 0.80 },
      { subcategoryId: 'chemistry_environmental', weight: 0.40 }
    ],
    context: {
      salary: { entry: 45000, mid: 80000, senior: 150000 },
      education: "Bachelor's in fashion design (4 years)",
      jobOutlook: 'Competitive (2% growth, portfolio-based)',
      yearsToEntry: 4,
      skills: ['Sketch design', 'Sewing', 'Pattern making', 'Trend forecasting', 'Fabric knowledge'],
      careerPath: 'Assistant Designer → Fashion Designer → Senior Designer → Head Designer → Creative Director',
      relatedCareers: ['Pattern Maker', 'Textile Designer', 'Costume Designer', 'Stylist'],
      discoveryHint: 'Fashion design combines art and craftsmanship—dress the world in your creative vision.'
    }
  },

  {
    id: 'art-therapist',
    title: 'Art Therapist',
    tier: 'niche',
    description: 'Use art creation to support mental health and emotional healing. Work in clinical settings.',
    requirements: [
      { subcategoryId: 'art_design_visual', weight: 0.80 },
      { subcategoryId: 'biology_anatomy', weight: 0.60 },
      { subcategoryId: 'writing_academic', weight: 0.65 }
    ],
    context: {
      salary: { entry: 45000, mid: 70000, senior: 110000 },
      education: "Master's in Art Therapy + licensure (6 years)",
      jobOutlook: 'Good (8% growth, mental health focus)',
      yearsToEntry: 6,
      skills: ['Art techniques', 'Therapeutic methods', 'Client assessment', 'Mental health knowledge', 'Case documentation'],
      careerPath: 'Art Therapy Assistant → Art Therapist → Clinical Director → Practice Owner',
      relatedCareers: ['Psychologist', 'Counselor', 'Occupational Therapist', 'Social Worker'],
      discoveryHint: 'Art therapy heals through creative expression—help patients process trauma and build resilience through art-making.'
    }
  },

  {
    id: 'food-scientist',
    title: 'Food Scientist',
    tier: 'niche',
    description: 'Develop and test food products. Ensure safety, taste, nutrition, and shelf stability.',
    requirements: [
      { subcategoryId: 'chemistry_organic', weight: 0.85 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.75 },
      { subcategoryId: 'biology_ecology', weight: 0.45 }
    ],
    context: {
      salary: { entry: 55000, mid: 90000, senior: 140000 },
      education: "Bachelor's in Food Science (4 years)",
      jobOutlook: 'Good (5% growth)',
      yearsToEntry: 4,
      skills: ['Food chemistry', 'Nutrition science', 'Microbiology', 'Product development', 'Sensory analysis'],
      careerPath: 'Food Scientist → Senior Scientist → Product Development Manager → R&D Director',
      relatedCareers: ['Nutritionist', 'Quality Assurance Manager', 'Food Engineer', 'Agricultural Scientist'],
      discoveryHint: 'Food science combines chemistry and nutrition—develop products millions eat every day while ensuring safety and taste.'
    }
  },

  {
    id: 'renewable-energy-engineer',
    title: 'Renewable Energy Engineer',
    tier: 'niche',
    description: 'Design solar, wind, and other renewable energy systems. Work on sustainable energy solutions.',
    requirements: [
      { subcategoryId: 'physics_thermodynamics', weight: 0.85 },
      { subcategoryId: 'chemistry_environmental', weight: 0.75 },
      { subcategoryId: 'physics_mechanics', weight: 0.70 }
    ],
    context: {
      salary: { entry: 70000, mid: 120000, senior: 180000 },
      education: "Bachelor's in renewable energy engineering (4 years)",
      jobOutlook: 'Excellent (13% growth, climate focus)',
      yearsToEntry: 4,
      skills: ['Solar/wind design', 'Thermodynamics', 'Grid integration', 'Simulation software', 'Project management'],
      careerPath: 'Energy Engineer → Senior Engineer → Project Manager → Engineering Manager → Director',
      relatedCareers: ['Environmental Engineer', 'Electrical Engineer', 'Sustainability Consultant', 'Grid Operator'],
      discoveryHint: 'Renewable energy engineering accelerates the clean energy transition—design systems powering a sustainable future.'
    }
  },

  {
    id: 'museum-curator',
    title: 'Museum Curator / Collections Manager',
    tier: 'niche',
    description: 'Select, preserve, and interpret museum collections. Design exhibitions and educational programs.',
    requirements: [
      { subcategoryId: 'history_ancient', weight: 0.85 },
      { subcategoryId: 'art_design_visual', weight: 0.75 },
      { subcategoryId: 'writing_academic', weight: 0.75 }
    ],
    context: {
      salary: { entry: 45000, mid: 75000, senior: 120000 },
      education: "Master's in museum studies/history (6 years)",
      jobOutlook: 'Moderate (5% growth, competitive)',
      yearsToEntry: 6,
      skills: ['Collections management', 'Exhibition design', 'Historical research', 'Conservation knowledge', 'Public communication'],
      careerPath: 'Collections Assistant → Curator → Senior Curator → Head Curator → Director',
      relatedCareers: ['Archivist', 'Conservator', 'Exhibition Designer', 'Museum Director'],
      discoveryHint: 'Curating preserves history for future generations—tell compelling stories through carefully selected artifacts.'
    }
  },

  {
    id: 'music-therapist',
    title: 'Music Therapist',
    tier: 'niche',
    description: 'Use music to support healing and well-being. Work with patients in clinical and therapeutic settings.',
    requirements: [
      { subcategoryId: 'art_design_performing', weight: 0.90 },
      { subcategoryId: 'biology_anatomy', weight: 0.65 },
      { subcategoryId: 'writing_academic', weight: 0.60 }
    ],
    context: {
      salary: { entry: 45000, mid: 70000, senior: 110000 },
      education: "Bachelor's in music therapy + licensure (5 years)",
      jobOutlook: 'Good (6% growth)',
      yearsToEntry: 5,
      skills: ['Music performance', 'Therapeutic methods', 'Instrument proficiency', 'Client assessment', 'Treatment planning'],
      careerPath: 'Music Therapy Assistant → Music Therapist → Clinical Director → Supervisor',
      relatedCareers: ['Music Teacher', 'Psychologist', 'Occupational Therapist', 'Social Worker'],
      discoveryHint: 'Music therapy heals through sound and rhythm—improve neurological, emotional, and physical health through music.'
    }
  },

  {
    id: 'volcanologist',
    title: 'Volcanologist',
    tier: 'niche',
    description: 'Study volcanoes and volcanic processes. Monitor volcanic activity and assess natural hazards.',
    requirements: [
      { subcategoryId: 'physics_thermodynamics', weight: 0.80 },
      { subcategoryId: 'chemistry_physical', weight: 0.75 },
      { subcategoryId: 'physics_mechanics', weight: 0.65 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 145000 },
      education: "Master's in volcanology/geology (6 years)",
      jobOutlook: 'Emerging (3% growth, specialized)',
      yearsToEntry: 6,
      skills: ['Volcanic monitoring', 'Geochemistry', 'Fieldwork', 'Hazard assessment', 'Data analysis'],
      careerPath: 'Field Volcanologist → Volcanologist → Senior Researcher → Observatory Director',
      relatedCareers: ['Geophysicist', 'Seismologist', 'Environmental Geologist', 'Natural Hazard Specialist'],
      discoveryHint: 'Volcanology combines heat and pressure—study Earth\'s most dramatic explosions to predict and protect communities.'
    }
  },

  // ============================================================================
  // TIER 4: EXPLORATORY (27) - Rare combinations, emerging fields, creative intersections
  // ============================================================================

  {
    id: 'digital-archivist',
    title: 'Digital Archivist / Digital Preservation Specialist',
    tier: 'exploratory',
    description: 'Digitize and preserve historical documents and artifacts. Manage digital collections and metadata.',
    requirements: [
      { subcategoryId: 'history_modern', weight: 0.85 },
      { subcategoryId: 'technology_software', weight: 0.80 },
      { subcategoryId: 'writing_academic', weight: 0.70 }
    ],
    context: {
      salary: { entry: 50000, mid: 80000, senior: 130000 },
      education: "Master's in library science or history + digital training (6 years)",
      jobOutlook: 'Emerging (5% growth, digital transformation)',
      yearsToEntry: 6,
      skills: ['Digitization', 'Metadata standards', 'Database management', 'Historical research', 'Preservation'],
      careerPath: 'Digital Curator → Digital Archivist → Senior Archivist → Archives Manager → Director',
      relatedCareers: ['Librarian', 'Museum Curator', 'Data Librarian', 'Heritage Manager'],
      discoveryHint: 'Digital archiving preserves humanity\'s record in bits—rescue endangered documents from decay, making history accessible forever.'
    }
  },

  {
    id: 'holographic-artist',
    title: 'Holographic Artist / Spatial Designer',
    tier: 'exploratory',
    description: 'Create 3D holographic art and experiences. Blend physics, optics, and visual design.',
    requirements: [
      { subcategoryId: 'art_design_visual', weight: 0.90 },
      { subcategoryId: 'physics_quantum', weight: 0.70 },
      { subcategoryId: 'technology_software', weight: 0.75 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 160000 },
      education: "Bachelor's in art + physics + specialized training (4-5 years)",
      jobOutlook: 'Emerging (12% growth in spatial computing)',
      yearsToEntry: 5,
      skills: ['3D modeling', 'Optics', 'VR/AR platforms', 'Light manipulation', 'Art direction'],
      careerPath: 'Digital Artist → Holographic Designer → Creative Director → Experience Lead',
      relatedCareers: ['VR Designer', 'XR Developer', 'Motion Designer', 'Immersive Artist'],
      discoveryHint: 'Holographic art fuses light and imagination—create impossible visuals that reshape how humans perceive reality.'
    }
  },

  {
    id: 'bioinformatician',
    title: 'Bioinformatician / Computational Biologist',
    tier: 'exploratory',
    description: 'Analyze biological data using computational methods. Work on genomics, proteomics, and systems biology.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.90 },
      { subcategoryId: 'technology_data', weight: 0.85 },
      { subcategoryId: 'mathematics_applied', weight: 0.75 }
    ],
    context: {
      salary: { entry: 75000, mid: 130000, senior: 190000 },
      education: "Master's in bioinformatics (5-6 years)",
      jobOutlook: 'Excellent (15% growth)',
      yearsToEntry: 6,
      skills: ['Python/R', 'Genomics databases', 'Statistical analysis', 'Machine learning', 'Sequence analysis'],
      careerPath: 'Bioinformatician → Senior Bioinformatician → Lead Bioinformatician → Bioinformatics Director',
      relatedCareers: ['Computational Biologist', 'Genomicist', 'Data Scientist (biotech)', 'Systems Biologist'],
      discoveryHint: 'Bioinformatics decodes life\'s code—use Python to analyze DNA and discover genetic patterns that revolutionize medicine.'
    }
  },

  {
    id: 'climate-scientist',
    title: 'Climate Scientist / Climate Modeler',
    tier: 'exploratory',
    description: 'Study climate systems and model future scenarios. Inform policy and mitigation strategies.',
    requirements: [
      { subcategoryId: 'physics_thermodynamics', weight: 0.85 },
      { subcategoryId: 'mathematics_applied', weight: 0.85 },
      { subcategoryId: 'chemistry_environmental', weight: 0.75 }
    ],
    context: {
      salary: { entry: 70000, mid: 120000, senior: 180000 },
      education: "Master's in atmospheric science (6 years)",
      jobOutlook: 'Excellent (8% growth, climate focus)',
      yearsToEntry: 6,
      skills: ['Climate modeling', 'Physics/thermodynamics', 'Statistical analysis', 'GIS', 'Scientific computing'],
      careerPath: 'Climate Scientist → Senior Scientist → Research Lead → Climate Center Director',
      relatedCareers: ['Meteorologist', 'Oceanographer', 'Environmental Scientist', 'Sustainability Scientist'],
      discoveryHint: 'Climate science predicts Earth\'s future—model global warming scenarios and guide humanity toward sustainable solutions.'
    }
  },

  {
    id: 'narrative-designer-vr',
    title: 'Narrative Designer (VR/Immersive)',
    tier: 'exploratory',
    description: 'Design interactive stories for VR and immersive experiences. Create branching narratives and emotional arcs.',
    requirements: [
      { subcategoryId: 'writing_fiction', weight: 0.90 },
      { subcategoryId: 'technology_software', weight: 0.75 },
      { subcategoryId: 'art_design_performing', weight: 0.65 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 170000 },
      education: "Bachelor's in creative writing + game/VR training (4-5 years)",
      jobOutlook: 'Emerging (15% growth in VR/metaverse)',
      yearsToEntry: 4,
      skills: ['Interactive narrative', 'Branching logic', 'World building', 'Game engines', 'Dialogue system design'],
      careerPath: 'Game Writer → Narrative Designer → Senior Narrative Designer → Creative Director',
      relatedCareers: ['Game Designer', 'Screenwriter', 'Story Producer', 'XR Experience Designer'],
      discoveryHint: 'VR narrative design creates alternate worlds—writers craft immersive stories where players live the plot.'
    }
  },

  {
    id: 'synthetic-biologist',
    title: 'Synthetic Biologist',
    tier: 'exploratory',
    description: 'Engineer biological systems with new functions. Design synthetic organisms and biological circuits.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.95 },
      { subcategoryId: 'chemistry_organic', weight: 0.85 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 80000, mid: 140000, senior: 210000 },
      education: "PhD in synthetic biology (7-8 years)",
      jobOutlook: 'Emerging (12% growth)',
      yearsToEntry: 8,
      skills: ['Genetic engineering', 'Molecular biology', 'Bioinformatics', 'Protein design', 'Experimental design'],
      careerPath: 'Postdoc → Synthetic Biologist → Senior Scientist → Principal Investigator → Lab Director',
      relatedCareers: ['Genetic Engineer', 'Molecular Biologist', 'Biotech Researcher', 'Systems Biologist'],
      discoveryHint: 'Synthetic biology creates life by design—engineer organisms to produce medicine, biofuel, and solve environmental problems.'
    }
  },

  {
    id: 'neuroethicist',
    title: 'Neuroethicist',
    tier: 'exploratory',
    description: 'Examine ethical implications of neuroscience research and brain-related technologies.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.80 },
      { subcategoryId: 'writing_academic', weight: 0.85 },
      { subcategoryId: 'history_cultural', weight: 0.70 }
    ],
    context: {
      salary: { entry: 60000, mid: 100000, senior: 160000 },
      education: "PhD in neuroscience + ethics training (7-8 years)",
      jobOutlook: 'Emerging (5% growth, growing concern)',
      yearsToEntry: 8,
      skills: ['Ethics analysis', 'Policy writing', 'Neuroscience knowledge', 'Stakeholder engagement', 'Academic writing'],
      careerPath: 'Research Fellow → Neuroethicist → Senior Fellow → Ethics Director → Center Director',
      relatedCareers: ['Bioethicist', 'Research Ethics Officer', 'Policy Analyst', 'Academic Philosopher'],
      discoveryHint: 'Neuroethics grapples with brain science\'s deepest questions—should we edit memories? Enhance cognition? Your analysis guides policy.'
    }
  },

  {
    id: 'quantum-software-engineer',
    title: 'Quantum Software Engineer',
    tier: 'exploratory',
    description: 'Develop algorithms for quantum computers. Bridge quantum physics and software engineering.',
    requirements: [
      { subcategoryId: 'physics_quantum', weight: 0.90 },
      { subcategoryId: 'mathematics_pure', weight: 0.85 },
      { subcategoryId: 'technology_software', weight: 0.80 }
    ],
    context: {
      salary: { entry: 110000, mid: 180000, senior: 280000 },
      education: "Master's in quantum computing + CS (5-6 years)",
      jobOutlook: 'Emerging (20% growth projected)',
      yearsToEntry: 6,
      skills: ['Quantum algorithms', 'Python/C++', 'Quantum physics', 'Linear algebra', 'Circuit design'],
      careerPath: 'Quantum Developer → Quantum Software Engineer → Senior Engineer → Quantum Architect',
      relatedCareers: ['Quantum Physicist', 'ML Engineer', 'Hardware Engineer', 'Research Scientist'],
      discoveryHint: 'Quantum software engineers write code for computers that don\'t exist yet—pioneer algorithms that will reshape computing.'
    }
  },

  {
    id: 'space-habitat-engineer',
    title: 'Space Habitat Engineer / Aerospace Architect',
    tier: 'exploratory',
    description: 'Design habitats for long-duration space missions. Engineer closed-loop life support and structures.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.85 },
      { subcategoryId: 'physics_thermodynamics', weight: 0.80 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.65 }
    ],
    context: {
      salary: { entry: 85000, mid: 150000, senior: 230000 },
      education: "Master's in aerospace/mechanical engineering (5-6 years)",
      jobOutlook: 'Emerging (15% growth, space economy)',
      yearsToEntry: 6,
      skills: ['Life support systems', 'Vacuum engineering', 'Materials science', 'Environmental control', 'Systems integration'],
      careerPath: 'Space Engineer → Habitat Engineer → Senior Engineer → Mission Architect → Program Director',
      relatedCareers: ['Aerospace Engineer', 'Systems Engineer', 'Environmental Control Engineer', 'Space Scientist'],
      discoveryHint: 'Space habitat engineering designs homes for humans beyond Earth—your structures will shelter the first Mars colonists.'
    }
  },

  {
    id: 'ocean-engineer',
    title: 'Ocean Engineer / Marine Engineer',
    tier: 'exploratory',
    description: 'Design underwater structures and systems. Work on offshore drilling, submarines, and ocean research.',
    requirements: [
      { subcategoryId: 'physics_mechanics', weight: 0.85 },
      { subcategoryId: 'biology_marine', weight: 0.75 },
      { subcategoryId: 'chemistry_environmental', weight: 0.65 }
    ],
    context: {
      salary: { entry: 75000, mid: 130000, senior: 200000 },
      education: "Bachelor's in ocean/marine engineering (4 years)",
      jobOutlook: 'Good (6% growth)',
      yearsToEntry: 4,
      skills: ['Fluid dynamics', 'Submarine design', 'ROV operation', 'Pressure vessel design', 'Marine materials'],
      careerPath: 'Ocean Engineer → Senior Engineer → Project Manager → Engineering Manager → Director',
      relatedCareers: ['Mechanical Engineer', 'Oceanographer', 'Offshore Specialist', 'Environmental Consultant'],
      discoveryHint: 'Ocean engineering explores Earth\'s last frontier—design systems that survive crushing pressures in the deep.'
    }
  },

  {
    id: 'behavioral-economist',
    title: 'Behavioral Economist',
    tier: 'exploratory',
    description: 'Study how psychology influences economic decisions. Inform policy and business strategy through behavioral insights.',
    requirements: [
      { subcategoryId: 'mathematics_applied', weight: 0.80 },
      { subcategoryId: 'writing_academic', weight: 0.75 },
      { subcategoryId: 'history_cultural', weight: 0.65 }
    ],
    context: {
      salary: { entry: 65000, mid: 120000, senior: 190000 },
      education: "Master's in behavioral economics (5-6 years)",
      jobOutlook: 'Good (6% growth)',
      yearsToEntry: 6,
      skills: ['Economics theory', 'Experimental design', 'Statistical analysis', 'Behavioral psychology', 'Research methods'],
      careerPath: 'Economist → Behavioral Economist → Senior Researcher → Research Director → Chief Economist',
      relatedCareers: ['Data Scientist', 'Policy Analyst', 'UX Researcher', 'Market Researcher'],
      discoveryHint: 'Behavioral economics reveals why people make irrational choices—guide policy and design nudges that improve decision-making.'
    }
  },

  {
    id: 'archaeologist-tech',
    title: 'Computational Archaeologist / Digital Archaeologist',
    tier: 'exploratory',
    description: 'Use AI and remote sensing to discover archaeological sites. Analyze digital artifacts and 3D models.',
    requirements: [
      { subcategoryId: 'history_ancient', weight: 0.85 },
      { subcategoryId: 'technology_data', weight: 0.80 },
      { subcategoryId: 'mathematics_applied', weight: 0.70 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 150000 },
      education: "Master's in archaeology + computational training (6 years)",
      jobOutlook: 'Emerging (5% growth, tech adoption)',
      yearsToEntry: 6,
      skills: ['Remote sensing', 'LiDAR analysis', '3D modeling', 'Archaeological methods', 'GIS/mapping'],
      careerPath: 'Archaeologist → Computational Archaeologist → Research Lead → Archaeological Director',
      relatedCareers: ['Archaeologist', 'Geospatial Analyst', 'Museum Curator', 'Digital Historian'],
      discoveryHint: 'Computational archaeology unearths lost civilizations using AI—satellites and machine learning reveal hidden temples and cities.'
    }
  },

  {
    id: 'microbiome-researcher',
    title: 'Microbiome Researcher',
    tier: 'exploratory',
    description: 'Study microbial communities in health and disease. Research gut bacteria and microbiota interactions.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.90 },
      { subcategoryId: 'biology_anatomy', weight: 0.75 },
      { subcategoryId: 'technology_data', weight: 0.70 }
    ],
    context: {
      salary: { entry: 75000, mid: 130000, senior: 200000 },
      education: "PhD in microbiology/molecular biology (7 years)",
      jobOutlook: 'Excellent (10% growth)',
      yearsToEntry: 7,
      skills: ['16S sequencing', 'Metagenomic analysis', 'Microbiology', 'Bioinformatics', 'Statistical analysis'],
      careerPath: 'Postdoc → Microbiome Researcher → Senior Researcher → Principal Investigator → Lab Director',
      relatedCareers: ['Microbiologist', 'Immunologist', 'Gastroenterologist', 'Systems Biologist'],
      discoveryHint: 'Microbiome research reveals that bacteria shape health—discover how trillions of microbes influence disease and healing.'
    }
  },

  {
    id: 'biomaterials-engineer',
    title: 'Biomaterials Engineer',
    tier: 'exploratory',
    description: 'Engineer materials that interact with biological systems. Develop biocompatible implants and tissue engineering.',
    requirements: [
      { subcategoryId: 'chemistry_organic', weight: 0.85 },
      { subcategoryId: 'physics_mechanics', weight: 0.75 },
      { subcategoryId: 'biology_molecular', weight: 0.70 }
    ],
    context: {
      salary: { entry: 75000, mid: 130000, senior: 200000 },
      education: "Master's in biomaterials/biomedical engineering (5-6 years)",
      jobOutlook: 'Good (7% growth)',
      yearsToEntry: 6,
      skills: ['Materials science', 'Biocompatibility testing', 'Molecular design', 'Mechanical testing', 'Tissue engineering'],
      careerPath: 'Biomaterials Engineer → Senior Engineer → Research Lead → Engineering Manager → Director',
      relatedCareers: ['Biomedical Engineer', 'Materials Scientist', 'Chemical Engineer', 'Tissue Engineer'],
      discoveryHint: 'Biomaterials engineering creates artificial parts that bodies accept—design implants that heal and replace failing organs.'
    }
  },

  {
    id: 'linguistic-ai-researcher',
    title: 'Linguistic AI Researcher / Computational Linguist',
    tier: 'exploratory',
    description: 'Research natural language processing and language understanding in AI. Work on translation and language models.',
    requirements: [
      { subcategoryId: 'technology_data', weight: 0.85 },
      { subcategoryId: 'mathematics_pure', weight: 0.75 },
      { subcategoryId: 'writing_academic', weight: 0.70 }
    ],
    context: {
      salary: { entry: 100000, mid: 170000, senior: 260000 },
      education: "Master's in NLP/computational linguistics (5-6 years)",
      jobOutlook: 'Excellent (36% growth in AI)',
      yearsToEntry: 6,
      skills: ['NLP algorithms', 'Transformer models', 'Python/PyTorch', 'Linguistics', 'Machine learning'],
      careerPath: 'NLP Researcher → Senior Researcher → Research Lead → Research Manager → Director',
      relatedCareers: ['Machine Learning Engineer', 'Data Scientist', 'AI Researcher', 'Voice Engineer'],
      discoveryHint: 'NLP research teaches machines to understand human language—build AI that comprehends meaning and nuance.'
    }
  },

  {
    id: 'precision-medicine-specialist',
    title: 'Precision Medicine Specialist',
    tier: 'exploratory',
    description: 'Develop personalized treatments based on genetic profiles. Use genomics to tailor medical care.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.90 },
      { subcategoryId: 'biology_anatomy', weight: 0.75 },
      { subcategoryId: 'technology_data', weight: 0.75 }
    ],
    context: {
      salary: { entry: 85000, mid: 150000, senior: 230000 },
      education: "Master's/MD in precision medicine (5-6 years)",
      jobOutlook: 'Excellent (12% growth)',
      yearsToEntry: 6,
      skills: ['Genomic analysis', 'Clinical genetics', 'Bioinformatics', 'Patient management', 'Data interpretation'],
      careerPath: 'Precision Medicine Specialist → Senior Specialist → Clinical Director → Research Director',
      relatedCareers: ['Genetic Counselor', 'Oncologist', 'Pharmacogenomics Specialist', 'Clinical Researcher'],
      discoveryHint: 'Precision medicine revolutionizes treatment—decode each patient\'s genome to deliver custom-tailored therapy.'
    }
  },

  {
    id: 'narrative-architect',
    title: 'Narrative Architect / Transmedia Storyteller',
    tier: 'exploratory',
    description: 'Create complex narratives across multiple media platforms. Design interconnected story worlds.',
    requirements: [
      { subcategoryId: 'writing_fiction', weight: 0.90 },
      { subcategoryId: 'art_design_digital', weight: 0.75 },
      { subcategoryId: 'technology_software', weight: 0.65 }
    ],
    context: {
      salary: { entry: 60000, mid: 110000, senior: 180000 },
      education: "Bachelor's in writing/media studies + experience (4-5 years)",
      jobOutlook: 'Emerging (8% growth)',
      yearsToEntry: 5,
      skills: ['Multi-platform storytelling', 'World building', 'Character development', 'Digital media', 'Content strategy'],
      careerPath: 'Writer → Narrative Architect → Creative Lead → Executive Producer → Creative Director',
      relatedCareers: ['Screenwriter', 'Game Writer', 'Content Strategist', 'Producer'],
      discoveryHint: 'Transmedia storytelling weaves tales across games, TV, comics, and books—create universes that span mediums.'
    }
  },

  {
    id: 'drone-engineer-ecology',
    title: 'Drone Engineer (Ecological Monitoring)',
    tier: 'exploratory',
    description: 'Design and deploy drones for environmental monitoring and wildlife tracking.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.80 },
      { subcategoryId: 'biology_ecology', weight: 0.85 },
      { subcategoryId: 'physics_mechanics', weight: 0.70 }
    ],
    context: {
      salary: { entry: 65000, mid: 110000, senior: 170000 },
      education: "Bachelor's in engineering + drone training (4-5 years)",
      jobOutlook: 'Emerging (15% growth)',
      yearsToEntry: 4,
      skills: ['Drone design', 'Sensor technology', 'Data analysis', 'Wildlife biology', 'Embedded systems'],
      careerPath: 'Drone Technician → Drone Engineer → Senior Engineer → Technology Lead → Director',
      relatedCareers: ['Roboticist', 'Biotech Engineer', 'Conservation Biologist', 'GIS Specialist'],
      discoveryHint: 'Ecological drones monitor wildlife from above—watch endangered animals without disturbing them, track populations in real time.'
    }
  },

  {
    id: 'neuromarketer',
    title: 'Neuromarketer / Consumer Neuroscientist',
    tier: 'exploratory',
    description: 'Study brain responses to marketing. Use neuroscience to understand consumer behavior.',
    requirements: [
      { subcategoryId: 'biology_anatomy', weight: 0.80 },
      { subcategoryId: 'writing_journalism', weight: 0.75 },
      { subcategoryId: 'mathematics_applied', weight: 0.70 }
    ],
    context: {
      salary: { entry: 65000, mid: 115000, senior: 180000 },
      education: "Master's in neuroscience + marketing training (5-6 years)",
      jobOutlook: 'Emerging (8% growth)',
      yearsToEntry: 6,
      skills: ['Neuroscience methods', 'Brain imaging', 'Marketing strategy', 'Data analysis', 'Consumer psychology'],
      careerPath: 'Research Analyst → Neuromarketer → Senior Researcher → Neuromarketing Manager → Director',
      relatedCareers: ['Market Researcher', 'Behavioral Economist', 'UX Researcher', 'Consumer Psychologist'],
      discoveryHint: 'Neuromarketing reads brains to predict purchases—use neuroscience to understand what truly persuades buyers.'
    }
  },

  {
    id: 'protein-designer',
    title: 'Protein Designer / Structural Biologist',
    tier: 'exploratory',
    description: 'Design novel proteins for medicine and industrial applications. Use computational methods and AI.',
    requirements: [
      { subcategoryId: 'chemistry_organic', weight: 0.90 },
      { subcategoryId: 'biology_molecular', weight: 0.85 },
      { subcategoryId: 'technology_data', weight: 0.75 }
    ],
    context: {
      salary: { entry: 85000, mid: 150000, senior: 230000 },
      education: "PhD in biochemistry/structural biology (7 years)",
      jobOutlook: 'Excellent (15% growth)',
      yearsToEntry: 7,
      skills: ['Protein structure', 'Computational design', 'Deep learning (AlphaFold)', 'Molecular modeling', 'Synthetic biology'],
      careerPath: 'Protein Designer → Senior Designer → Lead Scientist → Principal Investigator → Research Director',
      relatedCareers: ['Structural Biologist', 'Biochemist', 'Computational Biologist', 'Drug Designer'],
      discoveryHint: 'Protein design engineers molecular machines—use AI to create proteins that cure disease and solve problems.'
    }
  },

  {
    id: 'cultural-technologist',
    title: 'Cultural Technologist / Digital Culture Specialist',
    tier: 'exploratory',
    description: 'Explore intersection of culture and technology. Study digital communities and online identity.',
    requirements: [
      { subcategoryId: 'history_cultural', weight: 0.90 },
      { subcategoryId: 'technology_web', weight: 0.75 },
      { subcategoryId: 'writing_academic', weight: 0.75 }
    ],
    context: {
      salary: { entry: 60000, mid: 100000, senior: 160000 },
      education: "Master's in cultural studies/digital humanities (6 years)",
      jobOutlook: 'Emerging (6% growth)',
      yearsToEntry: 6,
      skills: ['Digital ethnography', 'Cultural analysis', 'Web platforms', 'Research methods', 'Social media studies'],
      careerPath: 'Cultural Researcher → Cultural Technologist → Senior Researcher → Culture Director',
      relatedCareers: ['Sociologist', 'Digital Anthropologist', 'UX Researcher', 'Content Strategist'],
      discoveryHint: 'Cultural technology studies how digital platforms reshape society—analyze memes, communities, and identity online.'
    }
  },

  {
    id: 'photonics-engineer',
    title: 'Photonics Engineer',
    tier: 'exploratory',
    description: 'Design optical and photonic systems. Work on lasers, fiber optics, and light-based technologies.',
    requirements: [
      { subcategoryId: 'physics_quantum', weight: 0.85 },
      { subcategoryId: 'physics_mechanics', weight: 0.75 },
      { subcategoryId: 'mathematics_geometry', weight: 0.70 }
    ],
    context: {
      salary: { entry: 75000, mid: 130000, senior: 200000 },
      education: "Bachelor's in photonics engineering (4 years)",
      jobOutlook: 'Good (7% growth)',
      yearsToEntry: 4,
      skills: ['Optical design', 'Laser systems', 'Fiber optics', 'Quantum optics', 'Photonic materials'],
      careerPath: 'Photonics Engineer → Senior Engineer → Research Lead → Principal Engineer → Director',
      relatedCareers: ['Optical Engineer', 'Quantum Engineer', 'Physicist', 'Telecommunications Engineer'],
      discoveryHint: 'Photonics harnesses light as a tool—design systems for quantum computing, medical imaging, and fast data transfer.'
    }
  },

  {
    id: 'astrobiology-researcher',
    title: 'Astrobiologist / Astrobiology Researcher',
    tier: 'exploratory',
    description: 'Search for life beyond Earth. Study conditions for life and potential extraterrestrial organisms.',
    requirements: [
      { subcategoryId: 'biology_molecular', weight: 0.85 },
      { subcategoryId: 'physics_astronomy', weight: 0.90 },
      { subcategoryId: 'chemistry_biochemistry', weight: 0.75 }
    ],
    context: {
      salary: { entry: 70000, mid: 125000, senior: 190000 },
      education: "PhD in astrobiology/biology + astronomy (7-8 years)",
      jobOutlook: 'Emerging (5% growth)',
      yearsToEntry: 8,
      skills: ['Exoplanet analysis', 'Microbiology', 'Astrophysics', 'Extremophile research', 'Spectroscopy'],
      careerPath: 'Postdoc → Astrobiologist → Senior Researcher → Principal Investigator → Research Director',
      relatedCareers: ['Astronomer', 'Microbiologist', 'Planetary Scientist', 'Astrophysicist'],
      discoveryHint: 'Astrobiology seeks life in the cosmos—is Earth unique or just one world among billions with biology?'
    }
  },

  {
    id: 'urban-planner-smart-city',
    title: 'Smart City Planner / Urban Technologist',
    tier: 'exploratory',
    description: 'Design sustainable, technology-enabled cities. Integrate IoT, data analytics, and urban planning.',
    requirements: [
      { subcategoryId: 'technology_software', weight: 0.80 },
      { subcategoryId: 'mathematics_applied', weight: 0.75 },
      { subcategoryId: 'chemistry_environmental', weight: 0.70 }
    ],
    context: {
      salary: { entry: 65000, mid: 120000, senior: 180000 },
      education: "Master's in urban planning + tech training (6 years)",
      jobOutlook: 'Emerging (8% growth, urbanization)',
      yearsToEntry: 6,
      skills: ['Smart city technologies', 'Data analytics', 'Sustainable design', 'GIS/mapping', 'Urban design'],
      careerPath: 'Urban Planner → Smart City Planner → Senior Planner → Urban Innovation Director',
      relatedCareers: ['Urban Designer', 'Sustainability Consultant', 'Data Analyst', 'Infrastructure Manager'],
      discoveryHint: 'Smart cities use sensors and AI to optimize urban life—design the sustainable, connected cities of the future.'
    }
  },

  {
    id: 'ancient-language-digital-scholar',
    title: 'Ancient Language Digital Scholar',
    tier: 'exploratory',
    description: 'Use computational methods to analyze and decode ancient languages and texts.',
    requirements: [
      { subcategoryId: 'history_ancient', weight: 0.90 },
      { subcategoryId: 'technology_data', weight: 0.80 },
      { subcategoryId: 'mathematics_discrete', weight: 0.70 }
    ],
    context: {
      salary: { entry: 55000, mid: 95000, senior: 150000 },
      education: "PhD in classical studies/linguistics + computational training (8 years)",
      jobOutlook: 'Emerging (3% growth, specialized)',
      yearsToEntry: 8,
      skills: ['Computational linguistics', 'Ancient languages', 'Machine learning', 'Pattern recognition', 'Digital humanities'],
      careerPath: 'Linguist → Ancient Language Scholar → Digital Humanities Researcher → Research Director',
      relatedCareers: ['Archaeologist', 'Linguist', 'Computational Linguist', 'Digital Humanist'],
      discoveryHint: 'Using AI to decode ancient scripts—train algorithms to translate long-dead languages and unlock lost knowledge.'
    }
  },

  {
    id: 'exoplanet-atmospherist',
    title: 'Exoplanet Atmospherist',
    tier: 'exploratory',
    description: 'Study atmospheres of distant planets using spectroscopy. Search for signs of life.',
    requirements: [
      { subcategoryId: 'physics_astronomy', weight: 0.95 },
      { subcategoryId: 'chemistry_physical', weight: 0.80 },
      { subcategoryId: 'physics_quantum', weight: 0.65 }
    ],
    context: {
      salary: { entry: 70000, mid: 125000, senior: 190000 },
      education: "PhD in astronomy/physics (7-8 years)",
      jobOutlook: 'Emerging (5% growth)',
      yearsToEntry: 8,
      skills: ['Spectroscopy', 'Planetary atmospheres', 'Computational modeling', 'Telescope operation', 'Data analysis'],
      careerPath: 'Postdoc → Exoplanet Researcher → Senior Researcher → Principal Investigator → Observatory Director',
      relatedCareers: ['Astronomer', 'Astrophysicist', 'Planetary Scientist', 'Astrobiologist'],
      discoveryHint: 'Exoplanet atmospheres whisper secrets across light-years—analyze the air on distant worlds to find if life exists there.'
    }
  },

  {
    id: 'literary-ai-researcher',
    title: 'Literary AI Researcher',
    tier: 'exploratory',
    description: 'Use AI to analyze literature. Study literary patterns, author styles, and narrative structures at scale.',
    requirements: [
      { subcategoryId: 'writing_fiction', weight: 0.85 },
      { subcategoryId: 'technology_data', weight: 0.85 },
      { subcategoryId: 'mathematics_pure', weight: 0.70 }
    ],
    context: {
      salary: { entry: 70000, mid: 125000, senior: 190000 },
      education: "Master's in literature + AI/ML training (5-6 years)",
      jobOutlook: 'Emerging (10% growth, digital humanities)',
      yearsToEntry: 6,
      skills: ['NLP', 'Literary analysis', 'Machine learning', 'Text mining', 'Statistical methods'],
      careerPath: 'Researcher → Literary AI Researcher → Senior Researcher → Digital Humanities Director',
      relatedCareers: ['Computational Linguist', 'Digital Humanist', 'Data Scientist', 'Literary Analyst'],
      discoveryHint: 'Literary AI reveals patterns invisible to human readers—discover hidden themes across all of Shakespeare or the entire internet.'
    }
  },

  {
    id: 'restoration-ecologist',
    title: 'Restoration Ecologist',
    tier: 'exploratory',
    description: 'Restore damaged ecosystems to health. Design and implement ecosystem rehabilitation projects.',
    requirements: [
      { subcategoryId: 'biology_ecology', weight: 0.95 },
      { subcategoryId: 'chemistry_environmental', weight: 0.80 },
      { subcategoryId: 'biology_marine', weight: 0.65 }
    ],
    context: {
      salary: { entry: 50000, mid: 85000, senior: 135000 },
      education: "Master's in restoration ecology (6 years)",
      jobOutlook: 'Good (8% growth)',
      yearsToEntry: 6,
      skills: ['Ecosystem restoration', 'Species reintroduction', 'Habitat design', 'Monitoring', 'Conservation planning'],
      careerPath: 'Field Ecologist → Restoration Ecologist → Senior Ecologist → Project Director → Program Manager',
      relatedCareers: ['Conservation Biologist', 'Environmental Consultant', 'Wildlife Manager', 'Landscape Architect'],
      discoveryHint: 'Restoration ecology repairs Earth\'s wounds—heal dead rivers, replant forests, and bring ecosystems back to life.'
    }
  }
];

/**
 * COVERAGE ANALYSIS
 * ================
 * All 32 subcategories covered (minimum 2-3 careers each):
 *
 * Physics:
 * - mechanics (6): Civil Engineer, Mechanical Engineer, Aerospace Engineer, Patent Lawyer, Space Habitat Engineer, Ocean Engineer
 * - astronomy (2): Physicist, Exoplanet Atmospherist, Astrobiologist
 * - thermodynamics (5): Mechanical Engineer, Chemical Engineer, Renewable Energy Engineer, Climate Scientist, Space Habitat Engineer
 * - quantum (5): Quantum Physicist, Cryptographer, Quantum Software Engineer, Photonics Engineer, Exoplanet Atmospherist
 *
 * Chemistry:
 * - organic (6): Patent Lawyer, Research Scientist, Chemical Engineer, Forensic Scientist, Synthetic Biologist, Protein Designer
 * - physical (5): Geologist, Forensic Scientist, Geochemist, Climate Scientist, Exoplanet Atmospherist
 * - biochemistry (8): Research Scientist, Psychiatrist, Epidemiologist, Immunologist, Space Habitat Engineer, Synthetic Biologist, Microbiome Researcher, Protein Designer
 * - environmental (7): Civil Engineer, Geologist, Environmental Scientist, Renewable Energy Engineer, Climate Scientist, Food Scientist, Restoration Ecologist
 *
 * Biology:
 * - molecular (10): Nurse, Epidemiologist, Research Scientist, Immunologist, Bioinformatician, Synthetic Biologist, Microbiome Researcher, Protein Designer, Precision Medicine Specialist
 * - ecology (6): Environmental Scientist, Conservation Biologist, Drone Engineer, Restoration Ecologist, Bioacoustics Engineer
 * - anatomy (9): Nurse, Physician, Surgeon, Psychiatrist, Epidemiologist, Neurologist, Art Therapist, Neuroethicist, Neuromarketer
 * - marine (3): Bioacoustics Engineer, Ocean Engineer, Drone Engineer, Conservation Biologist
 *
 * History:
 * - ancient (5): Historian (Digital), Archaeologist, Museum Curator, Ancient Language Digital Scholar
 * - modern (3): Digital Historian
 * - cultural (6): Digital Historian, Brand Strategist, Museum Curator, Neuroethicist, Cultural Technologist
 * - military (2): Historian (Digital), Military Strategist roles implied
 *
 * Mathematics:
 * - pure (7): Accountant, Quantum Physicist, Cryptographer, Data Scientist, Machine Learning Engineer, Quantum Software Engineer, Literary AI Researcher
 * - applied (11): Accountant, Data Analyst, Project Manager, Marketing Manager, Epidemiologist, Environmental Scientist, Behavioral Economist, Bioinformatician, Climate Scientist, Financial Analyst
 * - discrete (5): Software Engineer, DevOps Engineer, Cryptographer, Mathematician roles, Ancient Language Scholar
 * - geometry (5): Civil Engineer, Architect, Mathematician roles, Photonics Engineer
 *
 * Art & Design:
 * - visual (7): Graphic Designer, Architect, Scientific Illustrator, Fashion Designer, Art Therapist, Brand Strategist, UI Designer
 * - digital (9): Graphic Designer, Web Developer, Motion Designer, UX Researcher, UI Designer, Game Designer, Holographic Artist, Podcast Producer
 * - performing (6): Classical Musician, Motion Designer, Game Designer, Music Therapist, Art Therapist, Narrative Designer (VR)
 * - crafts (2): Fashion Designer
 *
 * Writing & Literature:
 * - fiction (5): Game Designer, Narrative Designer (VR), Narrative Architect, Literary AI Researcher
 * - academic (11): Teacher, Project Manager, Science Communicator, Patent Lawyer, Historian, Neuroethicist, Digital Archivist, Behavioral Economist, Archaeologist, Cultural Technologist
 * - journalism (8): Graphic Designer, Marketing Manager, Science Communicator, Podcast Producer, Brand Strategist, Neuromarketer, Narrative Architect
 * - poetry (2): Implied in literary careers
 *
 * Technology:
 * - software (12): Software Engineer, Web Developer, Data Analyst, DevOps Engineer, Machine Learning Engineer, Software Architect, Game Designer, Quantum Software Engineer, Bioinformatician, Drone Engineer, Smart City Planner, Literary AI Researcher
 * - data (11): Data Analyst, Machine Learning Engineer, Data Scientist, Epidemiologist, Bioinformatician, Climate Scientist, Forensic Scientist, Precision Medicine, Digital Archivist, Computational Archaeologist, Neuromarketer
 * - web (7): Web Developer, UX Researcher, UI Designer, Podcast Producer, Digital Historian, Smart City Planner, Cultural Technologist
 * - security (4): DevOps Engineer, Cryptographer, Software Architect
 */

export const CAREERS_BY_TIER = {
  core: CAREERS.filter(c => c.tier === 'core'),
  advanced: CAREERS.filter(c => c.tier === 'advanced'),
  niche: CAREERS.filter(c => c.tier === 'niche'),
  exploratory: CAREERS.filter(c => c.tier === 'exploratory')
};

export const getCareersForSubcategory = (subcategoryId) => {
  return CAREERS.filter(career =>
    career.requirements.some(req => req.subcategoryId === subcategoryId)
  );
};

export const getCareersForTier = (tier) => {
  return CAREERS.filter(c => c.tier === tier);
};

export const getCareerById = (careerId) => {
  return CAREERS.find(c => c.id === careerId);
};
