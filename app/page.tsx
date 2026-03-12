import Hero from "@/components/landing/Hero";
import ThreePathways from "@/components/landing/ThreePathways";
import CategoryShowcase from "@/components/landing/CategoryShowcase";
import HowItWorks from "@/components/landing/HowItWorks";
import SubscriptionHighlight from "@/components/landing/SubscriptionHighlight";
import Benefits from "@/components/landing/Benefits";
import Testimonials from "@/components/landing/Testimonials";
import FinalCTA from "@/components/landing/FinalCTA";
import VideoSection from "@/components/landing/VideoSection";
import AdvisorTeaser from "@/components/landing/AdvisorTeaser";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pura — Premium Farm-Fresh Dairy Delivery",
  description:
    "A2 cow milk, buffalo milk, Bilona ghee and more — delivered from certified farms within 12 hours. Subscribe daily or build your custom milk.",
};

// Replace the youtubeUrl value with any YouTube video URL to display your brand video
const BRAND_VIDEO_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ThreePathways />
      <CategoryShowcase />
      <HowItWorks />
      <SubscriptionHighlight />
      <VideoSection
        youtubeUrl={BRAND_VIDEO_URL}
        title="See how freshness becomes a daily ritual"
        description="Watch how Pura sources, chills, and delivers premium dairy with care, precision, and uncompromising freshness."
        trustPoints={[
          "Delivered within hours of sourcing",
          "No preservatives or additives",
          "Premium quality from certified farms",
          "Cold chain maintained from farm to door",
        ]}
      />
      <Benefits />
      <AdvisorTeaser />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
