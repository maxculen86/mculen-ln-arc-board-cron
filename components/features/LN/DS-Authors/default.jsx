import React, { Fragment } from 'react';
import { useAppContext } from 'fusion:context';
import get from '../../../private/common/utils/get';
import { WrapperBody } from '../common/wrapperBody/default';
import { startsWithIorHiRAE } from '../../../private/common/utils/getAuthorsAsString';

const SUBTYPES = {
    OPINION: '3'
};

const AUTHORS_RULES_CONFIG = {
    [SUBTYPES.OPINION]: {
        hideAuthors: ({ hasMultipleAuthors, authorIsGuest, authorHasBio }) =>
            !hasMultipleAuthors && !authorIsGuest && authorHasBio
    }
};

const resolveAuthorRule = ({ subtype }) =>
    AUTHORS_RULES_CONFIG[subtype] ?? null;

const getAuthorData = author => {
    const id = get(author, '_id', '');
    const original = get(author, 'additional_properties.original', {});

    return {
        name:
            original.author_type === ''
                ? get(author, 'name', '')
                : original.byline || get(author, 'name', ''),
        link: id ? `/autor/${id}/` : '',
        id
    };
};

const shouldHideAuthorsByRule = ({ subtype, authors }) => {
    const authorRule = resolveAuthorRule({ subtype });

    if (!authorRule || authors.length === 0) {
        return false;
    }

    const hasMultipleAuthors = authors.length > 1;
    const singleAuthor = !hasMultipleAuthors ? authors[0] : null;

    const authorIsGuest = singleAuthor ? !get(singleAuthor, '_id', '') : false;

    const authorHasBio = singleAuthor
        ? Boolean(get(singleAuthor, 'additional_properties.original.bio'))
        : false;

    return (
        authorRule.hideAuthors({
            hasMultipleAuthors,
            authorIsGuest,
            authorHasBio
        }) ?? false
    );
};

const renderAuthorsAsLinks = authors =>
    authors.map((author, index) => {
        const isFirst = index === 0;
        const isBeforeLast = index === authors.length - 2;

        let separator = '';

        if (!isFirst) {
            if (isBeforeLast) {
                separator = startsWithIorHiRAE(author.name) ? ' e ' : ' y ';
            } else {
                separator = ', ';
            }
        }

        return (
            <Fragment key={author.name}>
                {separator}
                {author.link ? (
                    <a href={author.link}>{author.name}</a>
                ) : (
                    author.name
                )}
            </Fragment>
        );
    });

function Authors() {
    const { globalContent } = useAppContext();

    const { credits: { by: authors = [] } = {}, subtype } = globalContent;

    if (authors.length === 0 || shouldHideAuthorsByRule({ subtype, authors })) {
        return null;
    }

    const authorsData = authors
        .filter(author => author?.type === 'author')
        .map(getAuthorData);

    if (authorsData.length === 0) {
        return null;
    }

    return (
        <WrapperBody data-tw>
            <address className="mb-24 md:mb-64">
                <span className="text-base-default font-secondary text-16 leading-[140%] font-bold tracking-[-0.6px]">
                    Por {renderAuthorsAsLinks(authorsData)}
                </span>
            </address>
        </WrapperBody>
    );
}

Authors.label = 'LN-DS-Autores';
export default Authors;
