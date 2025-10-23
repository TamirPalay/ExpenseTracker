"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { CategoryOption, CurrencyCode, Expense } from "@/types/expense";
import { formatCurrency } from "@/lib/format";
import { HiOutlineCheckCircle, HiOutlinePlusCircle, HiOutlineXCircle } from "react-icons/hi";
import clsx from "clsx";

const categories: CategoryOption[] = ["Food", "Transportation", "Entertainment", "Shopping", "Bills", "Other"];

type ExpenseFormValues = {
  description: string;
  amount: number;
  date: string;
  category: CategoryOption;
};

interface ExpenseFormProps {
  currency: CurrencyCode;
  onSubmit: (values: ExpenseFormValues) => void;
  isSubmitting?: boolean;
  mode: "create" | "edit";
  expense?: Expense | null;
  onCancel?: () => void;
}

export const ExpenseForm = ({ currency, onSubmit, isSubmitting, mode, expense, onCancel }: ExpenseFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  } = useForm<ExpenseFormValues>({
    defaultValues: {
      description: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      category: "Food"
    }
  });

  useEffect(() => {
    if (expense) {
      reset({
        description: expense.description,
        amount: expense.amount,
        date: expense.date,
        category: expense.category
      });
    } else {
      reset({
        description: "",
        amount: 0,
        date: new Date().toISOString().slice(0, 10),
        category: "Food"
      });
    }
  }, [expense, reset]);

  const submitHandler = handleSubmit((values) => {
    onSubmit(values);
    if (mode === "create") {
      reset({
        description: "",
        amount: 0,
        date: new Date().toISOString().slice(0, 10),
        category: "Food"
      });
    }
  });

  const amountValue = watch("amount", expense?.amount ?? 0);

  return (
    <form onSubmit={submitHandler} className="card flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold text-slate-800">{mode === "create" ? "Add expense" : "Update expense"}</h2>
        <p className="text-sm text-slate-500">
          Provide expense details to keep your dashboard up-to-date.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="description">Description *</label>
          <input
            id="description"
            type="text"
            placeholder="Coffee with friends"
            {...register("description", {
              required: "Description is required",
              minLength: { value: 3, message: "Minimum 3 characters" }
            })}
          />
          {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="amount">Amount ({currency}) *</label>
          <input
            id="amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            {...register("amount", {
              valueAsNumber: true,
              required: "Amount is required",
              validate: (value) => value > 0 || "Amount must be greater than 0"
            })}
          />
          {errors.amount && <p className="text-xs text-red-500">{errors.amount.message}</p>}
          <p className="text-xs text-slate-400">
            {formatCurrency(Number.isFinite(amountValue) ? amountValue : 0, currency)}
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date">Date *</label>
          <input
            id="date"
            type="date"
            max={new Date().toISOString().slice(0, 10)}
            {...register("date", {
              required: "Date is required"
            })}
          />
          {errors.date && <p className="text-xs text-red-500">{errors.date.message}</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">Category</label>
          <select id="category" {...register("category", { required: true })}>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-xs text-slate-400">
          All fields are required. Accurate entries keep your analytics meaningful.
        </div>
        <div className="flex items-center gap-3">
          {mode === "edit" && (
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100"
            >
              <HiOutlineXCircle className="h-4 w-4" />
              Cancel
            </button>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={clsx(
              "btn-primary inline-flex items-center gap-2",
              isSubmitting && "cursor-not-allowed opacity-75"
            )}
          >
            {mode === "create" ? (
              <>
                <HiOutlinePlusCircle className="h-4 w-4" />
                Add expense
              </>
            ) : (
              <>
                <HiOutlineCheckCircle className="h-4 w-4" />
                Save changes
              </>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};
