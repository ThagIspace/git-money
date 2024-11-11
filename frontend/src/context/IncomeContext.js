import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingIncome, setEditingIncome] = useState(null);

    // Fetch all incomes from the server
    const fetchIncomes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-incomes');
            setIncomes(response.data);
        } catch (error) {
            console.error('Error fetching incomes:', error);
        } finally {
            setLoading(false);
        }
    };

    // Add a new income
    const addIncome = async (income) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-income', income);
            if (response.status === 200 || response.status === 201) {
                // Instead of just updating the local state, fetch the updated list from the server
                await fetchIncomes();
            }
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    // Update an existing income
    const updateIncome = async (updatedIncome) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/update-income/${updatedIncome._id}`, updatedIncome);
            if (response.status === 200 || response.status === 201) {
                setIncomes(prev =>
                    prev.map(income => income._id === updatedIncome._id ? response.data.updatedIncome : income)
                );
            }
        } catch (error) {
            console.error('Error updating income:', error);
        }
    };

    // Delete an income
    const deleteIncome = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/v1/delete-income/${id}`);
            if (response.status === 200 || response.status === 204) {
                setIncomes(prev => prev.filter(income => income._id !== id));
            }
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    useEffect(() => {
        fetchIncomes();
    }, []);

    return (
        <IncomeContext.Provider value={{ incomes, setIncomes, addIncome, deleteIncome, updateIncome, loading, editingIncome, setEditingIncome }}>
            {children}
        </IncomeContext.Provider>
    );
};
