import Image from "next/image";

export function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand-lockup${compact ? " brand-lockup--compact" : ""}`}>
      <Image src="/brand/fullcourthq-icon-rounded.svg" alt="" width={256} height={256} sizes="44px" />
      <span aria-hidden="true">
        FullCourt<b>HQ</b>
      </span>
      <span className="sr-only">FullCourtHQ</span>
    </span>
  );
}
