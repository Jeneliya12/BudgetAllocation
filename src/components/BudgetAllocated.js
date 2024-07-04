import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { FaTimesCircle, FaPlus, FaMinus } from 'react-icons/fa'; // Importing the icons

const BudgetAllocated = (props) => {
    const { dispatch, Currency } = useContext(AppContext);

    const handleIncrease = () => {
        const amount = 10;
        dispatch({
            type: 'ADD_BUDGET',
            payload: {
                name: props.name,
                amount: amount,
            },
        });
    };

    const handleDecrease = () => {
        const amount = 10;
        dispatch({
            type: 'REDUCE_BUDGET',
            payload: {
                name: props.name,
                amount: amount,
            },
        });
    };

    const handleDeleteItem = () => {
        dispatch({
            type: 'DELETE_ITEM',
            payload: {
                name: props.name // Assuming props.name holds the name of the item to delete
            }
        });
    };
    
    const iconBoxStyle = {
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '2em', // Adjusted width for larger size
        height: '2em', // Adjusted height for larger size
        borderRadius: '50%', // Makes the div circular
        cursor: 'pointer',
        marginRight: '5px',
    };

    const plusIconStyle = {
        color: '#fff', // White color for the icon
        backgroundColor: '#006400', // Dark green background for +
        fontSize: '1em', // Increased icon size
    };

    const minusIconStyle = {
        color: '#fff', // White color for the icon
        backgroundColor: '#8B0000', // Dark red background for -
        fontSize: '1em', // Increased icon size
    };

    return (
        <tr>
            <td>{props.name}</td>
            <td>{Currency}{props.budgetallocated}</td>
            <td>
                <div style={{ ...iconBoxStyle, ...plusIconStyle }} onClick={handleIncrease}>
                    <FaPlus size='1.2em' />
                </div>
            </td>
            <td>
                <div style={{ ...iconBoxStyle, ...minusIconStyle }} onClick={handleDecrease}>
                    <FaMinus size='1.2em' />
                </div>
            </td>
            <td>
                <FaTimesCircle size='1.2em' color="black" onClick={handleDeleteItem} />
            </td>
        </tr>
    );
};

export default BudgetAllocated;
