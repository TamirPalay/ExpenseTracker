"use client";

import { useEffect, useMemo, useState } from "react";
import { differenceInCalendarDays, isAfter, isBefore, isWithinInterval, parseISO } from "date-fns";
import { loadCurrency, loadExpenses, persistCurrency, persistExpenses } from "@/lib/storage";
import type { CategoryOption, CurrencyCode, Expense, ExpenseFilters, ExpenseSummary } from "@/types/expense";
import { nanoid } from "nanoid";

const DEFAULT_FILTERS: ExpenseFilters = {
  search: "",
  category: "All",
  startDate: null,
  endDate: null
};

const DEFAULT_CURRENCY: CurrencyCode = "NIS";

const calculateSummary = (expenses: Expense[]): ExpenseSummary => {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  const monthly = expenses
    .filter((expense) => {
      const expenseDate = parseISO(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    })
    .reduce((sum, expense) => sum + expense.amount, 0);

  const categoryTotals = expenses.reduce<Record<CategoryOption, number>>(
    (acc, expense) => ({ ...acc, [expense.category]: (acc[expense.category] ?? 0) + expense.amount }),
    { Food: 0, Transportation: 0, Entertainment: 0, Shopping: 0, Bills: 0, Other: 0 }
  );

  const topCategoryEntry = Object.entries(categoryTotals).reduce<{ category: CategoryOption | null; total: number }>(
    (best, [category, value]) => {
      if (value > best.total) {
        return { category: category as CategoryOption, total: value };
      }
      return best;
    },
    { category: null, total: 0 }
  );

  const sortedByDate = [...expenses].sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  const spanInDays = sortedByDate.length
    ? Math.max(1, differenceInCalendarDays(parseISO(sortedByDate.at(-1)!.date), parseISO(sortedByDate[0].date)) + 1)
    : 1;
  const averagePerDay = total / spanInDays;

  return { total, monthly, topCategory: topCategoryEntry, averagePerDay };
};

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filters, setFilters] = useState<ExpenseFilters>(DEFAULT_FILTERS);
  const [currency, setCurrency] = useState<CurrencyCode>(DEFAULT_CURRENCY);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedExpenses = loadExpenses();
    const storedCurrency = loadCurrency();
    if (storedExpenses.length) {
      setExpenses(storedExpenses);
    }
    if (storedCurrency) {
      setCurrency(storedCurrency as CurrencyCode);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      persistExpenses(expenses);
    }
  }, [expenses, isLoading]);

  useEffect(() => {
    if (!isLoading) {
      persistCurrency(currency);
    }
  }, [currency, isLoading]);

  const generateId = () => {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
      return crypto.randomUUID();
    }
    return nanoid();
  };

  const addExpense = (expense: Omit<Expense, "id" | "createdAt">) => {
    setExpenses((prev) => [
      { ...expense, id: generateId(), createdAt: new Date().toISOString() },
      ...prev
    ]);
  };

  const updateExpense = (id: string, patch: Partial<Omit<Expense, "id" | "createdAt">>) => {
    setExpenses((prev) => prev.map((expense) => (expense.id === id ? { ...expense, ...patch } : expense)));
  };

  const deleteExpense = (id: string) => {
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
  };

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const matchesSearch = expense.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesCategory = filters.category === "All" || expense.category === filters.category;
      const expenseDate = parseISO(expense.date);
      const withinDateRange = (() => {
        const { startDate, endDate } = filters;
        if (startDate && !endDate) {
          return !isBefore(expenseDate, parseISO(startDate));
        }
        if (!startDate && endDate) {
          return !isAfter(expenseDate, parseISO(endDate));
        }
        if (startDate && endDate) {
          return isWithinInterval(expenseDate, { start: parseISO(startDate), end: parseISO(endDate) });
        }
        return true;
      })();

      return matchesSearch && matchesCategory && withinDateRange;
    });
  }, [expenses, filters]);

  const summary = useMemo(() => calculateSummary(expenses), [expenses]);

  const setCurrencyPreference = (value: CurrencyCode) => {
    setCurrency(value);
  };

  const resetFilters = () => setFilters({ ...DEFAULT_FILTERS });

  return {
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
  };
};
