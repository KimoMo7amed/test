import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionList = ({ customer }) => {
    const [transactions, setTransactions] = useState([]);
    const [amountFilter, setAmountFilter] = useState("");

    useEffect(() => {
        if (customer) {
            axios.get(`http://localhost:3001/transactions?customer_id=${customer.id}`)
                .then(response => setTransactions(response.data));
        }
    }, [customer]);

    const handleAmountFilterChange = (e) => {
        setAmountFilter(e.target.value);
    };

    const filteredTransactions = transactions.filter(transaction =>
        transaction.amount.toString().includes(amountFilter)
    );

    return (
        <div  className='me-5'>
            <input
                type="text"
                placeholder="Filter by amount"
                value={amountFilter}
                onChange={handleAmountFilterChange}
                className='mb-4 form-control '
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredTransactions.map(transaction => (
                        <tr key={transaction.id}>
                            <td>{transaction.id}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.amount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionList;
