import { useEffect, useState } from "react";
import { dbApi } from "@/integrations/mongodb/api";
import { useAuth } from "@/contexts/AuthContext";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Users, BookOpen, MessageSquareWarning, Calendar, Megaphone } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(230,70%,52%)", "hsl(160,60%,45%)", "hsl(38,92%,50%)", "hsl(0,72%,55%)"];

const Dashboard = () => {
  const { profile } = useAuth();
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0, complaints: 0, events: 0, notices: 0 });
  const [recentComplaints, setRecentComplaints] = useState<any[]>([]);
  const [recentNotices, setRecentNotices] = useState<any[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [students, faculty, courses, complaints, events, notices] = await Promise.all([
          dbApi.count("students"),
          dbApi.count("faculty"),
          dbApi.count("courses"),
          dbApi.count("complaints"),
          dbApi.count("events"),
          dbApi.count("notices"),
        ]);
        setStats({ students, faculty, courses, complaints, events, notices });
      } catch (error) {
        console.warn("Unable to load dashboard stats.", error);
      }
    };
    const fetchRecent = async () => {
      try {
        const [comp, notices] = await Promise.all([
          dbApi.list("complaints", { sort: "created_at:desc", limit: 5 }),
          dbApi.list("notices", { sort: "created_at:desc", limit: 5 }),
        ]);
        setRecentComplaints(comp);
        setRecentNotices(notices);
      } catch (error) {
        console.warn("Unable to load recent dashboard data.", error);
      }
    };
    fetchStats();
    fetchRecent();
  }, []);

  const statCards = [
    { label: "Students", value: stats.students, icon: GraduationCap, color: "text-primary" },
    { label: "Faculty", value: stats.faculty, icon: Users, color: "text-accent" },
    { label: "Courses", value: stats.courses, icon: BookOpen, color: "text-[hsl(38,92%,50%)]" },
    { label: "Complaints", value: stats.complaints, icon: MessageSquareWarning, color: "text-destructive" },
    { label: "Events", value: stats.events, icon: Calendar, color: "text-primary" },
    { label: "Notices", value: stats.notices, icon: Megaphone, color: "text-accent" },
  ];

  const chartData = statCards.map((s) => ({ name: s.label, value: s.value }));

  return (
    <AppLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, {profile?.full_name || "User"} 👋</h1>
          <p className="text-muted-foreground mt-1">Here's what's happening on campus today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {statCards.map((s) => (
            <Card key={s.label} className="border-border hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 p-6">
                <div className={`p-3 rounded-xl bg-secondary ${s.color}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.value}</p>
                  <p className="text-sm text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Overview</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(220,15%,88%)" />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="value" fill="hsl(230,70%,52%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Distribution</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={chartData.slice(0, 4)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                    {chartData.slice(0, 4).map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Recent Complaints</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentComplaints.length === 0 && <p className="text-sm text-muted-foreground">No complaints yet.</p>}
              {recentComplaints.map((c) => (
                <div key={c.id} className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium">{c.title}</p>
                    <p className="text-xs text-muted-foreground">{c.category}</p>
                  </div>
                  <Badge variant={c.status === "resolved" ? "default" : c.status === "pending" ? "secondary" : "destructive"}>
                    {c.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader><CardTitle className="text-lg">Latest Notices</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {recentNotices.length === 0 && <p className="text-sm text-muted-foreground">No notices yet.</p>}
              {recentNotices.map((n) => (
                <div key={n.id} className="p-3 rounded-lg bg-secondary/50">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{n.title}</p>
                    {n.is_pinned && <Badge variant="outline" className="text-xs">Pinned</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{n.category} • {new Date(n.created_at).toLocaleDateString()}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
