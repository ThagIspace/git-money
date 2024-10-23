import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// Pages
import HomeP from './pages/HomeP.js';
import DashboardP from './pages/DashboardP.js';
import AddExpenseP from './pages/AddExpenseP';
import AddIncomeP from './pages/AddIncomeP';
import AddTransactionP from './pages/AddTransactionP.js';
import LoginP from './pages/LoginP.js';
import RegisterP from './pages/RegisterP.js';

//List
import ExpenseList from '../src/components/ExpenseList.js'
import IncomeList from '../src/components/IncomeList.js'
import TransactionList from '../src/components/TransactionList.js'


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardP />} />
        <Route path="/home" element={<HomeP />} />
        <Route path="/add-expense" element={<AddExpenseP />} />
        <Route path="/add-income" element={<AddIncomeP />} />
        <Route path="/add-transit" element={<AddTransactionP />} />
        <Route path="/login" element={<LoginP />} />
        <Route path="/register" element={<RegisterP />} />

        <Route path="/list-expense" element={<ExpenseList />} />
        <Route path="/list-income" element={<IncomeList />} />
        <Route path="/list-transit" element={<TransactionList />} />



      </Routes>
    </Router>
  );
};

export default App;
