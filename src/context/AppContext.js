// AppContext.js

import React, { createContext, useReducer } from 'react';

// Define your reducer
export const AppReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_BUDGET':
            return {
                ...state,
                expenses: state.expenses.map(expense => {
                    if (expense.name === action.payload.name) {
                        // Ensure budgetallocated doesn't exceed 20000
                        const newBudget = (expense.budgetallocated || 0) + action.payload.amount;
                        return {
                            ...expense,
                            budgetallocated: Math.min(Math.max(newBudget, 0), 20000)
                        };
                    }
                    return expense;
                })
            };
        case 'REDUCE_BUDGET':
            return {
                ...state,
                expenses: state.expenses.map(expense => {
                    if (expense.name === action.payload.name) {
                        // Ensure budgetallocated doesn't go below 0
                        const newBudget = (expense.budgetallocated || 0) - action.payload.amount;
                        return {
                            ...expense,
                            budgetallocated: Math.max(newBudget, 0)
                        };
                    }
                    return expense;
                })
            };
        case 'CHG_CURRENCY':
            return {
                ...state,
                Currency: action.payload
            };
        case 'DELETE_ITEM':
            return {
                ...state,
                expenses: state.expenses.filter(expense => expense.name !== action.payload.name)
            };
        default:
            return state;
    }
};

// Initial state
const initialState = {
    expenses: [
        { id: "Marketing", name: 'Marketing', budgetallocated: 0 },
        { id: "Finance", name: 'Finance', budgetallocated: 0},
        { id: "Sales", name: 'Sales', budgetallocated: 0 },
        { id: "Human Resource", name: 'Human Resource', budgetallocated: 0},
        { id: "IT", name: 'IT', budgetallocated: 0},
    ],
    Currency: '£'
};

// Create context and provider
export const AppContext = createContext();

export const AppProvider = (props) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider
            value={{
                expenses: state.expenses,
                dispatch,
                Currency: state.Currency,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
};
