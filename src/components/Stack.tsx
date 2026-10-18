import Reveal from "@/components/Reveal";

type Skill = {
  _id: string;
  name: string;
  category: string;
  proficiency?: number;
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

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category} index={i}>
              <div
                className="flex h-full flex-col rounded-2xl p-5 sm:p-6"
                style={{
                  border: "1px solid var(--color-line)",
                  background: "var(--color-ink-soft)",
                }}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="mono uppercase tracking-[0.16em] text-[var(--color-paper)]">
                    {category}
                  </p>
                  <span className="mono text-[11px] text-[var(--color-fog-dim)]">
                    {grouped.get(category)!.length}
                  </span>
                </div>
                {CATEGORY_BLURB[category] && (
                  <p className="mt-1.5 text-[13px] text-[var(--color-fog)]">
                    {CATEGORY_BLURB[category]}
                  </p>
                )}

                <ul className="mt-5 list-none space-y-4">
                  {grouped
                    .get(category)!
                    .sort((a, b) => a.order - b.order)
                    .map((skill) => {
                      const pct = skill.proficiency ?? 0;
                      return (
                        <li key={skill._id}>
                          <div className="flex items-baseline justify-between gap-2">
                            <span className="text-[15px] text-[var(--color-paper)]">
                              {skill.name}
                            </span>
                            {skill.proficiency != null && (
                              <span className="mono text-[11px] text-[var(--color-fog-dim)]">
                                {pct}%
                              </span>
                            )}
                          </div>
                          {skill.proficiency != null && (
                            <div
                              className="mt-2 h-1 w-full overflow-hidden rounded-full"
                              style={{ background: "rgba(255,255,255,0.06)" }}
                            >
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${pct}%`,
                                  background:
                                    "linear-gradient(90deg, rgba(216,255,62,0.55), var(--color-accent))",
                                }}
                              />
                            </div>
                          )}
                        </li>
                      );
                    })}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
