import Image from "next/image";

type GalleryImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

type GalleryProps = {
  images: GalleryImage[];
};

export default function Gallery({ images }: GalleryProps) {
  return (
    <div className="not-prose columns-2 gap-4 space-y-4 md:columns-3">
      {images.map((image, index) => (
        <Image
          key={index}
          className="rounded-lg shadow-md"
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
        />
      ))}{" "}
    </div>
  );
}
