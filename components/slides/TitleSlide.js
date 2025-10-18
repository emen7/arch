export default function TitleSlide({ title, subtitle, event, date }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center">
      <h1 className="text-6xl font-bold mb-6 text-text-light dark:text-text-dark">
        {title}
      </h1>
      {subtitle && (
        <p className="text-3xl mb-12 text-text-muted-light dark:text-text-muted-dark">
          {subtitle}
        </p>
      )}
      {event && (
        <p className="text-xl text-text-muted-light dark:text-text-muted-dark mb-2">
          {event}
        </p>
      )}
      {date && (
        <p className="text-lg text-text-muted-light dark:text-text-muted-dark">
          {date}
        </p>
      )}
    </div>
  )
}
