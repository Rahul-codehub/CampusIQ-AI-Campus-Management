import { AnalyticsData } from "../types";

export async function getAnalytics(): Promise<AnalyticsData> {
  const response = await fetch("/api/analytics");

  if (!response.ok) {
    throw new Error("Failed to fetch analytics.");
  }

  const result = await response.json();

  return result.data;
}