import { Expense } from "@/types/expense";

const STORAGE_KEY = "nexatrack.expenses";
const CURRENCY_KEY = "nexatrack.currency";

export const persistExpenses = (expenses: Expense[]) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
};

export const loadExpenses = (): Expense[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: Expense[] = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Failed to parse expenses from storage", error);
    return [];
  }
};

export const persistCurrency = (currency: string) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(CURRENCY_KEY, currency);
};

export const loadCurrency = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CURRENCY_KEY);
};
