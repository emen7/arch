export const metadata = {
  title: 'About | Revelationary Research',
  description: 'Learn about the research methodology and approach used in exploring Urantia Book revelations.',
}

export default function AboutPage() {
  return (
    <div className="max-w-[65ch] mx-auto space-y-8">
      <h1 className="text-4xl font-bold text-text-light dark:text-text-dark">
        About This Research
      </h1>

      <section className="space-y-4 text-text-light dark:text-text-dark">
        <h2 className="text-2xl font-semibold">Research Approach</h2>
        <p className="leading-relaxed">
          These reports explore tangentially revealed information in the Urantia Papers, applying rigorous analytical
          methods to understand complex phenomena described in the text. Each study treats revelation as a database
          of information worthy of serious academic investigation.
        </p>
        <p className="leading-relaxed">
          The methodology correlates revealed content with observable evidence, scientific principles, and forensic
          analysis. By examining the Papers as a coherent information source, patterns emerge that illuminate both
          spiritual truths and material realities.
        </p>
      </section>

      <section className="space-y-4 text-text-light dark:text-text-dark">
        <h2 className="text-2xl font-semibold">Researcher</h2>
        <p className="leading-relaxed">
          <strong>David Neufer</strong> conducts independent research exploring the Urantia Book through scientific,
          forensic, and analytical lenses. His work demonstrates how revealed information can be systematically studied
          to yield new insights into both ancient events and universal principles.
        </p>
        <p className="leading-relaxed">
          The research presented here was prepared for the Urantia Science Symposium and broader academic discussion.
        </p>
      </section>

      <section className="space-y-4 text-text-light dark:text-text-dark">
        <h2 className="text-2xl font-semibold">Methodology</h2>
        <p className="leading-relaxed">
          Each report employs a distinctive investigative approach:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>
            <strong>Forensic Reconstruction:</strong> Assembling multiple evidence trails from revealed text to
            establish geographic, temporal, and physical parameters
          </li>
          <li>
            <strong>Scientific Correlation:</strong> Connecting revealed physics with contemporary scientific
            understanding and experimental findings
          </li>
          <li>
            <strong>Systematic Analysis:</strong> Treating revelation as structured information that can be
            cross-referenced, validated, and examined for internal consistency
          </li>
        </ul>
      </section>

      <section className="space-y-4 text-text-light dark:text-text-dark">
        <h2 className="text-2xl font-semibold">AI Disclosure</h2>
        <p className="leading-relaxed">
          These investigations were conducted with assistance from Claude AI for systematic evidence coordination,
          citation verification, and document structuring. The AI assists with cross-referencing, identifying relevant
          passages, organizing constraint categories, and ensuring citation accuracy.
        </p>
        <p className="leading-relaxed">
          All forensic methodology, interpretive analysis, hypothesis development, and investigative conclusions are
          derived from human research and interpretation of revealed evidence. The research methodology, conceptual
          breakthroughs, and final responsibility rest entirely with the researcher.
        </p>
      </section>

      <section className="space-y-4 text-text-light dark:text-text-dark">
        <h2 className="text-2xl font-semibold">Contact</h2>
        <p className="leading-relaxed">
          For questions, comments, or discussion about this research, please reach out through the Urantia community
          channels or academic forums focused on Urantia Book studies.
        </p>
      </section>
    </div>
  )
}
