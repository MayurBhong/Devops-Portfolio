export const siteConfig = {
  name: "Nexops",
  fullName: "Mayur Bhong",
  role: "AWS & DevOps Engineer",
  tagline: "Fresh graduate, hands-on with cloud infrastructure that ships itself.",
  location: "Pune, India",
  email: "mayurbhong.mb@gmail.com",
  github: "https://github.com/MayurBhong",
  linkedin: "https://www.linkedin.com/in/mayur-bhong-446a472a6",
  youtube: "https://www.youtube.com/@artgallery-mb",
  typingWords: [
    "Aspiring DevOps Engineer",
    "AWS Cloud Enthusiast",
    "Kubernetes Learner",
    "Infrastructure Automation",
    "CI/CD Pipeline Builder",
  ],
};

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export type SkillCategory = {
  category: string;
  icon: string;
  skills: { name: string; level: number }[];
};

export const skillCategories: SkillCategory[] = [
  {
    category: "Cloud (AWS)",
    icon: "Cloud",
    skills: [
      { name: "EC2 / VPC / ELB", level: 95 },
      { name: "Lambda / API Gateway", level: 90 },
      { name: "S3 / CloudFront / Route 53", level: 85 },
      { name: "IAM / Security Hub", level: 80 },
      { name: "RDS / DynamoDB", level: 92 },
    ],
  },
  {
    category: "Containers & Orchestration",
    icon: "Box",
    skills: [
      { name: "Docker", level: 95 },
      { name: "Kubernetes", level: 85 },
      { name: "Helm", level: 80 },
    ],
  },
  {
    category: "Infrastructure as Code",
    icon: "FileCode2",
    skills: [
      { name: "Terraform", level: 93 },
      { name: "CloudFormation", level: 85 },
      { name: "Ansible", level: 90 },
    ],
  },
  {
    category: "CI/CD & Automation",
    icon: "GitBranch",
    skills: [
      { name: "GitHub Actions", level: 95 },
      { name: "Jenkins", level: 90 },
      { name: "Git", level: 92 },
    ],
  },
  {
    category: "Monitoring & Observability",
    icon: "Activity",
    skills: [
      { name: "Prometheus ", level: 90 },
      { name: "CloudWatch", level: 88 },
      { name: "Grafana", level: 80 },
    ],
  },
  {
    category: "Linux & Scripting",
    icon: "Terminal",
    skills: [
      { name: "Linux Administration", level: 80 },
      { name: "Bash Scripting", level: 75 },
      { name: "Python", level: 70 },
      { name: "Networking (TCP/IP, DNS)", level: 70 },
    ],
  },
];

export type Project = {
  title: string;
  description: string;
  image: string;
  tech: string[];
  github: string;
  demo: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Cloud Native Delivery Platform",
    description:
      "Cloud Native Delivery Platform is an end-to-end DevOps solution that automates the build, containerization, and deployment of Java applications on AWS EKS.",
    image: "/projects/Cloud Native Delivery Platform.png",
    tech: ["Kubernetes", "Docker", "Maven", "Jenkins", "GitHub", "AWS EKS", "EKS", "AWS IAM", "AWS VPC", "Docker Hub"],
    github: "https://github.com/MayurBhong/Cloud-Native-Delivery-Platform",
    demo: "https://github.com/MayurBhong/Cloud-Native-Delivery-Platform",
  },
  {
    title: "S3 File Upload Notification System",
    description:
      "The S3 File Upload Notification System is an event driven AWS solution that automatically sends email notifications when files are uploaded to an Amazon S3 bucket.",
    image: "/projects/S3 File Upload Notification System.png",
    tech: ["AWS S3", "AWS Lambda", "AWS SNS", "AWS CloudWatch", "AWS IAM"],
    github: "https://github.com/MayurBhong/S3-File-Upload-Notification-System",
    demo: "https://github.com/MayurBhong/S3-File-Upload-Notification-System",
  },
  {
    title: "Terraform Realtime Messaging System",
    description:
      "Built a serverless real time messaging system that enables bidirectional communication and real time message broadcasting between connected clients.",
    image: "/projects/Terraform Realtime Messaging System.png",
    tech: ["Terraform", "AWS Lambda", "AWS DynamoDB", "AWS CloudWatch", "AWS API Gateway WebSocket"],
    github: "https://github.com/MayurBhong/Terraform-Realtime-Messaging-System",
    demo: "https://github.com/MayurBhong/Terraform-Realtime-Messaging-System",
  },
  {
    title: "Static Website Hosting on Amazon S3",
    description:
      "Hosted a static website on Amazon S3 using AWS Static Website Hosting with a fully serverless, scalable, and cost efficient architecture. Designed a modern AWS and DevOps themed website suitable for portfolios, landing pages, and documentation sites.",
    image: "/projects/Static Website.jpg",
    tech: ["AWS S3", "AWS IAM", "Static Website"],
    github: "https://github.com/MayurBhong/Static-Website-S3",
    demo: "https://github.com/MayurBhong/Static-Website-S3",
  },
  {
    title: "Cost Optimized Cloud Architecture",
    description:
      "Designed a cost optimized cloud architecture using Free Tier eligible services to demonstrate scalable and highly available infrastructure. Focused on implementing real world cloud design principles while optimizing resource utilization and cost efficiency.",
    image: "/projects/Cost Optimized Cloud Architecture.png",
    tech: ["AWS EC2", "AWS VPC", "AWS ALB", "Auto Scaling", "AWS AMI"],
    github: "https://github.com/MayurBhong/Cost-Optimized-AWS-Architecture",
    demo: "https://github.com/MayurBhong/Cost-Optimized-AWS-Architecture",
  },
];

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "AWS DevOps Engineer",
    company: "Greateway Software Pvt. Ltd.",
    period: "Mar 2026 - Present",
    location: "Pune, India",
    points: [
      "Assisted in migrating 5 microservices from EC2 to a shared EKS cluster under mentor guidance.",
      "Wrote Terraform modules for dev-environment provisioning, cutting manual setup time by 60%.",
      "Built a GitHub Actions pipeline for a team project, automating test and deploy on every merge.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Yuvaan Technologies",
    period: "Jul 2025 - Dec 2025",
    location: "Pune, India",
    points: [
      "Developed a Python based application to automate repetitive workflows, reducing manual effort and improving process efficiency.",
      "Implemented data processing and validation logic to handle large datasets accurately and optimize execution time.",
      "Enhanced overall system performance by optimizing code, improving reliability, and streamlining application workflows.",
    ],
  },
  {
    role: "Application Development using Java",
    company: "Sasken Technologies Limited",
    period: "Jun 2025 - Jul 2025",
    location: "Remote",
    points: [
      "Worked on BlogCraft, an internal blogging platform that enables employees to create, edit, and publish blog posts.",
      "Contributed to the Collaboration Module by implementing features such as comments, likes, and feedback to improve user engagement.",
      "Developed co-authoring and post editing functionality, enabling multiple users to collaborate and manage content efficiently.",   
    ],
  },
];

