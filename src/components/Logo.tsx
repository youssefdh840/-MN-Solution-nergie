import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showSubtitle?: boolean;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showSubtitle = true,
  showText = true,
}) => {
  const isLight = variant === 'light';

  // Responsive image dimensions based on size
  const imageSizeClasses = {
    sm: 'h-9 sm:h-10 w-auto',
    md: 'h-12 sm:h-14 w-auto', // Optimal clean sizing requested for header
    lg: 'h-14 sm:h-16 lg:h-18 w-auto',
    xl: 'h-16 sm:h-20 lg:h-24 w-auto',
  }[size];

  // Typography sizing
  const textSizes = {
    sm: {
      brand: 'text-sm sm:text-base font-extrabold tracking-tight',
      tag: 'text-[9px] tracking-wider',
    },
    md: {
      brand: 'text-base sm:text-lg lg:text-xl font-extrabold tracking-tight',
      tag: 'text-[9px] sm:text-[10px] tracking-wider sm:tracking-widest',
    },
    lg: {
      brand: 'text-lg sm:text-xl lg:text-2xl font-black tracking-tight',
      tag: 'text-[10px] sm:text-xs tracking-widest',
    },
    xl: {
      brand: 'text-xl sm:text-2xl lg:text-3xl font-black tracking-tight',
      tag: 'text-xs sm:text-sm tracking-widest',
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none ${className}`}>
      {/* Official MN Solution Énergie Circular Emblem Image */}
      <img
        src="/logo.png"
        alt="MN Solution Énergie Logo"
        className={`${imageSizeClasses} object-contain shrink-0 drop-shadow-md transition-transform duration-300 hover:scale-105`}
        referrerPolicy="no-referrer"
        loading="eager"
      />

      {/* Brand Name & Subtitle */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-wrap">
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
            <div className="flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 flex-wrap">
              <span
                className={`${textSizes.tag} font-medium uppercase ${
                  isLight ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                Chauffage
              </span>
              <span className="text-[#C87D55] text-[10px] leading-none">•</span>
              <span
                className={`${textSizes.tag} font-medium uppercase ${
                  isLight ? 'text-slate-300' : 'text-slate-500'
                }`}
              >
                Climatisation
              </span>
              <span className="text-[#C87D55] text-[10px] leading-none">•</span>
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
      )}
    </div>
  );
};
