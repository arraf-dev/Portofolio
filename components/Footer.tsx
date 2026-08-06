export default function Footer() {
  return (
    <footer className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-2.5 border-t border-line px-5 py-6 text-[13.5px] text-faint sm:px-8 lg:px-14">
      <span>© {new Date().getFullYear()} Abdul Rafi</span>
      <a
        href="https://github.com/arraf-dev"
        className="font-medium transition-colors hover:text-accent"
        target="_blank"
        rel="noopener noreferrer"
      >
        github.com/arraf-dev
      </a>
    </footer>
  );
}
