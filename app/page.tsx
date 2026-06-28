"use client";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center p-6 bg-black overflow-hidden selection:bg-white selection:text-black">

      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 z-0 opacity-20"
        style={{ backgroundImage: `radial-gradient(#333 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

        {/* Animated Manifesto Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="group relative inline-flex items-center gap-3 px-4 py-1.5 border border-zinc-800 rounded-full bg-zinc-900/30 backdrop-blur-md overflow-hidden"
        >
          {/* Shimmer Effect */}
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-700/20 to-transparent skew-x-[-20deg]"
          />

          <span className="text-[10px] font-mono tracking-[0.2em] text-zinc-500 uppercase">
            slöpe
          </span>
          <div className="w-[1px] h-3 bg-zinc-700" />
          <span className="text-[10px] font-mono tracking-[0.2em] text-white uppercase italic">
            Crafted With Care
          </span>
        </motion.div>

        {/* 10x Upgraded: Real Glitch Title */}
        <h1 className="relative text-7xl md:text-9xl font-black tracking-tighter uppercase leading-none select-none">

          {/* The Main Text - acts as a container */}
          <span className="relative z-10 block text-white opacity-90">
            SHRED.
            <span className="block text-zinc-600">SLOPE.</span>
          </span>

          {/* Glitch Layer 1 - Magenta/Red (RGB Shift) */}
          <motion.span
            animate={{
              clipPath: [
                "inset(80% 0 0 0)", "inset(10% 0 40% 0)", "inset(50% 0 10% 0)",
                "inset(10% 0 40% 0)", "inset(0% 0 85% 0)", "inset(0% 0 0% 0)"
              ],
              x: [0, -5, 5, -2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              repeatDelay: 0.1, // Short bursts of glitch
            }}
            className="absolute inset-0 z-0 block text-magenta-500 opacity-60 mix-blend-screen"
            style={{ clipPath: "inset(80% 0 0 0)" }} // Base state
          >
            SHRED.
            <span className="block text-magenta-800">SLOPE.</span>
          </motion.span>

          {/* Glitch Layer 2 - Cyan/Blue (RGB Shift) */}
          <motion.span
            animate={{
              clipPath: [
                "inset(10% 0 60% 0)", "inset(60% 0 5% 0)", "inset(20% 0 20% 0)",
                "inset(80% 0 0% 0)", "inset(40% 0 55% 0)", "inset(0% 0 0% 0)"
              ],
              x: [0, 5, -5, 2, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "easeInOut",
              delay: 0.05, // Staggered start
              repeatDelay: 0.1,
            }}
            className="absolute inset-0 z-0 block text-cyan-400 opacity-60 mix-blend-screen"
            style={{ clipPath: "inset(10% 0 60% 0)" }} // Base state
          >
            SHRED.
            <span className="block text-cyan-700">SLOPE.</span>
          </motion.span>
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="space-y-2"
        >
          {[
            "// CREATING THE NEXT GENERATION OF SLOPE GEAR.",
            "// DESIGNED FOR PERFORMANCE, BUILT FOR STYLE.",
            "// JOIN US ON OUR JOURNEY TO THE TOP."
          ].map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.2), duration: 0.5 }}
              className="text-zinc-400 font-mono text-xs md:text-sm tracking-tight"
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        <div className="flex flex-col md:flex-row justify-center gap-4 pt-8">
          {/* Primary Store Button */}
          <a
            href="https://shredwithslope.square.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative px-8 py-4 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-zinc-200 transition-all active:scale-95"
          >
            Access Store
            <div className="absolute inset-0 border border-white translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
          </a>

          {/* Secondary Sticker Map Button */}
          <a
            href="/map"
            className="group relative px-8 py-4 border border-zinc-700 text-zinc-400 font-bold uppercase tracking-widest text-xs hover:border-white hover:text-white transition-all active:scale-95"
          >
            Sticker Map
            <div className="absolute inset-0 border border-zinc-800 translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
          </a>
        </div>

        {/* Aesthetic Footer */}
        <footer className="absolute bottom-6 text-[10px] text-zinc-700 font-mono uppercase tracking-widest">
          Est. 2026 // Founded In Massachusetts
        </footer>
    </main>
  );
}
