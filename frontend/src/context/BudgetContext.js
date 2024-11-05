// context/BudgetContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const BudgetContext = createContext();

const getRandomColor = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBudgets = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-budgets');
            const budgetsWithColors = response.data.map(budget => ({
                ...budget,
                color: getRandomColor()
            }));
            setBudgets(budgetsWithColors);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching budgets:', error);
            setLoading(false);
        }
    };

    const addBudget = async (budget) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-budget', budget);
            await fetchBudgets();
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

    // Thêm hàm updateBudgetSpent để cập nhật chi tiêu vào ngân sách
    const updateBudgetSpent = async (category, amount) => {
        try {
            const budget = budgets.find(b => b.name === category);
            if (budget) {
                const updatedBudget = { ...budget, spent: (budget.spent || 0) + amount };
                await axios.put(`http://localhost:5000/api/v1/update-budget/${budget._id}`, updatedBudget);
                fetchBudgets(); // Cập nhật lại danh sách ngân sách sau khi cập nhật
            }
        } catch (error) {
            console.error('Error updating budget:', error);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    return (
        <BudgetContext.Provider value={{ budgets, addBudget, deleteBudget, fetchBudgets, updateBudgetSpent, loading }}>
            {children}
        </BudgetContext.Provider>
    );
};
