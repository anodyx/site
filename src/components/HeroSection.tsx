import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { useSmoothScroll } from "@/components/SmoothScrollProvider";
import WireframeSphere from "./WireframeSphere";

const testimonials = [
  {
    quote: "As the Convener of SRKR Coding Club, I truly appreciate the amazing work done by the team in developing the websites for HackOverflow-2K25 and IconCoderz-2K26. They understood our vision perfectly and turned it into vibrant, user-friendly platforms that reflect the spirit of our coding events. ",
    name: "David Raju",
    title: "Convener, SRKR Coding Club",
  },
  {
    quote: "Your approach to understanding business requirements and handling our last-minute requests can sometimes be quite frustrating, yet the level of professionalism you consistently demonstrate is truly commendable. Despite the challenges and the pressure that comes with sudden changes and tight deadlines, you always manage to stay composed, focused, and solution-oriented.",
    name: "Sai Krishna",
    title: "Founder, Raja Cycle Stores",
  },
  {
    quote: "Professional, responsive, and technically brilliant. Anodyx didn't just build our product—they became our technology partner.",
    name: "Priya Sharma",
    title: "CEO, EduConnect",
  },
];

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax: background moves slower
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  // 3D sphere parallax (opposite direction for depth)
  const sphereY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const sphereOpacity = useTransform(scrollYProgress, [0, 0.6], [0.35, 0.08]);
  // Content fades out as you scroll past
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  return (
    <section ref={sectionRef} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0 will-change-transform" style={{ y: bgY }}>
        <img src={heroBg} alt="Anodyx digital transformation background" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-hero opacity-80" />
      </motion.div>

      {/* 3D Wireframe Sphere — ambient background layer */}
      <motion.div
        className="absolute inset-0 flex items-center justify-end pointer-events-none will-change-transform z-0 pr-8 md:pr-16 lg:pr-24"
        style={{ y: sphereY, opacity: sphereOpacity }}
      >
        <div className="w-[700px] h-[700px] md:w-[900px] md:h-[900px] lg:w-[1100px] lg:h-[1100px]">
          <WireframeSphere width="100%" height="100%" />
        </div>
      </motion.div>

      <motion.div
        className="container relative z-10 mx-auto px-4 lg:px-8 pt-28 pb-20"
        style={{ opacity: contentOpacity, scale: contentScale }}
      >
        <div className="w-full max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-800 leading-tight text-primary-foreground mb-6">
              We turn ambitious ideas into working products you can afford.
            </h1>
            <p className="text-lg md:text-xl text-ice/90 mb-8 max-w-2xl leading-relaxed">
              Partner with a team that builds smart, scalable solutions—without breaking your budget. From MVP to market-ready product, we're with you every step of the way.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
          >
            <Button size="lg" variant="secondary" className="text-base font-semibold px-8 py-6" asChild>
              <a href="#cta" onClick={(e) => { e.preventDefault(); scrollTo("#cta"); }}>
                Book a Free Strategy Call
              </a>
            </Button>
            {/* <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-sm text-ice/80">4.9/5 from 50+ clients</span>
            </div> */}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-sm text-ice/60 mb-10"
          >
            "Fast, affordable, and exactly what we needed" — startup founders & businesses trust us
          </motion.p>
        </div>

        {/* Testimonial cards with stagger */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } },
          }}
          className="grid md:grid-cols-3 gap-6 mt-4"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.95 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="rounded-lg p-6 bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors duration-300"
            >
              <div className="flex mb-3">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-ice/90 leading-relaxed mb-4">"{t.quote}"</p>
              <div>
                <p className="text-sm font-semibold text-primary-foreground">{t.name}</p>
                <p className="text-xs text-ice/60">{t.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
