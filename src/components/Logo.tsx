type LogoProps = {
  className?: string
  /** Accessible label; use empty string to mark decorative */
  'aria-label'?: string
  /** When true, hide from assistive tech (paired with visible text) */
  decorative?: boolean
}

/**
 * Executive monogram mark: growth / systems motif with initials I · A · U.
 */
export function Logo({ className = '', 'aria-label': ariaLabel, decorative }: LogoProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      width={40}
      height={40}
      role={decorative ? 'presentation' : 'img'}
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : ariaLabel ?? 'Ibsa Aliyi Usmane monogram'}
    >
      <defs>
        <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--logo-grad-a, #2563eb)" />
          <stop offset="100%" stopColor="var(--logo-grad-b, #06b6d4)" />
        </linearGradient>
      </defs>
      <rect
        width={40}
        height={40}
        rx={10}
        fill="url(#logoGrad)"
        opacity={0.15}
      />
      <path
        d="M20 6c-6 4-10 10-10 17a10 10 0 0 0 20 0c0-7-4-13-10-17z"
        fill="none"
        stroke="url(#logoGrad)"
        strokeWidth={1.6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <text
        x={20}
        y={25}
        textAnchor="middle"
        fontSize={11}
        fontWeight={700}
        fontFamily="system-ui, Segoe UI, sans-serif"
        fill="currentColor"
        letterSpacing="-0.02em"
      >
        IAU
      </text>
    </svg>
  )
}
