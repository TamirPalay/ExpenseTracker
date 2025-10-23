"use client";

import { formatCurrency, formatDate } from "@/lib/format";
import type { CurrencyCode, Expense } from "@/types/expense";
import { HiMiniPencilSquare, HiMiniTrash } from "react-icons/hi2";
import { HiArrowTrendingDown } from "react-icons/hi";

interface ExpenseTableProps {
  expenses: Expense[];
  currency: CurrencyCode;
  onEdit: (expense: Expense) => void;
  onDelete: (expense: Expense) => void;
}

export const ExpenseTable = ({ expenses, currency, onEdit, onDelete }: ExpenseTableProps) => {
  if (!expenses.length) {
    return (
      <div className="card flex flex-col items-center justify-center gap-3 py-12 text-center">
        <span className="rounded-full bg-slate-100 p-4 text-slate-500">
          <HiArrowTrendingDown className="h-6 w-6" />
        </span>
        <h3 className="text-lg font-semibold">No expenses match your filters yet</h3>
        <p className="max-w-md text-sm text-slate-500">
          Start tracking your spending by adding a new expense. Your entries will appear here instantly with helpful analytics.
        </p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-100">
          <thead className="table-header">
            <tr>
              <th className="px-4 py-3 text-left">Description</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-right">Amount</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <tr key={expense.id} className="table-row hover:bg-slate-50/50">
                <td className="px-4 py-3 text-sm font-medium text-slate-700">{expense.description}</td>
                <td className="px-4 py-3 text-sm text-slate-500">
                  <span className="badge bg-slate-100 text-slate-600">{expense.category}</span>
                </td>
                <td className="px-4 py-3 text-sm text-slate-500">{formatDate(expense.date)}</td>
                <td className="px-4 py-3 text-right text-sm font-semibold text-slate-900">
                  {formatCurrency(expense.amount, currency)}
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => onEdit(expense)}
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
                    >
                      <HiMiniPencilSquare className="h-4 w-4" /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => onDelete(expense)}
                      className="inline-flex items-center gap-1 rounded-lg border border-red-200 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      <HiMiniTrash className="h-4 w-4" /> Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
