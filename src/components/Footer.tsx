import { Linkedin, Twitter, Github } from "lucide-react";
import { motion } from "framer-motion";

const footerLinks = {
  company: [
    { label: "About Anodyx", href: "#" },
    { label: "Our Approach", href: "#" },
    { label: "Case Studies", href: "#work" },
    { label: "Careers", href: "#" },
  ],
  services: [
    { label: "MVP Development", href: "#" },
    { label: "Custom Software", href: "#" },
    { label: "Mobile Apps", href: "#" },
    { label: "Web Applications", href: "#" },
    { label: "Product Consulting", href: "#" },
  ],
  resources: [
    { label: "Blog", href: "#" },
    { label: "Startup Guide", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Pricing Guide", href: "#" },
  ],
};

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Footer = () => (
  <footer className="bg-foreground text-background">
    <motion.div
      className="container mx-auto px-4 lg:px-8 py-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        {/* Brand */}
        <motion.div className="lg:col-span-1" variants={itemVariants}>
          <div className="flex items-center gap-2 mb-3">
            <img src="/Logo_2.png" alt="Anodyx" className="h-8 w-auto brightness-0 invert" />
            <h3 className="font-display text-xl font-800">Anodyx</h3>
          </div>
          <p className="text-sm text-background/60 leading-relaxed">
            Turning Ideas Into Products
          </p>
        </motion.div>

        {/* Company */}
        <motion.div variants={itemVariants}>
          <h4 className="font-display font-700 text-sm uppercase tracking-wider mb-4 text-background/80">Company</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            {footerLinks.company.map((link) => (
              <li key={link.label}><a href={link.href} className="hover:text-background transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </motion.div>

        {/* Services */}
        <motion.div variants={itemVariants}>
          <h4 className="font-display font-700 text-sm uppercase tracking-wider mb-4 text-background/80">Services</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            {footerLinks.services.map((link) => (
              <li key={link.label}><a href={link.href} className="hover:text-background transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}
        <motion.div variants={itemVariants}>
          <h4 className="font-display font-700 text-sm uppercase tracking-wider mb-4 text-background/80">Resources</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            {footerLinks.resources.map((link) => (
              <li key={link.label}><a href={link.href} className="hover:text-background transition-colors">{link.label}</a></li>
            ))}
          </ul>
        </motion.div>

        {/* Contact */}
        <motion.div variants={itemVariants}>
          <h4 className="font-display font-700 text-sm uppercase tracking-wider mb-4 text-background/80">Contact</h4>
          <ul className="space-y-2.5 text-sm text-background/60">
            <li>hello@anodyx.com</li>
            <li>Hyderabad, India</li>
          </ul>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-background/50 hover:text-background transition-colors" aria-label="LinkedIn"><Linkedin size={18} /></a>
            <a href="#" className="text-background/50 hover:text-background transition-colors" aria-label="Twitter"><Twitter size={18} /></a>
            <a href="#" className="text-background/50 hover:text-background transition-colors" aria-label="GitHub"><Github size={18} /></a>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar */}
      <motion.div
        className="border-t border-background/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4"
        variants={itemVariants}
      >
        <p className="text-xs text-background/40">© 2025 Anodyx. All rights reserved.</p>
        <div className="flex gap-6 text-xs text-background/40">
          <a href="#" className="hover:text-background/70 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-background/70 transition-colors">Terms of Service</a>
        </div>
      </motion.div>
    </motion.div>
  </footer>
);

export default Footer;
