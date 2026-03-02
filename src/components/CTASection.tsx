import { Button } from "@/components/ui/button";
import { Check, Mail } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const bullets = [
  "Free consultation—no obligations",
  "Transparent pricing from day one",
  "Launch-ready MVPs in 6-12 weeks",
  "Post-launch support included",
];

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax glow circle
  const glowY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const glowScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.6, 1.2, 0.8]);

  return (
    <section id="cta" ref={sectionRef} className="py-24 bg-cta relative overflow-hidden">
      {/* Parallax decorative glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent/10 blur-3xl will-change-transform"
        style={{ y: glowY, scale: glowScale }}
      />
      {/* Secondary glow */}
      <motion.div
        className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-secondary/8 blur-3xl will-change-transform"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 80]) }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl md:text-4xl font-800 text-primary-foreground mb-6">
            Let's Build Your Product Together
          </h2>
          <p className="text-lg text-ice/80 mb-8 leading-relaxed">
            Whether you have a detailed spec or just a napkin sketch, we're here to help. Book a free strategy call today and discover how affordable exceptional product development can be.
          </p>

          <motion.ul
            className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
            }}
          >
            {bullets.map((b) => (
              <motion.li
                key={b}
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
                }}
                className="flex items-center gap-2 text-sm text-ice/90"
              >
                <Check size={16} className="text-secondary" />
                {b}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-6">
              Book Your Free Strategy Call
            </Button>
            <Button size="lg" variant="outline" className="text-base border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 px-8 py-6 bg-primary">
              <Mail size={18} className="mr-2" />
              hello@anodyx.com
            </Button>
          </motion.div>

          <motion.p
            className="text-sm text-ice/50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7 }}
          >
            Join 50+ satisfied clients who turned their vision into reality
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
