import Image from 'next/image'

export default function HavonaChairsContent() {
  return (
    <>
      <p className="text-lg text-text-muted-light dark:text-text-muted-dark italic mb-6">
        An allegorical exploration of Havona's world distribution pattern
      </p>

      {/* Hero Image */}
      <figure className="my-8">
        <Image
          src="/images/havona-chairs/havona-worlds.webp"
          alt="Havona worlds - the seven circuits surrounding Paradise"
          width={800}
          height={600}
          className="rounded-lg"
          unoptimized={false}
        />
        <figcaption className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2 text-center italic">
          The seven circuits of Havona
        </figcaption>
      </figure>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Twenty Chairs Problem
      </h2>

      <p>
        Seven long tables ran parallel to each other in a science classroom. Each needed seating
        on only one side of the table. We had just twenty chairs, but Professor Occam instructed
        us to distribute them proportionally among the tables, then he left before we could ask
        him for one more chair to make it an even twenty-one.
      </p>

      <p>
        One athletic student crammed all twenty chairs at the middle table, but we convinced him
        that the chair count for any of the tables needed to be upwards of zero. After much pacing
        and several pots of coffee, we came up with two plausible, proportionate distributions,
        agreeing that there could be others.
      </p>

      <div className="my-6 bg-light-card dark:bg-dark-card p-4 rounded-lg border border-light-border dark:border-dark-border">
        <p className="font-semibold mb-2">Pattern A: 2 4 2 4 2 4 2</p>
        <p className="font-semibold">Pattern B: 1 3 4 4 4 3 1</p>
      </div>

      <p>
        A is more social, but B is better for people who don't want to sit beside anybody.
      </p>

      <p>
        Scientifically, Pattern A is oscillating and sine-wavey. Pattern B is Gaussian-like and
        bell-curvy.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Havona Connection
      </h2>

      <p>
        Somebody texted the professor about the patterns. Occam texted back a single word:{' '}
        <strong>Havona</strong>. Luckily, Bill, a revelation major, knew what Havona was. He looked
        up the seven circuits of the Havona worlds and found a quote:
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        "The billion worlds of Havona are arranged in seven concentric circuits immediately
        surrounding the three circuits of Paradise satellites. There are upwards of thirty-five
        million worlds in the innermost Havona circuit and over two hundred and forty-five million
        in the outermost, with proportionate numbers intervening." (14:1.9)
      </blockquote>

      <p>
        Bill said, "If we can figure out the number of worlds on each circuit, we'll know how to
        place the chairs."
      </p>

      <p>
        He calculated a base world number for each circuit, starting with the innermost, which he
        set at 35 million. Then he distributed the worlds, 35 million at a time, in arithmetical
        progression, out to the seventh circuit, which received 245 million worlds. But that only
        added up to 980 million. We needed a billion worlds exactly! We had 20 million left to
        divvy up.
      </p>

      <p>
        "There it is!" Bill exclaimed. "It's just like the twenty chairs!"
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Two Distribution Patterns
      </h2>

      <p>
        Using his Texas Instruments calculator, he punched in numbers and wrote...
      </p>

      <div className="my-6 bg-light-card dark:bg-dark-card p-6 rounded-lg border border-light-border dark:border-dark-border">
        <p className="font-bold mb-4">Pattern A</p>
        <ul className="list-none space-y-1 ml-4">
          <li>Circuit 1: 35 + 2 = 37 M</li>
          <li>Circuit 2: 70 + 4 = 74 M</li>
          <li>Circuit 3: 105 + 2 = 107 M</li>
          <li>Circuit 4: 140 + 4 = 144 M</li>
          <li>Circuit 5: 175 + 2 = 177 M</li>
          <li>Circuit 6: 210 + 4 = 214 M</li>
          <li>Circuit 7: 245 + 2 = 247 M</li>
        </ul>

        <p className="font-bold mb-4 mt-8">Pattern B</p>
        <ul className="list-none space-y-1 ml-4">
          <li>Circuit 1: 35 + 1 = 36 M</li>
          <li>Circuit 2: 70 + 3 = 73 M</li>
          <li>Circuit 3: 105 + 4 = 109 M</li>
          <li>Circuit 4: 140 + 4 = 144 M</li>
          <li>Circuit 5: 175 + 4 = 179 M</li>
          <li>Circuit 6: 210 + 3 = 213 M</li>
          <li>Circuit 7: 245 + 1 = 246 M</li>
        </ul>
      </div>

      <p>
        "Both patterns total to a billion!"
      </p>

      <p>
        Bill felt pleased with himself until we asked which one it was: Pattern A or B? So, Bill
        continued figuring.
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        Reverse-Engineering from Universal Patterns
      </h2>

      <p>
        "Havona serves as the pattern creation for all other universes. So, how are the other
        universes arranged? If we figure that out, then we can reverse-engineer Havona. For the
        superuniverse level, they say..."
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        "The local universes are in closer proximity as they approach Havona; the circuits
        are greater in number, and there is increased superimposition, layer upon layer. But
        farther out from the eternal center...
      </blockquote>

      <p className="italic">
        "Where <em>we</em> are," Bill interjected.
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        ...there are fewer and fewer systems, layers, circuits, and universes." (15:3.16)
      </blockquote>

      <p>
        "And then there's the first outer space level where they say..."
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        "But about one-half million light-years beyond the periphery of the present grand
        universe...
      </blockquote>

      <p className="italic">
        "Where <em>we</em> are," He interjected.
      </p>

      <blockquote className="border-l-2 border-[#3B82C8] dark:border-[#60A5FA] bg-[#F8FBFF] dark:bg-[#252A30] pl-6 pr-4 py-4 my-6">
        ...we observe the beginnings of a zone of an unbelievable energy action which
        increases in volume and intensity for over twenty-five million light-years." (12:1.14)
      </blockquote>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Gaussian Solution
      </h2>

      <p>
        Bill goes, "From the superuniverse edge, things get denser and denser approaching inward
        toward the maximum kernel. And going outward from the first outer space level's inner edge,
        things get increasingly intense before reaching the level's maximum kernel. Presumably, the
        intensity decreases as it approaches its outermost edge. That sounds Gaussian-like to me.
        Bell-curvy. Havona must resemble Pattern B! The Gaussian-like Havona is the definitive
        pattern for the universe of universes... probably."
      </p>

      <h2 className="text-2xl font-bold mb-4 mt-8 text-text-light dark:text-text-dark">
        The Professor's Response
      </h2>

      <p>
        Excitedly, Bill called Professor Occam with the breathtaking news about the chair and table
        arrangement. However, the professor sounded annoyed. He said he meant to text{' '}
        <em>Havana</em>, not <em>Havona</em>. He likes antique cars and a simple life, so he's
        packed and on his way to Cuba. He advised us to arrange the twenty chairs, sit on them,
        then put our heads on the seven tables until he returns.
      </p>

      {/* Cuba Scene Image */}
      <figure className="my-8">
        <Image
          src="/images/havona-chairs/cuba-scene.png"
          alt="Beach scene with antique cars in Havana, Cuba"
          width={800}
          height={600}
          className="rounded-lg"
          unoptimized={false}
        />
        <figcaption className="text-sm text-text-muted-light dark:text-text-muted-dark mt-2 text-center italic">
          Professor Occam's actual destination: Havana, Cuba
        </figcaption>
      </figure>

      <div className="mt-6 pt-6 border-t border-light-border dark:border-dark-border text-sm text-text-muted-light dark:text-text-muted-dark italic">
        <p>
          Originally published in the Urantia Fellowship's Mini-Messenger, April 1, 2025
        </p>
      </div>
    </>
  )
}
