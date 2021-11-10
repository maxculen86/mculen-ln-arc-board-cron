import React from 'react';
import PropTypes from 'prop-types';
import AnexoFeature from '../../../../features/LN-acumulado/anexoIframe';

const RenderAnexoByConfig = ({ anexoConfig = [] }) => {
    const urlAnexo = anexoConfig[0] || '';
    const position = anexoConfig[1] || '';

    if (urlAnexo !== '' && position !== '') {
        return (
            <AnexoFeature
                id={position === 'S' ? 'anexo-superior' : 'anexo-inferior'}
                customFields={{ url: urlAnexo }}
            />
        );
    }
    return <></>;
};

RenderAnexoByConfig.propTypes = {
    anexoConfig: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default RenderAnexoByConfig;
