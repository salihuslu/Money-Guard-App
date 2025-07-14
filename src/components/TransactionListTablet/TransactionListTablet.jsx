import { useSelector } from 'react-redux';
import { selectTransactions } from '../../redux/transactions/selectors';
import TransactionItem from '../TransactionItem/TransactionItem';
import styles from './TransactionListTablet.module.css';

const TransactionListTablet = () => {
    const transactions = useSelector(selectTransactions);

    return (
        <div className={styles.tableContainer}>
            <table className={styles.transactionsTable}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Type</th>
                        <th>Category</th>
                        <th>Comment</th>
                        <th>Sum</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.map(transaction => (
                        <TransactionItem key={transaction.id} transaction={transaction} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TransactionListTablet;
