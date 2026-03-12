import type { Product, TestimonialItem, SubscriptionPlan } from "./types";

// ─── Products ────────────────────────────────────────────────────────────────
export const products: Product[] = [
  {
    id: "a2-cow-milk-1l",
    name: "A2 Cow Milk",
    shortName: "A2 Cow Milk",
    category: "fresh-milk",
    milkType: "cow",
    fatPercentage: 3.5,
    fatProfile: "balanced",
    pricePerUnit: 65,
    priceUnit: "/L",
    quantity: 1,
    quantityUnit: "L",
    availableQuantities: [0.5, 1, 1.5, 2],
    isSubscriptionEligible: true,
    badgeLabel: "A2 Certified",
    description:
      "Sourced from certified Gir and Sahiwal cows, our A2 milk contains only the A2 beta-casein protein — easier to digest, naturally wholesome, and closer to how nature intended milk to be.",
    benefits: [
      "A2 beta-casein protein only",
      "Easier on digestion",
      "No added hormones",
      "Delivered within 6 hours of milking",
    ],
    farmSource: "Anand Cooperative Farms, Gujarat",
    deliveryNote: "Delivered fresh before 7 AM daily",
    nutritionFacts: [
      { label: "Fat", value: "3.5", unit: "%" },
      { label: "Protein", value: "3.2", unit: "g/100ml" },
      { label: "Calcium", value: "120", unit: "mg/100ml" },
      { label: "Lactose", value: "4.8", unit: "g/100ml" },
    ],
    images: ["/images/a2-cow-milk.jpg"],
    rating: 4.9,
    reviewCount: 2847,
    inStock: true,
  },
  {
    id: "buffalo-milk-1l",
    name: "Buffalo Milk",
    shortName: "Buffalo Milk",
    category: "fresh-milk",
    milkType: "buffalo",
    fatPercentage: 7,
    fatProfile: "rich",
    pricePerUnit: 80,
    priceUnit: "/L",
    quantity: 1,
    quantityUnit: "L",
    availableQuantities: [0.5, 1, 1.5, 2],
    isSubscriptionEligible: true,
    badgeLabel: "High Richness",
    description:
      "Thick, rich, and naturally creamy. Our Murrah buffalo milk is prized for its exceptional fat content, making it ideal for sweets, paneer, and those who appreciate depth and body in their milk.",
    benefits: [
      "7% natural fat content",
      "Higher calcium & protein",
      "Ideal for making paneer & sweets",
      "No preservatives",
    ],
    farmSource: "Karnal Buffalo Farms, Haryana",
    deliveryNote: "Delivered fresh before 7 AM daily",
    nutritionFacts: [
      { label: "Fat", value: "7.0", unit: "%" },
      { label: "Protein", value: "4.5", unit: "g/100ml" },
      { label: "Calcium", value: "195", unit: "mg/100ml" },
      { label: "Lactose", value: "4.2", unit: "g/100ml" },
    ],
    images: ["/images/buffalo-milk.jpg"],
    rating: 4.8,
    reviewCount: 1932,
    inStock: true,
  },
  {
    id: "full-cream-milk-1l",
    name: "Full Cream Cow Milk",
    shortName: "Full Cream",
    category: "fresh-milk",
    milkType: "cow",
    fatPercentage: 6,
    fatProfile: "full-cream",
    pricePerUnit: 72,
    priceUnit: "/L",
    quantity: 1,
    quantityUnit: "L",
    availableQuantities: [0.5, 1, 1.5, 2],
    isSubscriptionEligible: true,
    badgeLabel: "Best Seller",
    description:
      "Our most loved milk. Rich, creamy, and full-bodied. Perfect for your morning tea, coffee, or a tall glass of pure nourishment. No skimming, no compromise.",
    benefits: [
      "6% natural fat",
      "Full nutritional profile intact",
      "Perfect for chai & coffee",
      "Farm-fresh daily",
    ],
    farmSource: "Anand Cooperative Farms, Gujarat",
    deliveryNote: "Delivered before 7 AM daily",
    nutritionFacts: [
      { label: "Fat", value: "6.0", unit: "%" },
      { label: "Protein", value: "3.6", unit: "g/100ml" },
      { label: "Calcium", value: "145", unit: "mg/100ml" },
      { label: "Lactose", value: "4.7", unit: "g/100ml" },
    ],
    images: ["/images/full-cream-milk.jpg"],
    rating: 4.8,
    reviewCount: 4210,
    inStock: true,
  },
  {
    id: "toned-milk-1l",
    name: "Toned Milk",
    shortName: "Toned Milk",
    category: "fresh-milk",
    milkType: "cow",
    fatPercentage: 3,
    fatProfile: "light",
    pricePerUnit: 55,
    priceUnit: "/L",
    quantity: 1,
    quantityUnit: "L",
    availableQuantities: [0.5, 1, 1.5, 2],
    isSubscriptionEligible: true,
    description:
      "Light and clean. Our toned milk retains the core goodness of fresh cow milk while keeping fat content minimal — the smart choice for health-conscious households.",
    benefits: [
      "Low 3% fat",
      "High protein retention",
      "Light on the stomach",
      "Ideal for fitness routines",
    ],
    farmSource: "Anand Cooperative Farms, Gujarat",
    deliveryNote: "Delivered before 7 AM daily",
    nutritionFacts: [
      { label: "Fat", value: "3.0", unit: "%" },
      { label: "Protein", value: "3.0", unit: "g/100ml" },
      { label: "Calcium", value: "115", unit: "mg/100ml" },
      { label: "Lactose", value: "4.8", unit: "g/100ml" },
    ],
    images: ["/images/toned-milk.jpg"],
    rating: 4.7,
    reviewCount: 1520,
    inStock: true,
  },
  {
    id: "farm-fresh-curd-500g",
    name: "Farm Fresh Curd",
    shortName: "Fresh Curd",
    category: "curd",
    pricePerUnit: 60,
    priceUnit: "/500g",
    quantity: 500,
    quantityUnit: "g",
    availableQuantities: [200, 400, 500],
    isSubscriptionEligible: true,
    badgeLabel: "Daily Fresh",
    description:
      "Set fresh each morning from our own milk. Thick, creamy, and slightly tangy — the curd your grandmother would have made, delivered to your door.",
    benefits: [
      "Set fresh daily from whole milk",
      "Rich probiotics for gut health",
      "No stabilisers or thickeners",
      "Traditional setting process",
    ],
    farmSource: "Pura Dairy Processing Units",
    deliveryNote: "Set overnight, delivered by 7 AM",
    images: ["/images/curd.jpg"],
    rating: 4.9,
    reviewCount: 3102,
    inStock: true,
  },
  {
    id: "bilona-ghee-500ml",
    name: "Bilona Ghee",
    shortName: "Bilona Ghee",
    category: "ghee",
    milkType: "cow",
    pricePerUnit: 950,
    priceUnit: "/500ml",
    quantity: 500,
    quantityUnit: "ml",
    availableQuantities: [250, 500, 1000],
    isSubscriptionEligible: false,
    badgeLabel: "Traditional Process",
    description:
      "Made by the ancient Bilona method — hand-churned from cultured A2 cow milk curd. Golden, aromatic, and deeply nourishing. Nothing else like it.",
    benefits: [
      "Hand-churned using Bilona method",
      "Made from A2 cow milk curd",
      "Rich in fat-soluble vitamins A, D, E, K",
      "No additives or mixing",
    ],
    farmSource: "Anand Small-Batch Creamery, Gujarat",
    deliveryNote: "Ships within 2 business days",
    images: ["/images/bilona-ghee.jpg"],
    rating: 5.0,
    reviewCount: 892,
    inStock: true,
  },
  {
    id: "paneer-250g",
    name: "Handmade Paneer",
    shortName: "Paneer",
    category: "paneer",
    milkType: "buffalo",
    pricePerUnit: 200,
    priceUnit: "/250g",
    quantity: 250,
    quantityUnit: "g",
    availableQuantities: [250, 500],
    isSubscriptionEligible: false,
    badgeLabel: "Made Fresh",
    description:
      "Firm, generous, and fresh. Made daily from whole buffalo milk with no binding agents. It holds its shape, absorbs flavours beautifully, and tastes exactly like paneer should.",
    benefits: [
      "Made fresh from whole buffalo milk",
      "High protein: 18g / 100g",
      "No preservatives or acids",
      "Ready-to-cook upon delivery",
    ],
    farmSource: "Pura Dairy Processing Units",
    deliveryNote: "Delivered within 24 hours of making",
    images: ["/images/paneer.jpg"],
    rating: 4.8,
    reviewCount: 1405,
    inStock: true,
  },
  {
    id: "buttermilk-300ml",
    name: "Premium Buttermilk",
    shortName: "Buttermilk",
    category: "buttermilk",
    pricePerUnit: 25,
    priceUnit: "/300ml",
    quantity: 300,
    quantityUnit: "ml",
    availableQuantities: [300, 500],
    isSubscriptionEligible: true,
    description:
      "Cool, lightly spiced, and refreshing. Made from fresh cultured milk with a whisper of cumin and herbs. The perfect daily ritual.",
    benefits: [
      "Probiotic-rich",
      "Lightly seasoned with cumin",
      "Aids digestion",
      "Fresh daily",
    ],
    farmSource: "Pura Dairy Processing Units",
    deliveryNote: "Delivered before 8 AM",
    images: ["/images/buttermilk.jpg"],
    rating: 4.7,
    reviewCount: 678,
    inStock: true,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────
export const testimonials: TestimonialItem[] = [
  {
    id: "t1",
    name: "Ananya Sharma",
    role: "Mother of two",
    location: "Banjara Hills, Hyderabad",
    quote:
      "Switching to Pura's A2 milk was the single best change we made for our family's health this year. The difference in taste alone is remarkable — it tastes the way milk is supposed to taste.",
    rating: 5,
    subscriptionType: "Daily A2 Cow Milk – 2L",
  },
  {
    id: "t2",
    name: "Rohan Mehta",
    role: "Fitness & nutrition specialist",
    location: "Koramangala, Bengaluru",
    quote:
      "I've tried seven different milk delivery services. Pura is in a different league. The Milk Builder is genuinely impressive — I dialled in the exact fat profile I wanted and it arrives at my door every morning. That's not just convenience, that's precision.",
    rating: 5,
    subscriptionType: "Custom Build – Cow Milk, 3.5% fat – Daily",
  },
  {
    id: "t3",
    name: "Priya Nair",
    role: "Home baker",
    location: "Bandra West, Mumbai",
    quote:
      "The buffalo milk for my baking has been a revelation. The richness it adds to my kheer and barfi is unmatched. And the Bilona Ghee — don't even get me started. It's become a pantry essential.",
    rating: 5,
    subscriptionType: "Buffalo Milk + Bilona Ghee – Alternate Days",
  },
  {
    id: "t4",
    name: "Arjun Kapoor",
    role: "Startup founder",
    location: "Sector 57, Gurgaon",
    quote:
      "The subscription management experience is shockingly good. I paused for two weeks during travel and resumed without a single email. The dashboard is better than most fintech apps I use.",
    rating: 5,
    subscriptionType: "Full Cream Milk – Daily Morning Delivery",
  },
  {
    id: "t5",
    name: "Kavitha Reddy",
    role: "Nutritionist",
    location: "Jubilee Hills, Hyderabad",
    quote:
      "What I appreciate most is the transparency. They tell you the farm source, the fat percentage, the delivery timeline. Premium brands charge for this kind of trust. Pura earns it genuinely.",
    rating: 5,
    subscriptionType: "A2 Cow Milk + Curd – Custom Days",
  },
];

// ─── Subscription Plans ───────────────────────────────────────────────────────
export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "daily",
    name: "Daily",
    tagline: "A fresh ritual, every morning",
    pricePerMonth: 1950,
    pricePerDay: 65,
    deliveryFrequency: "daily",
    features: [
      "Delivered 7 days a week",
      "Morning or evening slot",
      "Pause any day via app",
      "Free subscription delivery",
      "Priority quality guarantee",
    ],
  },
  {
    id: "alternate",
    name: "Alternate Days",
    tagline: "Balanced freshness, every other day",
    pricePerMonth: 975,
    pricePerDay: 65,
    deliveryFrequency: "alternate",
    highlight: true,
    highlightLabel: "Most Popular",
    features: [
      "Delivered 15 days/month",
      "Morning delivery slot",
      "Flexible skip options",
      "Free delivery",
      "Same freshness guarantee",
    ],
  },
  {
    id: "custom",
    name: "Custom Days",
    tagline: "You choose, we deliver",
    pricePerMonth: 780,
    pricePerDay: 65,
    deliveryFrequency: "custom",
    features: [
      "Choose your delivery days",
      "Morning or evening",
      "Modify schedule anytime",
      "Free delivery above ₹200",
      "Easy day-level control",
    ],
  },
];

