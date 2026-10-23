import Reveal from "@/components/Reveal";

type ExperienceItem = {
  _id: string;
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  technologies: string[];
  order: number;
};

type EducationItem = {
  _id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: string;
  endYear?: string;
  current: boolean;
  grade?: string;
  description?: string;
  order: number;
};

function dateRange(start: string, end: string | undefined, current: boolean) {
  const tail = current ? "Present" : end;
  if (!start && !tail) return "";
  if (!tail) return start;
  return `${start} — ${tail}`;
}

export default function Experience({
  experiences,
  education,
}: {
  experiences: ExperienceItem[];
  education: EducationItem[];
}) {
  if (experiences.length === 0 && education.length === 0) return null;

  const hasWork = experiences.length > 0;

  return (
    <section
      id="experience"
      className="section"
      style={{ borderTop: "1px solid var(--color-line)" }}
    >
      <div className="wrap">
        {hasWork && (
          <>
            <Reveal>
              <div className="header-row">
                <div>
                  <p className="eyebrow">Experience</p>
                  <h2 className="h2 mt-4">Where I&apos;ve worked.</h2>
                </div>
              </div>
            </Reveal>

            <div>
              {[...experiences]
                .sort((a, b) => a.order - b.order)
                .map((exp, i) => (
                  <Reveal key={exp._id} index={i}>
                    <article
                      className="grid gap-3 py-7 md:grid-cols-[180px_1fr] md:gap-10"
                      style={{ borderTop: "1px solid var(--color-line)" }}
                    >
                      <div className="mono md:pt-1">
                        {dateRange(exp.startDate, exp.endDate, exp.current)}
                      </div>
                      <div>
                        <h3 className="h3">
                          {exp.position}
                          <span style={{ color: "var(--color-fog)" }}> · </span>
                          <span style={{ color: "var(--color-accent)" }}>
                            {exp.company}
                          </span>
                        </h3>
                        <p
                          className="mt-3 max-w-[65ch] text-[0.95rem] leading-relaxed"
                          style={{ color: "var(--color-fog)" }}
                        >
                          {exp.description}
                        </p>
                        {exp.technologies.length > 0 && (
                          <ul className="mt-4 flex flex-wrap gap-1.5 list-none">
                            {exp.technologies.map((tech) => (
                              <li key={tech} className="tag">
                                {tech}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </article>
                  </Reveal>
                ))}
            </div>
          </>
        )}

        {education.length > 0 && (
          <div className={hasWork ? "mt-20" : ""}>
            <Reveal>
              <div className="text-center">
                <p className="eyebrow justify-center">Education</p>
                <h2 className="h2 mt-4">Academic background</h2>
              </div>
            </Reveal>

            <div className="mt-10 space-y-6">
              {[...education]
                .sort((a, b) => a.order - b.order)
                .map((edu, i) => (
                  <Reveal key={edu._id} index={i}>
                    <article className="edu-card mx-auto max-w-2xl px-8 py-12 text-center">
                      <p className="mono uppercase tracking-[0.18em]">
                        Undergraduate degree
                      </p>

                      <h3 className="mt-5 font-serif text-[clamp(2.25rem,5vw,3rem)] leading-none tracking-[-0.03em]">
                        {edu.degree.includes("B.Tech") ? "B.Tech" : edu.degree}
                      </h3>

                      {edu.field && (
                        <p
                          className="mt-3 text-[1.05rem]"
                          style={{ color: "var(--color-paper)" }}
                        >
                          {edu.field}
                        </p>
                      )}

                      {(edu.startYear || edu.endYear) && (
                        <div className="mt-7">
                          <span className="mono text-[var(--color-fog)]">
                            {edu.startYear && edu.endYear
                              ? `${edu.startYear} — ${edu.endYear}`
                              : dateRange(edu.startYear, edu.endYear, edu.current)}
                          </span>
                        </div>
                      )}
                    </article>
                  </Reveal>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
