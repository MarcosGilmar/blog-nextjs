import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image";

type AvatarSize = "xs" | "sm";

type AvatarImageProps = Omit<ImageProps, "height" | "width"> & {
  size?: AvatarSize;
};

const avatarSize = {
  xs: "w-5 h-5",
  sm: "w-9 h-9",
};

export function AvatarImage({ src, alt, size = 'xs', ...rest }: AvatarImageProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-full border-blue-200 border",
        avatarSize[size]
      )}
    >
      <Image src={src} alt={alt} fill {...rest} />
    </div>
  );
}
