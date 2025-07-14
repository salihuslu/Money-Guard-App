import styles from './AddButton.module.css';
import { openAddModal } from '../../redux/modals/slice';
import { useDispatch } from 'react-redux';
import Icons from '../../sprite.svg';

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
                    <use href={Icons + '#icon-plus'}></use>
                </svg>
            </button>
        </div>
    );
};

export default AddButton;
