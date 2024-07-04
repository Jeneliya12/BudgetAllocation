import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const BudgetForm = () => {
    const { expenses, Currency } = useContext(AppContext);
    const [expbudget, setExpBudget] = useState('');
    const [validationMessage, setValidationMessage] = useState('');

    // Function to handle changes in the budget input
    const handleExpBudgetChange = (event) => {
        const newExpBudget = event.target.value;
        setExpBudget(newExpBudget);
        validateBudget(newExpBudget);
    };

    // Function to handle scrolling to adjust the budget
    const handleWheelChange = (event) => {
        event.preventDefault(); // Prevent default scrolling behavior
        const delta = Math.sign(event.deltaY); // Get scroll direction
        const increment = delta > 0 ? -10 : 10; // Decrease by 10 if scrolling down, increase if scrolling up
        const newBudget = parseInt(expbudget || '0', 10) + increment; // Parse to integer base 10
        setExpBudget(newBudget.toString());
        validateBudget(newBudget.toString());
    };

    // Function to validate the budget input
    const validateBudget = (budget) => {
        if (budget === '') {
            setValidationMessage('');
            return;
        }

        const numericBudget = parseInt(budget, 10);
        if (isNaN(numericBudget)) {
            setValidationMessage('Please enter a valid number.');
            return;
        }

        if (numericBudget > 20000) {
            setValidationMessage('Budget cannot exceed 20000.');
            return;
        }

        const totalBudgetAllocated = getTotalBudgetAllocated();
        if (numericBudget < totalBudgetAllocated) {
            setValidationMessage('Budget should not be less than the amount spent so far.');
            return;
        }

        setValidationMessage('');
    };

    // Function to calculate total budget allocated
    const getTotalBudgetAllocated = () => {
        return expenses.reduce((total, expense) => total + expense.budgetallocated, 0);
    };

    // Determine if to show remaining amount and amount spent based on budget validation
    const showRemainingAndAmountSpent = () => {
        if (expbudget === '') {
            return false;
        }

        const numericBudget = parseInt(expbudget, 10);
        if (isNaN(numericBudget) || numericBudget < 0 || numericBudget > 20000) {
            return false;
        }

        return numericBudget >= getTotalBudgetAllocated();
    };

    return (
        <div className="row align-items-center">
            <div className="col-md-4">
                <div className="input-group mb-3">
                    <label htmlFor="budgetInput" className="input-group-text">
                        Budget:
                    </label>
                    <span className="input-group-text">
                        {Currency}
                    </span>
                    <input
                        id="budgetInput"
                        type="number"
                        className="form-control"
                        value={expbudget}
                        onChange={handleExpBudgetChange}
                        onWheel={handleWheelChange} // Handle scrolling to adjust budget
                        min="0"
                    />
                    {validationMessage && <p style={{ color: 'red', marginTop: '10px' }}>{validationMessage}</p>}
                </div>
            </div>

            {showRemainingAndAmountSpent() && (
                <>
                    <div className="col-md-3">
                        <div className='alert alert-success' role='alert'>
                            <span>Rem:{Currency} {expbudget !== '' ? parseInt(expbudget, 10) - getTotalBudgetAllocated() : 0}</span>
                        </div>
                    </div>

                    <div className="col-md-3">
                        <div className='alert alert-primary' role='alert'>
                            <span>Spent:{Currency} {getTotalBudgetAllocated()}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default BudgetForm;
