export type NavLink = {
  name: string;
  href: string;
};

// Hrefs are written from the site root so they work from /articles too.
export const primaryNav: NavLink[] = [
  { name: "Work", href: "/#work" },
  { name: "About", href: "/#about" },
  { name: "Stack", href: "/#stack" },
  { name: "Articles", href: "/articles" },
  { name: "Contact", href: "/#contact" },
];
