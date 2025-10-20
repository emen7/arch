// Wave-Energy infographic layout - no footer/header, just full-screen content with fixed positioning
export default function WaveEnergyLayout({ children }) {
  return (
    <div className="fixed inset-0 w-screen h-screen overflow-hidden">
      {children}
    </div>
  )
}
