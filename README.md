# 💸 Expense Tracker Web App

A full-featured, responsive **Expense Tracker** built with **React** and **Tailwind CSS**. This application helps users manage income and expenses with custom categories, filters, authentication, and insightful visualizations.

---

## 🌐 Live Demo

🔗 [Visit the Deployed App](https://expense-tracker-nitish.vercel.app)

---

## 📦 Tech Stack

- **React** – Frontend Framework  
- **Tailwind CSS** – Utility-first CSS styling with dark mode support  
- **Vite** – Fast dev/build tool  
- **Recharts** – Charting library for React  
- **LocalStorage** – Persistent user data and auth  
- **Vercel** – Deployment and hosting  
- **Git + GitHub** – Version control and CI/CD

---

## ✨ Features

### 💼 Transaction Management
- Add, edit, and delete transactions
- Track both **Income** and **Expense**
- Include details: amount, description, date, and category

### 🗂️ Custom Categories
- Users can create and save their own categories
- Categories are persistent with `localStorage`

### 🔍 Filtering & Search
- Filter by:
  - Category
  - Transaction Type (Income/Expense)
  - Date range
- Live search by description

### 📊 Charts & Visualizations
- **Income by Category** (Pie Chart)
- **Expenses by Category** (Pie Chart)
- **Expenses by Date** (Bar Chart)

### 🌓 Dark Mode
- Toggle dark/light themes with Tailwind’s `dark:` classes

### 🔐 Authentication
- Simple **Login / Signup** system (demo mode)
- Session stored in localStorage
- Login required to access the app
- Logout button for secure exit

---

## 🧠 Thought Process

> I approached this project as a complete beginner in web development. I started by learning the basics of React and Tailwind CSS, then progressively added features like forms, filtering logic, and charting with Recharts. I integrated authentication and localStorage for real-world usability. This project challenged me to think like a developer and taught me how to design, build, debug, and deploy a full-stack application from scratch.

---

## 📁 Installation Instructions

To run this project locally:

```bash
git clone https://github.com/Nitish-Jindal/expense-tracker.git
cd expense-tracker
npm install
npm run dev
