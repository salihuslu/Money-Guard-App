import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import styles from './Header.module.css';
import exitIcon from '../../assets/images/exit.png';
import { logout } from '../../redux/auth/operations';
import LogOutModal from '../LogOutModal/LogOutModal';

const Header = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    const handleConfirmLogout = () => {
        dispatch(logout());
        closeModal();
    };

    return (
        <header className={styles.header}>
            <div className={styles.logoWrapper}>
                <img
                    src="/favicon.ico"
                    alt="Money Guard logo"
                    className={styles.logo}
                />
                <h1 className={styles.title}>Money Guard</h1>
            </div>

            <div className={styles.userSection}>
                {user?.username ? (
                    <span className={styles.username}>{user.username}</span>
                ) : (
                    <span className={styles.guest}>Guest Mode</span>
                )}

                <img
                    src={exitIcon}
                    alt="Logout"
                    className={styles.exitIcon}
                    title="Logout"
                    onClick={openModal}
                />

                {isOpen && (
                    <LogOutModal
                        closeModal={closeModal}
                        confirmLogout={handleConfirmLogout}
                    />
                )}
            </div>
        </header>
    );
};

export default Header;
