import React from 'react';
import Static from 'fusion:static';
import {
    HTMLLIBRE,
    RECETA
} from '../../../../private/common/utils/subtypes/subtypeHelper';
import getSignatureRenderOptions from '../_utils/helper';
import { shouldShowNoteFooterTopExternalSignature } from '../_utils/topRenderConditions';

function ExternalSignature({ globalContent }) {
    const {
        distributor = { name: 'LA NACION' },
        subtype,
        credits,
        withFirmaDistributor
    } = globalContent || {};

    const { name, mode, subcategory } = distributor;
    const { by = [] } = credits || {};

    const isReceta = subtype === RECETA;
    const isHtmlLibre = subtype === HTMLLIBRE;
    const isLaNacion = name === 'LA NACION';
    const isCustomDistributor = mode === 'custom';
    const hasAuthor = by.length > 0;

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

    if (
        !shouldShowNoteFooterTopExternalSignature({
            name,
            isReceta,
            isLaNacion,
            hasAuthor,
            selectedSignature
        })
    )
        return null;

    return (
        <Static id="LN-external-signature" htmlOnly>
            {selectedSignature}
        </Static>
    );
}

export default ExternalSignature;
