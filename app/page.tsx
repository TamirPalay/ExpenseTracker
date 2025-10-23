"use client";

import { useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { Header } from "@/components/Header";
import { useExpenses } from "@/hooks/useExpenses";
import { SummaryCards } from "@/components/SummaryCards";
import { ExpenseForm } from "@/components/ExpenseForm";
import { FilterBar } from "@/components/FilterBar";
import { ExpenseTable } from "@/components/ExpenseTable";
import { SpendingChart } from "@/components/SpendingChart";
import { ExportButton } from "@/components/ExportButton";
import type { Expense, ExpenseFilters } from "@/types/expense";

export default function Home() {
  const {
    expenses,
    filteredExpenses,
    filters,
    setFilters,
    resetFilters,
    summary,
    addExpense,
    updateExpense,
    deleteExpense,
    currency,
    setCurrencyPreference,
    isLoading
  } = useExpenses();

  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);
  const handleFiltersChange = (next: ExpenseFilters) => setFilters(next);

  const handleCreate = (values: { description: string; amount: number; date: string; category: Expense["category"] }) => {
    addExpense(values);
    toast.success("Expense added successfully");
  };

  const handleUpdate = (values: { description: string; amount: number; date: string; category: Expense["category"] }) => {
    if (!editingExpense) return;
    updateExpense(editingExpense.id, values);
    setEditingExpense(null);
    toast.success("Expense updated");
  };

  const handleDelete = (expense: Expense) => {
    const confirmed = window.confirm(`Delete ${expense.description}?`);
    if (!confirmed) return;
    deleteExpense(expense.id);
    toast.success("Expense removed");
  };

  const totalFiltered = useMemo(() => filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0), [filteredExpenses]);

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="card flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          <p className="text-sm text-slate-500">Loading your expenses...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-4 pb-12 md:p-8">
      <Header currency={currency} onCurrencyChange={setCurrencyPreference} totalSpend={summary.total} />

      <SummaryCards summary={summary} currency={currency} />

      <section className="flex flex-col gap-4 lg:flex-row">
        <div className="flex-1">
          <ExpenseForm
            currency={currency}
            onSubmit={editingExpense ? handleUpdate : handleCreate}
            mode={editingExpense ? "edit" : "create"}
            expense={editingExpense}
            onCancel={() => setEditingExpense(null)}
          />
        </div>
        <div className="flex-1 space-y-4">
          <FilterBar filters={filters} onChange={handleFiltersChange} onReset={resetFilters} />
          <div className="card flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-slate-800">Filtered spending</h3>
                <p className="text-sm text-slate-500">{filteredExpenses.length} results</p>
              </div>
              <ExportButton expenses={filteredExpenses} currency={currency} />
            </div>
            <p className="text-2xl font-semibold text-brand-600">
              {new Intl.NumberFormat("en-US", { style: "currency", currency }).format(totalFiltered)}
            </p>
            <p className="text-xs text-slate-400">Based on the filters selected above.</p>
          </div>
        </div>
      </section>

      <SpendingChart expenses={filteredExpenses} currency={currency} />

      <ExpenseTable
        expenses={filteredExpenses}
        currency={currency}
        onEdit={(expense) => setEditingExpense(expense)}
        onDelete={handleDelete}
      />
    </main>
  );
}
