/**
 * Props del componente Logo
 */
interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  variant?: 'light' | 'dark';
}

/**
 * Componente Logo de BeKind
 * Reutilizable en diferentes partes de la app
 */
export const Logo = ({ size = 'md', showText = true, variant = 'dark' }: LogoProps) => {
  // Tamaños del icono
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  // Tamaños del texto
  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  // Colores según variante
  const textColor = variant === 'light' ? 'text-white' : 'text-[#1e3a5f]';
  const subtextColor = variant === 'light' ? 'text-gray-300' : 'text-gray-500';

  return (
    <div className="flex items-center gap-2">
      {/* Icono del corazón */}
      <div className={`${iconSizes[size]} bg-[#f5c542] rounded-full flex items-center justify-center flex-shrink-0`}>
        <svg
          viewBox="0 0 24 24"
          className="w-2/3 h-2/3 text-[#1e3a5f]"
          fill="currentColor"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </div>

      {/* Texto */}
      {showText && (
        <div className="flex flex-col">
          <div className={textSizes[size]}>
            <span className={`font-bold ${textColor}`}>be</span>
            <span className="font-bold text-[#f5c542]">kind</span>
          </div>
          <span className={`text-xs ${subtextColor} -mt-1`}>network</span>
        </div>
      )}
    </div>
  );
};

export default Logo;
