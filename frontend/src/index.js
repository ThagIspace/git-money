import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { IncomeProvider } from './context/IncomeContext';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BudgetProvider>
      <IncomeProvider>
        <ExpenseProvider>
          <App />
        </ExpenseProvider>
      </IncomeProvider>
    </BudgetProvider>
  </React.StrictMode>
);
