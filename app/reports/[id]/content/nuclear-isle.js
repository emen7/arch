import Citation from '../../../../components/Citation'
import PaperRef from '../../../../components/PaperRef'

export default function NuclearIsleContent() {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Nuclear Isle
      </h2>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        "The ultimaton, the first measurable form of energy, has Paradise as its nucleus."<Citation num={1} />
      </blockquote>

      <p>
        The first words of Paper 11 on the Eternal Isle say, "Paradise is the eternal center of
        the universe of universes..." Paradise is "material, literal." Its material is absolutum,
        the "literal substance of Paradise." It is "not to be found elsewhere in all the wide
        universe of universes." Four different papers refer to Paradise as a "nuclear isle." And
        Paradise "has no location in space."
      </p>

      <p>
        Ultimatons, however, only exist in space, specifically in pervaded space. They make up
        all the material in the universe of universes. All these ultimatons circulate the nuclear
        isle, either clockwise or counterclockwise. Paper 42 likely refers to this eternal
        relationship.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Pattern of "Nucleus"
      </h2>

      <p>
        Another point to consider is the book's general usage of the term "nucleus."
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        "The nucleus of the physical system to which your sun and its associated planets belong
        is the center of the onetime Andronover nebula."<Citation num={2} />
      </blockquote>

      <p>
        So, the nucleus of Monmatia is Andronover's center. The Andronover center does not reside
        in Monmatia.
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        "Nevertheless, there is no ether, and the very absence of this hypothetical ether enables
        the inhabited planet to escape falling into the sun and the encircling electron to resist
        falling into the nucleus."<Citation num={3} />
      </blockquote>

      <p>
        So, the nucleus of the electron is the atom's nucleus, not something within the electron.
        The revelators establish the pattern that the nucleus of an object is outside the object,
        not within it. Inside the electron are a hundred ultimatons, happily huddling, with none
        vying for the central position to claim distinction as the electron's nucleus.
      </p>

      <p>
        Confusion is inevitable when the "nucleus" statement stands alone. It's alleviated with
        additional context.
      </p>

      {/* Citations */}
      <div className="mt-12 pt-6 border-t border-light-border dark:border-dark-border text-sm text-text-muted-light dark:text-text-muted-dark">
        <p className="mb-2 font-semibold">Citations:</p>
        <p>
          <Citation num={1} /><PaperRef reference="42:1.2" /> | <Citation num={2} /><PaperRef reference="15:3.6" /> | <Citation num={3} /><PaperRef reference="42:5.16" />
        </p>
      </div>
    </>
  )
}
