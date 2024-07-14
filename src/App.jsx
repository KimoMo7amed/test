import React, { useState } from 'react';
import CustomerList from './Components/CustomerList';
import TransactionList from './Components/TransactionList';
import TransactionChart from './Components/TransactionChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    return (<>
      <h1 className='text-center font-semibold'>Customer Transactions</h1>
        <div className='p-5' >
            <div >
                <CustomerList setSelectedCustomer={setSelectedCustomer} />
                {selectedCustomer && (
                    <>
                        <TransactionList customer={selectedCustomer} />
                        <TransactionChart customer={selectedCustomer} />
                    </>
                )}
            </div>
        </div>
        </>
    );
}

export default App;
