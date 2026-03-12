"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Droplets } from "lucide-react";
import { fatProfiles } from "@/lib/data";
import type { MilkType, FatProfile, DeliveryFrequency, DeliveryTime } from "@/lib/types";
import Link from "next/link";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const milkGradients: Record<string, string> = {
  light: "from-slate-50 via-stone-50 to-cream-100",
  balanced: "from-amber-50 via-cream-100 to-cream-200",
  rich: "from-amber-100 via-cream-200 to-amber-50",
  "full-cream": "from-amber-200 via-amber-100 to-cream-200",
};

export default function CustomMilkPage() {
  const [step, setStep] = useState(0);
  const [milkType, setMilkType] = useState<MilkType>("cow");
  const [fatProfileId, setFatProfileId] = useState<FatProfile>("balanced");
  const [fatPercent, setFatPercent] = useState(3.5);
  const [quantity, setQuantity] = useState(1);
  const [frequency, setFrequency] = useState<DeliveryFrequency>("daily");
  const [deliveryTime, setDeliveryTime] = useState<DeliveryTime>("morning");
  const [customDays, setCustomDays] = useState<number[]>([1, 3, 5]);

  const currentProfile = fatProfiles.find((p) => p.id === fatProfileId) ?? fatProfiles[1];
  const pricePerL = milkType === "buffalo" ? 80 : 65;
  const totalPrice = +(pricePerL * quantity).toFixed(0);

  const frequencyLabel: Record<DeliveryFrequency, string> = {
    daily: "Daily",
    alternate: "Alternate days",
    custom: "Custom days",
  };

  const handleFatProfileChange = (profileId: string) => {
    const profile = fatProfiles.find((p) => p.id === profileId);
    if (!profile) return;
    setFatProfileId(profileId as FatProfile);
    setFatPercent(profile.fatDefault);
  };

  const toggleDay = (day: number) => {
    setCustomDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const steps = [
    { label: "Milk type", number: "01" },
    { label: "Richness", number: "02" },
    { label: "Quantity & Schedule", number: "03" },
    { label: "Confirm", number: "04" },
  ];

  const canProceed = step < 3;

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      <div className="container-premium py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <p className="label-md mb-2">Your milk, your way</p>
          <h1 className="display-md text-stone-900 mb-3">Build Your Milk</h1>
          <p className="text-stone-500 text-base max-w-md">
            Four deliberate choices. One milk, precisely calibrated for your household and morning ritual.
          </p>
        </motion.div>

        {/* Progress */}
        <div className="mb-10">
          <div className="flex items-center gap-0" role="progressbar" aria-label={`Step ${step + 1} of 4`} aria-valuenow={step + 1} aria-valuemin={1} aria-valuemax={4}>
            {steps.map((s, i) => (
              <div key={s.number} className="flex items-center flex-1 last:flex-none">
                <button
                  onClick={() => i < step && setStep(i)}
                  disabled={i > step}
                  aria-label={`${s.label} — Step ${s.number}`}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage-600 ${
                    i === step
                      ? "text-stone-900 bg-cream-100 border border-stone-200"
                      : i < step
                      ? "text-sage-600 cursor-pointer hover:text-sage-700"
                      : "text-stone-300 cursor-not-allowed"
                  }`}
                >
                  {i < step ? (
                    <CheckCircle size={16} className="text-sage-600" />
                  ) : (
                    <span className={`w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold ${
                      i === step ? "bg-stone-900 text-white" : "bg-stone-200 text-stone-400"
                    }`}>
                      {i + 1}
                    </span>
                  )}
                  <span className="hidden sm:block">{s.label}</span>
                </button>
                {i < steps.length - 1 && (
                  <div className={`flex-1 h-px mx-2 transition-colors duration-500 ${i < step ? "bg-sage-400" : "bg-stone-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main: Step content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* Step 0: Milk Type */}
              {step === 0 && (
                <motion.div
                  key="step0"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-display text-2xl text-stone-900 mb-2">Choose your milk source</h2>
                  <p className="text-stone-500 text-sm mb-8">Each milk type has a distinct nutritional profile and taste. Select the one that fits your household.</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Cow Milk Card */}
                    <motion.button
                      onClick={() => setMilkType("cow")}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative text-left p-7 rounded-2xl border-2 transition-all duration-300 overflow-hidden focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                        milkType === "cow"
                          ? "border-sage-600 bg-sage-600/5 shadow-lg"
                          : "border-stone-200 bg-cream-100 hover:border-stone-300"
                      }`}
                      aria-pressed={milkType === "cow"}
                    >
                      {milkType === "cow" && (
                        <motion.div
                          layoutId="milk-selected"
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-sage-600 flex items-center justify-center"
                        >
                          <CheckCircle size={14} className="text-white" />
                        </motion.div>
                      )}

                      {/* Visual */}
                      <div className={`w-full h-28 rounded-xl mb-5 bg-gradient-to-br from-amber-50 to-cream-200 flex items-center justify-center transition-all duration-500 ${milkType === "cow" ? "shadow-md" : ""}`}>
                        <div className="text-center">
                          <p className="text-3xl mb-1">🐄</p>
                          <div className="w-12 h-2 rounded-full bg-white/60 mx-auto" />
                        </div>
                      </div>

                      <h3 className="font-display text-xl text-stone-900 font-600 mb-2">Cow Milk</h3>
                      <p className="text-xs text-stone-500 leading-relaxed mb-4">
                        Lighter, easier to digest. Our A2 and full cream cow milk is ideal for daily family use, fitness routines, and tea.
                      </p>

                      <div className="space-y-1.5">
                        {["3%–6% fat", "A2 beta-casein (selected)", "Easier on digestion", "Subtle, clean flavour"].map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-stone-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-sage-500 shrink-0" />
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-4 border-t border-stone-200/60">
                        <span className="font-display text-lg text-stone-900 font-600">From ₹55</span>
                        <span className="text-stone-400 text-xs ml-1">/L</span>
                      </div>
                    </motion.button>

                    {/* Buffalo Milk Card */}
                    <motion.button
                      onClick={() => setMilkType("buffalo")}
                      whileHover={{ y: -4 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative text-left p-7 rounded-2xl border-2 transition-all duration-300 overflow-hidden focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                        milkType === "buffalo"
                          ? "border-amber-400 bg-amber-400/5 shadow-lg"
                          : "border-stone-200 bg-cream-100 hover:border-stone-300"
                      }`}
                      aria-pressed={milkType === "buffalo"}
                    >
                      {milkType === "buffalo" && (
                        <motion.div
                          className="absolute top-4 right-4 w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center"
                        >
                          <CheckCircle size={14} className="text-white" />
                        </motion.div>
                      )}

                      <div className={`w-full h-28 rounded-xl mb-5 bg-gradient-to-br from-amber-200 to-stone-200 flex items-center justify-center transition-all duration-500 ${milkType === "buffalo" ? "shadow-md" : ""}`}>
                        <div className="text-center">
                          <p className="text-3xl mb-1">🐃</p>
                          <div className="w-16 h-2 rounded-full bg-white/70 mx-auto" />
                        </div>
                      </div>

                      <h3 className="font-display text-xl text-stone-900 font-600 mb-2">Buffalo Milk</h3>
                      <p className="text-xs text-stone-500 leading-relaxed mb-4">
                        Thick, rich, deeply creamy. Buffalo milk is prized for making paneer, sweets, and for households that love bold dairy richness.
                      </p>

                      <div className="space-y-1.5">
                        {["6%–8% fat", "Higher protein & calcium", "Ideal for sweets & paneer", "Rich, full-bodied flavour"].map((feat) => (
                          <div key={feat} className="flex items-center gap-2 text-xs text-stone-600">
                            <div className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                            {feat}
                          </div>
                        ))}
                      </div>

                      <div className="mt-5 pt-4 border-t border-stone-200/60">
                        <span className="font-display text-lg text-stone-900 font-600">From ₹80</span>
                        <span className="text-stone-400 text-xs ml-1">/L</span>
                      </div>
                    </motion.button>
                  </div>

                  {/* Comparison table */}
                  <div className="mt-8 p-5 bg-cream-100 border border-stone-200 rounded-xl">
                    <h3 className="text-sm font-semibold text-stone-700 mb-4">At a glance comparison</h3>
                    <div className="grid grid-cols-3 gap-0 text-sm">
                      <div className="text-stone-400 font-medium"></div>
                      <div className="text-center font-semibold text-stone-700 pb-2">Cow</div>
                      <div className="text-center font-semibold text-stone-700 pb-2">Buffalo</div>
                      {[
                        { label: "Fat %", cow: "3–6%", buf: "6–8%" },
                        { label: "Protein", cow: "3.2g", buf: "4.5g" },
                        { label: "Calcium", cow: "120mg", buf: "195mg" },
                        { label: "Digestibility", cow: "Easier", buf: "Richer" },
                        { label: "Best for", cow: "Daily use", buf: "Sweets, cooking" },
                      ].map(({ label, cow, buf }) => (
                        <div key={label} className="contents">
                          <div className="py-2.5 pr-4 text-xs text-stone-500 border-t border-stone-200/60">{label}</div>
                          <div className={`py-2.5 text-center text-xs border-t border-stone-200/60 font-medium ${milkType === "cow" ? "text-sage-600" : "text-stone-600"}`}>{cow}</div>
                          <div className={`py-2.5 text-center text-xs border-t border-stone-200/60 font-medium ${milkType === "buffalo" ? "text-amber-500" : "text-stone-600"}`}>{buf}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 1: Richness */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-display text-2xl text-stone-900 mb-2">Choose your richness level</h2>
                  <p className="text-stone-500 text-sm mb-8">
                    Fat content defines the taste, texture, and use case of your milk. The visual below changes as you select.
                  </p>

                  {/* Visual milk glass */}
                  <div className="flex justify-center mb-8">
                    <div className="relative w-32 h-48">
                      <div className="absolute inset-0 rounded-3xl border-2 border-stone-200 overflow-hidden bg-white">
                        <motion.div
                          className={`absolute inset-x-0 bottom-0 rounded-b-3xl bg-gradient-to-t ${milkGradients[fatProfileId] ?? "from-cream-100 to-white"}`}
                          animate={{ height: `${Math.min(100, 55 + (fatPercent / 10) * 35)}%` }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        />
                        {/* Cream top */}
                        <motion.div
                          className="absolute inset-x-0 rounded-3xl bg-amber-50/60 blur-sm"
                          animate={{
                            top: `${Math.max(5, 44 - (fatPercent / 10) * 30)}%`,
                            height: `${8 + (fatPercent / 10) * 10}px`,
                          }}
                          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                        />
                      </div>
                      {/* Fat % label */}
                      <div className="absolute -right-16 top-1/2 -translate-y-1/2 text-center">
                        <motion.p
                          key={fatPercent}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-display text-3xl font-700 text-stone-900"
                        >
                          {fatPercent}%
                        </motion.p>
                        <p className="text-stone-400 text-xs">fat</p>
                      </div>
                    </div>
                  </div>

                  {/* Profile selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {fatProfiles.map((profile) => (
                      <button
                        key={profile.id}
                        onClick={() => handleFatProfileChange(profile.id)}
                        className={`p-4 rounded-xl border-2 text-left transition-all duration-300 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                          fatProfileId === profile.id
                            ? "border-stone-900 bg-stone-900 text-white shadow-lg"
                            : "border-stone-200 bg-cream-100 hover:border-stone-300 text-stone-700"
                        }`}
                        aria-pressed={fatProfileId === profile.id}
                      >
                        <p className={`text-xs font-bold mb-1 ${fatProfileId === profile.id ? "text-stone-300" : "text-stone-400"}`}>
                          {profile.fatMin}–{profile.fatMax}%
                        </p>
                        <p className="font-display text-base font-600">{profile.label}</p>
                      </button>
                    ))}
                  </div>

                  {/* Fine-tune slider */}
                  <div className="p-6 bg-cream-100 border border-stone-200 rounded-xl">
                    <div className="flex items-center justify-between mb-3">
                      <label htmlFor="fat-slider" className="text-sm font-semibold text-stone-700">
                        Fine-tune fat percentage
                      </label>
                      <span className="text-sm font-bold text-sage-600">{fatPercent}%</span>
                    </div>
                    <input
                      id="fat-slider"
                      type="range"
                      min={currentProfile.fatMin}
                      max={currentProfile.fatMax}
                      step={0.5}
                      value={fatPercent}
                      onChange={(e) => setFatPercent(parseFloat(e.target.value))}
                      className="w-full h-2 rounded-full bg-stone-200 appearance-none cursor-pointer accent-sage-600"
                    />
                    <div className="flex justify-between mt-2 text-xs text-stone-400">
                      <span>{currentProfile.fatMin}% lighter</span>
                      <span>richer {currentProfile.fatMax}%</span>
                    </div>

                    {/* Profile details */}
                    <div className="mt-5 pt-4 border-t border-stone-200/60">
                      <p className="text-sm text-stone-600 mb-2">{currentProfile.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {currentProfile.useCases.map((uc) => (
                          <span key={uc} className="badge-sage text-xs">{uc}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Quantity & Schedule */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-display text-2xl text-stone-900 mb-2">Quantity & delivery schedule</h2>
                  <p className="text-stone-500 text-sm mb-8">How much do you need, and how often? Set your delivery rhythm.</p>

                  {/* Quantity selector */}
                  <div className="mb-8">
                    <label className="block text-sm font-semibold text-stone-700 mb-4" id="quantity-label">Daily quantity (litres)</label>
                    <div className="flex items-center gap-0 bg-cream-100 border border-stone-200 rounded-xl w-fit" role="group" aria-labelledby="quantity-label">
                      <button
                        onClick={() => setQuantity((q) => Math.max(0.5, +(q - 0.5).toFixed(1)))}
                        aria-label="Decrease quantity"
                        className="w-14 h-14 flex items-center justify-center text-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/40 rounded-l-xl transition-colors focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-inset"
                      >
                        −
                      </button>
                      <div className="w-20 h-14 flex items-center justify-center">
                        <motion.span
                          key={quantity}
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="font-display text-2xl font-600 text-stone-900"
                        >
                          {quantity}L
                        </motion.span>
                      </div>
                      <button
                        onClick={() => setQuantity((q) => Math.min(5, +(q + 0.5).toFixed(1)))}
                        aria-label="Increase quantity"
                        className="w-14 h-14 flex items-center justify-center text-xl text-stone-600 hover:text-stone-900 hover:bg-stone-200/40 rounded-r-xl transition-colors focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-inset"
                      >
                        +
                      </button>
                    </div>

                    {/* Household guide */}
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[
                        { qty: "0.5L", label: "1–2 people" },
                        { qty: "1L", label: "2–4 people" },
                        { qty: "2L", label: "4–6 people" },
                      ].map(({ qty, label }) => (
                        <button
                          key={qty}
                          onClick={() => setQuantity(parseFloat(qty))}
                          className="p-2.5 text-center rounded-lg border border-stone-200 hover:border-sage-500 bg-white text-sm text-stone-600 hover:text-stone-900 transition-all duration-200"
                        >
                          <p className="font-semibold">{qty}</p>
                          <p className="text-xs text-stone-400">{label}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Frequency */}
                  <div className="mb-8">
                    <p className="text-sm font-semibold text-stone-700 mb-4" id="freq-label">Delivery frequency</p>
                    <div className="flex flex-wrap gap-2" role="group" aria-labelledby="freq-label">
                      {(["daily", "alternate", "custom"] as DeliveryFrequency[]).map((f) => (
                        <button
                          key={f}
                          onClick={() => setFrequency(f)}
                          aria-pressed={frequency === f}
                          className={`px-5 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                            frequency === f
                              ? "bg-stone-900 text-white border-stone-900"
                              : "bg-white text-stone-600 border-stone-200 hover:border-stone-400"
                          }`}
                        >
                          {frequencyLabel[f]}
                        </button>
                      ))}
                    </div>

                    {/* Custom day picker */}
                    <AnimatePresence>
                      {frequency === "custom" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 16 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="text-xs text-stone-500 mb-3">Select delivery days</p>
                          <div className="flex gap-2 flex-wrap">
                            {DAYS.map((day, i) => (
                              <button
                                key={day}
                                onClick={() => toggleDay(i)}
                                aria-pressed={customDays.includes(i)}
                                className={`w-12 h-12 rounded-full text-sm font-medium border-2 transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                                  customDays.includes(i)
                                    ? "bg-sage-600 text-white border-sage-600 shadow-sm"
                                    : "bg-white text-stone-500 border-stone-200 hover:border-sage-400"
                                }`}
                              >
                                {day[0]}
                              </button>
                            ))}
                          </div>
                          <p className="text-xs text-stone-400 mt-2">
                            {customDays.length} {customDays.length === 1 ? "day" : "days"} selected
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Delivery time */}
                  <div>
                    <p className="text-sm font-semibold text-stone-700 mb-4" id="time-label">Delivery time preference</p>
                    <div className="grid grid-cols-2 gap-3" role="group" aria-labelledby="time-label">
                      {([
                        { value: "morning", label: "Morning", time: "Before 7 AM", emoji: "🌅" },
                        { value: "evening", label: "Evening", time: "5–7 PM", emoji: "🌇" },
                      ] as { value: DeliveryTime; label: string; time: string; emoji: string }[]).map(({ value, label, time, emoji }) => (
                        <button
                          key={value}
                          onClick={() => setDeliveryTime(value)}
                          aria-pressed={deliveryTime === value}
                          className={`p-4 rounded-xl border-2 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                            deliveryTime === value
                              ? "border-sage-600 bg-sage-600/5"
                              : "border-stone-200 bg-cream-100 hover:border-stone-300"
                          }`}
                        >
                          <span className="text-2xl mb-2 block">{emoji}</span>
                          <p className="font-semibold text-stone-900 text-sm">{label}</p>
                          <p className="text-xs text-stone-400 mt-0.5">{time}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Confirmation */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="font-display text-2xl text-stone-900 mb-2">Your custom milk is ready</h2>
                  <p className="text-stone-500 text-sm mb-8">Review your curation before placing your order.</p>

                  <div className="space-y-4">
                    {[
                      { label: "Milk type", value: milkType === "cow" ? "Cow Milk (A2)" : "Buffalo Milk" },
                      { label: "Richness profile", value: `${currentProfile.label} — ${fatPercent}% fat` },
                      { label: "Daily quantity", value: `${quantity} litre${quantity !== 1 ? "s" : ""}` },
                      { label: "Delivery frequency", value: frequency === "custom" ? `Custom (${customDays.length} days/week)` : frequencyLabel[frequency] },
                      { label: "Delivery time", value: deliveryTime === "morning" ? "Before 7 AM" : "5–7 PM" },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between py-4 border-b border-stone-100 last:border-0">
                        <span className="text-sm text-stone-500">{label}</span>
                        <span className="text-sm font-semibold text-stone-900">{value}</span>
                      </div>
                    ))}
                  </div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 p-5 bg-sage-600/8 border border-sage-500/20 rounded-xl"
                  >
                    <p className="text-xs text-stone-500 mb-1">Based on your selections, we recommend:</p>
                    <p className="text-sm font-semibold text-sage-700">
                      {milkType === "cow" && fatProfileId === "balanced" && "A2 Cow Milk — our most popular configuration for families."}
                      {milkType === "cow" && fatProfileId === "light" && "Toned Cow Milk — perfect for fitness routines and low-fat diets."}
                      {milkType === "cow" && (fatProfileId === "rich" || fatProfileId === "full-cream") && "Full Cream Cow Milk — ideal for rich chai and cooking."}
                      {milkType === "buffalo" && "Premium Buffalo Milk — exceptional for sweets, paneer, and rich cooking."}
                    </p>
                  </motion.div>

                  <Link
                    href="/cart"
                    className="mt-8 w-full flex items-center justify-center gap-2.5 py-4 bg-sage-600 hover:bg-sage-700 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-lg group"
                  >
                    Add to Cart & Checkout
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation buttons */}
            {step < 3 && (
              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 border border-stone-200 hover:border-stone-300 rounded-xl transition-all disabled:opacity-30 disabled:pointer-events-none focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  onClick={() => setStep((s) => Math.min(3, s + 1))}
                  className="inline-flex items-center gap-2 px-7 py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-sm font-medium rounded-xl transition-all hover:shadow-md focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 group"
                >
                  Continue
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar: Live Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-28">
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm"
              >
                {/* Milk color preview banner */}
                <motion.div
                  className={`h-20 bg-gradient-to-br ${milkGradients[fatProfileId] ?? "from-cream-100 to-white"} flex items-center justify-center`}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Droplets size={28} className="text-stone-300 opacity-60" />
                </motion.div>

                <div className="p-6">
                  <p className="label-sm mb-4">Your milk summary</p>

                  <div className="space-y-3 mb-6">
                    <SummaryRow
                      label="Type"
                      value={milkType === "cow" ? "Cow Milk" : "Buffalo Milk"}
                      active={step >= 0}
                    />
                    <SummaryRow
                      label="Richness"
                      value={`${currentProfile.label} (${fatPercent}%)`}
                      active={step >= 1}
                    />
                    <SummaryRow
                      label="Quantity"
                      value={`${quantity}L / delivery`}
                      active={step >= 2}
                    />
                    <SummaryRow
                      label="Schedule"
                      value={frequency === "custom" ? `${customDays.length} days/week` : frequencyLabel[frequency]}
                      active={step >= 2}
                    />
                    <SummaryRow
                      label="Delivery"
                      value={deliveryTime === "morning" ? "Morning · Before 7 AM" : "Evening · 5–7 PM"}
                      active={step >= 2}
                    />
                  </div>

                  <div className="pt-4 border-t border-stone-100">
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-sm text-stone-500">Price per delivery</span>
                      <motion.span
                        key={totalPrice}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="font-display text-2xl font-700 text-stone-900"
                      >
                        ₹{totalPrice}
                      </motion.span>
                    </div>
                    <p className="text-xs text-stone-400">₹{pricePerL}/L · {quantity}L · free delivery</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, active }: { label: string; value: string; active: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className={`text-xs transition-colors ${active ? "text-stone-500" : "text-stone-200"}`}>{label}</span>
      <motion.span
        animate={{ opacity: active ? 1 : 0.2 }}
        transition={{ duration: 0.3 }}
        className="text-xs font-semibold text-stone-900 text-right"
      >
        {value}
      </motion.span>
    </div>
  );
}
