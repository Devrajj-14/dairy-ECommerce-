import type { Metadata } from "next";
import AdvisorChat from "@/components/advisor/AdvisorChat";
import { Bot, Shield, Leaf, ChevronRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pura Milk Doctor — AI Dairy Advisor",
  description:
    "Get personalised milk and dairy recommendations from our AI advisor. Tell us your lifestyle, household size, and taste preferences — and we'll guide you to the perfect Pura plan.",
};

const benefits = [
  {
    icon: Bot,
    title: "Guided Recommendations",
    body: "Our AI asks the right questions before suggesting anything — no shallow generic answers.",
  },
  {
    icon: Shield,
    title: "Safe & Responsible",
    body: "Product advice only — we always recommend a doctor for health or medical questions.",
  },
  {
    icon: Leaf,
    title: "Pura Products Only",
    body: "Recommendations are grounded in our actual dairy catalog — nothing invented.",
  },
];

export default function AdvisorPage() {
  return (
    <div className="min-h-screen bg-cream-gradient pt-24 pb-20">
      <div className="container-premium">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-400 mb-8">
          <Link href="/" className="hover:text-stone-600 transition-colors">Home</Link>
          <ChevronRight size={12} />
          <span className="text-stone-600 font-medium">Milk Doctor</span>
        </div>

        {/* Page heading */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-2 mb-4">
            <span className="badge-sage">
              <Bot size={11} className="mr-1.5" />
              AI Powered
            </span>
          </div>
          <h1 className="display-lg text-stone-900 mb-4">
            Meet your{" "}
            <em className="text-sage-600 not-italic">Milk Doctor</em>
          </h1>
          <p className="text-stone-500 text-lg leading-relaxed">
            Not sure which milk to buy? Tell us about your family, your taste, and your daily routine
            — and our AI advisor will guide you to the perfect Pura match.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid lg:grid-cols-[1fr_420px] gap-8 items-start">

          {/* Left — benefits + info */}
          <div className="space-y-6 order-2 lg:order-1">
            <div className="space-y-4">
              {benefits.map(({ icon: Icon, title, body }) => (
                <div
                  key={title}
                  className="flex gap-4 p-5 bg-white rounded-2xl border border-stone-200/60 shadow-sm"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-sage-500/10 flex items-center justify-center">
                    <Icon size={18} className="text-sage-600" />
                  </div>
                  <div>
                    <p className="text-stone-800 font-semibold text-sm mb-1">{title}</p>
                    <p className="text-stone-500 text-sm leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Products it recommends from */}
            <div className="p-5 bg-white rounded-2xl border border-stone-200/60 shadow-sm">
              <p className="text-stone-400 text-xs font-semibold uppercase tracking-wider mb-3">
                Products in scope
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { name: "A2 Cow Milk", price: "₹65/L", fat: "3.5%" },
                  { name: "Buffalo Milk", price: "₹80/L", fat: "6–8%" },
                  { name: "Full Cream Cow", price: "₹72/L", fat: "6%" },
                  { name: "Toned Milk", price: "₹55/L", fat: "3%" },
                  { name: "Farm Fresh Curd", price: "₹60/500g", fat: null },
                  { name: "Bilona Ghee", price: "₹950/500ml", fat: null },
                  { name: "Paneer", price: "₹200/250g", fat: null },
                  { name: "Buttermilk", price: "₹25/300ml", fat: null },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="p-2.5 bg-cream-50 rounded-xl border border-stone-100"
                  >
                    <p className="text-stone-700 text-xs font-semibold leading-tight">{p.name}</p>
                    <p className="text-stone-400 text-xs mt-0.5">
                      {p.price}
                      {p.fat && <span className="ml-1">· {p.fat} fat</span>}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right — chat interface */}
          <div className="order-1 lg:order-2">
            <AdvisorChat />
          </div>
        </div>
      </div>
    </div>
  );
}
