import React from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';

import '../../../../../../../resources/dist/css/ln/modules/mod-warning.css';
import { getClass, getTitle } from './getData';

const PageBuilderMessage = ({ id: idFeature, type, message }) => {
    const className = getClass(type);
    const title = getTitle(type);
    return (
        <div className={`mod-warning ${className}`}>
            <h2 className="title">{title}</h2>
            <p className="text">{message}</p>
        </div>
    );
};

PageBuilderMessage.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default Consumer(PageBuilderMessage);
