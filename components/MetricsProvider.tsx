"use client";

/**
 * Client-side metrics provider component
 * Initializes metrics tracking and provides global tracking hooks
 */

import { usePageTracking } from "@/hooks/usePageTracking";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { useWebVitals } from "@/hooks/useWebVitals";
import { initializeMetrics } from "@/lib/services/metricsService";
import { useEffect, useState } from "react";

interface MetricsProviderProps {
  children: React.ReactNode;
  locale?: string;
}

/**
 * MetricsProvider component that initializes tracking on mount
 * Should be placed high in the component tree (e.g., in root layout)
 */
export function MetricsProvider({ children, locale }: MetricsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize metrics service on mount
  useEffect(() => {
    initializeMetrics();
    setIsInitialized(true);
  }, []);

  // Only run tracking hooks after initialization
  if (isInitialized) {
    return <MetricsTracking locale={locale}>{children}</MetricsTracking>;
  }

  return <>{children}</>;
}

/**
 * Internal component that runs tracking hooks
 * Separated to ensure hooks are only called after initialization
 */
function MetricsTracking({
  children,
  locale
}: {
  children: React.ReactNode;
  locale?: string;
}) {
  // Track Web Vitals (CLS, FCP, INP, LCP, TTFB)
  useWebVitals();

  // Track page visits on route changes
  usePageTracking({ locale });

  // Track scroll depth milestones
  useScrollDepth();

  return <>{children}</>;
}

export default MetricsProvider;
