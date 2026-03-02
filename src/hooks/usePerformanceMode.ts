import { useState, useEffect } from 'react';

interface PerformanceMode {
  isLowEnd: boolean;
  reducedMotion: boolean;
}

/**
 * Hook to detect device performance capabilities and user preferences
 * Returns performance mode settings to optimize rendering
 */
export function usePerformanceMode(): PerformanceMode {
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>({
    isLowEnd: false,
    reducedMotion: false,
  });

  useEffect(() => {
    // Check for prefers-reduced-motion
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect low-end devices using multiple heuristics
    const isLowEnd = (() => {
      // Check hardware concurrency (CPU cores)
      const cores = navigator.hardwareConcurrency || 4;
      if (cores <= 2) return true;

      // Check device memory (if available)
      const memory = (navigator as any).deviceMemory;
      if (memory && memory <= 2) return true;

      // Check for mobile devices (generally less powerful)
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

      // Check connection speed (if available)
      const connection = (navigator as any).connection;
      if (connection) {
        const effectiveType = connection.effectiveType;
        if (effectiveType === 'slow-2g' || effectiveType === '2g') return true;
      }

      // If mobile and fewer than 4 cores, consider low-end
      if (isMobile && cores < 4) return true;

      return false;
    })();

    setPerformanceMode({
      isLowEnd,
      reducedMotion,
    });
  }, []);

  return performanceMode;
}
