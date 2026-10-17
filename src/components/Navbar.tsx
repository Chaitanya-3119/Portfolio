"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  ChevronDown,
} from "lucide-react";
import { Github, Linkedin, Twitter } from "@/components/Icons";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Blog", href: "#blog" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "glass py-3"
            : "bg-transparent py-5"
        }`}
        style={
          scrolled
            ? {
                backgroundColor: "rgba(10, 10, 15, 0.88)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                borderBottom: "1px solid rgba(255,255,255,0.08)",
                boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
              }
            : {}
        }
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <Link
            href="#home"
            style={{
              fontSize: "1.5rem",
              fontWeight: 800,
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #6c63ff, #00d4ff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.1rem",
                fontWeight: 900,
                color: "#fff",
              }}
            >
              C
            </span>
            <span className="gradient-text" style={{ letterSpacing: "-0.02em" }}>
              haitanya
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
            className="desktop-nav"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                style={{
                  padding: "8px 16px",
                  borderRadius: "8px",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  textDecoration: "none",
                  transition: "all 0.3s ease",
                  color:
                    activeSection === link.href.replace("#", "")
                      ? "#6c63ff"
                      : "#a0a0b8",
                  background:
                    activeSection === link.href.replace("#", "")
                      ? "rgba(108, 99, 255, 0.1)"
                      : "transparent",
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Social + Mobile Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div className="desktop-nav" style={{ display: "flex", gap: "8px" }}>
              <a
                href="https://github.com/chaitanya"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a0a0b8",
                  transition: "all 0.3s",
                  textDecoration: "none",
                }}
              >
                <Github size={16} />
              </a>
              <a
                href="https://linkedin.com/in/chaitanya"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  border: "1px solid rgba(255,255,255,0.06)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#a0a0b8",
                  transition: "all 0.3s",
                  textDecoration: "none",
                }}
              >
                <Linkedin size={16} />
              </a>
            </div>

            <button
              className="mobile-toggle"
              onClick={() => setIsOpen(!isOpen)}
              style={{
                display: "none",
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                border: "1px solid rgba(255,255,255,0.06)",
                background: "rgba(255,255,255,0.03)",
                color: "#f0f0f5",
                cursor: "pointer",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="glass"
            style={{
              position: "fixed",
              top: "70px",
              left: "16px",
              right: "16px",
              zIndex: 49,
              borderRadius: "16px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "4px",
            }}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "block",
                    padding: "12px 16px",
                    borderRadius: "10px",
                    fontSize: "1rem",
                    fontWeight: 500,
                    textDecoration: "none",
                    color:
                      activeSection === link.href.replace("#", "")
                        ? "#6c63ff"
                        : "#a0a0b8",
                    background:
                      activeSection === link.href.replace("#", "")
                        ? "rgba(108, 99, 255, 0.1)"
                        : "transparent",
                  }}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @media (max-width: 900px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
