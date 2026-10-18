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
  "DevOps",
  "Tools",
  "Design",
];

const CATEGORY_BLURB: Record<string, string> = {
  Frontend: "Interfaces people actually use",
  Backend: "APIs, services and business logic",
  Database: "Where the data lives",
  DevOps: "Shipping and keeping it up",
  Tools: "Daily drivers",
  Design: "Making it look right",
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
          className="grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3"
          style={{
            background: "var(--color-line)",
            border: "1px solid var(--color-line)",
          }}
        >
          {categories.map((category, i) => (
            <Reveal key={category} index={i}>
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
          ))}
        </div>
      </div>
    </section>
  );
}
