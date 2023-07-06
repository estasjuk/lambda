import useForm from '../../shared/hooks/useForm';
import initialState from './initialState';

import Button from '../../shared/components/Button/Button';
import TextField from '../../shared/components/TextField/TextField';
import fields from './fields';

import css from './Registration.module.css';

const Registration = ({ onSubmit }) => {
  const { state, handleChange, handleSubmit } = useForm({
    initialState,
    onSubmit,
  });
  const { email, password } = state;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <TextField value={email} handleChange={handleChange} {...fields.email} />
      <TextField
        value={password}
        handleChange={handleChange}
        {...fields.password}
      />
      <Button className={css.button}>Register</Button>
    </form>
  );
};

export default Registration;