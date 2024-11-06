import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// Pages
import HomeP from './pages/HomeP.js';
import CalendarP from './pages/CalendarP.js';
import DashboardP from './pages/DashboardP.js';
import AddExpenseP from './pages/AddExpenseP';
import AddIncomeP from './pages/AddIncomeP';
import AddBudgetP from './pages/AddBudgetP.js';
import AddTransactionP from './pages/AddTransactionP.js';
import ErrorP from './pages/ErrorP'; // Import the ErrorP component

// List
import ExpenseList from '../src/components/ExpenseList.js';
import IncomeList from '../src/components/IncomeList.js';
import TransactionList from '../src/components/TransactionList.js';
import BudgetList from '../src/components/BudgetList.js';
import Login from './components/Login.js';
import Register from './components/Register.js';

// Create your router with routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardP />,
    errorElement: <ErrorP />, // Handle errors at the route level
  },
  {
    path: '/home',
    element: <HomeP />,
    errorElement: <ErrorP />,
  },
  {
    path: '/calendar',
    element: <CalendarP />,
    errorElement: <ErrorP />,
  },
  {
    path: '/add-expense',
    element: <AddExpenseP />,
    errorElement: <ErrorP />,
  },
  {
    path: '/add-budget',
    element: <AddBudgetP />,
    errorElement: <ErrorP />,
  },
  {
    path: '/add-income',
    element: <AddIncomeP />,
    errorElement: <ErrorP />,
  },
  {
    path: '/add-transit',
    element: <AddTransactionP />,
    errorElement: <ErrorP />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <ErrorP />,
  },
  {
    path: '/register',
    element: <Register />,
    errorElement: <ErrorP />,
  },
  {
    path: '/list-expense',
    element: <ExpenseList />,
    errorElement: <ErrorP />,
  },
  {
    path: '/list-budget',
    element: <BudgetList />,
    errorElement: <ErrorP />,
  },
  {
    path: '/list-income',
    element: <IncomeList />,
    errorElement: <ErrorP />,
  },
  {
    path: '/list-transit',
    element: <TransactionList />,
    errorElement: <ErrorP />,
  },
  {
    path: '*', // Catch-all route for undefined paths
    element: <ErrorP />,
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;
