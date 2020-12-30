import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComLink from './com-link';

const ModMarquee = props => {
    const { text, link, classCondition, size } = props;

    return (
        <strong
            className={`mod-marquee ${classCondition || ''} ${size ||
                '--fourxs'}`}
        >
            <ComLink
                textname={text}
                link={link}
                classCondition={classCondition}
            />
        </strong>
    );
};

ModMarquee.propTypes = {
    classCondition: PropTypes.string,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

ModMarquee.defaultProps = {
    classCondition: ''
};

export default ModMarquee;
