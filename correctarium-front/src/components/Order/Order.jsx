import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import PropTypes from 'prop-types';

import css from './Order.module.css';

import Form from './Form/Form';
import { getOrderCalculation } from '../../../services/order-api';
import Loader from '../../../shared/components/Loader/Loader';
import OrderResult from './OrderResult/OrderResult';


const Order = ({ onSubmit }) => {
    const [state, setState] = useState({
        count: '',
        language: '',
        mimetype: '',
    });

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [searchParams, setSearchParams] = useSearchParams();
    const count = searchParams.get('count');
    const mimetype = searchParams.get('mimetype');
    const language = searchParams.get('language');


const onOrderResult = search => {
    setSearchParams({ count, mimetype, language });
    setState({});
  };

useEffect(() => {
    if (state) {
      const fetchOrderCalculation = async () => {
        try {
          setLoading(true);
          const data = await getOrderCalculation(count, language, mimetype);
          setState(...data.results);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };

      fetchOrderCalculation();
    }
  }, [count, language, mimetype, state]);

    return (
    <div>
    <h2 className={css.main_title}>Замовити редагування</h2>
        <Form onSubmit={onOrderResult}></Form>
        <OrderResult/>
        {loading && <Loader />}
        {error && <p>Something goes wrong...</p>}
    </div>
    );
}

export default Order;

Order.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};