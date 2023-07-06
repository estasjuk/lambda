import { useDispatch } from 'react-redux';

import { loginUser } from '../../redux/auth/auth-operations';

import Login from '../../components/Login/Login';

const LoginPage = () => {
  const dispatch = useDispatch();

  const handleLogin = data => {
    dispatch(loginUser(data));
  };

  return <Login onSubmit={handleLogin} />;
};

export default LoginPage;