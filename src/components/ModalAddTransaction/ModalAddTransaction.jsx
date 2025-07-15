import Modal from 'react-modal';
import { useDispatch, useSelector } from 'react-redux';
import { closeAddModal, selectIsAddModalOpen } from '../../redux/modal/slice';
import AddTransactionForm from '../AddTransactionForm/AddTransactionForm';
import styles from './ModalAddTransaction.module.css';

Modal.setAppElement('#root');

const ModalAddTransaction = () => {
    const isOpen = useSelector(selectIsAddModalOpen);
    const dispatch = useDispatch();

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeAddModal())}
            className={styles.modal}
            overlayClassName={styles.overlay}
        >
            <h2 className={styles.title}>Add transaction</h2>
            <AddTransactionForm />
        </Modal>
    );
};

export default ModalAddTransaction;
