import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { BudgetContext } from './BudgetContext';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingExpense, setEditingExpense] = useState(null);

    // Kiểm tra nếu BudgetContext có được cung cấp không
    const { updateBudgetSpent } = useContext(BudgetContext) || {};

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
                await fetchExpenses(); // Thay đổi: Gọi lại fetchExpenses để đảm bảo danh sách được làm mới
                if (updateBudgetSpent) {
                    updateBudgetSpent(expense.category, expense.amount);
                }
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
                if (updateBudgetSpent) {
                    updateBudgetSpent(expenseToDelete.category, -expenseToDelete.amount); // Cập nhật ngân sách nếu có
                }
            }
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    const updateExpense = async (updatedExpense) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/update-expense/${updatedExpense._id}`, updatedExpense);
            if (response.status === 200 || response.status === 201) {
                await fetchExpenses(); // Thay đổi: Gọi lại fetchExpenses để đảm bảo danh sách được làm mới
                const oldExpense = expenses.find(expense => expense._id === updatedExpense._id);
                if (updateBudgetSpent && oldExpense) {
                    // Cập nhật ngân sách khi có thay đổi
                    if (oldExpense.category !== updatedExpense.category) {
                        updateBudgetSpent(oldExpense.category, -oldExpense.amount);
                        updateBudgetSpent(updatedExpense.category, updatedExpense.amount);
                    } else if (oldExpense.amount !== updatedExpense.amount) {
                        updateBudgetSpent(updatedExpense.category, updatedExpense.amount - oldExpense.amount);
                    }
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
                setExpenses,
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
