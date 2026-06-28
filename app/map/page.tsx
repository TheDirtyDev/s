"use client";
import { useState } from 'react';
import { motion } from "framer-motion";
import dynamic from 'next/dynamic';
import stickers from '@/data/stickers.json';
import ReportModal from '@/components/ReportModal';

const SlapMap = dynamic(() => import('@/components/SlapMap'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-zinc-950 flex items-center justify-center font-mono text-[10px] text-zinc-700 animate-pulse">STREAMING GEOSPATIAL DATA...</div>
});

export default function MapPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Logic moved inside the component
    const totalSlaps = stickers.length;
    const mostRecent = [...stickers].reverse().slice(0, 3);

    const counts = stickers.reduce((acc: any, curr: any) => {
        acc[curr.name] = (acc[curr.name] || 0) + 1;
        return acc;
    }, {});

    // Fixed Type Error: Added explicit types and handled empty state
    const sortedEntries = Object.entries(counts).sort((a: any, b: any) => (b[1] as number) - (a[1] as number));
    const topPoster: [string, number] = (sortedEntries[0] as [string, number]) || ["N/A", 0];

    return (
        <main className="min-h-screen bg-black text-white p-4 md:p-12 selection:bg-zinc-800">
            {isModalOpen && <ReportModal onClose={() => setIsModalOpen(false)} />}

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-6">

                {/* Sidebar */}
                <div className="space-y-6 lg:col-span-1 z-10">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tighter">SLAP MAP</h1>
                        <p className="text-[10px] text-zinc-500 font-mono mt-1">// FIELD OPS MONITOR</p>
                    </div>

                    <StatCard label="Total Slaps" value={totalSlaps} />

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h2 className="text-[9px] text-zinc-500 uppercase tracking-widest">// RECENT SLAPS</h2>
                            {mostRecent.map((s: any, i: number) => (
                                <div key={i} className="flex justify-between text-[10px] border-b border-zinc-900 py-2">
                                    <span className="text-white font-bold truncate pr-2">{s.name}</span>
                                    <span className="text-zinc-500 font-mono shrink-0">{s.description.slice(0, 8)}...</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-[9px] text-zinc-500 uppercase tracking-widest">// TOP CONTRIBUTOR</h2>
                            <div className="p-3 border border-zinc-800 bg-zinc-900/30 flex justify-between items-center">
                                <span className="text-sm font-bold truncate">{topPoster[0]}</span>
                                {/* Now safely rendering a number */}
                                <span className="text-[10px] font-mono text-zinc-400 shrink-0">{topPoster[1]} SLAPS</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-zinc-900">
                        <button onClick={() => setIsModalOpen(true)} className="w-full py-4 lg:py-3 border border-white text-[10px] font-bold uppercase hover:bg-white hover:text-black transition-all touch-manipulation">
                            + Report New Slap
                        </button>
                        <a href="/" className="block w-full py-4 lg:py-3 border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase text-center hover:border-zinc-500 hover:text-white transition-all">
                            Back to Home
                        </a>
                    </div>
                </div>

                {/* Intelligence Center */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="lg:col-span-3 h-[400px] lg:h-[600px] border border-zinc-800 bg-zinc-950 relative overflow-hidden shadow-2xl"
                >
                    <SlapMap data={stickers} />
                    <div className="absolute top-4 right-4 z-[1000] px-3 py-1 bg-black/80 border border-zinc-800 text-[10px] text-green-500 font-mono uppercase tracking-widest">
                        STATUS: LIVE
                    </div>
                </motion.div>

                {/* Protocol Footer */}
                <div className="lg:col-start-2 lg:col-span-3 border border-zinc-800 bg-zinc-900/20 p-5 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                        <h2 className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">// INSTRUCTION</h2>
                        <p className="text-[10px] text-zinc-400 font-mono">Found a sticker by us? Please report it.</p>
                        <p className="text-[10px] text-zinc-400 font-mono">Press the "Report New Slap" button to submit your findings.</p>

                    </div>
                    <div className="flex gap-8 justify-between md:justify-end">
                        <div>
                            <div className="text-[9px] text-zinc-600 uppercase">Compliance</div>
                            <div className="text-[10px] font-mono">Do Not Report Fake Stickers</div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatCard({ label, value }: { label: string, value: string | number }) {
    return (
        <div className="p-4 border border-zinc-800 bg-zinc-900/30">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="text-2xl font-mono font-bold mt-1">{value}</div>
        </div>
    );
}