export interface AnalyticsData {
  overview: {
    students: number;
    faculty: number;
    courses: number;
    departments: number;
    notices: number;
    events: number;
    complaints: number;
    attendancePercentage: number;
  };

  complaints: {
    pending: number;
    resolved: number;
  };
}

export async function getAnalytics() {
  const response = await fetch("/api/analytics");

  if (!response.ok) {
    throw new Error("Failed to fetch analytics.");
  }

  const json = await response.json();

  return json.data as AnalyticsData;
}