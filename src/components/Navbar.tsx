import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollTo } = useSmoothScroll();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const navLinks = [
    { label: "Why Anodyx", href: "#why" },
    { label: "How It Works", href: "#process" },
    { label: "Our Work", href: "#work" },
    { label: "Contact", href: "#cta" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsOpen(false);
    scrollTo(href);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl border-b border-border/50 shadow-sm"
          : "bg-transparent border-b border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-4 lg:px-8">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); scrollTo(0, { duration: 1.5 }); }}
          className="flex items-center gap-2.5 group"
        >
          <img
            src="/Logo_2.png"
            alt="Anodyx"
            className="h-9 w-auto transition-transform duration-300 group-hover:scale-110"
          />
          <span className="font-display text-xl font-800 text-foreground tracking-tight">
            Anodyx
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative text-sm font-medium text-muted-foreground hover:text-foreground transition-colors after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <Button asChild>
            <a href="#cta" onClick={(e) => handleNavClick(e, "#cta")}>Book a Free Call</a>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-4 pb-4"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="block py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.label}
            </a>
          ))}
          <Button className="w-full mt-2" asChild>
            <a href="#cta" onClick={(e) => handleNavClick(e, "#cta")}>Book a Free Call</a>
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
