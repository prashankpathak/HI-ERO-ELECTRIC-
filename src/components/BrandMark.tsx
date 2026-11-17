export function BrandMark({ className = 'w-6 h-6' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 6H13.5L11.2 15.2H22.8L25.1 6H32.5L26.5 30H19L21.3 20.6H9.8L7.5 30H0L6 6Z"
        fill="currentColor"
      />
      <path d="M12.5 18.2L21.8 12.8L18.4 17.8H25.2L15.4 23.8L18.5 18.2H12.5Z" fill="#5CE61C" />
    </svg>
  );
}
