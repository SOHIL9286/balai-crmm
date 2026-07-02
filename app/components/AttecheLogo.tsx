export function AttecheLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 260 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Atteche Insurance logo"
    >
      <defs>
        <linearGradient id="blueGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0B54D1" />
          <stop offset="100%" stopColor="#0F8CE4" />
        </linearGradient>
        <linearGradient id="orangeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FF7A24" />
          <stop offset="100%" stopColor="#FCD07A" />
        </linearGradient>
      </defs>
      <path
        d="M28 4C17.6 4 9.5 12.1 9.5 22.5S17.6 41 28 41s18.5-8.1 18.5-18.5S38.4 4 28 4Zm0 32.5c-7.8 0-14.1-6.3-14.1-14.1S20.2 8.3 28 8.3 42.1 14.6 42.1 22.5 35.8 36.5 28 36.5Z"
        fill="url(#blueGrad)"
      />
      <path
        d="M43 23.8c-.7 4.5-3.9 8.1-8.3 8.6-2.9.3-5.5-.4-7.6-2l2-3.5c1.5 1 3.5 1.3 5.5 1 2.8-.4 5-2.6 5.4-5.4.3-2.3-.6-4.4-2.2-5.8l2.1-3.1c2.4 1.6 4 4.3 3.8 7.2Z"
        fill="url(#orangeGrad)"
      />
      <path
        d="M18.5 17.5c-.9-.8-2-1.4-3.2-1.5l-4 6.7 7.6 4.4 4-6.7c-1.4-.7-2.8-1.6-4-2.4Z"
        fill="url(#blueGrad)"
      />
      <text x="60" y="26" fill="#082B72" fontFamily="Inter, sans-serif" fontSize="22" fontWeight="700">
        ATTECHE
      </text>
      <text x="60" y="44" fill="#5E6F91" fontFamily="Inter, sans-serif" fontSize="10" letterSpacing="0.18em">
        INSURANCE & FINANCE
      </text>
    </svg>
  );
}
