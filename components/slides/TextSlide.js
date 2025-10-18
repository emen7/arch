export default function TextSlide({ title, content, citation, bullets }) {
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
        <p className="mt-8 text-xl text-text-muted-light dark:text-text-muted-dark italic text-right">
          — {citation}
        </p>
      )}
    </div>
  )
}
