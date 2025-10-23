export type CategoryOption =
  | "Food"
  | "Transportation"
  | "Entertainment"
  | "Shopping"
  | "Bills"
  | "Other";

export type CurrencyCode = "NIS" | "USD" | "EUR" | "GBP";

export interface Expense {
  id: string;
  description: string;
  amount: number;
  date: string; // ISO string
  category: CategoryOption;
  createdAt: string; // ISO string
}

export interface ExpenseFilters {
  search: string;
  category: CategoryOption | "All";
  startDate: string | null;
  endDate: string | null;
}

export interface ExpenseSummary {
  total: number;
  monthly: number;
  topCategory: { category: CategoryOption | null; total: number };
  averagePerDay: number;
}
