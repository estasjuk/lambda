import PropTypes from 'prop-types';
import css from './Section.module.css';

const Section = ({ children }) => {
  return <div className={css.main}>{children}</div>;
}

Section.propTypes = {
  children: PropTypes.node,
};

export default Section;