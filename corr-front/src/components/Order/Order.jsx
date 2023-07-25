import { useState, useEffect } from 'react';

import css from './Order.module.css';
import OrderForm from './OrderForm/OrderForm';
import OrderCalc from './OrderCalc/OrderCalc';
import { getOrderCalculation } from '../../shared/services/order-api';
import Loader from '../../shared/components/Loader';

const Order = () => {
    const [calc, setCalc] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [state, setState] = useState()

    const {count, mimetype, language} = state;

    const onCalcOrder = (count, mimetype, language) => {
        setState({
            count,
            mimetype,
            language,
        })
        setCalc(null);
    };

    useEffect(() => {
        if (state) {
        const fetchOrder = async () => {
            try {
            setLoading(true);
            const data = await getOrderCalculation(language, mimetype, count);
            setCalc({
                price: data.price,
                time: data.time,
                deadline: data.deadline,
                deadline_date: data.deadline_date,
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
    
}}, [count, language, mimetype, calc, state]);


return (
    <div className={css.App}>
        <OrderForm onSubmit={onCalcOrder} />
        {calc && <OrderCalc/>}
        {loading && <Loader />}
        {/* {error && <p>Something goes wrong...</p>} */}
    </div>
    );
};

export default Order;