import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './DashboardPage.module.css';
import Header from '../../components/Header/Header';
import NavigationTabs from '../../components/NavigationTabs/NavigationTabs';
import HomeTab from '../../components/HomeTab/HomeTab';
import { getTransactionsCategories } from '../../redux/Statistics/operations';
import { getTransactions } from '../../redux/Transactions/operations';
import { selectTransactions } from '../../redux/Transactions/selectors';
import Currency from '../../components/Currency/Currency';
import Statistics from '../../components/Statistics/Statistics';
import { useMediaQuery } from 'react-responsive';
import Balance from '../../components/HomeTab/Balance';

import TransactionListTablet from '../../components/TransactionListTablet/TransactionListTablet';
import TransactionListMobile from '../../components/TransactionListMobile/TransactionListMobile';

import AddButton from '../../components/AddButton/AddButton';
import ModalAddTransaction from '../../components/ModalAddTransaction/ModalAddTransaction';
import ModalEditTransaction from '../../components/ModalEditTransaction/ModalEditTransaction';

const DashboardPage = () => {
    const [activeTab, setActiveTab] = useState('home');
    const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
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
                        {!isTablet && <Balance amount={balance} />}
                        <HomeTab />
                        {!isTablet && <TransactionListMobile />}
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
            {!isTablet ? (
                <>
                    <NavigationTabs onTabChange={setActiveTab} />
                    <main className={styles.main}>{renderContent()}</main>
                </>
            ) : (
                <div className={styles.dashboard}>
                    <div className={styles.content}>
                        <div className={styles.sidebar}>
                            <div className={styles.sideTab}>
                                <NavigationTabs onTabChange={setActiveTab} />
                                <Balance amount={balance} />
                            </div>
                            <Currency />
                        </div>
                        {activeTab === "home" &&
                            <>
                                <TransactionListTablet />
                                <AddButton />
                            </>
                        }
                        {activeTab === "statistics" &&
                            <Statistics />
                        }

                    </div>
                    <ModalAddTransaction />
                    <ModalEditTransaction />
                </div>
            )}
        </div>
    );
};

export default DashboardPage;
