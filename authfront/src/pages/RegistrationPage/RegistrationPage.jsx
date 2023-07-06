import { useDispatch } from 'react-redux';

import { signupUser } from '../../redux/auth/auth-operations';

import Registration from '../../components/Registration/Registration';

const RegistrationPage = () => {
  const dispatch = useDispatch();
  const handleSignup = data => {
    dispatch(signupUser(data));
  };

  return (
    <>
      <Registration onSubmit={handleSignup} />
    </>
  );
};

export default RegistrationPage;