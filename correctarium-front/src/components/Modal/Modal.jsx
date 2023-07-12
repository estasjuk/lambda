import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { createPortal } from 'react-dom';
import IconButton from 'components/IconButton/IconButton';
import { ReactComponent as OpenIcon } from 'icons/icons8-close.svg';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ onCloseBtn }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseBtn();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onCloseBtn]);

  return createPortal(
    <div className={css.backdrop}>
      <div className={css.content}>
        <div className={css.modal_top}>
          <h3 className={css.title}>Скасувати замовлення?</h3>

          <IconButton onClick={onCloseBtn}>
            <OpenIcon width="18" height="18" className={css.close_btn} />
          </IconButton>
        </div>

        <p className={css.text}>
          Закривши цю сторінку, ви скасуєте замовлення і зміни не збережуться.
          Ви впевнені?
        </p>

        <div className={css.btns}>
          <button type="button" className={css.yes} onClick={onCloseBtn}>
            Так, скасувати
          </button>
          <button type="button" className={css.no} onClick={onCloseBtn}>
            Ні, залишитись
          </button>
        </div>
      </div>
    </div>,
    modalRoot,
  );
};

export default Modal;

Modal.propTypes = {
  onCloseBtn: PropTypes.func.isRequired,
};