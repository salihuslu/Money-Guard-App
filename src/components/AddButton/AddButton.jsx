import styles from './AddButton.module.css';
import { openAddModal } from '../../redux/modal/slice';
import { useDispatch } from 'react-redux';

const AddButton = () => {
    const dispatch = useDispatch();

    return (
        <div className={styles.wrap}>
            <button
                className={styles.btn}
                type="button"
                onClick={() => {
                    dispatch(openAddModal());
                }}
            >
                <svg className={styles.icon}>
                    <use href="/sprite.svg#icon-plus"></use>
                </svg>
            </button>
        </div>
    );
};

export default AddButton;
