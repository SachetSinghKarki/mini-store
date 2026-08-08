import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="border-b">
      <div className="container mx-auto grid gap-16 px-6 py-24 md:grid-cols-12 md:gap-8 md:py-32">
        {/* Copy */}
        <div className="flex flex-col justify-center md:col-span-6">
          <span className="mb-6 text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            間 — the space between things
          </span>

          <h1 className="max-w-md font-serif text-4xl leading-[1.25] tracking-tight text-foreground sm:text-5xl">
            Objects made
            <br />
            to be used quietly.
          </h1>

          <div className="mt-8 h-px w-12 bg-foreground/20" />

          <p className="mt-8 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Ceramics, linen, and unlacquered wood, chosen for restraint. Each
            piece leaves room for the material to speak for itself.
          </p>

          <div className="mt-6 inline-flex w-fit items-center gap-2 border border-foreground/20 px-4 py-2 text-xs text-muted-foreground">
            <span className="tracking-wide">
              Use code{" "}
              <span className="font-medium text-foreground">MINIMAL25</span>{" "}
              for 25% off
            </span>
          </div>

          <div className="mt-10 flex items-center gap-6">
            <Link
              href="/products"
              className="inline-flex h-11 items-center border border-foreground px-6 text-sm font-medium tracking-wide text-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              商品を探す
              <span className="ml-2 text-xs text-muted-foreground group-hover:text-background">
                / Products
              </span>
            </Link>
            <Link
              href="/story"
              className="text-sm font-medium text-muted-foreground underline decoration-muted-foreground/40 underline-offset-4 transition-colors hover:text-foreground"
            >
              私たちについて / Story
            </Link>
          </div>
        </div>

        {/* Oval image */}
        <div className="flex items-center justify-center md:col-span-6">
          <div className="relative h-[19rem] w-[15rem] overflow-hidden rounded-[50%] sm:h-[26rem] sm:w-[20rem]">
            <Image
              src="/Hero.jpg"
              alt="Ceramics and linen arranged on a wooden table"
              fill
              sizes="(min-width: 640px) 20rem, 15rem"
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}