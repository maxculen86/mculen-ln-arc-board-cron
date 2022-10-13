/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import FeatureArticulo from '../articulo/default';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';
import StaticContent from '../../../private/common/staticContent';

const BombaFeature = props => {
    const {
        customFields: { hideFeature, hideImage } = {},
        id: featureId
    } = props;

    if (hideFeature)
        return (
            <Static id={featureId}>
                <></>
            </Static>
        );

    const Component = (
        <section
            className={`mod-opening box-articles --bomba${(hideImage &&
                ' --no-image') ||
                ''}`}
            id="tema_00"
            data-is-block="true"
            data-block-name="h_tema-00"
            data-diagramacion-id="h_00"
            data-section="bomba"
            data-chain-position="01"
        >
            <FeatureArticulo {...props} isBomba />
        </section>
    );

    return <StaticContent>{Component}</StaticContent>;
};

BombaFeature.label = 'LN Home Bomba';

BombaFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...(featureArticleCustomsFields('bomba1') || {})
    })
};

export default BombaFeature;
