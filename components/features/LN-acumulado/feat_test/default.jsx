import React from 'react';
import PropTypes from 'fusion:prop-types';

const Index = ({ ampText }) => (
    <h1>
        Hola desde
        {ampText || ' por defecto'}
    </h1>
);

Index.propTypes = { ampText: PropTypes.string };
Index.defaultProps = { ampText: undefined };

Index.label = 'LN-Amp-Feature';

export default Index;
