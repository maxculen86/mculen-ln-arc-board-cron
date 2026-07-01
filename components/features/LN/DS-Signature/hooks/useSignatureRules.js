import { getAuthorsNameAndLink } from '../../../../private/common/utils/firmaHelper';
import get from '../../../../private/common/utils/get';
import isExternalDistributor from '../../../../private/common/utils/isExternalDistributor';
import { getAuthorsListText } from '../utils/authorHelpers';
import { useSignature } from './useSignature';

const SUBTYPES = {
    OPINION: '3'
};

const SIGNATURE_RULES_CONFIG = {
    [SUBTYPES.OPINION]: {
        hideSignature: ({
            hasMultipleAuthors,
            authorIsGuest,
            authorHasBio,
            position
        }) =>
            position === 'Bottom' &&
            (hasMultipleAuthors || authorIsGuest || !authorHasBio)
    }
};

const resolveSignatureRule = ({ subtype }) =>
    SIGNATURE_RULES_CONFIG[subtype] ?? null;

export const useSignatureRules = ({
    customFields: { position = 'Bottom' } = {},
    ignoreDistributor = false,
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
    const authorCredits = creditsBy.filter(c => c.type === 'author');
    const singleAuthor = !hasMultipleAuthors ? authorCredits[0] : null;
    const authorIsGuest = singleAuthor ? !get(singleAuthor, '_id', '') : false;
    const authorHasBio = singleAuthor
        ? Boolean(get(singleAuthor, 'additional_properties.original.bio'))
        : false;
    const authorRole = get(dataAuthor, 'role', '');
    const roleByLayout = isOpinionLayout ? authorRole : medio;
    const resolvedRole = hasMultipleAuthors ? null : roleByLayout;
    const opinionBottomExtras =
        (!hasMultipleAuthors &&
            isOpinionLayout &&
            position === 'Bottom' && {
                opinionFooterPhoto: get(dataAuthor, 'image'),
                longBio: get(dataAuthor, 'longBio', ''),
                bio: get(dataAuthor, 'bio', ''),
                socialLinks: get(creditsBy, `${[0]}.social_links`, [])
            }) ||
        {};
    const { opinionFooterPhoto, ...opinionExtras } = opinionBottomExtras;
    const resolvedPhoto = opinionFooterPhoto || photo;

    const hasAuthorsInContent = authors.length > 0;
    const authorId = get(creditsBy, '[0]._id', '');

    const shouldShowDistributor =
        !ignoreDistributor &&
        ((withFirmaDistributor && name !== 'lanacionar') ||
            (isExternalDistributor(name, category, authorId) &&
                position === 'Top'));

    const authorsText = getAuthorsListText(authors);
    const { author } = shouldShowDistributor
        ? {}
        : getAuthorsNameAndLink(authors);
    const shouldShowAuthors = hasAuthorsInContent && !shouldShowDistributor;

    const signatureRule = resolveSignatureRule({ subtype });

    const shouldHideSignature =
        signatureRule?.hideSignature({
            hasMultipleAuthors,
            authorIsGuest,
            authorHasBio,
            position
        }) ?? false;

    const shouldRender =
        (shouldShowDistributor || shouldShowAuthors) && !shouldHideSignature;

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
