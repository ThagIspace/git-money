// ExpenseContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BudgetContext } from './BudgetContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingExpense, setEditingExpense] = useState(null);
    const { updateBudgetSpent } = useContext(BudgetContext);

    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-expenses');
            setExpenses(response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        } finally {
            setLoading(false);
        }
    };

    const addExpense = async (expense) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-expense', expense);
            if (response.status === 200 || response.status === 201) {
                setExpenses(prevExpenses => [...prevExpenses, response.data]);
            }
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    const deleteExpense = async (id) => {
        try {
            const expenseToDelete = expenses.find(expense => expense._id === id);
            if (expenseToDelete) {
                await axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`);
                setExpenses(expenses.filter(expense => expense._id !== id));
                updateBudgetSpent(expenseToDelete.category, -expenseToDelete.amount); // Cập nhật ngân sách
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const updateExpense = async (updatedExpense) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/update-expense/${updatedExpense._id}`, updatedExpense);
            const expenseIndex = expenses.findIndex(expense => expense._id === updatedExpense._id);

            if (expenseIndex !== -1) {
                const oldExpense = expenses[expenseIndex];
                const updatedExpenses = [...expenses];
                updatedExpenses[expenseIndex] = response.data.updatedExpense;
                setExpenses(updatedExpenses);

                // Điều chỉnh ngân sách khi cập nhật chi phí
                if (oldExpense.category !== updatedExpense.category) {
                    // Xóa chi tiêu cũ khỏi ngân sách cũ
                    updateBudgetSpent(oldExpense.category, -oldExpense.amount);
                    // Cập nhật chi tiêu mới vào ngân sách mới
                    updateBudgetSpent(updatedExpense.category, updatedExpense.amount);
                } else if (oldExpense.amount !== updatedExpense.amount) {
                    // Cập nhật chi tiêu mới cho cùng danh mục
                    updateBudgetSpent(updatedExpense.category, updatedExpense.amount - oldExpense.amount);
                }
            }
        } catch (error) {
            console.error('Error updating expense:', error);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <ExpenseContext.Provider
            value={{
                expenses,
                addExpense,
                deleteExpense,
                updateExpense,
                loading,
                editingExpense,
                setEditingExpense,
            }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};
