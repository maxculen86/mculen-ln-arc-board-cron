import React from 'react';
import HeadingCommon from '../../../../LN/common/heading/default';

function Heading({ data = {} }) {
    return (
        <div data-tw style={{ display: 'contents' }}>
            <HeadingCommon data={data} classname="container-center-100 mb-8" />
        </div>
    );
}
Heading.arcType = 'header';

export default Heading;
