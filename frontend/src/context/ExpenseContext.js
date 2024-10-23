import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ExpenseContext = createContext();

export const ExpenseProvider = ({ children }) => {
    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true); // Thêm state loading

    // Hàm để lấy danh sách chi phí từ API
    const fetchExpenses = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-expenses'); // Đảm bảo endpoint đúng
            setExpenses(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching expenses:', error);
            setLoading(false);
        }
    };

    // Hàm để xóa chi phí
    const deleteExpense = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/delete-expense/${id}`); // Đảm bảo endpoint đúng
            setExpenses(prev => prev.filter(expense => expense._id !== id)); // Cập nhật state
        } catch (error) {
            console.error('Error deleting expense:', error);
        }
    };

    // Gọi fetchExpenses khi Provider được khởi tạo
    useEffect(() => {
        fetchExpenses();
    }, []);

    return (
        <ExpenseContext.Provider value={{ expenses, setExpenses, deleteExpense, loading }}>
            {children}
        </ExpenseContext.Provider>
    );
};
