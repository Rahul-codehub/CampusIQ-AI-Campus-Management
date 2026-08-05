import { exportAnalyticsPDF } from "../services/pdfService";
import {
  FileText,
  FileSpreadsheet,
  Printer,
  Bot,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function ReportsPanel() {
const handlePrint = () => {
  requestAnimationFrame(() => {
    window.print();
  });
};

const handlePDF = async () => {
  try {
    await exportAnalyticsPDF();
  } catch (err) {
    console.error(err);

    alert("Unable to export PDF.");
  }
};

  const handleExcel = () => {
    alert("Excel Export will be implemented next.");
  };

  const handleAISummary = () => {
    alert("AI Summary will be implemented next.");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports & Export</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={handlePDF}
          >
            <FileText className="h-7 w-7 text-red-500" />
            Export PDF
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={handleExcel}
          >
            <FileSpreadsheet className="h-7 w-7 text-green-600" />
            Export Excel
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={handlePrint}
          >
            <Printer className="h-7 w-7 text-blue-600" />
            Print Report
          </Button>

          <Button
            variant="outline"
            className="h-20 flex-col gap-2"
            onClick={handleAISummary}
          >
            <Bot className="h-7 w-7 text-purple-600" />
            AI Summary
          </Button>

        </div>
      </CardContent>
    </Card>
  );
}