import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';

const RegistrationSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Geçerli bir e-posta girin').required('Required'),
    password: Yup.string().min(6, 'En az 6 karakter').max(12, 'En fazla 12 karakter').required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
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
                    console.error('Kayıt sırasında hata:', error);
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
