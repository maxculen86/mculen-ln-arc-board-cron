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
    } = {}
} = {}) => {
    const creditsBy = get(credits, 'by', []);
    const {
        name = 'LA NACION',
        mode,
        subcategory = '',
        category
    } = distributor || {};

    const { photo, medio, authors } = useSignature({
        creditsBy,
        position,
        contentElements
    });

    const hasAuthorsInContent = authors.length > 0;
    const authorId = get(creditsBy, '[0]._id', '');

    const distributorAllowedByRules =
        (withFirmaDistributor && name !== 'lanacionar') ||
        (isExternalDistributor(name, category, authorId) && position === 'Top');
    const shouldShowDistributor =
        distributorAllowedByRules && hasAuthorsInContent;

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
                author
            },
            photo,
            medio,
            position,
            subtype
        }
    };
};
