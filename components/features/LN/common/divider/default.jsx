import React from 'react';
import DividerComponent from '../../../ui/ln/divider/default';

function Divider() {
    return <DividerComponent className="col-start-1 col-end-[-1]" />;
}

Divider.arcType = 'divider';

Divider.isStatic = true;

export default Divider;
