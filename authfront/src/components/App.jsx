import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import Navbar from './Navbar/Navbar';
import UserRoutes from './UserRoutes';

import { store, persistor } from '../redux/store';

import css from './App.module.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
          <BrowserRouter>
            <div className={css.wrapper}>
              <Navbar />
              <UserRoutes />
            </div>
          </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;