import { ImageWithFallback } from "./figma/ImageWithFallback";

export function FeaturedImage({ src, alt, title, subtitle }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="relative">
        <ImageWithFallback 
          src={src}
          alt={alt}
          className="w-full h-48 object-cover"
        />
        {title && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
            <h4 className="text-white font-medium">{title}</h4>
            {subtitle && <p className="text-gray-200 text-sm">{subtitle}</p>}
          </div>
        )}
      </div>
    </div>
  );
}
