import React from 'react';
import PropTypes from 'fusion:prop-types';
import AnexoIframe from '../../private/LN/acumulado/anexoIframe';

const AnexoFeature = ({ id, customFields: { title, url, styles } }) => (
    <AnexoIframe title={title} url={url} id={id} styles={styles} />
);

AnexoFeature.label = 'LN-Acumulado-AnexoEspeciales';

AnexoFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        title: PropTypes.string.tag({ defaultValue: '', label: 'Titulo' }),
        url: PropTypes.url.tag({ label: 'Url' }).isRequired,
        styles: PropTypes.richtext.tag({ defaultValue: '', label: 'Styles' })
    }).isRequired
};

export default AnexoFeature;
