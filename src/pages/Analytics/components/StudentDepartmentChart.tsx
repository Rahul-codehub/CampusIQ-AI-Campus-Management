import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Props {
  data: {
    name: string;
    value: number;
  }[];
}

export default function StudentDepartmentChart({
  data,
}: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Students by Department
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis
              dataKey="name"
              tick={{ fontSize: 12 }}
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              fill="#2563eb"
            />

          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}