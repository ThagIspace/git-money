// context/ExpenseContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BudgetContext } from './BudgetContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const { updateBudgetSpent } = useContext(BudgetContext); // Import hàm updateBudgetSpent

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-expenses');
            setExpenses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setLoading(false);
        }
    };

    const addExpense = async (expense) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-expense', expense);
            setExpenses((prev) => [...prev, response.data]);
            updateBudgetSpent(expense.category, expense.amount); // Cập nhật ngân sách ngay khi thêm chi phí
            fetchExpenses(); // Làm mới danh sách chi phí
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const expenseToDelete = expenses.find(expense => expense._id === id);
            if (expenseToDelete) {
                const response = await axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`);
                if (response.status === 200) {
                    setExpenses(prevExpenses => prevExpenses.filter(expense => expense._id !== id));
                    updateBudgetSpent(expenseToDelete.category, -expenseToDelete.amount);
                }
            }
        } catch (error) {
            console.error('Error deleting expense:', error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses, addExpense, deleteExpense, loading }}>
            {children}
        </ExpenseContext.Provider>
    );
};
