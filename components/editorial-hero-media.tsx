import type { CSSProperties } from "react";
import Image from "next/image";

type EditorialHeroMediaProps = {
  src: string;
  desktopPosition?: string;
  mobilePosition?: string;
};

type HeroMediaStyle = CSSProperties & {
  "--hero-position-desktop": string;
  "--hero-position-mobile": string;
};

export function EditorialHeroMedia({
  src,
  desktopPosition = "82% 50%",
  mobilePosition = "72% 50%",
}: EditorialHeroMediaProps) {
  const style: HeroMediaStyle = {
    "--hero-position-desktop": desktopPosition,
    "--hero-position-mobile": mobilePosition,
  };

  return (
    <div className="editorial-hero-media" aria-hidden="true" style={style}>
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        quality={80}
        preload
      />
    </div>
  );
}
