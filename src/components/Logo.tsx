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
    sm: 'h-9 w-9 sm:h-11 sm:w-11',
    md: 'h-12 w-12 min-[380px]:h-14 min-[380px]:w-14 sm:h-16 sm:w-16', // Prominent circular logo
    lg: 'h-16 w-16 sm:h-20 sm:w-20',
    xl: 'h-20 w-20 sm:h-24 sm:w-24',
  }[size];

  // Typography sizing
  const textSizes = {
    sm: {
      brand: 'text-xs sm:text-sm font-extrabold tracking-tight',
      tag: 'text-[8px] sm:text-[9px] tracking-wider',
    },
    md: {
      brand: 'text-xs min-[350px]:text-[13px] min-[390px]:text-sm sm:text-base md:text-lg lg:text-xl font-extrabold tracking-tight',
      tag: 'text-[7.5px] min-[390px]:text-[8.5px] sm:text-[9.5px] tracking-wider sm:tracking-widest',
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
    <div className={`inline-flex items-center gap-1.5 min-[380px]:gap-2.5 sm:gap-3 select-none min-w-0 ${className}`}>
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
        <div className="flex flex-col justify-center leading-none min-w-0">
          <div className="flex items-baseline gap-1 sm:gap-1.5 flex-nowrap whitespace-nowrap">
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
            <div className="hidden min-[380px]:flex items-center gap-1 sm:gap-1.5 mt-0.5 sm:mt-1 flex-wrap whitespace-nowrap">
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
