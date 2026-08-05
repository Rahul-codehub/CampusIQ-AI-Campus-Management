import { useEffect, useState } from "react";
import { dbApi } from "@/integrations/mongodb/api";
import AppLayout from "@/components/layout/AppLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Download, FileText, Users, GraduationCap, BookOpen } from "lucide-react";

const Reports = () => {
  const [stats, setStats] = useState({ students: 0, faculty: 0, courses: 0, activeComplaints: 0, resolvedComplaints: 0 });
  const [recentStudents, setRecentStudents] = useState<any[]>([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const [students, faculty, courses, activeComplaints, resolvedComplaints, recentStudents] = await Promise.all([
          dbApi.count("students"),
          dbApi.count("faculty"),
          dbApi.count("courses"),
          dbApi.count("complaints", { status: ["pending", "in_progress"] }),
          dbApi.count("complaints", { status: "resolved" }),
          dbApi.list("students", { sort: "created_at:desc", limit: 10 }),
        ]);
        setStats({ students, faculty, courses, activeComplaints, resolvedComplaints });
        setRecentStudents(recentStudents);
      } catch (error) {
        console.warn("Unable to load reports data.", error);
      }
    };
    fetch();
  }, []);

  const reportCards = [
    { label: "Total Students", value: stats.students, icon: GraduationCap },
    { label: "Total Faculty", value: stats.faculty, icon: Users },
    { label: "Active Courses", value: stats.courses, icon: BookOpen },
    { label: "Active Complaints", value: stats.activeComplaints, icon: FileText },
    { label: "Resolved Complaints", value: stats.resolvedComplaints, icon: FileText },
  ];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Reports</h1>
            <p className="text-muted-foreground">Campus management reports and summaries</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reportCards.map((r) => (
            <Card key={r.label} className="border-border">
              <CardContent className="p-4 text-center">
                <r.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{r.value}</p>
                <p className="text-xs text-muted-foreground">{r.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border">
          <CardHeader><CardTitle>Recent Enrollments</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student ID</TableHead><TableHead>Name</TableHead><TableHead>Email</TableHead>
                  <TableHead>Semester</TableHead><TableHead>Enrolled</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentStudents.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-sm">{s.student_id}</TableCell>
                    <TableCell className="font-medium">{s.full_name}</TableCell>
                    <TableCell>{s.email}</TableCell>
                    <TableCell>{s.semester}</TableCell>
                    <TableCell>{new Date(s.created_at).toLocaleDateString()}</TableCell>
                  </TableRow>
                ))}
                {recentStudents.length === 0 && <TableRow><TableCell colSpan={5} className="text-center text-muted-foreground py-8">No data</TableCell></TableRow>}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;
