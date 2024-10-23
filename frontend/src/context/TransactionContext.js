import React, { createContext, useState } from 'react';
import axios from 'axios';

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([]); // Khởi tạo state cho giao dịch
    const [loading, setLoading] = useState(true); // Thêm state loading nếu cần

    // Ví dụ về cách thêm dữ liệu
    const fetchTransactions = async () => {
        // Gọi API để lấy danh sách giao dịch
        try {
            const response = await axios.get('http://localhost:5000/api/v1/get-transactions');
            setTransactions(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching transactions:', error);
            setLoading(false);
        }
    };

    // Hàm xóa giao dịch
    const deleteTransaction = (id) => {
        setTransactions((prev) => prev.filter(trans => trans._id !== id));
        // Thực hiện API xóa nếu cần
    };

    // Gọi fetchTransactions khi Provider được khởi tạo
    React.useEffect(() => {
        fetchTransactions();
    }, []);

    return (
        <TransactionContext.Provider value={{ transactions, deleteTransaction, loading }}>
            {children}
        </TransactionContext.Provider>
    );
};
