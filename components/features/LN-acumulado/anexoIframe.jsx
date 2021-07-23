import React from 'react';
import PropTypes from 'fusion:prop-types';
import AnexoIframe from '../../private/LN/acumulado/anexoIframe';

const AnexoFeature = ({ id, customFields: { url } }) => (
    <AnexoIframe url={url} id={id} />
);

AnexoFeature.label = 'LN-Acumulado-AnexoEspeciales';

AnexoFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        url: PropTypes.url.tag({ label: 'Url' })
    }).isRequired
};

AnexoFeature.lazy = ['default', 'amp'];

export default AnexoFeature;
