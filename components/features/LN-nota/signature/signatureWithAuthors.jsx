import React from 'react';
import { Author } from '@ln/contenidos-ui-author';
import { cx } from '@ln/cva';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { place } from '../../../private/common/utils/firmaHelper';
import { getAuthorData } from './signatureHelper';
import {
    VIDEO,
    LIVEBLOG_EDITORIAL,
    VIDEO_VERTICAL
} from '../../../private/common/utils/subtypes/subtypeHelper';
import { signatureWithAuthorsClasses } from './styles';

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
    isNotaFooter = false,
    size = 16,
    withAuthorRole = false
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

    const negativeSubtypes = [LIVEBLOG_EDITORIAL, VIDEO, VIDEO_VERTICAL];

    const isNegativeSubtype =
        negativeSubtypes.includes(subtype) && position === place.Top;

    const wrapperClasses = signatureWithAuthorsClasses({
        position,
        withAuthorRole,
        subtype,
        isNotaFooter
    });

    return (
        <div
            className={cx('flex flex-wrap', !withAuthorRole && 'w-100 w-full')}
        >
            <div className={wrapperClasses}>
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

export default SignatureWithAuthors;
