import React from 'react';
import PropTypes from 'fusion:prop-types';
import { Author } from '@ln/contenidos-ui-author';
import { cx } from '@ln/cva';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { place } from '../../../private/common/utils/firmaHelper';
import { getAuthorData } from './signatureHelper';
import {
    VIDEO,
    LIVEBLOG_EDITORIAL,
    CARDS
} from '../../../private/common/utils/subtypes/subtypeHelper';

function SignatureWithAuthors({
    showVariantIa,
    author,
    authors,
    photo,
    medio,
    audioButton,
    position = 'Bottom',
    showSignatureWithAuthors,
    subtype,
    isNotaFooter,
    size = 16,
    withAuthorRole
}) {
    if (!showSignatureWithAuthors) return null;

    const authorNames = getAuthorData(author, authors, 'name');
    const authorLinks = getAuthorData(author, authors, 'link');
    const hasMultipleAuthors = Array.isArray(authors) && authors.length > 1;

    const variant = showVariantIa ? 'ia' : 'default';
    const iconAudio = showVariantIa ? (
        <IconSprite name="ai" fill="#FEFEFE" />
    ) : null;
    const prefix = position === place.Bottom || hasMultipleAuthors;

    const negativeSubtypes = [LIVEBLOG_EDITORIAL, VIDEO];
    const isSubtypeCards = subtype === CARDS;

    const isNegativeSubtype =
        negativeSubtypes.includes(subtype) && position === place.Top;

    return (
        <div className={cx('flex flex-wrap', !withAuthorRole && 'w-100')}>
            <div
                className={cx(
                    'flex flex-column flex-wrap gap-16 w-100 flex-row_m ai-center_m ai-start',
                    position === place.Top && !withAuthorRole && 'mb-16',
                    !isNotaFooter &&
                        position === place.Bottom &&
                        !isSubtypeCards &&
                        'mb-32'
                )}
            >
                <Author
                    key={author?.name}
                    variant={variant}
                    size={size}
                    author={authorNames}
                    imageSrc={photo}
                    href={authorLinks}
                    section={medio}
                    icon={iconAudio}
                    prefix={prefix}
                    negative={isNegativeSubtype}
                    classnames={{
                        authorSection: 'uppercase',
                        authorName: isNegativeSubtype && 'text-blue-300',
                        classNamePicture: `ln-placeholder rounded-circle w-40 h-40`
                    }}
                />
                {audioButton}
            </div>
        </div>
    );
}

SignatureWithAuthors.propTypes = {
    showVariantIa: PropTypes.bool.isRequired,
    author: PropTypes.object.isRequired,
    authors: PropTypes.array.isRequired,
    photo: PropTypes.string.isRequired,
    medio: PropTypes.string.isRequired,
    audioButton: PropTypes.node.isRequired,
    position: PropTypes.oneOf([place.Top, place.Bottom]).isRequired,
    showSignatureWithAuthors: PropTypes.bool.isRequired,
    subtype: PropTypes.string.isRequired,
    isNotaFooter: PropTypes.bool,
    size: PropTypes.number,
    withAuthorRole: PropTypes.bool
};

SignatureWithAuthors.defaultProps = {
    isNotaFooter: false,
    size: 16,
    withAuthorRole: false
};

export default SignatureWithAuthors;
