import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ footer = false }: { footer?: boolean }) {
  const sizes = "(max-width: 767px) 180px, (max-width: 1279px) 195px, 225px";

  return (
    <Link
      className={`brand-logo ${footer ? "brand-logo--footer" : ""}`}
      href="/"
      aria-label="Kreative Sparq home"
    >
      {footer ? (
        <Image
          src="/brand/kreative-sparq-logo-dark-mode.png"
          alt="Kreative Sparq"
          width={1944}
          height={809}
          sizes={sizes}
        />
      ) : (
        <>
          <Image
            className="brand-logo__light"
            src="/brand/kreative-sparq-logo-light-mode.png"
            alt="Kreative Sparq"
            width={1944}
            height={809}
            sizes={sizes}
          />
          <Image
            className="brand-logo__dark"
            src="/brand/kreative-sparq-logo-dark-mode.png"
            alt="Kreative Sparq"
            width={1944}
            height={809}
            sizes={sizes}
          />
        </>
      )}
    </Link>
  );
}
