import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Hàm để lấy danh sách giao dịch
    const fetchTransactions = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-transactions');
            setTransactions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setLoading(false);
        }
    };

    // Hàm để thêm giao dịch
    const addTransaction = async (transaction) => {
        try {
            const response = await axios.post('http://localhost:5000/api/v1/add-transaction', transaction);
            setTransactions((prev) => [...prev, response.data]);
            fetchTransactions(); // Tải lại danh sách sau khi thêm
        } catch (error) {
            console.error('Error adding transaction:', error);
        }
    };

    // Hàm để xóa giao dịch
    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/delete-transaction/${id}`);
            setTransactions((prev) => prev.filter(trans => trans._id !== id));
        } catch (error) {
            console.error('Error deleting transaction:', error);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions, addTransaction, deleteTransaction, loading }}>
            {children}
        </TransactionContext.Provider>
    );
};
