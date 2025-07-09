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
                        className={activeTab === 'home' ? styles.activeTab : styles.tab}
                        onClick={() => handleTabClick('home')}
                    >
                        <svg className={styles.icon}>
                            <use href="src/sprite.svg#icon-home" />
                        </svg>
                        <span className={styles.label}>Home</span>
                    </button>
                </li>

                <li>
                    <button
                        className={activeTab === 'statistics' ? styles.activeTab : styles.tab}
                        onClick={() => handleTabClick('statistics')}
                    >
                        <svg className={styles.icon}>
                            <use href="/src/sprite.svg#icon-graphic" />
                        </svg>
                        <span className={styles.label}>Statistics</span>
                    </button>
                </li>

                <li className={styles.currencyMobile}>
                    <button
                        className={activeTab === 'currency' ? styles.activeTab : styles.tab}
                        onClick={() => handleTabClick('currency')}
                    >
                        <svg className={styles.icon}>
                            <use href="/src/sprite.svg#icon-dollar" />
                        </svg>
                    </button>
                </li>
            </ul>

        </nav>
    );
};

export default NavigationTabs;