import styles from './TransactionItem.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTransaction } from '../../redux/Transactions/operations';
import { openEditModal, setEditID } from '../../redux/Modals/slice';
import { selectCategories } from '../../redux/Statistics/selectors';

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
                    <p><strong>Date</strong> {transaction.transactionDate}</p>
                    <p><strong>Type</strong> {transaction.type}</p>
                    <p><strong>Category</strong> {categoryName}</p>
                    <p><strong>Comment</strong> {transaction.comment}</p>
                    <p><strong>Sum</strong> {transaction.amount}</p>
                </div>
                <div className={styles.cardFooter}>
                    <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
                    <button onClick={handleEdit} className={styles.editBtn}>
                        <svg className={styles.editIcon} width="16" height="16">
                            <use href="/src/sprite.svg#icon-pen" />
                        </svg>
                        Edit</button>

                </div>
            </li>
        );
    }

    // ✅ Tablet/Desktop Table Row versiyon
    return (
        <tr>
            <td>{transaction.transactionDate}</td>
            <td>{transaction.type}</td>
            <td>{categoryName}</td>
            <td>{transaction.comment}</td>
            <td>{transaction.amount}</td>
            <td>
                <button onClick={handleEdit} className={styles.editBtn}><svg className={styles.editIcon} width="16" height="16">
                    <use href="/src/sprite.svg#icon-pen" />
                </svg></button>
                <button onClick={handleDelete} className={styles.deleteBtn}>Delete</button>
            </td>
        </tr>
    );
};

export default TransactionItem;
