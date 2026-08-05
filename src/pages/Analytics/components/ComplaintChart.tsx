import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
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

const COLORS = [
  "#ef4444",
  "#22c55e",
];

export default function ComplaintChart({
  data,
}: Props) {
  return (
    <Card>

      <CardHeader>

        <CardTitle>
          Complaint Analytics
        </CardTitle>

      </CardHeader>

      <CardContent>

        <ResponsiveContainer
          width="100%"
          height={320}
        >

          <PieChart>

            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={110}
              label
            >

              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={
                    COLORS[
                      index % COLORS.length
                    ]
                  }
                />
              ))}

            </Pie>

            <Tooltip />

            <Legend />

          </PieChart>

        </ResponsiveContainer>

      </CardContent>

    </Card>
  );
}