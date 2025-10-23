"use client";

import type { CategoryOption, ExpenseFilters } from "@/types/expense";
import { HiOutlineAdjustmentsHorizontal, HiOutlineMagnifyingGlass, HiOutlineXMark } from "react-icons/hi2";

interface FilterBarProps {
  filters: ExpenseFilters;
  onChange: (filters: ExpenseFilters) => void;
  onReset: () => void;
}

const categories: (CategoryOption | "All")[] = ["All", "Food", "Transportation", "Entertainment", "Shopping", "Bills", "Other"];

export const FilterBar = ({ filters, onChange, onReset }: FilterBarProps) => {
  const handleChange = <K extends keyof ExpenseFilters>(key: K, value: ExpenseFilters[K]) => {
    onChange({ ...filters, [key]: value });
  };

  return (
    <section className="card flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex w-full flex-1 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
        <HiOutlineMagnifyingGlass className="h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(event) => handleChange("search", event.target.value)}
          placeholder="Search expenses"
          className="border-0 p-0 text-sm focus:ring-0"
        />
      </div>
      <div className="grid w-full flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Category</label>
          <select
            value={filters.category}
            onChange={(event) => handleChange("category", event.target.value as ExpenseFilters["category"])}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Start date</label>
          <input
            type="date"
            value={filters.startDate ?? ""}
            onChange={(event) => handleChange("startDate", event.target.value || null)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">End date</label>
          <input
            type="date"
            value={filters.endDate ?? ""}
            onChange={(event) => handleChange("endDate", event.target.value || null)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-medium text-slate-500">Actions</label>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onReset}
              className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100"
            >
              <HiOutlineXMark className="mr-1 inline h-4 w-4" /> Clear
            </button>
            <div className="hidden items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-slate-500 md:flex">
              <HiOutlineAdjustmentsHorizontal className="h-5 w-5" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
