// Types for the Pura dairy platform

export type MilkType = "cow" | "buffalo";

export type FatProfile = "light" | "balanced" | "rich" | "full-cream";

export interface Product {
  id: string;
  name: string;
  shortName: string;
  category: ProductCategory;
  milkType?: MilkType;
  fatPercentage?: number;
  fatProfile?: FatProfile;
  pricePerUnit: number;
  priceUnit: string;          // e.g. "/L", "/500g", "/500ml"
  quantity: number;           // in grams or ml
  quantityUnit: string;       // "L" | "g" | "ml"
  availableQuantities: number[];
  isSubscriptionEligible: boolean;
  badgeLabel?: string;        // e.g. "Best Seller", "A2 Certified"
  description: string;
  benefits: string[];
  farmSource: string;
  deliveryNote: string;
  nutritionFacts?: NutritionFact[];
  images: string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
}

export type ProductCategory =
  | "fresh-milk"
  | "curd"
  | "ghee"
  | "paneer"
  | "buttermilk"
  | "cream";

export interface NutritionFact {
  label: string;
  value: string;
  unit: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  subscriptionType: string;
  avatar?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  tagline: string;
  pricePerMonth: number;
  pricePerDay: number;
  deliveryFrequency: DeliveryFrequency;
  features: string[];
  highlight?: boolean;
  highlightLabel?: string;
}

export type DeliveryFrequency = "daily" | "alternate" | "custom";

export type DeliveryTime = "morning" | "evening" | "both";

export interface CartItem {
  productId: string;
  quantity: number;
  isSubscription: boolean;
  deliveryFrequency?: DeliveryFrequency;
  deliveryTime?: DeliveryTime;
  customDays?: number[];       // 0=Sun, 1=Mon, ... 6=Sat
}

export interface MilkBuilderConfig {
  milkType: MilkType;
  fatProfile: FatProfile;
  fatPercentage: number;
  quantity: number;            // litres
  deliveryFrequency: DeliveryFrequency;
  deliveryTime: DeliveryTime;
  customDays: number[];
}

export interface DeliverySlot {
  id: string;
  label: string;
  time: string;
  available: boolean;
}
