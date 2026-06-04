import getSignatureRenderOptions from './helper';
import {
    RECETA,
    HTMLLIBRE
} from '../../../../private/common/utils/subtypes/subtypeHelper';
import { useSignature } from '../../../LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../../private/common/utils/firmaHelper';
import { isEmptyObject } from '../../../../private/common/utils/isEmptyObject';

export const shouldShowNoteFooterTopThemes = ({ subtype, tags }) =>
    subtype !== RECETA && tags?.length > 0;

export const shouldShowNoteFooterTopExternalSignature = ({
    name,
    isReceta,
    isLaNacion,
    hasAuthor,
    selectedSignature
}) => {
    if (name === 'lanacionar') return false;
    if ((isReceta || isLaNacion) && hasAuthor) return false;
    if (!selectedSignature) return false;
    return true;
};

export const shouldShowNoteFooterTopSignature = ({
    showSignatureWithDistributor,
    hasAuthors
}) => showSignatureWithDistributor || hasAuthors;

const getSignatureRenderingState = ({
    globalContent,
    layout,
    siteProperties
}) => {
    const {
        subtype,
        taxonomy: { tags = [] },
        distributor,
        credits,
        content_elements: contentElements,
        withFirmaDistributor
    } = globalContent;

    const { name, mode, subcategory } = distributor || {};
    const { by = [] } = credits || {};

    const opinionLayout = siteProperties?.layoutsName?.NotaOpinion;
    const isOpinionLayout = Boolean(opinionLayout) && layout === opinionLayout;
    const showSignatureWithDistributor =
        withFirmaDistributor && name !== 'lanacionar';

    const { authors } = useSignature({
        creditsBy: by,
        contentElements
    });

    const { author } =
        !showSignatureWithDistributor && getAuthorsNameAndLink(authors);
    const hasAuthors = !isEmptyObject(author) || authors.length > 0;

    const showSignature = shouldShowNoteFooterTopSignature({
        isOpinionLayout,
        showSignatureWithDistributor,
        hasAuthors
    });

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

    const showExternalSignature = shouldShowNoteFooterTopExternalSignature({
        name,
        isReceta,
        isLaNacion,
        hasAuthor,
        selectedSignature
    });

    const showThemes = shouldShowNoteFooterTopThemes({ subtype, tags });

    return { showSignature, showExternalSignature, showThemes };
};

export const shouldShowSignatureColumn = params => {
    const { showSignature, showExternalSignature } =
        getSignatureRenderingState(params);
    return showSignature || showExternalSignature;
};

export const shouldShowNoteFooterTopSection = params => {
    const { showSignature, showExternalSignature, showThemes } =
        getSignatureRenderingState(params);
    return showSignature || showExternalSignature || showThemes;
};
