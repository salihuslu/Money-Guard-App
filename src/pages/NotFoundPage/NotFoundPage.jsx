import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
    return (
        <div className={css.container}>
            <div className={css.content}>
                <h1 className={css.title}>404</h1>
                <h2 className={css.subtitle}>Page Was Not Found</h2>
                <p className={css.description}>The page you are looking for may have been moved, deleted, or never existed.</p>
                <Link to="/" className={css.button}>
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default NotFoundPage;