# QuickSell – Frontend Assignment

This project implements a high-performance **Customers List UI** capable of handling **1,000,000 records** with infinite scroll, debounced search, sorting, sticky header, and dummy filters.  
Built using **React + Vite** with **plain CSS only**.

---

## 🚀 Summary

The goal is to create a Customers List UI that can:

- Display **1M customer records**
- Load 30 rows at a time (infinite scroll)
- Provide real-time **search**, **sorting**, and a **dummy filters dropdown**
- Maintain smooth scrolling without UI lag
- Keep the header **sticky** while scrolling

---

## 🧩 Features

- Generate **1,000,000 local records**  
  _(id, name, phone, email, score, lastMessageAt, addedBy, avatar)_
- Table view with:
  - Infinite scrolling (30 rows per page)
  - Debounced search (250ms)
  - Column sorting (asc/desc)
  - Sticky table header
  - Row hover effect
- Static Filters dropdown (UI only)
- Data stored in memory or IndexedDB
- Optimized rendering for smooth performance

---

## 🛠️ Tech Stack

- **React** (Functional components + Hooks)
- **Vite** (ESM build)
- **Node.js 22+**
- **Plain CSS** (no Tailwind, no Bootstrap)
- Optional: **IndexedDB** for persistent data storage

---

## 📦 Installation & Setup

```bash
# clone repo
git clone <repo-url>
cd quicksell-assignment

# install deps
npm install

# start development
npm run dev

# build for production
npm run build

# preview production build
npm run preview
```
