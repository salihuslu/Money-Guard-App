import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Please enter a valid email').required('Required'),
    password: Yup.string().min(6, 'At least 6 characters').max(12, 'Maximum 12 characters').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Passwords do not match')
        .required('Required'),
});

const RegistrationForm = ({ onSubmit, onLoginRedirect }) => {
    return (
        <Formik
            initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
            validationSchema={RegistrationSchema}
            onSubmit={async (values, actions) => {
                const formattedFormValues = {
                    username: values.name,
                    email: values.email,
                    password: values.password,
                };

                try {
                    await onSubmit(formattedFormValues);
                } catch (error) {
                    console.error(' Error during registration:', error);
                } finally {
                    actions.setSubmitting(false);
                    actions.resetForm();
                }
            }}
        >
            <Form className={styles.form}>
                <div className={styles.inputWrapper}>
                    <svg className={styles.icon}>
                        <use href="/symbol-defs.svg#icon-user" />
                    </svg>
                    <Field name="name" placeholder="Name" className={styles.input} />
                </div>
                <ErrorMessage name="name" component="div" className={styles.error} />

                <div className={styles.inputWrapper}>
                    <svg className={styles.icon}>
                        <use href="/symbol-defs.svg#icon-e-mail" />
                    </svg>
                    <Field name="email" type="email" placeholder="E-mail" className={styles.input} />
                </div>
                <ErrorMessage name="email" component="div" className={styles.error} />

                <div className={styles.inputWrapper}>
                    <svg className={styles.icon}>
                        <use href="/symbol-defs.svg#icon-lock" />
                    </svg>
                    <Field name="password" type="password" placeholder="Password" className={styles.input} />
                </div>
                <ErrorMessage name="password" component="div" className={styles.error} />

                <div className={styles.inputWrapper}>
                    <svg className={styles.icon}>
                        <use href="/symbol-defs.svg#icon-lock" />
                    </svg>
                    <Field name="confirmPassword" type="password" placeholder="Confirm Password" className={styles.input} />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className={styles.error} />

                <div className={styles.buttonWrapper}>
                    <button type="submit" className={styles.registerButton}>
                        REGISTER
                    </button>

                </div>
                <button type="button" className={styles.loginButton} onClick={onLoginRedirect}>
                    LOG IN
                </button>
            </Form>
        </Formik>
    );
};

export default RegistrationForm;
