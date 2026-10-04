import Image from 'next/image';
import { PRODUCT_PHOTOS } from '@/lib/photos';
import { Swatch } from './Swatch';

/**
 * Product photo cropped to fill its frame, or the striped colour placeholder when the
 * product has no photo yet. The frame (aspect ratio, radius) comes from `className`.
 */
export function ProductImage({
  productId,
  color,
  alt,
  sizes,
  label,
  className = '',
  labelClassName,
  priority = false,
  zoom = false,
}: {
  productId: number;
  color: string;
  alt: string;
  sizes: string;
  /** Placeholder caption, shown only when there is no photo. */
  label?: string;
  className?: string;
  labelClassName?: string;
  priority?: boolean;
  /** Close-up crop used for the "Detail" view. */
  zoom?: boolean;
}) {
  const photo = PRODUCT_PHOTOS[productId];
  if (!photo) return <Swatch color={color} label={label} className={className} labelClassName={labelClassName} />;
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ backgroundColor: color }}>
      <Image
        src={photo.src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={`object-cover ${zoom ? 'origin-[50%_30%] scale-[1.9]' : ''}`}
      />
    </div>
  );
}
