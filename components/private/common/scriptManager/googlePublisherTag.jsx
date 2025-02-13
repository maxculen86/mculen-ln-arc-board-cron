import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import {
    decorator,
    getCategories,
    getAuthors,
    getAuthorsFromContentElements
} from '../../LN/common/utils/getDataFormated';
import { googlePublisherAndLiftIgniterPropTypes } from '../utils/propTypesHelper';
import handleCookie from '../../LN/common/utils/handleCookie';
import createHash from '../utils/createHash';

function GooglePublisherTag(props) {
    const { globalContent = {} } = props;
    const { type } = globalContent;
    const { getCookie } = handleCookie();
    const { contextPath, deployment } = useAppContext();
    if (!type || type !== 'story') return <></>;

    const {
        taxonomy,
        canonical_url: canonicalUrl,
        credits = { by: [] },
        content_elements: contentElements = [],
        label
    } = globalContent;

    const { tags = [], sections = [] } = taxonomy || {};
    const { by: authors = [] } = credits || {};
    const { eje_subeje } = label || {};
    const { text: ejeSubejeText = '' } = eje_subeje || {};

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
        return <></>;

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

GooglePublisherTag.propTypes = {
    globalContent: PropTypes.shape({
        _id: PropTypes.string,
        type: PropTypes.string,
        canonical_url: PropTypes.string,
        taxonomy: PropTypes.shape({
            primary_section: PropTypes.shape({
                name: PropTypes.string
            }),
            tags: PropTypes.arrayOf(
                PropTypes.shape({
                    text: PropTypes.string,
                    description: PropTypes.string,
                    slug: PropTypes.string
                })
            ),
            sections: PropTypes.arrayOf(
                PropTypes.shape({
                    path: PropTypes.string
                })
            )
        }),
        label: PropTypes.shape({
            eje_subeje: PropTypes.shape({
                text: PropTypes.string
            })
        }),
        content_elements:
            googlePublisherAndLiftIgniterPropTypes.content_elements,
        credits: googlePublisherAndLiftIgniterPropTypes.credits,
        googlePublisherAndLiftIgniterPropTypes:
            googlePublisherAndLiftIgniterPropTypes.label
    }).isRequired
};

export default GooglePublisherTag;
