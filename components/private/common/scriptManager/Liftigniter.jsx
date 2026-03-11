import React from 'react';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import getAuthorByline from '../utils/getAuthorByline';

function LiftIgniter({ globalContent }) {
    const { contextPath, deployment } = useAppContext();
    const {
        taxonomy,
        label,
        content_elements: contentElements = [],
        credits,
        display_date: displayDate,
        _id,
        headlines
    } = globalContent || {};
    const { primary_section: primarySection, tags = [] } = taxonomy || {};
    const { name: tematica } = primarySection || {};
    const { by: authors = [] } = credits || {};
    const recomendar = get(label, 'recomendar.text', 'Si');
    const titleShort = get(headlines, 'mobile', '');
    const title = get(headlines, 'basic', '');
    const leadText = get(label, 'volanta.text', '');
    const headlinesWeb = get(label, 'headlines.web', '');

    const getAuthorsFromContentElements = object =>
        object
            .filter(
                contentElement =>
                    contentElement.additional_properties &&
                    contentElement.additional_properties.nodeType === 'firma'
            )
            .map(author => author.content)
            .join(', ');

    const getAuthors = object =>
        object.map(author => getAuthorByline(author)).join(', ');

    const script = {
        id: _id,
        title,
        titleShort,
        leadText: headlinesWeb || leadText,
        published_time: displayDate,
        noShow: recomendar !== 'Si',
        noIndex: false,
        tematica,
        tags: tags.map(tag => tag.text),
        autor:
            authors && authors.length > 0
                ? getAuthors(authors)
                : getAuthorsFromContentElements(contentElements)
    };

    return (
        <>
            <script
                defer
                id="liftigniter"
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/LiftIgniter.min.js`
                )}
            />

            <script
                defer
                id="liftigniter-metadata"
                type="application/json"
                // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(script)
                }}
            />
        </>
    );
}

export default LiftIgniter;
