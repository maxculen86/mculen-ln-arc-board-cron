import React from 'react';
import PropTypes from 'fusion:prop-types';

import ComFigcaption from './com-figcaption';
import ComText from './text';

import '../../../resources/dist/css/ln/modules/mod-figcaption.css';

const ModFigcaption = props => {
    const { title, credit } = props;
    if (!title && !credit) return null;

    return (
        <ComFigcaption>
            <ComText extraClass="--caption" size="2xs">
                {title}
            </ComText>
            <ComText extraClass="--credit" size="2xs">
                {credit}
            </ComText>
        </ComFigcaption>
    );
};

ModFigcaption.propTypes = {
    title: PropTypes.string,
    credit: PropTypes.string
};

ModFigcaption.defaultProps = {
    title: '',
    credit: ''
};

export default ModFigcaption;
