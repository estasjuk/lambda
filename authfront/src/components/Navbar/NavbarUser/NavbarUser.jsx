import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../../redux/auth/auth-selectors';

import { logoutUser } from '../../../redux/auth/auth-operations';

import css from './NavbarUser.module.css';

const NavbarUser = () => {
  const dispatch = useDispatch();
  // const user = useSelector(getUser);

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      {/* <span className={css.text}>{user.email},</span>{' '} */}
      <button className={css.button} onClick={onLogout}>
        Logout
      </button>
    </div>
  );
};

export default NavbarUser;