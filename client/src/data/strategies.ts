import type { IncomeStrategy } from "@shared/schema";

//todo: remove mock functionality - replace with real data
export const mockStrategies: IncomeStrategy[] = [
  {
    id: "1",
    title: "Software Engineering (FAANG)",
    description: "Land a high-paying software engineering role at top tech companies like Google, Amazon, Apple, Facebook, or Netflix.",
    category: "High-Paying Jobs",
    potentialIncome: 180000,
    timeToStart: "3-6 months",
    difficulty: "Advanced",
    initialCapital: 2000,
    requiredSkills: ["JavaScript", "Python", "System Design", "Algorithms", "Data Structures"],
    steps: [
      "Master coding interview patterns and data structures",
      "Build impressive portfolio projects using modern tech stacks",
      "Practice system design and behavioral interviews",
      "Apply to FAANG companies and startups",
      "Negotiate offer and salary package"
    ]
  },
  {
    id: "2", 
    title: "Freelance Digital Marketing Agency",
    description: "Start a digital marketing agency serving small to medium businesses with SEO, PPC, and social media services.",
    category: "Business Ventures",
    potentialIncome: 120000,
    timeToStart: "2-3 months",
    difficulty: "Intermediate",
    initialCapital: 5000,
    requiredSkills: ["Digital Marketing", "SEO", "Google Ads", "Social Media", "Sales"],
    steps: [
      "Learn digital marketing fundamentals and get certified",
      "Create portfolio with case studies from test campaigns",
      "Build professional website and service offerings",
      "Network and find first 3-5 clients",
      "Scale by hiring specialists and automating processes"
    ]
  },
  {
    id: "3",
    title: "High-Ticket Sales Representative",
    description: "Join a company selling high-value products or services with substantial commission structures.",
    category: "High-Paying Jobs",
    potentialIncome: 150000,
    timeToStart: "1-2 months", 
    difficulty: "Intermediate",
    initialCapital: 1000,
    requiredSkills: ["Sales", "Communication", "CRM Software", "Negotiation", "Relationship Building"],
    steps: [
      "Research high-ticket sales opportunities in tech, real estate, or B2B",
      "Develop sales skills through courses and practice",
      "Apply to companies with strong commission structures",
      "Master the product knowledge and sales process",
      "Build relationships and exceed quotas consistently"
    ]
  },
  {
    id: "4",
    title: "Real Estate Investment (Rental Properties)",
    description: "Build a portfolio of rental properties to generate passive income through real estate appreciation and cash flow.",
    category: "Investment",
    potentialIncome: 100000,
    timeToStart: "3-6 months",
    difficulty: "Intermediate", 
    initialCapital: 50000,
    requiredSkills: ["Real Estate Analysis", "Property Management", "Finance", "Negotiation", "Market Research"],
    steps: [
      "Research local real estate markets and identify opportunities",
      "Secure financing and get pre-approved for investment loans",
      "Find and analyze potential rental properties",
      "Purchase first property and find reliable tenants",
      "Scale by reinvesting profits into additional properties"
    ]
  },
  {
    id: "5",
    title: "E-commerce Store (Dropshipping)",
    description: "Create an e-commerce business using dropshipping to sell trending products without inventory management.",
    category: "Business Ventures", 
    potentialIncome: 100000,
    timeToStart: "1-2 months",
    difficulty: "Beginner",
    initialCapital: 3000,
    requiredSkills: ["E-commerce", "Digital Marketing", "Product Research", "Customer Service", "Basic Web Design"],
    steps: [
      "Research profitable product niches and suppliers",
      "Set up Shopify store with professional design",
      "Create compelling product listings and content",
      "Launch Facebook and Google ad campaigns",
      "Optimize conversion rates and scale successful products"
    ]
  },
  {
    id: "6",
    title: "Freelance Web Development",
    description: "Offer web development services to businesses, startups, and entrepreneurs needing custom websites and applications.",
    category: "Freelancing",
    potentialIncome: 120000,
    timeToStart: "2-4 months",
    difficulty: "Intermediate",
    initialCapital: 1500,
    requiredSkills: ["HTML/CSS", "JavaScript", "React", "Node.js", "Database Design"],
    steps: [
      "Build portfolio of impressive web projects",
      "Set up profiles on Upwork, Freelancer, and other platforms",
      "Network with local businesses and startups",
      "Price services competitively and deliver quality work",
      "Build recurring client relationships and referral network"
    ]
  },
  {
    id: "7",
    title: "Stock Market Day Trading",
    description: "Generate income through active day trading of stocks, options, and other financial instruments.",
    category: "Investment",
    potentialIncome: 150000,
    timeToStart: "6-12 months",
    difficulty: "Advanced",
    initialCapital: 25000,
    requiredSkills: ["Technical Analysis", "Risk Management", "Market Psychology", "Trading Platforms", "Financial Analysis"],
    steps: [
      "Learn technical analysis and trading strategies",
      "Practice with paper trading for several months",
      "Start with small position sizes and strict risk management",
      "Develop consistent profitable trading system",
      "Scale up capital allocation as skills improve"
    ]
  },
  {
    id: "8",
    title: "YouTube Content Creator",
    description: "Build a successful YouTube channel in a profitable niche with ad revenue, sponsorships, and product sales.",
    category: "Digital Products",
    potentialIncome: 100000,
    timeToStart: "6-12 months",
    difficulty: "Intermediate",
    initialCapital: 3000,
    requiredSkills: ["Video Production", "Content Creation", "SEO", "Social Media", "Audience Building"],
    steps: [
      "Choose profitable niche and research competitor channels",
      "Invest in quality recording equipment and editing software",
      "Create consistent, high-value content schedule",
      "Optimize videos for YouTube algorithm and SEO",
      "Monetize through ads, sponsorships, and product sales"
    ]
  },
  {
    id: "9",
    title: "Medical Device Sales",
    description: "Work in medical device sales representing cutting-edge healthcare technology to hospitals and clinics.",
    category: "High-Paying Jobs",
    potentialIncome: 140000,
    timeToStart: "2-3 months",
    difficulty: "Intermediate",
    initialCapital: 2000,
    requiredSkills: ["Sales", "Medical Knowledge", "Relationship Building", "Presentation", "Technical Communication"],
    steps: [
      "Research medical device companies and job openings",
      "Develop understanding of healthcare industry and regulations",
      "Build relationships with healthcare professionals",
      "Complete product training and certification programs",
      "Exceed sales targets and build territory"
    ]
  },
  {
    id: "10",
    title: "Online Course Creation",
    description: "Create and sell online courses teaching your expertise to students worldwide through platforms like Udemy, Teachable.",
    category: "Digital Products",
    potentialIncome: 100000,
    timeToStart: "3-6 months",
    difficulty: "Intermediate",
    initialCapital: 2000,
    requiredSkills: ["Subject Matter Expertise", "Course Design", "Video Production", "Marketing", "Teaching"],
    steps: [
      "Identify your expertise area with market demand",
      "Plan comprehensive course curriculum and learning outcomes",
      "Record high-quality video lessons and materials",
      "Launch on multiple platforms and gather student feedback",
      "Market through content marketing and social media"
    ]
  },
  {
    id: "11",
    title: "Cryptocurrency Trading",
    description: "Trade cryptocurrencies and DeFi tokens to capitalize on market volatility and emerging opportunities.",
    category: "Investment",
    potentialIncome: 120000,
    timeToStart: "3-6 months",
    difficulty: "Advanced",
    initialCapital: 15000,
    requiredSkills: ["Cryptocurrency Knowledge", "Technical Analysis", "Risk Management", "DeFi Protocols", "Market Research"],
    steps: [
      "Learn blockchain technology and cryptocurrency fundamentals",
      "Study market cycles and technical analysis patterns",
      "Start with small positions and develop trading strategy",
      "Research promising projects and new opportunities",
      "Manage risk carefully and take profits systematically"
    ]
  },
  {
    id: "12",
    title: "Amazon FBA Business",
    description: "Sell private label products on Amazon using their fulfillment network for scalable e-commerce income.",
    category: "Business Ventures",
    potentialIncome: 150000,
    timeToStart: "3-6 months",
    difficulty: "Intermediate",
    initialCapital: 10000,
    requiredSkills: ["Product Research", "Amazon SEO", "Supply Chain", "Brand Building", "PPC Advertising"],
    steps: [
      "Research profitable product opportunities using tools like Helium 10",
      "Source products from manufacturers and create private label brand",
      "Optimize Amazon listings with professional photos and copy",
      "Launch PPC campaigns to drive initial sales and reviews",
      "Scale successful products and expand product line"
    ]
  },
  {
    id: "13",
    title: "Freelance Copywriting",
    description: "Write high-converting sales copy for businesses, including emails, ads, landing pages, and marketing materials.",
    category: "Freelancing",
    potentialIncome: 100000,
    timeToStart: "2-4 months",
    difficulty: "Intermediate",
    initialCapital: 1000,
    requiredSkills: ["Copywriting", "Marketing Psychology", "Research", "Writing", "Client Communication"],
    steps: [
      "Study copywriting fundamentals and successful campaigns",
      "Create portfolio of sample copy in different industries",
      "Join freelance platforms and pitch to businesses",
      "Deliver results that increase client revenue",
      "Build reputation and charge premium rates"
    ]
  },
  {
    id: "14",
    title: "Real Estate Wholesaling",
    description: "Find distressed properties, get them under contract, and assign contracts to investors for quick profits.",
    category: "Business Ventures",
    potentialIncome: 120000,
    timeToStart: "2-3 months",
    difficulty: "Intermediate",
    initialCapital: 5000,
    requiredSkills: ["Real Estate", "Negotiation", "Marketing", "Networking", "Contract Analysis"],
    steps: [
      "Learn local real estate laws and wholesaling regulations",
      "Build network of cash buyers and real estate investors",
      "Find motivated sellers through direct mail and cold calling",
      "Analyze deals and negotiate favorable contract terms",
      "Assign contracts to buyers for assignment fees"
    ]
  },
  {
    id: "15",
    title: "SaaS Application Development",
    description: "Build and launch a Software-as-a-Service application solving specific business problems with recurring revenue.",
    category: "Business Ventures",
    potentialIncome: 200000,
    timeToStart: "6-12 months",
    difficulty: "Advanced",
    initialCapital: 8000,
    requiredSkills: ["Programming", "Product Management", "User Experience", "Marketing", "Customer Success"],
    steps: [
      "Identify market gap and validate problem with potential customers",
      "Build minimum viable product with core features",
      "Launch beta version and gather user feedback",
      "Implement feedback and add advanced features",
      "Scale marketing and customer acquisition efforts"
    ]
  },
  {
    id: "16",
    title: "High-End Consulting",
    description: "Offer strategic consulting services to businesses in your area of expertise with premium hourly rates.",
    category: "Freelancing",
    potentialIncome: 180000,
    timeToStart: "1-3 months",
    difficulty: "Advanced",
    initialCapital: 3000,
    requiredSkills: ["Industry Expertise", "Strategic Thinking", "Communication", "Problem Solving", "Business Analysis"],
    steps: [
      "Identify your specialized expertise and target market",
      "Develop case studies and thought leadership content",
      "Network with decision makers at target companies",
      "Price services at premium rates ($200-500/hour)",
      "Deliver exceptional results to build referral network"
    ]
  },
  {
    id: "17",
    title: "Import/Export Business",
    description: "Start an import/export business connecting international suppliers with domestic markets for profitable arbitrage.",
    category: "Business Ventures",
    potentialIncome: 150000,
    timeToStart: "3-6 months",
    difficulty: "Advanced",
    initialCapital: 20000,
    requiredSkills: ["International Trade", "Logistics", "Customs Regulations", "Negotiation", "Market Research"],
    steps: [
      "Research profitable product categories and international markets",
      "Establish relationships with reliable overseas suppliers",
      "Understand import/export regulations and documentation",
      "Set up distribution channels and find domestic buyers",
      "Scale operations and expand to new product lines"
    ]
  },
  {
    id: "18",
    title: "Mobile App Development",
    description: "Create and monetize mobile applications through app stores, in-app purchases, or advertising revenue.",
    category: "Digital Products",
    potentialIncome: 130000,
    timeToStart: "6-12 months",
    difficulty: "Advanced",
    initialCapital: 5000,
    requiredSkills: ["Mobile Development", "UI/UX Design", "App Store Optimization", "User Acquisition", "Monetization"],
    steps: [
      "Learn iOS/Android development or hire development team",
      "Research app market and identify opportunities",
      "Develop minimum viable product and test with users",
      "Launch on app stores with ASO optimization",
      "Implement monetization strategy and user acquisition campaigns"
    ]
  },
  {
    id: "19",
    title: "Investment Banking Associate",
    description: "Work as an investment banking associate at top-tier firms handling M&A deals, IPOs, and corporate finance.",
    category: "High-Paying Jobs",
    potentialIncome: 200000,
    timeToStart: "6-12 months",
    difficulty: "Advanced",
    initialCapital: 5000,
    requiredSkills: ["Financial Modeling", "Valuation", "Excel", "PowerPoint", "Industry Analysis"],
    steps: [
      "Obtain relevant finance education or certification (CFA, MBA)",
      "Build financial modeling and analysis skills",
      "Network with investment banking professionals",
      "Apply to analyst and associate programs",
      "Excel in high-pressure environment and long hours"
    ]
  },
  {
    id: "20",
    title: "Podcast Monetization",
    description: "Create a successful podcast in a profitable niche and monetize through sponsorships, products, and premium content.",
    category: "Digital Products",
    potentialIncome: 100000,
    timeToStart: "6-12 months",
    difficulty: "Intermediate",
    initialCapital: 2000,
    requiredSkills: ["Audio Production", "Content Creation", "Interview Skills", "Marketing", "Audience Building"],
    steps: [
      "Choose profitable podcast niche with engaged audience",
      "Invest in quality recording equipment and editing software",
      "Create consistent publishing schedule with valuable content",
      "Grow audience through social media and guest appearances",
      "Monetize through sponsorships, affiliate marketing, and products"
    ]
  }
];