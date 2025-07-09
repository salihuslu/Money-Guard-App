import PropTypes from 'prop-types';
import styles from './Balance.module.css';

const Balance = ({ amount = 0 }) => {
    return (
        <div className={styles.card}>
            <h2 className={styles.label}>Your Balance</h2>
            <p className={styles.amount}>${amount.toFixed(2)}</p>
        </div>
    );
};

Balance.propTypes = {
    amount: PropTypes.number,
};

export default Balance;
