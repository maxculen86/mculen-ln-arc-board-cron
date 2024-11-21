import React from 'react';
import PropTypes from 'fusion:prop-types';
import classNames from 'classnames';
import { Author } from '@ln/contenidos-ui-author';
import IconSprite from '../../private-global/common/iconSprite/IconSprite';
import { place } from '../../../private/common/utils/firmaHelper';
import { getAuthorData } from './signatureHelper';

function SignatureWithAuthors({
    showVariantIa,
    author,
    authors,
    photo,
    medio,
    audioButton,
    position,
    showSignatureWithAuthors,
    subtype
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
    const isVideoNote = subtype === '5' && position === place.Top;

    return (
        <div className="row">
            <div
                className={classNames(
                    'flex flex-column gap-16 w-100 flex-row_m ai-center_m ai-start',
                    position === place.Top && 'mb-16'
                )}
            >
                <Author
                    key={author?.name}
                    variant={variant}
                    size={16}
                    author={authorNames}
                    imageSrc={photo}
                    href={authorLinks}
                    section={medio}
                    icon={iconAudio}
                    prefix={prefix}
                    negative={isVideoNote}
                    classnames={{
                        authorSection: 'uppercase',
                        authorName: isVideoNote && 'text-blue-300'
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
    subtype: PropTypes.string.isRequired
};

export default SignatureWithAuthors;
