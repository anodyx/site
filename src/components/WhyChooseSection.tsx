import { DollarSign, Zap, Handshake, Wrench, BarChart3, Trophy } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: DollarSign,
    title: "Affordable Excellence",
    desc: "Quality shouldn't cost a fortune. Our hybrid service-product model means competitive pricing without compromising on expertise or delivery standards.",
  },
  {
    icon: Zap,
    title: "Rapid MVP Development",
    desc: "Launch faster, validate smarter. We build lean, market-ready MVPs in weeks—not months—so you can test your idea and iterate based on real user feedback.",
  },
  {
    icon: Handshake,
    title: "True Partnership Approach",
    desc: "Your success is our success. We collaborate closely, share insights, and remain invested in your product's growth long after launch.",
  },
  {
    icon: Wrench,
    title: "Full-Stack Expertise",
    desc: "From backend architecture to frontend design, cloud deployment to mobile apps—our technically skilled team handles every aspect of your product development.",
  },
  {
    icon: BarChart3,
    title: "Agile & Transparent",
    desc: "Stay in the loop with bi-weekly sprints, regular demos, and clear communication. You'll always know exactly what's being built and why.",
  },
  {
    icon: Trophy,
    title: "Validated Track Record",
    desc: "50+ successful projects delivered. We've helped startups secure funding, launch products, and scale to thousands of users.",
  },
];

const WhyChooseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.3], [60, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  return (
    <section id="why" ref={sectionRef} className="py-24 md:py-32 bg-muted/40">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Parallax header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-800 text-foreground mb-5">
            Why Startups & Businesses Choose Anodyx
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            We're not just developers—we're your growth partners. Built by founders, for founders.
          </p>
        </motion.div>

        {/* Clean centered grid — no card borders */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 max-w-5xl mx-auto">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col items-center text-center group"
            >
              {/* Icon container */}
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/15 group-hover:scale-110 transition-all duration-300">
                <f.icon size={30} className="text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="font-display text-lg font-700 text-foreground mb-2">
                {f.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-[280px]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
