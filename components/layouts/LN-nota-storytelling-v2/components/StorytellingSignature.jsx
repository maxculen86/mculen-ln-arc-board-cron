import React from 'react';
import { Author } from '@ln/contenidos-ui-author';
import { useSignature } from '../../../features/LN/DS-Signature/hooks/useSignature';
import { getAuthorsNameAndLink } from '../../../private/common/utils/firmaHelper';
import { getAuthorData } from '../../../features/LN-nota/signature/signatureHelper';
import get from '../../../private/common/utils/get';
import {
    DEFAULT_DIAGRAM,
    IMAGE_100_DIAGRAMS
} from './opening/helpers/diagramConstants';

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
    const subheadline = get(globalContent, 'subheadlines.basic', '');
    const diagram = get(
        globalContent,
        'promo_items.custom_storytelling_opening.embed.config.diagram',
        DEFAULT_DIAGRAM
    );
    const showMobileSubheadline = IMAGE_100_DIAGRAMS.some(
        image100Diagram => image100Diagram === diagram
    );
    const hasMultipleAuthors = Array.isArray(authors) && authors.length > 1;

    return (
        <div className="flex flex-column justify-center items-center w-full">
            {subheadline && showMobileSubheadline && (
                <p className="font-secondary text-body-lg mb-24 md:hidden text-center">
                    {subheadline}
                </p>
            )}
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
