/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useAppContext } from 'fusion:context';
import get from '../utils/get';
import getAuthorByline from '../utils/getAuthorByline';
import { googlePublisherAndLiftIgniterPropTypes } from '../utils/propTypesHelper';

const LiftIgniter = ({ globalContent }) => {
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

    const getAuthorsFromContentElements = object => {
        return object
            .filter(
                contentElement =>
                    contentElement.additional_properties &&
                    contentElement.additional_properties.nodeType === 'firma'
            )
            .map(author => author.content)
            .join(', ');
    };

    const getAuthors = object => {
        return object.map(author => getAuthorByline(author)).join(', ');
    };

    const script = {
        id: _id,
        title,
        titleShort,
        leadText,
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
                id="liftigniter"
                type="text/javascript"
                src={deployment(
                    `${contextPath}/resources/js/LN/Liftigniter.min.js`
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
};

LiftIgniter.propTypes = {
    globalContent: PropTypes.shape({
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
            )
        }),
        content_elements:
            googlePublisherAndLiftIgniterPropTypes.content_elements,
        credits: googlePublisherAndLiftIgniterPropTypes.credits,
        googlePublisherAndLiftIgniterPropTypes:
            googlePublisherAndLiftIgniterPropTypes.label
    })
};
export default LiftIgniter;
