'use strict';

import React from 'react';

export default props => {
    return <picture {...props}>{props.children}</picture>;
};
