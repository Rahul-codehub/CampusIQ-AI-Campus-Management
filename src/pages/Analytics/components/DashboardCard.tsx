import { Card, CardContent } from "@/components/ui/card";
import { KPI_CARDS } from "../constants";
import { AnalyticsOverview } from "../types";

interface DashboardCardsProps {
  overview: AnalyticsOverview;
}

export default function DashboardCards({
  overview,
}: DashboardCardsProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {KPI_CARDS.map((card) => {
        const Icon = card.icon;

        const value =
          overview[
            card.key as keyof AnalyticsOverview
          ];

        return (
          <Card
            key={card.key}
            className="border shadow-sm hover:shadow-md transition-all"
          >
            <CardContent className="flex items-center justify-between p-6">

              <div>

                <p className="text-sm text-muted-foreground">
                  {card.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {value}
                  {card.suffix ?? ""}
                </h2>

              </div>

              <div
                className={`rounded-xl bg-muted p-3 ${card.color}`}
              >
                <Icon className="h-8 w-8" />
              </div>

            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}