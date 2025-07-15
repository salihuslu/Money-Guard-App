import { useState } from 'react';
import { useDispatch } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addTransaction } from '../../redux/transaction/operations';
import { closeAddModal } from '../../redux/modal/slice';

import styles from './TransactionForm.module.css';

const TransactionForm = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        transactionDate: new Date(),
        type: 'INCOME',
        categoryId: '',
        comment: '',
        amount: '',
    });

    const [isIncome, setIsIncome] = useState(true);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

    const handleToggle = () => {
        setIsIncome(prev => !prev);
        setFormData(prev => ({
            ...prev,
            type: prev.type === 'INCOME' ? 'EXPENSE' : 'INCOME',
        }));
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleDateChange = date => {
        setFormData(prev => ({
            ...prev,
            transactionDate: date,
        }));
        setIsDatePickerOpen(false);
    };

    const handleSubmit = e => {
        e.preventDefault();

        const transactionToSend = {
            ...formData,
            amount: isIncome ? Math.abs(Number(formData.amount)) : -Math.abs(Number(formData.amount)),
        };

        dispatch(addTransaction(transactionToSend));
        dispatch(closeAddModal());
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <h2 className={styles.title}>Add transaction</h2>

            <div className={styles.toggleWrap}>
                <span className={`${styles.toggleLabel} ${isIncome ? styles.active : ''}`}>Income</span>
                <button type="button" className={styles.toggleBtn} onClick={handleToggle}>
                    <span className={styles.plusIcon}>+</span>
                </button>
                <span className={`${styles.toggleLabel} ${!isIncome ? styles.active : ''}`}>Expense</span>
            </div>

            <input
                type="number"
                name="amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={handleChange}
                className={styles.input}
                required
            />

            <div className={styles.datePickerWrap} onClick={() => setIsDatePickerOpen(true)}>
                <DatePicker
                    selected={formData.transactionDate}
                    onChange={handleDateChange}
                    dateFormat="dd.MM.yyyy"
                    className={styles.dateInput}
                    open={isDatePickerOpen}
                    onClickOutside={() => setIsDatePickerOpen(false)}
                />
                <svg className={styles.calendarIcon} width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M9 11H7V13H9V11ZM13 11H11V13H13V11ZM17 11H15V13H17V11ZM19 4H18V2H16V4H8V2H6V4H5C3.89 4 3.01 4.9 3.01 6L3 20C3 21.1 3.89 22 5 22H19C20.1 22 21 21.1 21 20V6C21 4.9 20.1 4 19 4ZM19 20H5V9H19V20Z"
                        fill="#734AEF"
                    />
                </svg>
            </div>

            <input
                type="text"
                name="categoryId"
                placeholder="Category"
                value={formData.categoryId}
                onChange={handleChange}
                className={styles.input}
                required
            />

            <input
                type="text"
                name="comment"
                placeholder="Comment"
                value={formData.comment}
                onChange={handleChange}
                className={styles.input}
            />

            <div className={styles.btnGroup}>
                <button type="submit" className={styles.addBtn}>ADD</button>
                <button type="button" className={styles.cancelBtn} onClick={() => dispatch(closeAddModal())}>
                    CANCEL
                </button>
            </div>
        </form>
    );
};

export default TransactionForm;
