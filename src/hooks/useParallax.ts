import { useRef } from "react";
import { useScroll, useTransform, MotionValue } from "framer-motion";

interface UseParallaxOptions {
  speed?: number;
  inputRange?: [number, number];
}

/**
 * Hook for creating parallax scroll effects via framer-motion.
 * @param speed - Multiplier for parallax movement. Positive = same direction, negative = reverse.
 *                e.g. 0.3 means element moves at 30% of scroll speed.
 * @returns { ref, y } - ref to attach to the container, y MotionValue for the transform.
 */
export function useParallax({ speed = 0.3, inputRange }: UseParallaxOptions = {}): {
  ref: React.RefObject<HTMLDivElement>;
  y: MotionValue<number>;
  scrollYProgress: MotionValue<number>;
} {
  const ref = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const range = inputRange ?? [-300 * speed, 300 * speed];
  const y = useTransform(scrollYProgress, [0, 1], range);

  return { ref, y, scrollYProgress };
}

/**
 * Hook for creating an opacity fade based on scroll position.
 */
export function useScrollFade(
  inputRange: [number, number] = [0, 0.3],
  outputRange: [number, number] = [0, 1]
) {
  const ref = useRef<HTMLDivElement>(null!);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, inputRange, outputRange);

  return { ref, opacity, scrollYProgress };
}
