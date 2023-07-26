import { useState, useEffect } from 'react';

import OrderForm from './OrderForm/OrderForm';
import OrderCalc from './OrderCalc/OrderCalc';
import { getOrderCalculation } from '../../shared/services/order-api';
import Loader from '../../shared/components/Loader';

const Order = () => {
    const [calc, setCalc] = useState({
        price: '',
        time: '',
        deadline: '',
        deadline_date: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState({
        count: '',
        mimetype: '',
        language: '',
    })

    const {count, mimetype, language} = state;

    const onCalcOrder = (count, mimetype, language) => {
        setState(
            count,
            mimetype,
            language,
        );
        setCalc({
            price: '',
            time: '',
            deadline: '',
            deadline_date: '',
        });
    };

    useEffect(() => {

        if (count && mimetype && language) {
        const fetchOrder = async () => {
            try {
            setLoading(true);
            const response = await getOrderCalculation(language, mimetype, count);
            setCalc({
                price: response.data.price,
                time: response.data.time,
                deadline: response.data.deadline,
                deadline_date: response.data.deadline_date,
            });
            } 
            catch (error) {
            setError(error.message);
            } 
            finally {
            setLoading(false);
            }
        };
    
        fetchOrder();
    
}}, [count, language, mimetype, state]);


return (
    <div>
        <OrderForm onSubmit={onCalcOrder} />
        {calc.price && <OrderCalc calc={calc}/>}
        {loading && <Loader />}
        {error && <p>Something goes wrong...</p>}
    </div>
    );
};

export default Order;