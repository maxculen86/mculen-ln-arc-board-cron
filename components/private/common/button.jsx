'use strict';

import React from 'react';

export default props => {
    return (
        <button {...props} type="button">
            {props.children}
        </button>
    );
};
