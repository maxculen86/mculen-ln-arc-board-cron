import React from 'react';
import PropTypes from 'prop-types';
import { AnimatedIcons } from '@ln/contenidos-ui-animatedicons';

function AnimatedLogo({ logo }) {
    return <AnimatedIcons name={logo} />;
}

AnimatedLogo.propTypes = {
    logo: PropTypes.string.isRequired
};

export default AnimatedLogo;
