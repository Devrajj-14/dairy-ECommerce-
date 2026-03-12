"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Check, Tag, Truck, CreditCard, ShoppingBag, ArrowRight } from "lucide-react";
import { products } from "@/lib/data";
import Link from "next/link";

const steps = ["Cart", "Delivery", "Payment"] as const;
type Step = (typeof steps)[number];

const demoCartItems = [
  { product: products[0], qty: 2, isSubscription: true },
  { product: products[4], qty: 1, isSubscription: false },
];

export default function CartPage() {
  const [step, setStep] = useState<Step>("Cart");
  const [cartItems] = useState(demoCartItems);
  const [form, setForm] = useState({ name: "", phone: "", address: "", city: "", pincode: "", deliveryTime: "morning" });
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const isEmpty = cartItems.length === 0;

  const subtotal = cartItems.reduce((a, b) => a + b.product.pricePerUnit * b.qty, 0);
  const delivery = 0;
  const total = subtotal + delivery;
  const stepIndex = steps.indexOf(step);

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const goBack = () => {
    if (step === "Payment") setStep("Delivery");
    else if (step === "Delivery") setStep("Cart");
  };

  // ─── Empty cart state ──────────────────────────────────────────
  if (isEmpty) {
    return (
      <div className="min-h-screen bg-cream-50 pt-24">
        <div className="container-premium py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-md mx-auto"
          >
            <div className="w-24 h-24 rounded-full bg-cream-100 border border-stone-200 flex items-center justify-center mx-auto mb-8">
              <ShoppingBag size={36} strokeWidth={1.2} className="text-stone-300" />
            </div>
            <h1 className="font-display text-3xl text-stone-900 mb-3">Your cart is empty</h1>
            <p className="text-stone-500 text-sm leading-relaxed mb-8">
              Looks like you haven't added any products yet. Explore our collection of farm-fresh dairy delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-sage-600 hover:bg-sage-700 text-white text-sm font-semibold rounded-xl transition-all duration-300 hover:shadow-md group"
              >
                Browse Products
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/custom"
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-stone-300 hover:border-stone-400 text-stone-700 hover:text-stone-900 text-sm font-medium rounded-xl transition-all duration-200"
              >
                Build Your Milk
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50 pt-24">
      <div className="container-premium py-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="display-md text-stone-900 mb-8">
            {step === "Cart" ? "Your Cart" : step === "Delivery" ? "Delivery Details" : "Payment"}
          </h1>
        </motion.div>

        {/* Step indicator */}
        <div className="flex items-center gap-2 mb-10">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${
                i <= stepIndex ? "text-stone-900" : "text-stone-300"
              }`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all duration-300 ${
                  i < stepIndex
                    ? "bg-sage-600 border-sage-600 text-white"
                    : i === stepIndex
                    ? "border-stone-900 text-stone-900"
                    : "border-stone-200 text-stone-300"
                }`}>
                  {i < stepIndex ? <Check size={12} strokeWidth={3} /> : i + 1}
                </div>
                {s}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-px transition-colors ${i < stepIndex ? "bg-sage-500" : "bg-stone-200"}`} />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: step content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {step === "Cart" && (
                <motion.div key="cart" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
                  <div className="space-y-4">
                    {cartItems.map(({ product, qty, isSubscription }) => (
                      <div key={product.id} className="flex items-center gap-5 p-5 bg-cream-100 border border-stone-200 rounded-2xl">
                        <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-amber-50 to-cream-200 flex items-center justify-center text-3xl shrink-0">
                          {product.category === "fresh-milk" ? "🥛" :
                           product.category === "curd" ? "🍶" :
                           product.category === "ghee" ? "✨" : "🥛"}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-stone-900">{product.name}</p>
                          <p className="text-xs text-stone-400 mt-0.5">{product.quantity}{product.quantityUnit} × {qty}</p>
                          {isSubscription && <span className="badge-sage text-xs mt-1">Subscribe & Save 5%</span>}
                        </div>
                        <div className="text-right">
                          <p className="font-display text-lg font-bold text-stone-900">₹{product.pricePerUnit * qty}</p>
                          <p className="text-xs text-stone-400">₹{product.pricePerUnit}/unit</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Coupon */}
                  <div className="mt-6 flex gap-2">
                    <label htmlFor="coupon" className="sr-only">Coupon code</label>
                    <div className="relative flex-1">
                      <Tag size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
                      <input id="coupon" type="text" placeholder="Enter coupon code" className="input-premium pl-9 text-sm py-3" />
                    </div>
                    <button className="px-5 py-3 bg-stone-900 text-white text-sm font-medium rounded-xl hover:bg-stone-800 transition-colors focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2">Apply</button>
                  </div>

                  <button
                    onClick={() => setStep("Delivery")}
                    className="mt-8 w-full py-4 bg-sage-600 hover:bg-sage-700 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 group"
                  >
                    Continue to Delivery
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}

              {step === "Delivery" && (
                <motion.div key="delivery" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 font-medium mb-6 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Back to Cart
                  </button>
                  <form onSubmit={(e) => { e.preventDefault(); setStep("Payment"); }} className="space-y-5">
                    {[
                      { id: "name", label: "Full name", type: "text", placeholder: "Arjun Mehta" },
                      { id: "phone", label: "Mobile number", type: "tel", placeholder: "+91 98765 43210" },
                      { id: "address", label: "Delivery address", type: "text", placeholder: "House / Flat, Street name" },
                      { id: "city", label: "City", type: "text", placeholder: "Bengaluru" },
                      { id: "pincode", label: "PIN code", type: "text", placeholder: "560001" },
                    ].map(({ id, label, type, placeholder }) => (
                      <div key={id}>
                        <label htmlFor={id} className="block text-sm font-medium text-stone-700 mb-1.5">{label}</label>
                        <input
                          id={id}
                          name={id}
                          type={type}
                          placeholder={placeholder}
                          value={form[id as keyof typeof form]}
                          onChange={handleField}
                          required
                          className="input-premium"
                        />
                      </div>
                    ))}

                    <div>
                      <label htmlFor="deliveryTime" className="block text-sm font-medium text-stone-700 mb-1.5">Preferred delivery time</label>
                      <select
                        id="deliveryTime"
                        name="deliveryTime"
                        value={form.deliveryTime}
                        onChange={handleField}
                        className="input-premium"
                      >
                        <option value="morning">Morning — Before 7 AM</option>
                        <option value="evening">Evening — 5–7 PM</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-sage-600 hover:bg-sage-700 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 group"
                    >
                      Continue to Payment
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </motion.div>
              )}

              {step === "Payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.35 }}>
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-700 font-medium mb-6 transition-colors"
                  >
                    <ChevronLeft size={16} />
                    Back to Delivery
                  </button>
                  <div className="space-y-4 mb-8">
                    {[
                      { id: "upi", label: "UPI", desc: "Pay via GPay, PhonePe, or any UPI app", icon: "💳" },
                      { id: "card", label: "Credit / Debit Card", desc: "All major banks accepted", icon: "🏧" },
                      { id: "netbanking", label: "Net Banking", desc: "Direct bank transfer", icon: "🏦" },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedPayment(method.id)}
                        className={`w-full flex items-center gap-4 p-5 border-2 rounded-xl text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 ${
                          selectedPayment === method.id
                            ? "border-sage-600 bg-sage-600/5 shadow-sm"
                            : "border-stone-200 bg-cream-100 hover:border-stone-300"
                        }`}
                      >
                        <span className="text-2xl">{method.icon}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-stone-900 text-sm">{method.label}</p>
                          <p className="text-xs text-stone-400">{method.desc}</p>
                        </div>
                        {selectedPayment === method.id && (
                          <div className="w-5 h-5 rounded-full bg-sage-600 flex items-center justify-center shrink-0">
                            <Check size={10} className="text-white" strokeWidth={3} />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => alert("Order placed! Thank you for choosing Pura.")}
                    disabled={!selectedPayment}
                    className="w-full py-4 bg-sage-600 hover:bg-sage-700 text-white text-base font-semibold rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 focus-visible:ring-2 focus-visible:ring-sage-600 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <CreditCard size={20} />
                    Pay ₹{total} — Confirm Order
                  </button>

                  <div className="mt-5 flex items-center justify-center gap-2 text-xs text-stone-400">
                    <Truck size={14} className="text-sage-500" />
                    <span>Free delivery · 128-bit SSL encryption · FSSAI certified</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order summary sidebar */}
          <div>
            <div className="bg-cream-100 border border-stone-200 rounded-2xl p-6 sticky top-28">
              <h2 className="text-sm font-semibold text-stone-700 mb-4">Order Summary</h2>

              <div className="space-y-2.5 mb-5">
                {cartItems.map(({ product, qty }) => (
                  <div key={product.id} className="flex justify-between text-sm">
                    <span className="text-stone-600">{product.shortName} × {qty}</span>
                    <span className="font-medium text-stone-900">₹{product.pricePerUnit * qty}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-stone-200 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Subtotal</span>
                  <span className="text-stone-700">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-stone-500">Delivery</span>
                  <span className="text-sage-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-stone-200">
                  <span>Total</span>
                  <span className="font-display text-xl">₹{total}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
