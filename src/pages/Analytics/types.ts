export interface AnalyticsOverview {
  students: number;
  faculty: number;
  courses: number;
  departments: number;
  notices: number;
  events: number;
  complaints: number;
  attendancePercentage: number;
}

export interface ComplaintAnalytics {
  pending: number;
  resolved: number;
}

export interface ChartItem {
  name: string;
  value: number;
}

export interface AIInsight {
  title: string;
  description: string;
  type: "success" | "warning" | "info";
}

export interface AnalyticsData {
  overview: AnalyticsOverview;

  complaints: ComplaintAnalytics;

  charts: {
    attendance: ChartItem[];
    studentDepartments: ChartItem[];
    complaints: ChartItem[];
  };

  insights?: AIInsight[];
}