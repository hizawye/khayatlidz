import Image from "next/image";
import { Box } from "@mui/material";

interface ProfileImageProps {
  src: string;
  alt: string;
  size?: number;
}

export function ProfileImage({ src, alt, size = 160 }: ProfileImageProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        paddingBottom: '100%', // Creates a square aspect ratio
        borderRadius: '50%',
        overflow: 'hidden',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 120px, (max-width: 1024px) 140px, 160px"
        className="object-cover"
        priority
      />
    </Box>
  );
} 