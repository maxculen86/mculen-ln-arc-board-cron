import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../../../resources/dist/css/ln/components/button.css';

const Button = ({ onClickHandler, name, loading, loadingIcon }) => {
    const disabledProp = {};
    if (loading) disabledProp.disabled = true;
    return (
        <div className="col-12 hlp-text-center hlp-margintop-40">
            {loading && loadingIcon}
            <button
                onClick={onClickHandler}
                className="--btn --secondary"
                {...disabledProp}
            >
                VER MÁS NOTAS DE {name.toUpperCase()}
            </button>
        </div>
    );
};

Button.propTypes = {
    name: PropTypes.string.isRequired,
    loading: PropTypes.boolean,
    loadingIcon: PropTypes.oneOf([
        PropTypes.node,
        PropTypes.arrayOf(PropTypes.node)
    ]),
    onClickHandler: PropTypes.func.isRequired
};

Button.defaultProps = {
    loading: false,
    loadingIcon: []
};

export default Button;
