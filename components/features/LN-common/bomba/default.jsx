/* eslint-disable react/require-default-props */
import React from 'react';
import { useAppContext } from 'fusion:context';
import PropTypes from 'fusion:prop-types';
import getProperties from 'fusion:properties';
import Static from 'fusion:static';
import FeatureArticulo from '../articulo/default';
import get from '../../../private/common/utils/get';
import featureArticleCustomsFields from '../../../private/LN/common/utils/articuloHelper';

const BombaFeature = props => {
    const {
        customFields: { hideFeature, hideImage } = {},
        id: featureId
    } = props;
    const { arcSite, isAdmin } = useAppContext();

    if (hideFeature) return <></>;

    const { cajaTemaConfig } = getProperties(arcSite);

    const config = {
        config: get(cajaTemaConfig, `bomba1.articles[0]`, null),
        index: 0
    };

    const Component = (
        <section
            className={`mod-opening --bomba${(hideImage && ' --no-image') ||
                ''}`}
            id="tema_00"
            data-is-block="true"
            data-block-name="h_tema-00"
            data-diagramacion-id="h_00"
        >
            <FeatureArticulo
                {...props}
                imageConfig="fotoAl100"
                customConfig={config}
                isBomba
            />
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
