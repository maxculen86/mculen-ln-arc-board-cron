import { getAuthorsNameAndLink } from '../../../../private/common/audioNews/helpers';
import get from '../../../../private/common/utils/get';
import isExternalDistributor from '../../../../private/common/utils/isExternalDistributor';
import { getAuthorsListText } from '../utils/authorHelpers';
import { useSignature } from './useSignature';

export const useSignatureRules = ({
    customFields: { position = 'Bottom' } = {},
    globalContent: {
        content_elements: contentElements = [],
        credits,
        distributor,
        withFirmaDistributor,
        subtype
    } = {},
    isOpinionLayout = false
} = {}) => {
    const creditsBy = get(credits, 'by', []);
    const {
        name = 'LA NACION',
        mode,
        subcategory = '',
        category
    } = distributor || {};

    const { photo, medio, authors, dataAuthor } = useSignature({
        creditsBy,
        position,
        contentElements
    });
    const hasMultipleAuthors = Array.isArray(authors) && authors.length > 1;
    const gplus = get(dataAuthor, 'gplus', '');
    const roleByLayout = isOpinionLayout ? gplus : medio;
    const resolvedRole = hasMultipleAuthors ? null : roleByLayout;
    const opinionBottomExtras =
        (!hasMultipleAuthors &&
            isOpinionLayout &&
            position === 'Bottom' && {
                opinionFooterPhoto: get(dataAuthor, 'image'),
                longBio: get(dataAuthor, 'longBio', ''),
                socialLinks: get(creditsBy, `${[0]}.social_links`, [])
            }) ||
        {};
    const { opinionFooterPhoto, ...opinionExtras } = opinionBottomExtras;
    const resolvedPhoto = opinionFooterPhoto || photo;

    const hasAuthorsInContent = authors.length > 0;
    const authorId = get(creditsBy, '[0]._id', '');

    const shouldShowDistributor =
        (withFirmaDistributor && name !== 'lanacionar') ||
        (isExternalDistributor(name, category, authorId) && position === 'Top');

    const authorsText = getAuthorsListText(authors);
    const { author } = shouldShowDistributor
        ? {}
        : getAuthorsNameAndLink(authors);
    const shouldShowAuthors = hasAuthorsInContent && !shouldShowDistributor;

    const shouldRender = shouldShowDistributor || shouldShowAuthors;

    return {
        flags: {
            shouldShowDistributor,
            shouldShowAuthors,
            shouldRender
        },
        data: {
            distributor: { name, mode, subcategory, category },
            authorsBlob: {
                authors,
                authorsText,
                author,
                hasMultipleAuthors
            },
            photo: resolvedPhoto,
            role: resolvedRole,
            position,
            subtype,
            ...opinionExtras
        }
    };
};
