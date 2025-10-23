import type { ExpenseSummary, CurrencyCode } from "@/types/expense";
import { formatCurrency } from "@/lib/format";
import { HiChartPie, HiTrendingDown, HiTrendingUp } from "react-icons/hi";
import { HiSparkles } from "react-icons/hi2";

interface SummaryCardsProps {
  summary: ExpenseSummary;
  currency: CurrencyCode;
}

const summaryConfig = [
  {
    key: "total",
    label: "All-time spending",
    icon: HiChartPie,
    accent: "bg-blue-100 text-blue-700"
  },
  {
    key: "monthly",
    label: "This month",
    icon: HiTrendingUp,
    accent: "bg-emerald-100 text-emerald-700"
  },
  {
    key: "averagePerDay",
    label: "Average per day",
    icon: HiTrendingDown,
    accent: "bg-orange-100 text-orange-700"
  }
] as const;

export const SummaryCards = ({ summary, currency }: SummaryCardsProps) => {
  return (
    <section className="grid gap-4 md:grid-cols-3">
      {summaryConfig.map(({ key, label, icon: Icon, accent }) => (
        <article key={key} className="card flex flex-col gap-4">
          <div className={`badge ${accent} w-max`}>{label}</div>
          <div className="flex items-center justify-between">
            <p className="text-2xl font-semibold">
              {formatCurrency(summary[key], currency)}
            </p>
            <span className="rounded-full bg-slate-100 p-3 text-slate-600">
              <Icon className="h-5 w-5" />
            </span>
          </div>
        </article>
      ))}
      <article className="card flex flex-col gap-3 md:col-span-3">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-500">
          <HiSparkles className="h-4 w-4 text-brand-500" />
          <span>Top category spotlight</span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-lg font-semibold">
              {summary.topCategory.category ? summary.topCategory.category : "No category yet"}
            </p>
            <p className="text-sm text-slate-500">Highest spending category across all time</p>
          </div>
          <p className="text-xl font-semibold text-brand-600">
            {formatCurrency(summary.topCategory.total, currency)}
          </p>
        </div>
      </article>
    </section>
  );
};
