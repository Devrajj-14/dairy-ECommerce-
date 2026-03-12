"use client";
import Link from "next/link";
import { Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";

const footerLinks = {
  shop: [
    { label: "A2 Cow Milk", href: "/product/a2-cow-milk-1l" },
    { label: "Buffalo Milk", href: "/product/buffalo-milk-1l" },
    { label: "Bilona Ghee", href: "/product/bilona-ghee-500ml" },
    { label: "Fresh Curd & Paneer", href: "/shop" },
  ],
  services: [
    { label: "Daily Subscription", href: "/subscribe" },
    { label: "Build Your Milk", href: "/custom" },
    { label: "Corporate Orders", href: "/corporate" },
    { label: "Gift a Subscription", href: "/gift" },
  ],
  company: [
    { label: "Our Story", href: "/about" },
    { label: "Farm Sourcing", href: "/about#sourcing" },
    { label: "Quality Standards", href: "/about#quality" },
    { label: "Careers", href: "/careers" },
  ],
  support: [
    { label: "Help Center", href: "/help" },
    { label: "Delivery Info", href: "/delivery" },
    { label: "Pause Subscription", href: "/dashboard" },
    { label: "Contact Us", href: "/contact" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300" role="contentinfo">
      {/* Main footer */}
      <div className="container-premium py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center gap-2.5 group" aria-label="Pura home">
              <span className="w-9 h-9 rounded-full bg-sage-gradient flex items-center justify-center shadow-md">
                <span className="text-white font-display font-bold text-base leading-none">P</span>
              </span>
              <span className="font-display text-2xl font-600 text-white tracking-tight">Pura</span>
            </Link>
            <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
              Farm freshness delivered with precision. We believe the best milk is the one you know — where it came from, how it was made, and when it left the farm.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-stone-400">
                <MapPin size={15} strokeWidth={1.5} className="text-sage-400 shrink-0" />
                <span>Anand, Gujarat · Serving pan-India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-400">
                <Phone size={15} strokeWidth={1.5} className="text-sage-400 shrink-0" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
              </div>
              <div className="flex items-center gap-3 text-sm text-stone-400">
                <Mail size={15} strokeWidth={1.5} className="text-sage-400 shrink-0" />
                <a href="mailto:hello@puradairy.in" className="hover:text-white transition-colors">hello@puradairy.in</a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {[
                { icon: Instagram, href: "#", label: "Instagram" },
                { icon: Twitter, href: "#", label: "Twitter" },
                { icon: Linkedin, href: "#", label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-full border border-stone-700 flex items-center justify-center text-stone-400 hover:text-white hover:border-stone-500 transition-all duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { heading: "Shop", links: footerLinks.shop },
            { heading: "Services", links: footerLinks.services },
            { heading: "Company", links: footerLinks.company },
            { heading: "Support", links: footerLinks.support },
          ].map(({ heading, links }) => (
            <div key={heading}>
              <h3 className="label-md text-stone-500 mb-5">{heading}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-400 hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-12 border-t border-stone-800/60">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-white mb-1">Morning Notes from Pura</h3>
              <p className="text-sm text-stone-400">Seasonal produce alerts, farm stories, and subscriber-only offers.</p>
            </div>
            <form
              className="flex w-full md:w-auto gap-2"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Newsletter signup"
            >
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                placeholder="you@email.com"
                className="w-full md:w-64 input-premium bg-stone-800 border-stone-700 text-stone-100 placeholder-stone-500 text-sm py-3 px-4"
                aria-required="true"
              />
              <button
                type="submit"
                className="shrink-0 px-5 py-3 bg-sage-600 hover:bg-sage-500 text-white text-sm font-medium rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-stone-800/60">
        <div className="container-premium py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-500">
          <p>© 2025 Pura Dairy Pvt. Ltd. · FSSAI Lic. 10019022016050</p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="hover:text-stone-300 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-stone-300 transition-colors">Terms of Use</Link>
            <Link href="/refund" className="hover:text-stone-300 transition-colors">Refund Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
