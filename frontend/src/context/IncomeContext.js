import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const IncomeContext = createContext();

export const IncomeProvider = ({ children }) => {
    const [incomes, setIncomes] = useState([]); // Danh sách thu nhập
    const [loading, setLoading] = useState(true); // Thêm state loading

    // Hàm để lấy danh sách thu nhập từ API
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

    // Hàm để xóa thu nhập
    const deleteIncome = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/v1/delete-income/${id}`);
            setIncomes((prev) => prev.filter(income => income._id !== id));
        } catch (error) {
            console.error('Error deleting income:', error);
        }
    };

    // Gọi fetchIncomes khi Provider được khởi tạo
    useEffect(() => {
        fetchIncomes();
    }, []);

    return (
        <IncomeContext.Provider value={{ incomes, setIncomes, deleteIncome, loading }}>
            {children}
        </IncomeContext.Provider>
    );
};
