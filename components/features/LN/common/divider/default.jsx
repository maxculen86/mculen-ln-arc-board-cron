import React from 'react';
import DividerComponent from '../../../ui/ln/divider/default';
import { WrapperBody } from '../wrapperBody/default';

function Divider() {
    return (
        <WrapperBody>
            <DividerComponent className="col-start-1 col-end-[-1]" />
        </WrapperBody>
    );
}

Divider.arcType = 'divider';

Divider.isStatic = true;

export default Divider;
