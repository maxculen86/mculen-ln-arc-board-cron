import React from 'react';

import PropTypes from 'fusion:prop-types';
import Consumer from 'fusion:consumer';
import Static from 'fusion:static';

import './pageBuilderMessage.scss';
import { getClass, getTitle } from './getData';

const PageBuilderMessage = ({ id: idFeature, type, message }) => {
    const className = getClass(type);
    const title = getTitle(type);
    return (
        // <Static id={idFeature}>
        <div className={`oaerror ${className}`}>
            <strong>{title}</strong>
            {` - ${message}`}
        </div>
        // </Static>
    );
};

PageBuilderMessage.propTypes = {
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
};

export default Consumer(PageBuilderMessage);
