import React from 'react';

import '../../../../../assets/bundles/css/ln/components/button.css';

export default function Button({ onClickHandler, name }) {
    return (
        <div className="col-12 hlp-text-center hlp-margintop-40">
            <button onClick={onClickHandler} className="--btn --secondary">
                VER MÁS NOTAS DE {name.toUpperCase()}
            </button>
        </div>
    );
}
