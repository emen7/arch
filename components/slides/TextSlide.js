import { getCitationInfo } from '../../data/ub-citations'

export default function TextSlide({ title, content, citation, bullets }) {
  const citationInfo = citation ? getCitationInfo(citation) : null

  return (
    <div className="max-w-4xl mx-auto">
      {title && (
        <h2 className="text-4xl font-bold mb-8 text-text-light dark:text-text-dark">
          {title}
        </h2>
      )}

      {content && (
        <div className="text-2xl leading-relaxed text-text-light dark:text-text-dark mb-6">
          {content}
        </div>
      )}

      {bullets && (
        <ul className="text-2xl space-y-4 list-disc ml-8 text-text-light dark:text-text-dark">
          {bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      )}

      {citation && (
        <div className="mt-8 text-right">
          <p className="text-2xl font-semibold text-text-light dark:text-text-dark">
            {citation}
          </p>
          {citationInfo && (
            <>
              <p className="text-lg text-[#3B82C8] dark:text-[#60A5FA] mt-1">
                {citationInfo.section}
              </p>
              <p className="text-lg text-[#3B82C8] dark:text-[#60A5FA]">
                {citationInfo.paper}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
