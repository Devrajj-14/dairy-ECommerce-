import Hero from "@/components/landing/Hero";
import ThreePathways from "@/components/landing/ThreePathways";
import CategoryShowcase from "@/components/landing/CategoryShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import SubscriptionHighlight from "@/components/landing/SubscriptionHighlight";
import Benefits from "@/components/landing/Benefits";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pura — Premium Farm-Fresh Dairy Delivery",
  description:
    "A2 cow milk, buffalo milk, Bilona ghee and more — delivered from certified farms within 12 hours. Subscribe daily or build your custom milk.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreePathways />
      <CategoryShowcase />
      <HowItWorks />
      <SubscriptionHighlight />
      <Benefits />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
