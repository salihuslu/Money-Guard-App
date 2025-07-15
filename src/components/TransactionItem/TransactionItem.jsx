import styles from './TransactionItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../redux/transaction/operations';
import { openEditModal, setEditID } from '../../redux/modal/slice';
import { selectCategories } from '../../redux/statistics/selectors';

import sprite from '../../sprite.svg'; // sprite dosyasını import et

const TransactionItem = ({ transaction, isMobile = false }) => {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);

    const handleDelete = () => {
        dispatch(deleteTransaction(transaction.id));
    };

    const handleEdit = () => {
        dispatch(setEditID(transaction.id));
        dispatch(openEditModal());
    };

    const category = categories.find(cat => cat.id === transaction.categoryId);
    const categoryName = category ? category.name : 'Unknown';

    if (isMobile) {
        return (
            <li className={styles.card}>
                <div className={styles.cardContent}>
                    <div className={styles.cardRow}>
                        <strong>Date</strong>
                        <span>{transaction.transactionDate}</span>
                    </div>
                    <div className={styles.cardRow}>
                        <strong>Type</strong>
                        <span>{transaction.type}</span>
                    </div>
                    <div className={styles.cardRow}>
                        <strong>Category</strong>
                        <span>{categoryName}</span>
                    </div>
                    <div className={styles.cardRow}>
                        <strong>Comment</strong>
                        <span>{transaction.comment}</span>
                    </div>
                    <div className={styles.cardRow}>
                        <strong>Sum</strong>
                        <span className={
                            transaction.type === 'INCOME'
                                ? styles.sumIncome
                                : styles.sumExpense
                        }>
                            {Math.abs(transaction.amount)}
                        </span>
                    </div>
                </div>
                <div className={styles.cardFooter}>
                    <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
                    <button onClick={handleEdit} className={styles.editBtn}>
                        <svg className={styles.editIcon} width="16" height="16">
                            <use href={`${sprite}#icon-pen`} />
                        </svg>
                        Edit
                    </button>
                </div>
            </li>
        );
    }

    return (
        <tr>
            <td>{transaction.transactionDate}</td>
            <td>{transaction.type}</td>
            <td>{categoryName}</td>
            <td>{transaction.comment}</td>
            <td>
                <span className={
                    transaction.type === 'INCOME'
                        ? styles.sumIncome
                        : styles.sumExpense
                }>
                    {Math.abs(transaction.amount)}
                </span>
            </td>
            <td>
                <button onClick={handleEdit} className={styles.editBtn}>
                    <svg className={styles.editIcon} width="16" height="16">
                        <use href={`${sprite}#icon-pen`} />
                    </svg>
                </button>
                <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
            </td>
        </tr>
    );
};

export default TransactionItem;
