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

        <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal key={category} index={i}>
              <div>
                <p className="mono uppercase tracking-[0.16em]">{category}</p>
                <ul className="mt-3 list-none">
                  {grouped
                    .get(category)!
                    .sort((a, b) => a.order - b.order)
                    .map((skill) => (
                      <li
                        key={skill._id}
                        className="py-2.5 text-[15px]"
                        style={{ borderTop: "1px solid var(--color-line)" }}
                      >
                        {skill.name}
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
