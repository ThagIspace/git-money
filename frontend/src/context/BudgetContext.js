// context/BudgetContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-budgets');
            setBudgets(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching budgets:', error);
            setLoading(false);
        }
    };

    const addBudget = async (budget) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-budget', budget);
            setBudgets((prev) => [...prev, response.data]);
        } catch (error) {
            console.error('Error adding budget:', error);
        }
    };

    const deleteBudget = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/delete-budget/${id}`);
            setBudgets((prev) => prev.filter(budget => budget._id !== id));
        } catch (error) {
            console.error('Error deleting budget:', error);
        }
    };

    const updateBudgetSpent = async (category, amount) => {
        try {
            const budget = budgets.find(b => b.name === category);
            if (budget) {
                const updatedBudget = { ...budget, spent: (budget.spent || 0) + amount };
                await axios.put(`http://localhost:5000/api/v1/update-budget/${budget._id}`, updatedBudget);
                fetchBudgets(); // Làm mới danh sách ngân sách
            }
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <BudgetContext.Provider value={{ budgets, addBudget, deleteBudget, updateBudgetSpent, loading }}>
            {children}
        </BudgetContext.Provider>
    );
};
