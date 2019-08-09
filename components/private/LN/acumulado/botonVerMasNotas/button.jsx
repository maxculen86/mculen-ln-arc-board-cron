import React from 'react';

export default function Button({ onClickHandler, title }) {
    return (
        <button onClick={onClickHandler} className="--btn --secondary">
            VER MÁS NOTAS DE {title}
        </button>
    );
}
