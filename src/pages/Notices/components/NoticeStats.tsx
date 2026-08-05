import {
  Bell,
  CheckCircle2,
  FileText,
  Archive,
  Pin,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { NoticeStats as Stats } from "../types";

interface NoticeStatsProps {
  stats: Stats;
}

export function NoticeStats({
  stats,
}: NoticeStatsProps) {
  const cards = [
    {
      title: "Total Notices",
      value: stats.total,
      icon: FileText,
    },
    {
      title: "Published",
      value: stats.published,
      icon: CheckCircle2,
      valueClass: "text-green-600",
    },
    {
      title: "Draft",
      value: stats.draft,
      icon: Bell,
      valueClass: "text-amber-500",
    },
    {
      title: "Archived",
      value: stats.archived,
      icon: Archive,
      valueClass: "text-red-500",
    },
    {
      title: "Pinned",
      value: stats.pinned,
      icon: Pin,
      valueClass: "text-primary",
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
                  className={`text-5xl font-bold ${
                    card.valueClass ?? ""
                  }`}
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