import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppProvider } from './context/AppContext';
import BudgetList from './components/BudgetList';
import BudgetSelected from './components/BudgetSelected';
import Currency from './components/Currency';
import BudgetForm from './components/BudgetForm';

const App = () => {
    return (
       
          
      <AppProvider>
            <div className='container'>
            
                <h1 className='mt-3'>Company's Budget Allocation</h1>
                <div className='row mt-3'> 
                    <div className='col-sm'>
                        <BudgetForm />
                    </div>
                    <div className='col-sm'>
                        <Currency />
                    </div>
                </div>
                <h3 className='mt-3'>Allocation</h3>
                <div className='row '>
                    <div className='col-sm'>
                        <BudgetList />
                    </div>
                </div>
                <h3 className='mt-3'> Change allocation</h3>
                <div className='row mt-3'>
                    <div className='col-sm'>
                        <BudgetSelected/>
                    </div>
                </div>
            </div>
        </AppProvider>
    );
};
export default App;