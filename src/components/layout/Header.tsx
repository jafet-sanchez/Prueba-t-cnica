import { User } from 'lucide-react';

/**
 * Componente Header
 * Header con ondas decorativas y avatar del usuario
 */
export const Header = () => {
  return (
    <header className="relative h-20 bg-[#1e3a5f] overflow-hidden">
      {/* Ondas decorativas SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1440 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        {/* Onda amarilla */}
        <path
          d="M0 60C200 20 400 80 600 60C800 40 1000 80 1200 60C1400 40 1440 60 1440 60V100H0V60Z"
          fill="#f5c542"
          fillOpacity="0.6"
        />
        {/* Onda rosa */}
        <path
          d="M0 70C240 40 480 90 720 70C960 50 1200 90 1440 70V100H0V70Z"
          fill="#FFB6C1"
          fillOpacity="0.5"
        />
        {/* Onda verde */}
        <path
          d="M0 80C300 50 600 95 900 80C1200 65 1440 85 1440 85V100H0V80Z"
          fill="#86efac"
          fillOpacity="0.4"
        />
      </svg>

      {/* Avatar del usuario */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 z-10">
        <div className="w-10 h-10 bg-[#f5c542] rounded-full flex items-center justify-center
                        shadow-lg border-2 border-white">
          <User className="w-5 h-5 text-[#1e3a5f]" />
        </div>
      </div>
    </header>
  );
};

export default Header;
