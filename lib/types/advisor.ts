export interface AdvisorMessage {
  role: "user" | "assistant";
  content: string;
  timestamp?: number;
}

export interface AdvisorRequest {
  messages: AdvisorMessage[];
}

export interface AdvisorResponse {
  message: string;
  isRecommendation?: boolean;
  recommendation?: ProductRecommendation;
}

export interface ProductRecommendation {
  product: string;
  price: string;
  fatLevel: string;
  reason: string;
  suggestedQuantity: string;
  suggestedSchedule: string;
  alternatives?: AlternativeProduct[];
  addOns?: string[];
}

export interface AlternativeProduct {
  name: string;
  price: string;
  reason: string;
}

export type AdvisorStreamChunk = {
  type: "text" | "recommendation" | "error" | "done";
  content?: string;
  recommendation?: ProductRecommendation;
};
