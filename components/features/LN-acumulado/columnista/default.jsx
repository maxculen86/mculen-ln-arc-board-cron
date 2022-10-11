/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import ModArticle from '../../../private/common/mod-article';

const Columnista = props => {
    const { customFields } = props;
    const { id: Id } = customFields;
    const author = useContent({
        source: 'authorSource',
        query: { _id: Id, imageConfig: 'columnistas' }
    });
    const {
        name,
        node_type: nodeType,
        image,
        canonical_url: canonicalUrl
    } = author || {
        image: { url: '' }
    };

    const data = {
        credits: {
            by: [
                {
                    author: name,
                    type: nodeType,
                    image: { resized_urls: [{ resizedUrl: image.url }] },
                    alt_text: name
                }
            ]
        }
    };

    return (
        <ModArticle
            withMedia
            articleData={data}
            isRenderAuthor
            classCondition="--columnista"
            authorSize="--twoxs"
            link={canonicalUrl}
            authors={name}
        />
    );
};
Columnista.label = 'LN-Columnista-author';
Columnista.static = true;

Columnista.propTypes = {
    customFields: PropTypes.shape({
        id: PropTypes.string.isRequired.tag({
            label: 'id'
        })
    })
};

export default Columnista;
