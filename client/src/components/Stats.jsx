import CountUp from '../reactbits/CountUp';
import siteConfig from '../config/siteConfig';

const Stats = () => {
  return (
    <section
      aria-label="Statistics"
      className="border-y border-[#1e1e2e] bg-[#111118]"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <ul
          className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-16"
          role="list"
        >
          {siteConfig.stats.map(({ value, label, suffix }) => (
            <li
              key={label}
              className="flex flex-col items-center gap-1 text-center"
            >
              <span className="text-4xl font-extrabold sm:text-5xl">
                <CountUp
                  from={0}
                  to={value}
                  duration={2}
                  delay={0.2}
                  easing="easeOut"
                  className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent"
                />
                {suffix && (
                  <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-blue-400 bg-clip-text text-transparent">
                    {suffix}
                  </span>
                )}
              </span>
              <span className="text-sm font-medium uppercase tracking-widest text-slate-400">
                {label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Stats;
