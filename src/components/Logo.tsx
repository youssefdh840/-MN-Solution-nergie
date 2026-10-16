import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
}) => {
  const isLight = variant === 'light';

  // Sizing definitions
  const markDimensions = {
    sm: { width: 34, height: 34 },
    md: { width: 44, height: 44 },
    lg: { width: 56, height: 56 },
    xl: { width: 72, height: 72 },
  }[size];

  const textSizes = {
    sm: { brand: 'text-base font-extrabold tracking-tight', tag: 'text-[9px] tracking-wider' },
    md: { brand: 'text-lg sm:text-xl font-extrabold tracking-tight', tag: 'text-[10px] tracking-widest' },
    lg: { brand: 'text-2xl font-black tracking-tight', tag: 'text-xs tracking-widest' },
    xl: { brand: 'text-3xl font-black tracking-tight', tag: 'text-sm tracking-widest' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* SVG Emblem Mark */}
      <svg
        width={markDimensions.width}
        height={markDimensions.height}
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 hover:scale-105"
        aria-label="Logo MN Solution Énergie"
      >
        <defs>
          {/* Copper gradient for Heating & Accents */}
          <linearGradient id="mnCopper" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E28743" />
            <stop offset="50%" stopColor="#C87D55" />
            <stop offset="100%" stopColor="#9E5326" />
          </linearGradient>

          {/* Ice / Air Conditioning gradient */}
          <linearGradient id="mnIce" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="50%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Deep Navy / Technical gear gradient */}
          <linearGradient id="mnNavy" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F1E36" />
          </linearGradient>

          <filter id="mnShadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.25" floodColor="#0F1E36" />
          </filter>
        </defs>

        {/* Circular / Octagonal Frame representing technical precision */}
        <rect
          x="6"
          y="6"
          width="108"
          height="108"
          rx="28"
          fill="url(#mnNavy)"
          stroke="#C87D55"
          strokeWidth="3.5"
          filter="url(#mnShadow)"
        />

        {/* Technical Gear Teeth accents on top/corners */}
        <g stroke="#C87D55" strokeWidth="2.5" opacity="0.6">
          <line x1="60" y1="2" x2="60" y2="8" strokeLinecap="round" />
          <line x1="18" y1="18" x2="23" y2="23" strokeLinecap="round" />
          <line x1="102" y1="18" x2="97" y2="23" strokeLinecap="round" />
          <line x1="2" y1="60" x2="8" y2="60" strokeLinecap="round" />
          <line x1="112" y1="60" x2="118" y2="60" strokeLinecap="round" />
        </g>

        {/* Heating: Styled Copper Flame (left/top) */}
        <path
          d="M48 24C48 24 53 32 49 39C46 44 40 45 40 51C40 59 47 64 54 64C47 62 46 56 48 51C49 48 52 46 53 43C56 38 52 30 48 24Z"
          fill="url(#mnCopper)"
        />

        {/* Climatisation: Crisp Snowflake Graphic (right/top) */}
        <g transform="translate(74, 38)" stroke="url(#mnIce)" strokeWidth="2.2" strokeLinecap="round">
          <line x1="0" y1="-12" x2="0" y2="12" />
          <line x1="-10.4" y1="-6" x2="10.4" y2="6" />
          <line x1="-10.4" y1="6" x2="10.4" y2="-6" />
          <path d="M-3 -9 L0 -12 L3 -9" fill="none" />
          <path d="M-3 9 L0 12 L3 9" fill="none" />
          <path d="M-9 -3 L-10.4 -6 L-6 -6" fill="none" />
          <path d="M9 3 L10.4 6 L6 6" fill="none" />
          <circle cx="0" cy="0" r="2" fill="#38BDF8" />
        </g>

        {/* MN Monogram Typography */}
        <g id="letters">
          {/* M letter - Copper */}
          <path
            d="M26 88V50L40 70L54 50V88"
            stroke="url(#mnCopper)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* N letter - Clean White / Platinum */}
          <path
            d="M66 88V50L88 88V50"
            stroke="#FFFFFF"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>

        {/* Bottom plumbing & flow arc */}
        <path
          d="M32 99C48 104 72 104 88 99"
          stroke="url(#mnCopper)"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <circle cx="60" cy="102" r="2.5" fill="#38BDF8" />
      </svg>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-baseline gap-1.5">
          <span
            className={`${textSizes.brand} ${
              isLight ? 'text-white' : 'text-[#0F1E36]'
            }`}
          >
            MN
          </span>
          <span
            className={`${textSizes.brand} font-semibold ${
              isLight ? 'text-slate-100' : 'text-slate-900'
            }`}
          >
            SOLUTION
          </span>
          <span
            className={`${textSizes.brand} font-black text-[#C87D55]`}
          >
            ÉNERGIE
          </span>
        </div>

        {showSubtitle && (
          <div className="flex items-center gap-1.5 mt-1">
            <span
              className={`${textSizes.tag} font-medium uppercase ${
                isLight ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Chauffage
            </span>
            <span className="text-[#C87D55] text-xs leading-none">•</span>
            <span
              className={`${textSizes.tag} font-medium uppercase ${
                isLight ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Climatisation
            </span>
            <span className="text-[#C87D55] text-xs leading-none">•</span>
            <span
              className={`${textSizes.tag} font-medium uppercase ${
                isLight ? 'text-slate-300' : 'text-slate-500'
              }`}
            >
              Plomberie
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
