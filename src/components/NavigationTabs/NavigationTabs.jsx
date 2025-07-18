import { useState } from 'react';
import styles from './NavigationTabs.module.css';

const NavigationTabs = ({ onTabChange }) => {
    const [activeTab, setActiveTab] = useState('home');

    const handleTabClick = tab => {
        setActiveTab(tab);
        onTabChange(tab);
    };

    return (
        <nav className={styles.sidebar}>
            <ul className={styles.tabList}>
                <li>
                    <button
                        type="button"
                        className={`${styles.tab} ${activeTab === 'home' ? styles.activeTab : ''}`}
                        onClick={() => handleTabClick('home')}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-home" />
                        </svg>
                        <span className={styles.label}>Home</span>
                    </button>
                </li>

                <li>
                    <button
                        type="button"
                        className={`${styles.tab} ${activeTab === 'statistics' ? styles.activeTab : ''}`}
                        onClick={() => handleTabClick('statistics')}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-graphic" />
                        </svg>
                        <span className={styles.label}>Statistics</span>
                    </button>
                </li>

                <li className={styles.currencyMobile}>
                    <button
                        type="button"
                        className={`${styles.tab} ${activeTab === 'currency' ? styles.activeTab : ''}`}
                        onClick={() => handleTabClick('currency')}
                    >
                        <svg className={styles.icon}>
                            <use href="/sprite.svg#icon-dollar" />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default NavigationTabs;
