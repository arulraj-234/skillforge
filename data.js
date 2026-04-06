// ============================================================
// SkillForge — Roadmap Data
// All domains, sections, items, and checkpoints
// Edit this file to customize your roadmap
// ============================================================

export const DOMAINS = [
  // ─────────────────────────────────────────────
  // DOMAIN 1: Core Programming (Python)
  // ─────────────────────────────────────────────
  {
    id: "python",
    title: "Core Programming (Python)",
    icon: "code",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Basics",
        items: [
          { id: "py-variables", label: "Variables & data types (int, str, float, bool)" },
          { id: "py-conditions", label: "Conditions (if / elif / else)" },
          { id: "py-loops", label: "Loops (for, while, break, continue)" },
          { id: "py-functions", label: "Functions (def, return, args, kwargs)" },
          { id: "py-collections", label: "Lists, Tuples, Sets, Dictionaries" }
        ]
      },
      {
        title: "Intermediate",
        items: [
          { id: "py-listcomp", label: "List & dict comprehensions" },
          { id: "py-lambda", label: "Lambda functions & map/filter/reduce" },
          { id: "py-modules", label: "Modules & packages (import, pip)" },
          { id: "py-venv", label: "Virtual environments (venv, virtualenv)" }
        ]
      },
      {
        title: "OOP (Object-Oriented Programming)",
        items: [
          { id: "py-classes", label: "Classes & objects" },
          { id: "py-inheritance", label: "Inheritance & super()" },
          { id: "py-encapsulation", label: "Encapsulation (public, private, protected)" },
          { id: "py-polymorphism", label: "Polymorphism & method overriding" }
        ]
      },
      {
        title: "Practical Python",
        items: [
          { id: "py-files", label: "File handling (read, write, append)" },
          { id: "py-exceptions", label: "Exception handling (try/except/finally)" },
          { id: "py-json", label: "Working with JSON (json module)" },
          { id: "py-cli", label: "Building basic CLI scripts (argparse)" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-python",
      label: "Can build small scripts and tools without help"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 2: Development (Backend + Frontend)
  // ─────────────────────────────────────────────
  {
    id: "development",
    title: "Development (Main Skill)",
    icon: "server",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Backend Basics",
        items: [
          { id: "dev-http", label: "HTTP methods (GET, POST, PUT, DELETE)" },
          { id: "dev-rest", label: "REST API concepts & design principles" },
          { id: "dev-status", label: "Status codes (200, 201, 400, 401, 404, 500)" }
        ]
      },
      {
        title: "Framework (Flask / FastAPI)",
        items: [
          { id: "dev-routing", label: "Routing & URL parameters" },
          { id: "dev-reqres", label: "Request/Response handling" },
          { id: "dev-middleware", label: "Middleware basics" }
        ]
      },
      {
        title: "Core Features",
        items: [
          { id: "dev-crud", label: "CRUD operations (Create, Read, Update, Delete)" },
          { id: "dev-auth", label: "Authentication (login/signup flow)" },
          { id: "dev-jwt", label: "JWT tokens & session management" },
          { id: "dev-hash", label: "Password hashing (bcrypt)" }
        ]
      },
      {
        title: "Database Integration",
        items: [
          { id: "dev-dbconnect", label: "Connect backend to database" },
          { id: "dev-orm", label: "ORM usage (SQLAlchemy or similar)" }
        ]
      },
      {
        title: "Advanced Backend",
        items: [
          { id: "dev-pagination", label: "Pagination" },
          { id: "dev-uploads", label: "File uploads & storage" },
          { id: "dev-validation", label: "API request validation" },
          { id: "dev-envvars", label: "Environment variables (.env files)" }
        ]
      },
      {
        title: "Git & GitHub",
        items: [
          { id: "dev-gitbasics", label: "Git basics (init, add, commit, push, pull)" },
          { id: "dev-branching", label: "Branching & merging" },
          { id: "dev-github", label: "GitHub (repos, PRs, issues)" },
          { id: "dev-gitflow", label: "Git workflow for projects" }
        ]
      },
      {
        title: "Testing Basics",
        items: [
          { id: "dev-unittests", label: "Writing unit tests (pytest)" },
          { id: "dev-apitests", label: "Testing APIs (Postman / automated)" },
          { id: "dev-tdd", label: "Basic TDD workflow" }
        ]
      },
      {
        title: "Basic Frontend (just enough)",
        items: [
          { id: "dev-html", label: "HTML basics (tags, forms, semantic HTML)" },
          { id: "dev-css", label: "CSS basics (layout, flexbox, grid)" },
          { id: "dev-js", label: "JavaScript basics (DOM, fetch API, events)" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-development",
      label: "Built 3-4 full backend projects, at least one deployed"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 3: Data (Your Edge)
  // ─────────────────────────────────────────────
  {
    id: "data",
    title: "Data (Your Edge)",
    icon: "database",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "SQL (Very Important)",
        items: [
          { id: "data-select", label: "SELECT, WHERE, ORDER BY" },
          { id: "data-joins", label: "JOINs (INNER, LEFT, RIGHT, FULL)" },
          { id: "data-group", label: "GROUP BY, HAVING, aggregate functions" },
          { id: "data-indexes", label: "Index basics & query optimization" }
        ]
      },
      {
        title: "Data Handling",
        items: [
          { id: "data-pandas", label: "Pandas basics (DataFrame, Series)" },
          { id: "data-cleaning", label: "Data cleaning (missing values, duplicates)" },
          { id: "data-csv", label: "Reading CSV/Excel files" }
        ]
      },
      {
        title: "Data Visualization",
        items: [
          { id: "data-matplotlib", label: "Matplotlib / Seaborn basics" },
          { id: "data-graphs", label: "Creating bar, line, pie charts" }
        ]
      },
      {
        title: "Thinking Skills",
        items: [
          { id: "data-analysis", label: "Basic data analysis mindset" },
          { id: "data-patterns", label: "Finding patterns & drawing insights" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-data",
      label: "Can analyze a dataset and explain insights"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 4: DSA (Interview Weapon)
  // ─────────────────────────────────────────────
  {
    id: "dsa",
    title: "DSA (Interview Weapon)",
    icon: "brain",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Basics",
        items: [
          { id: "dsa-arrays", label: "Arrays & array manipulation" },
          { id: "dsa-strings", label: "String operations & patterns" },
          { id: "dsa-hashing", label: "Hashing (HashMaps, frequency counting)" }
        ]
      },
      {
        title: "Intermediate",
        items: [
          { id: "dsa-recursion", label: "Recursion & backtracking basics" },
          { id: "dsa-sorting", label: "Sorting algorithms (merge, quick, heap)" },
          { id: "dsa-searching", label: "Searching algorithms" },
          { id: "dsa-twopointers", label: "Two pointers technique" },
          { id: "dsa-sliding", label: "Sliding window technique" }
        ]
      },
      {
        title: "Slightly Advanced",
        items: [
          { id: "dsa-stack", label: "Stack & Queue implementations" },
          { id: "dsa-linkedlist", label: "Linked List basics (singly, doubly)" },
          { id: "dsa-binarysearch", label: "Binary search & its variations" }
        ]
      },
      {
        title: "Practice",
        items: [
          { id: "dsa-150", label: "Solved 150+ problems on LeetCode/GFG" },
          { id: "dsa-easymed", label: "Can solve easy-medium problems within time" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-dsa",
      label: "Comfortable in coding interview rounds"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 5: Cloud (Multiplier)
  // ─────────────────────────────────────────────
  {
    id: "cloud",
    title: "Cloud (AWS)",
    icon: "cloud",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Basics of AWS",
        items: [
          { id: "cloud-what", label: "What is cloud computing & why it matters" },
          { id: "cloud-regions", label: "Regions, availability zones, edge locations" }
        ]
      },
      {
        title: "Core Services",
        items: [
          { id: "cloud-ec2", label: "EC2 (launch & manage a server)" },
          { id: "cloud-s3", label: "S3 (object storage & static hosting)" }
        ]
      },
      {
        title: "Deployment",
        items: [
          { id: "cloud-deploy", label: "Deploy a backend project to the cloud" },
          { id: "cloud-domain", label: "Connect a custom domain (optional)" }
        ]
      },
      {
        title: "Extras",
        items: [
          { id: "cloud-cicd", label: "Basic CI/CD pipeline concept" },
          { id: "cloud-envconfig", label: "Environment configs & secrets management" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-cloud",
      label: "At least 1 live, publicly accessible project"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 6: Projects
  // ─────────────────────────────────────────────
  {
    id: "projects",
    title: "Project Portfolio",
    icon: "folder",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Minimum Projects",
        items: [
          { id: "proj-backend1", label: "Backend Project 1: REST API with auth (e.g., blog, notes app)" },
          { id: "proj-backend2", label: "Backend Project 2: Full CRUD app (e.g., task manager, inventory)" },
          { id: "proj-backend3", label: "Backend Project 3: Advanced features (e.g., file uploads, roles)" },
          { id: "proj-data", label: "Data Project: Analyze a real dataset & present insights" },
          { id: "proj-deployed", label: "At least 1 project deployed live" }
        ]
      },
      {
        title: "Quality Standards",
        items: [
          { id: "proj-cleancode", label: "Clean, well-structured code with comments" },
          { id: "proj-readme", label: "Professional README on GitHub for each project" },
          { id: "proj-screenshots", label: "Screenshots or demo video for each project" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-projects",
      label: "Portfolio is impressive enough to show in interviews"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 7: Resume & Job Prep
  // ─────────────────────────────────────────────
  {
    id: "resume",
    title: "Resume & Job Prep",
    icon: "file-text",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Resume",
        items: [
          { id: "res-onepage", label: "1-page clean, ATS-friendly resume" },
          { id: "res-projects", label: "Projects properly described with impact" },
          { id: "res-skills", label: "Skills section aligned with actual projects" }
        ]
      },
      {
        title: "Interview Prep",
        items: [
          { id: "res-dsarevision", label: "DSA revision (top 50 patterns)" },
          { id: "res-cs", label: "Basic CS fundamentals (DBMS, OS, CN)" },
          { id: "res-explain", label: "Can explain every project confidently" }
        ]
      },
      {
        title: "Applications",
        items: [
          { id: "res-internships", label: "Applied to internships (10+ applications)" },
          { id: "res-offcampus", label: "Off-campus applications sent" },
          { id: "res-referrals", label: "Reached out for referrals" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-resume",
      label: "Resume polished, applications flowing, interviews scheduled"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 8: Final Checklist — Job Ready
  // ─────────────────────────────────────────────
  {
    id: "final",
    title: "Final: Am I Job Ready?",
    icon: "award",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    sections: [
      {
        title: "Honest Self-Assessment",
        items: [
          { id: "final-backend", label: "I can build a backend app from scratch" },
          { id: "final-projects", label: "I have 3-4 solid, presentable projects" },
          { id: "final-sql", label: "I understand SQL well enough for interviews" },
          { id: "final-dsa", label: "I can solve medium DSA problems consistently" },
          { id: "final-deployed", label: "I have at least 1 deployed, live app" },
          { id: "final-explain", label: "I can explain my code and decisions confidently" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-final",
      label: "You are ready for jobs in the 6-12 LPA range"
    }
  },

  // ─────────────────────────────────────────────
  // DOMAIN 9: Future Expansion (Locked until 80%)
  // ─────────────────────────────────────────────
  {
    id: "future",
    title: "Future Expansion",
    icon: "rocket",
    color: "var(--text-primary)",
    colorLight: "var(--bg-secondary)",
    colorDark: "var(--bg-secondary)",
    gradient: "var(--accent-soft)",
    locked: true,
    lockThreshold: 0.8, // 80% overall completion needed
    sections: [
      {
        title: "Path 1: Data Science / AI",
        items: [
          { id: "fut-ml", label: "Machine Learning fundamentals" },
          { id: "fut-dl", label: "Deep Learning basics" },
          { id: "fut-deploy-ml", label: "Model deployment (Flask/FastAPI + pickle/ONNX)" }
        ]
      },
      {
        title: "Path 2: Advanced Backend",
        items: [
          { id: "fut-sysdesign", label: "System Design basics" },
          { id: "fut-microservices", label: "Microservices architecture" },
          { id: "fut-scaling", label: "Scaling systems (caching, load balancing)" }
        ]
      },
      {
        title: "Path 3: Cloud Specialization",
        items: [
          { id: "fut-advaws", label: "Advanced AWS services (Lambda, RDS, SQS)" },
          { id: "fut-devops", label: "DevOps practices (Docker, Kubernetes basics)" }
        ]
      }
    ],
    checkpoint: {
      id: "cp-future",
      label: "You have a clear specialization path"
    }
  }
];

// ─────────────────────────────────────────────
// Motivational Quotes (no emojis)
// ─────────────────────────────────────────────
export const QUOTES = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke" },
  { text: "Consistency is what transforms average into excellence.", author: "Unknown" },
  { text: "You don't have to be great to start, but you have to start to be great.", author: "Zig Ziglar" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "Programming isn't about what you know; it's about what you can figure out.", author: "Chris Pine" },
  { text: "Every expert was once a beginner. Every pro was once an amateur.", author: "Unknown" },
  { text: "Stay hungry, stay foolish.", author: "Steve Jobs" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },
  { text: "The only limit to our realization of tomorrow is our doubts of today.", author: "Franklin D. Roosevelt" },
  { text: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn" },
  { text: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma" },
  { text: "What you do today can improve all your tomorrows.", author: "Ralph Marston" }
];

// ─────────────────────────────────────────────
// Achievements
// ─────────────────────────────────────────────
export const ACHIEVEMENTS = [
  { id: "ach-first", title: "First Step", desc: "Check off your first item", icon: "zap", condition: (state) => state.checkedItems.size >= 1 },
  { id: "ach-ten", title: "Getting Warmed Up", desc: "Complete 10 items", icon: "flame", condition: (state) => state.checkedItems.size >= 10 },
  { id: "ach-twentyfive", title: "Quarter Century", desc: "Complete 25 items", icon: "star", condition: (state) => state.checkedItems.size >= 25 },
  { id: "ach-fifty", title: "Halfway Hero", desc: "Complete 50 items", icon: "shield", condition: (state) => state.checkedItems.size >= 50 },
  { id: "ach-python", title: "Pythonista", desc: "Complete the Python domain", icon: "code", condition: (state) => isDomainComplete(state, "python") },
  { id: "ach-dev", title: "Developer Mode", desc: "Complete the Development domain", icon: "server", condition: (state) => isDomainComplete(state, "development") },
  { id: "ach-data", title: "Data Whisperer", desc: "Complete the Data domain", icon: "database", condition: (state) => isDomainComplete(state, "data") },
  { id: "ach-dsa", title: "Algorithm Ace", desc: "Complete the DSA domain", icon: "brain", condition: (state) => isDomainComplete(state, "dsa") },
  { id: "ach-cloud", title: "Cloud Pioneer", desc: "Complete the Cloud domain", icon: "cloud", condition: (state) => isDomainComplete(state, "cloud") },
  { id: "ach-streak3", title: "On Fire", desc: "Maintain a 3-day streak", icon: "flame", condition: (state) => state.streak.count >= 3 },
  { id: "ach-streak7", title: "Unstoppable", desc: "Maintain a 7-day streak", icon: "trending-up", condition: (state) => state.streak.count >= 7 },
  { id: "ach-streak30", title: "Legendary", desc: "Maintain a 30-day streak", icon: "crown", condition: (state) => state.streak.count >= 30 },
  { id: "ach-level5", title: "Rising Star", desc: "Reach Level 5", icon: "sunrise", condition: (state) => state.level >= 5 },
  { id: "ach-level10", title: "Veteran", desc: "Reach Level 10", icon: "medal", condition: (state) => state.level >= 10 },
  { id: "ach-studyhour", title: "Deep Focus", desc: "Study for 1 hour total", icon: "clock", condition: (state) => state.timer.totalMinutes >= 60 },
  { id: "ach-study10h", title: "Dedicated", desc: "Study for 10 hours total", icon: "book-open", condition: (state) => state.timer.totalMinutes >= 600 },
];

// Helper used by achievements
function isDomainComplete(state, domainId) {
  const domain = DOMAINS.find(d => d.id === domainId);
  if (!domain) return false;
  const allItems = domain.sections.flatMap(s => s.items.map(i => i.id));
  return allItems.every(id => state.checkedItems.has(id));
}

// ─────────────────────────────────────────────
// Level thresholds
// ─────────────────────────────────────────────
export const LEVEL_THRESHOLDS = [
  0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200,
  4000, 5000, 6200, 7600, 9200, 11000, 13000, 15500, 18500, 22000
];

export function getLevelForXP(xp) {
  let level = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) {
      level = i + 1;
    } else {
      break;
    }
  }
  return level;
}

export function getXPForNextLevel(level) {
  if (level < LEVEL_THRESHOLDS.length) {
    return LEVEL_THRESHOLDS[level];
  }
  return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] + (level - LEVEL_THRESHOLDS.length + 1) * 3000;
}

// ─────────────────────────────────────────────
// SVG Icons (inline, no emojis)
// ─────────────────────────────────────────────
const ICONS = {
  code: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
  server: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>`,
  database: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>`,
  brain: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z"/></svg>`,
  cloud: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg>`,
  folder: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>`,
  "file-text": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>`,
  award: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  rocket: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
  trophy: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`,
  zap: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
  flame: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>`,
  star: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  shield: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
  "trending-up": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>`,
  crown: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m2 4 3 12h14l3-12-6 7-4-7-4 7-6-7z"/><path d="M3 20h18"/></svg>`,
  target: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  sunrise: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/></svg>`,
  medal: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7.21 15 2.66 7.14a2 2 0 0 1 .13-2.2L4.4 2.8A2 2 0 0 1 6 2h12a2 2 0 0 1 1.6.8l1.6 2.14a2 2 0 0 1 .14 2.2L16.79 15"/><path d="M11 12 5.12 2.2"/><path d="m13 12 5.88-9.8"/><path d="M8 7h8"/><circle cx="12" cy="17" r="5"/><path d="M12 18v-2h-.5"/></svg>`,
  clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  "book-open": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
  check: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  "chevron-down": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  "chevron-right": `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  lock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  sun: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`,
  moon: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`,
  calendar: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  download: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  "refresh-cw": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>`,
  "bar-chart": `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>`,
  crosshair: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="22" y1="12" x2="18" y2="12"/><line x1="6" y1="12" x2="2" y2="12"/><line x1="12" y1="6" x2="12" y2="2"/><line x1="12" y1="22" x2="12" y2="18"/></svg>`,
};

export function getIcon(name, size) {
  const svg = ICONS[name] || ICONS.star;
  if (size) {
    return svg.replace(/width="\d+"/, `width="${size}"`).replace(/height="\d+"/, `height="${size}"`);
  }
  return svg;
}
