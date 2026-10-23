import Reveal from "@/components/Reveal";

type Skill = {
  _id: string;
  name: string;
  category: string;
  order: number;
};

const CATEGORY_ORDER = [
  "Frontend",
  "Backend",
  "Database",
  "DevOps & Cloud",
  "DevOps",
  "Tools",
  "Concepts",
];

const CATEGORY_BLURB: Record<string, string> = {
  Frontend: "Modern, reactive web interfaces",
  Backend: "High-throughput APIs & services",
  Database: "Relational & document persistence",
  "DevOps & Cloud": "Cloud infrastructure & deployments",
  DevOps: "Cloud infrastructure & deployments",
  Tools: "Daily drivers & workflows",
  Concepts: "Architectures, algorithms & AI",
};

export default function Stack({ skills }: { skills: Skill[] }) {
  if (skills.length === 0) return null;

  const grouped = new Map<string, Skill[]>();
  for (const skill of skills) {
    const list = grouped.get(skill.category) ?? [];
    list.push(skill);
    grouped.set(skill.category, list);
  }

  const categories = [...grouped.keys()].sort((a, b) => {
    const ia = CATEGORY_ORDER.indexOf(a);
    const ib = CATEGORY_ORDER.indexOf(b);
    return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib);
  });

  const n = categories.length;
  const isFour = n === 4;
  const remainder3 = n % 3;
  const remainder2 = n % 2;

  const gridContainerClass = isFour
    ? "sm:grid-cols-2 lg:grid-cols-4"
    : "sm:grid-cols-2 lg:grid-cols-6";

  return (
    <section
      id="stack"
      className="section"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <div className="wrap">
        <Reveal>
          <div className="header-row">
            <div>
              <p className="eyebrow">Stack</p>
              <h2 className="h2 mt-4">What I build with.</h2>
            </div>
            <p className="lede max-w-[34ch] text-[0.95rem] sm:text-right">
              Chosen for what holds up under real traffic, not for what is
              trending on a Tuesday.
            </p>
          </div>
        </Reveal>

        <div
          className={`grid gap-px overflow-hidden rounded-2xl ${gridContainerClass}`}
          style={{
            background: "var(--color-line)",
            border: "1px solid var(--color-line)",
          }}
        >
          {categories.map((category, i) => {
            let spanClass = "";
            let smSpanClass = "";

            if (isFour) {
              spanClass = "lg:col-span-1";
              smSpanClass = "sm:col-span-1";
            } else {
              const isLastRow3 = remainder3 !== 0 && i >= n - remainder3;
              spanClass = isLastRow3
                ? remainder3 === 1
                  ? "lg:col-span-6"
                  : "lg:col-span-3"
                : "lg:col-span-2";
              smSpanClass =
                remainder2 === 1 && i === n - 1 ? "sm:col-span-2" : "";
            }

            return (
              <Reveal
                key={category}
                index={i}
                className={`${spanClass} ${smSpanClass}`.trim()}
              >
                <div
                  className="flex h-full flex-col p-5 sm:p-6"
                  style={{ background: "var(--color-ink)" }}
                >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="mono uppercase tracking-[0.16em] text-[var(--color-paper)]">
                    {category}
                  </p>
                  <span className="mono text-[11px] text-[var(--color-fog-dim)]">
                    {String(grouped.get(category)!.length).padStart(2, "0")}
                  </span>
                </div>
                {CATEGORY_BLURB[category] && (
                  <p className="mt-1.5 text-[13px] text-[var(--color-fog)]">
                    {CATEGORY_BLURB[category]}
                  </p>
                )}

                <ul className="mt-4 list-none">
                  {grouped
                    .get(category)!
                    .sort((a, b) => a.order - b.order)
                    .map((skill, index) => (
                      <li
                        key={skill._id}
                        className="group flex items-center gap-3 py-2"
                        style={{ borderTop: "1px solid var(--color-line)" }}
                      >
                        <span className="mono w-5 shrink-0 text-[10px] text-[var(--color-fog-dim)] transition-colors group-hover:text-[var(--color-accent)]">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className="text-[14.5px] tracking-[-0.01em] transition-colors group-hover:text-[var(--color-accent)]"
                          style={{ color: "var(--color-paper)" }}
                        >
                          {skill.name}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
