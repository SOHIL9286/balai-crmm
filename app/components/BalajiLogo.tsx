export function BalajiLogo({ className }: { className?: string }) {
  return (
    <img
      src="/balaji-logo.svg"
      className={`${className} object-contain`}
      role="img"
      aria-label="BALAJI Policy Matrix LLP logo"
      alt="BALAJI Policy Matrix LLP logo"
    />
  );
}
