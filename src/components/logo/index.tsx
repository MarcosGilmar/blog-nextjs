import Image, { ImageProps } from "next/image";
import Link from "next/link";

type LogoProps = Omit<ImageProps, "alt">;

export function Logo({ src }: LogoProps) {
  return (
    <Link href="/">
      <Image src={src} alt="Logo site" width={116} height={32} />
    </Link>
  );
}
