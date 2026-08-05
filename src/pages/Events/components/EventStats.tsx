import {
  CalendarDays,
  Clock,
  PlayCircle,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { EventStats as Stats } from "../types";

interface EventStatsProps {
  stats: Stats;
}

export default function EventStats({
  stats,
}: EventStatsProps) {
  const cards = [
    {
      title: "Total Events",
      value: stats.total,
      icon: CalendarDays,
      valueClass: "text-primary",
    },
    {
      title: "Upcoming",
      value: stats.upcoming,
      icon: Clock,
      valueClass: "text-blue-600",
    },
    {
      title: "Ongoing",
      value: stats.ongoing,
      icon: PlayCircle,
      valueClass: "text-green-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      icon: CheckCircle2,
      valueClass: "text-emerald-600",
    },
    {
      title: "Cancelled",
      value: stats.cancelled,
      icon: XCircle,
      valueClass: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="shadow-sm border bg-white"
          >
            <CardContent className="flex items-center justify-between p-6">

              <div className="space-y-2">

                <p className="text-base text-muted-foreground">
                  {card.title}
                </p>

                <h2
                  className={`text-5xl font-bold ${card.valueClass}`}
                >
                  {card.value}
                </h2>

              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">

                <Icon className="h-8 w-8 text-primary" />

              </div>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}