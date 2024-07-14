import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const TransactionChart = ({ customer }) => {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        if (customer) {
            axios.get(`http://localhost:3001/transactions?customer_id=${customer.id}`)
                .then(response => setTransactions(response.data));
        }
    }, [customer]);

    const data = transactions.reduce((acc, transaction) => {
        const date = transaction.date;
        if (!acc[date]) {
            acc[date] = { date, amount: 0 };
        }
        acc[date].amount += transaction.amount;
        return acc;
    }, {});

    const chartData = Object.values(data);

    return (
        <LineChart
            width={500}
            height={300}
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="amount" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};

export default TransactionChart;
