import React from 'react';
import PropTypes from 'fusion:prop-types';
import '../../../../../resources/dist/css/ln/modules/mod-keepreading.css';
import CajaTema from '../../common/cajaTema';

const Index = ({ relatedContent = [], outputType = 'default' }) => {
    return (
        <CajaTema
            title="Seguí leyendo"
            sectionName="SeguiLeyendo"
            articles={relatedContent}
            position="toi"
            outputType={outputType}
            withVolanta
        />
    );
};

Index.propTypes = {
    relatedContent: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            headlines: PropTypes.shape({
                basic: PropTypes.string
            }),
            type: PropTypes.string.isRequired,
            website_url: PropTypes.string,
            canonical_url: PropTypes.string
        })
    ).isRequired,
    outputType: PropTypes.string.isRequired
};

export default Index;
