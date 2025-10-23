"use client";

import { useMemo } from "react";
import { HiOutlineCreditCard, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import type { CurrencyCode } from "@/types/expense";
import clsx from "clsx";

interface HeaderProps {
  currency: CurrencyCode;
  onCurrencyChange: (currency: CurrencyCode) => void;
  totalSpend: number;
}

const currencyOptions: { label: string; value: CurrencyCode }[] = [
  { label: "₪ NIS", value: "NIS" },
  { label: "$ USD", value: "USD" },
  { label: "€ EUR", value: "EUR" },
  { label: "£ GBP", value: "GBP" }
];

export const Header = ({ currency, onCurrencyChange, totalSpend }: HeaderProps) => {
  const formattedTotal = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(totalSpend);
  }, [currency, totalSpend]);

  return (
    <header className="fade-in mb-8 flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-brand-600 via-brand-500 to-brand-700 p-8 text-white shadow-xl">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
            <HiOutlineCreditCard className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl font-semibold">NexaTrack</h1>
            <p className="text-sm text-white/80">Modern insights for your daily spending</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white/80 md:flex">
            <HiOutlineSun className="h-4 w-4" />
            <span>Light Mode</span>
            <HiOutlineMoon className="h-4 w-4" />
          </div>
          <select
            aria-label="Currency selector"
            value={currency}
            onChange={(event) => onCurrencyChange(event.target.value as CurrencyCode)}
            className={clsx(
              "rounded-full border border-white/20 bg-white/20 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition",
              "hover:bg-white/30 focus:border-white focus:outline-none"
            )}
          >
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value} className="text-slate-900">
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <p className="text-sm uppercase tracking-wide text-white/70">Total tracked spending</p>
        <p className="text-3xl font-semibold">{formattedTotal}</p>
      </div>
    </header>
  );
};
