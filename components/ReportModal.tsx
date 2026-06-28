"use client";
import { useState } from 'react';

export default function ReportModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const handleSubmit = async () => {
    // Basic validation
    if (!name || !desc) {
      alert("Please provide both your name and a description.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (pos) => {
      await fetch('/api/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          name: name, // This is required for the Top Contributor logic
          description: desc
        })
      });
      onClose();
      window.location.reload(); 
    }, (err) => {
      alert("Geolocation failed: " + err.message);
    });
  };

  return (
    <div className="fixed inset-0 z-[9999] bg-black/80 flex items-center justify-center p-6">
      <div className="bg-zinc-900 border border-zinc-700 p-8 w-full max-w-sm space-y-4">
        <h2 className="text-xl font-black uppercase tracking-tighter">Report New Slap</h2>
        
        <input 
          className="w-full bg-black p-3 border border-zinc-700 text-white font-mono text-xs"
          placeholder="Name / Handle..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        
        <input 
          className="w-full bg-black p-3 border border-zinc-700 text-white font-mono text-xs"
          placeholder="Location Description..."
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <div className="flex gap-2 pt-2">
          <button onClick={handleSubmit} className="flex-1 py-3 bg-white text-black font-bold uppercase text-[10px] hover:bg-zinc-200 transition-all">Submit</button>
          <button onClick={onClose} className="flex-1 py-3 border border-zinc-700 text-white font-bold uppercase text-[10px] hover:border-zinc-500 transition-all">Cancel</button>
        </div>
      </div>
    </div>
  );
}