/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import FeatureArticulo from '../articulo/default';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';

const BombaFeature = props => {
    const {
        customFields: { hideFeature, hideImage } = {},
        id: featureId
    } = props;
    const { isAdmin } = useAppContext();

    if (hideFeature)
        return (
            <Static id={featureId}>
                <></>
            </Static>
        );

    const Component = (
        <section
            className={`mod-opening --bomba${(hideImage && ' --no-image') ||
                ''}`}
            id="tema_00"
            data-is-block="true"
            data-block-name="h_tema-00"
            data-diagramacion-id="h_00"
        >
            <FeatureArticulo {...props} isBomba />
        </section>
    );

    return isAdmin ? Component : <Static id={featureId}>{Component}</Static>;
};

BombaFeature.label = 'LN Home Bomba';

BombaFeature.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        ...(featureArticleCustomsFields('bomba1') || {})
    })
};

export default BombaFeature;
