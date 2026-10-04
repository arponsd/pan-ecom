import { inkFor } from '@/lib/catalog';

/** Striped colour block standing in for product photography. */
export function Swatch({
  color,
  label,
  className = '',
  labelClassName = 'text-[10px] opacity-75',
}: {
  color: string;
  label?: string;
  className?: string;
  labelClassName?: string;
}) {
  return (
    <div className={`stripes flex items-end ${className}`} style={{ backgroundColor: color }}>
      {label && (
        <span className={`font-mono leading-none font-medium tracking-[.06em] ${labelClassName}`} style={{ color: inkFor(color) }}>
          {label}
        </span>
      )}
    </div>
  );
}
