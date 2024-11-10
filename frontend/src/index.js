import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IncomeProvider } from './context/IncomeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { TransactionProvider } from './context/TransactionContext';
import { BudgetProvider } from './context/BudgetContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BudgetProvider>
      <TransactionProvider>
        <IncomeProvider>
          <ExpenseProvider>
            <App />
          </ExpenseProvider>
        </IncomeProvider>
      </TransactionProvider>
    </BudgetProvider>
  </React.StrictMode>
);
