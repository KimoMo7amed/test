import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerList = ({ setSelectedCustomer }) => {
    const [customers, setCustomers] = useState([]);
    const [filter, setFilter] = useState("");

    useEffect(() => {
        axios.get('http://localhost:3001/customers')
            .then(response => setCustomers(response.data));
        
    }, []);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className='me-5'>
            <input
                type="text"
                placeholder="Filter by name"
                value={filter}
                onChange={handleFilterChange}
                className='mb-4 form-control '
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.map(customer => (
                        <tr key={customer.id} onClick={() => setSelectedCustomer(customer)}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
