"use client";

/**
 * Hook for tracking page visits in Next.js App Router
 * Tracks initial page load and route changes
 */

import { getMetricsService } from "@/lib/services/metricsService";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface UsePageTrackingOptions {
  locale?: string;
}

/**
 * Custom hook to track page visits
 * Automatically tracks page views on mount and route changes
 */
export const usePageTracking = (options: UsePageTrackingOptions = {}): void => {
  const pathname = usePathname();
  const { locale } = options;
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    const metricsService = getMetricsService();

    // Only track if pathname has changed (or on initial mount)
    if (pathname && pathname !== previousPathname.current) {
      metricsService.trackPageVisit(pathname, locale);
      previousPathname.current = pathname;
    }
  }, [pathname, locale]);
};

export default usePageTracking;
