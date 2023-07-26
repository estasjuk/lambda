import css from './OrderCalc.module.css';

const OrderResult = ({calc}) => {
    const { price, time, deadline, deadline_date } = calc;
    return (
    <div className={css.order_wrapper}>
        <p className={css.order_text}>Ціна: {price}</p>
        <p className={css.order_text}>Час виконання: {time}</p>
        <p className={css.order_text}>Дедлайн (у секундах): {deadline}</p>
        <p className={css.order_text}>Дата дедлайну: {deadline_date}</p>
    </div>
    );
};

export default OrderResult;