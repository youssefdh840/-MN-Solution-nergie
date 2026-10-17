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
    sm: 'h-10 w-10 sm:h-12 sm:w-12',
    md: 'h-14 w-14 sm:h-16 sm:w-16', // Increased size (h-14 or h-16 / w-14 or w-16) maintaining aspect ratio
    lg: 'h-16 w-16 sm:h-20 sm:w-20',
    xl: 'h-20 w-20 sm:h-24 sm:w-24',
  }[size];

  // Typography sizing
  const textSizes = {
    sm: {
      brand: 'text-xs sm:text-sm font-extrabold tracking-tight',
      tag: 'text-[8.5px] sm:text-[9px] tracking-wider',
    },
    md: {
      brand: 'text-[13px] min-[360px]:text-sm sm:text-base lg:text-lg xl:text-xl font-extrabold tracking-tight',
      tag: 'text-[8px] min-[360px]:text-[8.5px] sm:text-[9.5px] tracking-wider sm:tracking-widest',
    },
    lg: {
      brand: 'text-base sm:text-lg lg:text-2xl font-black tracking-tight',
      tag: 'text-[9.5px] sm:text-xs tracking-widest',
    },
    xl: {
      brand: 'text-xl sm:text-2xl lg:text-3xl font-black tracking-tight',
      tag: 'text-xs sm:text-sm tracking-widest',
    },
  }[size];

  return (
    <div className={`inline-flex items-center gap-2 sm:gap-3 select-none min-w-0 ${className}`}>
      {/* Official MN Solution Énergie Circular Emblem Image */}
      <img
        src="/logo.png"
        alt="MN Solution Énergie Logo"
        className={`${imageSizeClasses} aspect-square object-contain shrink-0 drop-shadow-md transition-transform duration-300 hover:scale-105`}
        referrerPolicy="no-referrer"
        loading="eager"
      />

      {/* Brand Name & Subtitle */}
      {showText && (
        <div className="flex flex-col leading-tight min-w-0">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap">
            <span
              className={`${textSizes.brand} ${
                isLight ? 'text-white' : 'text-[#0F1E36]'
              } shrink-0`}
            >
              MN
            </span>
            <span
              className={`${textSizes.brand} font-semibold ${
                isLight ? 'text-slate-100' : 'text-slate-900'
              } shrink-0`}
            >
              SOLUTION
            </span>
            <span
              className={`${textSizes.brand} font-black text-[#C87D55] shrink-0`}
            >
              ÉNERGIE
            </span>
          </div>

          {showSubtitle && (
            <div className="hidden min-[360px]:flex items-center gap-1 sm:gap-1.5 mt-0.5 flex-wrap">
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
