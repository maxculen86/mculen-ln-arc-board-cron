import React from 'react';
import '../../../../../resources/dist/css/ln/components/com-button.css';

function Button({
    onClickHandler,
    name,
    loading = false,
    loadingIcon,
    textButton = ''
}) {
    const notesName = name ? ` de ${name.toUpperCase()}` : '';
    return (
        <div className="col-12 --loader">
            {loading && loadingIcon}
            <button
                type="button"
                onClick={onClickHandler}
                className="com-button --secondary"
                disabled={loading}
                title={`Ver más notas${notesName}`}
            >
                {textButton || 'VER MÁS NOTAS'}
                {name && ` DE ${name.toUpperCase()}`}
            </button>
        </div>
    );
}

export default Button;
