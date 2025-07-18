import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './LoginPage.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operations';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email address').required('Required'),
    password: Yup.string().min(6, 'At least 6 characters').required('Required'),
});

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (values, actions) => {
        try {
            const resultAction = await dispatch(login(values));
            if (login.fulfilled.match(resultAction)) {
                navigate('/dashboard');
            } else {
                alert(resultAction.payload || 'Login failed');
            }
        } catch (err) {
            console.error('Login error:', err);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <img src="/favicon.ico" alt="Money Guard icon" className={styles.logo} />
            <h1 className={styles.title}>Money Guard</h1>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={LoginSchema}
                onSubmit={handleSubmit}
            >
                <Form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <svg className={styles.icon}>
                            <use href="/symbol-defs.svg#icon-e-mail" />
                        </svg>
                        <Field
                            name="email"
                            type="email"
                            placeholder="E-mail"
                            autoComplete="off"
                            className={styles.input}
                        />
                        <ErrorMessage name="email" component="div" className={styles.error} />
                    </div>

                    <div className={styles.inputGroup}>
                        <svg className={styles.icon}>
                            <use href="/symbol-defs.svg#icon-lock" />
                        </svg>
                        <Field
                            name="password"
                            type="password"
                            placeholder="Password"
                            className={styles.input}
                        />
                        <ErrorMessage name="password" component="div" className={styles.error} />
                    </div>

                    <button type="submit" className={styles.loginButton}>
                        LOG IN
                    </button>
                </Form>
            </Formik>

            <button
                type="button"
                onClick={() => navigate('/register')}
                className={styles.registerButton}
            >
                REGISTER
            </button>
        </div>
    );
};

export default LoginPage;
