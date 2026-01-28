"use client";

/**
 * Hook for tracking click events on buttons and links
 * Provides simple callbacks to track user interactions
 */

import { getMetricsService } from "@/lib/services/metricsService";
import { useCallback } from "react";

interface UseClickTrackingReturn {
  trackClick: (label: string, target?: string) => void;
  trackExternalLink: (url: string, label?: string) => void;
}

/**
 * Custom hook to track click events
 *
 * Returns memoized tracking functions that can be called directly in event handlers.
 *
 * @example
 * ```tsx
 * const { trackClick, trackExternalLink } = useClickTracking();
 *
 * return (
 *   <button onClick={() => trackClick('Subscribe', 'newsletter')}>
 *     Subscribe
 *   </button>
 * );
 * ```
 */
export const useClickTracking = (): UseClickTrackingReturn => {
  const metricsService = getMetricsService();

  /**
   * Track a button or element click
   * @param label - Descriptive label for the click
   * @param target - Optional target identifier
   */
  const trackClick = useCallback(
    (label: string, target?: string) => {
      metricsService.trackClick(label, target);
    },
    [metricsService]
  );

  /**
   * Track an external link click
   * @param url - The external URL being clicked
   * @param label - Optional descriptive label for the link
   */
  const trackExternalLink = useCallback(
    (url: string, label?: string) => {
      metricsService.trackExternalLink(url, label);
    },
    [metricsService]
  );

  return {
    trackClick,
    trackExternalLink
  };
};

export default useClickTracking;
