// Wave-Energy infographic layout - no footer/header, just full-screen content with fixed positioning
export default function WaveEnergyLayout({ children }) {
  return (
    <>
      <style jsx global>{`
        /* Custom horizontal scrollbar for infographic */
        .infographic-scroll::-webkit-scrollbar {
          height: 12px;
        }
        .infographic-scroll::-webkit-scrollbar-track {
          background: #0f172a;
        }
        .infographic-scroll::-webkit-scrollbar-thumb {
          background: #475569;
          border-radius: 6px;
        }
        .infographic-scroll::-webkit-scrollbar-thumb:hover {
          background: #64748b;
        }
        /* Firefox scrollbar */
        .infographic-scroll {
          scrollbar-width: thin;
          scrollbar-color: #475569 #0f172a;
        }
      `}</style>
      <div className="fixed inset-0 w-screen h-screen overflow-x-auto overflow-y-hidden infographic-scroll">
        {children}
      </div>
    </>
  )
}
