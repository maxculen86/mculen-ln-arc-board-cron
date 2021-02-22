import React from 'react';
import PropTypes from 'fusion:prop-types';

import '../../../resources/dist/css/ln/components/com-advance.css';
import ComTitle from './com-title';

const ComAdvance = props => {
    const { classCondition, size, title, volanta } = props;
    const volantaComponent = volanta && `${volanta} `;
    const titleText = title && `${title}`;
    const renderTitle = `${volantaComponent}${titleText}`;

    return (
        <section className={`com-advance ${classCondition || ``}`}>
            <ComTitle tag="h2" size={size} content={renderTitle} />
        </section>
    );
};

export default ComAdvance;
