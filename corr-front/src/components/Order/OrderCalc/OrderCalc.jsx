import PropTypes from 'prop-types';
import { memo } from 'react';

//import css from './OrderResult.module.css';

const OrderResult = (calc) => {

    const { price, time, deadline, deadline_date } = calc;
    return (
    <div>
        <p>Ціна: {price}</p>
        <p>Час виконання: {time}</p>
        <p>Дедлайн (у секундах): {deadline}</p>
        <p>Дата дедлайну: {deadline_date}</p>
    </div>
    );
};

export default memo(OrderResult);

OrderResult.propTypes = {
    price: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    deadline_date: PropTypes.string.isRequired,
};