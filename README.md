# NexaTrack – Expense Tracking Dashboard

NexaTrack is a modern, professional-grade expense tracking experience built with Next.js 14, TypeScript, and Tailwind CSS. It provides rich analytics, intuitive filtering, and local persistence so you can manage your personal finances with confidence.

## ✨ Features

- **Comprehensive expense management** – add, edit, and delete expenses with category, amount, date, and description metadata.
- **Smart filtering & search** – narrow expenses by keyword, category, or date range in real time.
- **Insightful analytics** – responsive dashboard highlights total, monthly, and average daily spending with top-category spotlight.
- **Interactive visualizations** – category bar chart, monthly trend line, and distribution doughnut built with Chart.js.
- **Currency awareness** – NIS is the default currency with quick switching between NIS, USD, EUR, and GBP for formatting.
- **Local persistence** – all data is stored securely in the browser via `localStorage` for this demo.
- **CSV export** – download filtered expenses for further analysis in spreadsheets.
- **Responsive by design** – optimized layouts for both desktop and mobile screens.

## 🛠️ Tech Stack

- [Next.js 14 (App Router)](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Hook Form](https://react-hook-form.com/)
- [Chart.js + react-chartjs-2](https://react-chartjs-2.js.org/)
- [react-hot-toast](https://react-hot-toast.com/)

## 🚀 Getting Started

> **Prerequisite:** Node.js 18 or later and npm. Internet access is required for dependency installation.

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Start the development server**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) to explore the dashboard.

## 📦 Available Scripts

- `npm run dev` – start the development server with hot reloading.
- `npm run build` – create an optimized production build.
- `npm run start` – run the production build locally.
- `npm run lint` – lint all source files with ESLint.

## ✅ Testing the Experience

1. Launch the app and add several expenses covering multiple categories and dates.
2. Experiment with the search bar, category dropdown, and date pickers to filter the list.
3. Click an expense to edit it, adjust values, and save the changes.
4. Use the delete action (with confirmation) to remove an entry.
5. Observe the summary cards and charts update instantly with each change.
6. Change the currency from the header to view amounts with alternate formatting.
7. Export the filtered expenses to CSV and open the file in a spreadsheet tool.

All data persists in your browser thanks to `localStorage`. Clearing browser storage will reset the demo.

## 🗂️ Project Structure

```
app/                # App Router pages and global layout
components/         # Reusable UI components (forms, charts, tables, providers)
hooks/              # Custom React hooks
lib/                # Formatting helpers and storage utilities
types/              # Shared TypeScript types
public/             # Static assets
```

## 📄 License

This project is provided as-is for demonstration purposes.
