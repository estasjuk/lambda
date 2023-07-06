import PropTypes from 'prop-types';

const Button = ({ children, type = 'submit' }) => {
  return (
    <button type="type">
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  children: PropTypes.string.isRequired,
};