// ─── How It Works Steps ───────────────────────────────────────────────────────
export const howItWorksSteps = [
  {
    step: "01",
    title: "Choose your milk",
    description:
      "Browse our range of A2 cow milk, buffalo milk, toned milk and more — or use the Milk Builder to craft your exact preference.",
  },
  {
    step: "02",
    title: "Set your schedule",
    description:
      "Daily, alternate days, or choose your own delivery days. Morning or evening. Fully flexible, always in your control.",
  },
  {
    step: "03",
    title: "Milk leaves the farm",
    description:
      "Your milk is sourced, chilled, and packed within hours of milking — never more than 12 hours old when it begins its journey to you.",
  },
  {
    step: "04",
    title: "Fresh at your door",
    description:
      "Delivered in insulated packaging before 7 AM, so it's waiting for your morning routine. Cold, pure, and exactly as ordered.",
  },
];

// ─── Brand Benefits ───────────────────────────────────────────────────────────
export const brandBenefits = [
  {
    icon: "Leaf",
    title: "Farm to Door in Under 12 Hours",
    description:
      "From udder to your doorstep in under 12 hours — that's the Pura freshness standard.",
  },
  {
    icon: "ShieldCheck",
    title: "No Additives, Ever",
    description:
      "Zero preservatives, zero synthetic hormones, zero mixing. What you see on the label is all that's in the bottle.",
  },
  {
    icon: "Microscope",
    title: "Third-Party Quality Tested",
    description:
      "Every batch is tested by independent FSSAI-certified labs. We publish reports monthly.",
  },
  {
    icon: "RefreshCw",
    title: "Pause or Cancel Anytime",
    description:
      "Subscriptions adapt to your life. Pause for travel, resume when you're back. No calls, no friction.",
  },
  {
    icon: "Star",
    title: "100% Satisfaction Promise",
    description:
      "Not happy with a delivery? We replace it or refund it, zero questions asked.",
  },
  {
    icon: "MapPin",
    title: "Transparent Farm Sourcing",
    description:
      "Every product shows its exact farm source. Know where your milk comes from, always.",
  },
];

