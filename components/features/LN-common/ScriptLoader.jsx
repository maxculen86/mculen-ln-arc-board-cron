import React from 'react';
import PropTypes from 'fusion:prop-types';

const ScriptLoader = () => <></>;

ScriptLoader.label = 'LN-Common-Feature-ScriptLoader';

ScriptLoader.propTypes = {
    customFields: PropTypes.shape({
        url: PropTypes.url,
        async: PropTypes.boolean,
        defer: PropTypes.boolean
    }).isRequired
};

export default ScriptLoader;
