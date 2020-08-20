import React from 'react';
import PropTypes from 'fusion:prop-types';
import Context from 'fusion:context';
import AperturaComponent from './component';

const AperturaStorytelling = props => {
    const { globalContent } = props || {};
    const { subtype } = globalContent;

    if (subtype === '4' || subtype === '8')
        return <AperturaComponent {...props} />;
    return <></>;
};

AperturaStorytelling.propTypes = {
    globalContent: PropTypes.shape({
        subtype: PropTypes.string
    }).isRequired
};

AperturaStorytelling.defaultProps = {};

export default Context(AperturaStorytelling);
