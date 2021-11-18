/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import useSubtype from '../../../common/hooks/useSubtype';

// Cuando surgan los dataLayers de los otros templates, intentar usar este y que
// quede completo para todos. Si no se puede, crear carpeta.
const dataLayer = props => {
    const { globalContent } = props;

    const { subtipo } = useSubtype();
    const scriptDataLayer = subtipo.execute('getDataLayer', globalContent);

    return (
        <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
                __html: scriptDataLayer
            }}
        />
    );
};

dataLayer.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        subtype: PropTypes.string.isRequired,
        content_restrictions: { content_code: PropTypes.string.isRequired }
    }).isRequired
};

export default dataLayer;
