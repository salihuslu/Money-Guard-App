import React from 'react';
import style from './CustomDropIndicator.module.css';

const Icon = ({ id, className }) => (
    <svg className={className}>
        <use href={`/sprite.svg${id}`} />
    </svg>
);

function CustomDropIndicator({ up }) {
    return (
        <div className={style.wrapper}>
            <Icon
                id={up ? '#icon-vector-up' : '#icon-vector-down'}
                className={style.icon}
            />
        </div>
    );
}

export default CustomDropIndicator;
