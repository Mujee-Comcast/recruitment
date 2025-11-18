export interface WorkExperience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  graduationYear: string;
  grade?: string;
}

export interface Award {
  title: string;
  organization: string;
  year: string;
  description: string;
}

export interface Certification {
  name: string;
  organization: string;
  issueDate: string;
  expiryDate?: string;
  credentialId?: string;
}

export interface CandidateProfile {
  id: string;
  candidateName: string;
  role: string;
  atsScore: number;
  profileSummary: string;
  overallExperience: string;
  primarySkills: string[];
  secondarySkills: string[];
  email: string;
  mobileNumber: string;
  resumeFileName?: string;
  uploadDate?: Date;
  workExperience: WorkExperience[];
  education: Education[];
  awards: Award[];
  certifications: Certification[];
}

export const CANDIDATE_PROFILES_MOCK_DATA: CandidateProfile[] = [
  {
    id: 'CAND001',
    candidateName: 'John Smith',
    role: 'Senior Frontend Developer',
    atsScore: 92,
    profileSummary: 'Experienced frontend developer with expertise in modern JavaScript frameworks and responsive design.',
    overallExperience: '6 years',
    primarySkills: ['Angular', 'React', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3'],
    secondarySkills: ['Node.js', 'Webpack', 'SASS', 'Git', 'Agile'],
    email: 'john.smith@email.com',
    mobileNumber: '+1-555-0123',
    resumeFileName: 'john_smith_resume.pdf',
    uploadDate: new Date('2025-07-25'),
    workExperience: [
      {
        company: 'TechCorp Solutions',
        position: 'Senior Frontend Developer',
        startDate: 'Jan 2022',
        endDate: 'Present',
        description: 'Lead frontend development for enterprise web applications using Angular and React. Mentored junior developers and implemented best practices for code quality.',
        technologies: ['Angular', 'React', 'TypeScript', 'SCSS', 'Angular Material']
      },
      {
        company: 'Digital Innovations Ltd',
        position: 'Frontend Developer',
        startDate: 'Jun 2020',
        endDate: 'Dec 2021',
        description: 'Developed responsive web applications and implemented modern UI/UX designs. Collaborated with design team to create pixel-perfect implementations.',
        technologies: ['React', 'JavaScript', 'CSS3', 'Bootstrap', 'Redux']
      },
      {
        company: 'StartupX',
        position: 'Junior Frontend Developer',
        startDate: 'Feb 2019',
        endDate: 'May 2020',
        description: 'Built interactive web interfaces and learned modern frontend development practices. Worked in an agile environment with rapid iteration cycles.',
        technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Git']
      }
    ],
    education: [
      {
        institution: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2018',
        grade: '3.8 GPA'
      }
    ],
    awards: [
      {
        title: 'Employee of the Year',
        organization: 'TechCorp Solutions',
        year: '2023',
        description: 'Recognized for outstanding performance and technical leadership in frontend development projects.'
      },
      {
        title: 'Best Innovation Award',
        organization: 'Digital Innovations Ltd',
        year: '2021',
        description: 'Awarded for developing a revolutionary user interface component library that improved development efficiency by 40%.'
      }
    ],
    certifications: [
      {
        name: 'Angular Certified Developer',
        organization: 'Google',
        issueDate: 'Mar 2023',
        credentialId: 'ANG-2023-001'
      },
      {
        name: 'AWS Certified Cloud Practitioner',
        organization: 'Amazon Web Services',
        issueDate: 'Jan 2022',
        expiryDate: 'Jan 2025',
        credentialId: 'AWS-CP-2022-001'
      }
    ]
  },
  {
    id: 'CAND002',
    candidateName: 'Sarah Johnson',
    role: 'Backend Developer',
    atsScore: 88,
    profileSummary: 'Skilled backend developer with strong experience in API development and database design.',
    overallExperience: '5 years',
    primarySkills: ['Python', 'Django', 'PostgreSQL', 'REST APIs', 'Docker'],
    secondarySkills: ['Redis', 'AWS', 'Linux', 'Git', 'Agile'],
    email: 'sarah.johnson@email.com',
    mobileNumber: '+1-555-0124',
    resumeFileName: 'sarah_johnson_resume.pdf',
    uploadDate: new Date('2025-07-24'),
    workExperience: [
      {
        company: 'DataFlow Systems',
        position: 'Senior Backend Developer',
        startDate: 'Mar 2021',
        endDate: 'Present',
        description: 'Designed and implemented scalable API services handling millions of requests daily. Led migration to microservices architecture.',
        technologies: ['Python', 'Django', 'PostgreSQL', 'Redis', 'Docker', 'Kubernetes']
      },
      {
        company: 'WebSolutions Inc',
        position: 'Backend Developer',
        startDate: 'Jul 2020',
        endDate: 'Feb 2021',
        description: 'Developed RESTful APIs and optimized database performance. Implemented caching strategies for improved application performance.',
        technologies: ['Python', 'Flask', 'MySQL', 'Redis', 'AWS']
      }
    ],
    education: [
      {
        institution: 'MIT',
        degree: 'Master of Science',
        field: 'Computer Science',
        graduationYear: '2020',
        grade: '3.9 GPA'
      },
      {
        institution: 'UC Berkeley',
        degree: 'Bachelor of Science',
        field: 'Software Engineering',
        graduationYear: '2018',
        grade: '3.7 GPA'
      }
    ],
    awards: [
      {
        title: 'Technical Excellence Award',
        organization: 'DataFlow Systems',
        year: '2023',
        description: 'Recognized for architecting a high-performance API gateway that reduced response times by 60%.'
      }
    ],
    certifications: [
      {
        name: 'AWS Solutions Architect Associate',
        organization: 'Amazon Web Services',
        issueDate: 'Sep 2022',
        expiryDate: 'Sep 2025',
        credentialId: 'AWS-SA-2022-002'
      },
      {
        name: 'Docker Certified Associate',
        organization: 'Docker',
        issueDate: 'May 2021',
        expiryDate: 'May 2024',
        credentialId: 'DCA-2021-001'
      }
    ]
  },
  {
    id: 'CAND003',
    candidateName: 'Mike Davis',
    role: 'Full Stack Developer',
    atsScore: 95,
    profileSummary: 'Versatile full-stack developer with experience in both frontend and backend technologies.',
    overallExperience: '5 years',
    primarySkills: ['React', 'Node.js', 'Python', 'PostgreSQL', 'TypeScript'],
    secondarySkills: ['Angular', 'Docker', 'Kubernetes', 'AWS', 'Jenkins'],
    email: 'mike.davis@email.com',
    mobileNumber: '+1-555-0125',
    resumeFileName: 'mike_davis_resume.pdf',
    uploadDate: new Date('2025-07-26'),
    workExperience: [
      {
        company: 'Innovation Labs',
        position: 'Lead Full Stack Developer',
        startDate: 'Jan 2021',
        endDate: 'Present',
        description: 'Leading a team of 5 developers in building next-generation web applications. Architected microservices-based solutions using modern JavaScript stack.',
        technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'GraphQL', 'AWS']
      },
      {
        company: 'CodeCraft Solutions',
        position: 'Full Stack Developer',
        startDate: 'Mar 2019',
        endDate: 'Dec 2020',
        description: 'Developed end-to-end web applications from conception to deployment. Collaborated with cross-functional teams to deliver high-quality software solutions.',
        technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io']
      }
    ],
    education: [
      {
        institution: 'Carnegie Mellon University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        graduationYear: '2018',
        grade: '3.9 GPA'
      }
    ],
    awards: [
      {
        title: 'Outstanding Developer Award',
        organization: 'Innovation Labs',
        year: '2024',
        description: 'Awarded for exceptional technical leadership and delivering a complex project 3 months ahead of schedule.'
      }
    ],
    certifications: [
      {
        name: 'MongoDB Certified Developer',
        organization: 'MongoDB',
        issueDate: 'Apr 2023',
        expiryDate: 'Apr 2026',
        credentialId: 'MDB-DEV-2023-001'
      }
    ],
  },
  {
    id: 'CAND004',
    candidateName: 'Emily Chen',
    role: 'DevOps Engineer',
    atsScore: 90,
    profileSummary: 'DevOps engineer with expertise in cloud infrastructure and automation.',
    overallExperience: '7 years',
    primarySkills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins', 'Terraform'],
    secondarySkills: ['Ansible', 'Prometheus', 'Grafana', 'Python', 'Bash'],
    email: 'emily.chen@email.com',
    mobileNumber: '+1-555-0126',
    resumeFileName: 'emily_chen_resume.pdf',
    uploadDate: new Date('2025-07-23'),
    workExperience: [
      {
        company: 'CloudTech Solutions',
        position: 'Senior DevOps Engineer',
        startDate: 'May 2022',
        endDate: 'Present',
        description: 'Designed and maintained cloud infrastructure for high-traffic applications. Implemented automated CI/CD pipelines reducing deployment time by 70%.',
        technologies: ['AWS', 'Kubernetes', 'Terraform', 'Jenkins', 'Docker', 'Prometheus']
      },
      {
        company: 'DevOps Central',
        position: 'DevOps Engineer',
        startDate: 'Aug 2021',
        endDate: 'Apr 2022',
        description: 'Managed containerized applications and implemented monitoring solutions. Collaborated with development teams to optimize application performance.',
        technologies: ['Docker', 'Kubernetes', 'AWS', 'GitLab CI', 'Grafana']
      }
    ],
    education: [
      {
        institution: 'Georgia Tech',
        degree: 'Bachelor of Science',
        field: 'Information Technology',
        graduationYear: '2021',
        grade: '3.8 GPA'
      }
    ],
    awards: [
      {
        title: 'Infrastructure Excellence Award',
        organization: 'CloudTech Solutions',
        year: '2023',
        description: 'Recognized for designing a fault-tolerant infrastructure that achieved 99.99% uptime.'
      }
    ],
    certifications: [
      {
        name: 'AWS Certified DevOps Engineer Professional',
        organization: 'Amazon Web Services',
        issueDate: 'Jun 2023',
        expiryDate: 'Jun 2026',
        credentialId: 'AWS-DEVOPS-2023-001'
      },
      {
        name: 'Certified Kubernetes Administrator',
        organization: 'Cloud Native Computing Foundation',
        issueDate: 'Mar 2022',
        expiryDate: 'Mar 2025',
        credentialId: 'CKA-2022-001'
      }
    ],
  },
  {
    id: 'CAND005',
    candidateName: 'Alex Rodriguez',
    role: 'UI/UX Designer',
    atsScore: 87,
    profileSummary: 'Creative UI/UX designer with a passion for user-centered design and modern interfaces.',
    overallExperience: '4 years',
    primarySkills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping', 'User Research'],
    secondarySkills: ['HTML/CSS', 'JavaScript', 'After Effects', 'Illustrator', 'Photoshop'],
    email: 'alex.rodriguez@email.com',
    mobileNumber: '+1-555-0127',
    resumeFileName: 'alex_rodriguez_resume.pdf',
    uploadDate: new Date('2025-07-27'),
    workExperience: [
      {
        company: 'Design Studio Pro',
        position: 'Senior UI/UX Designer',
        startDate: 'Apr 2021',
        endDate: 'Present',
        description: 'Lead design initiatives for mobile and web applications. Conducted user research and created design systems that improved user satisfaction by 45%.',
        technologies: ['Figma', 'Adobe XD', 'Principle', 'InVision', 'Miro']
      },
      {
        company: 'Creative Solutions',
        position: 'UI/UX Designer',
        startDate: 'Jan 2020',
        endDate: 'Mar 2021',
        description: 'Designed user interfaces for e-commerce platforms and mobile applications. Collaborated with development teams to ensure design feasibility.',
        technologies: ['Sketch', 'Figma', 'Zeplin', 'Adobe Creative Suite']
      }
    ],
    education: [
      {
        institution: 'Art Center College of Design',
        degree: 'Bachelor of Fine Arts',
        field: 'Interaction Design',
        graduationYear: '2019',
        grade: '3.7 GPA'
      }
    ],
    awards: [
      {
        title: 'Design Excellence Award',
        organization: 'Design Studio Pro',
        year: '2023',
        description: 'Awarded for creating an innovative design system that became the company standard across all products.'
      }
    ],
    certifications: [
      {
        name: 'Google UX Design Certificate',
        organization: 'Google',
        issueDate: 'Aug 2022',
        credentialId: 'GOOGLE-UX-2022-001'
      },
      {
        name: 'Adobe Certified Expert',
        organization: 'Adobe',
        issueDate: 'Nov 2021',
        credentialId: 'ACE-2021-001'
      }
    ],
  },
  {
    id: 'CAND006',
    candidateName: 'Lisa Wang',
    role: 'Data Scientist',
    atsScore: 93,
    profileSummary: 'Data scientist with strong analytical skills and machine learning expertise.',
    overallExperience: '5 years',
    primarySkills: ['Python', 'Machine Learning', 'SQL', 'Pandas', 'NumPy'],
    secondarySkills: ['R', 'TensorFlow', 'PyTorch', 'Tableau', 'Jupyter'],
    email: 'lisa.wang@email.com',
    mobileNumber: '+1-555-0128',
    resumeFileName: 'lisa_wang_resume.pdf',
    uploadDate: new Date('2025-07-22'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  },
  {
    id: 'CAND007',
    candidateName: 'David Brown',
    role: 'Mobile App Developer',
    atsScore: 85,
    profileSummary: 'Mobile app developer specializing in cross-platform development.',
    overallExperience: '3 years',
    primarySkills: ['React Native', 'Flutter', 'iOS', 'Android', 'Dart'],
    secondarySkills: ['Swift', 'Kotlin', 'Firebase', 'App Store Connect', 'Google Play'],
    email: 'david.brown@email.com',
    mobileNumber: '+1-555-0129',
    resumeFileName: 'david_brown_resume.pdf',
    uploadDate: new Date('2025-07-21'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  },
  {
    id: 'CAND008',
    candidateName: 'Anna Martinez',
    role: 'Product Manager',
    atsScore: 89,
    profileSummary: 'Strategic product manager with experience in agile methodologies and user research.',
    overallExperience: '6 years',
    primarySkills: ['Product Strategy', 'Agile', 'Stakeholder Management', 'User Research', 'Analytics'],
    secondarySkills: ['JIRA', 'Confluence', 'A/B Testing', 'Roadmapping', 'Wireframing'],
    email: 'anna.martinez@email.com',
    mobileNumber: '+1-555-0130',
    resumeFileName: 'anna_martinez_resume.pdf',
    uploadDate: new Date('2025-07-20'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  },
  {
    id: 'CAND009',
    candidateName: 'Tom Wilson',
    role: 'QA Engineer',
    atsScore: 86,
    profileSummary: 'Quality assurance engineer with expertise in test automation and manual testing.',
    overallExperience: '4 years',
    primarySkills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Test Planning', 'Bug Tracking'],
    secondarySkills: ['Cypress', 'Jest', 'Postman', 'Load Testing', 'API Testing'],
    email: 'tom.wilson@email.com',
    mobileNumber: '+1-555-0131',
    resumeFileName: 'tom_wilson_resume.pdf',
    uploadDate: new Date('2025-07-19'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  },
  {
    id: 'CAND010',
    candidateName: 'Rachel Green',
    role: 'Security Engineer',
    atsScore: 91,
    profileSummary: 'Cybersecurity engineer with focus on application security and compliance.',
    overallExperience: '5 years',
    primarySkills: ['Cybersecurity', 'Penetration Testing', 'Security Audits', 'Compliance', 'Risk Assessment'],
    secondarySkills: ['SIEM', 'Vulnerability Assessment', 'Cloud Security', 'Incident Response', 'Forensics'],
    email: 'rachel.green@email.com',
    mobileNumber: '+1-555-0132',
    resumeFileName: 'rachel_green_resume.pdf',
    uploadDate: new Date('2025-07-18'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  },
  {
    id: 'CAND011',
    candidateName: 'Chris Taylor',
    role: 'Business Analyst',
    atsScore: 84,
    profileSummary: 'Business analyst with strong analytical skills and process improvement experience.',
    overallExperience: '4 years',
    primarySkills: ['Business Analysis', 'Requirements Gathering', 'Process Mapping', 'Documentation', 'Stakeholder Management'],
    secondarySkills: ['SQL', 'Excel', 'Visio', 'Power BI', 'Project Management'],
    email: 'chris.taylor@email.com',
    mobileNumber: '+1-555-0133',
    resumeFileName: 'chris_taylor_resume.pdf',
    uploadDate: new Date('2025-07-17'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  },
  {
    id: 'CAND012',
    candidateName: 'Jennifer Lee',
    role: 'Frontend Developer',
    atsScore: 82,
    profileSummary: 'Frontend developer with experience in modern web technologies and responsive design.',
    overallExperience: '2 years',
    primarySkills: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    secondarySkills: ['Angular', 'Vue.js', 'Bootstrap', 'SASS', 'jQuery'],
    email: 'jennifer.lee@email.com',
    mobileNumber: '+1-555-0134',
    resumeFileName: 'jennifer_lee_resume.pdf',
    uploadDate: new Date('2025-07-16'),
    workExperience: [],
    education: [],
    awards: [],
    certifications: [],
  }
];
