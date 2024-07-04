import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const BudgetSelected = () => {
    const { expenses, Currency, dispatch } = useContext(AppContext);
    const [name, setName] = useState('');
    const [action, setAction] = useState('Add'); // Default to 'Add'
    const [amount, setAmount] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    // Function to handle form submission
    const submitEvent = () => {
        if (name && amount) {
            const parsedAmount = parseFloat(amount);
            if (!isNaN(parsedAmount)) {
                const totalBudgetAllocated = getTotalBudgetAllocated();
                const remainingBalance = 20000 - totalBudgetAllocated;

                if (parsedAmount > remainingBalance) {
                    // Show a popup message for validation
                    setValidationMessage(`Allocated budget (${parsedAmount}) cannot exceed the remaining balance (${remainingBalance}).`);
                } else {
                    // Process budget allocation or reduction
                    if (action === 'Add') {
                        dispatch({
                            type: 'ADD_BUDGET',
                            payload: {
                                name,
                                amount: parsedAmount,
                            },
                        });
                    } else if (action === 'Reduce') {
                        dispatch({
                            type: 'REDUCE_BUDGET',
                            payload: {
                                name,
                                amount: parsedAmount,
                            },
                        });
                    }
                    // Clear form fields and validation message on successful submission
                    setName('');
                    setAmount('');
                    setValidationMessage('');
                }
            } else {
                setValidationMessage('Value cannot exceed reamining funds of £10770.');
            }
        } else {
            setValidationMessage('Please select a department and enter an amount.');
        }
    };

    // Function to calculate total budget allocated
    const getTotalBudgetAllocated = () => {
        return expenses.reduce((total, expense) => total + (expense.budgetallocated || 0), 0);
    };

    return (
        <div>
            <div className='row'>
                <div className="input-group mb-3" style={{ marginLeft: '2rem' }}>
                    <div className="input-group-prepend">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Department</label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect01" value={name} onChange={(event) => setName(event.target.value)}>
                        <option value="">Choose...</option>
                        {expenses.map(item => (
                            <option key={item.id} value={item.name}>{item.name}</option>
                        ))}
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '2rem' }}>
                        <label className="input-group-text" htmlFor="inputGroupSelect02">Action </label>
                    </div>
                    <select className="custom-select" id="inputGroupSelect02" value={action} onChange={(event) => setAction(event.target.value)}>
                        <option value="Add">Add</option>
                        <option value="Reduce">Reduce</option>
                    </select>

                    <div className="input-group-prepend" style={{ marginLeft: '10px' }}>
                        <span className="input-group-text" style={{ backgroundColor: 'transparent', border: 'none' }}>{Currency}</span>
                    </div>

                    <div className="col-auto">
                        <input
                            required
                            type='text'
                            id='cost'
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                            className="form-control"
                            style={{ width: '15ch', maxWidth: 'unset', borderRadius: '0' }}
                        />
                    </div>

                    <button className="btn btn-primary" onClick={submitEvent} style={{ marginLeft: '2rem' }}>
                        Save
                    </button>
                </div>
            </div>

            {/* Popup for validation message */}
            {validationMessage && (
                <div className="popup" style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)', textAlign: 'center' }}>
                    <h3>Validation Error</h3>
                    <p>{validationMessage}</p>
                    <button className="btn btn-danger" onClick={() => setValidationMessage('')}>Close</button>
                </div>
            )}
        </div>
    );
};

export default BudgetSelected;
