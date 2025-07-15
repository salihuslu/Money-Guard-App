import { useSelector } from 'react-redux';
import { selectTransactions } from '../../redux/transaction/selectors';
import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './TransactionListMobile.module.css';

const TransactionListMobile = () => {
    const transactions = useSelector(selectTransactions);

    return (
        <ul className={styles.mobileList}>
            {transactions.map(tx => (
                <TransactionItem key={tx.id} transaction={tx} isMobile />
            ))}
        </ul>
    );
};

export default TransactionListMobile;
