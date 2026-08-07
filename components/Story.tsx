import Image from "next/image";

export default function Story() {
  return (
    <div className="border-b">
      {/* Intro */}
      <section className="container mx-auto grid gap-12 px-6 py-24 md:grid-cols-12 md:gap-8 md:py-32">
        <div className="flex flex-col justify-center md:col-span-6">
          <span className="text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">
            物語 — Story
          </span>

          <h1 className="mt-6 max-w-2xl font-serif text-4xl leading-[1.3] tracking-tight text-foreground sm:text-5xl">
            静けさは、
            <br />
            手間を惜しまないことから生まれる。
          </h1>

          <div className="mt-8 h-px w-12 bg-foreground/20" />

          <p className="mt-8 max-w-md text-sm leading-relaxed text-muted-foreground">
            Stillness is not the absence of effort — it is what remains after
            everything unnecessary has been removed.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/Story 1.jpg"
              alt="A figure draped in pale fabric, seated on sand with a laptop, in soft desert light"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 静寂 — Stillness */}
      <section className="container mx-auto grid gap-12 px-6 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="md:col-span-5">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/Story.jpg"
              alt="Incense smoke rising from a ceramic vessel beside dried grasses"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <span className="font-serif text-3xl text-foreground/20">01</span>
          <h2 className="mt-4 font-serif text-2xl tracking-tight text-foreground">
            静寂
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              Stillness
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            香が立ちのぼるように、一つひとつの所作にはゆとりがある。
            急がないことこそが、質を守る唯一の方法だと私たちは考える。
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/60">
            Like incense rising unhurried through still air, every gesture
            here is unforced. Slowness is not a limitation — it is how
            quality is protected.
          </p>
        </div>
      </section>

      {/* 建築 — Form */}
      <section className="container mx-auto grid gap-12 border-t px-6 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="flex flex-col justify-center md:col-span-6 md:row-start-1">
          <span className="font-serif text-3xl text-foreground/20">02</span>
          <h2 className="mt-4 font-serif text-2xl tracking-tight text-foreground">
            佇まい
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              Form
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            曲線は、力を誇示するためではなく、光と影を受け入れるために描かれる。
            構造そのものが、静かな案内役となる。
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/60">
            A curve is drawn not to impress, but to let light and shadow move
            through a space naturally. The structure itself becomes a quiet
            guide.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            <Image
              src="/Story 4.jpg"
              alt="A curved stone staircase lit from beneath, with a vase on a side table"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 光 — Light */}
      <section className="container mx-auto grid gap-12 border-t px-6 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="md:col-span-5">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/Story 3.jpg"
              alt="Sheer linen curtains moving in the breeze beside a sea view"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center md:col-span-6 md:col-start-7">
          <span className="font-serif text-3xl text-foreground/20">03</span>
          <h2 className="mt-4 font-serif text-2xl tracking-tight text-foreground">
            光と風
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              Light
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            麻布が風にゆれるとき、部屋は呼吸をはじめる。
            自然を締め出すのではなく、招き入れる暮らしを大切にしたい。
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/60">
            When linen moves with the wind, a room begins to breathe. We
            design to invite the outside in, not shut it out.
          </p>
        </div>
      </section>

      {/* 時間 — Time */}
      <section className="container mx-auto grid gap-12 border-t px-6 py-20 md:grid-cols-12 md:gap-8 md:py-28">
        <div className="flex flex-col justify-center md:col-span-6 md:row-start-1">
          <span className="font-serif text-3xl text-foreground/20">04</span>
          <h2 className="mt-4 font-serif text-2xl tracking-tight text-foreground">
            時間
            <span className="ml-3 text-sm font-normal text-muted-foreground">
              Time
            </span>
          </h2>
          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            良いものは、急いで作られない。
            経年変化を恐れず、むしろその変化こそを美しさと呼びたい。
          </p>
          <p className="mt-4 max-w-sm text-xs leading-relaxed text-muted-foreground/60">
            Good things are never made in haste. We don&apos;t fear how
            objects change with time — we call that change beauty.
          </p>
        </div>

        <div className="md:col-span-5 md:col-start-8">
          <div className="relative aspect-[4/5] w-full overflow-hidden">
            <Image
              src="/Story 2.jpg"
              alt="A stack of books beside a ceramic vase with dried flowers, in soft light"
              fill
              sizes="(min-width: 768px) 40vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  );
}