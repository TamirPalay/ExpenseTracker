"use client";

import { useMemo } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Legend,
  Tooltip,
  PointElement,
  LineElement,
  Filler
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import type { CurrencyCode, Expense } from "@/types/expense";
import { formatCurrency } from "@/lib/format";
import { format, parseISO } from "date-fns";

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, Legend, Tooltip, PointElement, LineElement, Filler);

interface SpendingChartProps {
  expenses: Expense[];
  currency: CurrencyCode;
}

export const SpendingChart = ({ expenses, currency }: SpendingChartProps) => {
  const categoryData = useMemo(() => {
    const totals = expenses.reduce<Record<string, number>>((acc, expense) => {
      acc[expense.category] = (acc[expense.category] ?? 0) + expense.amount;
      return acc;
    }, {});

    const labels = Object.keys(totals);
    const data = labels.map((label) => totals[label]);

    return {
      labels,
      datasets: [
        {
          label: "By category",
          data,
          backgroundColor: [
            "#2f67ff",
            "#1d4bdb",
            "#38bdf8",
            "#22c55e",
            "#f97316",
            "#f43f5e"
          ],
          borderRadius: 10
        }
      ]
    };
  }, [expenses]);

  const monthlyData = useMemo(() => {
    const totals = expenses.reduce<Record<string, { label: string; total: number }>>((acc, expense) => {
      const date = parseISO(expense.date);
      const key = format(date, "yyyy-MM");
      const label = format(date, "MMM yyyy");
      const existing = acc[key];
      acc[key] = {
        label,
        total: (existing?.total ?? 0) + expense.amount
      };
      return acc;
    }, {});

    const sortedEntries = Object.entries(totals).sort(([a], [b]) => (a > b ? 1 : a < b ? -1 : 0));
    const labels = sortedEntries.map(([, value]) => value.label);
    const data = sortedEntries.map(([, value]) => value.total);

    return {
      labels,
      datasets: [
        {
          label: "Monthly total",
          data,
          tension: 0.4,
          borderColor: "#2f67ff",
          backgroundColor: "rgba(47, 103, 255, 0.2)",
          fill: true,
          pointRadius: 4,
          pointBackgroundColor: "#2f67ff"
        }
      ]
    };
  }, [expenses]);

  if (!expenses.length) {
    return null;
  }

  return (
    <section className="grid gap-4 lg:grid-cols-2">
      <article className="card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Spending by category</h3>
            <p className="text-sm text-slate-500">Understand where your money goes</p>
          </div>
        </div>
        <Bar
          data={categoryData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${formatCurrency(context.parsed.y ?? 0, currency)}`
                }
              }
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => formatCurrency(Number(value), currency)
                }
              }
            }
          }}
        />
      </article>
      <article className="card">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Monthly trend</h3>
            <p className="text-sm text-slate-500">Track spending over time</p>
          </div>
        </div>
        <Line
          data={monthlyData}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: (context) => `${context.label}: ${formatCurrency(context.parsed.y ?? 0, currency)}`
                }
              }
            },
            scales: {
              y: {
                ticks: {
                  callback: (value) => formatCurrency(Number(value), currency)
                }
              }
            }
          }}
        />
      </article>
      <article className="card lg:col-span-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-800">Category distribution</h3>
            <p className="text-sm text-slate-500">Visual breakdown of your spending</p>
          </div>
        </div>
        <div className="mx-auto max-w-xs">
          <Doughnut
            data={categoryData}
            options={{
              plugins: {
                tooltip: {
                  callbacks: {
                    label: (context) => `${context.label}: ${formatCurrency(context.parsed ?? 0, currency)}`
                  }
                },
                legend: {
                  position: "bottom",
                  labels: {
                    usePointStyle: true
                  }
                }
              }
            }}
          />
        </div>
      </article>
    </section>
  );
};
