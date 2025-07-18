import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import styles from './LoginForm.module.css';
import { useDispatch } from 'react-redux';
import { login } from '../redux/auth/operations';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Geçerli bir e-posta girin').required('Required'),
    password: Yup.string().min(6, 'En az 6 karakter').required('Required'),
});

const LoginForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (values, actions) => {
        try {
            const resultAction = await dispatch(login(values));
            if (!login.fulfilled.match(resultAction)) {
                alert(resultAction.payload || 'Login failed')
            }
        } catch (err) {
            console.error('Login error:', err);
        } finally {
            actions.setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={LoginSchema}
            onSubmit={handleSubmit}
        >
            <Form className={styles.form}>
                <div className={styles.inputGroup}>

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
    );
};

export default LoginForm;