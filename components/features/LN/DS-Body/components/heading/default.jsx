import React from 'react';
import HeadingComponent from '../../../common/heading/default';
import { WrapperBody } from '../../../common/wrapperBody/default';

function Heading({ data }) {
    return (
        <WrapperBody>
            <HeadingComponent data={data} />
        </WrapperBody>
    );
}

Heading.arcType = 'header';
export default Heading;
