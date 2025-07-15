import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTransactions } from '../../redux/transaction/selectors';
import { getTransactionsCategories } from '../../redux/statistic/operations';
import { getTransactions } from '../../redux/transaction/operations';
import Balance from './Balance';
import TransactionList from '../TransactionListTablet/TransactionListTablet';
import AddButton from '../AddButton/AddButton';
import ModalAddTransaction from '../ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from '../ModalEditTransaction/ModalEditTransaction';
import NavigationTabs from '../NavigationTabs/NavigationTabs';
import Currency from '../Currency/Currency';
import styles from './HomeTab.module.css';
import { useMediaQuery } from 'react-responsive';


const HomeTab = () => {
    const [activeTab, setActiveTab] = useState('home');
    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

    useEffect(() => {
        dispatch(getTransactionsCategories());
        dispatch(getTransactions());
    }, [dispatch]);

    const balance = transactions.reduce((acc, tx) => acc + Number(tx.amount), 0);

    return (
        <div className={styles.dashboard}>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <div>
                        {isTablet && <NavigationTabs onTabChange={setActiveTab} />}
                        <Balance amount={balance} />
                    </div>
                    <Currency />
                </div>
                <TransactionList />
                <AddButton />
            </div>
            <ModalAddTransaction />
            <ModalEditTransaction />
        </div>
    );
};

export default HomeTab;