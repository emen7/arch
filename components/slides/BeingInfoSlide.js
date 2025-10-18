// Template for Being Infographic slides (MPCs, Midwayers, Archangels, etc.)

export default function BeingInfoSlide({
  name,
  classification,
  characteristics,
  capabilities,
  note
}) {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center mb-12 border-b-2 border-light-border dark:border-dark-border pb-6">
        <h2 className="text-5xl font-bold mb-3 text-text-light dark:text-text-dark">
          {name}
        </h2>
        {classification && (
          <p className="text-2xl text-text-muted-light dark:text-text-muted-dark italic">
            {classification}
          </p>
        )}
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-2 gap-12">
        {/* Characteristics */}
        <div>
          <h3 className="text-3xl font-semibold mb-6 text-text-light dark:text-text-dark">
            Characteristics
          </h3>
          <ul className="text-xl space-y-3 list-disc ml-6 text-text-light dark:text-text-dark">
            {characteristics.map((char, index) => (
              <li key={index}>{char}</li>
            ))}
          </ul>
        </div>

        {/* Capabilities */}
        <div>
          <h3 className="text-3xl font-semibold mb-6 text-text-light dark:text-text-dark">
            Capabilities
          </h3>
          <ul className="text-xl space-y-3 list-disc ml-6 text-text-light dark:text-text-dark">
            {capabilities.map((cap, index) => (
              <li key={index}>{cap}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Optional note */}
      {note && (
        <div className="mt-12 p-4 bg-light-bg dark:bg-dark-bg rounded-lg border border-light-border dark:border-dark-border">
          <p className="text-lg text-text-muted-light dark:text-text-muted-dark italic">
            {note}
          </p>
        </div>
      )}
    </div>
  )
}
