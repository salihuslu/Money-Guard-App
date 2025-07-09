import styles from './Loader.module.css';

const Loader = ({ fullScreen = false }) => (
    <div className={`${styles.loader} ${fullScreen ? styles.fullScreen : ''}`}>
        <div className={styles.spinner}></div>
    </div>
);

export default Loader;