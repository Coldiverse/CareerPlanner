export const CERTIFICATIONS = [
  {
    id: 'biotech-l1',
    name: 'Biotechnology, Level 1 Certificate',
    overview:
      'Explores using living cells and biological processes to develop products and understand biological systems. Covers laboratory techniques, quality assurance, bioethics, and includes an industry internship. Ideal entry point for pharmaceutical or research laboratory careers.',
    creditHours: 17,
    link: 'https://www.collin.edu/academics/programs/biotechnology-cert1-biotechnology.html',
    semesters: [
      {
        label: 'Semester 1',
        courses: [
          { code: 'BIOL 1414', name: 'Introduction to Biotechnology I', isCapstone: false },
          { code: 'BIOL 1415', name: 'Introduction to Biotechnology II', isCapstone: false },
          { code: 'BITC 1250', name: 'Special Studies and Bioethical Issues of Biotechnology', isCapstone: false },
          { code: 'BITC 1340', name: 'Quality Assurance for the Biosciences', isCapstone: false },
        ],
      },
      {
        label: 'Semester 2',
        courses: [
          { code: 'BITC 2486', name: 'Internship - Biology Technician/Biotechnology Laboratory Technician', isCapstone: true },
        ],
      },
    ],
    footnotes: [{ number: 1, text: 'May substitute BITC 2431 or BITC 2441' }],
  },
  {
    id: 'hp-cna-l1',
    name: 'Health Professions - Certified Nurse Aide (CNA) Track, Level 1 Certificate',
    overview:
      'Trains students in direct patient care under the supervision of licensed nurses. Covers fundamental nursing aide skills, pathophysiology, patient communication, and end-of-life care. Prepares graduates for immediate employment in hospitals, nursing homes, and home health settings.',
    creditHours: 19,
    link: 'https://www.collin.edu/academics/programs/health-professions-cert1-certifiednurseaidecnatrack.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'HITT 1305', name: 'Medical Terminology I', isCapstone: false },
          { code: 'HPRS 1201', name: 'Introduction to Health Professions', isCapstone: false },
          { code: 'HPRS 2301', name: 'Pathophysiology', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'HPRS 1303', name: 'End of Life Issues', isCapstone: false },
          { code: 'HPRS 2310', name: 'Basic Health Profession Skills II', isCapstone: false },
          { code: 'NURA 1160', name: 'Clinical - Nursing Aide and Patient Care Assistant', isCapstone: true },
          { code: 'NURA 1401', name: 'Nurse Aide for Health Care', isCapstone: false },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'hp-ekg-l1',
    name: 'Health Professions - Electrocardiograph Technician (EKG) Track, Level 1 Certificate',
    overview:
      'Focuses on recording and interpreting cardiac electrical activity to assist physicians in diagnosing heart conditions. Covers EKG technique, cardiovascular concepts, and clinical practice. Graduates work in cardiac care units, emergency departments, and diagnostic clinics.',
    creditHours: 20,
    link: 'https://www.collin.edu/academics/programs/health-professions-cert1-electrocardiographtechnicianekgtrack.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'HITT 1305', name: 'Medical Terminology I', isCapstone: false },
          { code: 'HPRS 1201', name: 'Introduction to Health Professions', isCapstone: false },
          { code: 'HPRS 2301', name: 'Pathophysiology', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'DSAE 1340', name: 'Diagnostic Electrocardiography', isCapstone: false },
          { code: 'DSAE 2303', name: 'Cardiovascular Concepts', isCapstone: false },
          { code: 'HPRS 2310', name: 'Basic Health Profession Skills II', isCapstone: true },
          { code: 'HPRS 2321', name: 'Medical Law and Ethics for Health Professionals', isCapstone: false },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'hp-pct-l1',
    name: 'Health Professions - Patient Care Technician (PCT) Track, Level 1 Certificate',
    overview:
      'Combines nursing aide, phlebotomy, and EKG skills into one versatile multi-skilled clinical role. Graduates are highly valued for their ability to draw blood, monitor cardiac rhythms, assist with patient care, and perform multiple clinical functions in fast-paced hospital environments.',
    creditHours: 29,
    link: 'https://www.collin.edu/academics/programs/health-professions-cert1-patientcaretechnicianpcttrack.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'HITT 1305', name: 'Medical Terminology I', isCapstone: false },
          { code: 'HPRS 1201', name: 'Introduction to Health Professions', isCapstone: false },
          { code: 'HPRS 2301', name: 'Pathophysiology', isCapstone: false },
          { code: 'NURA 1160', name: 'Clinical - Nursing Aide and Patient Care Assistant', isCapstone: false },
          { code: 'NURA 1401', name: 'Nurse Aide for Health Care', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'DSAE 1340', name: 'Diagnostic Electrocardiography', isCapstone: false },
          { code: 'HPRS 1303', name: 'End of Life Issues', isCapstone: false },
          { code: 'PLAB 1323', name: 'Phlebotomy', isCapstone: false },
        ],
      },
      {
        label: 'Third Semester',
        courses: [
          { code: 'HPRS 2310', name: 'Basic Health Profession Skills II', isCapstone: false },
          { code: 'NUPC 1160', name: 'Clinical - Nursing Aide and Patient Care Assistant', isCapstone: true },
          { code: 'NUPC 1320', name: 'Patient Care Technician/Assistant', isCapstone: false },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'hp-phleb-l1',
    name: 'Health Professions - Phlebotomy Technician (PHLEB) Track, Level 1 Certificate',
    overview:
      'Trains students in safe blood collection, specimen handling, and processing for laboratory analysis. Covers venipuncture techniques, laboratory science fundamentals, and clinical practice. Graduates work in hospitals, diagnostic labs, blood banks, and outpatient clinics.',
    creditHours: 17,
    link: 'https://www.collin.edu/academics/programs/health-professions-cert1-phlebotomytechnicianphlebtrack.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'HITT 1305', name: 'Medical Terminology I', isCapstone: false },
          { code: 'HPRS 1201', name: 'Introduction to Health Professions', isCapstone: false },
          { code: 'HPRS 2301', name: 'Pathophysiology', isCapstone: false },
          { code: 'MLAB 1101', name: 'Introduction to Clinical Laboratory Science', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'HPRS 2310', name: 'Basic Health Profession Skills II', isCapstone: false },
          { code: 'PLAB 1260', name: 'Clinical - Phlebotomy', isCapstone: true },
          { code: 'PLAB 1323', name: 'Phlebotomy', isCapstone: false },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'medical-assisting-l1',
    name: 'Medical Assisting (MA), Level 1 Certificate',
    overview:
      'Prepares students for both front-office and back-office roles in physician offices and clinics. Covers anatomy and physiology, clinical procedures, pharmacology, medical laboratory skills, administrative tasks, and medical law. One of the most comprehensive entry-level healthcare careers.',
    creditHours: 31,
    link: 'https://www.collin.edu/academics/programs/medical-assisting-advanced-practice-cert1-medicalassistingma.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'HPRS 2301', name: 'Pathophysiology', isCapstone: false },
          { code: 'MDCA 1210', name: 'Medical Assistant Interpersonal and Communication Skills', isCapstone: false },
          { code: 'MDCA 1309', name: 'Anatomy and Physiology for Medical Assistants', isCapstone: false },
          { code: 'MDCA 1417', name: 'Procedures in a Clinical Setting', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'HPRS 2321', name: 'Medical Law and Ethics for Health Professionals', isCapstone: false },
          { code: 'MDCA 1321', name: 'Administrative Procedures', isCapstone: false },
          { code: 'MDCA 1448', name: 'Pharmacology & Administration of Medications', isCapstone: false },
          { code: 'MDCA 1452', name: 'Medical Assistant Laboratory Procedures', isCapstone: false },
        ],
      },
      {
        label: 'Third Semester',
        courses: [
          { code: 'MDCA 1254', name: 'Medical Assisting Credentialing Exam Review', isCapstone: false },
          { code: 'MDCA 1360', name: 'Clinical - Medical/Clinical Assistant', isCapstone: true },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'vocational-nursing-l2',
    name: 'Vocational Nursing, Level 2 Certificate',
    overview:
      'Comprehensive program leading to Licensed Vocational Nurse (LVN) licensure eligibility. Covers foundational nursing theory, mental health, maternal-neonatal nursing, advanced nursing skills, pharmacology, and extensive clinical rotations across three semesters with NCLEX-PN exam preparation.',
    creditHours: 45,
    link: 'https://www.collin.edu/academics/programs/nursing-cert2-vocationalnursing.html',
    semesters: [
      {
        label: 'Pre-Program Requirement',
        courses: [
          { code: 'BIOL 2404', name: 'Human Anatomy and Physiology Basic', isCapstone: false },
        ],
      },
      {
        label: 'First Semester',
        courses: [
          { code: 'VNSG 1261', name: 'Clinical I - Licensed Practical/Vocational Nurse Training', isCapstone: false },
          { code: 'VNSG 1304', name: 'Foundations of Nursing', isCapstone: false },
          { code: 'VNSG 1500', name: 'Nursing in Health and Illness I', isCapstone: false },
          { code: 'VNSG 1502', name: 'Applied Nursing Skills I', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'VNSG 1238', name: 'Mental Illness', isCapstone: false },
          { code: 'VNSG 1360', name: 'Clinical II - Licensed Practical/Vocational Nurse Training', isCapstone: false },
          { code: 'VNSG 1509', name: 'Nursing in Health and Illness II', isCapstone: false },
          { code: 'VNSG 2413', name: 'Applied Nursing Skills II', isCapstone: false },
        ],
      },
      {
        label: 'Third Semester',
        courses: [
          { code: 'VNSG 1205', name: 'NCLEX-PN Review', isCapstone: false },
          { code: 'VNSG 1230', name: 'Maternal-Neonatal Nursing', isCapstone: false },
          { code: 'VNSG 2363', name: 'Clinical III - Licensed Practical/Vocational Nurse Training', isCapstone: true },
          { code: 'VNSG 2510', name: 'Nursing in Health and Illness III', isCapstone: false },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'pharmacy-tech-l1',
    name: 'Pharmacy Technician, Level 1 Certificate',
    overview:
      'Prepares students to assist pharmacists in dispensing medications in retail, hospital, and institutional pharmacy settings. Covers drug classification, pharmaceutical mathematics, community and institutional pharmacy practice, and clinical rotations to prepare for state board certification exams.',
    creditHours: 16,
    link: 'https://www.collin.edu/academics/programs/pharmacy-technician-cert1-pharmacytechnician.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'PHRA 1201', name: 'Introduction to Pharmacy', isCapstone: false },
          { code: 'PHRA 1305', name: 'Drug Classification', isCapstone: false },
          { code: 'PHRA 1313', name: 'Community Pharmacy Practice', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'PHRA 1143', name: 'Pharmacy Technician Certification Review', isCapstone: false },
          { code: 'PHRA 1209', name: 'Pharmaceutical Mathematics I', isCapstone: false },
          { code: 'PHRA 1260', name: 'Clinical - Pharmacy Technician/Assistant', isCapstone: true },
          { code: 'PHRA 1349', name: 'Institutional Pharmacy Practice', isCapstone: false },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'polysomnography-l1',
    name: 'Polysomnographic Technology, Level 1 Certificate',
    overview:
      'Trains students to conduct sleep studies and monitor patients for sleep disorders such as sleep apnea. Covers neuroanatomy, sleep scoring and staging, infant and pediatric polysomnography, and clinical practicums with preparation for national board certification.',
    creditHours: 28,
    link: 'https://www.collin.edu/academics/programs/polysomnographic-technology-cert1-polysomnographictechnology.html',
    semesters: [
      {
        label: 'First Semester (Fall)',
        courses: [
          { code: 'PSGT 1260', name: 'Certificate Clinical I - Polysomnography', isCapstone: false },
          { code: 'PSGT 1310', name: 'Neuroanatomy and Physiology', isCapstone: false },
          { code: 'PSGT 1400', name: 'Polysomnography I', isCapstone: false },
          { code: 'RSPT 1240', name: 'Advanced Cardiopulmonary Anatomy and Physiology', isCapstone: false },
          { code: 'RSPT 1237', name: 'Basic Dysrhythmia Interpretation', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester (Spring)',
        courses: [
          { code: 'PSGT 1340', name: 'Sleep Disorders', isCapstone: false },
          { code: 'PSGT 2205', name: 'Sleep Scoring and Staging', isCapstone: false },
          { code: 'PSGT 2250', name: 'Infant and Pediatric Polysomnography', isCapstone: false },
          { code: 'PSGT 2260', name: 'Certificate Clinical II - Polysomnography', isCapstone: false },
          { code: 'PSGT 2411', name: 'Polysomnography II', isCapstone: false },
        ],
      },
      {
        label: 'Third Semester (Summer)',
        courses: [
          { code: 'PSGT 2272', name: 'Polysomnography Exam Preparation', isCapstone: true },
        ],
      },
    ],
    footnotes: [],
  },
  {
    id: 'central-sterile-l1',
    name: 'Central Sterile Processing, Level 1 Certificate',
    overview:
      'Focuses on the decontamination, sterilization, and distribution of surgical instruments and medical supplies in hospital settings. Covers infection control protocols, sterile processing techniques, and clinical practice—a critical behind-the-scenes healthcare role that directly impacts patient safety.',
    creditHours: 16,
    link: 'https://www.collin.edu/academics/programs/surgical-professions-cert1-centralsterileprocessing.html',
    semesters: [
      {
        label: 'First Semester',
        courses: [
          { code: 'HPRS 1470', name: 'Central Sterile Processing I', isCapstone: false },
          { code: 'HPRS 1370', name: 'Central Sterile Processing II', isCapstone: false },
          { code: 'HPRS 1471', name: 'Central Sterile Processing III', isCapstone: false },
        ],
      },
      {
        label: 'Second Semester',
        courses: [
          { code: 'HPRS 1561', name: 'Clinical - Health Services/Allied Health/Health Sciences, General', isCapstone: true },
        ],
      },
    ],
    footnotes: [],
  },
];

// Derive ALL_COURSES from CERTIFICATIONS
const courseMap = new Map();
for (const cert of CERTIFICATIONS) {
  for (const semester of cert.semesters) {
    for (const course of semester.courses) {
      if (!courseMap.has(course.code)) {
        courseMap.set(course.code, {
          code: course.code,
          name: course.name,
          usedBy: [],
        });
      }
      courseMap.get(course.code).usedBy.push({
        certId: cert.id,
        certName: cert.name,
        certLink: cert.link,
        semester: semester.label,
        isCapstone: course.isCapstone,
      });
    }
  }
}

export const ALL_COURSES = Array.from(courseMap.values()).sort((a, b) => a.code.localeCompare(b.code));

export function getCoursesByDepartment() {
  const groups = {};
  for (const course of ALL_COURSES) {
    const dept = course.code.split(' ')[0];
    if (!groups[dept]) {
      groups[dept] = [];
    }
    groups[dept].push(course);
  }
  return groups;
}
