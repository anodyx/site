import { motion } from "framer-motion";
import { useParallax } from "@/hooks/useParallax";

interface ParallaxDividerProps {
  variant?: "wave" | "dots" | "gradient";
  className?: string;
  flip?: boolean;
}

const ParallaxDivider = ({ variant = "gradient", className = "", flip = false }: ParallaxDividerProps) => {
  const { ref, y } = useParallax({ speed: 0.15 });
  const { y: y2 } = useParallax({ speed: -0.1 });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden h-32 md:h-48 ${className}`}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      {variant === "gradient" && (
        <>
          <motion.div
            style={{ y }}
            className="absolute left-[10%] top-[20%] w-24 h-24 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary/8 to-accent/12 blur-2xl"
          />
          <motion.div
            style={{ y: y2 }}
            className="absolute right-[15%] top-[30%] w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-tl from-secondary/15 to-primary/8 blur-2xl"
          />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        </>
      )}

      {variant === "wave" && (
        <>
          <motion.div style={{ y }} className="absolute inset-x-0 top-0 h-full">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
                fill="hsl(var(--muted))"
                fillOpacity="0.3"
              />
            </svg>
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute inset-x-0 top-2 h-full">
            <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,80 C360,20 720,100 1080,40 C1260,10 1360,50 1440,80 L1440,120 L0,120 Z"
                fill="hsl(var(--primary))"
                fillOpacity="0.05"
              />
            </svg>
          </motion.div>
        </>
      )}

      {variant === "dots" && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-primary/6"
              style={{
                y: i % 2 === 0 ? y : y2,
                left: `${10 + i * 11}%`,
                top: `${20 + (i % 3) * 25}%`,
                width: `${8 + (i % 3) * 6}px`,
                height: `${8 + (i % 3) * 6}px`,
              }}
            />
          ))}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-gradient-to-r from-transparent via-border/40 to-transparent" />
        </>
      )}
    </div>
  );
};

export default ParallaxDivider;
