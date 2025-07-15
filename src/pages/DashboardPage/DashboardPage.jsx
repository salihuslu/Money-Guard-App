import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './DashboardPage.module.css';
import Header from '../../components/Header/Header';
import NavigationTabs from '../../components/NavigationTabs/NavigationTabs';
import HomeTab from '../../components/HomeTab/HomeTab';
import { getTransactionsCategories } from '../../redux/statistics/operations';
import { getTransactions } from '../../redux/transaction/operations';
import { selectTransactions } from '../../redux/transaction/selectors';
import Currency from '../../components/Currency/Currency';
import Statistics from '../../components/Statistics/Statistics';
import Balance from '../../components/HomeTab/Balance';

import TransactionListTablet from '../../components/TransactionListTablet/TransactionListTablet';
import TransactionListMobile from '../../components/TransactionListMobile/TransactionListMobile';

import AddButton from '../../components/AddButton/AddButton';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';

import { useMediaQuery } from 'react-responsive';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const isTablet = useMediaQuery({ query: '(min-width: 768px) and (max-width: 1151px)' });
    const isDesktop = useMediaQuery({ query: '(min-width: 1152px)' });

    const dispatch = useDispatch();
    const transactions = useSelector(selectTransactions);

    useEffect(() => {
        dispatch(getTransactionsCategories());
        dispatch(getTransactions());
    }, [dispatch]);

    const balance = transactions.reduce((acc, tx) => acc + Number(tx.amount), 0);

    const renderContent = () => {
        switch (activeTab) {
            case 'home':
                return (
                    <>
                        <Balance amount={balance} />
                        <HomeTab />
                        <TransactionListMobile />
                    </>
                );
            case 'statistics':
                return <Statistics />;
            case 'currency':
                return <Currency />;
            default:
                return null;
        }
    };

    return (
        <div className={styles.container}>
            <Header />

            {/* MOBILE */}
            {!isTablet && !isDesktop && (
                <>
                    <NavigationTabs onTabChange={setActiveTab} />
                    <main className={styles.main}>{renderContent()}</main>
                    {activeTab === 'home' && <AddButton />}
                </>
            )}

            {/* TABLET */}
            {isTablet && (
                <div className={styles.dashboardTablet}>
                    <div className={styles.tabletTopRow}>
                        <div className={styles.navBalance}>
                            <NavigationTabs onTabChange={setActiveTab} />
                            <Balance amount={balance} />
                        </div>
                        <Currency />
                    </div>
                    <div className={styles.transactionSection}>
                        {activeTab === 'home' && <TransactionListTablet />}
                        {activeTab === 'statistics' && <Statistics />}
                    </div>
                    <ModalAddTransaction />
                    <ModalEditTransaction />
                    {activeTab === 'home' && <AddButton />}
                </div>
            )}

            {isDesktop && (
                <div className={styles.dashboardDesktop}>
                    <div className={styles.sidebar}>
                        <NavigationTabs onTabChange={setActiveTab} />
                        <Balance amount={balance} />
                        <Currency />
                    </div>
                    <div className={styles.transactionSection}>
                        {activeTab === 'home' && <TransactionListTablet />}
                        {activeTab === 'statistics' && <Statistics />}
                    </div>
                    <ModalAddTransaction />
                    <ModalEditTransaction />
                    {activeTab === 'home' && <AddButton />}
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
