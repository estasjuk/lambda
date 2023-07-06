import { useMemo } from 'react';
import { nanoid } from 'nanoid';

import css from './TextField.module.css';

const TextField = ({ label, handleChange, ...props }) => {
  const id = useMemo(() => nanoid(), []);

  return (
    <div className={css.wrapper}>
      <label className={css.label} htmlFor={id}>
        {label}
      </label>
      <input
        className={css.field}
        id={id}
        onChange={handleChange}
        {...props}
        autoComplete="true"
      />
    </div>
  );
};

export default TextField;