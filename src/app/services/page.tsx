import Reveal from "@/components/Reveal";
import {
  Globe,
  Briefcase,
  Shield,
  Phone,
  ExternalLink,
  ArrowUpRight,
  LucideIcon,
} from "lucide-react";

export type Metadata = {
  title: string;
  description: string;
  alternates?: { canonical: string };
};

type Product = {
  name: string;
  domain: string;
  status: string;
  accent: string;
  icon: LucideIcon;
  description: string;
  links: { label: string; url: string; icon: LucideIcon }[];
};

const products: Product[] = [
  {
    name: "Harekrisna Vizag",
    domain: "harekrishnavizag.org",
    status: "Live",
    accent: "var(--color-accent)",
    icon: Globe,
    description:
      "The main public site — profile, services, stories and ways to reach back. Runs the same donation and call-from-phone services as the donor-care cell.",
    links: [
      { label: "Visit site", url: "https://harekrishnavizag.org", icon: ExternalLink },
      { label: "Contacts", url: "/#contact", icon: ArrowUpRight },
    ],
  },
  {
    name: "MakonisSoft",
    domain: "makonissoft.com",
    status: "Live",
    accent: "#9a7bff",
    icon: Briefcase,
    description:
      "The product business. Open-source-friendly builds, web apps and the other side of the same donor-care infrastructure — support for the people behind the platforms.",
    links: [
      { label: "Visit site", url: "https://makonissoft.com", icon: ExternalLink },
      { label: "Contact", url: "/#contact", icon: ArrowUpRight },
    ],
  },
  {
    name: "Donor Care Cell",
    domain: "drm.harekrishnavizag.org",
    status: "Admin",
    accent: "var(--color-accent)",
    icon: Shield,
    description:
      "Behind the scenes of both sites. One admin login that manages every donation made across Harekrisna Vizag and MakonisSoft, plus the call-from-laptop flow.",
    links: [
      { label: "Admin login", url: "https://drm.harekrishnavizag.org", icon: ExternalLink },
      { label: "API", url: "https://api.drm.harekrishnavizag.org", icon: ExternalLink },
    ],
  },
  {
    name: "DRM — Remote Contact Manager",
    domain: "drm.harekrishnavizag.org",
    status: "Live",
    accent: "#9a7bff",
    icon: Phone,
    description:
      "The phone-side service of the donor-care cell. Install the DRM APK on a phone, then a call started from your laptop opens on that phone — no SIM swap, no manual dialing.",
    links: [
      { label: "Install DRM APK", url: "https://drm.harekrishnavizag.org/drm.apk", icon: ExternalLink },
      { label: "Admin login", url: "https://drm.harekrishnavizag.org", icon: ExternalLink },
    ],
  },
  {
    name: "Careers",
    domain: "careers.harekrishnavizag.org",
    status: "Live",
    accent: "var(--color-accent)",
    icon: Briefcase,
    links: [
      { label: "Visit site", url: "https://careers.harekrishnavizag.org", icon: ExternalLink },
      { label: "Apply", url: "https://careers.harekrishnavizag.org/apply", icon: ExternalLink },
    ],
    description:
      "Career portal for positions across technical infrastructure, operations, and platform management.",
  },
];

export default function ServicesPage() {
  return (
    <div className="wrap pb-28 pt-32 sm:pt-36">
      <Reveal>
        <p className="eyebrow">Services</p>
        <h1 className="display mt-5">Services you can use.</h1>
        <p className="lede mt-6">
          Each product below is a live site you can visit right now. Everything
          here is connected — the donor-care cell sits behind the scenes of both
          Harekrisna Vizag and MakonisSoft, so every donation and every call is
          handled in one place.
        </p>
      </Reveal>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 pt-10">
        {products.map((product) => {
          const ProductIcon = product.icon;
          return (
            <article key={product.domain} className="card">
              <div
                className="flex items-start justify-between gap-4 px-5 py-4"
                style={{ borderBottom: "1px solid var(--color-line)" }}
              >
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl"
                    style={{
                      background: product.accent,
                      color:
                        product.accent === "#0a0a0a" ? "#f4f2ec" : "#0a0a0a",
                    }}
                  >
                    <ProductIcon size={18} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-serif text-[1.35rem] leading-[1.1] tracking-[-0.02em]">
                      {product.name}
                    </h3>
                    <p className="mono mt-0.5">{product.domain}</p>
                  </div>
                </div>
                <span className="tag">{product.status}</span>
              </div>

              <p className="px-5 py-3.5 leading-relaxed text-[0.92rem]">
                {product.description}
              </p>

              <div className="flex flex-wrap gap-3 px-5 py-3">
                {product.links.map((link) => {
                  const LinkIcon = link.icon;
                  return (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[13px] no-underline"
                      style={{
                        color: "var(--color-paper)",
                        borderColor: "var(--color-line-strong)",
                      }}
                    >
                      <LinkIcon size={13} aria-hidden="true" />
                      {link.label}
                      <ArrowUpRight size={12} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </article>
          );
        })}
      </div>

      <p className="mono mt-12 text-center text-[0.85rem] tracking-[0.12em]">
        Need something custom — a donation endpoint, a call-from-laptop flow, a
        careers form? Every product above is a real API you can call.
      </p>
    </div>
  );
}
