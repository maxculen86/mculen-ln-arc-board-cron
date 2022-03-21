/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import {
    FOTOAL100,
    STORYTELLING
} from '../../../../common/utils/subtypes/subtypeHelper';
import AperturaComponent from './component';

const AperturaStorytelling = props => {
    const { globalContent } = props || {};
    const { subtype } = globalContent;

    if (subtype === STORYTELLING || subtype === FOTOAL100)
        return <AperturaComponent {...props} />;
    return <></>;
};

AperturaStorytelling.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.string
    })
};

AperturaStorytelling.defaultProps = {};

export default Context(AperturaStorytelling);
