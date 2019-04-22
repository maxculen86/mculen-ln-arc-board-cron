'use strict';

import React from 'react';
export default props => {
    return <button {...props}>{props.children}</button>;
};