// ─── Fat profiles ─────────────────────────────────────────────────────────────
export const fatProfiles = [
  {
    id: "light",
    label: "Light",
    fatMin: 2,
    fatMax: 3,
    fatDefault: 3,
    description: "Clean, lean, easy on the stomach. Perfect for fitness use.",
    useCases: ["Fitness routines", "Low-calorie diets", "Daily hydration"],
    colorClass: "milk-light",
  },
  {
    id: "balanced",
    label: "Balanced",
    fatMin: 3,
    fatMax: 4.5,
    fatDefault: 3.5,
    description:
      "The everyday gold standard. Nourishing without heaviness.",
    useCases: ["Family milk", "Morning chai", "General wellness"],
    colorClass: "milk-balanced",
  },
  {
    id: "rich",
    label: "Rich",
    fatMin: 5,
    fatMax: 6.5,
    fatDefault: 6,
    description: "Noticeably creamier, deeply satisfying. Great for coffee and cooking.",
    useCases: ["Tea & coffee", "Smoothies", "Cooking"],
    colorClass: "milk-rich",
  },
  {
    id: "full-cream",
    label: "Full Cream",
    fatMin: 6.5,
    fatMax: 8,
    fatDefault: 7,
    description:
      "Maximum richness. Natural cream layer visible on top. Traditional indulgence.",
    useCases: ["Sweets & desserts", "Paneer making", "Traditional recipes"],
    colorClass: "milk-full",
  },
];
