/**
 * PORTFOLIO DATA CONFIGURATION
 * Clean, professional text without AI clichés.
 * Easy to update at any time.
 */

const PORTFOLIO_DATA = {
  profile: {
    name: "Allen Christopher Raj D",
    title: "Aspiring AI Security Engineer & Ethical Hacker",
    location: "India",
    summary: "Third-year B.E. Computer Science (Cyber Security) student (expected 2028), with advanced Python skills and a strong focus on AI security, ethical hacking, and penetration testing. Completed a cyber security internship and built ai integrated cyber security projects; proficient in popular pentesting tools, Linux and core AI + Cyber security fundamentals. Passionate about securing AI integrated systems and emerging technologies.",
    characterImage: "Stylized Comic Portrait on Transparent Background.png"
  },

  menuItems: [
    { id: "about", label: "ABOUT" },
    { id: "education", label: "EDUCATION" },
    { id: "skills", label: "SKILLS" },
    { id: "projects", label: "PROJECTS" },
    { id: "internship", label: "INTERNSHIP" },
    { id: "contact", label: "CONTACT" }
  ],

  about: {
    title: "ABOUT ME",
    bio: "I am a dedicated Cyber Security student and developer with a strong foundation in computer systems, network protocols, and software security. I enjoy breaking down complex systems to find weaknesses, understanding security from the ground up, and engineering reliable defensive tools.",
    highlights: [
      { label: "Role", value: "AI Security & Ethical Hacker" },
      { label: "Focus", value: "Securing AI integrated systems" },
      { label: "Core Stack", value: "Python, Linux, Machine Learning,Deep Leaning, LLMs, Agentic AI,Pentesting tools" },
      { label: "Interests", value: "CTFs, Reverse Engineering, AI Security" }
    ],
    paragraphs: [
      "My primary interest lies in understanding how modern applications and networks can be secured against evolving threats. I actively participate in Capture The Flag (CTF) challenges, analyze AI deployed system's vulnerabilities, and explore defensive engineering.",
      "Alongside cybersecurity, I build functional applications across web and mobile platforms using Python, React, and Flutter, ensuring security best practices are integrated from line one."
    ]
  },

  education: {
    title: "EDUCATION",
    items: [
      {
        institution: "IFET College Of Engineering",
        degree: "B.E in Computer Science(Cyber Security)",
        period: "2024 - Present",
        location: "TamilNadu, India",
        status: "Pursuing",
        percentage: "89%",
        details: [
          "Specializing in AI Security,Machine Learning,Deep Learning, LLMs, Agentic AI,Penetration testing.",
          "Active participant in technical symposiums, hackathons, CTFs and security workshops."
        ]
      },
      {
        institution: "Stansford International Hr. Sec. School",
        degree: "Grade 12",
        period: "2024",
        location: "TamilNadu, India",
        status: "Completed",
        percentage: "94%",
        details: [
          "Core coursework: Mathematics, Physics, Chemistry, and Computer Science (C++ & Python basics).",
          "Graduated with distinction."
        ]
      }
    ]
  },

  skills: {
    title: "SKILLS",
    categories: [
      {
        title: "AI & CYBER SECURITY",
        skills: [
          { name: "Machine Learning & Deep Learning", level: 85 },
          { name: "Penetration Testing", level: 80 },
          { name: "LLM & Agentic AI", level: 78 },
          { name: "Linux System Administration", level: 90 }
        ]
      },
      {
        title: "PROGRAMMING & SCRIPTING",
        skills: [
          { name: "Python", level: 90 },
          { name: "JavaScript", level: 80 },
          { name: "Bash & Shell Scripting", level: 82 }
        ]
      },
      {
        title: "FRAMEWORKS & TOOLS",
        skills: [
          { name: "Wireshark & Nmap", level: 88 },
          { name: "Burp Suite & Metasploit", level: 80 },
          { name: "Tensorflow & Pytorch", level: 78 },
          { name: "Git & Linux CLI", level: 88 }
        ]
      }
    ]
  },

  projects: {
    title: "PROJECTS",
    missions: [
      {
        id: "secureguard-v2",
        title: "SecureGuard",
        featured: true,
        category: "Featured Project",
        description: "SecureGuard silently monitors protected files on your PC. When someone tries to open them, it alerts the owner's phone. The owner can Allow or Deny access remotely from anywhere. If denied, a secret photo of the intruder is taken and saved.",
        techStack: ["Python", "SupaBase", "Flutter"],
        highlights: [
          "Monitors any PC file without slowing it down.",
          "Sends instant alerts to the owner's phone.",
          "Owner can block or allow file access from anywhere.",
          "Takes a secret photo of the intruder if access is denied."
        ],
        github: "https://github.com/Allenacr/SecureGuard.git",
      },
      {
        id: "packet-analyzer",
        title: "ARCShield",
        featured: false,
        category: "Financial Transaction",
        description: "Real-time financial fraud detection that scores money in both directions — what an account sends, and what it receives.",
        techStack: ["Python", "FastAPI", "SupaBase", "XGBoost", "Flutter"],
        highlights: [
          "Analyzes both incoming and outgoing cash flows to spot suspicious patterns.",
          "Uses machine learning to detect unusual transactions and alert users."
        ],
        github: "https://github.com/Allenacr/ARCShield.git",
      },
    ]
  },

  internship: {
    title: "INTERNSHIP",
    items: [
      {
        company: "MindFul AI",
        role: "Cyber Security Intern",
        period: "Internship Period",
        location: "Remote",
        description: "Developed a Machine Learning Model for Spam Email Detection and Analysis using NLP.",
        responsibilities: [
          "Assisted in data preprocessing and feature engineering for NLP tasks.",
          "Trained and evaluated machine learning models using scikit-learn and LogisticRegression.",
          "Implemented a web interface using FastAPI to serve the spam detection model.",
          "Documented security testing procedures and patch recommendations."
        ],
        techUsed: ["Python", "FastAPI", "scikit-learn", "LogisticRegression", "Git", "Linux"]
      }
    ]
  },

  contact: {
    title: "CONTACT",
    message: "Feel free to reach out for collaborations, project inquiries, or security discussions.",
    details: [
      {
        label: "Email",
        value: "allenchristopherraj20@gmail.com",
        href: "mailto:allenchristopherraj20@gmail.com",
        icon: "✉"
      },
      {
        label: "LinkedIn",
        value: "www.linkedin.com/in/acr2006",
        href: "https://www.linkedin.com/in/acr2006",
        icon: "linkedin"
      },
      {
        label: "GitHub",
        value: "github.com/Allenacr",
        href: "https://github.com/Allenacr",
        icon: "github"
      }
    ]
  }
};

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}
