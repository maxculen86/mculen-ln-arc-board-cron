import React from 'react';
import PropTypes from 'prop-types';

import '../../../../../resources/dist/css/ln/components/button.css';

const Button = ({ onClickHandler, name, loading, loadingIcon, textButton }) => {
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
};

Button.propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.bool,
    loadingIcon: PropTypes.node,
    onClickHandler: PropTypes.func.isRequired,
    textButton: PropTypes.string
};

Button.defaultProps = {
    loading: false,
    loadingIcon: undefined,
    textButton: ''
};

export default Button;
