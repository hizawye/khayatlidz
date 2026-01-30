import Image from "next/image";

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
}

export function ProfileImage({ src, alt, size = 120 }: ProfileImageProps) {
  return (
    <div
      className="relative rounded-full overflow-hidden border-4 border-brand-200 shadow-lg"
      style={{ width: size, height: size }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover"
      />
    </div>
  );
}
