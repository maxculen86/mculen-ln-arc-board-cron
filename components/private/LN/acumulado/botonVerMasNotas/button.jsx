import React from 'react';

import '../../../../../resources/dist/css/ln/components/button.css';

export default function Button({ onClickHandler, name, loading, loadingIcon }) {
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
}
