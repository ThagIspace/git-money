// IncomeContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingIncome, setEditingIncome] = useState(null);

    const fetchIncomes = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-incomes');
            setIncomes(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching incomes:', error);
            setLoading(false);
        }
    };

    const addIncome = async (income) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-income', income);
            setIncomes((prev) => [...prev, response.data]);
            fetchIncomes();
        } catch (error) {
            console.error('Error adding income:', error);
        }
    };

    const updateIncome = async (updatedIncome) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/v1/update-income/${updatedIncome._id}`, updatedIncome);
            setIncomes((prev) =>
                prev.map((income) => (income._id === updatedIncome._id ? response.data.updatedIncome : income))
            );
        } catch (error) {
            console.error('Error updating income:', error);
        }
    };

    const deleteIncome = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/delete-income/${id}`);
            setIncomes((prev) => prev.filter(income => income._id !== id));
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
