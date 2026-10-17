import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { primaryNav } from "@/lib/nav";
import { fallbackProfile } from "@/lib/fallback-data";

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar
        links={primaryNav}
        email={fallbackProfile.email}
        currentPath="/services"
      />
      <main>{children}</main>
      <Footer
        name={fallbackProfile.shortName ?? fallbackProfile.name}
        email={fallbackProfile.email}
        availability={fallbackProfile.availability}
        links={primaryNav}
        socialLinks={fallbackProfile.socialLinks}
      />
    </>
  );
}
