/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'fusion:prop-types';
import { useContent } from 'fusion:content';
import ModArticle from '../../private/common/mod-article';

const Columnista = props => {
    const { customFields } = props;
    const { id: Id } = customFields;
    const author = useContent({
        source: 'authorSource',
        query: { _id: Id }
    });
    const data = {
        credits: {
            by: [
                {
                    author: author.name,
                    type: author.node_type,
                    image: { resized_urls: author.image.url }
                }
            ]
        }
    };
    // console.log("🚀 ~ file: columnista.jsx ~ line 14 ~ author", author)
    return (
        <>
            <ModArticle
                withMedia
                articleData={data}
                isRenderAuthor
                // srcdemo={author.image.url}
                classCondition="--columnista"
                authorSize="--twoxs"
                link={author.canonical_url}
                authors={author.name}
            />
        </>
    );
};

Columnista.label = 'LN-Columnista-author';

Columnista.propTypes = {
    customFields: PropTypes.shape({
        id: PropTypes.string.isRequired.tag({
            label: 'id'
        })
    })
};

export default Columnista;
