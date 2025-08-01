import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './RegistrationPage.module.css';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import { register } from '../../redux/auth/operations';

const RegistrationPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async values => {
        try {
            const resultAction = await dispatch(register(values));
            if (register.fulfilled.match(resultAction)) {
                navigate('/');
            } else {
                alert(resultAction.payload || 'Registration failed');
            }
        } catch (error) {
            console.error('Registration error:', error);
        }
    };

    const handleLoginRedirect = () => {
        navigate('/');
    };

    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1 className={styles.title}>
                    <img src="/favicon.ico" alt="favicon" className={styles.favicon} />
                    Money Guard
                </h1>
                <RegistrationForm
                    onSubmit={handleSubmit}
                    onLoginRedirect={handleLoginRedirect}
                />
            </div>
        </div>
    );
};

export default RegistrationPage;
