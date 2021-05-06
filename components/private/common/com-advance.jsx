import React from 'react';
import PropTypes from 'prop-types';

import '../../../resources/dist/css/ln/components/com-advance.css';
import ComTitle from './com-title';

const ComAdvance = props => {
    const { classCondition, size, title, link } = props;

    return (
        <section className={`com-advance ${classCondition || ``}`}>
            <ComTitle
                tag="h2"
                size={size || '--m'}
                content={title}
                link={link || ''}
            />
        </section>
    );
};

ComAdvance.propTypes = {
    title: PropTypes.string.isRequired,
    size: PropTypes.string,
    classCondition: PropTypes.string
};

export default ComAdvance;
