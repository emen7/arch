import Image from 'next/image'
import Citation from '@/components/Citation'

export default function JosephsTombContent() {
  return (
    <>
      {/* Figure 1 - Opening Image */}
      <figure className="my-8">
        <Image
          src="/images/josephs-tomb/Tomb Garden cr.jpg"
          alt="The Garden Tomb, Jerusalem"
          width={800}
          height={600}
          className="rounded-lg"
        />
        <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
          FIGURE 1. THE GARDEN TOMB, JERUSALEM
        </figcaption>
      </figure>

      <section className="mb-12">
        <h2>Introduction: Lines of Investigation</h2>
        <p>
          "Where have you taken the Master? Where have they laid him?" Mary Magdalene,
          addressing a stranger she thought "might be the caretaker of the garden," desperately
          sought the missing body of Jesus (189:4.10). Her question at dawn on that resurrection
          morning invites our investigation—where exactly was this place?
        </p>
        <p>
          The Urantia Papers provide remarkably specific details about Joseph's tomb, details that,
          when carefully assembled, point toward precise geographic identification. This
          investigation follows five distinct trails of evidence through the revelatory account: the
          crucifixion route establishing our geographic baseline, the panicked flight of tomb guards
          revealing distance constraints, five women encountering fleeing soldiers at Damascus
          Gate, the temple captain's disposal of burial cloths "over a near-by cliff," and the tomb's
          precise specifications—dimensions, sealing system, garden setting, architectural
          orientation.
        </p>
        <p>
          Each evidence trail narrows the possibilities. Combined, they converge on less than 30
          acres of Jerusalem terrain. The Urantia Papers didn't merely describe a tomb; they
          provided forensic coordinates for those willing to carefully map the evidence.
        </p>
      </section>

      <section className="mb-12">
        <h2>Crucifixion Route and Timing</h2>
        <p>
          Just before nine o'clock on that Friday morning, Roman soldiers led Jesus from the
          praetorium toward Golgotha<Citation num={1} />. The route selection tells us something important—while
          condemned criminals typically paraded through Jerusalem's longest streets for maximum
          public viewing, on this day they took "the most direct route to the Damascus gate, which
          led out of the city to the north"<Citation num={2} />.
        </p>
        <p>
          This northward procession passed through Damascus Gate and continued along the road
          leading toward Samaria. Following this road, they "soon arrived at Golgotha," Jerusalem's
          official crucifixion site<Citation num={3} />.
        </p>
        <p>
          One detail proves particularly significant: Jesus collapsed from exhaustion "shortly after
          passing through the gate"<Citation num={4} />. At this precise location outside the city walls, the soldiers
          conscripted Simon of Cyrene, who happened to be stopping there with other Cyrenians<Citation num={5} />.
          Simon carried the crossbeam the remaining distance.
        </p>
        <p>
          The journey's timeline gives us our first measurement. Departing just before nine o'clock,
          the procession arrived at Golgotha "shortly after nine o'clock"<Citation num={6} />—less than one hour total,
          with most of the distance covered after Jesus collapsed at Damascus Gate. This places
          Golgotha north of Damascus Gate, along the northward road, within a one-hour walking
          distance.
        </p>
      </section>

      <section className="mb-12">
        <h2>Guard Flight Pattern</h2>
        <p>
          The tomb's security arrangement involved both Roman and Jewish guards—ten soldiers
          provided by Pilate, supplemented by ten temple guards<Citation num={7} />. These professional soldiers
          maintained watch through standard military shifts until "the hour of the resurrection"<Citation num={8} />.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Critical Timing Sequence</h3>

        {/* Visual table for sighted users */}
        <div className="my-8 overflow-x-auto" aria-hidden="true">
          <table className="min-w-full border border-light-border dark:border-dark-border">
            <thead className="bg-light-card dark:bg-dark-card">
              <tr>
                <th className="px-4 py-2 border border-light-border dark:border-dark-border text-left">Event</th>
                <th className="px-4 py-2 border border-light-border dark:border-dark-border text-left">Time</th>
                <th className="px-4 py-2 border border-light-border dark:border-dark-border text-left">Significance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Morontia emergence</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">3:02 AM</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Jesus emerges from tomb in morontia form<Citation num={9} /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Archangel request</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">3:10 AM</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Chief requests custody of physical remains<Citation num={10} /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Stone rolling begins</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">~3:10 AM</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Midwayers commence operation<Citation num={11} /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Guards flee</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">~3:10-3:15 AM</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Witness stone moving "of its own accord"<Citation num={12} /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Damascus Gate encounter</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">~3:20-3:25 AM</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Women meet fleeing guards<Citation num={13} /></td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Women reach tomb</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">3:30 AM</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Find stone rolled away<Citation num={14} /></td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 2. SEQUENCE OF EVENTS
          </p>
        </div>

        {/* Screen reader / TTS alternative */}
        <div className="sr-only" role="region" aria-label="Figure 2 data description">
          <p>Figure 2. Sequence of Events shows:</p>
          <p>
            At 3:02 AM, Jesus emerged from the tomb in morontia form. Eight minutes later, at 3:10 AM,
            the archangel chief requested custody of the physical remains. Shortly after 3:10 AM,
            midwayers commenced the stone-rolling operation. The guards witnessed the massive stone
            moving "of its own accord" and fled in panic. Between 3:20 and 3:25 AM, the five women
            encountered these fleeing guards at Damascus Gate. The women arrived at the tomb at
            3:30 AM and found the stone already rolled away.
          </p>
        </div>

        <p>
          The stone-rolling operation provides our forensic anchor. Secondary midwayers received
          the assignment to roll away the tomb stones<Citation num={15} />. When the guards on duty witnessed "this
          huge stone begin to roll away from the entrance of the tomb, apparently of its own
          accord—without any visible means to account for such motion—they were seized with
          fear and panic, and they fled in haste from the scene"<Citation num={16} />.
        </p>
        <p>
          These were soldiers who had installed the sealing system themselves. They knew the
          stone's weight intimately. Their abandonment of posts after witnessing the impossible
          reveals professional recognition of something beyond explanation.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Distance Calculations</h3>
        <p>
          The guards' flight time tells us the distance. Fleeing at approximately 3:10-3:15 AM, they
          reached Damascus Gate by 3:20-3:25 AM—a maximum transit of 10-15 minutes.
          Professional soldiers moving in panic would maintain 4-5 mph, yielding a maximum
          distance of 1.0-1.25 miles from tomb to gate.
        </p>
      </section>

      <section className="mb-12">
        <h2>The Women's Journey</h2>
        <p>
          Five women departed for the tomb "a little before three o'clock" that Sunday morning.
          Mary Magdalene, Mary the mother of the Alpheus twins, Salome, Joanna, and Susanna,
          carried special embalming lotions and additional linen bandages<Citation num={17} />. Their purpose: to
          complete the burial preparations interrupted by the Sabbath.
        </p>
        <p>
          Their direct route through Damascus Gate brought them to an unexpected encounter:
        </p>
        <blockquote>
          "As they passed out of the Damascus gate, they encountered a number of
          soldiers fleeing into the city more or less panic-stricken, and this caused
          them to pause for a few minutes; but when nothing more developed, they
          resumed their journey"<Citation num={18} />
        </blockquote>
        <p>
          After this brief pause, the women continued and arrived at the tomb "about half past three
          o'clock"<Citation num={19} />. This timing perfectly aligns with the guards' flight pattern—the soldiers had
          just enough time to reach Damascus Gate before the women passed through.
        </p>

        {/* Figure 3 - Damascus Gate */}
        <figure className="my-8">
          <Image
            src="/images/josephs-tomb/the-damscus-gate-around-1900-in-jerusalem-israel_800.jpg"
            alt="Damascus Gate circa 1900"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 3. DAMASCUS GATE CIRCA 1900
          </figcaption>
        </figure>
      </section>

      <section className="mb-12">
        <h2>Tomb Specifications from Revealed Text</h2>
        <p>
          The revelation provides precise details about the burial site. Joseph and Nicodemus had
          selected "Joseph's new family tomb, hewn out of solid rock, located a short distance north
          of Golgotha and across the road leading to Samaria"<Citation num={20} />.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Physical Dimensions and Features:</h3>
        <ul className="list-disc ml-8 space-y-2 mt-4 pl-5">
          <li>Chamber "about ten feet square" (~100 square feet)<Citation num={21} /></li>
          <li>Interior shelf for body placement<Citation num={22} /></li>
          <li>Dual-stone sealing system (large circular + smaller stone)<Citation num={23} /></li>
          <li>Primary stone "moved in a groove chiseled out of the rock"<Citation num={24} /></li>
          <li>Located "in his garden on the hillside"<Citation num={25} /></li>
          <li>Tomb "faced toward the east"<Citation num={26} /> (burial chamber orientation)</li>
        </ul>

        <p className="mt-6">
          The architectural arrangement proved significant for the discovery. The eastern
          orientation of the burial chamber allowed natural dawn illumination when Mary looked
          inside: "By this hour there was just enough of the dawn of a new day to enable Mary to
          look back to the place where the Master's body had lain and to discern that it was gone"<Citation num={27} />.
          The eastern-facing chamber permitted morning light to reveal the empty shelf where Jesus
          had been placed.
        </p>
        <p>
          The burial procession confirm accessibility. They "started from Golgotha for Joseph's tomb
          across the way" at approximately 4:30 PM Friday<Citation num={28} />, demonstrating reasonable proximity
          for those bearing a body.
        </p>

        {/* Figure 4 - Iron Spike */}
        <figure className="my-8">
          <Image
            src="/images/josephs-tomb/Iron seal bar.jpg"
            alt="Broken iron spike near tomb entrance"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 4. BROKEN IRON SPIKE NEAR TOMB ENTRANCE, POSSIBLY SEAL-RELATED
          </figcaption>
        </figure>
      </section>

      <section className="mb-12">
        <h2>The Shroud Disposal Cliff</h2>
        <p>
          A revealing detail emerges from the cover-up attempt. After Joseph and David Zebedee
          inspected the empty tomb Sunday morning, confirming what the women reported, "they
          were the last to so view the sepulchre, for the high priest sent the captain of the temple
          guards to the tomb at half past seven o'clock to remove the grave cloths"<Citation num={29} />.
        </p>
        <p>
          The disposal method proves geologically significant: "The captain wrapped them all up in
          the linen sheet and threw them over a near-by cliff"<Citation num={30} />.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Geographic Requirements:</h3>
        <ul className="list-disc ml-8 space-y-2 mt-4 pl-5">
          <li>Cliff is within walking distance of the tomb</li>
          <li>Sufficient depth for disposal concealment</li>
          <li>"Near-by" designation indicates reasonable proximity</li>
          <li>Accessible to the temple guard captain</li>
          <li>Complex terrain supporting multiple cliff formations</li>
        </ul>

        <p className="mt-6">
          Rather than investigating the extraordinary tomb conditions, religious authorities
          prioritized evidence elimination—inadvertently providing another geographic constraint
          for our investigation.
        </p>

        {/* Figure 5 - Cliffs */}
        <figure className="my-8">
          <Image
            src="/images/josephs-tomb/Cliff Golgotha cr.jpg"
            alt="Cliffs near the Garden Tomb"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 5. CLIFFS NEAR THE GARDEN TOMB
          </figcaption>
        </figure>
      </section>

      <section className="mb-12">
        <h2>Location Constraints Summary</h2>
        <p>The forensic evidence creates six categories of requirements:</p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Convergent Geographic Parameters:</h3>
        <ul className="list-disc ml-8 space-y-2 mt-4 pl-5">
          <li><strong>Distance:</strong> Maximum 1.25 miles from Damascus Gate</li>
          <li><strong>Direction:</strong> North of Golgotha, east of Samaria road</li>
          <li><strong>Geology:</strong> Solid rock for hewn chambers, nearby disposal cliff</li>
          <li><strong>Dimensions:</strong> ~100 square feet chamber with shelf and groove system</li>
          <li><strong>Setting:</strong> Garden on hillside with cultivation capability</li>
          <li><strong>Access:</strong> Multiple approach routes for different parties</li>
        </ul>

        <p className="mt-6">
          These converging constraints reduce viable locations to approximately 0.05 square miles
          of highly specific terrain north of Damascus Gate. The tomb must satisfy all requirements
          simultaneously—a remarkably precise set of coordinates hidden within the narrative
          details.
        </p>

        {/* Figure 6 - Old Photo */}
        <figure className="my-8">
          <Image
            src="/images/josephs-tomb/Old Photo 2.jpg"
            alt="The Garden Tomb circa 1900"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 6. THE GARDEN TOMB CIRCA 1900
          </figcaption>
        </figure>
      </section>

      <section className="mb-12">
        <h2>The Garden Tomb</h2>
        <p>
          The Garden Tomb, known to Jerusalem visitors since the 1890s and well-established by
          the 1920s-1930s revelation period, matches our forensic requirements with remarkable
          precision.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Specification Compliance Assessment</h3>

        {/* Visual table for sighted users */}
        <div className="my-8 overflow-x-auto" aria-hidden="true">
          <table className="min-w-full border border-light-border dark:border-dark-border">
            <thead className="bg-light-card dark:bg-dark-card">
              <tr>
                <th className="px-4 py-2 border border-light-border dark:border-dark-border text-left">Constraint</th>
                <th className="px-4 py-2 border border-light-border dark:border-dark-border text-left">Garden Tomb Reality</th>
                <th className="px-4 py-2 border border-light-border dark:border-dark-border text-left">Match</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Distance from Damascus Gate</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">0.7 miles northeast</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ Within 1.25 mile limit</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Chamber dimensions</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">8 ft × 11 ft = 88 sq ft</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ 88% correlation</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Rock-hewn construction</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Carved from limestone cliff</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ Confirmed</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Tomb architecture</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Vestibule entrance (north), burial chamber (east)</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ Dawn illumination into chamber</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Garden setting</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Historical garden designation</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ Documented</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Nearby cliff</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Multiple ravines and cliffs</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ Disposal capability</td>
              </tr>
              <tr>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Groove system</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">Visible channel for rolling stone</td>
                <td className="px-4 py-2 border border-light-border dark:border-dark-border">✓ Preserved</td>
              </tr>
            </tbody>
          </table>
          <p className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 7. GARDEN TOMB COMPLIANCE CHART
          </p>
        </div>

        {/* Screen reader / TTS alternative */}
        <div className="sr-only" role="region" aria-label="Figure 7 data description">
          <p>Figure 7. Garden Tomb Compliance Chart shows:</p>
          <p>
            The Garden Tomb is located 0.7 miles northeast of Damascus Gate, well within the 1.25 mile limit.
            The chamber dimensions measure 8 feet by 11 feet, equaling 88 square feet—an 88% correlation
            with the specified "about ten feet square." The tomb is confirmed to be carved from a limestone cliff
            with rock-hewn construction. Its architecture features a vestibule entrance facing north and a burial
            chamber facing east, allowing dawn illumination into the chamber as described. The site has a
            documented historical garden designation. Multiple nearby ravines and cliffs provide disposal capability
            for the burial cloths. A visible channel for the rolling stone remains preserved in the groove system.
            All seven specifications match the Garden Tomb's physical reality.
          </p>
        </div>

        <p>
          The 88% dimensional correlation stands out. Ancient construction tolerances make this
          precision remarkable—especially given the phrase "about ten feet square" allows
          reasonable variation. Such correlation exceeds coincidental probability.
        </p>

        <h3 className="text-2xl font-semibold mt-8 mb-4">Correlation Review</h3>
        <p>
          Consider the pattern: The revelators had access to all known Jerusalem tomb sites during
          the 1920s-1930s composition period. They specifically employed garden-related
          terminology while providing measurable specifications. Why specify "ten feet square"
          unless confirming a measurable reality? Why emphasize the garden setting unless it is to
          validate a known location? Why detail the groove mechanism unless it remained visible?
        </p>
        <p>
          The evidence suggests intentional verification: the revelators confirmed what careful
          investigators would discover—that the Garden Tomb satisfies every requirement with
          uncanny precision.
        </p>

        {/* Figure 8 - Burial Chamber */}
        <figure className="my-8">
          <Image
            src="/images/josephs-tomb/Chanber 3.jpg"
            alt="The burial chamber interior"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 8. THE BURIAL CHAMBER
          </figcaption>
        </figure>
      </section>

      <section className="mb-12">
        <h2>Archaeological Implications</h2>
        <p>
          This forensic analysis reveals a remarkable aspect of the Urantia Papers—they function as
          an archaeological database when approached in a methodical manner. The precision
          achieved through constraint assessment validates treating revealed information as
          historical sources worthy of serious investigation.
        </p>
        <p>
          The convergent evidence patterns indicate preservation of accurate geographic, temporal,
          and physical information across multiple narrative streams. Such precision significantly
          exceeds what random correlation would produce.
        </p>
        <p>
          The Garden Tomb emerges not through speculation, but through the fulfillment of
          multiple independent requirements. Priority archaeological investigation of the site's
          precise specifications and the nearby disposal cliff could provide definitive correlation
          confirmation, potentially establishing new protocols for evidence-based revelatory
          archaeology.
        </p>
      </section>

      <section className="mb-12">
        <h2>Conclusion: Geographic and Spiritual Significance</h2>
        <p>
          The forensic evidence converges on a specific location—the Garden Tomb, with its 88%
          dimensional match, proper geological features, and precise distance from Damascus Gate.
          The revelation appears to have deliberately confirmed this site through specifications
          unknown to 1890s archaeology, yet verifiable today.
        </p>
        <p>
          Mary's question—"Where have they laid him?"—finds its answer through careful
          investigation. But this marks more than geographic coordinates. It identifies the precise
          location where the risen Jesus emerged from mortal constraints, where divine purpose
          operated through natural law rather than against it. The empty tomb stands as material
          proof that personality transcends death, that consciousness directs matter, that universe
          administration achieves its purposes through ordered processes.
        </p>
        <p>
          Mary addressed her question to one she thought was the garden's
          caretaker, not realizing she had spoken to the risen Master himself. Today, through the
          forensic reconstruction of revealed evidence, that garden can be identified—transforming
          her desperate question into a geographic understanding, mystery into a mappable reality.
        </p>

        {/* Figure 9 - Tomb Diagram */}
        <figure className="my-8">
          <Image
            src="/images/josephs-tomb/Tomb-Diagram.jpg"
            alt="Burial chamber layout diagram"
            width={800}
            height={600}
            className="rounded-lg"
          />
          <figcaption className="text-sm text-center mt-2 text-text-muted-light dark:text-text-muted-dark font-semibold">
            FIGURE 9. BURIAL CHAMBER FACES EAST FROM THE ANTECHAMBER
          </figcaption>
        </figure>

        <div aria-hidden="true" className="mt-8 pt-4 border-t border-light-border dark:border-dark-border text-sm text-text-muted-light dark:text-text-muted-dark">
          <p><strong>CITATIONS:</strong> ¹ 187:0.4 | ² 187:1.4 | ³ 187:1.4 | ⁴ 187:1.9 | ⁵ 187:1.10 | ⁶ 187:1.11 | ⁷ 188:2.3 | ⁸ 188:2.3 | ⁹ 189:1.1 | ¹⁰ 189:2.1 | ¹¹ 189:2.4 | ¹² 189:2.4 | ¹³ 189:4.5 | ¹⁴ 189:4.5 | ¹⁵ 189:2.4 | ¹⁶ 189:2.4 | ¹⁷ 189:4.3 | ¹⁸ 189:4.5 | ¹⁹ 189:4.5 | ²⁰ 188:1.2 | ²¹ 188:1.4 | ²² 188:1.4 | ²³ 189:2.4, 189:4.6 | ²⁴ 189:2.4 | ²⁵ 189:4.6 | ²⁶ 189:4.6 | ²⁷ 189:4.6 | ²⁸ 188:1.3 | ²⁹ 190:1.2 | ³⁰ 190:1.2</p>
        </div>
      </section>

      <section className="mb-12">
        <h3 className="text-xl font-semibold">Researcher: David Neufer</h3>
        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
          For the Urantia Science Symposium 2025
        </p>

        <h3 className="text-xl font-semibold mt-8">AI Disclosure</h3>
        <p className="text-sm">
          This forensic investigation was conducted by David Neufer with assistance from Claude AI
          for systematic evidence coordination, citation verification, and document structuring. The
          AI assisted with cross-referencing, identifying relevant passages, organizing constraint
          categories, and ensuring citation accuracy. All forensic methodology, interpretive analysis,
          hypothesis development, and investigative conclusions are derived from human research
          and the interpretation of revealed evidence. The geographic correlations, constraint
          derivations, and final assessments represent human analysis of revelatory documentation.
          The research methodology, conceptual breakthroughs, and final responsibility rest
          entirely with the Researcher.
        </p>
        <p className="text-sm mt-4">
          <strong>Speculation Boundaries:</strong> Where analysis extends beyond explicit textual evidence into a
          forensic hypothesis, such extensions are clearly indicated through conditional language
          and explicit notation.
        </p>
      </section>
    </>
  )
}
