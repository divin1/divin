export default function About() {
  return (
    <div className="mx-auto mt-20 leading-relaxed md:max-w-prose">
      <div>
        <h1 className="my-2 text-2xl font-bold">About me</h1>
        <p>
          Hi, I&rsquo;m Nicolas. I was born in 1996 and raised in the beautiful and sunny region of
          Ticino, Switzerland.
        </p>
        <p>
          Today, I&rsquo;m based in Bern, working as full-stack engineer at a startup that&rsquo;s
          on a mission to bring real innovation to one of the most traditional, slow-moving
          industries out there. We&rsquo;re using technology to challenge the status quo and
          it&rsquo;s as exciting as it sounds.
        </p>
        <p>
          From a young age, I&rsquo;ve been driven by curiosity. Whether it was taking apart Lego
          sets, trying to understand machines and computers, or simply figuring out what makes
          people tick, I&rsquo;ve always loved learning how things work, and while my early
          experiments were fueled by spontaneous bursts of interest, I later discovered that focus
          can transform that instinctive and sporadic drive into something truly valuable.
        </p>
        <p>
          Computer Science and the digital world instantly resonated with my need for expression.
          It&rsquo;s a fast-evolving, fluid space, constantly shifting and expanding. It offers
          endless opportunities for discovery, continuous learning, and technical challenges, all
          while allowing for unlimited freedom in creativity and self-expression. There&rsquo;s
          something uniquely empowering about sitting down at a desk, opening a laptop, and being
          able to build something valuable from nothing &mdash; well, almost nothing.
        </p>
        <p>
          Outside of work, you&rsquo;ll most likely find me in the mountains. I&rsquo;ve always been
          drawn to nature and the outdoors, especially mountains who as time has passed have become
          my most beloved playground. I&rsquo;m passionate about outdoor sports like trail running
          and climbing &mdash; and while I might describe myself as a <i>type 2 fun</i> enjoyer,
          it&rsquo;s not just for the physical challenge, but mostly as a way to explore more of the
          world. I see movement as a means to discovery.
        </p>
        <p>
          I created this site to share my journey through the projects I&rsquo;m working on, ideas
          I&rsquo;m exploring, things I&rsquo;m learning, and, of course, the occasional adventure
          story.
        </p>

        <p className="mt-5">
          Feel free to drop me a line at{" "}
          <a href="mailto:hello@divin.me" className="text-primary hover:text-primary-accent">
            hello@divin.me
          </a>{" "}
          &mdash; I&rsquo;ll try to get back to you asap.
        </p>
      </div>

      <div className="mt-5">
        <h1 className="my-2 text-2xl font-bold">Why divin?</h1>
        <p>
          The name &rdquo;divin&rdquo; is a blend of my initials &mdash; &rdquo;divi&rdquo; from my
          last name and &rdquo;n&rdquo; from my first.
          <br />
          It all started back in university, where &rdquo;divin1&rdquo; was the shorthand assigned
          to me for accessing internal systems. I liked the sound of it, and when I saw it was
          available on GitHub, I grabbed divin1. Later, I went with divin for my website, it just
          stuck.
        </p>
      </div>
    </div>
  );
}
