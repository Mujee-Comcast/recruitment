export interface Vacancy {
  jobId: string;
  jobTitle: string;
  jobDescription: string;
  jobLevel: string;
  experience: string;
  openPositions: number;
  recruiter: string;
  primarySkills: string[];
  secondarySkills: string[];
}

export const VACANCY_MOCK_DATA: Vacancy[] = [
  {
    jobId: 'JOB001',
    jobTitle: 'Senior Frontend Developer',
    jobDescription: 'Develop and maintain user-facing web applications using modern frameworks',
    jobLevel: 'Senior',
    experience: '5-7 years',
    openPositions: 3,
    recruiter: 'John Smith',
    primarySkills: ['Angular', 'TypeScript', 'HTML/CSS', 'JavaScript'],
    secondarySkills: ['React', 'Vue.js', 'SCSS', 'Webpack']
  },
  {
    jobId: 'JOB002',
    jobTitle: 'Backend Developer',
    jobDescription: 'Design and implement server-side applications and APIs',
    jobLevel: 'Mid-Level',
    experience: '3-5 years',
    openPositions: 2,
    recruiter: 'Sarah Johnson',
    primarySkills: ['Node.js', 'Express', 'MongoDB', 'REST APIs'],
    secondarySkills: ['GraphQL', 'Docker', 'AWS', 'Redis']
  },
  {
    jobId: 'JOB003',
    jobTitle: 'Full Stack Developer',
    jobDescription: 'Work on both frontend and backend development of web applications',
    jobLevel: 'Senior',
    experience: '4-6 years',
    openPositions: 1,
    recruiter: 'Mike Davis',
    primarySkills: ['React', 'Node.js', 'PostgreSQL', 'TypeScript'],
    secondarySkills: ['Angular', 'Python', 'Docker', 'Kubernetes']
  },
  {
    jobId: 'JOB004',
    jobTitle: 'DevOps Engineer',
    jobDescription: 'Manage CI/CD pipelines and cloud infrastructure',
    jobLevel: 'Senior',
    experience: '5-8 years',
    openPositions: 2,
    recruiter: 'Emily Chen',
    primarySkills: ['AWS', 'Docker', 'Kubernetes', 'Jenkins'],
    secondarySkills: ['Terraform', 'Ansible', 'Prometheus', 'Grafana']
  },
  {
    jobId: 'JOB005',
    jobTitle: 'UI/UX Designer',
    jobDescription: 'Create intuitive and engaging user interfaces and experiences',
    jobLevel: 'Mid-Level',
    experience: '3-5 years',
    openPositions: 1,
    recruiter: 'Lisa Wang',
    primarySkills: ['Figma', 'Adobe XD', 'Sketch', 'Prototyping'],
    secondarySkills: ['HTML/CSS', 'JavaScript', 'After Effects', 'Illustrator']
  },
  {
    jobId: 'JOB006',
    jobTitle: 'Junior Frontend Developer',
    jobDescription: 'Learn and contribute to frontend development projects',
    jobLevel: 'Junior',
    experience: '1-2 years',
    openPositions: 4,
    recruiter: 'David Brown',
    primarySkills: ['HTML', 'CSS', 'JavaScript', 'Git'],
    secondarySkills: ['React', 'Angular', 'Bootstrap', 'jQuery']
  },
  {
    jobId: 'JOB007',
    jobTitle: 'Data Scientist',
    jobDescription: 'Analyze large datasets and build predictive models',
    jobLevel: 'Senior',
    experience: '4-7 years',
    openPositions: 2,
    recruiter: 'Anna Rodriguez',
    primarySkills: ['Python', 'Machine Learning', 'SQL', 'Pandas'],
    secondarySkills: ['R', 'TensorFlow', 'PyTorch', 'Tableau']
  },
  {
    jobId: 'JOB008',
    jobTitle: 'Mobile App Developer',
    jobDescription: 'Develop native and cross-platform mobile applications',
    jobLevel: 'Mid-Level',
    experience: '3-5 years',
    openPositions: 3,
    recruiter: 'Tom Wilson',
    primarySkills: ['React Native', 'Flutter', 'iOS', 'Android'],
    secondarySkills: ['Swift', 'Kotlin', 'Firebase', 'Push Notifications']
  },
  {
    jobId: 'JOB009',
    jobTitle: 'Product Manager',
    jobDescription: 'Lead product strategy and coordinate development teams',
    jobLevel: 'Senior',
    experience: '5-8 years',
    openPositions: 1,
    recruiter: 'Rachel Green',
    primarySkills: ['Product Strategy', 'Agile', 'Stakeholder Management', 'Analytics'],
    secondarySkills: ['JIRA', 'Confluence', 'User Research', 'A/B Testing']
  },
  {
    jobId: 'JOB010',
    jobTitle: 'QA Engineer',
    jobDescription: 'Ensure software quality through comprehensive testing',
    jobLevel: 'Mid-Level',
    experience: '2-4 years',
    openPositions: 2,
    recruiter: 'Mark Thompson',
    primarySkills: ['Manual Testing', 'Automation Testing', 'Selenium', 'Test Planning'],
    secondarySkills: ['Cypress', 'Jest', 'Postman', 'Load Testing']
  },
  {
    jobId: 'JOB011',
    jobTitle: 'Security Engineer',
    jobDescription: 'Implement and maintain security measures for applications and infrastructure',
    jobLevel: 'Senior',
    experience: '5-7 years',
    openPositions: 1,
    recruiter: 'Jennifer Lee',
    primarySkills: ['Cybersecurity', 'Penetration Testing', 'Security Audits', 'Compliance'],
    secondarySkills: ['SIEM', 'Vulnerability Assessment', 'Cloud Security', 'Risk Management']
  },
  {
    jobId: 'JOB012',
    jobTitle: 'Business Analyst',
    jobDescription: 'Analyze business requirements and translate them into technical specifications',
    jobLevel: 'Mid-Level',
    experience: '3-5 years',
    openPositions: 2,
    recruiter: 'Chris Martinez',
    primarySkills: ['Business Analysis', 'Requirements Gathering', 'Process Mapping', 'Documentation'],
    secondarySkills: ['SQL', 'Excel', 'Visio', 'Power BI']
  }
];
