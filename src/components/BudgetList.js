// BudgetList.js

import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import BudgetAllocated from './BudgetAllocated'; // Import BudgetAllocated component

const BudgetList = () => {
    const { expenses } = useContext(AppContext);

    return (
        <table className='table'>
            <thead className="thead-light">
                <tr>
                    <th scope="col">Department</th>
                    <th scope="col">Allocated Budget</th>
                    <th scope="col">Increase by 10</th>
                    <th scope="col">Decrease by 10</th>
                    {/* <th scope="col">Remove</th> */}
                </tr>
            </thead>
            <tbody>
                {expenses.map((expense) => (
                    <BudgetAllocated
                        key={expense.id}
                        id={expense.id}
                        name={expense.name}
                        budgetallocated={expense.budgetallocated} // Pass budgetallocated prop here
                    />
                ))}
            </tbody>
        </table>
    );
};

export default BudgetList;
