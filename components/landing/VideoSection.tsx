"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Play, CheckCircle } from "lucide-react";
import { toYouTubeEmbedUrl, extractYouTubeId } from "@/lib/youtube";

interface VideoSectionProps {
  title?: string;
  description?: string;
  youtubeUrl: string;
  trustPoints?: string[];
}

const DEFAULT_TRUST_POINTS = [
  "Delivered within hours of sourcing",
  "No preservatives or additives",
  "Premium quality from certified farms",
];

export default function VideoSection({
  title = "See how freshness becomes a daily ritual",
  description = "Watch how Pura sources, chills, and delivers premium dairy with care, precision, and uncompromising freshness.",
  youtubeUrl,
  trustPoints = DEFAULT_TRUST_POINTS,
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const embedUrl = toYouTubeEmbedUrl(youtubeUrl, { autoplay: false });
  const videoId = extractYouTubeId(youtubeUrl);
  const isValid = !!embedUrl && !!videoId;

  const autoplayEmbedUrl = toYouTubeEmbedUrl(youtubeUrl, { autoplay: true, mute: true });

  return (
    <section
      ref={ref}
      className="section-padding overflow-hidden"
      style={{ background: "linear-gradient(160deg, #FDFAF5 0%, #F5EEE4 100%)" }}
    >
      <div className="container-premium">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-5">
            <span className="label-md">Our Story</span>
          </div>
          <h2 className="display-lg text-stone-900 mb-5">{title}</h2>
          <p className="text-stone-500 text-lg leading-relaxed">{description}</p>
        </motion.div>

        {/* Video + trust layout */}
        <div className="grid lg:grid-cols-[1fr_260px] gap-10 items-center max-w-5xl mx-auto">

          {/* Video frame */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="relative"
          >
            {isValid ? (
              <div
                className="relative w-full overflow-hidden rounded-2xl border border-stone-200/60 shadow-2xl"
                style={{ paddingTop: "56.25%" /* 16:9 */ }}
              >
                {!isPlaying ? (
                  /* Thumbnail / poster state */
                  <>
                    <img
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                      alt="Video thumbnail"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {/* Dark overlay */}
                    <div className="absolute inset-0 bg-stone-900/30" />
                    {/* Play button */}
                    <button
                      onClick={() => setIsPlaying(true)}
                      aria-label="Play video"
                      className="absolute inset-0 flex items-center justify-center group"
                    >
                      <motion.div
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.96 }}
                        className="w-18 h-18 rounded-full bg-white/95 flex items-center justify-center shadow-xl"
                        style={{ width: 72, height: 72 }}
                      >
                        <Play size={28} className="text-sage-600 ml-1" fill="currentColor" />
                      </motion.div>
                    </button>
                    {/* Bottom label */}
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm text-white text-xs rounded-full font-medium">
                        Watch the Story
                      </span>
                    </div>
                  </>
                ) : (
                  <iframe
                    className="absolute inset-0 w-full h-full"
                    src={autoplayEmbedUrl ?? embedUrl}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                )}
              </div>
            ) : (
              /* Invalid URL fallback */
              <div
                className="w-full rounded-2xl border border-stone-200/60 bg-stone-100 flex flex-col items-center justify-center text-stone-400 gap-3"
                style={{ paddingTop: "56.25%", position: "relative" }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <Play size={36} className="opacity-40" />
                  <p className="text-sm">Invalid YouTube URL</p>
                </div>
              </div>
            )}

            {/* Subtle glow beneath */}
            <div
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-3/4 h-16 blur-2xl opacity-30 -z-10"
              style={{ background: "radial-gradient(ellipse, #8DAD8D, transparent)" }}
              aria-hidden="true"
            />
          </motion.div>

          {/* Trust bullets */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
            className="space-y-5"
          >
            <h3 className="font-display text-xl text-stone-800 font-semibold leading-snug">
              Inside the Pura Promise
            </h3>
            <div className="space-y-4">
              {trustPoints.map((point) => (
                <div key={point} className="flex gap-3 items-start">
                  <CheckCircle
                    size={18}
                    className="text-sage-600 flex-shrink-0 mt-0.5"
                    strokeWidth={2.2}
                  />
                  <p className="text-stone-600 text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>

            {/* Decorative farm-fresh pill */}
            <div className="pt-2">
              <span className="badge-amber text-amber-600">
                Farm to door · under 12 hours
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
