import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';

const Currency = () => {
    const { dispatch } = useContext(AppContext);

    const changeCurrency = (val) => {
        dispatch({
            type: 'CHG_CURRENCY',
            payload: val,
        });
    };

    return (
        <div className="col-md-4" style={{ backgroundColor: '#d3f9d8' }}>
            <div className='alert alert-secondary' style={{ backgroundColor: '#d3f9d8' }}>
                Currency {' '}
                <select
                    name="Currency"
                    id="Currency"
                    style={{ backgroundColor: '#d3f9d8', color: '#333', border: '1px solid #ccc', borderRadius: '5px' }}
                    onChange={(event) => changeCurrency(event.target.value)}
                >
                    <option style={{ backgroundColor: '#d3f9d8', color: '#333' }} value="$">$ Dollar</option>
                    <option style={{ backgroundColor: '#d3f9d8', color: '#333' }} value="£">£ Pound</option>
                    <option style={{ backgroundColor: '#d3f9d8', color: '#333' }} value="€">€ Euro</option>
                    <option style={{ backgroundColor: '#d3f9d8', color: '#333' }} value="₹">₹ Rupee</option>
                </select>
            </div>
        </div>
    );
};

export default Currency;
