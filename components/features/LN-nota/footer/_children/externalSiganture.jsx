import React from 'react';
import PropTypes from 'fusion:prop-types';
import Static from 'fusion:static';
import {
    HTMLLIBRE,
    RECETA
} from '../../../../private/common/utils/subtypes/subtypeHelper';
import getSignatureRenderOptions from '../_utils/helper';

function ExternalSignature({ globalContent }) {
    const {
        distributor = { name: 'LA NACION' },
        subtype,
        credits,
        withFirmaDistributor
    } = globalContent || {};

    const { name, mode, subcategory } = distributor;
    const { by = [] } = credits || {};

    if (name && name === 'lanacionar') return null;

    const isReceta = subtype === RECETA;
    const isHtmlLibre = subtype === HTMLLIBRE;
    const isLaNacion = name === 'LA NACION';
    const isCustomDistributor = mode === 'custom';
    const hasAuthor = by.length > 0;

    if ((isReceta || isLaNacion) && hasAuthor) return null;

    const signatureRenderOptions = getSignatureRenderOptions({
        isHtmlLibre,
        isReceta,
        hasAuthor,
        isLaNacion,
        isCustomDistributor,
        withFirmaDistributor,
        name,
        subcategory
    });

    const selectedSignature = signatureRenderOptions?.find(
        option => option.shouldRender
    )?.signatureContent;

    if (!selectedSignature) return null;

    return (
        <Static id="LN-external-signature" htmlOnly>
            {selectedSignature}
        </Static>
    );
}

ExternalSignature.propTypes = {
    globalContent: PropTypes.shape({
        distributor: PropTypes.shape({
            name: PropTypes.string,
            mode: PropTypes.string
        }),
        credits: PropTypes.shape({
            by: PropTypes.array
        }),
        subtype: PropTypes.string,
        withFirmaDistributor: PropTypes.bool
    }).isRequired
};

export default ExternalSignature;
