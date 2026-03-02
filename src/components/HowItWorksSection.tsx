import { Lightbulb, Puzzle, Rocket } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";

const steps = [
  {
    icon: Lightbulb,
    title: "Share Your Vision",
    desc: "Book a free 30-minute strategy call where we dive deep into your idea, target audience, and business goals. No technical jargon—just honest conversation.",
    skeletonLabel: "Strategy Call Preview",
  },
  {
    icon: Puzzle,
    title: "Collaborate on a Solution",
    desc: "We design a detailed roadmap together. Our team creates wireframes, technical architecture, and a phased development plan tailored to your budget.",
    skeletonLabel: "Roadmap & Wireframes",
  },
  {
    icon: Rocket,
    title: "Watch Your Idea Come to Life",
    desc: "Our agile development kicks off. You'll receive regular updates, participate in sprint demos, and see your product evolve in real-time.",
    skeletonLabel: "Sprint Demo Preview",
  },
];

/* ── Arrow 1: curves UP from step 1 → step 2 ── */
const DashedArrowUp = () => (
  <svg
    className="hidden lg:block absolute -right-[58%] top-2 w-[116%] h-14 pointer-events-none z-10"
    viewBox="0 0 220 56"
    fill="none"
  >
    <path
      d="M 12 48 C 70 -8, 150 -8, 208 48"
      stroke="hsl(var(--muted-foreground) / 0.30)"
      strokeWidth="1.6"
      strokeDasharray="7 5"
      fill="none"
    />
    <polygon
      points="202,38 212,50 200,50"
      fill="hsl(var(--muted-foreground) / 0.30)"
    />
  </svg>
);

/* ── Arrow 2: curves DOWN from step 2 → step 3 (reversed arc) ── */
const DashedArrowDown = () => (
  <svg
    className="hidden lg:block absolute -right-[58%] top-6 w-[116%] h-14 pointer-events-none z-10"
    viewBox="0 0 220 56"
    fill="none"
  >
    <path
      d="M 12 8 C 70 64, 150 64, 208 8"
      stroke="hsl(var(--muted-foreground) / 0.30)"
      strokeWidth="1.6"
      strokeDasharray="7 5"
      fill="none"
    />
    <polygon
      points="202,18 212,6 200,6"
      fill="hsl(var(--muted-foreground) / 0.30)"
    />
  </svg>
);

/* ── Skeleton image placeholder (rotated ~25°) ── */
const SkeletonImage = () => (
  <div
    className="w-[260px] h-[180px] md:w-[320px] md:h-[220px] rounded-2xl bg-muted/60 border border-border/40 shadow-xl overflow-hidden"
    style={{ transform: "rotate(-22deg)" }}
  >
    {/* Fake browser chrome */}
    <div className="h-7 bg-muted flex items-center gap-1.5 px-3 border-b border-border/30">
      <span className="w-2.5 h-2.5 rounded-full bg-destructive/50" />
      <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/50" />
      <span className="w-2.5 h-2.5 rounded-full bg-green-400/50" />
    </div>
    {/* Skeleton content lines */}
    <div className="p-4 space-y-3">
      <div className="h-3 w-3/4 rounded bg-border/60" />
      <div className="h-3 w-1/2 rounded bg-border/50" />
      <div className="h-8 w-full rounded bg-border/40 mt-3" />
      <div className="flex gap-2 mt-2">
        <div className="h-3 w-1/3 rounded bg-border/40" />
        <div className="h-3 w-1/4 rounded bg-border/30" />
      </div>
      <div className="h-3 w-2/3 rounded bg-border/30" />
    </div>
  </div>
);

/* ── Detail panel content for the hovered step ── */
const DetailPanel = ({
  step,
}: {
  step: (typeof steps)[number];
}) => (
  <motion.div
    key={step.title}
    initial={{ opacity: 0, y: 60 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    className="flex flex-col md:flex-row items-center gap-10 md:gap-16 justify-center"
  >
    {/* Text side */}
    <div className="max-w-md text-center md:text-left">
      <h3 className="font-display text-2xl font-700 text-foreground mb-3">
        {step.title}
      </h3>
      <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
    </div>

    {/* Rotated skeleton image */}
    <div className="flex-shrink-0 flex items-center justify-center py-4">
      <SkeletonImage />
    </div>
  </motion.div>
);

const HowItWorksSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerY = useTransform(scrollYProgress, [0, 0.25], [80, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.18], [0, 1]);

  // Change active step based on scroll progress instead of auto-cycling
  useEffect(() => {
    if (isHovering) return;

    const unsubscribe = scrollYProgress.on('change', (latest) => {
      // Divide scroll progress into three sections for three steps
      // 0 to 0.33 = step 0, 0.33 to 0.66 = step 1, 0.66 to 1 = step 2
      if (latest < 0.33) {
        setActiveStep(0);
      } else if (latest < 0.66) {
        setActiveStep(1);
      } else {
        setActiveStep(2);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isHovering]);

  const handleMouseEnter = useCallback((i: number) => {
    setIsHovering(true);
    setActiveStep(i);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="py-24 md:py-32 bg-background"
    >
      <div className="container mx-auto px-4 lg:px-8">
        {/* Parallax header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-20"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-800 text-primary mb-5">
            From Idea to Launch in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Our proven process takes you from concept to market-ready product
            with clarity and confidence.
          </p>
        </motion.div>

        {/* ═══════ ROW 1: Step icons with arrows ═══════ */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 max-w-5xl mx-auto mb-16">
          {steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.65,
                delay: i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col items-center text-center"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Dashed connector arrows */}
              {i === 0 && <DashedArrowUp />}
              {i === 1 && <DashedArrowDown />}

              {/* Icon container */}
              <motion.div
                animate={{
                  scale: activeStep === i ? 1.15 : 1,
                  y: activeStep === i ? -6 : 0,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`w-20 h-20 rounded-2xl shadow-lg flex items-center justify-center mb-5 cursor-pointer transition-colors duration-300 ${
                  activeStep === i
                    ? "bg-primary shadow-primary/20"
                    : "bg-primary/10 shadow-primary/5"
                }`}
              >
                <s.icon
                  size={36}
                  className={`transition-colors duration-300 ${
                    activeStep === i ? "text-primary-foreground" : "text-primary"
                  }`}
                  strokeWidth={1.6}
                />
              </motion.div>

              {/* Title */}
              <h3
                className={`font-display text-lg font-700 transition-colors duration-300 ${
                  activeStep === i ? "text-foreground" : "text-primary"
                }`}
              >
                {s.title}
              </h3>

              {/* Active indicator dot */}
              <motion.div
                animate={{
                  scale: activeStep === i ? 1 : 0,
                  opacity: activeStep === i ? 1 : 0,
                }}
                className="w-1.5 h-1.5 rounded-full bg-primary mt-3"
              />
            </motion.div>
          ))}
        </div>

        {/* ═══════ ROW 2: Detail panel (description + skeleton image) ═══════ */}
        <div className="max-w-4xl mx-auto min-h-[280px] md:min-h-[260px] flex items-center justify-center relative overflow-hidden rounded-2xl bg-muted/30 border border-border/30 px-8 py-10">
          <AnimatePresence mode="wait">
            <DetailPanel step={steps[activeStep]} />
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
