"use client";

import { formatDate } from "@/lib/format";
import type { CurrencyCode, Expense } from "@/types/expense";
import { HiOutlineArrowDownTray } from "react-icons/hi2";

interface ExportButtonProps {
  expenses: Expense[];
  currency: CurrencyCode;
}

const escapeCsv = (value: string) => {
  if (value.includes(",") || value.includes("\"")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
};

export const ExportButton = ({ expenses, currency }: ExportButtonProps) => {
  const handleExport = () => {
    const header = ["Description", "Category", "Date", `Amount (${currency})`];
    const rows = expenses.map((expense) => [
      escapeCsv(expense.description),
      expense.category,
      formatDate(expense.date),
      expense.amount.toFixed(2)
    ]);

    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `nexatrack-expenses-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      type="button"
      onClick={handleExport}
      disabled={!expenses.length}
      className="inline-flex items-center gap-2 rounded-lg border border-brand-200 bg-white px-4 py-2 text-sm font-semibold text-brand-600 shadow-sm transition hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <HiOutlineArrowDownTray className="h-4 w-4" /> Export CSV
    </button>
  );
};
