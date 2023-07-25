import React from 'react';
import css from './Footer.module.css';

const Footer= () => {
  return (
    <footer className={css.background}>
      <div className={css.main}>
        <div>
          <a className={css.terms} href="https://correctarium.com/terms">
            Договір публічної оферти
          </a>
          <p>© Correctarium</p>
          <p>2015-2023</p>
        </div>
              <img className={css.logo} src="https://correctarium.com/img/footer_logo.png" alt="logo" />

        <div>
          <p>Надіслати текст на переклад:</p>
          <a className={css.email} href="mailto:manager@correctarium.com">
            manager@correctarium.com
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;