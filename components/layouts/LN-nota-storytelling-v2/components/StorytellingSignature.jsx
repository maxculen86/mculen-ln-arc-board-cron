import React from 'react';
import { Author } from '@ln/contenidos-ui-author';
import { useSignature } from '../../../features/LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../private/common/audioNews/helpers';
import { getAuthorData } from '../../../features/LN-nota/signature/signatureHelper';

function StorytellingSignature({ globalContent }) {
    const {
        content_elements: contentElements = [],
        credits: { by: creditsBy = [] } = {}
    } = globalContent;

    const { authors } = useSignature({
        creditsBy,
        position: 'Top',
        contentElements
    });

    const { author } = getAuthorsNameAndLink(authors);
    const hasAuthors = author || authors.length > 0;

    if (!hasAuthors) return null;

    const authorNames = getAuthorData(author, authors, 'name');
    const authorLinks = getAuthorData(author, authors, 'link');
    const hasMultipleAuthors = Array.isArray(authors) && authors.length > 1;

    return (
        <div className="flex jc-center w-full">
            <Author
                variant="default"
                size={16}
                author={authorNames}
                href={authorLinks}
                prefix={hasMultipleAuthors}
            />
        </div>
    );
}

export default StorytellingSignature;
