import { useState } from 'react';
import { Zap } from 'lucide-react';

interface ShowroomImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fallbackTitle?: string;
}

export function ShowroomImage({
  src,
  alt,
  className = '',
  loading = 'eager',
  fallbackTitle = 'HI ERO ELECTRIC – TRISHNA MOTORS',
}: ShowroomImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-[#13161A] text-white p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <div className="w-11 h-11 rounded-lg bg-[#5CE61C]/15 text-[#5CE61C] flex items-center justify-center mb-3">
          <Zap className="w-5 h-5" aria-hidden="true" />
        </div>
        <p className="text-sm font-semibold tracking-tight">{fallbackTitle}</p>
        <p className="text-xs text-neutral-400 mt-1">Tilhari, Jabalpur</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
