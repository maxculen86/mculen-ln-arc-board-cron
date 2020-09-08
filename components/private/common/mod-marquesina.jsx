import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComLink from './com-link';

const ModMarquesina = props => {
    const { text, link, classCondition } = props;

    return (
        <strong className={`mod-firma ${classCondition || '--fivexs'}`}>
            <ComLink
                textname={text}
                link={link}
                classCondition={classCondition}
            />
        </strong>
    );
};

ModMarquesina.propTypes = {
    classCondition: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired
};

export default ModMarquesina;
