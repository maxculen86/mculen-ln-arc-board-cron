import React from 'react';
import { useAppContext } from 'fusion:context';
import {
    decorator,
    getCategories,
    getAuthors,
    getAuthorsFromContentElements
} from '../../LN/common/utils/getDataFormated';
import handleCookie from '../../LN/common/utils/handleCookie';
import createHash from '../utils/createHash';

function GooglePublisherTag(props) {
    const { globalContent = {} } = props;
    const { type } = globalContent;
    const { getCookie } = handleCookie();
    const { contextPath, deployment } = useAppContext();
    if (!type || type !== 'story') return null;

    const {
        taxonomy,
        canonical_url: canonicalUrl,
        credits = { by: [] },
        content_elements: contentElements = [],
        label
    } = globalContent;

    const { tags = [], sections = [] } = taxonomy || {};
    const { by: authors = [] } = credits || {};
    const { eje_subeje: ejeSubeje } = label || {};
    const { text: ejeSubejeText = '' } = ejeSubeje || {};

    const getTopics = tagsList =>
        tagsList && tagsList.length
            ? tagsList.map(tag => decorator('te_', /\W/g, '_', tag.text))
            : [];

    const getUrl = inputUrl => {
        if (!inputUrl) return '';
        return `${decorator('url', /\//g, '_', inputUrl.replace(/\/$/g, ''))}`;
    };

    const getArticleId = () => {
        const { globalContent: { _id } = {} } = props;

        return `te_${_id}`;
    };

    const articleId = getArticleId();

    if (
        !sections.length &&
        !tags.length &&
        !canonicalUrl &&
        (!authors.length || contentElements.length)
    )
        return null;

    const categories = getCategories(sections);
    const topics = getTopics(tags);
    const url = getUrl(canonicalUrl);
    const authorList = authors.length
        ? getAuthors(authors)
        : getAuthorsFromContentElements(contentElements);

    return (
        <>
            <script
                async
                src=" https://securepubads.g.doubleclick.net/tag/js/gpt.js?network-code=133919216"
            />
            <script
                defer
                id="googlePublisherTag-metadata"
                type="text/javascript"
                data-new-tags={JSON.stringify(
                    [
                        categories,
                        topics,
                        authorList,
                        url,
                        articleId,
                        ejeSubejeText
                    ]
                        .flat()
                        .filter(Boolean)
                )}
                data-create-hash={createHash.toString()}
                data-get-cookie={getCookie.toString()}
                src={deployment(
                    `${contextPath}/resources/js/LN/googlePublisherTag.min.js`
                )}
            />
        </>
    );
}

export default GooglePublisherTag;
