import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export async function exportAnalyticsPDF() {
  const report = document.getElementById(
    "analytics-report"
  );

  if (!report) {
    throw new Error(
      "Analytics report not found."
    );
  }

  const canvas =
    await html2canvas(report, {
      scale: 2,
      useCORS: true,
    });

  const imgData =
    canvas.toDataURL("image/png");

  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) /
    canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(
    `CampusIQ_Analytics_Report_${Date.now()}.pdf`
  );
}