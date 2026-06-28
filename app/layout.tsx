// app/layout.tsx
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-black text-white">
      <body className="relative overflow-x-hidden">
        {/* Scanline Overlay */}
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden opacity-10">
          <div className="animate-scanline h-full w-full bg-[linear-gradient(transparent_50%,rgba(255,255,255,0.1)_50%)] bg-[length:100%_4px]"></div>
        </div>
        {children}
      </body>
    </html>
  );
}