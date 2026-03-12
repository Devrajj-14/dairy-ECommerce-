"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Package, Settings, FileText, RefreshCw, Pause, Play, PlusCircle } from "lucide-react";
import { products, subscriptionPlans } from "@/lib/data";
import Link from "next/link";

const navItems = [
  { id: "overview", label: "Overview", icon: Calendar },
  { id: "subscriptions", label: "Subscriptions", icon: RefreshCw },
  { id: "orders", label: "Orders", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
];

const upcomingDeliveries = [
  { date: "Tomorrow, 12 Mar", time: "Before 7 AM", items: ["A2 Cow Milk — 1L", "Farm Fresh Curd — 500g"], status: "confirmed" },
  { date: "Fri, 14 Mar", time: "Before 7 AM", items: ["A2 Cow Milk — 1L"], status: "confirmed" },
  { date: "Sat, 15 Mar", time: "Before 7 AM", items: ["A2 Cow Milk — 1L", "Buffalo Milk — 500ml"], status: "upcoming" },
];

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState("overview");
  const [paused, setPaused] = useState(false);

  return (
    <div className="min-h-screen bg-cream-50 pt-20 pb-16">
      <div className="container-premium py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <p className="label-sm mb-1">Good morning</p>
          <h1 className="font-display text-3xl text-stone-900 font-600">Your Pura Dashboard</h1>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <nav className="lg:w-56 shrink-0" aria-label="Dashboard navigation">
            <ul className="space-y-1">
              {navItems.map(({ id, label, icon: Icon }) => (
                <li key={id}>
                  <button
                    onClick={() => setActiveSection(id)}
                    aria-current={activeSection === id ? "page" : undefined}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 ${
                      activeSection === id
                        ? "bg-stone-900 text-white"
                        : "text-stone-600 hover:text-stone-900 hover:bg-cream-100"
                    }`}
                  >
                    <Icon size={17} strokeWidth={1.5} />
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              {activeSection === "overview" && (
                <motion.div key="overview" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="space-y-6">
                  {/* Stat row */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { label: "This month", value: "31", sub: "deliveries" },
                      { label: "Spent (Mar)", value: "₹2,015", sub: "inc. subscription" },
                      { label: "Subscription", value: "Active", sub: "Daily plan" },
                      { label: "Next delivery", value: "Tomorrow", sub: "Before 7 AM" },
                    ].map(({ label, value, sub }) => (
                      <div key={label} className="p-5 bg-cream-100 border border-stone-200 rounded-xl">
                        <p className="label-sm mb-2">{label}</p>
                        <p className="font-display text-2xl font-700 text-stone-900">{value}</p>
                        <p className="text-xs text-stone-400 mt-0.5">{sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Upcoming deliveries */}
                  <div>
                    <h2 className="font-display text-lg text-stone-900 mb-4">Upcoming Deliveries</h2>
                    <div className="space-y-3">
                      {upcomingDeliveries.map((d, i) => (
                        <motion.div
                          key={d.date}
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.07 }}
                          className="flex items-center gap-5 p-5 bg-white border border-stone-200/80 rounded-xl"
                        >
                          {/* Timeline node */}
                          <div className="flex flex-col items-center gap-1">
                            <div className={`w-3 h-3 rounded-full border-2 ${i === 0 ? "bg-sage-500 border-sage-500" : "bg-stone-200 border-stone-300"}`} />
                            {i < upcomingDeliveries.length - 1 && <div className="w-px h-6 bg-stone-200" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <p className="text-sm font-semibold text-stone-900">{d.date}</p>
                              <span className="text-xs text-stone-400">· {d.time}</span>
                            </div>
                            <p className="text-xs text-stone-500">{d.items.join(" · ")}</p>
                          </div>
                          <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full font-medium ${i === 0 ? "badge-sage" : "bg-stone-100 text-stone-500"}`}>
                            {d.status}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "subscriptions" && (
                <motion.div key="subscriptions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }} className="space-y-5">
                  <div className="flex items-center justify-between mb-2">
                    <h2 className="font-display text-lg text-stone-900">Active Subscriptions</h2>
                    <Link href="/subscribe" className="inline-flex items-center gap-1.5 text-sm text-sage-600 hover:text-sage-700 font-medium">
                      <PlusCircle size={15} />
                      Add plan
                    </Link>
                  </div>

                  {/* Subscription card */}
                  <div className="p-6 bg-white border border-stone-200 rounded-2xl shadow-xs">
                    <div className="flex items-start justify-between mb-5">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-display text-xl text-stone-900">A2 Cow Milk</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${paused ? "bg-amber-300/20 text-amber-500" : "badge-sage"}`}>
                            {paused ? "Paused" : "Active"}
                          </span>
                        </div>
                        <p className="text-sm text-stone-500">Daily · 1L · Morning delivery · ₹65/day</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl font-700 text-stone-900">₹1,950</p>
                        <p className="text-xs text-stone-400">per month</p>
                      </div>
                    </div>

                    {/* Controls */}
                    <div className="flex flex-wrap gap-3 pt-4 border-t border-stone-100">
                      <button
                        onClick={() => setPaused(!paused)}
                        className={`inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-all focus-visible:ring-2 focus-visible:ring-sage-600 ${
                          paused
                            ? "border-sage-500 text-sage-600 hover:bg-sage-600/5"
                            : "border-stone-200 text-stone-600 hover:border-amber-300 hover:text-amber-500"
                        }`}
                      >
                        {paused ? <Play size={14} /> : <Pause size={14} />}
                        {paused ? "Resume" : "Pause"}
                      </button>
                      <Link href="/custom" className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-600 border border-stone-200 rounded-lg hover:border-stone-400 transition-all focus-visible:ring-2 focus-visible:ring-sage-600">
                        <Settings size={14} />
                        Modify milk
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeSection === "orders" && (
                <motion.div key="orders" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <h2 className="font-display text-lg text-stone-900 mb-5">Order History</h2>
                  <div className="space-y-3">
                    {[
                      { id: "ORD-8821", date: "10 Mar 2025", items: "A2 Cow Milk × 1L, Curd × 500g", total: 125 },
                      { id: "ORD-8820", date: "9 Mar 2025", items: "A2 Cow Milk × 1L", total: 65 },
                      { id: "ORD-8819", date: "8 Mar 2025", items: "A2 Cow Milk × 1L, Paneer × 250g", total: 265 },
                    ].map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-5 bg-cream-100 border border-stone-200 rounded-xl">
                        <div>
                          <p className="text-sm font-semibold text-stone-900">{order.id}</p>
                          <p className="text-xs text-stone-500 mt-0.5">{order.date} · {order.items}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className="font-semibold text-stone-900">₹{order.total}</p>
                          <button className="text-xs text-sage-600 hover:text-sage-700 font-medium focus-visible:ring-2 focus-visible:ring-sage-600">Reorder</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activeSection === "settings" && (
                <motion.div key="settings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
                  <h2 className="font-display text-lg text-stone-900 mb-5">Account Settings</h2>
                  <form className="space-y-4 max-w-md" onSubmit={(e) => e.preventDefault()}>
                    {[
                      { id: "setting-name", label: "Full Name", defaultValue: "Arjun Mehta", type: "text" },
                      { id: "setting-phone", label: "Mobile", defaultValue: "+91 98765 43210", type: "tel" },
                      { id: "setting-email", label: "Email", defaultValue: "arjun@example.com", type: "email" },
                      { id: "setting-address", label: "Default Address", defaultValue: "42, Bandra West, Mumbai", type: "text" },
                    ].map(({ id, label, defaultValue, type }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
                        <input id={id} type={type} defaultValue={defaultValue} className="input-premium" />
                      </div>
                    ))}
                    <button type="submit" className="mt-2 px-6 py-3 bg-sage-600 hover:bg-sage-700 text-white text-sm font-medium rounded-xl transition-colors focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2">
                      Save changes
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
