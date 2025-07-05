import { ImageProps } from "next/image";
import Image from "next/image";

export default function ImageWrapper({ src, alt, width, height }: ImageProps) {
  return (
    <div className="relative my-5 w-full overflow-hidden rounded-xl shadow-lg">
      <Image
        src={src}
        alt={alt || ""}
        width={width || 800}
        height={height || 600}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
