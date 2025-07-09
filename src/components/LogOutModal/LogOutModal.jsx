import styles from './LogOutModal.module.css';
import { useMediaQuery } from 'react-responsive';

import FormButton from '../FormButton/FormButton';
import { useEffect } from 'react';

const Icon = ({ id, className }) => (
    <svg className={className}>
        <use href={`/sprite.svg${id}`} />
    </svg>
);

function useMedia() {
    const isMobile = useMediaQuery({ query: '(max-width: 767.98px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1280px)' });
    return { isMobile, isTablet, isDesktop };
}

const LogOutModal = ({ closeModal, confirmLogout }) => {
    const { isMobile } = useMedia();

    useEffect(() => {
        document.body.style.overflow = 'hidden';

        const addCloseEvent = event => {
            if (event.key === 'Escape') closeModal();
        };

        document.addEventListener('keydown', addCloseEvent);

        return () => {
            document.body.style.overflow = 'auto';
            document.removeEventListener('keydown', addCloseEvent);
        };
    }, [closeModal]);

    const closeOnClickOutside = event => {
        if (event.currentTarget === event.target) closeModal();
    };

    const screenCondition = useMediaQuery({ query: '(min-width: 768px)' });

    return (
        <div className={styles.logOutModal} onClick={closeOnClickOutside}>
            <div className={styles.modalContent}>
                {!isMobile && (
                    <div
                        className={styles.modal_close}
                        onClick={closeModal}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                            <path d="M1 1L17 17" stroke="#FBFBFB" />
                            <path d="M1 17L17 0.999999" stroke="#FBFBFB" />
                        </svg>
                    </div>
                )}
                {screenCondition && <Icon id="#icon-logo_tab_desk" className={styles.homeIcon} />}

                <p>Are you sure you want to log out?</p>

                <div className={styles.buttonsWrapper}>
                    <FormButton
                        type={'button'}
                        text={'Logout'}
                        variant={'multiColorButton'}
                        handlerFunction={confirmLogout}
                    />
                    <FormButton
                        type={'button'}
                        text={'Cancel'}
                        variant={'whiteButton'}
                        handlerFunction={closeModal}
                    />
                </div>
            </div>
        </div>
    );
};

export default LogOutModal;
