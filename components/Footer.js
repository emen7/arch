export default function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-light-border dark:border-dark-border">
      <div className="container mx-auto px-4 text-center text-text-muted-light dark:text-text-muted-dark max-w-[65ch]">
        <p className="text-xs text-right">&copy; {new Date().getFullYear()} David Neufer</p>
      </div>
    </footer>
  )
}
