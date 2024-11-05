import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IncomeProvider } from './context/IncomeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { TransactionProvider } from './context/TransactionContext';
import { BudgetProvider } from './context/BudgetContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <TransactionProvider>
    <IncomeProvider>
      <ExpenseProvider>
        <BudgetProvider>
          <App />
        </BudgetProvider>
      </ExpenseProvider>
    </IncomeProvider>
  </TransactionProvider>
);
