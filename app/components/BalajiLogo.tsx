export function BalajiLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Balaji Insurance logo"
    >
      <defs>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B54D1" />
          <stop offset="100%" stopColor="#0F8CE4" />
        </linearGradient>
        <linearGradient id="brandGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0F66D1" />
          <stop offset="100%" stopColor="#7CBBF5" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="64" height="64" rx="16" fill="url(#blueGrad)" />
      <path
        d="M20 18h12a6 6 0 0 1 0 12h-8v8h-6V18Zm10 6H22v4h8a2 2 0 0 0 0-4Z"
        fill="white"
      />
      <path
        d="M24 34h4v6h-4z"
        fill="white"
      />
      <text x="78" y="30" fill="#082B72" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700">
        BALAJI
      </text>
      <text x="78" y="47" fill="#5E6F91" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="0.16em">
        INSURANCE & FINANCE
      </text>
    </svg>
  );
}