export type Certification = {

  name: string;
  issuer: string;
  date: string;
  credentialUrl: string;
  logo: string;
};

export const certifications: Certification[] = [
  {
    name: "AWS Educate Introduction to Cloud",
    issuer: "Amazon Web Services",
    date: "2026",
    credentialUrl: "https://www.credly.com/badges/ef06024e-79e0-401f-8884-bb4101e3c571/public_url",
    logo: "/certs/aws-sap.svg",
  },
  {
    name: "AWS Educate Getting Started with Storage",
    issuer: "Amazon Web Services",
    date: "2026",
    credentialUrl: "https://www.credly.com/badges/92d75a3f-71af-453b-a6f4-42794f37890e/public_url",
    logo: "/certs/aws-devops.svg",
  },
  {
    name: "IBM Cloud Essentials",
    issuer: "Cognitive Class",
    date: "2026",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/062b1ebc7e6a4fc8a727b5e88d614af7",
    logo: "/certs/ckad.svg",
  },
  {
    name: "AWS Solutions Architecture",
    issuer: "Forage",
    date: "2026",
    credentialUrl: "https://www.theforage.com/completion-certificates/pmnMSL4QiQ9JCgE3W/kkE9HyeNcw6rwCRGw_pmnMSL4QiQ9JCgE3W_WWaK4krYuk5bj2Y6C_1770577280896_completion_certificate.pdf",
    logo: "/certs/terraform.svg",
  },
  {
    name: "Apply End-to-End Security to a Cloud Application",
    issuer: "Cognitive Class",
    date: "2026",
    credentialUrl: "https://courses.cognitiveclass.ai/certificates/a48fa699813741adadc9d23d5b5c0bb1",
    logo: "/certs/cka.svg",
  },
];

export type Education = {
  degree: string;
  institution: string;
  period: string;
  location: string;
  cgpa?: number;
  percentage?: number;
};

export const education: Education[] = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "G H Raisoni College of Engineering & Management, Pune",
    period: "2022 - 2026",
    location: "Pune",
    cgpa: 8.81,
  },
  {
    degree: "HSC",
    institution: "Disha Public School & Junior College, Wai",
    period: "2021 - 2022",
    location: "Satara",
    percentage: 79.17,
  },
  {
    degree: "SSC",
    institution: "Bharat High School & Junior College, Jeur",
    period: "2019 — 2020",
    location: "Solapur",
    percentage:  87.80,
  },
];

export const socialLinks = [
  { label: "GitHub", href: siteConfig.github, icon: "Github" },
  { label: "LinkedIn", href: siteConfig.linkedin, icon: "Linkedin" },
  { label: "YouTube", href: siteConfig.youtube, icon: "Youtube" },
  { label: "Email", href: `mailto:${siteConfig.email}`, icon: "Mail" },
];
